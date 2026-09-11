import * as React from "react"
import { Reveal } from "@/components/site/reveal"

export function ProjectsHero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-white pt-[clamp(44px,6vw,80px)] pb-[clamp(36px,5vw,64px)] text-ink">
      <div className="content-pad flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center text-center">
          <span className="eyebrow mb-3 block">Projects & References</span>
          <h1 className="max-w-[24ch] text-[clamp(2.3rem,4.8vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink">
            Engineering integrity on landmark developments.
          </h1>
          <p className="lead mt-4 max-w-[58ch] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-grey">
            From marine berths and district cooling infrastructure to hygienic food processing halls and high-spec cleanrooms, explore our portfolio of specified projects across global markets.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
