import Image from "next/image";

import { Reveal } from "@/components/site/reveal";
import { images, industries } from "@/data/catenate";

const bySlug = (slug: string) => industries.find((i) => i.slug === slug)!;

/** The feature card and the four tiles beneath it, keyed by industry slug. */
const FEATURE = bySlug("building-infrastructure");
const TILES = [
  bySlug("oil-gas-petrochemical"),
  bySlug("water-wastewater"),
  bySlug("marine-offshore"),
  bySlug("food-beverage"),
];
/** A quieter row of sectors, shown as thumbnails rather than full panels. */
const THUMBS = [
  bySlug("automotive-transport"),
  bySlug("packaging-converting"),
  bySlug("metals-fabrication"),
  bySlug("hvac-plumbing"),
];

/*
 * "Industries served" — a bento of photographed panels over a paper ground.
 * One wide feature leads, four tiles follow, and a thumbnail row closes it
 * out, so the section reads from a single statement down to a quick index.
 */
export function AboutIndustries() {
  return (
    <section
      id="industries"
      className="section bg-off text-ink"
      aria-labelledby="industries-title"
    >
      <div className="mx-auto max-w-[var(--content-max)]">
        <Reveal className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-blue">Industries served</span>
            <h2
              id="industries-title"
              className="text-balance text-[clamp(2rem,5vw,3.6rem)] leading-[1.02] font-medium tracking-[-0.02em]"
            >
              Trusted across
              <br />
              every sector.
            </h2>
          </div>
          <p className="max-w-[42ch] text-[16px] leading-[1.6] text-grey">
            Our systems are specified on landmark towers, energy plants and
            production lines alike &mdash; matched to the condition, not the
            catalogue.
          </p>
        </Reveal>

        <Reveal stagger step={90} className="grid gap-4 md:grid-cols-2">
          {/* Wide feature */}
          <article className="group relative isolate flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[4px] p-[clamp(24px,3vw,40px)] text-white md:col-span-2">
            <PanelImage slug={FEATURE.slug} alt={FEATURE.name} priority />
            <span className="text-[13px] font-medium tracking-[0.14em] uppercase opacity-75">
              {FEATURE.name}
            </span>
            <div>
              <h3 className="mb-3 max-w-[18ch] text-balance text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.02em]">
                Towers, transit and civil works
              </h3>
              <p className="max-w-[48ch] text-[15px] leading-[1.6] text-white/85">
                {FEATURE.challenge}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {FEATURE.systems.map((system) => (
                  <span
                    key={system}
                    className="rounded-full bg-white/15 px-3 py-1.5 text-[12px] font-medium backdrop-blur-sm"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Tiles */}
          {TILES.map((tile) => (
            <article
              key={tile.slug}
              className="group relative isolate flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[4px] p-[clamp(24px,3vw,36px)] text-white"
            >
              <PanelImage slug={tile.slug} alt={tile.name} />
              <span className="text-[13px] font-medium tracking-[0.14em] uppercase opacity-75">
                {tile.name}
              </span>
              <p className="max-w-[40ch] text-[15px] leading-[1.55] text-white/85">
                {tile.challenge}
              </p>
            </article>
          ))}
        </Reveal>

        <Reveal stagger step={80} className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {THUMBS.map((thumb) => (
            <figure key={thumb.slug} className="group m-0">
              <div className="mb-3.5 aspect-4/3 overflow-hidden rounded-[4px] bg-ink/5">
                <Image
                  src={images.industry(thumb.slug)}
                  alt={thumb.name}
                  width={480}
                  height={360}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
                />
              </div>
              <figcaption>
                <b className="block text-[17px] font-medium tracking-[-0.01em]">
                  {thumb.name}
                </b>
                <span className="text-[14px] text-grey">{thumb.systems[0]}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** The photographed ground of a panel, under a legibility scrim. */
function PanelImage({
  slug,
  alt,
  priority = false,
}: {
  slug: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={images.industry(slug)}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className="-z-10 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/90"
      />
    </>
  );
}
