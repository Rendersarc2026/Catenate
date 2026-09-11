"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { projects, type Project } from "@/data/catenate"
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
  const [activeProject, setActiveProject] = React.useState<Project | null>(null)

  const filteredProjects = React.useMemo(() => {
    if (selectedSector === "All") return projects
    return projects.filter(
      (p) => p.sector.toLowerCase() === selectedSector.toLowerCase()
    )
  }, [selectedSector])

  return (
    <section className="section bg-white text-ink">
      <div className="content-pad flex flex-col gap-10">
        {/* Sector Filter Bar */}
        <Reveal className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-6">
          {SECTORS.map((sector) => {
            const isSelected = selectedSector === sector
            const count =
              sector === "All"
                ? projects.length
                : projects.filter(
                    (p) => p.sector.toLowerCase() === sector.toLowerCase()
                  ).length

            if (sector !== "All" && count === 0) return null

            return (
              <button
                key={sector}
                type="button"
                onClick={() => setSelectedSector(sector)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-[0.04em] transition-all duration-200 ease-expo cursor-pointer",
                  isSelected
                    ? "bg-blue text-white shadow-sm"
                    : "bg-off text-ink/70 hover:bg-ink/5 hover:text-ink"
                )}
              >
                <span>{sector}</span>
                <span
                  className={cn(
                    "tnum size-4.5 rounded-full grid place-items-center text-[10px] font-mono",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-ink/10 text-grey"
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </Reveal>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-off transition-all duration-300 hover:border-ink/20 hover:shadow-lg"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
                  {project.sector}
                </span>
                {project.location ? (
                  <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90 drop-shadow-sm flex items-center gap-1.5">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3.5 fill-none stroke-current stroke-2"
                      aria-hidden="true"
                    >
                      <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                  </span>
                ) : null}
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.015em] text-ink group-hover:text-blue transition-colors">
                    {project.name}
                  </h3>

                  <div className="mt-3.5 space-y-2.5 text-xs">
                    <div>
                      <span className="font-mono text-grey uppercase tracking-wider block text-[10px]">
                        Scope of work
                      </span>
                      <p className="mt-0.5 text-sm text-ink/85 leading-snug">
                        {project.scope}
                      </p>
                    </div>

                    {project.system ? (
                      <div>
                        <span className="font-mono text-grey uppercase tracking-wider block text-[10px]">
                          Specified system
                        </span>
                        <p className="mt-0.5 text-xs text-ink/75 leading-relaxed">
                          {project.system}
                        </p>
                      </div>
                    ) : null}

                    {project.challenge ? (
                      <div className="rounded-lg bg-white p-3 border border-ink/6">
                        <span className="font-mono text-grey uppercase tracking-wider block text-[10px]">
                          Technical challenge
                        </span>
                        <p className="mt-0.5 text-xs text-ink/70 leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-medium text-blue hover:underline cursor-pointer"
                  >
                    View specification details
                  </button>

                  <ArrowButton
                    href="/#contact"
                    size="pill-sm"
                    variant="ghost"
                    className="text-xs"
                  >
                    Enquire
                  </ArrowButton>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeProject ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          >
            <div
              className="relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 text-ink shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close dialog"
                className="absolute top-4 right-4 grid size-8 place-items-center rounded-full text-grey hover:bg-ink/5 hover:text-ink"
              >
                ✕
              </button>

              <span className="text-[11px] font-mono uppercase tracking-wider text-blue">
                {activeProject.sector}
              </span>
              <h3
                id="project-dialog-title"
                className="mt-1 text-2xl font-medium tracking-tight text-ink"
              >
                {activeProject.name}
              </h3>
              {activeProject.location ? (
                <p className="mt-1 text-xs text-grey">
                  📍 {activeProject.location}
                </p>
              ) : null}

              <div className="mt-6 space-y-4 text-sm border-t border-ink/10 pt-4">
                <div>
                  <h4 className="font-mono text-xs text-grey uppercase tracking-wider">
                    Specification Scope
                  </h4>
                  <p className="mt-1 text-ink">{activeProject.scope}</p>
                </div>
                {activeProject.system ? (
                  <div>
                    <h4 className="font-mono text-xs text-grey uppercase tracking-wider">
                      Approved Chemistry & System
                    </h4>
                    <p className="mt-1 text-ink">{activeProject.system}</p>
                  </div>
                ) : null}
                {activeProject.challenge ? (
                  <div className="rounded-xl bg-off p-4 border border-ink/8">
                    <h4 className="font-mono text-xs text-grey uppercase tracking-wider">
                      Technical Performance Demands
                    </h4>
                    <p className="mt-1 text-ink/80 text-xs leading-relaxed">
                      {activeProject.challenge}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-full px-4 py-2 text-xs font-medium text-grey hover:bg-ink/5"
                >
                  Close
                </button>
                <Link
                  href="/#contact"
                  className="rounded-full bg-blue px-5 py-2 text-xs font-medium text-white hover:bg-blue/90"
                  onClick={() => setActiveProject(null)}
                >
                  Request Specification Pack
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
