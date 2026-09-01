import React from "react";
import { Link2 } from "lucide-react";

export const PartnersStrip: React.FC = () => {
  const partners = [
    { name: "Henkel", color: "#E1000F", role: "Authorised distributor" },
    { name: "Weld-On", color: "#0B5FA5", role: "Authorised distributor" },
    { name: "Würth", color: "#CC0000", role: "Authorised distributor" },
    { name: "GE Sealants", color: "#3874C8", role: "Authorised distributor" },
    { name: "Sika", color: "#D50032", role: "Authorised distributor" },
  ];

  return (
    <section className="bg-[#F7F8FB] border-y border-[#1A1D2E]/[0.06] py-10 px-6 sm:px-12">
      <div className="max-w-[1180px] mx-auto flex items-center justify-center flex-wrap gap-6 sm:gap-10">
        {partners.map((partner, idx) => (
          <React.Fragment key={partner.name}>
            <div className="text-center group transition-all duration-300 filter grayscale opacity-60 hover:filter-none hover:opacity-100 cursor-pointer">
              <b
                className="block text-2xl sm:text-3xl font-semibold tracking-tight transition-colors duration-300"
                style={{ color: partner.color }}
              >
                {partner.name}
              </b>
              <i className="block not-italic text-[10px] font-semibold uppercase tracking-[0.16em] text-[#767C93] mt-1">
                {partner.role}
              </i>
            </div>

            {idx < partners.length - 1 && (
              <Link2 className="w-4 h-4 text-[#767C93]/35 hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
