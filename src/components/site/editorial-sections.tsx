import Image from "next/image";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/site/reveal";
import { TechnicalSupportAccordion } from "@/components/site/technical-support-accordion";
import { customers, technicalSupport } from "@/data/catenate";

export { StrengthsSection } from "./strengths-section";

export function TrustedBySection() {
  return (
    <section id="customers" className="section bg-white">
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

/*
 * `ProjectsRail` is deliberately not re-exported here. This barrel is imported
 * by the home page, and re-exporting a client component pulled the rail, the
 * card it renders and the whole `projects` array — case-study prose and all —
 * into the home page's bundle for a section no page actually renders. Import it
 * from "./projects-rail" directly when something needs it.
 */

export function TechnicalSupport() {
  return (
    <section className="section scroll-round-bottom relative z-10 overflow-clip border-t border-ink/10 bg-white">
      <Reveal>
        <span className="eyebrow">Technical support</span>
        <TechnicalSupportAccordion items={technicalSupport} />
      </Reveal>

      {/* Drives the bottom-radius view timeline; see .scroll-round-bottom. */}
      <span aria-hidden className="scroll-round-sentinel" />
    </section>
  );
}
