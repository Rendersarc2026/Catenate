import Image from "next/image";

import { Reveal } from "@/components/site/reveal";

export function AboutFeature() {
  return (
    <section
      className="relative isolate flex h-[78vh] min-h-[460px] w-full items-end overflow-hidden text-white"
      aria-label="On-site application feature"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/site-application.jpg"
          alt="Construction site application"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.75]"
        />
      </div>

      {/* Atmospheric Scrim */}
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-black/85 via-black/30 via-40% to-transparent"
        aria-hidden="true"
      />

      {/* Content & Play Trigger */}
      <div className="relative z-10 flex w-full flex-col items-start gap-6 p-[clamp(24px,5vw,64px)] pb-14 sm:flex-row sm:items-end sm:gap-8">
        <button
          type="button"
          aria-label="Play video"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-white/14 backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer"
        >
          <svg
            viewBox="0 0 12 14"
            className="ml-0.5 size-3 fill-white"
            aria-hidden="true"
          >
            <path d="M0 0l12 7-12 7z" />
          </svg>
        </button>

        <Reveal className="max-w-[640px]">
          <h3 className="mb-2.5 text-balance text-[clamp(1.3rem,2.2vw,1.7rem)] font-medium tracking-[-0.02em] text-white">
            Built to perform, wherever the work is
          </h3>
          <p className="text-[14.5px] leading-[1.6] text-white/70">
            Every system we supply is proven under the conditions it will
            actually face &mdash; validated on site, not just on a data sheet,
            before it ever reaches a project.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
