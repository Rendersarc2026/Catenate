"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";
import { IndustryArchCard } from "./industry-arch-card";

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
  const [containerWidth, setContainerWidth] = React.useState(1200);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const pointerStartRef = React.useRef<{
    x: number;
    time: number;
    moved: boolean;
  } | null>(null);
  const currentDragRef = React.useRef(0);

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
        if (activeIndex > 0) onSelectIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        if (activeIndex < industries.length - 1) onSelectIndex(activeIndex + 1);
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

  // Parabolic arch height calculation
  const getCardHeight = React.useCallback(
    (dist: number) => {
      if (dist === 0) return maxCardHeight;
      const drop = Math.min(
        maxCardHeight * 0.58,
        Math.pow(dist, 1.25) * (maxCardHeight * 0.108)
      );
      return Math.round(maxCardHeight - drop);
    },
    [maxCardHeight]
  );

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    pointerStartRef.current = {
      x: e.clientX,
      time: performance.now(),
      moved: false,
    };
    currentDragRef.current = 0;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartRef.current || !isDragging) return;
    const deltaX = e.clientX - pointerStartRef.current.x;
    if (Math.abs(deltaX) > 4) {
      pointerStartRef.current.moved = true;
    }
    currentDragRef.current = deltaX;
    setDragOffset(deltaX);
  };

  const handlePointerUp = () => {
    if (!pointerStartRef.current) return;
    const deltaX = currentDragRef.current;
    const duration = performance.now() - pointerStartRef.current.time;
    const velocity = deltaX / Math.max(duration, 1);

    setIsDragging(false);
    setDragOffset(0);
    currentDragRef.current = 0;
    pointerStartRef.current = null;

    const threshold = cardWidth * 0.24;
    if (deltaX < -threshold || velocity < -0.32) {
      if (activeIndex < industries.length - 1) {
        onSelectIndex(activeIndex + 1);
      }
    } else if (deltaX > threshold || velocity > 0.32) {
      if (activeIndex > 0) {
        onSelectIndex(activeIndex - 1);
      }
    }
  };

  // Center active card in track
  const step = cardWidth + cardGap;
  const centerTarget = containerWidth / 2;
  const activeCenter = activeIndex * step + cardWidth / 2;
  const totalTranslate = centerTarget - activeCenter + dragOffset;

  const trackStyle: React.CSSProperties = {
    transform: `translate3d(${totalTranslate}px, 0, 0)`,
    transition: isDragging
      ? "none"
      : "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
    gap: `${cardGap}px`,
  };

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
      className="relative w-full overflow-hidden pt-6 pb-2 cursor-grab active:cursor-grabbing touch-pan-y select-none"
    >
      {/* Soft Vignette horizon masks on sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 bg-gradient-to-r from-off via-off/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 bg-gradient-to-l from-off via-off/70 to-transparent" />

      {/* Floating navigation chevrons */}
      <div className="pointer-events-none absolute inset-y-0 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous industry"
          disabled={activeIndex === 0}
          onClick={(e) => {
            e.stopPropagation();
            if (activeIndex > 0) onSelectIndex(activeIndex - 1);
          }}
          className={cn(
            "pointer-events-auto grid size-11 place-items-center rounded-full",
            "border border-ink/10 bg-white/90 text-ink shadow-md backdrop-blur-md",
            "transition-all duration-300 hover:scale-110 hover:bg-blue hover:text-white cursor-pointer active:scale-95",
            activeIndex === 0 && "opacity-0 pointer-events-none"
          )}
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Next industry"
          disabled={activeIndex === industries.length - 1}
          onClick={(e) => {
            e.stopPropagation();
            if (activeIndex < industries.length - 1)
              onSelectIndex(activeIndex + 1);
          }}
          className={cn(
            "pointer-events-auto grid size-11 place-items-center rounded-full",
            "border border-ink/10 bg-white/90 text-ink shadow-md backdrop-blur-md",
            "transition-all duration-300 hover:scale-110 hover:bg-blue hover:text-white cursor-pointer active:scale-95",
            activeIndex === industries.length - 1 &&
              "opacity-0 pointer-events-none"
          )}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Arch Track with items aligned at the bottom */}
      <div
        style={trackStyle}
        className="flex items-end will-change-transform py-4"
      >
        {industries.map((industry, index) => {
          const dist = Math.abs(index - activeIndex);
          const isActive = index === activeIndex;
          const cardHeight = getCardHeight(dist);

          return (
            <IndustryArchCard
              key={industry.slug}
              industry={industry}
              index={index}
              total={industries.length}
              distanceFromCenter={dist}
              isActive={isActive}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              onSelect={() => onSelectIndex(index)}
              onOpenDetail={() => onOpenDetail(industry)}
            />
          );
        })}
      </div>
    </div>
  );
}
