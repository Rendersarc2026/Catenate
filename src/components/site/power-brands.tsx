import Image from "next/image"
import Link from "next/link"
import type { CSSProperties } from "react"

import { Reveal } from "@/components/site/reveal"
import { powerBrands } from "@/data/catenate"

/*
 * The ranges people ask for by name, as opposed to the principals behind them
 * in the distributor row above. Eleven marks plus a closing cell keep the grid
 * full at two, three and four columns.
 */
export function PowerBrands() {
  return (
    <section id="power-brands" className="section bg-white">
      <Reveal className="mb-[clamp(28px,4vw,52px)] text-center">
        <span className="eyebrow">Global power brands</span>
        <h2 className="mx-auto max-w-[24ch] text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.2] font-light tracking-[-0.02em] text-ink text-balance">
          The names specifiers already trust, supplied through one desk.
        </h2>
      </Reveal>

      {/* Every cell carries a top and left rule; the grid's own frame hides the outer ones. */}
      <Reveal
        stagger
        step={50}
        className="grid grid-cols-2 overflow-hidden sm:grid-cols-3 lg:grid-cols-4 [&>*]:-mt-px [&>*]:-ml-px"
      >
        {powerBrands.map((brand) => (
          <div
            key={brand.name}
            className="flex min-h-[clamp(120px,12vw,168px)] flex-col items-center justify-center border-t border-l border-ink/10 px-4 py-6 text-center"
          >
            {brand.logo ? (
              <span
                style={{ "--logo-scale": brand.logoScale ?? 1 } as CSSProperties}
                className="relative block h-[calc(clamp(28px,3vw,40px)*var(--logo-scale))] w-full max-w-[calc(clamp(104px,12vw,160px)*var(--logo-scale))]"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </span>
            ) : (
              <span className="font-heading text-[clamp(1.2rem,1.9vw,1.65rem)] leading-none font-semibold tracking-[-0.02em] text-ink">
                {brand.name}
              </span>
            )}
            <span className="mt-3 text-[12.5px] leading-[1.45] text-grey">
              {brand.line}
            </span>
            <span className="mt-1 text-[10.5px] tracking-[0.14em] text-grey/70 uppercase">
              {brand.principal}
            </span>
          </div>
        ))}

        <Link
          href="/technologies"
          className="group flex min-h-[clamp(120px,12vw,168px)] flex-col items-center justify-center border-t border-l border-ink/10 bg-off px-4 py-6 text-center transition-colors duration-300 ease-expo hover:bg-ink hover:text-white"
        >
          <span className="text-[15px] font-medium">Every range we carry</span>
          <span className="mt-2 text-[12.5px] text-grey transition-colors duration-300 ease-expo group-hover:text-white/70">
            Technologies →
          </span>
        </Link>
      </Reveal>
    </section>
  )
}
