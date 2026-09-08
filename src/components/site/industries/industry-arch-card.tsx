"use client";

import * as React from "react";
import Image from "next/image";
import { Globe, Maximize2 } from "lucide-react";

import { images, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";

const LABEL_ROW = 28;

interface IndustryArchCardProps {
  industry: Industry;
  index: number;
  total: number;
  distanceFromCenter: number;
  isActive: boolean;
  cardWidth: number;
  cardHeight: number;
  maxCardHeight: number;
  onSelectIndex: (index: number) => void;
  onOpenDetail: (industry: Industry) => void;
}

export const IndustryArchCard = React.memo(function IndustryArchCard({
  industry,
  index,
  total,
  distanceFromCenter,
  isActive,
  cardWidth,
  cardHeight,
  maxCardHeight,
  onSelectIndex,
  onOpenDetail,
}: IndustryArchCardProps) {
  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isActive) {
        onOpenDetail(industry);
      } else {
        onSelectIndex(index);
      }
    },
    [isActive, industry, index, onOpenDetail, onSelectIndex]
  );

  const handleBadgeClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onOpenDetail(industry);
    },
    [industry, onOpenDetail]
  );

  // Progressive opacity down the curve for depth
  const opacity =
    distanceFromCenter === 0
      ? 1
      : distanceFromCenter === 1
      ? 0.95
      : distanceFromCenter === 2
      ? 0.85
      : distanceFromCenter === 3
      ? 0.7
      : 0.45;

  return (
    <div
      className="group flex flex-col justify-end shrink-0 select-none cursor-pointer outline-none transform-gpu"
      style={{ width: `${cardWidth}px`, height: `${maxCardHeight + LABEL_ROW}px` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${industry.name} — ${isActive ? "Open full specification" : "View sector"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {/* Hovering label above the card top-left matching reference design */}
      <div
        style={{ height: `${LABEL_ROW}px` }}
        className={cn(
          "flex items-center gap-1.5 text-left transition-colors duration-300 ease-expo motion-reduce:transition-none pl-0.5 shrink-0",
          isActive
            ? "text-ink font-medium"
            : "text-ink/65 group-hover:text-ink font-normal"
        )}
      >
        <span
          className={cn(
            "size-2 rounded-full border transition-[transform,background-color,border-color] duration-300 ease-expo motion-reduce:transition-none shrink-0",
            isActive
              ? "border-ink bg-ink scale-110"
              : "border-ink/40 bg-transparent group-hover:border-ink/70"
          )}
        />
        <span className="text-xs sm:text-[13px] tracking-tight truncate">
          {industry.name}
        </span>
      </div>

      {/* Card Body with GPU-accelerated height transition */}
      <div
        style={{
          height: `${cardHeight}px`,
          opacity,
        }}
        className={cn(
          "relative w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-ink/5",
          "border border-black/[0.08] transform-gpu will-change-[height,opacity]",
          "transition-[height,opacity] duration-550 ease-expo motion-reduce:transition-none",
          isActive
            ? "shadow-[0_24px_50px_-12px_rgba(26,29,46,0.28)] ring-1 ring-black/10 scale-100"
            : "shadow-[0_10px_25px_-10px_rgba(26,29,46,0.12)] hover:shadow-[0_18px_36px_-10px_rgba(26,29,46,0.2)] hover:opacity-100"
        )}
      >
        {/* Full Bleed Photography */}
        <Image
          src={images.industry(industry.slug)}
          alt={industry.name}
          fill
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 250px, 280px"
          // The visible cards are the ones near the centre of the arch, not a
          // fixed index range -- the rendered window slides as the deck cycles.
          priority={distanceFromCenter <= 2}
          className={cn(
            "object-cover transition-transform duration-700 ease-expo motion-reduce:transition-none",
            isActive
              ? "scale-100 group-hover:scale-105"
              : "scale-105 group-hover:scale-100"
          )}
        />

        {/* Top-Right Icon Badge */}
        <button
          type="button"
          onClick={handleBadgeClick}
          aria-label={`Open ${industry.name} specification dossier`}
          className={cn(
            "absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 size-7 sm:size-8 rounded-[8px] sm:rounded-[10px]",
            "bg-white/95 backdrop-blur-md shadow-sm border border-black/5",
            "flex items-center justify-center text-ink transition-[transform,background-color,box-shadow] duration-300 ease-expo motion-reduce:transition-none",
            "hover:scale-110 hover:bg-white hover:shadow-md cursor-pointer active:scale-95"
          )}
        >
          {isActive ? (
            <Globe className="size-3.5 sm:size-4 text-ink" />
          ) : (
            <Maximize2 className="size-3 sm:size-3.5 text-ink/75 group-hover:text-ink" />
          )}
        </button>

        {/* Subtle Hover Reveal Scrim for Engineering Systems */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-expo motion-reduce:transition-none flex flex-col justify-end text-white">
          <p className="text-[12px] text-white/90 line-clamp-2 leading-snug">
            {industry.challenge}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {industry.systems.slice(0, 2).map((sys) => (
              <span
                key={sys}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/20 backdrop-blur-md border border-white/20"
              >
                {sys}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
