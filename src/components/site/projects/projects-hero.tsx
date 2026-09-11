import * as React from "react"
import { Reveal } from "@/components/site/reveal"

const METRICS = [
  { value: "500+", label: "Projects Specified" },
  { value: "38", label: "Markets Served" },
  { value: "14", label: "Industrial Sectors" },
  { value: "100%", label: "Tested Adherence" },
]

export function ProjectsHero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-off pt-[clamp(44px,6vw,80px)] pb-[clamp(36px,5vw,64px)] text-ink">
      <div className="content-pad flex flex-col">
        <Reveal>
          <span className="eyebrow mb-3 block">Projects & References</span>
          <h1 className="max-w-[22ch] text-[clamp(2.3rem,4.8vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink">
            Engineering integrity on landmark developments.
          </h1>
          <p className="lead mt-4 max-w-[56ch] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-grey">
            From marine berths and district cooling infrastructure to hygienic food processing halls and high-spec cleanrooms, explore our portfolio of specified projects across global markets.
          </p>
        </Reveal>

        {/* Key Metrics Strip */}
        <Reveal
          stagger
          className="mt-[clamp(32px,4vw,48px)] grid grid-cols-2 gap-4 border-t border-ink/10 pt-8 sm:grid-cols-4 sm:gap-6"
        >
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="tnum text-[clamp(1.8rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-ink">
                {metric.value}
              </span>
              <span className="mt-1 block text-[11px] font-mono tracking-[0.14em] text-grey uppercase">
                {metric.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
