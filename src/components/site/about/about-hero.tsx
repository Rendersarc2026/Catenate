import Image from "next/image";

import { Reveal } from "@/components/site/reveal";

const STATS = [
  {
    value: "150+",
    label: "Employees",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6" />
      </>
    ),
  },
  {
    value: "One Mission",
    label: null,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
      </>
    ),
  },
  {
    value: "1,500+",
    label: "Customers served",
    icon: <path d="M20 6L9 17l-5-5" />,
  },
];

export function AboutHero() {
  return (
    <section
      id="hero"
      className="relative isolate flex h-[64vh] min-h-[380px] w-full flex-col justify-between overflow-hidden text-white select-none"
      aria-label="About Us Hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/hero-sky.webp"
          alt="Sunrise sky over distant mountain ridges"
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
      <div className="relative z-10 flex justify-end px-[clamp(24px,5vw,64px)] pb-[34px] pt-[26px]">
        <ul className="flex flex-wrap items-start gap-x-14 gap-y-5">
          {STATS.map(({ value, label, icon }) => (
            <li key={value} className="flex items-start gap-3">
              <span className="grid h-6 w-5 shrink-0 place-items-center" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px] fill-none stroke-white stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
                >
                  {icon}
                </svg>
              </span>
              <div>
                <p className="text-[16px] leading-6 font-semibold text-white">{value}</p>
                {label && <p className="text-[11.5px] leading-4 text-white/70">{label}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
