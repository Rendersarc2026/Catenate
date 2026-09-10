"use client";

import Image from "next/image";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { images, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";

interface IndustryCollageProps {
  industries: Industry[];
  onOpenDetail: (industry: Industry) => void;
}

export function IndustryCollage({
  industries,
  onOpenDetail,
}: IndustryCollageProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 w-full">
        {industries.map((industry, index) => (
          <IndustryCard
            key={industry.slug}
            industry={industry}
            index={index}
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
  onOpenDetail: (industry: Industry) => void;
}

const IndustryCard = React.memo(function IndustryCard({
  industry,
  index,
  onOpenDetail,
}: IndustryCardProps) {
  const handleOpen = React.useCallback(() => {
    onOpenDetail(industry);
  }, [industry, onOpenDetail]);

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label={`${industry.name} — view specification`}
      style={{ animationDelay: `${index * 45}ms` }}
      className={cn(
        "group relative flex flex-col w-full h-full text-left cursor-pointer outline-none",
        "bg-white rounded-[20px] sm:rounded-[22px] overflow-hidden",
        "shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]",
        "transition-[transform,box-shadow] duration-300 ease-expo hover:-translate-y-1.5",
        "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "bento-tile-enter"
      )}
    >
      {/* Upper image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-t-[20px] sm:rounded-t-[22px]">
        <Image
          src={images.industry(industry.slug)}
          alt={industry.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
        />

        {/* Hover arrow indicator in top right */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 transition-opacity duration-200 ease-expo group-hover:opacity-100"
        >
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>

      {/* Lower copy area */}
      <div className="flex flex-col justify-between flex-1 p-5 text-black">
        <div>
          <h3 className="text-[16px] sm:text-[17px] font-semibold text-neutral-950 leading-snug tracking-tight line-clamp-2 min-h-[2.6rem] sm:min-h-[2.75rem]">
            {industry.name}
          </h3>
          <p className="mt-2 text-[12px] sm:text-[12.5px] leading-relaxed text-neutral-600 line-clamp-3 min-h-[3.3rem] sm:min-h-[3.5rem]">
            {industry.challenge}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
          <span className="truncate">{industry.reference}</span>
          <span className="shrink-0">{industry.systems.length} systems</span>
        </div>
      </div>
    </button>
  );
});
