import Link from "next/link";

import { Reveal } from "@/components/site/reveal";

/*
 * "Join Catenate" — the closing invitation. A centred statement over paper,
 * sending anyone who reads this far to the contact channels.
 */
export function AboutCareers() {
  return (
    <section id="careers" className="section bg-off text-ink">
      <Reveal className="mx-auto max-w-[640px] text-center">
        <h2 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-medium tracking-[-0.02em]">
          Join Catenate
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-grey">
          We&apos;re looking for talented people in distribution, technical
          support and logistics who treat every specification as their own.
        </p>
        <Link
          href="/#contact"
          className="mt-8 inline-flex items-center gap-3 rounded-[2px] bg-ink px-6.5 py-3.25 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/70"
        >
          View open roles
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </Reveal>
    </section>
  );
}
