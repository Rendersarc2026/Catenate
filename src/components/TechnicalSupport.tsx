import React from "react";
import { TECHNICAL_SUPPORT_ITEMS } from "@/data/catenateData";

export const TechnicalSupport: React.FC = () => {
  return (
    <section className="bg-white text-[#1A1D2E] sec-pad border-t border-[#1A1D2E]/10">
      <div className="mb-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#767C93] mb-3 block">
          Technical support
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight">
          What comes with the delivery.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-6">
        {TECHNICAL_SUPPORT_ITEMS.map((item, idx) => (
          <div key={idx} className="py-5 border-b border-[#1A1D2E]/10">
            <h3 className="text-lg sm:text-xl font-medium text-[#1A1D2E] mb-1.5">
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
