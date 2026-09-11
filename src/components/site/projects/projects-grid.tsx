"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Reveal } from "@/components/site/reveal"
import { projects } from "@/data/catenate"
import { cn } from "@/lib/utils"

const SECTORS = [
  "All",
  "Marine and offshore",
  "Food and beverage",
  "Building and infrastructure",
  "HVAC and plumbing",
  "Healthcare",
  "Metals and fabrication",
] as const

export function ProjectsGrid() {
  const [selectedSector, setSelectedSector] = React.useState<string>("All")

  const filteredProjects = React.useMemo(() => {
    if (selectedSector === "All") return projects
    return projects.filter(
      (p) => p.sector.toLowerCase() === selectedSector.toLowerCase()
    )
  }, [selectedSector])

  return (
    <section className="section bg-white text-ink">
      <div className="flex flex-col gap-[clamp(28px,3.5vw,44px)]">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-ink">
            Case studies
          </h2>

          {/* Sector filter — plain text switches, so the cards carry the page */}
          <div className="-mb-1 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {SECTORS.map((sector) => {
              const count =
                sector === "All"
                  ? projects.length
                  : projects.filter(
                      (p) => p.sector.toLowerCase() === sector.toLowerCase()
                    ).length

              if (sector !== "All" && count === 0) return null

              const isSelected = selectedSector === sector

              return (
                <button
                  key={sector}
                  type="button"
                  onClick={() => setSelectedSector(sector)}
                  aria-pressed={isSelected}
                  className={cn(
                    "cursor-pointer text-[13px] leading-tight transition-colors duration-200 ease-expo",
                    isSelected
                      ? "text-ink underline decoration-ink/30 underline-offset-[5px]"
                      : "text-grey hover:text-ink"
                  )}
                >
                  {sector}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal
          stagger
          key={selectedSector}
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block focus-visible:outline-none"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-none bg-[#e6e7ec] transition-[box-shadow] duration-300 ease-expo group-hover:shadow-[0_18px_40px_-22px_rgb(26_29_46/0.45)] group-focus-visible:ring-2 group-focus-visible:ring-ink group-focus-visible:ring-offset-2">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>

              <h3 className="mt-4.5 text-[15px] leading-snug font-medium tracking-[-0.01em] text-ink">
                {project.name}
              </h3>
              <p className="mt-1 text-[13px] leading-snug text-grey">
                {project.type ?? project.sector}
              </p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
