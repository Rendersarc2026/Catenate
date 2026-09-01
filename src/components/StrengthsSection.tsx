import React from "react";
import { STRENGTHS_DATA } from "@/data/catenateData";

export const StrengthsSection: React.FC = () => {
  return (
    <section className="bg-white text-[#1A1D2E] sec-pad" id="strengths">
      <div className="mb-12">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#767C93] mb-3 block">
          Our strengths
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight text-balance max-w-xl">
          Eight reasons the chain holds.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-10">
        {STRENGTHS_DATA.map((item, idx) => (
          <div key={idx} className="border-b border-[#1A1D2E]/10 pb-6 group">
            <h3 className="text-lg sm:text-xl font-medium text-[#1A1D2E] mb-2 group-hover:text-[#1B2A7A] transition-colors">
              {item.title}
            </h3>
            <p className="text-sm sm:text-[15px] text-[#767C93] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
