import Image from "next/image";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/site/reveal";
import {
  customers,
  images,
  projects,
  technicalSupport,
  type Blurb,
} from "@/data/catenate";

/** Two-column list of short titled paragraphs, hairline-separated. */
function BlurbGrid({ items }: { items: Blurb[] }) {
  return (
    <Reveal
      stagger
      className="grid grid-cols-2 gap-x-[clamp(32px,5vw,64px)] max-md:grid-cols-1"
    >
      {items.map((item) => (
        <div key={item.title} className="border-b border-ink/10 py-5.5">
          <h3 className="mb-1 text-[17px] leading-[1.3] font-medium">
            {item.title}
          </h3>
          <p className="text-[14.5px] text-grey">{item.body}</p>
        </div>
      ))}
    </Reveal>
  );
}

export { StrengthsSection } from "./strengths-section";

export function TrustedBySection() {
  return (
    <section id="customers" className="section bg-off">
      <Reveal className="mb-[clamp(28px,4vw,52px)] text-center">
        <h2 className="eyebrow text-[22px] font-medium text-black opacity-100">
          Trusted by
        </h2>
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
              style={
                { "--logo-scale": customer.logoScale ?? 1 } as CSSProperties
              }
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
        <div
          aria-hidden
          className="hidden border-t border-ink/10 sm:block lg:hidden"
        />
        <div
          aria-hidden
          className="hidden border-t border-ink/10 sm:block lg:hidden"
        />
      </Reveal>
    </section>
  );
}

export { WhyCatenate } from "./why-catenate-section";

export function ProjectsRail() {
  return (
    <section id="projects" className="section section-flush bg-off">
      <Reveal className="content-pad pb-8.5">
        <span className="eyebrow">Projects</span>
      </Reveal>

      <div className="rail">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="group/proj flex-[0_0_clamp(240px,30vw,330px)] snap-start"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-block bg-[#e6e7ec]">
              <Image
                src={images.project(index)}
                alt=""
                fill
                sizes="(max-width: 768px) 60vw, 330px"
                className="object-cover transition-transform duration-800 ease-expo group-hover/proj:scale-105"
              />
            </div>
            <h3 className="mt-4 text-[17px] leading-[1.3] font-medium">
              {project.name}
            </h3>
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
  );
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
  );
}
