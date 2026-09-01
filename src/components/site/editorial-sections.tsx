import Image from "next/image"

import { ArrowButton, ChainGlyph } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import {
  brands,
  customers,
  images,
  projects,
  strengths,
  technicalSupport,
  whyCatenate,
  type Blurb,
} from "@/data/catenate"
import { cn } from "@/lib/utils"

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

export function StatementSection() {
  return (
    <section className="section bg-white">
      <Reveal className="flex flex-col items-center text-center">
        <span className="eyebrow">What we do</span>
        <h2 className="mb-5.5 max-w-[16ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          One chain, from global brand to your doorstep.
        </h2>
        <p className="lead mx-auto mb-8">
          Manufacturers make chemistry. Projects need systems. Catenate sits between
          the two, carrying the range, the technical judgement and the stock depth
          that turn a product list into a specification a contractor can build to.
        </p>
        <ArrowButton href="#brands">Explore the portfolio</ArrowButton>
      </Reveal>
    </section>
  )
}

export function PartnersStrip() {
  return (
    <section className="content-pad bg-off py-13">
      <Reveal className="flex flex-wrap items-center justify-center gap-[clamp(14px,2.4vw,34px)]">
        {brands.map((brand, index) => (
          <div key={brand.name} className="contents">
            {index > 0 && <ChainGlyph className="text-grey" />}
            <div className="text-center opacity-55 grayscale transition-[filter,opacity] duration-250 ease-expo hover:opacity-100 hover:grayscale-0">
              <b
                className={cn(
                  "block text-[clamp(19px,2.2vw,26px)] leading-[1.2] font-semibold tracking-[-0.02em]",
                  brand.wordmarkClass
                )}
              >
                {brand.name}
              </b>
              <i className="mt-1.5 block text-[10px] tracking-[0.14em] not-italic text-grey uppercase">
                Authorised distributor
              </i>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
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
    <section id="customers" className="section on-blue bg-blue text-white">
      <Reveal className="mb-8.5">
        <span className="eyebrow">Trusted by</span>
        <h2 className="max-w-[24ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          Specified by name, not by default.
        </h2>
      </Reveal>

      <Reveal stagger className="grid grid-cols-[repeat(auto-fill,minmax(214px,1fr))] gap-3">
        {customers.map((customer) => (
          <div
            key={customer.name}
            className="flex min-h-[150px] flex-col rounded-2xl p-5.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] transition-[background-color,color,box-shadow] duration-300 ease-expo hover:bg-white hover:text-blue hover:shadow-none"
          >
            <span className="mb-auto text-xs tracking-[0.1em] opacity-60">
              {customer.sector}
            </span>
            <span className="mt-3.5 text-[17px] leading-[1.3] font-medium">
              {customer.name}
            </span>
          </div>
        ))}
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
