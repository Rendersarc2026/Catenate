import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { brandBySlug, brands } from "@/data/catenate"

type BrandPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }))
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params
  const brand = brandBySlug(slug)

  if (!brand) return { title: "Brand — Catenate" }

  return {
    title: `${brand.name} — Catenate`,
    description: `${brand.description}. ${brand.familyCount} distributed by Catenate.`,
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params
  const brand = brandBySlug(slug)

  if (!brand) notFound()

  const index = brands.findIndex((entry) => entry.slug === brand.slug)
  const next = brands[(index + 1) % brands.length]

  const productCount = brand.groups.reduce(
    (total, group) => total + group.items.length,
    0
  )

  /*
   * Longest family first, because the grid below rows the families up and a
   * row is as tall as the deepest family in it. In the order they are written
   * a thirteen-item family can sit beside a one-item one, and the two short
   * columns are left holding half a screen of white space until the next row
   * starts. Sorted, each row is made of families of roughly one depth and the
   * ragged edge is pushed to the bottom of the grid, where it reads as the end
   * of the list rather than as a hole in it. The sort is stable, so families
   * of equal depth keep the order they are written in.
   */
  const groups = [...brand.groups].sort((a, b) => b.items.length - a.items.length)

  return (
    <>
      <SiteHeader />

      <main className="pt-nav bg-white text-ink">
        <article className="content-pad pt-[clamp(36px,5vw,72px)] pb-[clamp(64px,8vw,120px)]">
          <Reveal>
            <Link
              href="/#authorised-distributors"
              className="inline-flex items-center gap-1.5 text-[12px] text-grey transition-colors hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-3 fill-none stroke-current stroke-[2]"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
              All principals
            </Link>

            {/*
             * The mark carries the principal's own colour, so it stands in for
             * the page title; the name stays in the h1 for anything not
             * reading the picture.
             */}
            <div className="mt-7 flex items-center gap-[clamp(20px,3vw,40px)]">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt=""
                  width={220}
                  height={64}
                  priority
                  style={{ transform: `scale(${brand.logoScale ?? 1})` }}
                  className="h-[clamp(38px,4.2vw,64px)] w-[clamp(110px,11vw,180px)] shrink-0 object-contain object-left"
                />
              ) : null}

              <h1 className="text-[clamp(2.2rem,3.4vw,3.1rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink">
                {brand.name}
              </h1>
            </div>

            <p className="mt-6 max-w-[62ch] text-[clamp(16px,1.15vw,19px)] leading-[1.6] text-ink/70">
              {brand.description}
            </p>

            <p className="mt-5 text-[12px] tracking-[0.06em] text-grey">
              Authorised distributor · {brand.familyCount} · {productCount} ranges
            </p>
          </Reveal>

          {/*
           * Every family in full — the reason this page exists, since the
           * pinned row on the home page can only show the first few.
           */}
          <Reveal
            stagger
            className="mt-[clamp(44px,6vw,88px)] grid grid-cols-3 gap-x-[clamp(24px,3vw,56px)] gap-y-[clamp(32px,4vw,56px)] border-t border-ink/10 pt-[clamp(32px,4vw,56px)] max-lg:grid-cols-2 max-md:grid-cols-1"
          >
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-2.5 text-[11px] font-medium tracking-[0.16em] text-grey uppercase">
                  {group.title}
                </h2>
                <ul className="list-none text-[15px] leading-8">
                  {group.items.map((item) => (
                    <li key={item} className="text-ink/82">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          {brand.industries ? (
            <Reveal className="mt-[clamp(40px,5vw,72px)] border-t border-ink/10 pt-[clamp(28px,3.5vw,48px)]">
              <h2 className="mb-4 text-[11px] font-medium tracking-[0.16em] text-grey uppercase">
                Featured industries
              </h2>
              <ul className="flex list-none flex-wrap gap-2">
                {brand.industries.map((industry) => (
                  <li
                    key={industry}
                    className="rounded-full px-3.5 py-1.5 text-[13px] text-ink/75 shadow-[inset_0_0_0_1px_rgb(26_29_46/0.14)]"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          <Reveal className="mt-[clamp(40px,5.5vw,80px)]">
            <ArrowButton href="/#contact" variant="brand" size="pill">
              Request specification pack
            </ArrowButton>
          </Reveal>

          <Reveal className="mt-[clamp(48px,6vw,88px)] border-t border-ink/10 pt-7">
            <Link
              href={`/brands/${next.slug}`}
              className="group flex items-center justify-between gap-6"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[10px] tracking-[0.06em] text-grey">
                  Next principal
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
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
