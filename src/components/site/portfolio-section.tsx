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
  "EZ Weld": (
    <span className="flex items-center text-[17px] leading-none md:text-[22px] font-black tracking-[-0.02em]">
      <span className="rounded-l-[4px] bg-black px-1.5 py-1 text-white">EZ</span>
      <span className="rounded-r-[4px] border-2 border-black bg-[#1f6fd1] px-1.5 py-[2px] text-white">
        WELD
      </span>
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
        className="h-10 w-full max-w-[150px] object-contain md:h-11"
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
  const lastRow = portfolio.brands.length - 3

  return (
    <section id="portfolio" className="bg-[#fafafa]">
      <div className="section">
        <div className="content-pad grid w-full items-center gap-x-[clamp(32px,5vw,88px)] gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)]">
          <Reveal className="mx-auto max-w-[460px] text-center">
            <span className="eyebrow mb-[clamp(24px,3vw,40px)] flex items-center justify-center gap-4 text-ink opacity-100">
              <span aria-hidden="true" className="h-px w-12 bg-ink/60" />
              {portfolio.eyebrow}
              <span aria-hidden="true" className="h-px w-12 bg-ink/60" />
            </span>
            <h2 className="text-[clamp(2.2rem,3.5vw,3.4rem)] leading-[1] font-semibold tracking-[-0.03em] text-black uppercase">
              {portfolio.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-[clamp(20px,2.4vw,32px)] text-[15px] leading-[1.6] text-ink/80">
              {portfolio.body}
            </p>
          </Reveal>

          <Reveal
            stagger
            step={50}
            className="grid grid-cols-2 gap-[clamp(12px,1.4vw,20px)] md:grid-cols-12"
          >
            {portfolio.brands.map((brand, index) => (
              /* The outer box takes the staggered entrance; the card inside
               * owns the hover, so neither transition overrides the other. */
              <div
                key={brand.name}
                className={cn(
                  index < lastRow ? "md:col-span-3" : "md:col-span-4",
                  "max-md:last:col-span-2"
                )}
              >
                <div className="flex h-full flex-col items-center rounded-[18px] border border-ink/8 bg-white px-3 pt-5 pb-4 text-center md:px-4 shadow-[0_1px_2px_rgba(26,29,46,0.04)] transition-[translate,box-shadow] duration-500 ease-expo hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(26,29,46,0.25)]">
                  <div className="grid h-14 w-full place-items-center">
                    <Mark brand={brand} />
                  </div>
                  <span
                    aria-hidden="true"
                    className="my-3 block h-px w-[85%] bg-ink/10"
                  />
                  <p className="flex min-h-[2.9em] items-center text-[13.5px] leading-[1.45] text-ink/80">
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
