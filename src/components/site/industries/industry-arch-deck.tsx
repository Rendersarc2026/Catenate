"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";
import { IndustryArchCard } from "./industry-arch-card";
import { SLIDE_MS, useDeckGesture } from "./use-deck-gesture";

interface IndustryArchDeckProps {
  industries: readonly Industry[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDetail: (industry: Industry) => void;
}

export function IndustryArchDeck({
  industries,
  activeIndex,
  onSelectIndex,
  onOpenDetail,
}: IndustryArchDeckProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(1200);

  // Measure container width via ResizeObserver
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onSelectIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        onSelectIndex(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, industries.length, onSelectIndex]);

  // Responsive dimensions
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;
  const cardWidth = isMobile ? 220 : isTablet ? 250 : 280;
  const cardGap = isMobile ? 14 : isTablet ? 18 : 22;
  const maxCardHeight = isMobile ? 320 : isTablet ? 370 : 410;

  // Parabolic arch height: normalise the falloff across the visible span so the
  // curve keeps descending instead of clamping into a flat row of equal cards.
  const minCardHeight = Math.round(maxCardHeight * 0.34);
  const getCardHeight = React.useCallback(
    (dist: number) => {
      if (dist === 0) return maxCardHeight;
      const span = 5;
      const t = Math.min(dist / span, 1);
      const drop = (maxCardHeight - minCardHeight) * (1 - Math.cos((t * Math.PI) / 2));
      return Math.round(maxCardHeight - drop);
    },
    [maxCardHeight, minCardHeight],
  );

  // Infinite deck: activeIndex is unbounded (it may go negative or past the
  // end). Rather than laying out all N cards and translating across them, we
  // render a fixed window of virtual slots centred on activeIndex and map each
  // slot back onto a real industry with a modulo. The track's translation is
  // then relative to the window, so it never grows without bound and offscreen
  // cards are never rendered at all.
  const step = cardWidth + cardGap;
  const count = industries.length;

  // Half-window wide enough to cover the viewport plus a card of overscan.
  const halfWindow = Math.min(
    Math.max(Math.ceil(containerWidth / 2 / step) + 2, 4),
    Math.max(count, 1),
  );

  // The window is anchored to `windowIndex`, which LAGS behind `activeIndex`
  // while a move animates. If the window re-centred immediately, every slot
  // would swap content in one frame and the track would never move -- cards
  // would morph in place instead of sliding. Instead we translate the track by
  // the difference, then silently re-anchor the window once it settles.
  const [windowIndex, setWindowIndex] = React.useState(activeIndex);
  const settleRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  // True for the single commit in which the window re-anchors. The anchor
  // shift and the drift reset cancel out geometrically, but the browser would
  // still animate the resulting transform change -- which reads as the deck
  // sliding back. Suppress the transition for that one frame.
  const [reanchoring, setReanchoring] = React.useState(false);
  const activeIndexRef = React.useRef(activeIndex);
  React.useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const slots = React.useMemo(() => {
    const out: { key: string; industry: Industry; index: number; offset: number }[] = [];
    if (count === 0) return out;
    for (let offset = -halfWindow; offset <= halfWindow; offset++) {
      const virtual = windowIndex + offset;
      // True modulo, correct for negative virtual indices.
      const real = ((virtual % count) + count) % count;
      out.push({
        key: `${virtual}`,
        industry: industries[real],
        index: real,
        offset,
      });
    }
    return out;
  }, [windowIndex, halfWindow, industries, count]);

  // How far the active card has drifted from the window's anchor. A jump larger
  // than the window (or a resize that shrinks it) can't be animated
  // meaningfully, so snap the anchor during render rather than sliding across
  // many cards. Adjusting state while rendering is the supported pattern here.
  if (Math.abs(activeIndex - windowIndex) > halfWindow) {
    setWindowIndex(activeIndex);
  }
  const drift = activeIndex - windowIndex;

  // Re-anchor the window after the slide finishes. Because the anchor shift and
  // the drift reset are applied in the same commit, the rendered geometry is
  // identical before and after -- the swap is invisible.
  React.useEffect(() => {
    if (drift === 0) return;
    const node = trackRef.current;
    if (!node) return;

    // Re-anchor exactly when the slide ends. A bare timer races the CSS
    // transition and re-anchors a few frames early, which reads as a hitch.
    // Child cards also bubble transitionend here, so match the track's own
    // transform only.
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== node || e.propertyName !== "transform") return;
      // Re-anchor to the index this slide was heading for. Reading the ref
      // rather than the closed-over value keeps rapid, overlapping steps from
      // re-anchoring to a stale target and accumulating drift.
      setReanchoring(true);
      setWindowIndex(activeIndexRef.current);
    };
    node.addEventListener("transitionend", onEnd);

    // Fallback: transitionend never fires if the transition is interrupted or
    // suppressed (reduced motion, background tab).
    if (settleRef.current) clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      setReanchoring(true);
      setWindowIndex(activeIndexRef.current);
    }, SLIDE_MS + 120);

    return () => {
      node.removeEventListener("transitionend", onEnd);
      if (settleRef.current) clearTimeout(settleRef.current);
    };
  }, [drift, activeIndex]);

  // Restore transitions once the untransitioned frame has been painted.
  React.useEffect(() => {
    if (!reanchoring) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReanchoring(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [reanchoring]);

  // Centre the active slot: it sits at position `halfWindow` within the window,
  // offset by however far the active index has drifted from the anchor.
  const centerTarget = containerWidth / 2;
  const baseTranslate =
    centerTarget - ((halfWindow + drift) * step + cardWidth / 2);

  const {
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleClickCapture,
    handleWheel,
  } = useDeckGesture({
    containerRef,
    trackRef,
    activeIndex,
    cardWidth,
    baseTranslate,
    onSelectIndex,
  });

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Industries card arch deck"
      aria-roledescription="carousel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
      onWheel={handleWheel}
      className={cn(
        "relative w-full overflow-hidden pt-6 pb-10 select-none touch-pan-y",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      {/* Soft Vignette horizon masks on sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 bg-gradient-to-r from-off via-off/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 bg-gradient-to-l from-off via-off/70 to-transparent" />

      {/* Floating navigation chevrons */}
      <div className="pointer-events-none absolute inset-y-0 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous industry"
          onClick={(e) => {
            e.stopPropagation();
            onSelectIndex(activeIndex - 1);
          }}
          className={cn(
            "pointer-events-auto grid size-11 place-items-center rounded-full",
            "border border-ink/10 bg-white/90 text-ink shadow-md backdrop-blur-md",
            "transition-[transform,background-color,color] duration-300 ease-expo motion-reduce:transition-none hover:scale-110 hover:bg-blue hover:text-white cursor-pointer active:scale-95",
          )}
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Next industry"
          onClick={(e) => {
            e.stopPropagation();
            onSelectIndex(activeIndex + 1);
          }}
          className={cn(
            "pointer-events-auto grid size-11 place-items-center rounded-full",
            "border border-ink/10 bg-white/90 text-ink shadow-md backdrop-blur-md",
            "transition-[transform,background-color,color] duration-300 ease-expo motion-reduce:transition-none hover:scale-110 hover:bg-blue hover:text-white cursor-pointer active:scale-95",
          )}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Arch Track with items aligned at the bottom */}
      <div
        ref={trackRef}
        style={{
          transform: `translate3d(${baseTranslate}px, 0, 0)`,
          transition:
            isDragging || reanchoring
              ? "none"
              : `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          gap: `${cardGap}px`,
        }}
        className="flex items-end will-change-transform pt-4 motion-reduce:transition-none"
      >
        {slots.map((slot) => {
          // Distance to the active card, which drifts during the slide.
          const dist = Math.abs(slot.offset - drift);
          const isActive = slot.offset - drift === 0;
          const cardHeight = getCardHeight(dist);

          return (
            <IndustryArchCard
              key={slot.key}
              industry={slot.industry}
              index={slot.index}
              total={count}
              distanceFromCenter={dist}
              isActive={isActive}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              maxCardHeight={maxCardHeight}
              // Selecting a neighbour moves by its offset, keeping the
              // unbounded index continuous instead of snapping to a real index.
              onSelectIndex={() => onSelectIndex(windowIndex + slot.offset)}
              onOpenDetail={onOpenDetail}
            />
          );
        })}
      </div>
    </div>
  );
}
