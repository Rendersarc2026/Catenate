"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { hero, images } from "@/data/catenate"
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion"

/** Peak translation of the mouse parallax layer, in px. */
const PARALLAX_X = 14
const PARALLAX_Y = 10

/*
 * Earth geometry.
 *
 * The picture is a limb shot: black sky above, the planet's arc rising across
 * the bottom. Measured on the source, the crown of the limb sits 0.447 of the
 * way up the frame and the arc falls to 0.08 at either edge, which makes the
 * sphere's radius about 0.71 of the frame's width.
 *
 * The hero holds the frame wider than the window and drops it until only the
 * crown clears the bottom edge, so the curve the visitor sees is the flat
 * middle of the arc rather than the whole dome.
 */
const FRAME_VW = 170
/** Source dimensions, which fix the frame's aspect. */
const IMG_W = 2000
const IMG_H = 1116
const FRAME_ASPECT = `${IMG_W} / ${IMG_H}`
/** Height of the crown above the frame's own bottom edge, in vw. */
const CROWN_VW = (FRAME_VW * IMG_H * 0.4471) / IMG_W

/**
 * The section's ground, and the photograph's sky once the brightness in the
 * frame below has been applied to it: the source sits at rgb(3 5 16), and two
 * thirds of that is this. Matching them is what lets the frame end mid-section
 * without an edge, so a change to one is a change to both.
 */
const HERO_SKY = "#02030b"

/*
 * Height of the visible arc at its centre, and the one number to reach for when
 * the planet wants to sit higher or lower. It is fenced on both sides because
 * the curve is measured in widths and the window is not:
 *
 *  - the floor is the sagitta — how far the limb falls away between the centre
 *    of the window and its edge, 10.8% of the width at this frame size. Any
 *    less and a wide, short window keeps black in its bottom corners.
 *  - the ceiling is the picture. There is only `CROWN_VW` of planet below the
 *    crown, and a tall phone asking for 20vh wants more than that.
 */
const ARC = "clamp(11.5vw, 20vh, 36vw)"

/*
 * Star field, drawn to carry on where the photograph stops. On a wide window
 * the picture's own sky reaches the top of the section and none of this shows;
 * on a tall one — a phone especially — the frame only reaches part way up, and
 * what is above it would otherwise be an empty wash. Sized and weighted to pass
 * for the picture's stars, and biased towards the top, since the bottom of the
 * field sits behind the planet either way.
 *
 * Fixed seed, so the server and the client lay out the same sky and hydration
 * has nothing to reconcile.
 */
const STARS = (() => {
  let seed = 0x9e3779b9
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  return Array.from({ length: 120 }, () => ({
    x: +(rand() * 1600).toFixed(1),
    y: +(Math.pow(rand(), 1.35) * 900).toFixed(1),
    r: +(0.4 + rand() * 0.85).toFixed(2),
    o: +(0.18 + rand() * 0.5).toFixed(2),
  }))
})()

export function Hero() {
  const [ready, setReady] = React.useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const containerRef = React.useRef<HTMLElement>(null)
  const mouseParallaxRef = React.useRef<HTMLDivElement>(null)

  // Play the entrance on mount
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Interactive mouse parallax when at top
  React.useEffect(() => {
    if (reducedMotion) return
    const container = containerRef.current
    if (!container) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame: number | null = null

    const tick = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      if (mouseParallaxRef.current) {
        mouseParallaxRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      }

      const settled =
        Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05
      frame = settled ? null : requestAnimationFrame(tick)
    }

    const start = () => {
      if (frame === null) frame = requestAnimationFrame(tick)
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      if (rect.top > -window.innerHeight * 0.5) {
        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * PARALLAX_X
        targetY = ((event.clientY - rect.top) / window.innerHeight - 0.5) * PARALLAX_Y
        start()
      }
    }

    const onMouseLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("mouseleave", onMouseLeave)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{ "--earth-arc": ARC, "--hero-sky": HERO_SKY } as React.CSSProperties}
      className={`${ready ? "is-ready " : ""}on-blue relative isolate h-screen h-dvh min-h-[600px] w-full overflow-hidden [contain:layout_paint] flex flex-col text-center text-white bg-[var(--hero-sky)] pt-[100px] pb-6 sm:pt-[110px] sm:pb-8 content-pad select-none`}
    >
      {/* 1. Space: a fixed sky, then Earth rising along the bottom edge. */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full opacity-70"
        >
          {STARS.map((star, i) => (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#ffffff"
              fillOpacity={star.o}
            />
          ))}
        </svg>

        {/*
          The planet. Nothing fades it into the section: the sky it was shot
          against and the section's own background are the same near-black, so
          the frame's top edge is not an edge the eye can find — which is also
          why the section is that colour rather than a true black.
        */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 -translate-x-1/2 max-w-none"
            style={{
              width: `${FRAME_VW}vw`,
              aspectRatio: FRAME_ASPECT,
              bottom: `calc(var(--earth-arc) - ${CROWN_VW.toFixed(2)}vw)`,
            }}
          >
            {/*
              Local, and served as it is. At this size the frame is wider than
              any device width the optimiser would resize to, and the file is
              already a 177KB WebP cut to the only dimensions the hero uses.

              Taken down to two thirds brightness. Only `brightness` is used, and
              nothing that bends the curve: it scales the sky along with the
              planet, which is what keeps the photograph's black and the
              section's the same colour. `HERO_SKY` below is that sky after the
              multiplication, and the two have to move together.
            */}
            <Image
              src={images.heroEarth}
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover [filter:brightness(0.68)_saturate(0.94)]"
            />
          </div>
        </div>

        {/*
          Shadow. A vignette first, drawn around the copy rather than the frame
          — its centre sits above the middle, where the headline is, so the
          corners and the sides fall away and the eye is walked inwards.
        */}
        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_40%,transparent_28%,rgba(0,0,0,0.42)_70%,rgba(0,0,0,0.72)_100%)]" />

        {/* Then the two edges the interface actually sits on: the nav along the
            top, and the foot of the planet, which is the brightest thing in the
            section and otherwise runs straight into the white below it. */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/18 to-transparent" />
      </div>

      {/* 2. Eyebrow, headline and the one action, centred in the empty sky. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div ref={mouseParallaxRef} className="will-change-transform">
          <p className="hero-fade mx-auto mb-5 max-w-[34ch] sm:max-w-none text-[10px] sm:text-[11px] font-normal tracking-[0.18em] uppercase text-white/45 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
            {hero.eyebrow}
          </p>

          <h1 className="mx-auto text-[clamp(2rem,4vw,3.5rem)] leading-[1.18] font-light tracking-[-0.022em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45),0_6px_38px_rgba(0,0,0,0.65)]">
            {hero.headlineLines.map((line) => (
              <span
                key={line}
                className="hero-line block whitespace-normal sm:whitespace-nowrap"
              >
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <Link
            href="#contact"
            className="hero-fade group mt-8 inline-flex items-center gap-2 text-[13px] sm:text-sm font-normal tracking-[0.02em] text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:text-white"
          >
            Get in touch
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>

      {/* 3. Stats row, sat in the dark band above the limb. */}
      <div
        className="hero-fade relative z-10 w-full max-w-[1220px] mx-auto grid grid-cols-4 shrink-0 max-[720px]:grid-cols-2 max-[720px]:gap-y-5"
        style={{ marginBottom: `calc(var(--earth-arc) + 2vh)` }}
      >
        {hero.stats.map((stat) => (
          <div
            key={stat.label}
            className="border-l border-white/12 px-4 py-1 text-center first:border-l-0 max-[720px]:nth-3:border-l-0"
          >
            <b className="tnum block text-[clamp(1.5rem,2.6vw,2.1rem)] leading-none font-light tracking-[-0.03em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
              {stat.value}
            </b>
            <span className="mt-2 block text-[10px] tracking-[0.18em] text-white/50 uppercase font-normal [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
