"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { industries, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";
import { startViewTransition } from "@/lib/view-transition";
import { IndustryCollage } from "./industries/industry-collage";
import { IndustryDetailDialog } from "./industries/industry-detail-dialog";
import { SECTOR_CATEGORIES as CATEGORIES } from "./industries/types";

export function IndustriesSection() {
  // Default to Manufacturing & Mobility (5 items) matching the mockup
  const [activeCategory, setActiveCategory] = React.useState(
    CATEGORIES[2]?.id ?? CATEGORIES[0].id
  );
  const [openedIndustry, setOpenedIndustry] = React.useState<Industry | null>(
    null
  );
  /*
   * The staggered entrance is a first-impression device. After the first
   * filter change the view transition carries the swap, so the cascade would
   * only be a second animation fighting the first.
   */
  const [hasFiltered, setHasFiltered] = React.useState(false);

  const activeCategoryMeta =
    CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  const filteredIndustries = React.useMemo(
    () =>
      activeCategoryMeta.slugs
        .map((slug) => industries.find((ind) => ind.slug === slug))
        .filter((ind): ind is Industry => ind !== undefined),
    [activeCategoryMeta]
  );

  const selectCategory = React.useCallback(
    (id: string) => {
      if (id === activeCategory) return;
      startViewTransition(() => {
        setActiveCategory(id);
        setHasFiltered(true);
      });
    },
    [activeCategory]
  );

  return (
    <section
      id="industries"
      className="bg-white py-4 sm:py-6 md:py-8 lg:py-10 outline-none scroll-mt-24"
    >
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[clamp(16px,2vw,28px)] border border-neutral-900 bg-black text-white py-[clamp(56px,7vw,96px)]">
          <div className="content-pad flex flex-col gap-7 sm:gap-9">
        {/* Header statement matching mockup */}
        <Reveal className="relative z-2">
          <div className="flex flex-col gap-3.5 max-w-3xl">
            <h2 className="text-[clamp(2.3rem,4.4vw,3.8rem)] leading-[1.06] font-medium tracking-[-0.03em] text-white">
              Every sector demands
              <br />
              a different solution.
            </h2>

            <p className="text-[15px] sm:text-[16px] text-white/70">
              Explore the systems, specifications and projects we engineer for each one.
            </p>
          </div>
        </Reveal>

        {/* Sector filter pills matching mockup */}
        <div className="overflow-x-auto pb-1 scrollbar-none -mx-[clamp(16px,4vw,40px)] px-[clamp(16px,4vw,40px)] sm:mx-0 sm:px-0">
          <div
            role="tablist"
            aria-label="Sector categories"
            className="flex items-center gap-2.5 sm:gap-3 w-max sm:w-auto flex-wrap"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectCategory(cat.id)}
                  className={cn(
                    "relative rounded-full px-5 sm:px-6 py-2.5 text-[13px] sm:text-[13.5px] font-medium whitespace-nowrap select-none cursor-pointer",
                    "border transition-[color,background-color,border-color,scale] duration-300 ease-expo active:scale-[0.97]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    isActive
                      ? "border-transparent text-black font-semibold"
                      : "border-white/25 bg-transparent text-white/80 hover:border-white/50 hover:text-white hover:bg-white/5"
                  )}
                >
                  {/*
                   * One pill for the whole row rather than a background per
                   * chip: it carries a single view-transition-name, so the
                   * browser slides it from the old chip to the new one instead
                   * of blinking it off here and on over there.
                   */}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      style={{ viewTransitionName: "sector-chip-pill" }}
                      className="absolute inset-0 rounded-full bg-white shadow-[0_2px_14px_rgba(255,255,255,0.2)]"
                    />
                  ) : null}
                  {/* Sits after the pill in paint order, so it needs no
                      z-index of its own to stay legible on top of it. */}
                  <span
                    className="sector-chip-label relative"
                    style={{ viewTransitionName: `sector-chip-${cat.id}` }}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sector cards row matching mockup */}
        <div className="w-full pt-1">
          <IndustryCollage
            industries={filteredIndustries}
            stagger={!hasFiltered}
            onOpenDetail={setOpenedIndustry}
          />
        </div>
      </div>
    </div>
  </div>

      {/* Specification detail modal */}
      <IndustryDetailDialog
        industry={openedIndustry}
        onClose={() => setOpenedIndustry(null)}
      />
    </section>
  );
}
