"use client"

import * as React from "react"

import { RegionSlider } from "@/components/site/presence/region-slider"
import { Reveal } from "@/components/site/reveal"
import { presence, regions } from "@/data/catenate"

export function GlobalPresence() {
  /*
   * The section fits exactly inside one viewport height (100dvh / 100vh)
   * arranged in a vertical flex column: the heading block clears the fixed
   * navbar and takes its natural height, while the region card flexes to fill
   * the exact remaining height without overflowing or requiring inner scroll.
   */
  return (
    <section
      id="presence"
      className="relative box-border flex h-screen h-[100dvh] w-full flex-col overflow-hidden bg-white text-ink snap-start !scroll-mt-0"
    >
      <Reveal className="content-pad flex flex-none flex-col items-start pt-[calc(var(--nav-height)+clamp(4px,0.8vh,12px))] pb-[clamp(6px,1.2vh,14px)] text-left">
        <span className="eyebrow">{presence.eyebrow}</span>
        <h2 className="max-w-none text-balance text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.18] font-medium tracking-[-0.015em] text-ink">
          {presence.heading}
        </h2>
      </Reveal>

      <Reveal className="content-pad flex flex-1 min-h-0 w-full flex-col pb-[clamp(10px,1.6vh,24px)]">
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
