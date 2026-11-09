import Image from "next/image";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/site/reveal";
import { TechnicalSupportAccordion } from "@/components/site/technical-support-accordion";
import { customers, technicalSupport } from "@/data/catenate";

export { StrengthsSection } from "./strengths-section";

type Customer = (typeof customers)[number];

function CustomerLogo({ customer }: { customer: Customer }) {
  return (
    <div
      title={`${customer.name} — ${customer.sector}`}
      className="flex w-[clamp(150px,15vw,230px)] shrink-0 items-center justify-center px-[clamp(16px,2vw,32px)] py-[clamp(22px,2.6vw,34px)]"
    >
      {customer.logo ? (
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
      ) : (
        <span className="text-[clamp(15px,1.5vw,20px)] font-semibold whitespace-nowrap text-ink/80">
          {customer.name}
        </span>
      )}
    </div>
  );
}

/*
 * One endless row of logos. The set is rendered four times so a short row
 * still spans wide screens; the track slides by half its width (two sets) and
 * loops without a seam. Copies are hidden from screen readers so each customer
 * is announced once.
 */
const COPIES = 4;

function LogoRow({
  items,
  direction,
}: {
  items: Customer[];
  direction: "left" | "right";
}) {
  return (
    <div className="logo-marquee overflow-hidden">
      <div
        className="logo-marquee-track"
        data-direction={direction}
        style={{ "--marquee-duration": `${items.length * 4.5 * (COPIES / 2)}s` } as CSSProperties}
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((customer) => (
              <CustomerLogo key={customer.name} customer={customer} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustedBySection() {
  /* Three rows alternating direction; earlier rows take the extra logos. */
  const ROW_COUNT = 3;
  const perRow = Math.ceil(customers.length / ROW_COUNT);
  const rows = Array.from({ length: ROW_COUNT }, (_, i) =>
    customers.slice(i * perRow, (i + 1) * perRow),
  );

  return (
    <section id="customers" className="section bg-white">
      <Reveal className="mb-[clamp(28px,4vw,52px)] text-center">
        <h2 className="eyebrow text-[22px] font-medium text-black opacity-100">
          Trusted by
        </h2>
      </Reveal>

      <Reveal>
        {rows.map((row, i) => (
          <div key={i} className={i > 0 ? "border-t border-ink/10" : undefined}>
            <LogoRow items={row} direction={i % 2 === 0 ? "left" : "right"} />
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
