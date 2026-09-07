"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { industries, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";
import { IndustryMosaic } from "./industries/industry-mosaic";
import { IndustryDetailDialog } from "./industries/industry-detail-dialog";
import { SECTOR_CATEGORIES } from "./industries/types";

export function IndustriesSection() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [openedIndustry, setOpenedIndustry] = React.useState<Industry | null>(
    null,
  );

  // Slugs the wall should keep lit; `null` means every tile stays lit.
  const highlightedSlugs = React.useMemo(() => {
    if (activeCategory === "all") return null;
    const category = SECTOR_CATEGORIES.find((c) => c.id === activeCategory);
    return category ? new Set(category.slugs) : null;
  }, [activeCategory]);

  return (
    <section
      id="industries"
      className="section section-flush relative overflow-hidden bg-off [background-image:radial-gradient(rgb(26_29_46/0.06)_1px,transparent_1px)] [background-size:24px_24px] outline-none"
    >
      {/* Header Statement */}
      <div className="content-pad">
        <Reveal className="relative z-2 text-center">
          <h2 className="mx-auto max-w-[20ch] text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.15] font-medium tracking-[-0.02em] text-ink">
            The sector decides the specification.
          </h2>

          <p className="lead mx-auto mt-3.5 max-w-[62ch] text-[16px] text-grey">
            Every operating environment commands verified chemistries, certified
            compliance, and precise application windows. Explore our engineering
            solutions across each domain.
          </p>
        </Reveal>

        {/* Category Navigation Pills */}
        <div className="mt-8 flex items-center justify-center overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 p-1.5 shadow-sm backdrop-blur-md">
            {SECTOR_CATEGORIES.map((cat) => {
              const count =
                cat.id === "all" ? industries.length : cat.slugs.length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setActiveCategory((prev) =>
                      prev === cat.id ? "all" : cat.id,
                    )
                  }
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 cursor-pointer select-none whitespace-nowrap",
                    isActive
                      ? "bg-blue text-white shadow-md shadow-blue/20"
                      : "text-ink/70 hover:bg-ink/5 hover:text-ink",
                  )}
                >
                  <span>{cat.label}</span>
                  <span
                    className={cn(
                      "tnum text-[10px] px-1.5 py-0.5 rounded-full",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-ink/8 text-ink/60",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sector Wall */}
      <div className="mt-12 border-y border-ink/10">
        <IndustryMosaic
          industries={industries}
          highlightedSlugs={highlightedSlugs}
          onOpenDetail={setOpenedIndustry}
        />
      </div>

      {/* Specification Detail Modal Dialog */}
      <IndustryDetailDialog
        industry={openedIndustry}
        onClose={() => setOpenedIndustry(null)}
      />
    </section>
  );
}
