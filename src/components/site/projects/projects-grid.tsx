/*
 * A server component on purpose. Nothing here is interactive — `Reveal` is the
 * only client piece and it brings its own boundary — and leaving it on the
 * client meant the whole `projects` array, case-study prose included, was
 * bundled and shipped so the browser could render markup the server had
 * already rendered.
 */

import Image from "next/image"
import Link from "next/link"

import { Reveal } from "@/components/site/reveal"
import { projects } from "@/data/catenate"

export function ProjectsGrid() {
  return (
    <section className="section bg-white text-ink">
      <div className="flex flex-col gap-[clamp(28px,3.5vw,44px)]">
        <Reveal>
          <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-ink">
            Case studies
          </h2>
        </Reveal>

        <Reveal
          stagger
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block focus-visible:outline-none"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-[#e6e7ec] transition-[box-shadow] duration-300 ease-expo group-hover:shadow-[0_18px_40px_-22px_rgb(26_29_46/0.45)] group-focus-visible:ring-2 group-focus-visible:ring-ink group-focus-visible:ring-offset-2">
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
