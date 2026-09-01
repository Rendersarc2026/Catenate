"use client"

import * as React from "react"
import Image from "next/image"

import { ArrowButton } from "@/components/site/arrow-button"
import { hero, images } from "@/data/catenate"

/** Peak translation of the parallax layer, in px. */
const PARALLAX_X = 18
const PARALLAX_Y = 12

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
      className={`${ready ? "is-ready " : ""}on-blue relative flex min-h-[min(94vh,860px)] flex-col items-center justify-start content-pad overflow-hidden pt-[150px] text-center text-white max-md:pt-[130px]`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover saturate-55 contrast-105"
        />
      </div>

      {/* Warm-to-deep-blue scrim that carries the brand over any photograph. */}
      <div className="absolute inset-0 z-1 bg-[linear-gradient(165deg,rgb(232_185_138/0.34)_0%,rgb(52_58_124/0.78)_40%,rgb(16_27_82/0.95)_100%)]" />

      <div ref={innerRef} className="relative z-2 my-auto max-w-[900px] will-change-transform">
        <span className="eyebrow hero-fade mb-7.5 text-[10.5px] tracking-[0.24em] opacity-62">
          {hero.eyebrow}
        </span>

        <h1 className="mx-auto mb-7.5 max-w-[19ch] text-[clamp(2.2rem,4.4vw,3.9rem)] leading-[1.18] font-light tracking-[-0.022em] max-[820px]:max-w-none">
          {hero.headlineLines.map((line) => (
            <span key={line} className="hero-line">
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-fade mx-auto mb-10 max-w-[46ch] text-[16.5px] leading-[1.7] text-white/72">
          {hero.body}
        </p>

        <div className="hero-fade flex flex-wrap justify-center gap-2.5">
          <ArrowButton href="#presence" variant="onBlue">
            Explore our global network
          </ArrowButton>
          <ArrowButton href="#brands" variant="line">
            Our portfolio
          </ArrowButton>
        </div>
      </div>

      <div className="hero-fade relative z-2 mt-[clamp(40px,6vw,72px)] grid w-full grid-cols-4 border-t border-white/16 max-[720px]:grid-cols-2">
        {hero.stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`border-l border-white/16 px-2 pt-6.5 pb-8.5 text-center first:border-l-0 max-[720px]:nth-3:border-l-0 ${
              index >= 2 ? "max-[720px]:border-t max-[720px]:border-white/16" : ""
            }`}
          >
            <b className="tnum block text-[clamp(1.9rem,3.4vw,2.9rem)] leading-none font-light tracking-[-0.03em] text-white">
              {stat.value}
            </b>
            <span className="mt-3 block text-[10px] tracking-[0.16em] text-white/50 uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
