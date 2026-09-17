import Image from "next/image";

import { Reveal } from "@/components/site/reveal";

export function AboutFeature() {
  return (
    <section
      className="relative isolate flex w-full flex-col overflow-hidden bg-black text-white md:h-[78vh] md:min-h-[460px] md:flex-row md:items-end"
      aria-label="On-site application feature"
    >
      {/* Background image. On narrow screens a tall crop would lose the ship
          and the aircraft, so the photograph keeps its own proportions and the
          copy sets underneath it. */}
      <div className="relative aspect-[1672/941] w-full md:absolute md:inset-0 md:z-0 md:aspect-auto">
        <Image
          src="/images/about/global-chain.webp"
          alt="Aerial view of a container ship, freight truck and cargo aircraft"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.75]"
        />

        {/* Atmospheric scrim; stacked, it only feathers the photo's foot into
            the black beneath. */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent via-35% to-transparent md:from-black/85 md:via-black/30 md:via-40%"
          aria-hidden="true"
        />
      </div>

      {/* Content & Play Trigger */}
      <div className="relative z-10 flex w-full flex-col items-start gap-5 p-[clamp(24px,5vw,64px)] pt-2 pb-14 sm:flex-row sm:items-end sm:gap-8 md:pt-[clamp(24px,5vw,64px)]">
        <Reveal className="max-w-[640px]">
          <h3 className="mb-2.5 text-balance text-[clamp(1.3rem,2.2vw,1.7rem)] leading-[1.25] font-medium tracking-[-0.02em] text-white">
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
