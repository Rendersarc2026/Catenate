import Image from "next/image";
import Link from "next/link";

import { ArrowButton } from "@/components/site/arrow-button";
import { PostCard } from "@/components/site/blog/post-card";
import { Reveal } from "@/components/site/reveal";
import { blogPosts, companyUpdates, type CompanyUpdate } from "@/data/catenate";

function SectionHeading({
  eyebrow,
  title,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <Reveal className="mb-[clamp(16px,2.6svh,40px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
      <div>
        <span className="eyebrow mb-[clamp(8px,1.2svh,16px)]">{eyebrow}</span>
        <h2 className="text-balance text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.18] font-medium tracking-[-0.015em] text-ink">
          {title}
        </h2>
      </div>
      <ArrowButton href={href} variant="quiet" size="pill">
        {cta}
      </ArrowButton>
    </Reveal>
  );
}

/* A company update: image on the left, category, title and arrow on the right. */
function UpdateCard({ update }: { update: CompanyUpdate }) {
  return (
    <Link
      href={`/updates/${update.slug}`}
      className="group/update flex h-full min-h-[148px] overflow-hidden lg:min-h-[clamp(116px,15svh,160px)] rounded-[14px] border border-ink/8 bg-[#f4f5f8] transition-colors duration-300 hover:bg-[#eceef3]"
    >
      <div className="relative w-1/2 shrink-0 lg:w-[42%] overflow-hidden bg-[#e6e7ec]">
        <Image
          src={update.image}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw"
          className="object-cover transition-transform duration-800 ease-expo group-hover/update:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-[clamp(12px,1.2vw,18px)]">
        <span className="text-[11px] font-medium tracking-[0.16em] text-ink/60 uppercase">
          {update.category}
        </span>
        <h3 className="mt-2 text-[clamp(14px,1.05vw,16px)] leading-[1.3] font-medium tracking-[-0.01em] text-ink">
          {update.title}
        </h3>
        <span
          aria-hidden="true"
          className="mt-auto grid size-7 place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.3)] transition-[transform,background-color] duration-250 ease-expo group-hover/update:rotate-45 group-hover/update:bg-ink/5"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-3 fill-none stroke-current stroke-[1.8]"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

/*
 * "Latest blog" — the three newest articles, then "Inside Catenate": company
 * news, events and partnerships. On desktop, spacing and image heights scale
 * with viewport height so both blocks fit on one screen.
 */
export function LatestBlog() {
  return (
    <section
      id="blog"
      className="section bg-white lg:py-[clamp(32px,4.5svh,72px)]"
    >
      <SectionHeading
        eyebrow="Insights & Expertise"
        title="The Catenate Perspective."
        href="/blog"
        cta="View all posts"
      />

      <Reveal
        stagger
        step={90}
        /*
         * A phone swipes through the posts, the next one peeking in from the
         * edge; the rail bleeds to the screen edges and snaps to each card.
         */
        className="-mx-[var(--section-pad)] flex snap-x snap-mandatory scroll-px-[var(--section-pad)] gap-4 overflow-x-auto overscroll-x-contain px-[var(--section-pad)] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-x-[clamp(20px,2.4vw,36px)] md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {blogPosts.slice(0, 3).map((post) => (
          <div key={post.slug} className="w-[84%] shrink-0 snap-start md:w-auto">
            <PostCard post={post} compact />
          </div>
        ))}
      </Reveal>

      <div className="my-[clamp(32px,3.6vw,52px)] border-t border-ink/10 lg:my-[clamp(22px,3.4svh,52px)]" />

      <SectionHeading
        eyebrow="Our World"
        title="Inside Catenate."
        href="/updates"
        cta="View all updates"
      />

      <Reveal
        stagger
        step={90}
        /* Swiped on a phone, like the posts above. */
        className="-mx-[var(--section-pad)] flex snap-x snap-mandatory scroll-px-[var(--section-pad)] gap-3 overflow-x-auto overscroll-x-contain px-[var(--section-pad)] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-[clamp(14px,1.6vw,24px)] sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
      >
        {companyUpdates.map((update) => (
          <div key={update.slug} className="w-[84%] shrink-0 snap-start sm:w-auto">
            <UpdateCard update={update} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
