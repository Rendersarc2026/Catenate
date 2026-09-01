"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_STATS } from "@/data/catenateData";
import { Button } from "./ui/button";

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-t-[28px] overflow-hidden min-h-[min(94vh,860px)] flex flex-col justify-between items-center text-center text-white pt-36 sm:pt-44 px-6 sm:px-12 pb-0 select-none"
      id="hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://picsum.photos/seed/catenatehero/1600/1000"
          alt="Catenate global distribution"
          fill
          priority
          className="object-cover saturate-[0.6] contrast-[1.05]"
        />
      </div>

      {/* Hero Scrim Gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(232,185,138,0.34)] via-[rgba(52,58,124,0.78)] to-[rgba(16,27,82,0.96)] pointer-events-none" />

      {/* Hero Content with Parallax Transform */}
      <div
        className="relative z-[2] max-w-[860px] mx-auto transition-transform duration-200 ease-out my-auto"
        style={{
          transform: `translate3d(${tilt.x.toFixed(2)}px, ${tilt.y.toFixed(2)}px, 0)`,
        }}
      >
        {/* Eyebrow */}
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-white/75 mb-6 block">
          Global distribution · Bonding · Sealing · Construction chemicals
        </span>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-[3.8rem] font-light leading-[1.18] tracking-tight mb-6 text-balance text-white">
          <span className="block font-light">Connecting international legacy</span>
          <span className="block font-normal">brands from around the world</span>
          <span className="block font-light">to your doorstep.</span>
        </h1>

        {/* Lead Paragraph */}
        <p className="text-base sm:text-lg text-white/80 max-w-[560px] mx-auto leading-relaxed mb-10 font-normal">
          A global market intelligence &amp; distribution platform built around Trusted Brands, Efficient Teams, Technical knowhow &amp; Dependable Supply Chain.
        </p>

        {/* Dual Call To Actions */}
        <div className="flex items-center justify-center gap-3.5 flex-wrap">
          <Link href="#presence">
            <Button variant="onBlue" size="lg">
              <span>Explore our global network</span>
            </Button>
          </Link>
          <Link href="#brands">
            <Button variant="line" size="lg">
              <span>Our portfolio</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Scale Stats Bar */}
      <div className="relative z-[2] w-full border-t border-white/20 grid grid-cols-2 md:grid-cols-4 mt-12 sm:mt-16 bg-white/[0.03] backdrop-blur-xs">
        {HERO_STATS.map((stat, idx) => (
          <div
            key={idx}
            className={`py-6 sm:py-8 px-4 text-center ${
              idx > 0 ? "border-l border-white/20" : ""
            } ${idx >= 2 ? "max-md:border-t max-md:border-white/20 max-md:border-l-0 max-md:even:border-l" : ""}`}
          >
            <b className="block text-3xl sm:text-4xl lg:text-[2.6rem] font-light tracking-tight text-white leading-none font-mono">
              {stat.value}
            </b>
            <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 mt-2.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
