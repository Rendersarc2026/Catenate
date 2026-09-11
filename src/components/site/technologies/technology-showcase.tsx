"use client"

import Image from "next/image"
import * as React from "react"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { images, technologies, type Technology } from "@/data/catenate"
import { cn } from "@/lib/utils"

/**
 * The chemistries, one long read.
 *
 * On a wide screen the photography pins to the left and cross-fades as the
 * copy beside it scrolls past — one picture on screen at a time, changing
 * under the block it belongs to. Narrow screens get the picture stacked above
 * each block instead, where there is no room to pin anything.
 */
export function TechnologyShowcase() {
  const [active, setActive] = React.useState(0)

  /*
   * One observer for the four blocks, with a band across the middle of the
   * viewport as its root: whichever block is crossing the middle owns the
   * picture. A plain threshold would hand it over the moment a block's top
   * edge appeared, well before the visitor was reading it.
   */
  const blocksRef = React.useRef<(HTMLElement | null)[]>([])

  React.useEffect(() => {
    const nodes = blocksRef.current.filter((node): node is HTMLElement => !!node)
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (!record.isIntersecting) continue
          const index = nodes.indexOf(record.target as HTMLElement)
          if (index !== -1) setActive(index)
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="chemistries"
      className="section scroll-mt-nav bg-white text-ink"
      aria-label="Chemistries"
    >
      <div className="grid gap-[clamp(32px,4vw,72px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
        {/* ---- The pinned picture (wide screens only) ---- */}
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-height)+28px)]">
            <StickyStack active={active} />
          </div>
        </div>

        {/* ---- The copy ---- */}
        <div className="flex flex-col">
          {technologies.map((tech, index) => (
            <TechnologyBlock
              key={tech.slug}
              tech={tech}
              index={index}
              isActive={index === active}
              ref={(node) => {
                blocksRef.current[index] = node
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * The pinned picture
 * ------------------------------------------------------------------ */

/**
 * Every photograph is mounted at once and cross-faded on opacity, so the swap
 * costs a composite rather than a decode — and the incoming frame is never a
 * blank box while the network catches up.
 */
function StickyStack({ active }: { active: number }) {
  const current = technologies[active]

  return (
    <figure className="relative m-0">
      {/* Tall, but never taller than the space the pin leaves it — the ticks
          below have to stay on screen for the picture to read as one of four. */}
      <div className="relative aspect-[4/5] max-h-[calc(100svh-var(--nav-height)-150px)] w-full overflow-hidden rounded-[clamp(18px,2vw,28px)] bg-off shadow-[0_20px_60px_-24px_rgb(26_29_46/0.45)]">
        {technologies.map((tech, index) => (
          <Image
            key={tech.slug}
            src={images.technology(tech.slug).panel}
            alt={tech.name}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 0px, 44vw"
            className={cn(
              "object-cover transition-[opacity,scale] duration-[900ms] ease-expo",
              index === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
            )}
          />
        ))}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(8_10_16/0.78)_0%,rgb(8_10_16/0.18)_38%,transparent_62%)]"
        />

        {/* Counter sits top-right, clear of the inset hung off the corner. */}
        <span className="tnum absolute top-[clamp(16px,1.8vw,24px)] right-[clamp(16px,1.8vw,24px)] rounded-full bg-black/35 px-3 py-1 text-[12px] text-white/85 backdrop-blur-[2px]">
          {String(active + 1).padStart(2, "0")}
          <span className="text-white/45">
            {" / "}
            {String(technologies.length).padStart(2, "0")}
          </span>
        </span>

        {/* Caption. Keyed on the chemistry so the words re-enter on each swap. */}
        <figcaption
          key={current.slug}
          className="tech-caption absolute inset-x-0 bottom-0 p-[clamp(18px,2vw,28px)] pr-[clamp(120px,16vw,200px)] text-white"
        >
          <span className="block text-[11px] tracking-[0.16em] text-white/65 uppercase">
            {current.family}
          </span>
          <span className="mt-1.5 block text-[clamp(1.05rem,1.5vw,1.4rem)] leading-[1.25] font-normal tracking-[-0.015em]">
            {current.short}
          </span>
        </figcaption>
      </div>

      {/* Inset detail, hung off the lower-right corner of the panel. */}
      <div className="absolute -right-[clamp(10px,1.6vw,26px)] -bottom-[clamp(16px,2vw,32px)] aspect-[4/3] w-[clamp(112px,15vw,190px)] overflow-hidden rounded-[clamp(12px,1.2vw,18px)] shadow-[0_16px_40px_-16px_rgb(26_29_46/0.6)] ring-4 ring-white">
        {technologies.map((tech, index) => (
          <Image
            key={tech.slug}
            src={images.technology(tech.slug).detail}
            alt=""
            fill
            sizes="190px"
            className={cn(
              "object-cover transition-opacity duration-[900ms] ease-expo",
              index === active ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      {/* Progress ticks — where you are in the four. They stop short of the
          inset hanging over the corner rather than running under it. */}
      <div
        className="mt-[clamp(26px,3vw,40px)] flex items-center gap-2 pr-[clamp(108px,14vw,178px)]"
        aria-hidden="true"
      >
        {technologies.map((tech, index) => (
          <span
            key={tech.slug}
            className={cn(
              "h-[3px] flex-1 rounded-full transition-[background-color,opacity] duration-500 ease-expo",
              index === active ? "bg-ink" : "bg-ink/12"
            )}
          />
        ))}
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------ *
 * One chemistry
 * ------------------------------------------------------------------ */

type BlockProps = {
  tech: Technology
  index: number
  isActive: boolean
  /* React 19 takes `ref` as an ordinary prop — no forwardRef wrapper needed. */
  ref: React.Ref<HTMLElement>
}

function TechnologyBlock({ tech, index, isActive, ref }: BlockProps) {
  return (
    <article
      ref={ref}
      id={tech.slug}
      className="scroll-mt-nav border-t border-ink/10 py-[clamp(38px,5vw,72px)] first:border-t-0 first:pt-0"
    >
      {/* The picture rides above the copy where there is no room to pin it. */}
      <div className="relative mb-7 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-off lg:hidden">
        <Image
          src={images.technology(tech.slug).panel}
          alt={tech.name}
          fill
          sizes="(max-width: 1024px) 100vw, 0px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(8_10_16/0.72),transparent_58%)]"
        />
        <span className="absolute bottom-4 left-5 text-[11px] tracking-[0.16em] text-white/80 uppercase">
          {tech.family}
        </span>
      </div>

      <Reveal>
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "tnum text-[12px] transition-colors duration-500 ease-expo",
              isActive ? "text-ink" : "text-grey"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "h-px flex-1 origin-left transition-[background-color,scale] duration-700 ease-expo",
              isActive ? "scale-x-100 bg-ink/35" : "scale-x-100 bg-ink/10"
            )}
          />
          {/* The picture above already carries the trade on narrow screens. */}
          <span className="text-[11px] tracking-[0.14em] text-grey uppercase max-lg:hidden">
            {tech.family}
          </span>
        </div>

        <h3 className="mt-5 text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.25] font-normal tracking-[-0.015em] text-balance">
          {tech.name}
        </h3>

        <p className="lead mt-4">{tech.description}</p>
      </Reveal>

      {/* Working data. */}
      <div className="mt-7 rounded-2xl bg-off px-[clamp(20px,2.4vw,30px)] py-[clamp(18px,2vw,26px)]">
        <dl className="grid grid-cols-2 gap-x-9 gap-y-0.5 max-md:grid-cols-1">
          {tech.spec.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-4 border-b border-ink/7 py-2.5 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <dt className="text-[13.5px] text-grey">{label}</dt>
              <dd className="tnum text-right text-[13.5px] font-normal">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Where it goes to work. */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {tech.uses.map((use) => (
          <li
            key={use}
            className="rounded-full border border-ink/12 px-3.5 py-1.5 text-[12.5px] text-ink/70 transition-[background-color,border-color,color,translate] duration-300 ease-expo hover:-translate-y-0.5 hover:border-ink/30 hover:bg-off hover:text-ink"
          >
            {use}
          </li>
        ))}
      </ul>

      <ArrowButton
        href="/solutions-finder"
        variant="quiet"
        size="pill-sm"
        className="mt-7"
      >
        Solutions Finder
      </ArrowButton>
    </article>
  )
}
