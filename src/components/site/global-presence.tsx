"use client"

import * as React from "react"

import { RegionSlider } from "@/components/site/presence/region-slider"
import { Reveal } from "@/components/site/reveal"
import { industries, presence, regions } from "@/data/catenate"

export function GlobalPresence() {
  /*
   * Flush, so the slider can run the full width of the screen. Every other
   * block re-applies the content column for itself.
   */
  return (
    <section id="presence" className="section section-flush bg-white text-ink overflow-hidden">
      <Reveal className="content-pad mb-[clamp(34px,4vw,54px)] flex flex-col items-center text-center">
        <span className="eyebrow">{presence.eyebrow}</span>
        <h2 className="mx-auto max-w-[24ch] text-balance text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em] text-ink">
          {presence.heading}
        </h2>
      </Reveal>

      <Reveal>
        <RegionSlider regions={regions} />
      </Reveal>

      <Reveal
        stagger
        className="content-pad grid grid-cols-4 gap-6 border-b border-ink/10 py-[clamp(34px,4vw,54px)] text-center max-lg:grid-cols-2 max-lg:gap-x-6 max-lg:gap-y-10"
      >
        {presence.stats.map((stat) => (
          /* Each figure is centred over its own label, so the four blocks
             sit at even intervals whatever the label lengths. */
          <div key={stat.label} className="flex flex-col items-center">
            <CountUp to={stat.to} suffix={stat.suffix} />
            <span className="mt-3 block text-xs tracking-[0.14em] text-grey uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </Reveal>

      <Reveal className="content-pad ticker-mask mt-[clamp(28px,3.5vw,44px)]" aria-hidden="true">
        <div className="ticker-track">
          {/* Duplicated so the -50% keyframe loops seamlessly. */}
          {[0, 1].map((copy) => (
            <React.Fragment key={copy}>
              {industries.map((industry) => (
                <span
                  key={`${copy}-${industry.name}`}
                  className="flex items-center gap-6.5 pr-6.5 text-sm whitespace-nowrap text-grey after:size-1 after:rounded-full after:bg-ink/20 after:content-['']"
                >
                  {industry.name}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
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
    <b
      ref={ref}
      className="tnum block text-[clamp(2.6rem,5.4vw,4.2rem)] leading-none font-medium tracking-[-0.03em] text-ink"
    >
      {value}
      {suffix}
    </b>
  )
}
