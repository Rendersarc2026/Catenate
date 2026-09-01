"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "@/data/catenateData";

export const ProjectsRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (railRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      railRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#F7F8FB] text-[#1A1D2E] pt-16 sm:pt-24 pb-16 overflow-hidden" id="projects">
      {/* Section Header with Controls */}
      <div className="max-w-[1180px] mx-auto px-6 sm:px-12 mb-8 flex justify-between items-end">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#767C93] mb-3 block">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight">
            Where the chain held.
          </h2>
        </div>

        {/* Scroll Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-[#1A1D2E]/15 bg-white hover:bg-[#1B2A7A] hover:text-white hover:border-[#1B2A7A] text-[#1A1D2E] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-[#1A1D2E]/15 bg-white hover:bg-[#1B2A7A] hover:text-white hover:border-[#1B2A7A] text-[#1A1D2E] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Snap Horizontal Rail */}
      <div
        ref={railRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto px-6 sm:px-12 snap-x snap-mandatory scrollbar-none max-w-[1180px] mx-auto pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {PROJECTS_DATA.map((proj: ProjectItem, idx: number) => (
          <article
            key={idx}
            className="flex-none w-[270px] sm:w-[320px] snap-start group cursor-pointer"
          >
            {/* Image Box */}
            <div className="rounded-[24px] overflow-hidden aspect-[3/4] bg-[#dfe3ef] relative mb-4 shadow-sm group-hover:shadow-lg transition-shadow">
              <Image
                src={proj.img}
                alt={proj.n}
                fill
                sizes="(max-width: 768px) 270px, 320px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Info */}
            <h3 className="text-lg sm:text-xl font-medium text-[#1A1D2E] group-hover:text-[#1B2A7A] transition-colors leading-snug">
              {proj.n}
            </h3>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#767C93] mt-1.5 font-mono">
              {proj.s}
            </span>
            <p className="text-xs sm:text-sm text-[#767C93] mt-2 line-clamp-2 leading-relaxed">
              {proj.y}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
