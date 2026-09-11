import type { Metadata } from "next"

import { ArrowButton } from "@/components/site/arrow-button"
import { ProjectsGrid } from "@/components/site/projects/projects-grid"
import { ProjectsHero } from "@/components/site/projects/projects-hero"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export const metadata: Metadata = {
  title: "Projects & References — Catenate",
  description:
    "Explore landmark engineering projects specified with Catenate bonding, sealing, and waterproofing systems across international markets.",
}

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-nav bg-white">
        <ProjectsHero />
        <ProjectsGrid />

        {/* Bottom Technical Specification CTA Banner */}
        <section className="section bg-off border-t border-ink/10 text-ink">
          <div className="content-pad flex flex-col items-center text-center">
            <Reveal className="max-w-2xl flex flex-col items-center">
              <span className="eyebrow mb-2">Technical Engineering Support</span>
              <h2 className="text-[clamp(1.9rem,3.8vw,3rem)] font-medium leading-tight tracking-[-0.025em] text-ink">
                Planning a project with rigorous performance demands?
              </h2>
              <p className="mt-3.5 text-sm sm:text-base text-grey leading-relaxed max-w-[52ch]">
                Our certified technical specialists provide joint site surveys, pull-off adhesion testing, and tailored specification packs for architects, contractors, and consultants.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <ArrowButton href="/#contact" variant="brand" size="pill">
                  Request project specification
                </ArrowButton>
                <ArrowButton href="/technologies" variant="quiet" size="pill">
                  Browse approved chemistries
                </ArrowButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
