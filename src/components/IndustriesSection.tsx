"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { INDUSTRIES_DATA, IndustryItem } from "@/data/catenateData";

export const IndustriesSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const activeBgImage =
    hoveredId !== null
      ? INDUSTRIES_DATA[hoveredId]?.image
      : openId !== null
      ? INDUSTRIES_DATA[openId]?.image
      : INDUSTRIES_DATA[0]?.image;

  return (
    <section className="relative bg-[#F7F8FB] text-[#1A1D2E] sec-pad overflow-hidden" id="industries">
      {/* Dynamic Background Image Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-700 opacity-[0.06]">
        {INDUSTRIES_DATA.map((ind) => (
          <div
            key={ind.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              (hoveredId === ind.id || (hoveredId === null && openId === ind.id))
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <Image
              src={ind.image}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.4fr] gap-10 lg:gap-16 items-start">
        {/* Left Sticky Column */}
        <div className="lg:sticky lg:top-28">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#767C93] mb-4 block">
            Industries we serve
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight mb-5 text-balance">
            The sector decides the specification.
          </h2>
          <p className="text-[#767C93] text-base leading-relaxed mb-6">
            The same bond line behaves differently under a food plant washdown, a harbour tide and a warehouse forklift. Sector context sets the chemistry, the cure window and the approval the system has to carry.
          </p>
          <div className="hidden lg:block p-5 bg-white rounded-2xl border border-[#1A1D2E]/[0.08] shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1B2A7A] block mb-1">
              Field Experience
            </span>
            <p className="text-xs text-[#767C93] leading-relaxed">
              14 specialized industrial sectors supplied with technical attendance and compatibility warranties.
            </p>
          </div>
        </div>

        {/* Right Column: Custom Accordion List */}
        <div className="border-t border-[#1A1D2E]/10">
          {INDUSTRIES_DATA.map((ind: IndustryItem) => {
            const isOpen = openId === ind.id;
            return (
              <div
                key={ind.id}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="border-b border-[#1A1D2E]/10 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleRow(ind.id)}
                  className="w-full grid grid-cols-[40px_1fr_auto] gap-4 sm:gap-6 items-center py-5 sm:py-6 px-2 text-left hover:bg-[#1B2A7A]/[0.03] transition-colors cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-xs text-[#767C93] group-hover:translate-x-1 transition-transform">
                    {String(ind.id + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-lg sm:text-2xl font-medium text-[#1A1D2E] tracking-tight block">
                      {ind.n}
                    </span>
                    {!isOpen && (
                      <span className="text-xs sm:text-sm text-[#767C93] font-normal block mt-1 line-clamp-1">
                        {ind.c}
                      </span>
                    )}
                  </div>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[#1B2A7A] text-white rotate-45"
                        : "bg-[#1A1D2E]/[0.06] text-[#767C93] group-hover:bg-[#1B2A7A]/10 group-hover:text-[#1B2A7A]"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                {/* Collapsible Panel */}
                {isOpen && (
                  <div className="pb-8 pt-2 px-4 sm:px-12 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 bg-white/70 p-6 rounded-2xl border border-[#1A1D2E]/[0.06]">
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#767C93] mb-2">
                          Typical challenge
                        </h4>
                        <p className="text-sm text-[#1A1D2E]/85 leading-relaxed">
                          {ind.c}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#767C93] mb-2">
                          Systems that answer it
                        </h4>
                        <ul className="text-sm text-[#1A1D2E]/85 space-y-1">
                          {ind.f.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B2A7A]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#767C93] mb-2">
                          Reference project
                        </h4>
                        <p className="text-sm font-medium text-[#1B2A7A] leading-relaxed">
                          {ind.p}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
