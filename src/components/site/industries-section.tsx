"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { industries, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";
import { IndustryCollage } from "./industries/industry-collage";
import { IndustryDetailDialog } from "./industries/industry-detail-dialog";
import { SECTOR_CATEGORIES as CATEGORIES } from "./industries/types";

export function IndustriesSection() {
  const [activeCategory, setActiveCategory] = React.useState(CATEGORIES[0].id);
  const [openedIndustry, setOpenedIndustry] = React.useState<Industry | null>(
    null,
  );

  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = React.useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  React.useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = CATEGORIES.findIndex((c) => c.id === activeCategory);
      const activeBtn = buttonRefs.current[activeIndex];
      if (activeBtn) {
        setIndicator({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeCategory]);

  const activeCategoryMeta =
    CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  const filteredIndustries = React.useMemo(
    () =>
      // Ordered by the category's own slug list so each view has a deliberate
      // opening tile rather than whatever order the master list happens to use.
      activeCategoryMeta.slugs
        .map((slug) => industries.find((ind) => ind.slug === slug))
        .filter((ind): ind is Industry => ind !== undefined),
    [activeCategoryMeta],
  );

  return (
    <section
      id="industries"
      className={cn(
        "section-flush relative overflow-hidden bg-black outline-none scroll-mt-24 text-white border-y border-neutral-900",
        // From sm up the section fills the viewport and the grid absorbs the
        // height the header leaves. On phones the tiles stack into one column,
        // where forcing a single screen would crush them -- so it scrolls.
        "flex flex-col gap-[clamp(24px,3vw,48px)] sm:min-h-svh",
        "py-[clamp(48px,6vw,88px)]",
      )}
    >
      {/* Header statement */}
      <div className="content-pad">
        <Reveal className="relative z-2">
          <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <h2 className="max-w-[20ch] text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] font-medium tracking-[-0.028em] text-white text-balance">
              Every sector demands a different solution.
            </h2>

            <p className="lead max-w-[44ch] text-[16px] text-white/55 text-balance md:pb-2">
              Pick a field below. Each one opens onto the systems, tolerances and
              reference projects we engineer for it.
            </p>
          </div>
        </Reveal>

        {/* Sector filters */}
        <div className="mt-9 -mx-[clamp(16px,4vw,40px)] overflow-x-auto px-[clamp(16px,4vw,40px)] pb-2 scrollbar-none">
          <div
            role="tablist"
            aria-label="Sector categories"
            className="relative flex w-max items-stretch gap-2"
          >
            {/* Animated sliding pill */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 rounded-full bg-white shadow-[0_2px_14px_rgba(255,255,255,0.22)] transition-[transform,width,opacity] duration-300 ease-expo motion-reduce:transition-none"
              style={{
                transform: `translate3d(${indicator.left}px, 0, 0)`,
                width: `${indicator.width}px`,
                opacity: indicator.opacity,
              }}
            />

            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    buttonRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "group relative z-1 inline-flex items-baseline gap-2.5 rounded-full border px-4 py-2.5",
                    "text-[13px] font-medium whitespace-nowrap select-none cursor-pointer",
                    "transition-colors duration-250 ease-expo active:scale-[0.97] motion-reduce:transition-none",
                    isActive
                      ? indicator.opacity > 0
                        ? "border-transparent text-black font-semibold"
                        : "border-white bg-white text-black font-semibold shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
                      : "border-white/15 bg-white/5 text-white/65 hover:border-white/35 hover:text-white hover:bg-white/10",
                  )}
                >
                  <span>{cat.label}</span>
                  <span
                    className={cn(
                      "tnum text-[11px] transition-colors duration-250",
                      isActive
                        ? "text-black/60 font-semibold"
                        : "text-white/35 group-hover:text-white/50",
                    )}
                  >
                    {String(cat.slugs.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sector bento grid, taking whatever height the header leaves */}
      <div className="flex min-h-0 flex-1 flex-col">
        <IndustryCollage
          // Remounting on filter change lets the new set enter fresh instead of
          // cross-fading two unrelated tile layouts.
          key={activeCategory}
          industries={filteredIndustries}
          onOpenDetail={setOpenedIndustry}
        />
      </div>

      {/* Specification detail modal */}
      <IndustryDetailDialog
        industry={openedIndustry}
        onClose={() => setOpenedIndustry(null)}
      />
    </section>
  );
}
