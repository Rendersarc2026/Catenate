import * as React from "react";

// Keep in sync with the deck's slide timing.
export const SLIDE_MS = 550;

interface UseDeckGestureOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  cardWidth: number;
  baseTranslate: number;
  onSelectIndex: (index: number) => void;
}

export function useDeckGesture({
  containerRef,
  trackRef,
  activeIndex,
  cardWidth,
  baseTranslate,
  onSelectIndex,
}: UseDeckGestureOptions) {
  const [isDragging, setIsDragging] = React.useState(false);

  const pointerStartRef = React.useRef<{
    startX: number;
    startY: number;
    time: number;
    isScrolling?: boolean;
  } | null>(null);
  const currentDragXRef = React.useRef(0);
  const rAFRef = React.useRef<number | null>(null);
  const hasDraggedRef = React.useRef(false);

  const wheelTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const accumulatedDeltaRef = React.useRef(0);
  const isWheelLockedRef = React.useRef(false);

  // Clean up pending animation frames and timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (rAFRef.current !== null) {
        cancelAnimationFrame(rAFRef.current);
      }
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    // Never start a drag from an interactive control (nav arrows, badge
    // buttons). Their pointer events bubble to the deck, and a few px of
    // pointer drift would otherwise be read as a swipe -- stealing the click
    // and paging the deck the wrong way.
    if ((e.target as Element | null)?.closest?.("button")) return;

    pointerStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      time: performance.now(),
    };
    currentDragXRef.current = 0;
    hasDraggedRef.current = false;

    // Guarded: capture can throw if the pointer is already gone (fast taps,
    // synthetic events), which would abort the handler mid-drag-setup.
    try {
      containerRef.current?.setPointerCapture?.(e.pointerId);
    } catch {
      // Non-fatal -- the drag still works without capture.
    }
    setIsDragging(true);

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    if (!start) return;

    const dx = e.clientX - start.startX;
    const dy = e.clientY - start.startY;

    // Detect scroll intention on first significant movement
    if (start.isScrolling === undefined) {
      if (Math.abs(dy) > 7 && Math.abs(dy) > Math.abs(dx)) {
        start.isScrolling = true;
        if (containerRef.current?.hasPointerCapture?.(e.pointerId)) {
          containerRef.current.releasePointerCapture(e.pointerId);
        }
        setIsDragging(false);
        return;
      } else if (Math.abs(dx) > 7) {
        start.isScrolling = false;
      }
    }

    if (start.isScrolling) return;

    if (Math.abs(dx) > 4) {
      hasDraggedRef.current = true;
    }

    currentDragXRef.current = dx;

    // rAF throttled direct DOM update: ZERO React re-renders while dragging
    if (rAFRef.current === null) {
      rAFRef.current = requestAnimationFrame(() => {
        rAFRef.current = null;
        if (!trackRef.current) return;
        // Infinite deck: no boundaries, so no rubber-band resistance.
        const delta = currentDragXRef.current;
        trackRef.current.style.transform = `translate3d(${baseTranslate + delta}px, 0, 0)`;
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStartRef.current) return;

    if (containerRef.current?.hasPointerCapture?.(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    if (rAFRef.current !== null) {
      cancelAnimationFrame(rAFRef.current);
      rAFRef.current = null;
    }

    const deltaX = currentDragXRef.current;
    const duration = performance.now() - pointerStartRef.current.time;
    const velocity = deltaX / Math.max(duration, 1);

    pointerStartRef.current = null;
    setIsDragging(false);

    // Restore smooth CSS transition synchronized with cards
    if (trackRef.current) {
      trackRef.current.style.transition =
        `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    }

    const threshold = cardWidth * 0.22;
    const isFastFlick = Math.abs(velocity) > 0.28;
    const isFarDrag = Math.abs(deltaX) > threshold;

    let nextIndex = activeIndex;
    if (isFarDrag || isFastFlick) {
      nextIndex = deltaX < 0 ? activeIndex + 1 : activeIndex - 1;
    }

    if (nextIndex !== activeIndex) {
      onSelectIndex(nextIndex);
    } else if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${baseTranslate}px, 0, 0)`;
    }

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // Horizontal wheel / trackpad swipe handling
  const handleWheel = (e: React.WheelEvent) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = isHorizontal ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (Math.abs(delta) < 10) return;

    if (isWheelLockedRef.current) return;

    accumulatedDeltaRef.current += delta;
    const WHEEL_THRESHOLD = 45;

    if (accumulatedDeltaRef.current > WHEEL_THRESHOLD) {
      onSelectIndex(activeIndex + 1);
      isWheelLockedRef.current = true;
      accumulatedDeltaRef.current = 0;
    } else if (accumulatedDeltaRef.current < -WHEEL_THRESHOLD) {
      onSelectIndex(activeIndex - 1);
      isWheelLockedRef.current = true;
      accumulatedDeltaRef.current = 0;
    }

    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current);
    }
    wheelTimeoutRef.current = setTimeout(() => {
      isWheelLockedRef.current = false;
      accumulatedDeltaRef.current = 0;
    }, 380);
  };

  return {
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleClickCapture,
    handleWheel,
  };
}
