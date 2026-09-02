"use client"

import * as React from "react"
import { ArrowButton } from "@/components/site/arrow-button"
import { HeroBackdrop } from "@/components/site/hero-backdrop"
import { hero } from "@/data/catenate"

/** Peak translation of the parallax layer, in px. */
const PARALLAX_X = 14
const PARALLAX_Y = 10

export function Hero() {
  const [ready, setReady] = React.useState(false)
  const sectionRef = React.useRef<HTMLElement>(null)
  const innerRef = React.useRef<HTMLDivElement>(null)

  // Play the entrance on the frame after mount so the transition actually runs.
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  React.useEffect(() => {
    const section = sectionRef.current
    const inner = innerRef.current
    if (!section || !inner) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame: number | null = null

    const tick = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      inner.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      const settled =
        Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05
      frame = settled ? null : requestAnimationFrame(tick)
    }

    const start = () => {
      if (frame === null) frame = requestAnimationFrame(tick)
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * PARALLAX_X
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * PARALLAX_Y
      start()
    }

    const onMouseLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    section.addEventListener("mousemove", onMouseMove)
    section.addEventListener("mouseleave", onMouseLeave)
    return () => {
      section.removeEventListener("mousemove", onMouseMove)
      section.removeEventListener("mouseleave", onMouseLeave)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-ready={ready || undefined}
      className={`${
        ready ? "is-ready " : ""
      }on-blue relative flex min-h-[min(100vh,940px)] flex-col items-center justify-between content-pad overflow-hidden pt-[165px] pb-10 text-center text-white bg-black max-md:pt-[130px] max-md:min-h-[820px]`}
    >
      <div className="absolute inset-0 z-0">
        <HeroBackdrop />
      </div>

      {/* Headline floating in the upper starry sky */}
      <div
        ref={innerRef}
        className="relative z-2 max-w-[1050px] will-change-transform mt-3 sm:mt-8"
      >
        <h1 className="mx-auto text-[clamp(1.7rem,3.1vw,2.75rem)] leading-[1.3] font-light tracking-[-0.02em] text-white">
          {hero.headlineLines.map((line) => (
            <span key={line} className="hero-line block whitespace-normal sm:whitespace-nowrap">
              <span>{line}</span>
            </span>
          ))}
        </h1>
      </div>

      {/* CTA Buttons positioned over the lower Earth curvature */}
      <div className="hero-fade relative z-2 mt-auto mb-10 pt-16 flex flex-wrap justify-center items-center gap-3.5">
        <ArrowButton href="#presence" variant="onBlue" size="pill">
          Explore our global network
        </ArrowButton>
        <ArrowButton href="#brands" variant="line" size="pill">
          Our portfolio
        </ArrowButton>
      </div>

      {/* Stats row along the bottom */}
      <div className="hero-fade relative z-2 w-full max-w-[1220px] grid grid-cols-4 pt-4 max-[720px]:grid-cols-2 max-[720px]:gap-y-6">
        {hero.stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`border-l border-white/16 px-4 py-1 text-center first:border-l-0 max-[720px]:nth-3:border-l-0`}
          >
            <b className="tnum block text-[clamp(2.3rem,3.8vw,3.2rem)] leading-none font-light tracking-[-0.025em] text-white">
              {stat.value}
            </b>
            <span className="mt-3 block text-[11px] sm:text-[12px] tracking-[0.18em] text-white/55 uppercase font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
