"use client"

import * as React from "react"

/** Share of the scroll track spent growing to full screen. */
const GROW_END = 0.3
/** Share of the scroll track spent held at full screen (the "hold" beat). */
const HOLD_END = 0.7
/** Upper bound on the enlarged text scale, before the width cap kicks in. */
const MAX_SCALE = 1.5

function usePrefersReducedMotion() {
  const subscribe = React.useCallback((callback: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    mq.addEventListener("change", callback)
    return () => mq.removeEventListener("change", callback)
  }, [])

  const getSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const getServerSnapshot = () => false

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** 0 → 1 → 0 across the track, with the middle stretch held at 1. */
function phase(p: number) {
  if (p < GROW_END) return p / GROW_END
  if (p < HOLD_END) return 1
  return 1 - (p - HOLD_END) / (1 - HOLD_END)
}

/** easeInOutCubic — settles into and out of the held state. */
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Clean statement section with a white background placed right under the hero image.
 * Structured into exactly 2 lines.
 *
 * Pinned to the viewport while it scales up to full screen, holds there for a
 * couple of scroll beats, then scales back to its resting size as the next
 * section comes up underneath.
 */
export function HeroStatement() {
  const reducedMotion = usePrefersReducedMotion()

  const trackRef = React.useRef<HTMLElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (reducedMotion) return

    const track = trackRef.current
    if (!track) return

    let currentProgress = 0
    let targetProgress = 0
    let animFrame: number | null = null

    const calculateProgress = () => {
      const rect = track.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return 0
      return Math.min(Math.max(-rect.top / totalScrollable, 0), 1)
    }

    /** Cap the zoom so the nowrap lines never run past the viewport edges. */
    const maxScale = () => {
      const natural = contentRef.current?.offsetWidth ?? 0
      if (natural <= 0) return MAX_SCALE
      return Math.min(MAX_SCALE, (window.innerWidth * 0.94) / natural)
    }

    let scaleCeiling = MAX_SCALE

    const updateStyles = (p: number) => {
      const e = ease(phase(p))

      if (contentRef.current) {
        const scale = 1 + (scaleCeiling - 1) * e
        contentRef.current.style.transform = `scale(${scale.toFixed(4)})`
      }

      // Backing panel grows from a centred band out to a full-bleed screen.
      if (panelRef.current) {
        const insetX = (1 - e) * window.innerWidth * 0.06
        const insetY = (1 - e) * window.innerHeight * 0.27
        const radius = (1 - e) * 28

        panelRef.current.style.inset = `${insetY.toFixed(1)}px ${insetX.toFixed(1)}px`
        panelRef.current.style.borderRadius = `${radius.toFixed(1)}px`
        panelRef.current.style.opacity = (0.35 + e * 0.65).toFixed(3)
      }
    }

    const tick = () => {
      currentProgress += (targetProgress - currentProgress) * 0.14
      updateStyles(currentProgress)
      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        animFrame = requestAnimationFrame(tick)
      } else {
        currentProgress = targetProgress
        updateStyles(targetProgress)
        animFrame = null
      }
    }

    const onScroll = () => {
      targetProgress = calculateProgress()
      if (animFrame === null) animFrame = requestAnimationFrame(tick)
    }

    const onResize = () => {
      scaleCeiling = maxScale()
      onScroll()
    }

    scaleCeiling = maxScale()
    targetProgress = calculateProgress()
    currentProgress = targetProgress
    updateStyles(targetProgress)

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      if (animFrame !== null) cancelAnimationFrame(animFrame)
    }
  }, [reducedMotion])

  const heading = (
    <h2 className="text-[clamp(1.35rem,2.25vw,2.2rem)] leading-[1.45] font-medium tracking-[-0.018em] text-ink">
      <span className="block whitespace-normal md:whitespace-nowrap">
        A global market intelligence &amp; distribution platform built around
      </span>
      <span className="block whitespace-normal md:whitespace-nowrap mt-2 md:mt-1.5">
        Trusted Brands, Efficient Teams, Technical knowhow &amp; Dependable Supply Chain.
      </span>
    </h2>
  )

  if (reducedMotion) {
    return (
      <section className="content-pad bg-white py-[clamp(120px,14vw,220px)] border-b border-ink/8">
        <div className="mx-auto flex max-w-[1420px] flex-col items-center text-center">
          {heading}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      className="relative bg-white border-b border-ink/8 min-h-[220vh] sm:min-h-[260vh]"
    >
      <div className="sticky top-0 flex h-screen h-dvh w-full items-center justify-center overflow-hidden content-pad">
        {/* Backing panel: a centred band at rest, full-bleed while held. */}
        <div
          ref={panelRef}
          className="absolute bg-off border border-ink/8 will-change-[inset,opacity]"
          aria-hidden="true"
        />

        <div
          ref={contentRef}
          className="relative w-fit max-w-[1420px] text-center origin-center will-change-transform"
        >
          {heading}
        </div>
      </div>
    </section>
  )
}
