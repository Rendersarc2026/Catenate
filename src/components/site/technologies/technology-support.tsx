import Image from "next/image"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { technicalSupport } from "@/data/catenate"

/**
 * Closing band: what comes with the chemistry. Photography runs behind the
 * whole panel and lifts a touch on hover, so the block reads as one surface.
 */
export function TechnologySupport() {
  return (
    <section className="section bg-white text-ink">
      <div className="group/panel relative isolate overflow-hidden rounded-[clamp(20px,2.4vw,32px)] bg-[#0d1018] text-white">
        <Image
          src="/images/industries/metals-fabrication.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45 transition-[scale,opacity] duration-[1200ms] ease-expo motion-safe:group-hover/panel:scale-[1.04] motion-safe:group-hover/panel:opacity-55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(13_16_24/0.94)_0%,rgb(13_16_24/0.78)_48%,rgb(13_16_24/0.5)_100%)]"
        />

        <div className="relative z-1 px-[clamp(24px,4vw,64px)] py-[clamp(36px,5vw,76px)]">
          <Reveal className="max-w-[46ch]">
            <span className="eyebrow text-white/70">Technical support</span>
            <h2 className="text-[clamp(1.7rem,2.9vw,2.4rem)] leading-[1.2] font-light tracking-[-0.02em]">
              What comes with the delivery.
            </h2>
          </Reveal>

          <div className="mt-[clamp(30px,4vw,52px)] grid gap-x-9 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {technicalSupport.map((item, index) => (
              <Reveal key={item.title} className="border-t border-white/20 pt-5">
                <span className="tnum text-[11px] tracking-[0.14em] text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2.5 text-[17px] leading-[1.3] font-normal">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-white/68">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-[clamp(30px,4vw,52px)] flex flex-wrap gap-3.5">
            <ArrowButton href="/#contact" variant="line">
              Request a specification
            </ArrowButton>
            <ArrowButton href="/solutions-finder" variant="line">
              Solutions Finder
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
