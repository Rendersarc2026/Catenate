import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";

export function AboutNetworkTeam() {
  return (
    <>
      {/* Network & Team Editorial Blocks */}
      <section className="relative bg-black px-[clamp(24px,5vw,64px)] py-[clamp(70px,9vw,120px)] text-white">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-20 sm:gap-28">
          {/* Network Block */}
          <Reveal className="w-full">
            <div className="relative mb-6 aspect-16/9 w-full overflow-hidden rounded-[2px] bg-white/5">
              <Image
                src="/images/about/network-logistics.jpg"
                alt="Distribution and logistics network"
                fill
                sizes="(max-width: 1040px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-10">
              <h3 className="text-balance text-[clamp(1.25rem,2vw,1.55rem)] font-medium tracking-[-0.02em] text-white sm:max-w-[20ch]">
                The network behind every delivery
              </h3>
              <p className="min-w-[260px] flex-1 text-[14.5px] leading-[1.6] text-white/68">
                To move at this scale, we&apos;ve built branches, held stock and
                technical teams across four regions. Every order is tracked from
                principal to project, so nothing depends on a single link
                holding.
              </p>
            </div>
          </Reveal>

          {/* Team Block */}
          <Reveal className="w-full">
            <div className="relative mb-6 aspect-16/9 w-full overflow-hidden rounded-[2px] bg-white/5">
              <Image
                src="/images/about/team-onsite.jpg"
                alt="The Catenate team on site"
                fill
                sizes="(max-width: 1040px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-10">
              <h3 className="text-balance text-[clamp(1.25rem,2vw,1.55rem)] font-medium tracking-[-0.02em] text-white sm:max-w-[20ch]">
                The Catenate team
              </h3>
              <p className="min-w-[260px] flex-1 text-[14.5px] leading-[1.6] text-white/68">
                An integrity-led team that treats every specification as their
                own, long after the delivery note is signed. If you&apos;ve done
                exceptional work in distribution, technical support or
                logistics, we&apos;re glad to talk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wide On-Site Team Photography */}
      <div className="relative h-[66vh] min-h-[340px] w-full overflow-hidden">
        <Image
          src="/images/about/team-wide.jpg"
          alt="Team members on a construction site"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Join Us Section */}
      <section className="relative bg-black px-[clamp(24px,5vw,64px)] pt-[clamp(60px,8vw,100px)] pb-16 text-center text-white">
        <Reveal>
          <h2 className="mb-6.5 text-[clamp(1.6rem,2.8vw,2.1rem)] font-medium tracking-[-0.02em] text-white">
            Join us
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-[2px] border border-white px-6.5 py-3.25 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[#1a1d2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            See openings
          </Link>
        </Reveal>
      </section>

      {/* Illustrative Figures & Equal Opportunity Disclaimers */}
      <div className="border-t border-white/10 bg-[#050711] px-[clamp(24px,5vw,64px)] py-8 text-[12px] leading-[1.7] text-white/45">
        <div className="mx-auto max-w-[1240px]">
          <p className="mb-2">
            Figures are illustrative and reflect our current scale of operation
            as an authorised distributor.
          </p>
          <p>
            Catenate is an equal opportunity employer. All qualified applicants
            will receive consideration for employment without regard to any
            factor unrelated to their ability to do the job.
          </p>
        </div>
      </div>
    </>
  );
}
