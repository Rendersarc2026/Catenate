import Image from "next/image";

import { aboutHero } from "@/data/catenate";

export function AboutHero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] lg:min-h-[92vh] w-full flex-col justify-between overflow-hidden text-white select-none"
      aria-label="About Catenate Hero"
    >
      {/* Background Image */}
      <Image
        src={aboutHero.image}
        alt="About Catenate Channel Partner Network"
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom pointer-events-none"
      />

      {/* Top Scrim for Navigation Bar Legibility */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/55 via-black/25 to-transparent"
        aria-hidden="true"
      />

      {/* Ambient Contrast Vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-black/10"
        aria-hidden="true"
      />

      {/* Bottom Scrim smoothly blending into the dark Approvals Section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-blue via-blue/50 to-transparent"
        aria-hidden="true"
      />

      {/* Center Editorial Title & Subtitle */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1520px] flex-1 flex-col items-center justify-center px-6 pt-[calc(var(--nav-height)+clamp(2.5rem,5vh,5.5rem))] pb-8 text-center">
        <div className="animate-in fade-in duration-700">
          <h1 className="text-balance text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
            {aboutHero.title}
          </h1>
          <p className="mt-4 text-balance text-[clamp(1.05rem,1.75vw,1.4rem)] font-normal tracking-[-0.01em] text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
            {aboutHero.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom 3-Column Stats Row */}
      <div className="relative z-10 w-full pb-[clamp(2.5rem,5vh,4.5rem)]">
        <div className="mx-auto max-w-[1520px] px-6">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:gap-10">
            {aboutHero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="tnum text-[clamp(2.1rem,3.4vw,2.9rem)] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                  {stat.value}
                </span>
                <span className="mt-1 text-[13.5px] font-normal tracking-wide text-white/85 sm:text-[14.5px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
