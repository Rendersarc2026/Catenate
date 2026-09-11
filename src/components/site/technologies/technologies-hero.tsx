"use client"

import Image from "next/image"
import * as React from "react"

import { ArrowButton } from "@/components/site/arrow-button"
import {
  applications,
  certificatesOwn,
  certificatesPrincipal,
  images,
  industries,
  technologies,
} from "@/data/catenate"

/** Figures the page can stand behind, counted off the content itself. */
const figures = [
  { value: String(technologies.length), label: "Chemistry families" },
  { value: String(applications.length), label: "Applications covered" },
  {
    value: String(certificatesOwn.length + certificatesPrincipal.length),
    label: "Approvals on file",
  },
  { value: String(industries.length), label: "Industries supplied" },
]

/** The headline, one masked line each. */
const headlineLines = ["Four chemistries,", "four sets of rules."]

/**
 * The page opener, set out like the home hero: centred headline over a
 * full-bleed photograph, two calls to action under it, and the figures ruled
 * off along the bottom edge. The picture drifts slower than the copy as the
 * page scrolls — a scroll-driven animation in `globals.css` that browsers
 * without it simply render as a still.
 */
export function TechnologiesHero() {
  /* Drives the `.hero-line` masks: the lines slide up once the section is
   * mounted, rather than being revealed by the scroll observer. */
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      id="hero"
      aria-label="Technologies"
      className={`${ready ? "is-ready " : ""}on-blue content-pad relative flex h-dvh min-h-[620px] w-full flex-col items-center justify-between overflow-hidden [contain:layout_paint] bg-black pt-[100px] pb-6 text-center text-white select-none sm:pt-[110px] sm:pb-8`}
    >
      {/* 1. The banner the whole hero is set on. */}
      <div className="pointer-events-none absolute inset-0 z-2" aria-hidden="true">
        {/* Not clipped here: the picture is held at scale(1.22) so it still
            covers the frame once the drift has moved it, and the section
            clips the overflow. */}
        <div className="tech-hero-media relative size-full will-change-transform">
          <Image
            src={images.technologiesHero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-[1.22] object-cover [filter:contrast(1.03)_brightness(0.62)]"
          />
        </div>

        {/* Only the two edges the interface sits on are shaded — the nav along
            the top, the figures along the bottom. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* 2. Foreground headline and actions. */}
      <div className="relative z-10 mx-auto my-auto max-w-[1050px]">
        <span className="hero-fade eyebrow text-white/70">Technologies</span>

        <h1 className="mx-auto text-[clamp(1.75rem,3.2vw,2.85rem)] leading-[1.3] font-light tracking-[-0.02em] text-white">
          {headlineLines.map((line) => (
            <span
              key={line}
              className="hero-line block whitespace-normal sm:whitespace-nowrap"
            >
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <div className="hero-fade mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:mt-9">
          <ArrowButton href="/#contact" variant="onBlue" size="pill">
            Request a specification
          </ArrowButton>
          <ArrowButton href="/solutions-finder" variant="line" size="pill">
            Solutions Finder
          </ArrowButton>
        </div>
      </div>

      {/* 3. Figures ruled off along the bottom. */}
      <dl className="hero-fade relative z-10 grid w-full max-w-[1220px] shrink-0 grid-cols-4 pt-4 max-[720px]:grid-cols-2 max-[720px]:gap-y-6">
        {figures.map((figure) => (
          <div
            key={figure.label}
            className="border-l border-white/16 px-4 py-1 text-center first:border-l-0 max-[720px]:nth-3:border-l-0"
          >
            <dd className="tnum block text-[clamp(2.1rem,3.6vw,3rem)] leading-none font-light tracking-[-0.025em] text-white">
              {figure.value}
            </dd>
            <dt className="mt-2.5 block text-[11px] tracking-[0.18em] text-white/55 uppercase sm:text-[12px]">
              {figure.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
