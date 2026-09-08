"use client"

import * as React from "react"

import { DistributorWall } from "./what-we-do/distributor-wall"

/*
 * "What we do" sequence inside one pinned track:
 * 1. Statement ("What we do -> One chain...") holds the screen first.
 * 2. On scroll, "Authorised Distributor of" comes in from the right side with animation.
 * 3. Once "Authorised Distributor of" has reached, the 5 distributor wall sweeps in
 *    from the right side across the viewport.
 * 4. Once settled, pointer interaction is armed so columns can be expanded.
 */

/** Share of the track the statement holds before it starts leaving. */
const INTRO_HOLD = 0.12
/** Where the statement finishes leaving. */
const INTRO_END = 0.30

/** Where "Authorised Distributor of" starts arriving from the right edge. */
const LEAD_START = 0.16
/** Where "Authorised Distributor of" has fully reached its position. */
const LEAD_REACHED = 0.42

/** Where the 5 distributors begin sweeping across from the right edge. */
const WALL_START = 0.50
/** Where the wall has fully crossed and covered the viewport. */
const WALL_END = 0.80
/** Progress past which the wall is settled enough to accept pointer interaction. */
const ARM_AT = 0.82

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)

/** easeOutCubic — for the arriving heading to decelerate into place. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/** easeInOutCubic — for smooth cinematic sweeps. */
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

function usePrefersReducedMotion() {
  const subscribe = React.useCallback((callback: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    mq.addEventListener("change", callback)
    return () => mq.removeEventListener("change", callback)
  }, [])

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
}

/* ------------------------------------------------------------------ *
 * Beat one — the statement
 * ------------------------------------------------------------------ */

function Statement() {
  return (
    <div className="content-pad grid w-full items-center gap-x-[clamp(32px,6vw,96px)] gap-y-8 max-lg:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <h2 className="flex items-center gap-[clamp(14px,2vw,28px)] text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.05] tracking-[-0.03em] lg:justify-center">
        What we do
        <svg
          viewBox="0 0 40 24"
          aria-hidden="true"
          className="w-[clamp(28px,3vw,44px)] shrink-0 fill-none stroke-grey stroke-[1.4]"
        >
          <path d="M2 12h34M27 3l9 9-9 9" />
        </svg>
      </h2>

      <div className="max-w-[46ch]">
        <h3 className="text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.18] font-normal tracking-[-0.02em]">
          One chain, from global brand to your doorstep.
        </h3>
        <span
          aria-hidden="true"
          className="my-[clamp(18px,2vw,26px)] block h-px w-[76px] bg-ink/25"
        />
        <p className="text-[14.5px] leading-[1.55] text-ink/85">
          We bridge global manufacturers with project requirements through
          products, expertise and supply.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Beat two — the lead heading that arrives from the right
 * ------------------------------------------------------------------ */

function DistributorLead() {
  return (
    <div className="content-pad w-full">
      <h2 className="text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.05] tracking-[-0.03em]">
        Authorised Distributor of
      </h2>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * The section
 * ------------------------------------------------------------------ */

export function WhatWeDo() {
  const reducedMotion = usePrefersReducedMotion()

  const trackRef = React.useRef<HTMLElement>(null)
  const introRef = React.useRef<HTMLDivElement>(null)
  const leadRef = React.useRef<HTMLDivElement>(null)
  const wipeRef = React.useRef<HTMLDivElement>(null)
  const [armed, setArmed] = React.useState(false)

  React.useEffect(() => {
    if (reducedMotion) return

    const track = trackRef.current
    if (!track) return

    let current = 0
    let target = 0
    let frame: number | null = null
    let live = false

    const progress = () => {
      const rect = track.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return 0
      return clamp01(-rect.top / scrollable)
    }

    const paint = (p: number) => {
      // 1. Statement leaves (drifts slightly left and fades)
      const leaving = easeInOut(clamp01((p - INTRO_HOLD) / (INTRO_END - INTRO_HOLD)))
      if (introRef.current) {
        introRef.current.style.opacity = (1 - leaving).toFixed(3)
        introRef.current.style.transform = `translate3d(${(-48 * leaving).toFixed(1)}px, 0, 0) scale(${(1 - 0.03 * leaving).toFixed(4)})`
        introRef.current.style.visibility = leaving >= 1 ? "hidden" : "visible"
      }

      // 2. "Authorised Distributor of" comes in from the right side with animation
      const leadArriving = easeOut(clamp01((p - LEAD_START) / (LEAD_REACHED - LEAD_START)))
      const leadLeaving = easeInOut(clamp01((p - WALL_START) / (WALL_END - WALL_START)))

      if (leadRef.current) {
        const slideX = (1 - leadArriving) * 100
        const pushX = -48 * leadLeaving
        leadRef.current.style.transform = `translate3d(${slideX.toFixed(2)}%, 0, 0) translate3d(${pushX.toFixed(1)}px, 0, 0)`
        leadRef.current.style.opacity = (leadArriving * (1 - 0.5 * leadLeaving)).toFixed(3)
        leadRef.current.style.visibility =
          leadArriving <= 0 || leadLeaving >= 1 ? "hidden" : "visible"
      }

      // 3. The 5 distributors come after "Authorised Distributor of" has reached
      const wallAcross = easeInOut(clamp01((p - WALL_START) / (WALL_END - WALL_START)))
      wipeRef.current?.style.setProperty("--wall-in", wallAcross.toFixed(4))

      // 4. Settled check for pointer interactions
      const settled = p >= ARM_AT
      if (settled !== live) {
        live = settled
        setArmed(settled)
      }
    }

    const tick = () => {
      current += (target - current) * 0.16
      if (Math.abs(target - current) < 0.0005) current = target
      paint(current)
      frame = current === target ? null : requestAnimationFrame(tick)
    }

    const onScroll = () => {
      target = progress()
      if (frame === null) frame = requestAnimationFrame(tick)
    }

    target = progress()
    current = target
    paint(current)

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <section id="what-we-do" className="bg-white">
        <div className="section">
          <Statement />
        </div>
        <div className="pb-[clamp(28px,4vw,56px)]">
          <DistributorLead />
        </div>
        <div className="h-[min(760px,140vh)] w-full">
          <DistributorWall />
        </div>
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      id="what-we-do"
      className="relative min-h-[380vh] bg-white"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* Beat one: What we do statement */}
        <div
          ref={introRef}
          className="absolute inset-0 flex origin-center items-center justify-center will-change-[opacity,transform]"
        >
          <Statement />
        </div>

        {/* Beat two: Authorised Distributor of arrives from the right side */}
        <div
          ref={leadRef}
          style={{
            transform: "translate3d(100%, 0, 0)",
            opacity: 0,
            visibility: "hidden",
          }}
          className="absolute inset-0 flex items-center will-change-[opacity,transform]"
        >
          <DistributorLead />
        </div>

        {/* Beat three: The 5 distributor wall sweeps in from the right edge after lead has reached */}
        <div
          ref={wipeRef}
          style={{ "--wall-in": 0 } as React.CSSProperties}
          className="wall-wipe absolute inset-0 z-10"
        >
          <DistributorWall idle={!armed} />
        </div>
      </div>
    </section>
  )
}
