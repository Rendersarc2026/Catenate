import { Reveal } from "@/components/site/reveal";

/*
 * "Who we are" — the opening statement. A two-column split: the claim sits on
 * the left, the three paragraphs that back it set on the right, so the eye
 * reads the headline first and settles into the detail after.
 */
export function AboutStatement() {
  return (
    <section className="section bg-white text-ink">
      <div className="mx-auto grid max-w-[var(--content-max)] gap-x-[clamp(32px,6vw,96px)] gap-y-10 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <span className="eyebrow text-blue">Who we are</span>
          <h2 className="text-balance text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.08] font-medium tracking-[-0.02em]">
            Connecting global brands to the industries that build.
          </h2>
        </Reveal>

        <Reveal stagger step={120} className="grid gap-5 self-start text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-grey">
          <p>
            Catenate brings together the world&apos;s trusted names in
            adhesives, sealants and construction chemicals, and connects their
            products with the industries that rely on them.
          </p>
          <p>
            Our portfolio is built around world-class brands &mdash; Henkel,
            W&uuml;rth, GE Sealants, Weld-On and Sika. Together they cover
            waterproofing, concrete repair, sealing and glazing, tiling and
            flooring, industrial bonding, pipe joining and fixing.
          </p>
          <p>
            Contractors, developers and manufacturers across Oman, the UAE,
            Qatar and the United Kingdom work with us to find the right system
            for each application, backed by local stock and technical support
            on site.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
