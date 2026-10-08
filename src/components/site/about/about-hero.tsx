import Image from "next/image";

import { Reveal } from "@/components/site/reveal";

// A stat leads with either a figure or an icon; the label sits beneath it.
const STATS = [
  { value: "150+", label: "Employees" },
  {
    label: "One Mission",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
      </>
    ),
  },
  { value: "1,500+", label: "Customers served" },
];

export function AboutHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex h-screen h-dvh min-h-[560px] w-full flex-col justify-between overflow-hidden text-white select-none"
      aria-label="About Us Hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/about-hero-sunset.webp"
          alt="Clear sky at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.9]"
        />
      </div>

      {/* Scrim Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-b from-black/35 via-transparent via-40% to-black/25"
        aria-hidden="true"
      />

      {/* Title & Subtitle */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center px-6 pt-[120px] text-center">
        <Reveal>
          <h1 className="mb-2.5 text-balance text-[clamp(2.2rem,5vw,3.2rem)] font-medium tracking-[-0.02em] text-white">
            About Us
          </h1>
          <p className="mx-auto max-w-[60ch] text-balance text-[15px] text-white/75">
            Connecting the world&apos;s trusted brands to the builders who need them
          </p>
        </Reveal>
      </div>

      {/* Bottom Bar: 3 Key Stats */}
      <div className="relative z-10 px-[clamp(16px,5vw,64px)] pb-[clamp(48px,10vh,104px)] pt-[26px]">
        {/* Each stat rises in after the one before it. */}
        <Reveal
          stagger
          step={140}
          role="list"
          className="mx-auto grid w-full max-w-[1100px] grid-cols-3 gap-x-4"
        >
          {STATS.map(({ value, label, icon }) => (
            // Figure (or icon) on top, label centred beneath; the fixed top row keeps labels level.
            <div key={label} role="listitem" className="flex flex-col items-center gap-[clamp(10px,1.6vw,20px)] text-center">
              <div className="flex h-[clamp(36px,4.2vw,56px)] items-center">
                {icon ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-full w-auto fill-none stroke-white stroke-[1.4] [stroke-linecap:round] [stroke-linejoin:round]"
                  >
                    {icon}
                  </svg>
                ) : (
                  <p className="text-[clamp(1.6rem,3.4vw,2.75rem)] leading-none font-semibold tracking-[-0.02em] text-white">
                    {value}
                  </p>
                )}
              </div>
              <p className="text-[clamp(13px,1.5vw,20px)] leading-tight font-medium text-white">{label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
