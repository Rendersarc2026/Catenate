import { ArrowButton } from "@/components/site/arrow-button"
import { PostCard } from "@/components/site/blog/post-card"
import { Reveal } from "@/components/site/reveal"
import { blogPosts } from "@/data/catenate"

/*
 * "Latest blog" — the three newest articles, with a way through to the rest.
 */
export function LatestBlog() {
  return (
    <section id="blog" className="section bg-white">
      <Reveal className="mb-[clamp(28px,4vw,52px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div>
          <span className="eyebrow">Latest blog</span>
          <h2 className="text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.18] font-medium tracking-[-0.015em] text-ink">
            Insights from the field
          </h2>
        </div>
        <ArrowButton href="/blog" variant="quiet" size="pill">
          View all posts
        </ArrowButton>
      </Reveal>

      <Reveal
        stagger
        step={90}
        className="grid gap-x-[clamp(20px,2.4vw,36px)] gap-y-12 md:grid-cols-3"
      >
        {blogPosts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Reveal>
    </section>
  )
}
