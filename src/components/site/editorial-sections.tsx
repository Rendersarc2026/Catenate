import Image from "next/image";
import { Fragment, type CSSProperties } from "react";

import { Reveal } from "@/components/site/reveal";
import { TechnicalSupportAccordion } from "@/components/site/technical-support-accordion";
import { customers, technicalSupport } from "@/data/catenate";

export { StrengthsSection } from "./strengths-section";

export function TrustedBySection() {
  const renderLogo = (customer: (typeof customers)[number]) => (
    <div
      key={customer.name}
      title={`${customer.name} — ${customer.sector}`}
      className="flex items-center justify-center px-3 py-[clamp(22px,2.6vw,34px)]"
    >
      {customer.logo ? (
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
      ) : (
        <span className="text-[clamp(15px,1.5vw,20px)] font-semibold whitespace-nowrap text-ink/80">
          {customer.name}
        </span>
      )}
    </div>
  );

  /*
   * Rows of six balanced cells, with a hairline rule between rows. Any count
   * flows; a short final row is centred, exactly like the old two-row layout.
   */
  const rows: Array<Array<(typeof customers)[number]>> = [];
  for (let i = 0; i < customers.length; i += 6) {
    rows.push(customers.slice(i, i + 6));
  }

  return (
    <section id="customers" className="section bg-white">
      <Reveal className="mb-[clamp(28px,4vw,52px)] text-center">
        <h2 className="eyebrow text-[22px] font-medium text-black opacity-100">
          Trusted by
        </h2>
      </Reveal>

      {/* Desktop view (lg and above): rows of six over full hairline rules */}
      <div className="hidden lg:block">
        {rows.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {rowIndex > 0 && <div className="border-t border-ink/10" />}
            <Reveal stagger step={60} className="flex justify-center items-center">
              {row.map((c) => (
                <div key={c.name} className="w-1/6">
                  {renderLogo(c)}
                </div>
              ))}
            </Reveal>
          </Fragment>
        ))}
      </div>

      {/* Mobile and tablet view (< lg): responsive multi-column grid */}
      <Reveal
        stagger
        step={60}
        className="grid grid-cols-2 sm:grid-cols-3 lg:hidden [&>*:nth-child(-n+2)]:border-t-0 sm:[&>*:nth-child(3)]:border-t-0"
      >
        {customers.map((customer) => (
          <div key={customer.name} className="border-t border-ink/10">
            {renderLogo(customer)}
          </div>
        ))}
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
