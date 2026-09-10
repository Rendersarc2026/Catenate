"use client"

import * as React from "react"

import type { Region } from "@/data/catenate"
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion"
import { cn } from "@/lib/utils"

/*
 * Photography for the four territories, keyed by the name each region carries
 * in `@/data/catenate`. It lives here rather than in the data file because it
 * is art direction, not record: the coordinates, markets and names are the
 * data, and none of them change to accommodate a picture.
 *
 * Unsplash's own CDN does the resizing and format negotiation (`auto=format`
 * serves AVIF/WebP), so these are plain CSS backgrounds — the wipe needs the
 * image sliced across two dozen strips anyway, which `next/image` cannot do.
 */
const PHOTOS: Record<string, { id: string; alt: string }> = {
  Oman: {
    id: "1723883480638-95ac2fdd1dfa",
    alt: "The Muttrah corniche in Muscat at golden hour, backed by the Hajar mountains",
  },
  UAE: {
    id: "1512453979798-5ea266f8880c",
    alt: "The Dubai skyline at dawn, Burj Khalifa above the Sheikh Zayed Road interchange",
  },
  Qatar: {
    id: "1683194247996-43897678c94c",
    alt: "The Doha waterfront skyline lit at night under a full moon",
  },
  UK: {
    id: "1506501139174-099022df5260",
    alt: "The River Thames and St Paul's Cathedral from the air at dusk",
  },
}

const FALLBACK = PHOTOS.UAE

function photoFor(region: Region) {
  return PHOTOS[region.name] ?? FALLBACK
}

function src(id: string, width: number, quality = 78) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/** Horizontal strips the outgoing frame is cut into for the wipe. */
const SLATS = 22

/** How long each region holds before the slider moves on, in ms. */
const DWELL = 6000

const pad = (n: number) => String(n).padStart(2, "0")

type Wipe = { token: number; photoId: string }

export function RegionSlider({ regions }: { regions: Region[] }) {
  const reducedMotion = usePrefersReducedMotion()
  const stageRef = React.useRef<HTMLDivElement>(null)

  const [active, setActive] = React.useState(0)
  const [wipe, setWipe] = React.useState<Wipe | null>(null)
  const [inView, setInView] = React.useState(false)
  const [paused, setPaused] = React.useState(false)

  const region = regions[active]
  const photo = photoFor(region)

  /*
   * The stage only reaches for its photography once it is worth having, and
   * the slider only advances while someone could actually be watching it.
   */
  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "300px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Warm the neighbouring frames so a change is a paint, not a fetch.
  React.useEffect(() => {
    if (!inView) return
    for (const other of regions) {
      const img = new Image()
      img.src = src(photoFor(other).id, 1920)
    }
  }, [inView, regions])

  const goTo = React.useCallback(
    (next: number) => {
      setActive((current) => {
        const target = (next + regions.length) % regions.length
        if (target === current) return current
        if (!reducedMotion) {
          // The outgoing frame is what slides away, so capture it before the swap.
          setWipe({ token: Date.now(), photoId: photoFor(regions[current]).id })
        }
        return target
      })
    },
    [reducedMotion, regions]
  )

  const next = React.useCallback(() => goTo(active + 1), [active, goTo])

  const autoplay = inView && !paused && !reducedMotion

  return (
    <div
      ref={stageRef}
      className="region-stage"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* The frame in view. Everything else is painted over it. */}
      <div
        className="region-frame"
        style={inView ? { backgroundImage: `url("${src(photo.id, 1920)}")` } : undefined}
        role="img"
        aria-label={photo.alt}
      />

      {/*
       * The wipe: the previous frame, cut into strips that slide off in
       * alternating directions on a stagger, uncovering the new one beneath.
       */}
      {wipe && inView ? (
        <div key={wipe.token} className="region-wipe" aria-hidden="true">
          {Array.from({ length: SLATS }, (_, i) => (
            <span
              key={i}
              className={cn("region-slat", i % 2 === 0 ? "is-left" : "is-right")}
              onAnimationEnd={i === SLATS - 1 ? () => setWipe(null) : undefined}
              style={{
                top: `${(i * 100) / SLATS}%`,
                height: `calc(${100 / SLATS}% + 1px)`,
                backgroundImage: `url("${src(wipe.photoId, 1920)}")`,
                backgroundSize: `100% ${SLATS * 100}%`,
                backgroundPositionY: `${(i * 100) / (SLATS - 1)}%`,
                animationDelay: `${i * 16}ms`,
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="region-scrim" aria-hidden="true" />

      {/* Advancing by clicking the picture, the way the reference does. */}
      <button type="button" className="region-advance" onClick={next}>
        <span className="sr-only">Show the next region</span>
      </button>

      <ExploreCursor stageRef={stageRef} enabled={!reducedMotion} />

      <div className="region-chrome">
        <h3 key={region.name} className="region-title">
          {[...region.name].map((glyph, i) => (
            <span
              key={i}
              className="region-title-glyph"
              style={{ animationDelay: `${120 + i * 34}ms` }}
            >
              {glyph === " " ? " " : glyph}
            </span>
          ))}
        </h3>

        <div className="region-rule">
          <span className="region-rule-lead">
            <i className="region-stack" aria-hidden="true" />
            {regions.length} regions
          </span>
          <span key={`m-${active}`} className="region-rule-label">
            {region.markets}
          </span>
          <span className="region-rule-count tnum">
            <b key={`c-${active}`}>{pad(active + 1)}</b>
            <em>—</em>
            {pad(regions.length)}
          </span>
        </div>

        <div className="region-foot">
          <span key={`co-${active}`} className="region-coords">
            {region.coordinates}
          </span>

          <div className="region-thumbs" role="tablist" aria-label="Regions">
            {regions.map((other, index) => {
              const isActive = index === active
              return (
                <button
                  key={other.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => goTo(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") goTo(index + 1)
                    else if (event.key === "ArrowLeft") goTo(index - 1)
                    else return
                    event.preventDefault()
                  }}
                  className={cn("region-thumb", isActive && "is-active")}
                >
                  <span className="region-thumb-index" aria-hidden="true">
                    {pad(index + 1)}.
                  </span>
                  <span
                    className="region-thumb-shot"
                    style={
                      inView
                        ? { backgroundImage: `url("${src(photoFor(other).id, 480, 66)}")` }
                        : undefined
                    }
                  >
                    <span className="sr-only">{other.name}</span>
                  </span>
                  {/*
                   * The bar is the clock: it runs for the dwell, and the slider
                   * moves when it finishes. Pausing the animation — on hover, on
                   * focus, off screen — pauses the slider with it, so the two can
                   * never drift out of step.
                   */}
                  {isActive ? (
                    <span className="region-thumb-rail" aria-hidden="true">
                      <span
                        key={`p-${active}`}
                        className={cn("region-thumb-fill", !autoplay && "is-held")}
                        style={{ animationDuration: `${DWELL}ms` }}
                        onAnimationEnd={next}
                      />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * The disc that trails the pointer across the stage. Positioned straight on the
 * element rather than through React state — this runs on every pointer move,
 * and a re-render per frame is a cost with nothing to show for it.
 */
function ExploreCursor({
  stageRef,
  enabled,
}: {
  stageRef: React.RefObject<HTMLDivElement | null>
  enabled: boolean
}) {
  const dotRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const stage = stageRef.current
    const dot = dotRef.current
    if (!stage || !dot || !enabled) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let frame: number | null = null
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let seeded = false

    const tick = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      frame = Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1
        ? null
        : requestAnimationFrame(tick)
    }

    const move = (event: PointerEvent) => {
      const box = stage.getBoundingClientRect()
      targetX = event.clientX - box.left
      targetY = event.clientY - box.top
      if (!seeded) {
        // Land the disc under the cursor rather than flying it in from a corner.
        seeded = true
        x = targetX
        y = targetY
      }
      if (frame === null) frame = requestAnimationFrame(tick)
    }

    const leave = () => {
      seeded = false
    }

    stage.addEventListener("pointermove", move)
    stage.addEventListener("pointerleave", leave)
    return () => {
      stage.removeEventListener("pointermove", move)
      stage.removeEventListener("pointerleave", leave)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [enabled, stageRef])

  if (!enabled) return null

  return (
    <span ref={dotRef} className="region-cursor" aria-hidden="true">
      Next
    </span>
  )
}
