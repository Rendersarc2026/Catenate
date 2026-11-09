import Image from "next/image"
import Link from "next/link"

import { ArrowButton } from "@/components/site/arrow-button"
import { PostCard } from "@/components/site/blog/post-card"
import { Reveal } from "@/components/site/reveal"
import { blogPosts, companyUpdates, type CompanyUpdate } from "@/data/catenate"

function SectionHeading({
  eyebrow,
  title,
  href,
  cta,
}: {
  eyebrow: string
  title: string
  href: string
  cta: string
}) {
  return (
    <Reveal className="mb-[clamp(24px,3vw,40px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
      <div>
        <span className="mb-[clamp(10px,1.2vw,16px)] block text-[clamp(11px,0.95vw,14px)] font-semibold tracking-[0.24em] text-ink uppercase">
          {eyebrow}
        </span>
        <h2 className="text-[clamp(2rem,4vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-ink">
          {title}
        </h2>
      </div>
      <ArrowButton href={href} variant="quiet" size="pill">
        {cta}
      </ArrowButton>
    </Reveal>
  )
}

/* A company update: image on the left, category, title and arrow on the right. */
function UpdateCard({ update }: { update: CompanyUpdate }) {
  return (
    <Link
      href={update.href}
      className="group/update flex min-h-[148px] overflow-hidden rounded-[14px] border border-ink/8 bg-[#f4f5f8] transition-colors duration-300 hover:bg-[#eceef3]"
    >
      <div className="relative w-1/2 shrink-0 overflow-hidden bg-[#e6e7ec]">
        <Image
          src={update.image}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw"
          className="object-cover transition-transform duration-800 ease-expo group-hover/update:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-[clamp(12px,1.2vw,18px)]">
        <span className="text-[10.5px] font-semibold tracking-[0.14em] text-ink uppercase">
          {update.category}
        </span>
        <h3 className="mt-2 text-[clamp(14px,1.05vw,16px)] leading-[1.3] font-medium tracking-[-0.01em] text-ink">
          {update.title}
        </h3>
        <span
          aria-hidden="true"
          className="mt-auto grid size-7 place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.3)] transition-[transform,background-color] duration-250 ease-expo group-hover/update:rotate-45 group-hover/update:bg-ink/5"
        >
          <svg viewBox="0 0 24 24" className="size-3 fill-none stroke-current stroke-[1.8]">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

/*
 * "Latest blog" — the three newest articles, then "Inside Catenate": company
 * news, events and partnerships.
 */
export function LatestBlog() {
  return (
    <section id="blog" className="section bg-white">
      <SectionHeading
        eyebrow="Insights & Expertise"
        title="The Catenate Perspective."
        href="/blog"
        cta="View all posts"
      />

      <Reveal
        stagger
        step={90}
        className="grid gap-x-[clamp(20px,2.4vw,36px)] gap-y-10 md:grid-cols-3"
      >
        {blogPosts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} post={post} compact />
        ))}
      </Reveal>

      <div className="my-[clamp(32px,3.6vw,52px)] border-t border-ink/10" />

      <SectionHeading
        eyebrow="Our World"
        title="Inside Catenate."
        href="/about"
        cta="View all updates"
      />

      <Reveal
        stagger
        step={90}
        className="grid gap-[clamp(14px,1.6vw,24px)] sm:grid-cols-2 lg:grid-cols-4"
      >
        {companyUpdates.map((update) => (
          <UpdateCard key={update.title} update={update} />
        ))}
      </Reveal>
    </section>
  )
}
