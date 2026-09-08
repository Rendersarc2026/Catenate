"use client";

import * as React from "react";
import { Reveal } from "@/components/site/reveal";
import { industries, type Industry } from "@/data/catenate";
import { IndustryArchDeck } from "./industries/industry-arch-deck";
import { IndustryDetailDialog } from "./industries/industry-detail-dialog";

export function IndustriesSection() {
  const [activeIndex, setActiveIndex] = React.useState(3);
  const [openedIndustry, setOpenedIndustry] = React.useState<Industry | null>(
    null,
  );

  return (
    <section
      id="industries"
      className="section section-flush relative overflow-hidden bg-off [background-image:radial-gradient(rgb(26_29_46/0.06)_1px,transparent_1px)] [background-size:24px_24px] outline-none scroll-mt-24"
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

      </div>

      {/* Sector Arch Deck */}
      <div className="mt-10 sm:mt-14 border-b border-ink/10">
        <IndustryArchDeck
          industries={industries}
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
