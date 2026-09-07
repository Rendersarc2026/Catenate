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
      <div className="mx-auto flex w-full max-w-[1440px] xl:max-w-[1580px] 2xl:max-w-[1720px] px-6 sm:px-8 xl:px-12 flex-col items-center">
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
          className="flex w-full flex-col gap-10 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-8 xl:gap-14 2xl:gap-20"
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
                  isSelected
                    ? "lg:flex-[1.55] xl:flex-[1.7] lg:max-w-[320px] xl:max-w-[350px] z-10 opacity-100"
                    : "lg:flex-1 lg:max-w-[220px] xl:max-w-[240px] opacity-80 hover:opacity-100"
                )}
              >
                {/* Sliced / Full Numeral Container */}
                <div
                  className={cn(
                    "relative mx-auto flex w-full items-start justify-center select-none overflow-visible transition-[height] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isSelected
                      ? "h-[142px] sm:h-[156px] lg:h-[168px]"
                      : "h-[74px] sm:h-[80px] lg:h-[86px]"
                  )}
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

                {/* Title */}
                <h3
                  className={cn(
                    "font-bold leading-tight tracking-[-0.02em] whitespace-nowrap transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isSelected
                      ? "mt-5 text-[22px] sm:text-[24px] lg:text-[25px] text-ink"
                      : "mt-3.5 text-[15px] sm:text-[16px] lg:text-[16.5px] text-ink/80"
                  )}
                >
                  {item.title}
                </h3>

                {/* Body with stable min-height to prevent vertical layout shifts */}
                <div className="mt-3.5 flex min-h-[76px] items-start justify-center">
                  <p
                    className={cn(
                      "leading-[1.65] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isSelected
                        ? "text-[14px] sm:text-[14.5px] lg:text-[15px] text-grey max-w-[34ch] opacity-100"
                        : "text-[12px] sm:text-[12.5px] lg:text-[13px] text-grey/75 max-w-[24ch] opacity-80"
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
