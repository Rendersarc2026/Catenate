import { Reveal } from "@/components/site/reveal";

export function AboutFeature() {
  return (
    <section
      className="relative bg-black px-[clamp(24px,5vw,64px)] text-white"
      aria-label="On-site application feature"
    >
      <Reveal className="mx-auto max-w-[1000px]">
        <h3 className="mb-2.5 max-w-[640px] text-balance text-[clamp(1.3rem,2.2vw,1.7rem)] leading-[1.25] font-medium tracking-[-0.02em] text-white">
          Built to perform, wherever the work is
        </h3>
        <p className="max-w-[640px] text-[14.5px] leading-[1.6] text-white/70">
          Every system we supply is proven under the conditions it will actually
          face &mdash; validated on site, not just on a data sheet, before it
          ever reaches a project.
        </p>
      </Reveal>
    </section>
  );
}
