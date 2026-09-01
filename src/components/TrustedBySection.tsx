import React from "react";
import { CLIENTELE_DATA } from "@/data/catenateData";

export const TrustedBySection: React.FC = () => {
  return (
    <section className="bg-[#1B2A7A] text-white sec-pad" id="customers">
      <div className="mb-12">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-3 block">
          Trusted by
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight max-w-xl text-balance">
          Specified by name, not by default.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {CLIENTELE_DATA.map((client, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-5 sm:p-6 bg-white/[0.04] border border-white/15 hover:bg-white hover:text-[#1B2A7A] transition-all duration-300 flex flex-col justify-between min-h-[140px] group cursor-default shadow-xs hover:shadow-xl hover:-translate-y-1"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/55 group-hover:text-[#767C93] transition-colors font-mono">
              {client.sector}
            </span>
            <span className="text-base sm:text-lg font-medium leading-snug tracking-tight text-white group-hover:text-[#1B2A7A] transition-colors mt-4">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
