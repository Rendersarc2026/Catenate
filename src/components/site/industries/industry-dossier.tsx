"use client"

import * as React from "react"
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Pause,
  Play,
  SlidersHorizontal,
} from "lucide-react"

import { ArrowButton } from "@/components/site/arrow-button"
import type { Industry } from "@/data/catenate"
import { cn } from "@/lib/utils"

interface IndustryDossierProps {
  current: Industry
  currentIndex: number
  totalCount: number
  isAutoPlaying: boolean
  onToggleAutoplay: () => void
  onPrev: () => void
  onNext: () => void
  onSelectIndex: (index: number) => void
  onOpenDetail: () => void
}

export function IndustryDossier({
  current,
  currentIndex,
  totalCount,
  isAutoPlaying,
  onToggleAutoplay,
  onPrev,
  onNext,
  onSelectIndex,
  onOpenDetail,
}: IndustryDossierProps) {
  return (
    <div className="relative z-10 mx-auto mt-8 max-w-[1240px] rounded-[24px] border border-ink/10 bg-white/95 p-6 shadow-[0_20px_50px_-20px_rgba(26,29,46,0.08)] backdrop-blur-md sm:p-8">
      {/* Top Bar: Active Indicator & Progress Track */}
      <div className="flex flex-col gap-4 border-b border-ink/8 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="tnum font-mono text-xs font-semibold tracking-wider text-blue bg-blue/10 px-3 py-1 rounded-full border border-blue/20">
            SECTOR {String(currentIndex + 1).padStart(2, "0")} OF {String(totalCount).padStart(2, "0")}
          </span>
          <span className="text-sm font-medium text-ink">{current.name}</span>
        </div>

        {/* Segmented position scrubber */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Sector select">
          {Array.from({ length: totalCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Jump to sector ${idx + 1}`}
              onClick={() => onSelectIndex(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-expo cursor-pointer",
                idx === currentIndex
                  ? "w-7 bg-blue"
                  : "w-2 bg-ink/15 hover:bg-ink/35 hover:w-3.5"
              )}
            />
          ))}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={isAutoPlaying ? "Pause automatic transition" : "Play automatic transition"}
            onClick={onToggleAutoplay}
            className="grid size-9 place-items-center rounded-full border border-ink/10 bg-off text-ink hover:bg-ink hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {isAutoPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
          </button>

          <button
            type="button"
            aria-label="Previous industry"
            onClick={onPrev}
            className="grid size-9 place-items-center rounded-full border border-ink/10 bg-off text-ink hover:bg-ink hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            aria-label="Next industry"
            onClick={onNext}
            className="grid size-9 place-items-center rounded-full border border-ink/10 bg-off text-ink hover:bg-ink hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Main Dossier Content Grid */}
      <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-[1.1fr_1.3fr_auto] lg:items-center">
        {/* Challenge Column */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-grey uppercase flex items-center gap-1.5">
            <SlidersHorizontal className="size-3 text-blue" />
            Operational Requirement
          </span>
          <p className="text-[15px] leading-relaxed text-ink/90 font-normal">
            {current.challenge}
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs text-grey">
            <Building2 className="size-3.5 shrink-0 text-blue" />
            <span>
              <strong>Reference:</strong> {current.reference}
            </span>
          </div>
        </div>

        {/* Systems Column */}
        <div className="space-y-2 border-t border-ink/6 pt-4 lg:border-t-0 lg:border-l lg:border-ink/8 lg:pt-0 lg:pl-6">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-grey uppercase flex items-center gap-1.5">
            <Layers className="size-3 text-blue" />
            Approved Chemical Systems
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {current.systems.map((system) => (
              <span
                key={system}
                className="inline-flex items-center gap-1 rounded-lg border border-ink/10 bg-off px-3 py-1.5 text-[12.5px] font-medium text-ink transition-colors hover:border-blue/30 hover:bg-blue/5"
              >
                <span className="size-1 rounded-full bg-blue" />
                {system}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons Column */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-4 border-t border-ink/6 lg:border-t-0 lg:border-l lg:border-ink/8 lg:pt-0 lg:pl-6">
          <button
            type="button"
            onClick={onOpenDetail}
            className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white px-5 py-2.5 text-xs font-medium text-ink shadow-sm hover:bg-ink/5 hover:border-ink/40 transition-colors cursor-pointer"
          >
            Open Full Specification
          </button>
          <ArrowButton href="/#contact" size="pill-sm" variant="brand">
            Request Spec
          </ArrowButton>
        </div>
      </div>
    </div>
  )
}
