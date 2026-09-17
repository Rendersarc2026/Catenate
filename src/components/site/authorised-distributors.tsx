"use client"

import Image from "next/image"
import * as React from "react"

import { brands, type Brand } from "@/data/catenate"
import { jumpTo } from "@/lib/scroll-jump"
import { createScrollTrack } from "@/lib/scroll-track"
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion"
import { cn } from "@/lib/utils"

/*
 * Authorised distributors — the principals read as one row of marks on a dark
 * field.
 *
 * The section is pinned while it is read:
 * 1. The heading rises into the field.
 * 2. The marks arrive one after another, left to right.
 * 3. Once the last one has landed, the row is armed: one column is always
 *    open, and its detail hangs underneath the mark it belongs to.
 * 4. The rest of the track walks the open column across every mark in turn,
 *    so the section only lets go once each principal has been read.
 */

/** Viewport heights of scroll for the arrival, and for each mark after it. */
const INTRO_VH = 100
const STEP_VH = 60
const TRACK_VH = INTRO_VH + STEP_VH * brands.length
/** Share of the track spent on the arrival; the rest steps through the marks. */
const INTRO = INTRO_VH / TRACK_VH

/* The arrival beats below are fractions of the intro, not of the whole track. */

/** Where the heading has fully arrived. */
const HEAD_IN = 0.3
/** Where the first mark starts arriving. */
const MARKS_START = 0.2
/** Share of the intro between one mark arriving and the next. */
const MARK_STAGGER = 0.1
/** How long a single mark takes to land. */
const MARK_SPAN = 0.3
/** Intro progress past which the row is settled enough to accept the pointer. */
const ARM_AT = MARKS_START + MARK_STAGGER * (brands.length - 1) + MARK_SPAN

/** Track progress at the middle of a column's stretch of scroll. */
const progressFor = (index: number) =>
  INTRO + ((index + 0.5) / brands.length) * (1 - INTRO)

/** The column the scroll has reached, once the intro is over. */
const stepAt = (p: number) =>
  Math.min(
    Math.floor((Math.max(p - INTRO, 0) / (1 - INTRO)) * brands.length),
    brands.length - 1
  )

/** The column that is open before the scroll reaches the marks. */
const DEFAULT_OPEN = 0

/*
 * How much larger the open mark stands against its neighbours. Stacked rows
 * sit closer together, so the lift is held back until the row is one line.
 */
const OPEN_SCALE = "scale-[1.35] md:scale-[1.8]"

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)

/** easeOutCubic — for arriving elements to decelerate into place. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function BrandMark({ brand, open }: { brand: Brand; open: boolean }) {
  const source = brand.logoWhite ?? brand.logo

  if (!source) {
    return (
      <span className="text-[clamp(15px,1.5vw,22px)] whitespace-nowrap">{brand.name}</span>
    )
  }

  return (
    <Image
      src={source}
      alt={brand.name}
      width={220}
      height={64}
      style={{ transform: `scale(${brand.logoScale ?? 1})` }}
      className={cn(
        "h-[clamp(30px,3.4vw,58px)] w-[clamp(92px,8.6vw,150px)] object-contain transition-opacity duration-700 ease-expo",
        open ? "opacity-100" : "opacity-90"
      )}
    />
  )
}

function BrandDetail({ brand }: { brand: Brand }) {
  return (
    <>
      <p className="text-[10px] tracking-[0.16em] text-white/55 uppercase">
        Authorised distributor · {brand.familyCount}
      </p>
      <p className="mt-2.5 text-[14px] leading-[1.5] text-white/80">
        {brand.description}
      </p>

      {/* The first thing to go where the section is short. */}
      <ul className="mt-4 list-none max-md:hidden">
        {brand.groups.map((group) => (
          <li
            key={group.title}
            className="flex items-center gap-2.5 border-t border-white/16 py-2 text-[13px] text-white/70"
          >
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-white/50"
            />
            {group.title}
          </li>
        ))}
      </ul>
    </>
  )
}

type FieldProps = {
  /** Set until the marks have landed, so the row ignores the pointer. */
  idle?: boolean
  /** The column the scroll has opened. */
  step?: number
  /**
   * Moves the scroll to a column, so reading carries on from the one picked.
   * Left out where nothing is pinned, and the row keeps its own pick instead.
   */
  onPick?: (index: number) => void
  headingRef?: React.Ref<HTMLHeadingElement>
  columnRef?: (index: number) => (element: HTMLDivElement | null) => void
}

function Field({
  idle = false,
  step,
  onPick,
  headingRef,
  columnRef,
}: FieldProps) {
  const [picked, setPicked] = React.useState(DEFAULT_OPEN)
  const open = step ?? picked
  const setOpen = onPick ?? setPicked
  const last = brands.length - 1

  return (
    <div
      className={cn("content-pad w-full", idle && "pointer-events-none")}
    >
      <h2
        ref={headingRef}
        className="text-center text-balance text-[clamp(1.8rem,3.8vw,3.4rem)] leading-[1.1] font-light tracking-[-0.03em] will-change-[opacity,transform]"
      >
        Authorised Distributor of
      </h2>

      {/* Stacked, the marks sit in an even two-column grid, with an odd last
          mark centred beneath the pair above it. */}
      <div className="mx-auto mt-[clamp(56px,16vh,200px)] flex items-center justify-center gap-[clamp(20px,8vw,140px)] max-md:mt-[clamp(40px,8vh,72px)] max-md:grid max-md:max-w-[320px] max-md:grid-cols-2 max-md:justify-items-center max-md:gap-x-6 max-md:gap-y-8">
        {brands.map((brand, index) => {
          const isOpen = !idle && open === index

          return (
            <div
              key={brand.name}
              ref={columnRef?.(index)}
              className="relative flex flex-col items-center will-change-[opacity,transform] max-md:odd:last:col-span-2"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onFocus={() => setOpen(index)}
                /* Focus lands first on a tap, so a toggle here would undo it. */
                onClick={() => setOpen(index)}
                className={cn(
                  "block cursor-pointer transition-[scale] duration-700 ease-expo motion-reduce:transition-none",
                  isOpen ? OPEN_SCALE : "scale-100"
                )}
              >
                <BrandMark brand={brand} open={isOpen} />
              </button>

              {/*
               * The detail hangs off the row rather than sitting in it, so no
               * column moves as the reader crosses the marks. The outer two
               * anchor to their own edge so a long panel cannot run off the
               * side of the section; once the row is wide enough every panel
               * centres under its own mark. It leaves quicker than it arrives,
               * so two panels are never readable at once on the way between
               * marks.
               */}
              <div
                inert={!isOpen}
                className={cn(
                  "absolute top-full z-1 mt-[clamp(34px,5vw,70px)] w-[min(330px,64vw)] text-left transition-[opacity,translate] ease-expo max-md:hidden",
                  index === 0
                    ? "left-0 xl:left-1/2 xl:-translate-x-1/2"
                    : index === last
                      ? "right-0 xl:right-auto xl:left-1/2 xl:-translate-x-1/2"
                      : "left-1/2 -translate-x-1/2",
                  isOpen
                    ? "translate-y-0 opacity-100 duration-700"
                    : "translate-y-3 opacity-0 duration-200"
                )}
              >
                <BrandDetail brand={brand} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Stacked marks have nowhere to hang from, so the detail follows them. */}
      <div className="mx-auto mt-[clamp(40px,8vw,56px)] w-full max-w-[340px] text-center md:hidden">
        <BrandDetail brand={brands[open]} />
      </div>
    </div>
  )
}

/* A soft light above the heading, so the field is never flat black. */
function Backdrop() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-1 bg-[radial-gradient(130%_82%_at_50%_-14%,rgba(126,146,198,0.32),transparent_62%),radial-gradient(100%_70%_at_50%_118%,rgba(86,102,148,0.16),transparent_66%)]"
    />
  )
}

export function AuthorisedDistributors() {
  const reducedMotion = usePrefersReducedMotion()

  const trackRef = React.useRef<HTMLElement>(null)
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const columns = React.useRef<(HTMLDivElement | null)[]>([])
  const [armed, setArmed] = React.useState(false)
  const [step, setStep] = React.useState(DEFAULT_OPEN)
  /** A column picked by hand, held open while the smoothed scroll catches up. */
  const pending = React.useRef<number | null>(null)

  const columnRef = React.useCallback(
    (index: number) => (element: HTMLDivElement | null) => {
      columns.current[index] = element
    },
    []
  )

  React.useEffect(() => {
    if (reducedMotion) return

    const track = trackRef.current
    if (!track) return

    let live = false
    let current = DEFAULT_OPEN

    const paint = (p: number) => {
      const intro = clamp01(p / INTRO)

      // 1. The heading rises into the field.
      const heading = easeOut(clamp01(intro / HEAD_IN))
      if (headingRef.current) {
        headingRef.current.style.opacity = heading.toFixed(3)
        headingRef.current.style.transform = `translate3d(0, ${((1 - heading) * 44).toFixed(1)}px, 0)`
      }

      // 2. The marks land one after another, left to right.
      columns.current.forEach((column, index) => {
        if (!column) return
        const at = easeOut(
          clamp01((intro - (MARKS_START + index * MARK_STAGGER)) / MARK_SPAN)
        )
        column.style.opacity = at.toFixed(3)
        column.style.transform = `translate3d(0, ${((1 - at) * 60).toFixed(1)}px, 0)`
      })

      // 3. Settled, so the row can be read with the pointer.
      const settled = intro >= ARM_AT
      if (settled !== live) {
        live = settled
        setArmed(settled)
      }

      // 4. The open column follows the scroll across the row. A jump to a
      //    picked column sweeps past the ones between, so those are skipped.
      const next = stepAt(p)
      if (pending.current !== null) {
        if (next !== pending.current) return
        pending.current = null
      }
      if (next !== current) {
        current = next
        setStep(next)
      }
    }

    return createScrollTrack({ element: track, paint, smoothing: 0.09 })
  }, [reducedMotion])

  const pick = React.useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return

    pending.current = index
    setStep(index)

    const top = track.getBoundingClientRect().top + window.scrollY
    const scrollable = track.offsetHeight - window.innerHeight
    jumpTo(Math.round(top + scrollable * progressFor(index)))
  }, [])

  if (reducedMotion) {
    return (
      <section
        id="authorised-distributors"
        className="on-blue relative isolate flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-[#090c15] py-[clamp(64px,10vh,120px)] text-white"
      >
        <Backdrop />
        <Field />
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      id="authorised-distributors"
      className="on-blue relative isolate w-full bg-[#090c15] text-white"
      style={{ minHeight: `${TRACK_VH + 100}vh` }}
    >
      <div className="sticky top-0 flex h-dvh w-full flex-col overflow-hidden pt-[clamp(72px,18vh,200px)] [contain:layout_paint]">
        <Backdrop />
        <Field
          idle={!armed}
          step={step}
          onPick={pick}
          headingRef={headingRef}
          columnRef={columnRef}
        />
      </div>
    </section>
  )
}
