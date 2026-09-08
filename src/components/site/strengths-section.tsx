"use client";

import * as React from "react";

import { Reveal } from "@/components/site/reveal";
import { strengths, type Blurb } from "@/data/catenate";
import { cn } from "@/lib/utils";

/**
 * Numbered process-list treatment: an oversized index numeral on the left,
 * a heavy rule opening the row, and the copy split title/body across the
 * remaining two tracks.
 *
 * The numeral pins as the row scrolls past it, so it hangs beside its own
 * copy for the length of the row and is then pushed out of frame by the next
 * one.
 */
function StrengthRow({
  index,
  item,
  isActive,
  numeralRef,
}: {
  index: number;
  item: Blurb;
  isActive: boolean;
  numeralRef: (el: HTMLSpanElement | null) => void;
}) {
  return (
    <Reveal
      bare
      className="row-fade grid gap-x-[clamp(24px,4vw,72px)] py-[clamp(24px,2.6vw,40px)] lg:min-h-[48vh] lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr]"
    >
      <div
        aria-hidden
        className="mb-6 h-[3px] w-full bg-ink lg:col-span-2 lg:col-start-2 lg:mb-[clamp(18px,2vw,32px)]"
      />
      <span
        ref={numeralRef}
        className={cn(
          "tnum block self-start text-[clamp(4.5rem,10.5vw,11rem)] leading-[0.8] font-semibold tracking-[-0.045em] transition-colors duration-150 ease-out lg:sticky lg:top-[calc(var(--nav-height)+clamp(24px,5vh,64px))] lg:row-start-2",
          isActive
            ? "text-black dark:text-white"
            : "text-grey dark:text-neutral-400"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-4 self-start text-balance text-[clamp(1.15rem,1.7vw,1.55rem)] leading-[1.15] font-medium tracking-[-0.02em] lg:row-start-2 lg:mt-0">
        {item.title}
      </h3>
      <p className="mt-3 max-w-[48ch] self-start text-[15px] leading-[1.7] text-grey lg:row-start-2 lg:mt-0">
        {item.body}
      </p>
    </Reveal>
  );
}

export function StrengthsSection() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const numeralRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  React.useEffect(() => {
    let ticking = false;

    const getStickyThreshold = (el: HTMLElement | null): number => {
      if (typeof window === "undefined") return 120;
      if (el) {
        const computedTop = parseFloat(window.getComputedStyle(el).top);
        if (!isNaN(computedTop) && computedTop > 0) {
          return computedTop;
        }
      }
      const navHeightStr = getComputedStyle(document.documentElement)
        .getPropertyValue("--nav-height")
        .trim();
      const navHeight = parseFloat(navHeightStr) || 84;
      const vh5 = window.innerHeight * 0.05;
      const clamped = Math.min(Math.max(24, vh5), 64);
      return navHeight + clamped;
    };

    const updateActiveIndex = () => {
      const elements = numeralRefs.current;
      if (!elements || elements.length === 0) return;

      const firstEl = elements.find((el) => el !== null) ?? null;
      const threshold = getStickyThreshold(firstEl);

      let highestReached = 0;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Check if numeral has reached the sticky threshold (with tolerance for subpixels)
        if (rect.top <= threshold + 6) {
          highestReached = i;
        }
      }

      setActiveIndex((prev) => (prev !== highestReached ? highestReached : prev));
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveIndex();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Calculate immediately on mount
    updateActiveIndex();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="strengths" className="section bg-white">
      <Reveal className="mb-[clamp(24px,3vw,44px)]">
        <span className="eyebrow">Our strengths</span>
        <h2 className="max-w-[24ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          Eight reasons we make a difference.
        </h2>
      </Reveal>

      {strengths.map((item, index) => (
        <StrengthRow
          key={item.title}
          index={index}
          item={item}
          isActive={activeIndex === index}
          numeralRef={(el) => {
            numeralRefs.current[index] = el;
          }}
        />
      ))}
    </section>
  );
}
