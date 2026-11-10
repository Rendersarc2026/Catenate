import { Reveal } from "@/components/site/reveal"
import { TechnicalSupportAccordion } from "@/components/site/technical-support-accordion"
import { technicalSupport } from "@/data/catenate"

/**
 * Closing band: what comes with the chemistry. The heading is a disclosure
 * that opens the list of services, each of which opens its own scope note.
 */
export function TechnologySupport() {
  return (
    <section className="section border-t border-ink/10 bg-white text-ink">
      <Reveal>
        <span className="eyebrow">Technical support</span>
        <TechnicalSupportAccordion items={technicalSupport} />
      </Reveal>
    </section>
  )
}
