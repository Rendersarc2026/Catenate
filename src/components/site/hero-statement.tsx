import { Reveal } from "@/components/site/reveal"

/**
 * Clean statement section with a white background placed right under the hero image.
 * Structured into exactly 2 lines.
 */
export function HeroStatement() {
  return (
    <section className="content-pad bg-white py-[clamp(64px,7.5vw,110px)] border-b border-ink/8">
      <Reveal className="mx-auto flex max-w-[1420px] flex-col items-center text-center">
        <h2 className="text-[clamp(1.35rem,2.25vw,2.2rem)] leading-[1.38] font-medium tracking-[-0.018em] text-ink">
          <span className="block whitespace-normal md:whitespace-nowrap">
            A global market intelligence &amp; distribution platform built around
          </span>
          <span className="block whitespace-normal md:whitespace-nowrap mt-1 md:mt-0.5">
            Trusted Brands, Efficient Teams, Technical knowhow &amp; Dependable Supply Chain.
          </span>
        </h2>
      </Reveal>
    </section>
  )
}
