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
 * 1. As the section scrolls into view, the heading rises into the field.
 * 2. The marks arrive one after another, left to right.
 * 3. Once the last one has landed, the row is armed: hovering (or focusing, or
 *    tapping) a mark opens its detail underneath it.
 *
 * Nothing is pinned — the arrival plays over the scroll that brings the section
 * in, and the reader moves straight on once it has.
 */

/*
 * The arrival runs while the section's top travels from ARRIVE_START_VH down
 * the viewport to ARRIVE_END_VH — so it plays where the content can be seen,
 * and has finished once the section fills the screen. The scroll track
 * measures progress through a tall element, so an invisible span covering
 * exactly that stretch stands in for one: it sits ARRIVE_START_VH above the
 * section and is as tall as the scroll the arrival takes plus one viewport.
 */
const ARRIVE_START_VH = 80
const ARRIVE_END_VH = 0
const PROBE_TOP_VH = -ARRIVE_START_VH
const PROBE_HEIGHT_VH = 100 + ARRIVE_START_VH - ARRIVE_END_VH

/* The arrival beats below are fractions of that stretch. */

/** Where the heading has fully arrived. */
const HEAD_IN = 0.3
/** Where the first mark starts arriving. */
const MARKS_START = 0.2
/** Share of the arrival the marks spend arriving one after another. */
const MARKS_SPREAD = 0.4
/** Share of the arrival between one mark arriving and the next. */
const MARK_STAGGER = MARKS_SPREAD / Math.max(brands.length - 1, 1)
/** How long a single mark takes to land. */
const MARK_SPAN = 0.3
/** Progress past which the row is settled enough to accept the pointer. */
const ARM_AT = MARKS_START + MARKS_SPREAD + MARK_SPAN

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)

/** easeOutCubic — for arriving elements to decelerate into place. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/*
 * How much larger the open mark stands against its neighbours. Stacked rows
 * sit closer together, so the lift is held back until the row is one line.
 */
const OPEN_SCALE = "scale-[1.35] md:scale-[1.8]"

function BrandMark({
  brand,
  open,
  className,
}: {
  brand: Brand
  open: boolean
  className?: string
}) {
  const source =
    brand.slug === "wurth"
      ? "/images/logos/wurth-dark.svg"
      : (brand.logo ?? brand.logoWhite)

  if (!source) {
    return (
      <span className={cn("text-[clamp(15px,1.5vw,22px)] whitespace-nowrap", className)}>
        {brand.name}
      </span>
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
        open ? "opacity-100" : "opacity-90",
        className
      )}
    />
  )
}

/*
 * Group rows the panel shows before it summarises. The panel hangs off the row
 * on `absolute top-full`, so the section reserves room for this many rows.
 */
const DETAIL_ROWS = 4

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
        {brand.groups.slice(0, DETAIL_ROWS).map((group) => (
          <li
            key={group.title}
            className="flex items-center gap-2.5 border-t border-white/16 py-1.5 text-[13px] text-white/70"
          >
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-white/50"
            />
            {group.title}
          </li>
        ))}

      </ul>

      {/*
       * Every principal costs the same height however deep its portfolio
       * runs. The rest of the families are on the principal's own page, which
       * is also the only way into them from a phone, where the list above is
       * not shown at all.
       */}
      <Link
        href={`/brands/${brand.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-white/60 transition-colors duration-250 ease-expo hover:text-white max-md:mt-5 md:border-t md:border-white/16 md:mt-0 md:w-full md:py-2"
      >
        View all {brand.familyCount}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-3 shrink-0 fill-none stroke-current stroke-[2]"
        >
          <path d="M9 5l7 7-7 7" />
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
  /** The mark whose detail is open on a wide screen; none until one is hovered. */
  const [active, setActive] = React.useState<number | null>(null)
  /** The mark on stage on a phone. */
  const [picked, setPicked] = React.useState(0)
  const last = brands.length - 1

  return (
    <div className={cn("content-pad w-full", idle && "pointer-events-none")}>
      <h2
        ref={headingRef}
        className="text-center text-balance text-[clamp(1.8rem,3.8vw,3.4rem)] leading-[1.1] font-light tracking-[-0.03em] will-change-[opacity,transform]"
      >
        Authorised Distributor of
      </h2>

      {/* The bottom padding is the room the open panel hangs into. */}
      <div
        className="mx-auto mt-[clamp(56px,12vh,160px)] flex items-center justify-center gap-[clamp(20px,5.6vw,108px)] pb-[clamp(300px,38vh,340px)] max-md:hidden"
        onMouseLeave={() => setActive(null)}
      >
        {brands.map((brand, index) => {
          const isOpen = !idle && active === index

          return (
            <div
              key={brand.name}
              ref={columnRef?.(index)}
              className="relative flex flex-col items-center will-change-[opacity,transform]"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActive((current) => (current === index ? null : current))
                }
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                /* Touch has no hover, so a tap opens the panel. */
                onClick={() => setActive(index)}
                className={cn(
                  "block cursor-pointer transition-[scale] duration-700 ease-expo motion-reduce:transition-none",
                  isOpen ? OPEN_SCALE : "scale-100"
                )}
              >
                <BrandMark brand={brand} open={isOpen} />
              </button>

              {/*
               * The detail hangs off the row rather than sitting in it, so no
               * column moves as the pointer crosses the marks. Its top gap is
               * padding, not margin, so the pointer can travel from the mark
               * down to the link without leaving the column. The outer two
               * anchor to their own edge so a panel cannot run off the side;
               * once the row is wide enough every panel centres under its mark.
               */}
              <div
                inert={!isOpen}
                className={cn(
                  "absolute top-full z-1 w-[min(330px,64vw)] pt-[clamp(28px,4vw,56px)] text-left transition-[opacity,translate] ease-expo motion-reduce:transition-none",
                  index === 0
                    ? "left-0 xl:left-1/2 xl:-translate-x-1/2"
                    : index === last
                      ? "right-0 xl:right-auto xl:left-1/2 xl:-translate-x-1/2"
                      : "left-1/2 -translate-x-1/2",
                  isOpen
                    ? "translate-y-0 opacity-100 duration-500"
                    : "pointer-events-none translate-y-3 opacity-0 duration-200"
                )}
              >
                <BrandDetail brand={brand} />
              </div>
            </div>
          )
        })}
      </div>

      {/*
       * Phones have no room for the row, so the principals take the stage one
       * at a time, picked from the dots underneath.
       */}
      <div
        className={cn(
          "transition-opacity duration-700 ease-expo md:hidden",
          idle ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="relative mx-auto mt-[clamp(44px,9vh,80px)] h-[clamp(96px,15vh,132px)] w-full max-w-[260px]">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              aria-hidden={index !== picked}
              className={cn(
                "absolute inset-0 grid place-items-center transition-[opacity,translate,scale] duration-700 ease-expo motion-reduce:transition-none",
                index === picked
                  ? "translate-y-0 scale-100 opacity-100"
                  : index < picked
                    ? "-translate-y-8 scale-95 opacity-0"
                    : "translate-y-8 scale-95 opacity-0"
              )}
            >
              <BrandMark
                brand={brand}
                open
                className="h-[clamp(64px,10vh,96px)] w-[min(240px,68vw)] text-[28px]"
              />
            </div>
          ))}
        </div>

        <div
          className="mt-[clamp(28px,5vh,44px)] flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Authorised distributors"
        >
          {brands.map((brand, index) => (
            <button
              key={brand.name}
              type="button"
              role="tab"
              aria-selected={index === picked}
              aria-label={brand.name}
              onClick={() => setPicked(index)}
              className="grid h-6 cursor-pointer place-items-center px-0.5"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-expo",
                  index === picked ? "w-6 bg-white" : "w-1.5 bg-white/30"
                )}
              />
            </button>
          ))}
        </div>

        <div
          key={picked}
          className="mx-auto mt-[clamp(24px,4vh,36px)] w-full max-w-[340px] animate-in text-center duration-500 ease-expo fade-in slide-in-from-bottom-2"
        >
          <BrandDetail brand={brands[picked]} />
        </div>
      </div>
    </div>
  )
}

/* A soft light above the heading, so the field is never flat black. */
function Backdrop() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-1 bg-[radial-gradient(130%_82%_at_50%_-14%,rgba(150,152,158,0.26),transparent_62%),radial-gradient(100%_70%_at_50%_118%,rgba(110,112,118,0.14),transparent_66%)]"
    />
  )
}

export function AuthorisedDistributors() {
  const reducedMotion = usePrefersReducedMotion()

  const probeRef = React.useRef<HTMLSpanElement>(null)
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

    const probe = probeRef.current
    if (!probe) return

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

    return createScrollTrack({ element: probe, paint, smoothing: 0.09 })
  }, [reducedMotion])

  return (
    <section
      id="authorised-distributors"
      className="on-blue relative isolate flex w-full flex-col justify-center overflow-hidden bg-[#0a0a0b] py-[clamp(64px,10vh,120px)] text-white md:min-h-dvh"
    >
      <span
        ref={probeRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 w-px"
        style={{ top: `${PROBE_TOP_VH}vh`, height: `${PROBE_HEIGHT_VH}vh` }}
      />
      <Backdrop />
      <Field
        idle={!reducedMotion && !armed}
        headingRef={headingRef}
        columnRef={columnRef}
      />
    </section>
  )
}
