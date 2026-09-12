"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { brands, type Brand } from "@/data/catenate"
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion"
import { cn } from "@/lib/utils"

/*
 * Authorised distributors — the principals read as a hairline grid of cells on
 * a lit dark field, with one cell always open.
 *
 * The whole section is there the moment it is reached. Arriving sets one flag
 * and the rest is a cascade on a clock:
 * 1. The heading rises into the field.
 * 2. The cells arrive one after another, left to right.
 * 3. The panel follows the last of them in.
 *
 * From then on the row takes the pointer, and left alone it advances on a
 * timer drawn along the open cell's bottom edge.
 *
 * The open cell drives the heading as well as the panel — the name under
 * "Authorised Distributor of" is written out again on every change, so the row
 * and the heading read as one control rather than a row with a caption.
 */

/** Where the first cell starts arriving, behind the heading. */
const CELLS_LEAD = 130
/** Between one cell arriving and the next. */
const CELL_STEP = 85
/** Where the panel follows the last cell in. */
const PANEL_IN = CELLS_LEAD + CELL_STEP * brands.length

/** The cell that is open before the pointer arrives. */
const DEFAULT_OPEN = 0
/** How long an untouched row rests on one principal, in milliseconds. */
const DWELL = 5200
/** Between one glyph of the principal's name rising and the next. */
const GLYPH_STAGGER = 30

const pad = (index: number) => String(index + 1).padStart(2, "0")

/** A CSS custom property passed down as an inline style. */
const vars = (value: Record<string, string>) => value as React.CSSProperties

/* ------------------------------------------------------------------ *
 * Heading
 * ------------------------------------------------------------------ */

/**
 * The open principal's name, written a glyph at a time. Re-keyed by the
 * caller on every change so it mounts fresh — the entrance is the swap.
 */
function BrandName({ name, still }: { name: string; still: boolean }) {
  if (still) {
    return <span className="block">{name}</span>
  }

  return (
    <span className="block">
      {/* A codepoint split, so the umlaut in Würth survives it. */}
      {Array.from(name).map((glyph, index) => (
        <span
          key={`${glyph}-${index}`}
          /* The mask crops the glyph's rise; descenders need the slack back. */
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <span
            className="pw-glyph"
            style={vars({ "--pw-glyph-delay": `${index * GLYPH_STAGGER}ms` })}
          >
            {glyph === " " ? " " : glyph}
          </span>
        </span>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Cells
 * ------------------------------------------------------------------ */

function BrandMark({ brand, open }: { brand: Brand; open: boolean }) {
  const source = brand.logoWhite ?? brand.logo

  const tone = open
    ? "opacity-100"
    : "opacity-55 group-hover:opacity-85 group-focus-visible:opacity-85"

  if (!source) {
    return (
      <span
        className={cn(
          "text-[clamp(15px,1.5vw,22px)] whitespace-nowrap transition-opacity duration-700 ease-expo",
          tone
        )}
      >
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
        "h-[clamp(26px,2.8vw,44px)] w-[clamp(86px,7.6vw,132px)] object-contain transition-opacity duration-700 ease-expo",
        tone
      )}
    />
  )
}

/** The crosshair that marks the open cell. */
function Corners() {
  return (
    <span aria-hidden="true" className="pw-corners pointer-events-none absolute inset-0">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Panel
 * ------------------------------------------------------------------ */

/**
 * The open principal's detail. Fixed in height across principals, so crossing
 * the row never moves anything underneath the section.
 */
function BrandDetail({ brand, still }: { brand: Brand; still: boolean }) {
  /*
   * The cascade is the swap — the panel is re-keyed on the open principal, so
   * each line mounts fresh and rises a beat behind the one above it. With
   * motion toned down the copy is simply there.
   */
  const rise = (delay: number, className: string) => ({
    className: still ? className : cn(className, "pw-rise"),
    style: still ? undefined : vars({ "--pw-rise": `${delay}ms` }),
  })

  return (
    <div className="grid gap-x-[clamp(28px,4vw,72px)] gap-y-6 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div>
        <p {...rise(0, "text-[10px] tracking-[0.18em] text-white/50 uppercase")}>
          Authorised distributor · {brand.familyCount}
        </p>
        <p
          {...rise(
            70,
            "mt-3 max-w-[46ch] text-[clamp(15px,1.45vw,19px)] leading-[1.55] text-white/80"
          )}
        >
          {brand.description}
        </p>
      </div>

      <div className="flex flex-col items-start gap-5">
        <ul {...rise(140, "flex list-none flex-wrap gap-2")}>
          {brand.groups.map((group) => (
            <li
              key={group.title}
              className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[12px] tracking-[0.01em] text-white/65"
            >
              {group.title}
            </li>
          ))}
        </ul>

        <Link
          href="/brands"
          {...rise(
            210,
            "group/cta inline-flex items-center gap-2 text-[13px] tracking-[0.02em] text-white"
          )}
        >
          <span className="border-b border-white/25 pb-0.5 transition-colors duration-300 ease-expo group-hover/cta:border-white">
            Explore the range
          </span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-3.5 fill-none stroke-current stroke-[1.6] transition-transform duration-500 ease-expo group-hover/cta:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Field
 * ------------------------------------------------------------------ */

type FieldProps = {
  /** Set once the section has been reached and the entrance may run. */
  shown?: boolean
  /** Set when the visitor has asked for motion to be toned down. */
  still?: boolean
}

function Field({ shown = false, still = false }: FieldProps) {
  const [open, setOpen] = React.useState(DEFAULT_OPEN)
  const [held, setHeld] = React.useState(false)
  const brand = brands[open]

  const grid = React.useRef<HTMLDivElement>(null)
  const cells = React.useRef<(HTMLButtonElement | null)[]>([])
  const last = brands.length - 1

  /* Odd counts leave a gap in the two-up phone grid; the tail fills it. */
  const tailSpans = brands.length % 2 === 1

  const keepRef = React.useCallback(
    (index: number) => (element: HTMLButtonElement | null) => {
      cells.current[index] = element
    },
    []
  )

  /*
   * The entrance. Everything is in place the moment the section is reached —
   * the cascade only sets the order things appear in, and holds its own start
   * state through the delay, so nothing here is waiting on a scroll position.
   */
  const enter = (delay: number, className: string) => ({
    className: cn(className, shown ? "pw-in" : "opacity-0"),
    style: shown ? vars({ "--pw-in": `${delay}ms` }) : undefined,
  })

  /* Left alone, the row walks itself along. */
  const running = shown && !still && !held
  React.useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(
      () => setOpen((current) => (current + 1) % brands.length),
      DWELL
    )
    return () => window.clearTimeout(timer)
  }, [running, open])

  /* The light under the grid follows the pointer, one write per frame. */
  React.useEffect(() => {
    const element = grid.current
    if (!element || still) return

    let frame: number | null = null
    let point: { x: number; y: number } | null = null

    const paint = () => {
      frame = null
      if (!point) return
      element.style.setProperty("--mx", `${point.x}px`)
      element.style.setProperty("--my", `${point.y}px`)
    }

    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect()
      point = { x: event.clientX - box.left, y: event.clientY - box.top }
      if (frame === null) frame = requestAnimationFrame(paint)
    }

    element.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      element.removeEventListener("pointermove", onMove)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [still])

  /* Arrow keys walk the row, as a tab list is expected to. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
    let next = open

    if (step !== 0) next = (open + step + brands.length) % brands.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = last
    else return

    event.preventDefault()
    setOpen(next)
    cells.current[next]?.focus()
  }

  return (
    <div
      className={cn("content-pad flex w-full flex-col", !shown && "pointer-events-none")}
      onPointerLeave={(event) => {
        /* A tap ends with a leave; only a mouse leaving should release it. */
        if (event.pointerType === "mouse") setHeld(false)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
      }}
    >
      {/* ---------- Heading ---------- */}
      <div {...enter(0, "text-center")}>
        <h2 className="text-[clamp(1.1rem,1.9vw,1.6rem)] leading-[1.2] font-light tracking-[0.01em] text-white/60">
          Authorised Distributor of
        </h2>
        <p
          key={still ? "still" : brand.name}
          className="mt-2 text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] font-light tracking-[-0.035em] text-white"
        >
          <BrandName name={brand.name} still={still} />
        </p>
      </div>

      {/* ---------- The row ---------- */}
      <div
        ref={grid}
        role="tablist"
        aria-label="Authorised principals"
        onKeyDown={onKeyDown}
        className="pw-grid relative isolate mt-[clamp(34px,6vh,68px)] grid grid-cols-2 border-t border-l border-white/10 sm:grid-cols-3 md:grid-cols-5"
      >
        <span aria-hidden="true" className="pw-glow pointer-events-none absolute inset-0 -z-1" />

        {brands.map((item, index) => {
          const isOpen = shown && open === index

          return (
            <button
              key={item.name}
              ref={keepRef(index)}
              type="button"
              role="tab"
              id={`principal-tab-${index}`}
              aria-controls="principal-panel"
              aria-selected={isOpen}
              tabIndex={isOpen ? 0 : -1}
              data-active={isOpen}
              onFocus={() => {
                setOpen(index)
                setHeld(true)
              }}
              onPointerEnter={(event) => {
                /* Touch fires a pointerenter on tap; leave those to the click. */
                if (event.pointerType !== "mouse") return
                setOpen(index)
                setHeld(true)
              }}
              /* Focus lands first on a tap, so a toggle here would undo it. */
              onClick={() => setOpen(index)}
              {...enter(
                CELLS_LEAD + index * CELL_STEP,
                cn(
                  "group relative flex h-[clamp(96px,15vh,168px)] cursor-pointer items-center justify-center overflow-hidden border-r border-b border-white/10 transition-colors duration-700 ease-expo",
                  isOpen ? "bg-white/[0.055]" : "bg-transparent hover:bg-white/[0.025]",
                  tailSpans && index === last && "max-sm:col-span-2"
                )
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-4 left-5 text-[10px] tracking-[0.16em] tabular-nums transition-colors duration-500 ease-expo",
                  isOpen ? "text-white/60" : "text-white/25"
                )}
              >
                {pad(index)}
              </span>

              <BrandMark brand={item} open={isOpen} />

              <Corners />

              {/* Re-keyed, so the highlight crosses once on every change. */}
              {isOpen && !still && (
                <span
                  key={`sheen-${open}`}
                  aria-hidden="true"
                  className="pw-sheen pointer-events-none absolute inset-y-0 w-1/2"
                />
              )}

              {/* The dwell clock. Only drawn while something is running it. */}
              {isOpen && !still && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/12"
                >
                  <span
                    key={`dwell-${open}`}
                    data-paused={held}
                    className="pw-dwell block h-full"
                    style={vars({ "--pw-dwell": `${DWELL}ms` })}
                  />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/*
       * The open principal. All five sit in the one grid cell and the closed
       * four are only made invisible, so the panel is always as tall as the
       * longest of them — crossing the row can never move what is under the
       * section, at any width, without a height guessed in advance.
       *
       * Only the cell being opened and the one being closed change key, so a
       * change remounts two of the five: enough for the open one's cascade to
       * run from the top, and no more than that.
       */}
      <div
        id="principal-panel"
        role="tabpanel"
        aria-labelledby={`principal-tab-${open}`}
        tabIndex={-1}
        {...enter(PANEL_IN, "mt-[clamp(28px,4.5vh,52px)] grid")}
      >
        {brands.map((item, index) => {
          const isOpen = index === open

          return (
            <div
              key={isOpen ? `${item.name}-open` : item.name}
              inert={!isOpen}
              className={cn("col-start-1 row-start-1", !isOpen && "invisible")}
            >
              <BrandDetail brand={item} still={still || !isOpen} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* A soft light above the heading, so the field is never flat black. */
function Backdrop({ still = false }: { still?: boolean }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-2 bg-[radial-gradient(130%_82%_at_50%_-14%,rgba(126,146,198,0.32),transparent_62%),radial-gradient(100%_70%_at_50%_118%,rgba(86,102,148,0.16),transparent_66%)]",
          !still && "pw-drift"
        )}
      />
      {/* A surveyor's grid under it all, faded out before it reaches an edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-1 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(120%_80%_at_50%_40%,#000_18%,transparent_72%)]"
      />
    </>
  )
}

export function AuthorisedDistributors() {
  const reducedMotion = usePrefersReducedMotion()

  const sectionRef = React.useRef<HTMLElement>(null)
  const [shown, setShown] = React.useState(false)

  /*
   * The entrance fires once, when the section is reached. It used to be drawn
   * off a pinned scroll track, which meant the row only finished arriving
   * after another viewport and a half of scrolling — a reader who stopped
   * where the section landed was left looking at half a row. The cascade is
   * the same; what it hangs off is arrival, not a scroll position.
   */
  React.useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (records) => {
        if (!records.some((record) => record.isIntersecting)) return
        setShown(true)
        observer.disconnect()
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    )
    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="authorised-distributors"
      className="on-blue relative isolate flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-[#090c15] py-[clamp(56px,9vh,120px)] text-white"
    >
      <Backdrop still={reducedMotion} />
      <Field shown={shown} still={reducedMotion} />
    </section>
  )
}
