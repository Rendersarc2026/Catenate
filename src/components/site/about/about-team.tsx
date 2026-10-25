import { Reveal } from "@/components/site/reveal";

/** How the team shows up for a project — the three standing commitments. */
const FUNCTIONS = [
  {
    key: "Supply",
    title: "Supply you can plan around",
    body: "The full range stocked locally and released in line with each project's schedule.",
  },
  {
    key: "Technical support",
    title: "Expertise on site",
    body: "Specialists who support every stage, from specification to application, alongside our brand partners.",
  },
  {
    key: "Logistics",
    title: "Delivery on schedule",
    body: "Every order tracked from principal to site, so nothing depends on a single link holding.",
  },
];

const VALUES = [
  {
    title: "Integrity",
    body: "We recommend what the project needs, nothing more.",
  },
  {
    title: "Proven performance",
    body: "Every system is tested and validated before it reaches site.",
  },
  {
    title: "Long-term partnership",
    body: "Relationships with brands and customers built over fifteen years.",
  },
];

/*
 * "Our team" — a dark hero sets the claim, then a paper section lays out the
 * people behind it: the team in a photograph, the three functions they run,
 * and the values that hold under pressure.
 */
export function AboutTeam() {
  return (
    <>
      {/* Team hero */}
      <section
        id="team"
        className="on-blue relative isolate flex min-h-[min(80vh,720px)] items-end overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(80% 90% at 70% 20%, #3a3f52 0%, #2c303f 45%, #1a1d2e 100%)",
        }}
        aria-labelledby="team-title"
      >
        <div className="section mx-auto w-full max-w-[var(--content-max)] py-[clamp(48px,8vw,96px)]">
          <Reveal>
            <span className="eyebrow text-amber">Our team</span>
            <h2
              id="team-title"
              className="max-w-[16ch] text-balance text-[clamp(2.2rem,6vw,4.4rem)] leading-[1] font-medium tracking-[-0.02em]"
            >
              Experienced people. Proven expertise.
            </h2>
            <p className="mt-5 max-w-[48ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-white/70">
              Our engineers, specialists and account teams bring deep product
              knowledge and stay accountable from specification to completion.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Team body */}
      <section className="section bg-white text-ink">
        <div className="mx-auto max-w-[var(--content-max)]">
          <Reveal className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-blue">How we work</span>
              <h3 className="text-balance text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.08] font-medium tracking-[-0.02em]">
                Led by industry experience
              </h3>
            </div>
            <p className="max-w-[40ch] text-[16px] leading-[1.6] text-grey">
              Decades of combined experience in construction materials and
              industrial supply, carried into every specification.
            </p>
          </Reveal>

          <Reveal stagger step={90} className="grid gap-4 md:grid-cols-3">
            {FUNCTIONS.map((fn) => (
              <div key={fn.key} className="rounded-[4px] bg-off p-8">
                <span className="eyebrow mb-3 text-blue">{fn.key}</span>
                <h4 className="mb-2.5 text-[clamp(1.2rem,1.6vw,1.5rem)] font-medium tracking-[-0.015em]">
                  {fn.title}
                </h4>
                <p className="text-[15px] leading-[1.6] text-grey">{fn.body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal
            stagger
            step={90}
            className="mt-[clamp(48px,7vw,88px)] grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-3"
          >
            {VALUES.map((value) => (
              <div key={value.title}>
                <h4 className="mb-2 text-[clamp(1.1rem,1.4vw,1.3rem)] font-medium tracking-[-0.015em]">
                  {value.title}
                </h4>
                <p className="text-[15px] leading-[1.6] text-grey">
                  {value.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
