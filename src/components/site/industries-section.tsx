"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { industries, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";
import { IndustryArchDeck } from "./industries/industry-arch-deck";
import { IndustryDetailDialog } from "./industries/industry-detail-dialog";
import { SECTOR_CATEGORIES } from "./industries/types";

export function IndustriesSection() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [activeIndex, setActiveIndex] = React.useState(3);
  const [openedIndustry, setOpenedIndustry] = React.useState<Industry | null>(
    null,
  );

  const filteredIndustries = React.useMemo(() => {
    if (activeCategory === "all") return industries;
    const category = SECTOR_CATEGORIES.find((c) => c.id === activeCategory);
    if (!category) return industries;
    return industries.filter((ind) => category.slugs.includes(ind.slug));
  }, [activeCategory]);

  React.useEffect(() => {
    setActiveIndex((prev) =>
      Math.min(prev, Math.max(0, filteredIndustries.length - 1))
    );
  }, [filteredIndustries.length]);

  return (
    <section
      id="industries"
      className="section section-flush relative overflow-hidden bg-off [background-image:radial-gradient(rgb(26_29_46/0.06)_1px,transparent_1px)] [background-size:24px_24px] outline-none"
    >
      {/* Header Statement */}
      <div className="content-pad">
        <Reveal className="relative z-2 text-center">
          <h2 className="mx-auto max-w-[28ch] text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.15] font-medium tracking-[-0.02em] text-ink text-balance">
            Every sector demands a different solution.
          </h2>

          <p className="lead mx-auto mt-3.5 max-w-[50ch] text-[16px] text-grey text-balance">
            Explore engineering solutions built for your industry.
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
                  onClick={() => {
                    setActiveCategory((prev) =>
                      prev === cat.id ? "all" : cat.id,
                    );
                    setActiveIndex(0);
                  }}
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

      {/* Sector Arch Deck */}
      <div className="mt-10 sm:mt-14 border-b border-ink/10">
        <IndustryArchDeck
          industries={filteredIndustries}
          activeIndex={activeIndex}
          onSelectIndex={setActiveIndex}
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
