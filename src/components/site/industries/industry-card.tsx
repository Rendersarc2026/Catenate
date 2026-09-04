"use client"

import Image from "next/image"
import * as React from "react"
import { ArrowRight, Sparkles } from "lucide-react"

import { images, type Industry } from "@/data/catenate"
import { cn } from "@/lib/utils"
import { getCategoryLabelForSlug } from "./types"

interface IndustryCardProps {
  industry: Industry
  index: number
  total: number
  isActive: boolean
  onSelect: () => void
  onOpenDetail: () => void
}

export function IndustryCard({
  industry,
  index,
  total,
  isActive,
  onSelect,
  onOpenDetail,
}: IndustryCardProps) {
  const category = getCategoryLabelForSlug(industry.slug)
  const previewSystems = industry.systems.slice(0, 2)
  const remainingCount = industry.systems.length - previewSystems.length

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isActive) {
      onOpenDetail()
    } else {
      onSelect()
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${industry.name} — ${isActive ? "Open full specification" : "Select industry"}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick(e as unknown as React.MouseEvent)
        }
      }}
      className={cn(
        "group relative shrink-0 text-left select-none outline-none cursor-pointer",
        "w-[300px] sm:w-[340px] md:w-[380px] lg:w-[410px]",
        "h-[460px] sm:h-[490px] md:h-[520px]",
        "rounded-[24px] overflow-hidden transition-all duration-500 ease-expo will-change-transform",
        isActive
          ? "scale-100 opacity-100 z-20 ring-2 ring-white/60 shadow-[0_30px_70px_-15px_rgba(16,27,82,0.4)]"
          : "scale-[0.91] sm:scale-[0.93] opacity-60 hover:opacity-90 hover:scale-[0.95] z-10 shadow-lg"
      )}
    >
      {/* Sector Background Photography */}
      <Image
        src={images.industry(industry.slug)}
        alt={industry.name}
        fill
        sizes="(max-width: 768px) 340px, 420px"
        quality={75}
        priority={index < 4}
        className={cn(
          "object-cover transition-transform duration-700 ease-expo motion-reduce:transition-none",
          isActive ? "scale-100 group-hover:scale-105" : "scale-105"
        )}
      />

      {/* Multi-layered cinematic gradient scrims */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[rgb(8_14_38)] via-[rgb(8_14_38/0.82)] to-transparent" />

      {/* Subtle Razor-Sharp Glass Inner Border */}
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/20 transition-colors duration-300 group-hover:border-white/40" />

      {/* Top Header Information */}
      <div className="absolute inset-x-0 top-0 p-5 sm:p-6 flex items-center justify-between z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase text-white/90 bg-white/15 backdrop-blur-md border border-white/20 shadow-sm">
          <span className="size-1.5 rounded-full bg-amber shadow-[0_0_8px_rgba(232,185,138,0.9)]" />
          {category}
        </span>

        <span className="tnum font-mono text-[11px] font-medium text-white/90 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Center Status Glow (when active) */}
      {isActive && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-blue font-medium text-xs shadow-lg backdrop-blur-md">
            <Sparkles className="size-3.5" />
            Click for full specification
          </span>
        </div>
      )}

      {/* Bottom Information Dossier */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
        <h3 className="text-[clamp(1.25rem,1.8vw,1.6rem)] font-medium text-white leading-[1.22] tracking-[-0.02em] drop-shadow-sm">
          {industry.name}
        </h3>

        <p className="mt-2 text-[13.5px] leading-relaxed text-white/80 line-clamp-2">
          {industry.challenge}
        </p>

        {/* Specified Systems Tags */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {previewSystems.map((system) => (
            <span
              key={system}
              className="inline-flex items-center text-[11.5px] font-medium text-white/90 bg-white/12 backdrop-blur-md border border-white/15 rounded-md px-2.5 py-0.5"
            >
              {system}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="inline-flex items-center text-[11px] text-white/70 bg-white/10 backdrop-blur-md border border-white/10 rounded-md px-2 py-0.5">
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* Interactive Action Footer */}
        <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs font-medium text-white/90">
          <span className="flex items-center gap-1 text-white/75 group-hover:text-white transition-colors">
            {isActive ? "Open detailed dossier" : "View sector systems"}
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-white/15 group-hover:bg-white text-white group-hover:text-blue transition-all duration-300 group-hover:rotate-45">
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </article>
  )
}
