import Image from "next/image";

import { Reveal } from "@/components/site/reveal";

export function AboutHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex h-[100svh] min-h-[560px] w-full flex-col justify-between overflow-hidden text-white select-none"
      aria-label="About Us Hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/hero-climates.webp"
          alt="Catenate global reach across diverse environments and climates"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.72]"
        />
      </div>

      {/* Scrim Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-b from-black/35 via-transparent via-40% to-black/60"
        aria-hidden="true"
      />

      {/* Title & Subtitle */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center px-6 pt-[120px] text-center">
        <Reveal>
          <h1 className="mb-2.5 text-balance text-[clamp(2.2rem,5vw,3.2rem)] font-medium tracking-[-0.02em] text-white">
            About Us
          </h1>
          <p className="mx-auto max-w-[60ch] text-balance text-[15px] text-white/75">
            Connecting the world&apos;s trusted brands to the builders who need them
          </p>
        </Reveal>
      </div>

      {/* Bottom Bar: Play Action & 3 Key Stats */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-5 px-[clamp(24px,5vw,64px)] pb-[34px] pt-[26px]">
        <button
          type="button"
          aria-label="Play video"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-white/50 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <svg viewBox="0 0 12 14" className="ml-0.5 size-[11px] fill-white" aria-hidden="true">
            <path d="M0 0l12 7-12 7z" />
          </svg>
        </button>

        <div className="flex flex-wrap items-center gap-10 sm:gap-14">
          {/* Stat 1: 150+ Employees */}
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="size-[18px] shrink-0 fill-none stroke-white stroke-[1.4]"
              aria-hidden="true"
            >
              <path d="M16 11a4 4 0 1 0-4-4M6 21v-2a4 4 0 0 1 4-4h1M14 21v-1a4 4 0 0 1 4-4h1a3 3 0 0 1 3 3v2" />
              <circle cx="9" cy="8" r="3" />
            </svg>
            <div>
              <b className="block text-[16px] font-semibold text-white">150+</b>
              <span className="block text-[11.5px] text-white/70">Employees</span>
            </div>
          </div>

          {/* Stat 2: One Mission */}
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="size-[18px] shrink-0 fill-none stroke-white stroke-[1.4]"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
            </svg>
            <div>
              <b className="block text-[16px] font-semibold text-white">One Mission</b>
              <span className="block text-[11.5px] text-white/70">&nbsp;</span>
            </div>
          </div>

          {/* Stat 3: 1,500+ Customers served */}
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="size-[18px] shrink-0 fill-none stroke-white stroke-[1.4]"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <div>
              <b className="block text-[16px] font-semibold text-white">1,500+</b>
              <span className="block text-[11.5px] text-white/70">Customers served</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
