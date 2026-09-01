import { RowAccordion } from "@/components/site/row-accordion"
import { Reveal } from "@/components/site/reveal"
import { technologies } from "@/data/catenate"

export function TechnologiesSection() {
  const rows = technologies.map((tech) => ({
    id: tech.name,
    name: tech.name,
    content: (
      <>
        <p className="lead mb-1">{tech.description}</p>
        <div className="mt-4.5 rounded-2xl bg-off px-6.5 py-6">
          <dl className="grid grid-cols-2 gap-x-8.5 gap-y-0.5 max-md:grid-cols-1">
            {tech.spec.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-ink/7 py-2.25"
              >
                <dt className="text-[13.5px] text-grey">{label}</dt>
                <dd className="tnum text-right text-[13.5px] font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </>
    ),
  }))

  return (
    <section id="technologies" className="section bg-white">
      <Reveal className="mb-8.5">
        <span className="eyebrow">Technologies</span>
        <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          Four chemistries, four sets of rules.
        </h2>
      </Reveal>

      <Reveal>
        <RowAccordion rows={rows} />
      </Reveal>
    </section>
  )
}
