"use client";

import * as React from "react";

import { Reveal } from "@/components/site/reveal";
import { PillarDetailDialog } from "@/components/site/why-catenate-dialog";
import { whyCatenate, type WhyCatenatePillar } from "@/data/catenate";
import { cn } from "@/lib/utils";

export function WhyCatenate() {
  // Default to index 1 ("02"), which the reference design shows highlighted.
  const [activeIndex, setActiveIndex] = React.useState<number>(1);
  const [selectedPillar, setSelectedPillar] =
    React.useState<WhyCatenatePillar | null>(null);

  return (
    <section
      id="why-catenate"
      className="section flex min-h-screen flex-col justify-center bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="w-full">
        {/* Section Header: Left-aligned bold heading */}
        <Reveal className="mb-14 sm:mb-20 lg:mb-24">
          <h2 className="text-[clamp(2.6rem,5vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.035em] text-ink">
            Why
            <br />
            Catenate
          </h2>
        </Reveal>

      {/* 5-Column Grid with Sliced Numerals */}
      <Reveal
        stagger
        step={50}
        className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8"
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
              onFocus={() => setActiveIndex(index)}
              aria-label={`Pillar ${formattedNumber}: ${item.title}`}
              className="group flex flex-col items-center text-center cursor-pointer rounded-2xl p-2 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-graphite focus-visible:ring-offset-4"
            >
              {/* Sliced Numeral Container with Expand on Hover */}
              <div
                className="relative mx-auto flex h-[76px] sm:h-[88px] lg:h-[98px] w-full items-start justify-center select-none text-[clamp(4.4rem,7vw,7.2rem)]"
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "pillar-num font-heading font-extrabold leading-[0.8] tracking-[-0.04em]",
                    isSelected ? "text-graphite" : "text-[#d3d5dc] group-hover:text-graphite"
                  )}
                >
                  {formattedNumber}
                </span>
              </div>

              {/* Title */}
              <h3
                className={cn(
                  "mt-3 text-[17px] sm:text-[18px] font-bold leading-snug tracking-[-0.015em] transition-colors duration-200",
                  isSelected
                    ? "text-ink"
                    : "text-ink/90 group-hover:text-graphite"
                )}
              >
                {item.title}
              </h3>

              {/* Body */}
              <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.65] text-grey max-w-[28ch] mx-auto">
                {item.body}
              </p>
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
