"use client";

import Image from "next/image";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { images, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";

interface IndustryCollageProps {
  industries: Industry[];
  onOpenDetail: (industry: Industry) => void;
  /**
   * Cascade the tiles in. Only for the first paint — once the visitor starts
   * switching filters the view transition owns the change, and running both
   * would animate every tile twice.
   */
  stagger?: boolean;
}

export function IndustryCollage({
  industries,
  onOpenDetail,
  stagger = false,
}: IndustryCollageProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 w-full">
        {industries.map((industry, index) => (
          <IndustryCard
            key={industry.slug}
            industry={industry}
            index={index}
            stagger={stagger}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </div>
  );
}

interface IndustryCardProps {
  industry: Industry;
  index: number;
  stagger: boolean;
  onOpenDetail: (industry: Industry) => void;
}

const IndustryCard = React.memo(function IndustryCard({
  industry,
  index,
  stagger,
  onOpenDetail,
}: IndustryCardProps) {
  const handleOpen = React.useCallback(() => {
    onOpenDetail(industry);
  }, [industry, onOpenDetail]);

  return (
    /*
     * Two elements, deliberately. The wrapper owns the entrance animation and
     * the hover lift; the button owns the clipped content. Keeping them apart
     * means the entrance animation's fill state can't overwrite the hover
     * transform, and the lift shadow isn't clipped by the card's own overflow.
     */
    <div
      className={cn("industry-tile", stagger && "industry-tile-enter")}
      style={
        {
          "--tile-index": index,
          viewTransitionName: `industry-${industry.slug}`,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`${industry.name} — view specification`}
        className={cn(
          "group relative flex flex-col w-full h-full text-left cursor-pointer outline-none",
          "bg-white rounded-[inherit] overflow-hidden",
          "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        )}
      >
        {/* Upper image container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-t-[inherit]">
          <Image
            src={images.industry(industry.slug)}
            alt={industry.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover scale-100 transition-[scale] duration-700 ease-expo motion-safe:group-hover:scale-105"
          />

          {/* Hover arrow indicator in top right */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 transition-opacity duration-300 ease-expo group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>

        {/* Lower copy area */}
        <div className="flex flex-col flex-1 px-4 py-3.5 text-black">
          <div>
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-neutral-950 leading-snug tracking-tight line-clamp-2 min-h-[2.35rem] sm:min-h-[2.5rem]">
              {industry.name}
            </h3>
            <p className="mt-1.5 text-[12px] sm:text-[12.5px] leading-snug text-neutral-600 line-clamp-2">
              {industry.challenge}
            </p>
          </div>

          <div className="mt-auto pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
            <span className="truncate pr-2">{industry.reference}</span>
            <span className="shrink-0">{industry.systems.length} systems</span>
          </div>
        </div>
      </button>
    </div>
  );
});
