import { Reveal } from "@/components/site/reveal";
import { regions } from "@/data/catenate";

/** Regions a country sits in, keyed by the country name. */
const REGION_LABEL: Record<string, string> = {
  Oman: "Middle East",
  UAE: "Middle East",
  Qatar: "Middle East",
  UK: "Europe",
};

const CAPABILITIES = [
  "Local branch",
  "In-country stock",
  "On-site technical support",
  "Principal brands stocked",
];

const numeral = (index: number) => String(index + 1).padStart(2, "0");

/*
 * "Countries served" — a dark band. Each market is a column on one ruled row:
 * the index sits small at the top, the country name large below it, and a
 * hairline runs the full width as the amber rule fills in on hover.
 */
export function AboutCountries() {
  return (
    <section
      id="countries"
      className="section on-blue bg-ink text-white"
      aria-labelledby="countries-title"
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <Reveal className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-amber">Countries served</span>
            <h2
              id="countries-title"
              className="text-balance text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.02em]"
            >
              Four countries.
              <br />
              One standard.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[16px] leading-[1.6] text-white/55">
            From the Gulf to the United Kingdom, every market we serve has its
            own branch, local stock and technical team.
          </p>
        </Reveal>

        <Reveal stagger step={90}>
          <ol className="grid grid-cols-2 lg:grid-cols-4">
            {regions.map((region, index) => (
              <li
                key={region.name}
                className="group relative border-t border-white/10 px-6 pt-6 pb-7 lg:border-l lg:first:border-l-0 lg:first:pl-0"
              >
                {/* The amber rule that fills in across the top on hover. */}
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100"
                />
                <span className="tnum text-[12px] font-medium tracking-[0.14em] text-white/45">
                  {numeral(index)}
                </span>
                <h3 className="mt-[clamp(28px,5vw,56px)] text-[clamp(1.9rem,3.2vw,2.8rem)] font-medium tracking-[-0.02em]">
                  {region.name}
                </h3>
                <span className="text-[14px] text-white/55">
                  {REGION_LABEL[region.name] ?? region.markets}
                </span>
              </li>
            ))}
          </ol>

          <ul className="mt-[clamp(40px,5vw,56px)] flex flex-wrap gap-x-10 gap-y-3 border-t border-white/10 pt-6 text-[15px] text-white/75">
            {CAPABILITIES.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span aria-hidden className="size-1.5 rounded-full bg-amber" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
