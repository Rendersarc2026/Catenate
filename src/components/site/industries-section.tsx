"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { industries, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";
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

  const activeCategoryMeta =
    CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  const filteredIndustries = React.useMemo(
    () =>
      activeCategoryMeta.slugs
        .map((slug) => industries.find((ind) => ind.slug === slug))
        .filter((ind): ind is Industry => ind !== undefined),
    [activeCategoryMeta]
  );

  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-black text-white border-y border-neutral-900 py-[clamp(56px,7vw,96px)] outline-none scroll-mt-24"
    >
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
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-full px-5 sm:px-6 py-2.5 text-[13px] sm:text-[13.5px] font-medium whitespace-nowrap select-none cursor-pointer",
                    "transition-all duration-200 ease-expo active:scale-[0.97]",
                    isActive
                      ? "bg-white text-black font-semibold border border-white shadow-[0_2px_14px_rgba(255,255,255,0.2)]"
                      : "border border-white/25 bg-transparent text-white/80 hover:border-white/50 hover:text-white hover:bg-white/5"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sector cards row matching mockup */}
        <div className="w-full pt-1">
          <IndustryCollage
            key={activeCategory}
            industries={filteredIndustries}
            onOpenDetail={setOpenedIndustry}
          />
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
