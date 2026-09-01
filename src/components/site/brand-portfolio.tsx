import { PanelColumns, RowAccordion } from "@/components/site/row-accordion"
import { Reveal } from "@/components/site/reveal"
import { brands } from "@/data/catenate"

export function BrandPortfolio() {
  const rows = brands.map((brand) => ({
    id: brand.name,
    name: brand.name,
    description: brand.description,
    meta: brand.familyCount,
    content: <PanelColumns groups={brand.groups} />,
  }))

  return (
    <section id="brands" className="section bg-white">
      <Reveal className="mb-8.5">
        <span className="eyebrow">Brands and products</span>
        <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          Five principals. Twenty-eight product families.
        </h2>
      </Reveal>

      <Reveal>
        <RowAccordion rows={rows} />
      </Reveal>
    </section>
  )
}
