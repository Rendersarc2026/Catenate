"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { Industry } from "@/data/catenate"
import { cn } from "@/lib/utils"
import { IndustryCard } from "./industry-card"

interface IndustryCarouselProps {
  industries: readonly Industry[]
  currentIndex: number
  onSelectIndex: (index: number) => void
  onOpenDetail: (industry: Industry) => void
  onPointerStateChange?: (isInteracting: boolean) => void
}

export function IndustryCarousel({
  industries,
  currentIndex,
  onSelectIndex,
  onOpenDetail,
  onPointerStateChange,
}: IndustryCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)

  const [containerWidth, setContainerWidth] = React.useState(1200)
  const [dragOffset, setDragOffset] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)

  const pointerStartRef = React.useRef<{ x: number; time: number; moved: boolean } | null>(null)
  const currentDragRef = React.useRef(0)

  // Measure container width via ResizeObserver (asynchronous callback avoids synchronous setState in effect)
  React.useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry && entry.contentRect.width > 0) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Responsively derive card metrics without extra state
  const cardWidth = containerWidth < 640 ? 300 : containerWidth < 1024 ? 340 : 390
  const cardGap = containerWidth < 640 ? 16 : containerWidth < 1024 ? 20 : 24

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    pointerStartRef.current = { x: e.clientX, time: performance.now(), moved: false }
    currentDragRef.current = 0
    setIsDragging(true)
    onPointerStateChange?.(true)
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartRef.current || !isDragging) return
    const deltaX = e.clientX - pointerStartRef.current.x
    if (Math.abs(deltaX) > 4) {
      pointerStartRef.current.moved = true
    }
    currentDragRef.current = deltaX
    setDragOffset(deltaX)
  }

  const handlePointerUp = () => {
    if (!pointerStartRef.current) return
    const deltaX = currentDragRef.current
    const duration = performance.now() - pointerStartRef.current.time
    const velocity = deltaX / Math.max(duration, 1)

    setIsDragging(false)
    setDragOffset(0)
    currentDragRef.current = 0
    pointerStartRef.current = null
    onPointerStateChange?.(false)

    // Check if drag threshold was crossed
    const threshold = cardWidth * 0.22
    if (deltaX < -threshold || velocity < -0.35) {
      if (currentIndex < industries.length - 1) {
        onSelectIndex(currentIndex + 1)
      }
    } else if (deltaX > threshold || velocity > 0.35) {
      if (currentIndex > 0) {
        onSelectIndex(currentIndex - 1)
      }
    }
  }

  // Calculate track position to center active card using containerWidth state (no ref accessed during render)
  const step = cardWidth + cardGap
  const centerTarget = (containerWidth - cardWidth) / 2
  const baseTranslate = centerTarget - currentIndex * step
  const totalTranslate = baseTranslate + dragOffset

  const transformStyle: React.CSSProperties = {
    transform: `translate3d(${totalTranslate}px, 0, 0)`,
    transition: isDragging ? "none" : "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
    gap: `${cardGap}px`,
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex > 0) onSelectIndex(currentIndex - 1)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex < industries.length - 1) onSelectIndex(currentIndex + 1)
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Industries portfolio carousel"
      aria-roledescription="carousel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => onPointerStateChange?.(true)}
      onMouseLeave={() => onPointerStateChange?.(false)}
      className="relative w-full overflow-hidden py-8 cursor-grab active:cursor-grabbing touch-pan-y select-none"
    >
      {/* Left / Right Soft Edge Vignettes for seamless horizon bleed */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 bg-gradient-to-r from-off via-off/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 bg-gradient-to-l from-off via-off/70 to-transparent" />

      {/* Floating Nav Arrows */}
      <div className="pointer-events-none absolute inset-y-0 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous industry slide"
          disabled={currentIndex === 0}
          onClick={handlePrev}
          className={cn(
            "pointer-events-auto grid size-12 place-items-center rounded-full border border-ink/10 bg-white/90 text-ink shadow-lg backdrop-blur-md transition-all duration-300",
            "hover:scale-110 hover:bg-blue hover:text-white cursor-pointer active:scale-95",
            currentIndex === 0 && "opacity-0 pointer-events-none"
          )}
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Next industry slide"
          disabled={currentIndex === industries.length - 1}
          onClick={handleNext}
          className={cn(
            "pointer-events-auto grid size-12 place-items-center rounded-full border border-ink/10 bg-white/90 text-ink shadow-lg backdrop-blur-md transition-all duration-300",
            "hover:scale-110 hover:bg-blue hover:text-white cursor-pointer active:scale-95",
            currentIndex === industries.length - 1 && "opacity-0 pointer-events-none"
          )}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Sliding Carousel Track */}
      <div
        ref={trackRef}
        style={transformStyle}
        className="flex items-center will-change-transform"
      >
        {industries.map((industry, index) => (
          <IndustryCard
            key={industry.slug}
            industry={industry}
            index={index}
            total={industries.length}
            isActive={index === currentIndex}
            onSelect={() => onSelectIndex(index)}
            onOpenDetail={() => onOpenDetail(industry)}
          />
        ))}
      </div>
    </div>
  )
}
