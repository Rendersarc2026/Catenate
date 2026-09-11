"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { projects } from "@/data/catenate"

export function ProjectsTeaser() {
  const previewProjects = projects.slice(0, 3)

  return (
    <section id="projects-teaser" className="section bg-off text-ink border-b border-ink/10 overflow-hidden">
      <div className="content-pad flex flex-col gap-10 sm:gap-14">
        {/* Header & Direct CTA Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <span className="eyebrow mb-2.5">Projects & References</span>
            <h2 className="text-[clamp(2.1rem,4.2vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink">
              Engineered solutions for landmark builds.
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-grey max-w-[54ch] leading-relaxed">
              Explore how Catenate specification packages safeguard marine terminals, district cooling pipelines, and cleanroom facilities across our global network.
            </p>
          </Reveal>

          <Reveal className="shrink-0">
            <ArrowButton href="/projects" variant="onBlue" size="pill">
              Explore project portfolio
            </ArrowButton>
          </Reveal>
        </div>

        {/* 3 Interactive Highlight Cards */}
        <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewProjects.map((project) => (
            <Link
              key={project.name}
              href="/projects"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:border-ink/25 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
                  {project.sector}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-lg font-medium text-ink group-hover:text-blue transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-grey line-clamp-2">
                    {project.scope}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/8 flex items-center justify-between text-xs font-medium text-blue">
                  <span>View project details</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
