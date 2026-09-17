/*
 * "What we do" — the statement that opens the section.
 */

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-white">
      <div className="section flex min-h-dvh items-center">
        <div className="content-pad grid w-full items-center gap-x-[clamp(32px,6vw,96px)] gap-y-8 max-lg:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <h2 className="flex items-center gap-[0.3em] text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.05] tracking-[-0.03em]">
            What we do
            {/* Sized in em so the arrow keeps its proportion to the heading. */}
            <svg
              viewBox="0 0 80 54"
              aria-hidden="true"
              className="relative top-[0.02em] h-[0.32em] w-[0.47em] shrink-0 fill-none stroke-current"
            >
              <path
                d="M1 27h78M52 1l27 26-27 26"
                strokeWidth={1.25}
                vectorEffect="non-scaling-stroke"
              />
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
