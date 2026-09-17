"use client";

import * as React from "react";

import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    title: "Distribution",
    description:
      "Hold stock across the full range and release it against programme.",
  },
  {
    title: "Technical support",
    description:
      "On-site guidance from specification to application, backed by principals.",
  },
  {
    title: "Logistics",
    description:
      "Deliveries planned around the site, not the warehouse calendar.",
  },
];

export function AboutPowerBuild() {
  const [activePillar, setActivePillar] = React.useState(0);

  return (
    <section className="relative flex min-h-svh flex-col justify-center bg-black px-[clamp(24px,5vw,64px)] py-[clamp(70px,9vw,120px)] text-white">
      {/* Narrative */}
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col items-center text-center">
          <h2 className="mb-4 text-balance text-[clamp(1.5rem,2.6vw,2rem)] font-medium tracking-[-0.02em] text-white">
            Power every build
          </h2>
          <p className="max-w-[60ch] text-[15px] leading-[1.6] text-white/72">
            We design a supply chain that scales with the project, not against
            it. Our distribution network, technical support and logistics work
            together so the right material reaches site before it&apos;s needed
            &mdash; not after a delay is already costing the programme.
          </p>
        </div>
      </Reveal>

      {/* 3 Interactive Supply Chain Pillars */}
      <Reveal stagger step={90} className="mx-auto mt-14 w-full max-w-[1240px]">
        <div className="grid grid-cols-1 border-t border-white/16 md:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const isActive = activePillar === index;
            return (
              <button
                key={pillar.title}
                type="button"
                onClick={() => setActivePillar(index)}
                onMouseEnter={() => setActivePillar(index)}
                className={cn(
                  "-mt-[1px] border-t-2 pt-5.5 text-left transition-all duration-200 cursor-pointer focus-visible:outline-none",
                  isActive
                    ? "border-white"
                    : "border-transparent hover:border-white/30"
                )}
              >
                <h4
                  className={cn(
                    "mb-1.5 text-[14.5px] font-semibold transition-colors duration-200",
                    isActive ? "text-white" : "text-white/40"
                  )}
                >
                  {pillar.title}
                </h4>
                <p
                  className={cn(
                    "max-w-[32ch] text-[13px] leading-[1.5] transition-colors duration-200",
                    isActive ? "text-white/65" : "text-white/40"
                  )}
                >
                  {pillar.description}
                </p>
              </button>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
