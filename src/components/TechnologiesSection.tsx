"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { TECHS_DATA, TechItem } from "@/data/catenateData";

export const TechnologiesSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleTech = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-white text-[#1A1D2E] sec-pad" id="technologies">
      <div className="mb-12">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#767C93] mb-3 block">
          Technologies
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight">
          Four chemistries, four sets of rules.
        </h2>
      </div>

      <div className="border-t border-[#1A1D2E]/10">
        {TECHS_DATA.map((tech: TechItem, idx: number) => {
          const isOpen = openIdx === idx;
          return (
            <div key={tech.n} className="border-b border-[#1A1D2E]/10">
              <button
                onClick={() => toggleTech(idx)}
                className="w-full grid grid-cols-[40px_1fr_auto] gap-4 sm:gap-6 items-center py-6 px-2 text-left hover:bg-[#1B2A7A]/[0.03] transition-colors cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="font-mono text-xs text-[#767C93] group-hover:translate-x-1 transition-transform">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="text-xl sm:text-2xl font-medium text-[#1A1D2E] tracking-tight block">
                    {tech.n}
                  </span>
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

              {isOpen && (
                <div className="pb-8 pt-2 px-4 sm:px-12 animate-in fade-in duration-200">
                  <p className="text-base text-[#767C93] leading-relaxed mb-6 max-w-3xl">
                    {tech.d}
                  </p>

                  {/* Specification Table */}
                  <div className="bg-[#F7F8FB] rounded-2xl p-6 sm:p-8 border border-[#1A1D2E]/[0.06]">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                      {tech.s.map((specRow, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex justify-between items-center py-2.5 border-b border-[#1A1D2E]/[0.06] text-sm"
                        >
                          <dt className="text-[#767C93] font-normal">{specRow[0]}</dt>
                          <dd className="font-medium text-[#1A1D2E] font-mono text-right">
                            {specRow[1]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
