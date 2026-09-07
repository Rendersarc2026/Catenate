"use client";

import Image from "next/image";
import * as React from "react";
import { ChevronRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { whyCatenate } from "@/data/catenate";
import { cn } from "@/lib/utils";

export function WhyCatenate() {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const activeItem = whyCatenate[selectedIndex] ?? whyCatenate[0];

  return (
    <section id="why-catenate" className="section bg-white">
      {/* Top Tier: Image and Dynamic Details of Selected Pillar */}
      <Reveal className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-ink/8 bg-neutral-100 shadow-sm">
          <Image
            key={activeItem.image}
            src={activeItem.image}
            alt={activeItem.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale contrast-110 transition-all duration-500 hover:scale-105"
            priority={selectedIndex === 0}
          />
          <div className="absolute top-4 left-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
            {activeItem.tag}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-3 flex items-center gap-2">
            <span className="eyebrow mb-0 text-grey">Why Catenate</span>
            <span className="text-xs text-grey/50">/</span>
            <span className="text-xs font-semibold tracking-wide text-blue uppercase">
              Pillar {String(selectedIndex + 1).padStart(2, "0")}
            </span>
          </div>

          <h2
            key={`headline-${selectedIndex}`}
            className="text-balance text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.14] tracking-[-0.025em] text-ink animate-in fade-in duration-300"
          >
            {activeItem.headline}
          </h2>

          <p
            key={`detail-${selectedIndex}`}
            className="mt-4 max-w-[50ch] text-[15px] leading-[1.7] text-grey sm:mt-5 sm:text-[16px] animate-in fade-in duration-300"
          >
            {activeItem.detail}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink/8 pt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-off px-3 py-1 text-[12px] font-medium text-ink">
              <span className="size-1.5 rounded-full bg-blue" />
              {activeItem.title}
            </span>
            <span className="text-[12px] text-grey">
              Select any card below to reveal specifications
            </span>
          </div>
        </div>
      </Reveal>

      {/* Bottom Tier: All 5 Interactive Feature Cards */}
      <div className="mt-14 sm:mt-20">
        <Reveal
          stagger
          step={50}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4.5"
        >
          {whyCatenate.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                type="button"
                key={item.title}
                onClick={() => setSelectedIndex(index)}
                aria-pressed={isSelected}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl p-5 text-left transition-all duration-300 ease-expo cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue sm:p-6",
                  isSelected
                    ? "-translate-y-1.5 border border-ink/15 bg-white shadow-[0_20px_40px_-15px_rgba(26,29,46,0.14)] ring-1 ring-ink/5"
                    : "border border-ink/8 bg-transparent hover:-translate-y-1 hover:border-ink/12 hover:bg-white hover:shadow-[0_16px_32px_-12px_rgba(26,29,46,0.08)]"
                )}
              >
                <div>
                  {/* Top-right square numeral badge */}
                  <div className="mb-5 flex items-center justify-end">
                    <span
                      className={cn(
                        "tnum flex size-7 items-center justify-center rounded-[4px] text-[12px] font-semibold transition-colors duration-200",
                        isSelected
                          ? "bg-ink text-white"
                          : "bg-ink/85 text-white group-hover:bg-ink"
                      )}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3
                    className={cn(
                      "text-[17px] font-bold tracking-[-0.015em] transition-colors duration-200",
                      isSelected ? "text-ink" : "text-ink/90 group-hover:text-ink"
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Accent horizontal dash */}
                  <div
                    className={cn(
                      "my-3 h-[2px] w-6 transition-colors duration-200",
                      isSelected ? "bg-ink" : "bg-ink/60 group-hover:bg-ink"
                    )}
                    aria-hidden="true"
                  />

                  {/* Card Body */}
                  <p className="text-[13px] leading-[1.6] text-grey">
                    {item.body}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 flex items-center gap-1.5 text-[12px] font-medium transition-colors">
                  <span
                    className={cn(
                      "transition-colors duration-200",
                      isSelected
                        ? "font-semibold text-blue"
                        : "text-ink/75 group-hover:text-ink"
                    )}
                  >
                    {isSelected ? "Active Details" : "More Detailed"}
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      isSelected
                        ? "translate-x-1 text-blue"
                        : "text-ink/60 group-hover:translate-x-1 group-hover:text-ink"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
