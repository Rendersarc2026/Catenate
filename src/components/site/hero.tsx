"use client"

import Image from "next/image"
import * as React from "react"
import { hero, images } from "@/data/catenate"
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion"

/** Peak translation of the mouse parallax layer, in px. */
const PARALLAX_X = 14
const PARALLAX_Y = 10

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
      className={`${ready ? "is-ready " : ""}on-blue relative h-screen h-dvh w-full overflow-hidden [contain:layout_paint] flex flex-col justify-between items-center text-center text-white bg-black pt-[100px] pb-6 sm:pt-[110px] sm:pb-8 content-pad select-none`}
    >
      {/* 1. The banner the whole hero is set on. */}
      <div
        className="absolute inset-0 z-2 pointer-events-none overflow-hidden flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="relative size-full overflow-hidden bg-black">
          {/*
            The picture the hero is set on. It is the largest thing above the
            fold, so it is fetched at priority rather than lazily.

            Shown as photographed. It is a blue-hour port, so it already sits
            in the palette and needs no grading — the earlier grey-and-black
            wash buried the gantries the picture is actually of. The only
            correction is a small brightness trim to hold the white copy.
          */}
          <Image
            src={images.heroBackdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover [filter:contrast(1.03)_brightness(0.82)]"
          />

          {/* Only the two edges the interface actually sits on are shaded —
              the nav along the top and the stat row along the bottom. The
              middle of the frame is left alone so the picture reads as a
              photograph rather than a darkened plate; the headline carries its
              own shadow instead of resting on a scrim. */}
          <div
            className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* 2. Foreground headline and action buttons. */}
      <div className="relative z-10 max-w-[1050px] mx-auto my-auto">
        <div ref={mouseParallaxRef} className="will-change-transform">
          {/* White headline text */}
          <h1 className="mx-auto text-[clamp(1.75rem,3.2vw,2.85rem)] leading-[1.3] font-bold tracking-[-0.02em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_2px_10px_rgba(0,0,0,0.7),0_4px_40px_rgba(0,0,0,0.8)]">
            {hero.headlineLines.map((line) => (
              <span
                key={line}
                className="hero-line block whitespace-normal sm:whitespace-nowrap"
              >
                <span>{line}</span>
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* 3. Stats row anchored along the bottom. */}
      <div className="hero-fade relative z-10 w-full max-w-[1220px] grid grid-cols-4 pt-4 shrink-0 max-[720px]:grid-cols-2 max-[720px]:gap-y-6">
        {hero.stats.map((stat) => (
          <div
            key={stat.label}
            className="border-l border-white/16 px-4 py-1 text-center first:border-l-0 max-[720px]:nth-3:border-l-0"
          >
            <b className="tnum block text-[clamp(2.1rem,3.6vw,3rem)] leading-none font-bold tracking-[-0.025em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.7),0_2px_18px_rgba(0,0,0,0.6)]">
              {stat.value}
            </b>
            <span className="mt-2.5 block text-[11px] sm:text-[12px] tracking-[0.18em] text-white/85 uppercase font-semibold [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
