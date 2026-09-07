import { Reveal } from "@/components/site/reveal";

export function FinderHero() {
  return (
    <section className="section bg-white pb-[clamp(40px,5vw,72px)]">
      <Reveal>
        <h1 className="max-w-[16ch] text-[clamp(2.1rem,4.6vw,3.7rem)] leading-[1.1] font-medium tracking-[-0.025em] text-balance">
          Find the right solution for the job.
        </h1>
        <p className="lead mt-5.5">
          Tell us what you&rsquo;re working on. We&rsquo;ll help you find the
          right system for the application.
        </p>
      </Reveal>
    </section>
  );
}
