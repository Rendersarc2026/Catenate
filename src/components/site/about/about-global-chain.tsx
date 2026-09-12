import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";

export function AboutGlobalChain() {
  return (
    <>
      {/* The chain is global intro section */}
      <section className="relative bg-white px-[clamp(24px,5vw,64px)] py-[clamp(70px,9vw,120px)] text-[#1a1d2e]">
        <Reveal className="mx-auto max-w-[640px] text-center">
          <h2 className="mb-4 text-balance text-[clamp(1.7rem,3vw,2.3rem)] font-medium tracking-[-0.02em] text-[#1a1d2e]">
            The chain is global
          </h2>
          <p className="mx-auto mb-[34px] max-w-[60ch] text-[16px] leading-[1.6] text-[#767c93]">
            We connect the world&apos;s most trusted material brands to the
            industries that build with them &mdash; bonding, sealing and
            protection systems, moved with the same discipline every time.
            Explore the alliance, the reach and the systems behind every
            delivery.
          </p>
          <Link
            href="/brands"
            className="inline-flex items-center gap-3 rounded-[2px] border border-[#1a1d2e] px-6.5 py-3.25 text-[14px] font-medium text-[#1a1d2e] transition-colors duration-200 hover:bg-[#1a1d2e] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1d2e]/70"
          >
            Explore our alliance
          </Link>
        </Reveal>
      </section>

      {/* Full-width Panorama Port Photography */}
      <div className="relative h-[64vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src="/images/about/global-chain.webp"
          alt="Aerial view of multimodal global supply chain with container ship, freight transit, and cargo aircraft"
          fill
          sizes="100vw"
          className="object-cover brightness-[0.95]"
        />
      </div>
    </>
  );
}
