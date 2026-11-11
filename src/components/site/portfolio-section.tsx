import Image from "next/image"
import type { ReactNode } from "react"

import { Reveal } from "@/components/site/reveal"
import { portfolio, type PortfolioBrand } from "@/data/catenate"
import { cn } from "@/lib/utils"

/*
 * "The Catenate portfolio" — the product brands carried under the principals,
 * one card each: the mark above, what the range is for below.
 */

/* Stand-ins set in type until the logo files are supplied. */
const WORDMARKS: Record<string, ReactNode> = {
  Ceresit: (
    <span className="bg-black px-2.5 py-1 text-[17px] leading-none md:text-[22px] font-bold tracking-[-0.02em] text-white">
      Ceresit
    </span>
  ),
}

function Mark({ brand }: { brand: PortfolioBrand }) {
  if (brand.logo) {
    return (
      <Image
        src={brand.logo}
        alt={brand.name}
        width={200}
        height={64}
        style={{ transform: `scale(${brand.logoScale ?? 1})` }}
        className="h-10 w-full max-w-[150px] object-contain md:h-[clamp(44px,2.7vw,52px)] md:max-w-[min(72%,170px)]"
      />
    )
  }

  return (
    <span role="img" aria-label={brand.name}>
      {WORDMARKS[brand.name] ?? (
        <span className="text-[22px] font-bold">{brand.name}</span>
      )}
    </span>
  )
}

export function PortfolioSection() {
  /*
   * Rows of four, with the tail set three to a row so no row is left ragged:
   * widen cards from the end, three at a time, until the rest divide by four.
   */
  const count = portfolio.brands.length
  let wide = 0
  while (wide < count && (count - wide) % 4 !== 0) wide += 3
  const lastRow = count - wide

  return (
    <section id="portfolio" className="bg-[#fafafa]">
      {/* Runs wider than the site's content column: the eleven cards need the
          room, and the copy beside them starts nearer the viewport edge. */}
      <div className="px-[max(var(--section-pad),6vw)] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto grid w-full max-w-[1700px] items-center gap-x-[clamp(40px,9vw,176px)] gap-y-12 lg:grid-cols-[minmax(0,0.47fr)_minmax(0,1fr)]">
          <Reveal>
            <span className="eyebrow mb-[clamp(24px,2.6vw,44px)] flex items-center gap-[18px] text-[clamp(11px,0.75vw,14px)] font-semibold text-ink/80 opacity-100">
              <span aria-hidden="true" className="h-px w-[clamp(32px,3.1vw,60px)] bg-ink/35" />
              {portfolio.eyebrow}
              <span aria-hidden="true" className="h-px w-[clamp(32px,3.6vw,70px)] bg-ink/35" />
            </span>
            <h2 className="max-w-[9em] text-[clamp(2.2rem,3.05vw,3.7rem)] leading-[1.09] font-bold tracking-[-0.025em] text-black uppercase">
              {portfolio.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-[clamp(22px,2.6vw,48px)] max-w-[26em] text-[clamp(15px,1.05vw,20px)] leading-[1.6] text-ink/65">
              {portfolio.body}
            </p>
          </Reveal>

          <Reveal
            stagger
            step={50}
            className="grid grid-cols-2 gap-[clamp(12px,0.85vw,18px)] md:grid-cols-12"
          >
            {portfolio.brands.map((brand, index) => (
              /* The outer box takes the staggered entrance; the card inside
               * owns the hover, so neither transition overrides the other. */
              <div
                key={brand.name}
                className={cn(
                  index < lastRow ? "md:col-span-3" : "md:col-span-4",
                  /* Two to a row on a phone: an odd one out takes the full row. */
                  count % 2 === 1 && "max-md:last:col-span-2"
                )}
              >
                <div className="flex h-full min-h-[clamp(132px,8.3vw,160px)] flex-col items-center justify-center rounded-[18px] border border-ink/8 bg-white px-3 py-4 text-center shadow-[0_1px_3px_rgba(26,29,46,0.05)] transition-[translate,box-shadow] duration-500 ease-expo hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(26,29,46,0.25)] md:px-4">
                  <div className="grid h-[clamp(48px,3.1vw,60px)] w-full place-items-center">
                    <Mark brand={brand} />
                  </div>
                  <span
                    aria-hidden="true"
                    className="my-[clamp(8px,0.6vw,12px)] block h-px w-9 bg-ink/10"
                  />
                  <p
                    className={cn(
                      "flex min-h-[2.5em] items-center text-balance text-[clamp(13px,0.88vw,16.5px)] leading-[1.25] text-ink/75",
                      index < lastRow ? "max-w-[12em]" : "max-w-[15em]"
                    )}
                  >
                    {brand.use}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
