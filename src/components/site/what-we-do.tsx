"use client"

import Link from "next/link"
import * as React from "react"

import { brands } from "@/data/catenate"
import { cn } from "@/lib/utils"

/*
 * "What we do" plays as three beats inside one pinned track. The statement
 * holds the screen first; it gives way to the line "Authorised distributor
 * of", which the wall of principals then answers — wiping in from the right
 * edge and sweeping over the line until it owns the viewport. Once the wall
 * has settled it takes the pointer, and the column under it opens into the
 * distributor's detail.
 */

/** Share of the track the statement holds before it starts leaving. */
const INTRO_HOLD = 0.14
/** Where the statement has fully left. */
const INTRO_END = 0.3
/** The stretch of track the distributor line spends arriving. */
const LEAD_START = 0.26
const LEAD_END = 0.4
/** The stretch the wall spends coming across from the right edge. */
const WIPE_START = 0.44
const WIPE_END = 0.76
/** Progress past which the wall is settled enough to accept a pointer. */
const ARM_AT = 0.8

/** Flex weights: an untouched wall is even, an open one favours its column. */
const WEIGHT_EVEN = 1
const WEIGHT_OPEN = 2.6
const WEIGHT_ASIDE = 0.78

/**
 * The wall's colour ramp, walked from the palest column to the deepest. Read
 * between the stops so the gradient holds its shape whatever the brand count.
 */
const RAMP = ["#6c7082", "#3a4c86", "#1e3795", "#002050", "#000c1e"]

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)

/** easeOutCubic — quick off the mark, settles softly. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/** easeInOutCubic — for the statement, which both arrives and leaves. */
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

function mix(a: string, b: string, t: number) {
  const channels = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  const [ar, ag, ab] = channels(a)
  const [br, bg, bb] = channels(b)
  const to = (from: number, target: number) =>
    Math.round(from + (target - from) * t)
      .toString(16)
      .padStart(2, "0")
  return `#${to(ar, br)}${to(ag, bg)}${to(ab, bb)}`
}

/** Colour for the nth column of `count`, read along the ramp. */
function tone(index: number, count: number) {
  const at = count < 2 ? 0 : (index / (count - 1)) * (RAMP.length - 1)
  const low = Math.min(Math.floor(at), RAMP.length - 2)
  return mix(RAMP[low], RAMP[low + 1], at - low)
}

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
          Manufacturers make chemistry.
          <br />
          Projects need systems.
        </p>
        <p className="text-justify text-[14.5px] leading-[1.55] text-ink/85">
          Catenate sits between the two, carrying the range, the technical
          judgement and the stock depth that turn a product list into a
          specification a contractor can build to.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Beat two — the line the wall finishes
 * ------------------------------------------------------------------ */

function DistributorLead() {
  return (
    <p className="content-pad w-full text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.15] tracking-[-0.02em]">
      Authorised Distributor of
    </p>
  )
}

/* ------------------------------------------------------------------ *
 * Beat three — the wall of principals
 * ------------------------------------------------------------------ */

type WallProps = {
  /** Set while the wall is still coming across, so it ignores the pointer. */
  idle?: boolean
}

function Wall({ idle = false }: WallProps) {
  const [open, setOpen] = React.useState<number | null>(null)
  const [wasIdle, setWasIdle] = React.useState(idle)

  /* A column left open as the wall goes idle would never be closed by a leave. */
  if (idle !== wasIdle) {
    setWasIdle(idle)
    if (idle) setOpen(null)
  }

  return (
    <div
      onPointerLeave={(event) => {
        /* A tap ends with a leave; only a mouse leaving should shut a column. */
        if (event.pointerType === "mouse") setOpen(null)
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(null)
      }}
      className={cn(
        "flex size-full max-md:flex-col",
        idle && "pointer-events-none"
      )}
    >
      {brands.map((brand, index) => {
        const isOpen = open === index

        return (
          <div
            key={brand.name}
            style={{
              flexGrow:
                open === null ? WEIGHT_EVEN : isOpen ? WEIGHT_OPEN : WEIGHT_ASIDE,
            }}
            onPointerEnter={(event) => {
              /* Touch fires a pointerenter on tap; leave those to the click. */
              if (event.pointerType === "mouse") setOpen(index)
            }}
            className="relative basis-0 overflow-hidden transition-[flex-grow] duration-700 ease-expo"
          >
            <div
              style={{ background: tone(index, brands.length) }}
              className="relative flex size-full items-center justify-center px-4 text-center text-white"
            >
              {/* Darkens the palest columns just enough to hold the copy. */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 bg-black/25 transition-opacity duration-700 ease-expo",
                  isOpen ? "opacity-100" : "opacity-0"
                )}
              />

              <button
                type="button"
                aria-expanded={isOpen}
                onFocus={() => setOpen(index)}
                /* Focus lands first on a tap, so a toggle here would undo it. */
                onClick={() => setOpen(index)}
                className="wall-name relative z-1 cursor-pointer text-[clamp(15px,1.5vw,22px)] leading-[1.2] whitespace-nowrap"
              >
                {brand.name}
              </button>

              {/*
               * The detail hangs off the centre line rather than sharing it, so
               * every name keeps its place in the row whichever column is open.
               */}
              <div
                inert={!isOpen}
                className={cn(
                  "absolute top-1/2 left-1/2 z-1 mt-[clamp(24px,3vw,38px)] w-[min(330px,68vw)] -translate-x-1/2 text-left transition-[opacity,translate] duration-700 ease-expo",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                )}
              >
                <p className="text-[10px] tracking-[0.16em] text-white/55 uppercase">
                  Authorised distributor · {brand.familyCount}
                </p>
                <p className="mt-2.5 text-[14px] leading-[1.5] text-white/80">
                  {brand.description}
                </p>

                {/* The first thing to go where a stacked row is short. */}
                <ul className="mt-4 list-none max-md:hidden">
                  {brand.groups.map((group) => (
                    <li
                      key={group.title}
                      className="flex items-baseline gap-3 border-t border-white/16 py-2 text-[13px] text-white/70"
                    >
                      <span className="tnum text-[10px] text-white/45">
                        {String(group.items.length).padStart(2, "0")}
                      </span>
                      {group.title}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/brands"
                  className="mt-5 inline-flex items-center gap-2 text-[13px] tracking-[0.02em] text-white transition-opacity duration-250 ease-expo hover:opacity-70"
                >
                  Explore the range
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-3.5 fill-none stroke-current stroke-[1.6]"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )
      })}
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
      const leaving = easeInOut(clamp01((p - INTRO_HOLD) / (INTRO_END - INTRO_HOLD)))

      if (introRef.current) {
        introRef.current.style.opacity = (1 - leaving).toFixed(3)
        introRef.current.style.transform = `translate3d(0, ${(-32 * leaving).toFixed(1)}px, 0) scale(${(1 - 0.04 * leaving).toFixed(4)})`
        introRef.current.style.visibility = leaving >= 1 ? "hidden" : "visible"
      }

      /* The line arrives as the statement clears, then simply waits to be
       * covered — the wall is what finishes the sentence. */
      const arriving = easeOut(clamp01((p - LEAD_START) / (LEAD_END - LEAD_START)))

      if (leadRef.current) {
        leadRef.current.style.opacity = arriving.toFixed(3)
        leadRef.current.style.transform = `translate3d(0, ${(22 * (1 - arriving)).toFixed(1)}px, 0)`
      }

      /* One custom property carries the wipe: it opens the wall's width and,
       * late in the run, brings the names up. */
      /* Eased both ends: the columns creep in at the right edge while the
       * line is still readable, sweep across it, then settle. */
      const across = easeInOut(clamp01((p - WIPE_START) / (WIPE_END - WIPE_START)))
      wipeRef.current?.style.setProperty("--wall-in", across.toFixed(4))

      /* One state change at the threshold, rather than one per frame. */
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
          <Wall />
        </div>
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      id="what-we-do"
      className="relative min-h-[340vh] bg-white"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* The two beats of copy share the centre line; only one is ever up. */}
        <div
          ref={introRef}
          className="absolute inset-0 flex origin-center items-center justify-center will-change-[opacity,transform]"
        >
          <Statement />
        </div>

        <div
          ref={leadRef}
          style={{ opacity: 0 }}
          className="absolute inset-0 flex items-center will-change-[opacity,transform]"
        >
          <DistributorLead />
        </div>

        {/* Pinned to the right edge and opened by --wall-in, so the columns
         * come across the statement rather than out from under it. */}
        <div
          ref={wipeRef}
          style={{ "--wall-in": 0 } as React.CSSProperties}
          className="wall-wipe absolute inset-y-0 right-0 z-1 overflow-hidden"
        >
          <Wall idle={!armed} />
        </div>
      </div>
    </section>
  )
}
