import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { projectBySlug, projects } from "@/data/catenate"

type CaseStudyProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params
  const project = projectBySlug(slug)

  if (!project) return { title: "Case study — Catenate" }

  return {
    title: `${project.name} — Catenate`,
    description: project.challenge ?? project.scope,
  }
}

/** Label/value pair in the meta row under the title. */
function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] leading-none tracking-[0.06em] text-grey">
        {label}
      </span>
      <span className="text-[12px] leading-snug text-ink">{children}</span>
    </div>
  )
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params
  const project = projectBySlug(slug)

  if (!project) notFound()

  const index = projects.findIndex((entry) => entry.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  const specs = [
    { label: "Scope of work", value: project.scope },
    { label: "Specified system", value: project.system },
    { label: "Technical challenge", value: project.challenge },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec.value))

  return (
    <>
      <SiteHeader />

      <main className="pt-nav bg-white text-ink">
        {/*
         * Editorial case-study column: the imagery runs the full column width
         * while the writing sits in its right half, so the page reads as one
         * measure rather than as a centred block of text.
         */}
        <article className="content-pad pt-[clamp(36px,5vw,72px)] pb-[clamp(64px,8vw,120px)]">
          <div className="grid grid-cols-1 gap-x-[clamp(32px,5vw,80px)] md:grid-cols-2">
            <Reveal className="md:col-start-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[12px] text-grey transition-colors hover:text-ink"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-3 fill-none stroke-current stroke-[2]"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                All case studies
              </Link>

              <h1 className="mt-6 text-[clamp(2.2rem,3.4vw,3.1rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink">
                {project.name}
              </h1>

              <div className="mt-7 flex flex-wrap gap-x-10 gap-y-5">
                {project.year ? <Meta label="Year">{project.year}</Meta> : null}
                {project.role ? <Meta label="Role">{project.role}</Meta> : null}
                {project.type ? <Meta label="Type">{project.type}</Meta> : null}
                {project.location ? (
                  <Meta label="Location">{project.location}</Meta>
                ) : null}
                {project.link ? (
                  <Meta label="Link">
                    <Link
                      href={project.link.href}
                      className="underline underline-offset-[3px] decoration-ink/40 transition-colors hover:decoration-ink"
                    >
                      {project.link.label}
                    </Link>
                  </Meta>
                ) : null}
              </div>
            </Reveal>

            {project.image ? (
              <Reveal className="mt-[clamp(32px,4vw,56px)] md:col-span-2">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-none bg-[#e6e7ec]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    priority
                    sizes="(max-width: 1520px) 100vw, 1520px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ) : null}

            {project.story?.length ? (
              <Reveal className="mt-[clamp(40px,5.5vw,88px)] flex flex-col gap-[1.15em] md:col-start-2">
                {project.story.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[clamp(16px,1.15vw,19px)] leading-[1.6] text-ink/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ) : null}

            {project.stats?.length ? (
              <Reveal
                stagger
                className="mt-[clamp(40px,5vw,72px)] grid grid-cols-3 gap-8 border-t border-ink/10 pt-9 md:col-start-2"
              >
                {project.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="tnum text-[clamp(1.4rem,2.2vw,2rem)] leading-none font-light tracking-[-0.02em] text-ink">
                      {stat.value}
                    </span>
                    <span className="mt-2.5 text-[12px] leading-snug text-grey">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </Reveal>
            ) : null}

            {project.gallery?.length ? (
              <Reveal className="mt-[clamp(40px,5.5vw,88px)] flex flex-col gap-[clamp(16px,2vw,28px)] md:col-span-2">
                {project.gallery.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-16/9 w-full overflow-hidden rounded-none bg-[#e6e7ec]"
                  >
                    <Image
                      src={src}
                      alt={`${project.name} — site photography`}
                      fill
                      sizes="(max-width: 1520px) 100vw, 1520px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </Reveal>
            ) : null}

            {specs.length ? (
              <Reveal className="mt-[clamp(40px,5.5vw,88px)] flex flex-col gap-6 border-t border-ink/10 pt-9 md:col-start-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1">
                    <span className="text-[11px] tracking-[0.06em] text-grey">
                      {spec.label}
                    </span>
                    <p className="text-[clamp(15px,1.05vw,17px)] leading-[1.6] text-ink/80">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </Reveal>
            ) : null}

            <Reveal className="mt-[clamp(40px,5.5vw,80px)] md:col-start-2">
              <ArrowButton href="/#contact" variant="brand" size="pill">
                Request specification pack
              </ArrowButton>
            </Reveal>

            {/* Next case study */}
            <Reveal className="mt-[clamp(48px,6vw,88px)] border-t border-ink/10 pt-7 md:col-span-2">
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center justify-between gap-6"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.06em] text-grey">
                    Next case study
                  </span>
                  <span className="text-[clamp(1.1rem,2vw,1.4rem)] font-medium tracking-[-0.02em] text-ink">
                    {next.name}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.18)] transition-transform duration-250 ease-expo group-hover:translate-x-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[15px] fill-none stroke-current stroke-[1.8]"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
