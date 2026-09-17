"use client";

import * as React from "react";

import { Reveal } from "@/components/site/reveal";
import { PillarDetailDialog } from "@/components/site/why-catenate-dialog";
import { whyCatenate, type WhyCatenatePillar } from "@/data/catenate";
import { cn } from "@/lib/utils";

export function WhyCatenate() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedPillar, setSelectedPillar] =
    React.useState<WhyCatenatePillar | null>(null);

  const sectionRef = React.useRef<HTMLElement>(null);
  /*
   * Touch screens have no hover, so below `lg` the pillar nearest the middle
   * of the viewport opens as the reader scrolls past it. Pointer and focus
   * events stand down while the scroll owns the pick, or a tap would close it.
   */
  const [scrollDriven, setScrollDriven] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const list = sectionRef.current;
    if (!list) return;

    let frame: number | null = null;

    const pick = () => {
      frame = null;
      const cards = Array.from(list.querySelectorAll<HTMLElement>(".pillar-card"));
      const middle = window.innerHeight / 2;
      let closest: number | null = null;
      let distance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        // Measure from the numeral, which is what the reader's eye lands on.
        const offset = Math.abs(rect.top + rect.height * 0.3 - middle);
        if (rect.bottom > 0 && rect.top < window.innerHeight && offset < distance) {
          distance = offset;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(pick);
    };

    const sync = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      setScrollDriven(query.matches);
      if (!query.matches) {
        setActiveIndex(null);
        return;
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    };

    sync();
    query.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const hover = (index: number | null) => {
    if (!scrollDriven) setActiveIndex(index);
  };

  const hasActive = activeIndex !== null;

  return (
    <section
      ref={sectionRef}
      id="why-catenate"
      className="section on-blue relative isolate flex min-h-screen min-h-[100dvh] flex-col justify-center items-center bg-black py-12 sm:py-16 lg:py-20 overflow-x-clip text-white"
    >
      {/* Night sky: black crown falling into graphite, with a grey horizon
          glow rising from the foot of the section. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-1 bg-[radial-gradient(72%_40%_at_50%_110%,rgba(214,216,222,1)_0%,rgba(136,140,150,0.9)_26%,rgba(62,65,74,0.55)_54%,transparent_78%),linear-gradient(180deg,#000_0%,#040405_28%,#0c0d10_52%,#1b1c21_78%,#23242a_100%)]"
      />
      <div className="mx-auto flex w-full max-w-[1600px] 2xl:max-w-[1720px] px-6 sm:px-8 xl:px-12 flex-col items-center">
        {/* Section Header: Centered display heading */}
        <Reveal className="mb-12 flex flex-col items-center text-center sm:mb-16 lg:mb-20">
          <h2 className="text-center text-[clamp(2.2rem,4.2vw,3.8rem)] font-medium leading-tight tracking-[-0.03em] text-white whitespace-nowrap">
            Why Catenate
          </h2>
        </Reveal>

        {/* 5 Pillars with Interactive Hover Expansion (Centered with generous gaps) */}
        <Reveal
          stagger
          step={40}
          onMouseLeave={() => hover(null)}
          className="flex w-full flex-col gap-10 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-8 xl:gap-11 2xl:gap-14"
        >
          {whyCatenate.map((item, index) => {
            const isSelected = activeIndex === index;
            const formattedNumber = String(index + 1).padStart(2, "0");

            return (
              <button
                type="button"
                key={item.title}
                onClick={() => setSelectedPillar(item)}
                onMouseEnter={() => hover(index)}
                onMouseLeave={() => hover(null)}
                onFocus={() => hover(index)}
                onBlur={() => hover(null)}
                aria-label={`Pillar ${formattedNumber}: ${item.title}`}
                className={cn(
                  "pillar-card group relative flex min-w-0 flex-col items-center text-center cursor-pointer select-none rounded-2xl px-2.5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-0",
                  "h-[390px] sm:h-[410px] lg:h-[430px] justify-start",
                  "lg:flex-1 lg:max-w-[310px] xl:max-w-[325px]",
                  hasActive
                    ? isSelected
                      ? "z-10 opacity-100"
                      : "opacity-60 hover:opacity-100"
                    : "opacity-100"
                )}
              >
                {/* Sliced / Full Numeral Container (Stable height keeps all sub copy aligned) */}
                <div
                  className="relative mx-auto flex w-full h-[142px] sm:h-[154px] lg:h-[165px] items-start justify-center select-none overflow-visible"
                  aria-hidden="true"
                >
                  <span
                    className={cn(
                      "pillar-num font-heading font-extrabold tracking-[-0.04em] text-[clamp(5.8rem,7.6vw,8.6rem)]",
                      isSelected
                        ? "is-expanded text-white"
                        : "text-white/30 group-hover:text-white/60"
                    )}
                  >
                    {formattedNumber}
                  </span>
                </div>

                {/* Title: scaled rather than resized, so the glyphs grow without
                    the text re-laying out. */}
                <h3
                  className={cn(
                    "pillar-copy pillar-copy--title relative font-bold leading-tight tracking-[-0.02em] whitespace-nowrap mt-4 text-[15px] sm:text-[16px] lg:text-[17px]",
                    isSelected ? "is-expanded z-20 text-white" : "text-white/80"
                  )}
                >
                  {item.title}
                </h3>

                {/* Body: the paragraph keeps one fixed font size and width, so its
                    line breaks never move at any scale. Only a top-anchored scale
                    changes; the wrapper reserves the doubled height so the columns
                    beside it never shift. */}
                <div className="mt-7 flex min-h-[150px] w-full items-start justify-center">
                  <p
                    className={cn(
                      "pillar-copy pillar-copy--body relative w-[150px] text-center text-[11px] sm:text-[11.5px] leading-[1.6]",
                      isSelected
                        ? "is-expanded z-20 text-white/85 opacity-100"
                        : "text-white/50 opacity-75"
                    )}
                  >
                    {item.body}
                  </p>
                </div>
              </button>
            );
          })}
        </Reveal>
      </div>

      {/* Detailed Technical Dossier Dialog */}
      <PillarDetailDialog
        pillar={selectedPillar}
        index={
          selectedPillar
            ? whyCatenate.findIndex((p) => p.title === selectedPillar.title)
            : null
        }
        onClose={() => setSelectedPillar(null)}
      />
    </section>
  );
}
