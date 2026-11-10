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

/* A neutral silhouette until authors have photographs of their own. */
function AuthorAvatar() {
  return (
    <svg
      viewBox="0 0 80 80"
      aria-hidden="true"
      className="size-[clamp(56px,5.2vw,84px)] shrink-0 text-black"
    >
      <circle cx="40" cy="40" r="40" fill="currentColor" />
      <circle cx="40" cy="31" r="14" fill="#fff" />
      <path d="M14 70c4-13 14-20 26-20s22 7 26 20z" fill="#fff" />
    </svg>
  )
}

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

      <main className="bg-white text-ink">
        {/*
         * Split article: on wide screens the title panel and photograph hold
         * the left half of the screen while the writing scrolls on the right.
         * On phones the three stack — title, photograph, then the text.
         */}
        <article className="lg:grid lg:grid-cols-2">
          <div className="flex flex-col lg:sticky lg:top-0 lg:h-svh">
            <Reveal className="bg-[#e7e6e2] px-[clamp(20px,4vw,64px)] pt-[calc(var(--nav-height)+clamp(28px,5vh,64px))] pb-[clamp(32px,6vh,72px)]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[12px] text-ink/60 transition-colors hover:text-ink"
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

              <p className="mt-[clamp(20px,3.5vh,40px)] text-[12px] tracking-[0.12em] text-ink/60 uppercase">
                {post.category}
                <span aria-hidden="true"> · </span>
                {post.readTime}
              </p>
              <h1 className="mt-3 text-balance text-[clamp(2.2rem,min(4.2vw,7vh),4.4rem)] leading-[1.04] font-medium tracking-[-0.03em] text-black">
                {post.title}
              </h1>
            </Reveal>

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e6e7ec] lg:aspect-auto lg:min-h-[30svh] lg:flex-1">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="px-[clamp(20px,5vw,96px)] pt-[clamp(40px,7vh,96px)] pb-[clamp(64px,10vh,128px)] lg:pt-[calc(var(--nav-height)+clamp(64px,18vh,200px))]">
            <div className="mx-auto max-w-[580px] lg:mx-0">
              <Reveal className="flex items-center gap-[clamp(14px,1.6vw,22px)]">
                <AuthorAvatar />
                <div>
                  <p className="text-[clamp(18px,1.5vw,24px)] leading-tight font-semibold tracking-[-0.01em] text-ink">
                    {post.author}
                  </p>
                  <p className="mt-1 text-[clamp(14px,1.1vw,17px)] text-ink/70">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  </p>
                </div>
              </Reveal>

              {/*
                Long-form copy fades in whole rather than line by line: the
                line split measures breaks once, and a line that fits within a
                pixel can wrap again afterwards, leaving a stray word alone.
              */}
              <Reveal
                data-no-split
                className="mt-[clamp(32px,6vh,64px)] flex flex-col gap-[1.1em]"
              >
                <p className="text-[clamp(17px,1.25vw,20px)] leading-[1.55] text-ink">
                  {post.excerpt}
                </p>
                {post.body.map((section, index) => (
                  <div key={section.heading ?? index} className="flex flex-col gap-[1.1em]">
                    {section.heading ? (
                      <h2 className="mt-[0.8em] text-[clamp(1.2rem,1.5vw,1.45rem)] leading-[1.25] font-medium tracking-[-0.02em]">
                        {section.heading}
                      </h2>
                    ) : null}
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-[clamp(15px,1.05vw,17px)] leading-[1.7] text-ink/75"
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
            </div>
          </div>
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
