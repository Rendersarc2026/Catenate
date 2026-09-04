import Image from "next/image"
import type { CSSProperties } from "react"

import { Reveal } from "@/components/site/reveal"
import {
  customers,
  images,
  projects,
  strengths,
  technicalSupport,
  whyCatenate,
  type Blurb,
} from "@/data/catenate"

/** Two-column list of short titled paragraphs, hairline-separated. */
function BlurbGrid({ items }: { items: Blurb[] }) {
  return (
    <Reveal stagger className="grid grid-cols-2 gap-x-[clamp(32px,5vw,64px)] max-md:grid-cols-1">
      {items.map((item) => (
        <div key={item.title} className="border-b border-ink/10 py-5.5">
          <h3 className="mb-1 text-[17px] leading-[1.3] font-medium">{item.title}</h3>
          <p className="text-[14.5px] text-grey">{item.body}</p>
        </div>
      ))}
    </Reveal>
  )
}

export function StrengthsSection() {
  return (
    <section id="strengths" className="section bg-white">
      <Reveal className="mb-8.5">
        <span className="eyebrow">Our strengths</span>
        <h2 className="max-w-[20ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          Eight reasons the chain holds.
        </h2>
      </Reveal>
      <BlurbGrid items={strengths} />
    </section>
  )
}

export function TrustedBySection() {
  return (
    <section id="customers" className="section bg-off">
      <Reveal className="mb-[clamp(28px,4vw,52px)] text-center">
        <span className="eyebrow">Trusted by</span>
      </Reveal>

      {/*
       * Hairlines run between logo rows only; the first row of each
       * breakpoint drops its rule. Column counts only ever grow with the
       * viewport, so the exemptions stack rather than fight each other.
       */}
      <Reveal
        stagger
        step={60}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 [&>*:nth-child(-n+2)]:border-t-0 sm:[&>*:nth-child(3)]:border-t-0 lg:[&>*:nth-child(4)]:border-t-0 lg:[&>*:nth-child(5)]:border-t-0"
      >
        {customers.map((customer) => (
          <div
            key={customer.name}
            title={`${customer.name} — ${customer.sector}`}
            className="flex items-center justify-center border-t border-ink/10 px-3 py-[clamp(22px,2.6vw,34px)]"
          >
            <span
              style={{ "--logo-scale": customer.logoScale ?? 1 } as CSSProperties}
              className="relative block h-[calc(clamp(28px,3vw,38px)*var(--logo-scale))] w-full max-w-[calc(clamp(104px,12vw,150px)*var(--logo-scale))] opacity-90 transition-opacity duration-300 ease-expo hover:opacity-100"
            >
              <Image
                src={customer.logo}
                alt={`${customer.name} logo`}
                fill
                sizes="150px"
                className="object-contain"
              />
            </span>
          </div>
        ))}

        {/*
         * Ten logos leave the three-column row short; these carry its rule
         * across the full width without adding a row at the other counts.
         */}
        <div aria-hidden className="hidden border-t border-ink/10 sm:block lg:hidden" />
        <div aria-hidden className="hidden border-t border-ink/10 sm:block lg:hidden" />
      </Reveal>
    </section>
  )
}

export function WhyCatenate() {
  return (
    <div className="content-pad bg-white py-6">
      <Reveal className="rounded-block bg-[linear-gradient(135deg,var(--brand-blue)_0%,var(--brand-blue-deep)_100%)] px-[clamp(28px,4.5vw,64px)] py-[clamp(44px,5.5vw,76px)] text-white">
        <div className="on-blue grid items-start gap-[clamp(32px,5vw,72px)] max-lg:grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <span className="eyebrow">Why Catenate</span>
            <h2 className="text-balance text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
              Specification is the product. Everything else is logistics.
            </h2>
          </div>

          <ul className="list-none">
            {whyCatenate.map((item, index) => (
              <li
                key={item.title}
                className="flex gap-5 border-t border-white/14 py-5 first:border-t-0 first:pt-0"
              >
                <span className="tnum grid size-8 flex-none place-items-center rounded-full border border-white/20 text-[13px] font-medium">
                  {index + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-[17px] leading-[1.3] font-medium">
                    {item.title}
                  </h3>
                  <p className="max-w-[46ch] text-[15px] text-white/66">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  )
}

export function ProjectsRail() {
  return (
    <section id="projects" className="section section-flush bg-off">
      <Reveal className="content-pad pb-8.5">
        <span className="eyebrow">Projects</span>
        <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          Where the chain held.
        </h2>
      </Reveal>

      <div className="rail">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="group/proj flex-[0_0_clamp(240px,30vw,330px)] snap-start"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-block bg-[#dfe3ef]">
              <Image
                src={images.project(index)}
                alt=""
                fill
                sizes="(max-width: 768px) 60vw, 330px"
                className="object-cover transition-transform duration-800 ease-expo group-hover/proj:scale-105"
              />
            </div>
            <h3 className="mt-4 text-[17px] leading-[1.3] font-medium">{project.name}</h3>
            <span className="mt-1.5 block text-[11px] tracking-[0.14em] text-grey uppercase">
              {project.sector}
            </span>
            <em className="mt-2 block text-[13.5px] not-italic text-grey">
              {project.scope}
            </em>
          </article>
        ))}
      </div>
    </section>
  )
}

export function TechnicalSupport() {
  return (
    <section className="section bg-white">
      <Reveal className="mb-5.5">
        <span className="eyebrow">Technical support</span>
        <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          What comes with the delivery.
        </h2>
      </Reveal>
      <BlurbGrid items={technicalSupport} />
    </section>
  )
}
