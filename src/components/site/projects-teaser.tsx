import Image from "next/image"
import Link from "next/link"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { projects } from "@/data/catenate"

export function ProjectsTeaser() {
  const previewProjects = projects.slice(0, 3)

  return (
    <section
      id="projects-teaser"
      className="section bg-off text-ink border-b border-ink/10 overflow-hidden"
    >
      <div className="flex flex-col gap-10 sm:gap-14">
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
            <ArrowButton href="/projects" variant="brand" size="pill">
              Explore project portfolio
            </ArrowButton>
          </Reveal>
        </div>

        {/* Case-study cards — image, name, delivery type */}
        <Reveal
          stagger
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {previewProjects.map((project) => (
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
