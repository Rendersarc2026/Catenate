import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";

export function SolutionsFinderTeaser() {
  return (
    <section id="solutions-finder-teaser" className="section bg-white">
      <Reveal>
        <Link
          href="/solutions-finder"
          className="group relative flex min-h-[360px] w-full flex-col justify-between overflow-hidden rounded-block p-8 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 ease-expo hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite focus-visible:ring-offset-4 sm:min-h-[420px] sm:p-12 lg:min-h-[460px] lg:p-16"
          aria-label="Find the right solution for the job — Open Solutions Finder"
        >
          {/* Background Landscape Banner Image */}
          <Image
            src="/images/solutions-finder-banner.jpg"
            alt="Misty mountain landscape"
            fill
            priority
            sizes="(max-width: 1520px) 100vw, 1520px"
            className="object-cover object-bottom transition-transform duration-700 ease-expo group-hover:scale-105"
          />

          {/* Subtle mist scrim on left/top to guarantee crisp text readability */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent transition-opacity duration-500 group-hover:opacity-65"
            aria-hidden="true"
          />

          {/* Editorial Content */}
          <div className="relative z-10 max-w-[620px]">
            <span className="eyebrow mb-3 text-ink/70">
              Solutions Finder
            </span>
            <h2 className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.025em] text-balance text-ink transition-colors duration-200 group-hover:text-graphite">
              Find the right
              <br />
              solution for the job.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.65] text-ink/85 sm:text-[17px]">
              Tell us what you&rsquo;re working on. We&rsquo;ll help you find the
              right system for the application.
            </p>
          </div>

          {/* Interactive CTA Badge */}
          <div className="relative z-10 mt-8 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[12px] font-semibold tracking-wide text-white uppercase transition-all duration-300 ease-expo group-hover:bg-graphite">
              Launch Finder
              <ArrowRight className="size-3.5 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
