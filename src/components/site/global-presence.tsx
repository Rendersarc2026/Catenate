"use client"

import * as React from "react"

import { OrbitDotGlobe, type GlobeLocation } from "@/components/site/orbitdot-globe"
import { Reveal } from "@/components/site/reveal"
import { industries, presence, regions } from "@/data/catenate"
import { cn } from "@/lib/utils"

export function GlobalPresence() {
  const [selectedRegion, setSelectedRegion] = React.useState<number | null>(null)
  const [hoveredRegion, setHoveredRegion] = React.useState<number | null>(null)

  const activeRegion = hoveredRegion !== null ? hoveredRegion : selectedRegion

  const globeLocations: GlobeLocation[] = React.useMemo(
    () =>
      regions.map((region) => ({
        name: region.name,
        coordinates: region.coordinates,
        color: "#e8b98a",
        pulse: true,
        showLabel: true,
      })),
    []
  )

  return (
    <section id="presence" className="section bg-white text-ink overflow-hidden">
      <Reveal className="mb-[clamp(34px,4vw,54px)] grid items-end gap-[clamp(28px,5vw,64px)] max-lg:grid-cols-1 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <span className="eyebrow">{presence.eyebrow}</span>
          <h2 className="max-w-[17ch] text-balance text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em] text-ink">
            {presence.heading}
          </h2>
        </div>
        <p className="lead">{presence.lead}</p>
      </Reveal>

      <Reveal className="grid items-center gap-[clamp(28px,4vw,56px)] border-b border-ink/10 pb-[clamp(34px,4vw,54px)] max-lg:grid-cols-1 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
          <OrbitDotGlobe
            oceanColor="#121e5e"
            landColor="#ffffff"
            dotSize={1.8}
            dotDensity={3}
            autoRotate={true}
            activeLocationIndex={activeRegion}
            onLocationSelect={(index) => {
              setSelectedRegion((prev) => (prev === index ? null : index))
            }}
            locations={globeLocations}
            className="w-full h-full"
          />
        </div>

        <ul className="list-none" onMouseLeave={() => setHoveredRegion(null)}>
          {regions.map((region, index) => {
            const isCurrent = activeRegion === index
            const isSelected = selectedRegion === index
            return (
              <li
                key={region.name}
                onMouseEnter={() => setHoveredRegion(index)}
                onClick={() =>
                  setSelectedRegion((prev) => (prev === index ? null : index))
                }
                className={cn(
                  "group flex flex-col gap-1 border-b border-ink/10 py-3.5 transition-all duration-250 ease-expo last:border-b-0 cursor-pointer select-none",
                  activeRegion !== null && !isCurrent && "opacity-35",
                  isSelected && "bg-ink/4 -mx-3 px-3 rounded-xl border-transparent"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <i
                    className={cn(
                      "size-1.5 flex-none rounded-full bg-ink/30 transition-[opacity,transform,background-color] duration-250 ease-expo",
                      isCurrent && "scale-150 opacity-100 bg-blue"
                    )}
                  />
                  <b className="flex-1 text-[16px] font-medium tracking-[-0.01em] text-ink">
                    {region.name}
                  </b>
                  <span className="text-xs text-grey group-hover:text-ink transition-colors font-mono">
                    {region.coordinates}
                  </span>
                </div>
                {region.markets && (
                  <span className="pl-5 text-xs text-grey">
                    {region.markets}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </Reveal>

      <Reveal
        stagger
        className="grid grid-cols-4 gap-6 border-b border-ink/10 py-[clamp(34px,4vw,54px)] text-left max-lg:grid-cols-2 max-lg:gap-x-6 max-lg:gap-y-10 max-lg:text-center"
      >
        {presence.stats.map((stat) => (
          <div key={stat.label}>
            <CountUp to={stat.to} suffix={stat.suffix} />
            <span className="mt-3 block text-xs tracking-[0.14em] text-grey uppercase">
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
