"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"

import { Reveal } from "@/components/site/reveal"
import { industries, type Industry } from "@/data/catenate"
import { cn } from "@/lib/utils"
import { IndustryCarousel } from "./industries/industry-carousel"
import { IndustryDetailDialog } from "./industries/industry-detail-dialog"
import { IndustryDossier } from "./industries/industry-dossier"
import { SECTOR_CATEGORIES } from "./industries/types"

const AUTOPLAY_INTERVAL = 5500

export function IndustriesSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)
  const [isInteracting, setIsInteracting] = React.useState(false)
  const [openedIndustry, setOpenedIndustry] = React.useState<Industry | null>(null)

  const current = industries[currentIndex] ?? industries[0]

  // Derived active category based on current industry (no effect setState needed)
  const activeCategory = React.useMemo(() => {
    const matched = SECTOR_CATEGORIES.find(
      (cat) => cat.id !== "all" && cat.slugs.includes(current.slug)
    )
    return matched ? matched.id : "all"
  }, [current.slug])

  // Handle category pill clicks
  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "all") {
      setCurrentIndex(0)
      return
    }

    const category = SECTOR_CATEGORIES.find((c) => c.id === categoryId)
    if (!category || category.slugs.length === 0) return

    const targetSlug = category.slugs[0]
    const targetIdx = industries.findIndex((ind) => ind.slug === targetSlug)
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx)
    }
  }

  // Autoplay progression
  React.useEffect(() => {
    if (!isAutoPlaying || isInteracting || openedIndustry !== null) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length)
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [isAutoPlaying, isInteracting, openedIndustry])

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : industries.length - 1))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setCurrentIndex((prev) => (prev < industries.length - 1 ? prev + 1 : 0))
    }
  }

  return (
    <section
      id="industries"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="section section-flush relative overflow-hidden bg-off [background-image:radial-gradient(rgb(26_29_46/0.06)_1px,transparent_1px)] [background-size:24px_24px] outline-none"
    >
      {/* Header Statement */}
      <div className="content-pad">
        <Reveal className="relative z-2 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue/8 border border-blue/15 text-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="size-3.5 text-blue" />
            Specialized Sectors · 14 Industries Served
          </div>

          <h2 className="mx-auto max-w-[20ch] text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.15] font-medium tracking-[-0.02em] text-ink">
            The sector decides the specification.
          </h2>

          <p className="lead mx-auto mt-3.5 max-w-[62ch] text-[16px] text-grey">
            Every operating environment commands verified chemistries, certified compliance,
            and precise application windows. Explore our engineering solutions across each domain.
          </p>
        </Reveal>

        {/* Category Navigation Pills */}
        <div className="mt-8 flex items-center justify-center overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 p-1.5 shadow-sm backdrop-blur-md">
            {SECTOR_CATEGORIES.map((cat) => {
              const count = cat.id === "all" ? industries.length : cat.slugs.length
              const isActive = activeCategory === cat.id

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 cursor-pointer select-none whitespace-nowrap",
                    isActive
                      ? "bg-blue text-white shadow-md shadow-blue/20"
                      : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  )}
                >
                  <span>{cat.label}</span>
                  <span
                    className={cn(
                      "tnum text-[10px] px-1.5 py-0.5 rounded-full",
                      isActive ? "bg-white/20 text-white" : "bg-ink/8 text-ink/60"
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Carousel Stage */}
      <div className="relative mt-4">
        <IndustryCarousel
          industries={industries}
          currentIndex={currentIndex}
          onSelectIndex={setCurrentIndex}
          onOpenDetail={setOpenedIndustry}
          onPointerStateChange={setIsInteracting}
        />
      </div>

      {/* Active Sector Dossier & Control Bar */}
      <div className="content-pad">
        <IndustryDossier
          current={current}
          currentIndex={currentIndex}
          totalCount={industries.length}
          isAutoPlaying={isAutoPlaying}
          onToggleAutoplay={() => setIsAutoPlaying((prev) => !prev)}
          onPrev={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : industries.length - 1))}
          onNext={() => setCurrentIndex((prev) => (prev < industries.length - 1 ? prev + 1 : 0))}
          onSelectIndex={setCurrentIndex}
          onOpenDetail={() => setOpenedIndustry(current)}
        />
      </div>

      {/* Specification Detail Modal Dialog */}
      <IndustryDetailDialog
        industry={openedIndustry}
        onClose={() => setOpenedIndustry(null)}
      />
    </section>
  )
}
