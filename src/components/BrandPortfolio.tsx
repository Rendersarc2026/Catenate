"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { BRANDS_DATA, BrandItem } from "@/data/catenateData";

export const BrandPortfolio: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleBrand = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="bg-white text-[#1A1D2E] sec-pad" id="brands">
      <div className="mb-12">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#767C93] mb-3 block">
          Brands and products
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight">
          Five principals. Twenty-eight product families.
        </h2>
      </div>

      <div className="border-t border-[#1A1D2E]/10">
        {BRANDS_DATA.map((brand: BrandItem, idx: number) => {
          const isOpen = openIdx === idx;
          return (
            <div key={brand.n} className="border-b border-[#1A1D2E]/10">
              <button
                onClick={() => toggleBrand(idx)}
                className="w-full grid grid-cols-[40px_1fr_auto] gap-4 sm:gap-6 items-center py-6 px-2 text-left hover:bg-[#1B2A7A]/[0.03] transition-colors cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="font-mono text-xs text-[#767C93] group-hover:translate-x-1 transition-transform">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="text-xl sm:text-2xl font-medium text-[#1A1D2E] tracking-tight block">
                    {brand.n}
                  </span>
                  <span className="text-xs sm:text-sm text-[#767C93] font-normal block mt-1">
                    {brand.d}
                  </span>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="text-xs font-mono font-medium text-[#767C93] bg-[#F7F8FB] px-3 py-1 rounded-full hidden sm:block">
                    {brand.c}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[#1B2A7A] text-white rotate-45"
                        : "bg-[#1A1D2E]/[0.06] text-[#767C93] group-hover:bg-[#1B2A7A]/10 group-hover:text-[#1B2A7A]"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="pb-8 pt-2 px-4 sm:px-12 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#F7F8FB] p-6 sm:p-8 rounded-2xl border border-[#1A1D2E]/[0.06]">
                    {brand.groups.map((grp, gIdx) => (
                      <div key={gIdx} className="space-y-3">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#767C93]">
                          {grp.t}
                        </h4>
                        <ul className="space-y-2 text-sm text-[#1A1D2E]/85">
                          {grp.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B2A7A]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
