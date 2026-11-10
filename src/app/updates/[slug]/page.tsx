import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowButton } from "@/components/site/arrow-button";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { companyUpdateBySlug, companyUpdates } from "@/data/catenate";

type UpdateProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return companyUpdates.map((update) => ({ slug: update.slug }));
}

export async function generateMetadata({
  params,
}: UpdateProps): Promise<Metadata> {
  const { slug } = await params;
  const update = companyUpdateBySlug(slug);

  if (!update) return { title: "Inside Catenate — Catenate" };

  return {
    title: `${update.title} — Catenate`,
    description: update.summary,
  };
}

export default async function UpdatePage({ params }: UpdateProps) {
  const { slug } = await params;
  const update = companyUpdateBySlug(slug);

  if (!update) notFound();

  const more = companyUpdates.filter((entry) => entry.slug !== update.slug);

  return (
    <>
      <SiteHeader />

      <main className="pt-nav bg-white text-ink">
        {/* One 1100px column: the copy keeps a readable measure but starts on
            the same left edge as the picture. */}
        <article className="content-pad pt-[clamp(36px,5vw,72px)] pb-[clamp(64px,8vw,120px)]">
          <div className="mx-auto max-w-[1100px]">
            <Reveal className="max-w-[760px]">
              <Link
                href="/updates"
                className="inline-flex items-center gap-1.5 text-[12px] text-grey transition-colors hover:text-ink"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-3 fill-none stroke-current stroke-[2]"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                All updates
              </Link>

              <p className="mt-7 text-[12px] tracking-[0.08em] text-ink/55 uppercase">
                {update.category}
              </p>
              <h1 className="mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] font-medium tracking-[-0.03em]">
                {update.title}
              </h1>
              <p className="mt-5 text-[clamp(16px,1.25vw,20px)] leading-[1.55] text-ink/70">
                {update.summary}
              </p>
            </Reveal>

            <Reveal className="mt-[clamp(32px,4vw,56px)]">
              <div className="relative aspect-16/9 w-full overflow-hidden rounded-[18px] bg-[#e6e7ec]">
                <Image
                  src={update.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="mt-[clamp(36px,5vw,72px)] flex max-w-[680px] flex-col gap-[1.15em]">
              {update.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[clamp(16px,1.1vw,18px)] leading-[1.7] text-ink/75"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-[clamp(24px,3vw,40px)] border-t border-ink/10 pt-8">
                <ArrowButton href="/contact" variant="brand" size="pill">
                  Get in touch
                </ArrowButton>
              </div>
            </Reveal>
          </div>
        </article>

        <section className="section border-t border-ink/10 bg-off">
          <Reveal className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <h2 className="text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.18] font-medium tracking-[-0.015em]">
              More from Inside Catenate
            </h2>
            <ArrowButton href="/updates" variant="quiet" size="pill">
              View all updates
            </ArrowButton>
          </Reveal>
          <Reveal
            stagger
            step={80}
            className="grid gap-x-[clamp(20px,2.4vw,36px)] gap-y-12 md:grid-cols-3"
          >
            {more.map((entry) => (
              <article key={entry.slug} className="group/update">
                <Link href={`/updates/${entry.slug}`} className="block">
                  <div className="relative aspect-4/3 overflow-hidden rounded-[18px] bg-[#e6e7ec]">
                    <Image
                      src={entry.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-800 ease-expo group-hover/update:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase backdrop-blur-sm">
                      {entry.category}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.25] font-medium tracking-[-0.02em] underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover/update:decoration-ink/40">
                    {entry.title}
                  </h3>
                </Link>
              </article>
            ))}
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
