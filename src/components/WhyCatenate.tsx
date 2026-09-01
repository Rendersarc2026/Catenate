import React from "react";
import { WHY_POINTS } from "@/data/catenateData";

export const WhyCatenate: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 bg-white px-4 sm:px-6">
      <div className="max-w-[1132px] mx-auto rounded-[24px] bg-gradient-to-br from-[#1B2A7A] to-[#101B52] text-white p-8 sm:p-14 lg:p-18 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-4 block">
              Why Catenate
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight text-balance text-white">
              Specification is the product. Everything else is logistics.
            </h2>
          </div>

          {/* Right Column: Numbered List */}
          <ul className="space-y-6">
            {WHY_POINTS.map((item) => (
              <li
                key={item.num}
                className="flex gap-5 pt-5 first:pt-0 border-t first:border-t-0 border-white/15"
              >
                <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-xs font-mono font-medium text-white flex-none mt-0.5">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
