import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowButton } from "@/components/site/arrow-button"
import { PostCard } from "@/components/site/blog/post-card"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { blogPostBySlug, blogPosts, formatPostDate } from "@/data/catenate"

type BlogPostProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPostBySlug(slug)

  if (!post) return { title: "Blog — Catenate" }

  return {
    title: `${post.title} — Catenate`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const post = blogPostBySlug(slug)

  if (!post) notFound()

  const more = blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3)

  return (
    <>
      <SiteHeader />

      <main className="pt-nav bg-white text-ink">
        <article className="content-pad pt-[clamp(36px,5vw,72px)] pb-[clamp(64px,8vw,120px)]">
          <Reveal className="mx-auto max-w-[760px]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[12px] text-grey transition-colors hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-3 fill-none stroke-current stroke-[2]"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              All posts
            </Link>
            <p className="mt-7 text-[12px] tracking-[0.08em] text-ink/55 uppercase">
              {post.category}
              <span aria-hidden="true"> · </span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              {post.readTime}
            </p>
            <h1 className="mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] font-medium tracking-[-0.03em]">
              {post.title}
            </h1>
            <p className="mt-5 text-[clamp(16px,1.25vw,20px)] leading-[1.55] text-ink/70">
              {post.excerpt}
            </p>
            <p className="mt-6 text-[13px] text-grey">By {post.author}</p>
          </Reveal>

          <Reveal className="mx-auto mt-[clamp(32px,4vw,56px)] max-w-[1100px]">
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-[18px] bg-[#e6e7ec]">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-[clamp(36px,5vw,72px)] flex max-w-[680px] flex-col gap-[1.15em]">
            {post.body.map((section, index) => (
              <div key={section.heading ?? index} className="flex flex-col gap-[1.15em]">
                {section.heading ? (
                  <h2 className="mt-[0.8em] text-[clamp(1.25rem,1.7vw,1.6rem)] leading-[1.25] font-medium tracking-[-0.02em]">
                    {section.heading}
                  </h2>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[clamp(16px,1.1vw,18px)] leading-[1.7] text-ink/75"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            <div className="mt-[clamp(24px,3vw,40px)] border-t border-ink/10 pt-8">
              <ArrowButton href="/#contact" variant="brand" size="pill">
                Talk to our technical team
              </ArrowButton>
            </div>
          </Reveal>
        </article>

        {more.length ? (
          <section className="section border-t border-ink/10 bg-off">
            <Reveal className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
              <h2 className="text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.18] font-medium tracking-[-0.015em]">
                More from the blog
              </h2>
              <ArrowButton href="/blog" variant="quiet" size="pill">
                View all posts
              </ArrowButton>
            </Reveal>
            <Reveal
              stagger
              step={80}
              className="grid gap-x-[clamp(20px,2.4vw,36px)] gap-y-12 md:grid-cols-3"
            >
              {more.map((entry) => (
                <PostCard key={entry.slug} post={entry} />
              ))}
            </Reveal>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  )
}
