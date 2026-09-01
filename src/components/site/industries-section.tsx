"use client"

import * as React from "react"
import Image from "next/image"

import { PanelColumns, RowAccordion } from "@/components/site/row-accordion"
import { Reveal } from "@/components/site/reveal"
import { images, industries } from "@/data/catenate"
import { cn } from "@/lib/utils"

export function IndustriesSection() {
  const [hovered, setHovered] = React.useState<string | null>(null)

  const rows = industries.map((industry) => ({
    id: industry.name,
    name: industry.name,
    description: industry.challenge,
    content: (
      <PanelColumns
        groups={[
          { title: "Typical challenge", items: [industry.challenge] },
          { title: "Systems that answer it", items: industry.systems },
          { title: "Reference project", items: [industry.reference] },
        ]}
      />
    ),
  }))

  return (
    <section id="industries" className="section relative bg-off">
      {/* Sector imagery fades in behind the list as each row is hovered. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {industries.map((industry, index) => (
          <Image
            key={industry.name}
            src={images.industry(index)}
            alt=""
            fill
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-400 ease-expo",
              hovered === industry.name ? "opacity-12" : "opacity-0"
            )}
          />
        ))}
      </div>

      <div className="relative grid items-start gap-[clamp(32px,5vw,72px)] max-lg:grid-cols-1 lg:grid-cols-[0.85fr_1.4fr]">
        <Reveal className="sticky top-30 max-lg:static">
          <span className="eyebrow">Industries we serve</span>
          <h2 className="mb-5 text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
            The sector decides the specification.
          </h2>
          <p className="lead">
            The same bond line behaves differently under a food plant washdown, a
            harbour tide and a warehouse forklift. Sector context sets the chemistry,
            the cure window and the approval the system has to carry.
          </p>
        </Reveal>

        <Reveal>
          <RowAccordion rows={rows} onRowHover={setHovered} />
        </Reveal>
      </div>
    </section>
  )
}
