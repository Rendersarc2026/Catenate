import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { companyUpdates } from "@/data/catenate"

export const metadata: Metadata = {
  title: "Inside Catenate — Catenate",
  description:
    "Company news, events, achievements and partnerships from Catenate Alliances.",
}

/* Every company update, each linking to its own page under /updates. */
export default function UpdatesPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-nav bg-white text-ink">
        <section className="section">
          <Reveal className="mb-[clamp(36px,5vw,72px)] max-w-[56ch]">
            <span className="eyebrow">Our world</span>
            <h1 className="text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.05] font-medium tracking-[-0.03em]">
              Inside Catenate.
            </h1>
            <p className="mt-4 text-[clamp(15px,1.1vw,17px)] leading-[1.6] text-ink/70">
              Company news, events, achievements and partnerships.
            </p>
          </Reveal>

          <Reveal
            stagger
            step={80}
            className="grid gap-x-[clamp(20px,2.4vw,36px)] gap-y-14 sm:grid-cols-2"
          >
            {companyUpdates.map((update) => (
              <article key={update.slug} className="group/update">
                <Link href={`/updates/${update.slug}`} className="block">
                  <div className="relative aspect-16/9 overflow-hidden rounded-[18px] bg-[#e6e7ec]">
                    <Image
                      src={update.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-800 ease-expo group-hover/update:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase backdrop-blur-sm">
                      {update.category}
                    </span>
                  </div>
                  <h2 className="mt-5 text-[clamp(1.25rem,1.8vw,1.7rem)] leading-[1.2] font-medium tracking-[-0.02em] underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover/update:decoration-ink/40">
                    {update.title}
                  </h2>
                  <p className="mt-2.5 max-w-[52ch] text-[15px] leading-[1.6] text-ink/70">
                    {update.summary}
                  </p>
                </Link>
              </article>
            ))}
          </Reveal>

          <Reveal className="mt-[clamp(48px,6vw,88px)] border-t border-ink/10 pt-8">
            <ArrowButton href="/contact" variant="brand" size="pill">
              Get in touch
            </ArrowButton>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
