"use client";

import * as React from "react";

import { Reveal } from "@/components/site/reveal";
import { PillarDetailDialog } from "@/components/site/why-catenate-dialog";
import { whyCatenate, type WhyCatenatePillar } from "@/data/catenate";
import { cn } from "@/lib/utils";

export function WhyCatenate() {
  // Default to index 0 ("01"), as requested.
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [selectedPillar, setSelectedPillar] =
    React.useState<WhyCatenatePillar | null>(null);

  return (
    <section
      id="why-catenate"
      className="section flex min-h-screen min-h-[100dvh] flex-col justify-center items-center bg-white py-12 sm:py-16 lg:py-20 overflow-x-clip"
    >
      <div className="mx-auto flex w-full max-w-[1600px] 2xl:max-w-[1720px] px-6 sm:px-8 xl:px-12 flex-col items-center">
        {/* Section Header: Centered display heading */}
        <Reveal className="mb-14 flex flex-col items-center text-center sm:mb-20 lg:mb-24">
          <h2 className="text-center text-[clamp(2.8rem,5.4vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
            Why
            <br />
            Catenate
          </h2>
        </Reveal>

        {/* 5 Pillars with Interactive Hover Expansion (Centered with generous gaps) */}
        <Reveal
          stagger
          step={40}
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
                onMouseEnter={() => setActiveIndex(index)}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-label={`Pillar ${formattedNumber}: ${item.title}`}
                className={cn(
                  "pillar-card group relative flex min-w-0 flex-col items-center text-center cursor-pointer select-none rounded-2xl px-2.5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4",
                  "h-[390px] sm:h-[410px] lg:h-[430px] justify-start",
                  "lg:flex-1 lg:max-w-[310px] xl:max-w-[325px]",
                  isSelected ? "z-10 opacity-100" : "opacity-80 hover:opacity-100"
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
                        ? "is-expanded text-[#1e2230]"
                        : "text-[#d2d6df] group-hover:text-ink/60"
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
                    isSelected ? "is-expanded z-20 text-ink" : "text-ink/80"
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
                        ? "is-expanded z-20 text-grey opacity-100"
                        : "text-grey/80 opacity-75"
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
