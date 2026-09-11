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

/** How long each region holds before the slider moves on, in ms. */
const DWELL = 6000

const pad = (n: number) => String(n).padStart(2, "0")

type Fade = { token: number; photoId: string }

export function RegionSlider({
  regions,
  footer,
}: {
  regions: Region[]
  /** Laid across the foot of the picture, inside the same content column. */
  footer?: React.ReactNode
}) {
  const reducedMotion = usePrefersReducedMotion()
  const stageRef = React.useRef<HTMLDivElement>(null)

  const [active, setActive] = React.useState(0)
  const [fade, setFade] = React.useState<Fade | null>(null)
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
          // The outgoing frame is what fades, so capture it before the swap.
          setFade({ token: Date.now(), photoId: photoFor(regions[current]).id })
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

      {/* The previous frame, held over the new one and faded out. */}
      {fade && inView ? (
        <div
          key={fade.token}
          className="region-fade"
          aria-hidden="true"
          style={{ backgroundImage: `url("${src(fade.photoId, 1920)}")` }}
          onAnimationEnd={() => setFade(null)}
        />
      ) : null}

      <div className="region-scrim" aria-hidden="true" />

      {/*
        Advancing by clicking the picture. It is a second route to the region
        list rather than a control of its own, so it stays out of the tab order
        instead of doubling up on it — and it leaves the cursor alone.
      */}
      <button
        type="button"
        className="region-advance"
        onClick={next}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="region-chrome">
        <div className="region-chrome-row">
          <div className="region-copy">
            <h3 key={region.name} className="region-title">
              {[...region.name].map((glyph, i) => (
                <span
                  key={i}
                  className="region-title-glyph"
                  style={{ animationDelay: `${120 + i * 34}ms` }}
                >
                  {glyph === " " ? "\u00A0" : glyph}
                </span>
              ))}
            </h3>

            <span className="region-rule" aria-hidden="true" />

            <div className="region-foot">
              <span key={`m-${active}`} className="region-market">
                {region.markets}
              </span>

              <span className="region-count tnum">
                <b key={`c-${active}`}>{pad(active + 1)}</b>-{pad(regions.length)}
              </span>
            </div>
          </div>

          <div className="region-rail" role="tablist" aria-label="Regions">
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
                    if (event.key === "ArrowDown" || event.key === "ArrowRight")
                      goTo(index + 1)
                    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
                      goTo(index - 1)
                    else return
                    event.preventDefault()
                  }}
                  className={cn("region-name", isActive && "is-active")}
                >
                  <span className="region-name-index" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="region-name-label" data-label={other.name}>
                    {other.name}
                  </span>
                  {isActive ? (
                    <span
                      key={`p-${active}`}
                      className={cn("region-dwell-clock", !autoplay && "is-held")}
                      style={{ animationDuration: `${DWELL}ms` }}
                      onAnimationEnd={next}
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        {footer ? <div className="region-stats">{footer}</div> : null}
      </div>
    </div>
  )
}
