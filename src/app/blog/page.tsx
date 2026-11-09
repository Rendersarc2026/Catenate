import type { Metadata } from "next"

import { PostCard } from "@/components/site/blog/post-card"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { blogPosts } from "@/data/catenate"

export const metadata: Metadata = {
  title: "Blog — Catenate",
  description:
    "Technical notes, specification guidance and supply insights from the Catenate team.",
}

export default function BlogPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-nav bg-white text-ink">
        <section className="section">
          <Reveal className="mb-[clamp(36px,5vw,72px)] max-w-[56ch]">
            <span className="eyebrow">Blog</span>
            <h1 className="text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.05] font-medium tracking-[-0.03em]">
              Insights from the field
            </h1>
            <p className="mt-4 text-[clamp(15px,1.1vw,17px)] leading-[1.6] text-ink/70">
              Technical notes, specification guidance and supply insights from
              the people who put these systems to work.
            </p>
          </Reveal>

          <Reveal
            stagger
            step={80}
            className="grid gap-x-[clamp(20px,2.4vw,36px)] gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
