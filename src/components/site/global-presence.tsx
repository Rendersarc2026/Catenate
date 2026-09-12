"use client"

import * as React from "react"

import { RegionSlider } from "@/components/site/presence/region-slider"
import { Reveal } from "@/components/site/reveal"
import { presence, regions } from "@/data/catenate"

export function GlobalPresence() {
  /*
   * The region slider renders with consistent margins and rounded corners.
   * The foot repeats the slider's own side gutter step for step, so the
   * picture sits in an even margin rather than trailing a wide white band.
   */
  return (
    <section
      id="presence"
      className="section section-flush !pt-0 !pb-4 sm:!pb-6 md:!pb-8 lg:!pb-10 bg-white text-ink overflow-hidden"
    >
      <Reveal className="content-pad flex flex-col items-start py-[clamp(56px,6.5vw,88px)] text-left">
        <span className="eyebrow">{presence.eyebrow}</span>
        <h2 className="max-w-[24ch] text-balance text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em] text-ink">
          {presence.heading}
        </h2>
      </Reveal>

      <Reveal className="px-4 sm:px-6 md:px-8 lg:px-10">
        {/* The figures ride the foot of the picture rather than sitting under
            it, so the stage reads as one frame. */}
        <RegionSlider
          regions={regions}
          footer={presence.stats.map((stat) => (
            <div key={stat.label} className="region-stat">
              <CountUp to={stat.to} suffix={stat.suffix} />
              <span className="region-stat-label">{stat.label}</span>
            </div>
          ))}
        />
      </Reveal>
    </section>
  )
}

/** Counts up from zero the first time it scrolls into view. */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = React.useRef<HTMLBaseElement>(null)
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame: number | null = null
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer.unobserve(entry.target)

          // Land on the final figure rather than animating to it.
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setValue(to)
            return
          }

          const start = performance.now()
          const step = (now: number) => {
            const k = Math.min(1, (now - start) / 1200)
            setValue(Math.round(to * (1 - Math.pow(1 - k, 3))))
            if (k < 1) frame = requestAnimationFrame(step)
          }
          frame = requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [to])

  return (
    <b ref={ref} className="tnum region-stat-figure">
      {value}
      {suffix}
    </b>
  )
}
