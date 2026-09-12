"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { brands, type Brand } from "@/data/catenate"
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
 */

/** Where the heading has fully arrived. */
const HEAD_IN = 0.22
/** Where the first mark starts arriving. */
const MARKS_START = 0.16
/** Share of the track between one mark arriving and the next. */
const MARK_STAGGER = 0.075
/** How long a single mark takes to land. */
const MARK_SPAN = 0.2
/** Progress past which the row is settled enough to accept the pointer. */
const ARM_AT = MARKS_START + MARK_STAGGER * (brands.length - 1) + MARK_SPAN

/** The column that is open before the pointer arrives. */
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
    </>
  )
}

type FieldProps = {
  /** Set until the marks have landed, so the row ignores the pointer. */
  idle?: boolean
  headingRef?: React.Ref<HTMLHeadingElement>
  columnRef?: (index: number) => (element: HTMLDivElement | null) => void
}

function Field({ idle = false, headingRef, columnRef }: FieldProps) {
  const [open, setOpen] = React.useState(DEFAULT_OPEN)
  const last = brands.length - 1

  return (
    <div
      onPointerLeave={(event) => {
        /* A tap ends with a leave; only a mouse leaving should reset. */
        if (event.pointerType === "mouse") setOpen(DEFAULT_OPEN)
      }}
      className={cn("content-pad w-full", idle && "pointer-events-none")}
    >
      <h2
        ref={headingRef}
        className="text-center text-[clamp(1.8rem,3.8vw,3.4rem)] leading-[1.1] font-light tracking-[-0.03em] will-change-[opacity,transform]"
      >
        Authorised Distributor of
      </h2>

      <div className="mt-[clamp(56px,16vh,200px)] flex items-center justify-center gap-[clamp(20px,8vw,140px)] max-md:flex-wrap max-md:gap-[clamp(22px,6vw,40px)]">
        {brands.map((brand, index) => {
          const isOpen = !idle && open === index

          return (
            <div
              key={brand.name}
              ref={columnRef?.(index)}
              className="relative flex flex-col items-center will-change-[opacity,transform]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onFocus={() => setOpen(index)}
                onPointerEnter={(event) => {
                  /* Touch fires a pointerenter on tap; leave those to the click. */
                  if (event.pointerType === "mouse") setOpen(index)
                }}
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
               * side of the section. It leaves quicker than it arrives, so two
               * panels are never readable at once on the way between marks.
               */}
              <div
                inert={!isOpen}
                className={cn(
                  "absolute top-full z-1 mt-[clamp(34px,5vw,70px)] w-[min(330px,64vw)] text-left transition-[opacity,translate] ease-expo max-md:hidden",
                  index === 0
                    ? "left-0"
                    : index === last
                      ? "right-0"
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
      <div className="mx-auto mt-[clamp(34px,6vw,48px)] w-full max-w-[420px] text-left md:hidden">
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

    const paint = (p: number) => {
      // 1. The heading rises into the field.
      const heading = easeOut(clamp01(p / HEAD_IN))
      if (headingRef.current) {
        headingRef.current.style.opacity = heading.toFixed(3)
        headingRef.current.style.transform = `translate3d(0, ${((1 - heading) * 44).toFixed(1)}px, 0)`
      }

      // 2. The marks land one after another, left to right.
      columns.current.forEach((column, index) => {
        if (!column) return
        const at = easeOut(
          clamp01((p - (MARKS_START + index * MARK_STAGGER)) / MARK_SPAN)
        )
        column.style.opacity = at.toFixed(3)
        column.style.transform = `translate3d(0, ${((1 - at) * 60).toFixed(1)}px, 0)`
      })

      // 3. Settled, so the row can be read with the pointer.
      const settled = p >= ARM_AT
      if (settled !== live) {
        live = settled
        setArmed(settled)
      }
    }

    return createScrollTrack({ element: track, paint, smoothing: 0.09 })
  }, [reducedMotion])

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
      className="on-blue relative isolate min-h-[260vh] w-full bg-[#090c15] text-white"
    >
      <div className="sticky top-0 flex h-dvh w-full flex-col overflow-hidden pt-[clamp(72px,18vh,200px)] [contain:layout_paint]">
        <Backdrop />
        <Field idle={!armed} headingRef={headingRef} columnRef={columnRef} />
      </div>
    </section>
  )
}
