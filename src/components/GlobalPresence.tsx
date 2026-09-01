"use client";

import React, { useState, useEffect, useRef } from "react";
import { LAND_MATRIX, REGIONS_DATA, PRESENCE_STATS, INDUSTRIES_DATA } from "@/data/catenateData";
import { Badge } from "./ui/badge";

export const GlobalPresence: React.FC = () => {
  const [litRegion, setLitRegion] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated Count-Up Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 1400;
            const startTime = performance.now();

            const step = (now: number) => {
              const progress = Math.min(1, (now - startTime) / duration);
              // cubic ease out: 1 - Math.pow(1 - progress, 3)
              const ease = 1 - Math.pow(1 - progress, 3);
              const currentCounts = PRESENCE_STATS.map((stat) =>
                Math.round(stat.value * ease)
              );
              setCounts(currentCounts);

              if (progress < 1) {
                requestAnimationFrame(step);
              }
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  // World Map Dimensions
  const SX = 10.2;
  const SY = 10.4;
  const OX = 8;
  const OY = 6;

  return (
    <section className="bg-[#1B2A7A] text-white sec-pad" id="presence">
      {/* Top Header */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-16 items-end mb-10 sm:mb-14">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-3 block">
            Global presence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-normal leading-[1.2] tracking-tight text-balance">
            Specified in 38 markets, across four regions.
          </h2>
        </div>
        <p className="text-base sm:text-lg text-white/75 font-normal leading-relaxed">
          Held stock, technical attendance and approved systems, wherever the programme runs.
        </p>
      </div>

      {/* World Map & Region Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_0.75fr] gap-8 lg:gap-14 items-center pb-12 sm:pb-16 border-b border-white/15">
        {/* SVG World Map */}
        <div className="w-full relative overflow-hidden rounded-2xl bg-[#101B52]/40 p-4 sm:p-6 border border-white/10">
          <svg
            viewBox="0 0 660 300"
            className="w-full h-auto"
            role="img"
            aria-label="Map showing Catenate global presence"
          >
            {/* Background Land Dots */}
            {LAND_MATRIX.map((row, r) =>
              row.map((range, rangeIdx) => {
                const dots = [];
                for (let c = range[0]; c <= range[1]; c++) {
                  dots.push(
                    <circle
                      key={`land-${r}-${rangeIdx}-${c}`}
                      className="dot-land"
                      cx={(OX + c * SX).toFixed(1)}
                      cy={(OY + r * SY).toFixed(1)}
                      r="1.7"
                    />
                  );
                }
                return dots;
              })
            )}

            {/* Active Live Presence Dots and Halos */}
            {REGIONS_DATA.map((region) =>
              region.pts.map((pt, ptIdx) => {
                const cx = (OX + pt[0] * SX).toFixed(1);
                const cy = (OY + pt[1] * SY).toFixed(1);
                const isLit = litRegion === region.id;
                const isDimmed = litRegion !== null && !isLit;

                return (
                  <g key={`live-${region.id}-${ptIdx}`}>
                    {/* Glowing Halo */}
                    <circle
                      className="dot-halo"
                      cx={cx}
                      cy={cy}
                      r="7.5"
                      style={{
                        opacity: isLit ? 0.65 : 0,
                        stroke: "#E8B98A",
                        transformOrigin: `${cx}px ${cy}px`,
                      }}
                    />
                    {/* Pulsing Core Dot */}
                    <circle
                      className="dot-live"
                      cx={cx}
                      cy={cy}
                      r="3.2"
                      style={{
                        opacity: isDimmed ? 0.25 : 1,
                        fill: isLit ? "#E8B98A" : "#FFFFFF",
                      }}
                    />
                  </g>
                );
              })
            )}
          </svg>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mt-2 text-right">
            Strategic Distribution Hubs · Oman · UAE · Qatar · UK
          </div>
        </div>

        {/* Regions Selector List */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-white/50 mb-4">
            Active Regional Hubs
          </h4>
          <ul
            className={`divide-y divide-white/15 transition-opacity duration-200 ${
              litRegion !== null ? "regions-dimmed" : ""
            }`}
          >
            {REGIONS_DATA.map((region) => {
              const isLit = litRegion === region.id;
              const isDimmed = litRegion !== null && !isLit;

              return (
                <li
                  key={region.id}
                  onMouseEnter={() => setLitRegion(region.id)}
                  onMouseLeave={() => setLitRegion(null)}
                  className={`py-4 flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                    isDimmed ? "opacity-35" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        isLit ? "bg-[#E8B98A] scale-125 shadow-[0_0_8px_#E8B98A]" : "bg-white/60"
                      }`}
                    />
                    <div>
                      <b className="text-base sm:text-lg font-medium text-white block">
                        {region.n}
                      </b>
                      <span className="text-xs text-white/60 font-normal">
                        {region.desc}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-white/70 group-hover:text-white group-hover:translate-x-1 transition-transform">
                    Active Hub →
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Animated Live Stats Counter */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-12 sm:py-16 border-b border-white/15 text-center lg:text-left"
      >
        {PRESENCE_STATS.map((stat, idx) => (
          <div key={idx}>
            <b className="block text-4xl sm:text-5xl lg:text-[3.6rem] font-light tracking-tight text-white leading-none font-mono">
              {counts[idx]}
              {stat.suffix}
            </b>
            <span className="block text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white/60 mt-3">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Infinite Seamless Ticker */}
      <div className="mt-10 sm:mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" aria-hidden="true">
        <div className="animate-marquee">
          {INDUSTRIES_DATA.concat(INDUSTRIES_DATA).map((ind, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 pr-6 text-sm sm:text-base text-white/60 whitespace-nowrap font-medium"
            >
              {ind.n}
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
