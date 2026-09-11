"use client"

import Image from "next/image"
import * as React from "react"

import { RowAccordion } from "@/components/site/row-accordion"
import { Reveal } from "@/components/site/reveal"
import { images, technologies } from "@/data/catenate"
import { cn } from "@/lib/utils"

/**
 * The quick index: every chemistry's working data behind one disclosure row.
 *
 * Running the pointer down the list cross-fades the photograph behind it, so
 * the rows are read against the thing they describe rather than a flat panel.
 */
export function TechnologiesSection() {
  const [hovered, setHovered] = React.useState<string | null>(null)

  const rows = technologies.map((tech) => ({
    id: tech.slug,
    name: tech.name,
    meta: tech.family,
    content: (
      <>
        <p className="lead mb-1">{tech.description}</p>

        <div className="mt-4.5 rounded-2xl bg-white/6 px-6.5 py-6 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
          <dl className="grid grid-cols-2 gap-x-8.5 gap-y-0.5 max-md:grid-cols-1">
            {tech.spec.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-white/10 py-2.25"
              >
                <dt className="text-[13.5px] text-white/55">{label}</dt>
                <dd className="tnum text-right text-[13.5px] font-normal">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {tech.uses.map((use) => (
            <li
              key={use}
              className="rounded-full px-3.5 py-1.5 text-[12.5px] text-white/70 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)]"
            >
              {use}
            </li>
          ))}
        </ul>
      </>
    ),
  }))

  return (
    <section
      id="technologies"
      className="section on-blue relative isolate scroll-mt-nav overflow-clip bg-[#0d1018] text-white"
    >
      {/* Backdrop. Every picture is mounted and cross-faded on opacity alone,
          so moving down the list costs a composite rather than a fetch. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {technologies.map((tech) => (
          <Image
            key={tech.slug}
            src={images.technology(tech.slug).panel}
            alt=""
            fill
            sizes="100vw"
            className={cn(
              "object-cover transition-[opacity,scale] duration-[1100ms] ease-expo",
              hovered === tech.slug ? "scale-100 opacity-30" : "scale-105 opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d1018_0%,rgb(13_16_24/0.72)_52%,rgb(13_16_24/0.45)_100%)]" />
      </div>

      <div className="relative z-1">
        <Reveal>
          <RowAccordion rows={rows} onRowHover={setHovered} />
        </Reveal>
      </div>
    </section>
  )
}
