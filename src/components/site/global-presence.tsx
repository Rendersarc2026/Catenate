"use client"

import * as React from "react"

import { Reveal } from "@/components/site/reveal"
import { industries, landRows, presence, regions } from "@/data/catenate"
import { cn } from "@/lib/utils"

/** Dot grid geometry, in the map's own viewBox units. */
const GRID = { stepX: 10.2, stepY: 10.4, offsetX: 8, offsetY: 6 }

const at = (column: number, row: number) => ({
  cx: (GRID.offsetX + column * GRID.stepX).toFixed(1),
  cy: (GRID.offsetY + row * GRID.stepY).toFixed(1),
})

/** Every land dot, derived once from the row spans. */
const landDots = landRows.flatMap((spans, row) =>
  spans.flatMap(([from, to]) =>
    Array.from({ length: to - from + 1 }, (_, i) => at(from + i, row))
  )
)

export function GlobalPresence() {
  const [litRegion, setLitRegion] = React.useState<number | null>(null)

  return (
    <section id="presence" className="section on-blue bg-blue text-white">
      <Reveal className="mb-[clamp(34px,4vw,54px)] grid items-end gap-[clamp(28px,5vw,64px)] max-lg:grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <span className="eyebrow">{presence.eyebrow}</span>
          <h2 className="max-w-[17ch] text-balance text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
            {presence.heading}
          </h2>
        </div>
        <p className="lead">{presence.lead}</p>
      </Reveal>

      <Reveal className="grid items-center gap-[clamp(28px,4vw,56px)] border-b border-white/14 pb-[clamp(34px,4vw,54px)] max-lg:grid-cols-1 lg:grid-cols-[1.55fr_0.75fr]">
        <svg
          viewBox="0 0 660 300"
          role="img"
          aria-label="Map showing Catenate presence across four regions"
          className="h-auto w-full"
        >
          {landDots.map((dot, i) => (
            <circle key={i} className="dot-land" cx={dot.cx} cy={dot.cy} r="1.7" />
          ))}

          {regions.flatMap((region, regionIndex) =>
            region.points.map((point, pointIndex) => {
              const { cx, cy } = at(point[0], point[1])
              const dimmed = litRegion !== null && litRegion !== regionIndex
              return (
                <React.Fragment key={`${regionIndex}-${pointIndex}`}>
                  <circle
                    className="dot-halo"
                    cx={cx}
                    cy={cy}
                    r="7"
                    style={{ opacity: litRegion === regionIndex ? 0.45 : undefined }}
                  />
                  <circle
                    className="dot-live"
                    cx={cx}
                    cy={cy}
                    r="2.9"
                    style={{ opacity: dimmed ? 0.28 : undefined }}
                  />
                </React.Fragment>
              )
            })
          )}
        </svg>

        <ul className="list-none" onMouseLeave={() => setLitRegion(null)}>
          {regions.map((region, index) => (
            <li
              key={region.name}
              onMouseEnter={() => setLitRegion(index)}
              className={cn(
                "flex items-baseline gap-3.5 border-b border-white/14 py-3.25 transition-opacity duration-250 ease-expo last:border-b-0",
                litRegion !== null && litRegion !== index && "opacity-40"
              )}
            >
              <i
                className={cn(
                  "size-1.5 flex-none rounded-full bg-white opacity-50 transition-[opacity,transform] duration-250 ease-expo",
                  litRegion === index && "scale-150 opacity-100"
                )}
              />
              <b className="flex-1 text-[15px] font-medium">{region.name}</b>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        stagger
        className="grid grid-cols-4 gap-6 border-b border-white/14 py-[clamp(34px,4vw,54px)] text-left max-lg:grid-cols-2 max-lg:gap-x-6 max-lg:gap-y-10 max-lg:text-center"
      >
        {presence.stats.map((stat) => (
          <div key={stat.label}>
            <CountUp to={stat.to} suffix={stat.suffix} />
            <span className="mt-3 block text-xs tracking-[0.14em] text-white/55 uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </Reveal>

      <Reveal className="ticker-mask mt-[clamp(28px,3.5vw,44px)]" aria-hidden="true">
        <div className="ticker-track">
          {/* Duplicated so the -50% keyframe loops seamlessly. */}
          {[0, 1].map((copy) => (
            <React.Fragment key={copy}>
              {industries.map((industry) => (
                <span
                  key={`${copy}-${industry.name}`}
                  className="flex items-center gap-6.5 pr-6.5 text-sm whitespace-nowrap text-white/55 after:size-1 after:rounded-full after:bg-white/30 after:content-['']"
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
      className="tnum block text-[clamp(2.6rem,5.4vw,4.2rem)] leading-none font-medium tracking-[-0.03em]"
    >
      {value}
      {suffix}
    </b>
  )
}
