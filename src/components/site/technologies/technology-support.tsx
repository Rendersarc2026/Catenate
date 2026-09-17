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
      {/* On phones the panel widens to a 16px gutter, so the copy inside keeps
          a readable measure. */}
      <div className="group/panel relative isolate -mx-[calc(var(--section-pad)-16px)] overflow-hidden rounded-[20px] bg-[#0d1018] text-white sm:mx-0 sm:rounded-[clamp(20px,2.4vw,32px)]">
        <Image
          src="/images/industries/metals-fabrication.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_20%] opacity-45 transition-[scale,opacity] max-sm:!h-[420px] duration-[1200ms] ease-expo motion-safe:group-hover/panel:scale-[1.04] motion-safe:group-hover/panel:opacity-55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(13_16_24/0.55)_0px,rgb(13_16_24/0.85)_240px,#0d1018_420px)] sm:bg-[linear-gradient(to_right,rgb(13_16_24/0.94)_0%,rgb(13_16_24/0.78)_48%,rgb(13_16_24/0.5)_100%)]"
        />

        <div className="relative z-1 px-[clamp(22px,4vw,64px)] py-[clamp(40px,5vw,76px)]">
          <Reveal className="max-w-[46ch]">
            <span className="eyebrow text-white/70">Technical support</span>
            <h2 className="text-[clamp(1.7rem,2.9vw,2.4rem)] leading-[1.2] font-light tracking-[-0.02em]">
              What comes with the delivery.
            </h2>
          </Reveal>

          {/* Stacked, each item sets its number in a gutter beside the copy so
              the list reads as one column of rows rather than loose blocks. */}
          <div className="mt-[clamp(28px,4vw,52px)] grid gap-x-9 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4">
            {technicalSupport.map((item, index) => (
              <Reveal
                key={item.title}
                className="grid grid-cols-[32px_minmax(0,1fr)] border-t border-white/20 py-5 sm:block sm:pt-5 sm:pb-0"
              >
                <span className="tnum pt-[3px] text-[11px] tracking-[0.14em] text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[16px] leading-[1.3] font-normal sm:mt-2.5 sm:text-[17px]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-[1.6] text-white/68 sm:mt-2 sm:text-[14.5px]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-[clamp(24px,4vw,52px)] flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <ArrowButton href="/#contact" variant="line" className="justify-between max-sm:w-full">
              Request a specification
            </ArrowButton>
            <ArrowButton href="/solutions-finder" variant="line" className="justify-between max-sm:w-full">
              Solutions Finder
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
