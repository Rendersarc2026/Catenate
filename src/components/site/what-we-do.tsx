/*
 * "What we do" — the statement that opens the section.
 */

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-white">
      <div className="section flex min-h-dvh items-center">
        <div className="content-pad grid w-full items-center gap-x-[clamp(32px,6vw,96px)] gap-y-8 max-lg:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <h2 className="flex items-center gap-[clamp(14px,2vw,28px)] text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.05] tracking-[-0.03em] lg:justify-center">
            What we do
            <svg
              viewBox="0 0 40 24"
              aria-hidden="true"
              className="w-[clamp(28px,3vw,44px)] shrink-0 fill-none stroke-grey stroke-[1.4]"
            >
              <path d="M2 12h34M27 3l9 9-9 9" />
            </svg>
          </h2>

          <div className="max-w-[46ch]">
            <h3 className="text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.18] font-normal tracking-[-0.02em]">
              One chain, from global brand to your doorstep.
            </h3>
            <span
              aria-hidden="true"
              className="my-[clamp(18px,2vw,26px)] block h-px w-[76px] bg-ink/25"
            />
            <p className="text-[14.5px] leading-[1.55] text-ink/85">
              We bridge global manufacturers with project requirements through
              products, expertise and supply.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
