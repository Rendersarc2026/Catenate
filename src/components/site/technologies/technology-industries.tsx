import Image from "next/image"

import { Reveal } from "@/components/site/reveal"
import { technologyIndustries, type TechnologyIndustry } from "@/data/catenate"

/**
 * One portfolio across the industries it serves, as photo cards.
 *
 * A three-column grid on wide screens and two on tablets. Phones get a
 * swipeable rail that bleeds to the screen edges, with the next card peeking
 * in so it reads as scrollable.
 */
export function TechnologyIndustries() {
  const count = String(technologyIndustries.length).padStart(2, "0")

  return (
    <section
      id="industries"
      className="section scroll-mt-nav bg-white text-ink"
      aria-labelledby="industries-title"
    >
      <Reveal className="mb-[clamp(28px,4vw,52px)] max-w-[46ch]">
        <span className="eyebrow text-ink opacity-100">Across industries</span>
        <h2
          id="industries-title"
          className="text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.15] font-light tracking-[-0.02em]"
        >
          One portfolio,
          <br />
          many industries.
        </h2>
        <p className="lead mt-5 max-w-[42ch] leading-[1.6] max-md:text-[16px]">
          From glass facades and oil fields to solar modules and bus bodies,
          our principals&apos; ranges are specified wherever performance
          matters.
        </p>
        <p className="tnum mt-6 text-[11px] tracking-[0.16em] text-grey uppercase md:hidden">
          {count} industries · Swipe
        </p>
      </Reveal>

      <Reveal
        stagger
        step={70}
        role="list"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] max-md:-mx-[var(--section-pad)] max-md:scroll-px-[var(--section-pad)] max-md:px-[var(--section-pad)] md:grid md:grid-cols-2 md:gap-3.5 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {technologyIndustries.map((industry, index) => (
          <IndustryCard key={industry.title} industry={industry} index={index} />
        ))}
      </Reveal>
    </section>
  )
}

function IndustryCard({
  industry,
  index,
}: {
  industry: TechnologyIndustry
  index: number
}) {
  return (
    <article
      role="listitem"
      className="group/card flex w-[78%] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-[18px] bg-off md:w-auto md:max-w-none"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={industry.image}
          alt=""
          fill
          sizes="(max-width: 768px) 78vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-[scale] duration-[1200ms] ease-expo motion-safe:group-hover/card:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgb(8_10_16/0.35),transparent)]"
        />
        <span className="tnum absolute top-3.5 left-3.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] leading-none text-white/90 backdrop-blur-[3px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute top-3.5 right-3.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] leading-none tracking-[0.16em] text-white/90 uppercase backdrop-blur-[3px]">
          {industry.principal}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-[clamp(18px,2vw,24px)] pt-[clamp(18px,2vw,24px)] pb-[clamp(20px,2.2vw,28px)]">
        <h3 className="text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.3] font-normal tracking-[-0.01em] text-balance">
          {industry.title}
        </h3>
        <p className="mt-1.5 text-[12.5px] text-grey">{industry.range}</p>
        <p className="mt-4 text-[14px] leading-[1.65] text-grey">
          {industry.body}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {industry.uses.map((use) => (
            <li
              key={use}
              className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11.5px] text-ink/70"
            >
              {use}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
