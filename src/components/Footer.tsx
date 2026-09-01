import React from "react";
import Link from "next/link";

interface FooterProps {
  onOpenModal: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-[#101B52] text-white rounded-b-[28px] pt-16 sm:pt-24 px-6 sm:px-12 overflow-hidden">
      {/* Top 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 sm:gap-12 pb-14 border-b border-white/15">
        {/* Col 1: Catenate Head Office */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5">
            Catenate
          </h4>
          <address className="not-italic text-sm sm:text-[15px] text-white/75 leading-relaxed space-y-2">
            <p>Head office and central warehouse</p>
            <p>Industrial Area 12, Plot 44</p>
            <p>Regional branches in four territories</p>
            <div className="pt-3 space-y-1">
              <p className="font-mono text-white/90">+000 0000 0000</p>
              <p className="text-[#E8B98A]">specification@catenate.com</p>
            </div>
          </address>
        </div>

        {/* Col 2: Brands */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5">
            Brands
          </h4>
          <ul className="space-y-2.5 text-sm sm:text-[15px]">
            {["Henkel", "Weld-On", "Würth", "GE Sealants", "Sika"].map((item) => (
              <li key={item}>
                <Link href="#brands" className="text-white/75 hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Systems */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5">
            Systems
          </h4>
          <ul className="space-y-2.5 text-sm sm:text-[15px]">
            {[
              "Waterproofing",
              "Concrete repair",
              "Sealants and glazing",
              "Tiling and flooring",
              "Metal pretreatment",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#technologies"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Company */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm sm:text-[15px]">
            <li>
              <Link href="#approvals" className="text-white/75 hover:text-white transition-colors">
                Quality and HSE
              </Link>
            </li>
            <li>
              <Link href="#projects" className="text-white/75 hover:text-white transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#industries" className="text-white/75 hover:text-white transition-colors">
                Industries
              </Link>
            </li>
            <li>
              <button
                onClick={() => onOpenModal("Become an Authorized Channel Partner")}
                className="text-white/75 hover:text-white transition-colors text-left cursor-pointer"
              >
                Become a partner
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenModal("Career Opportunities at Catenate")}
                className="text-white/75 hover:text-white transition-colors text-left cursor-pointer"
              >
                Careers
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal & Accreditation Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 text-xs text-white/45 font-mono">
        <span>Trade licence 000000 · ISO 9001:2015 · ISO 45001:2018 · ISO 14001:2015</span>
        <span>© 2026 Catenate. All rights reserved.</span>
      </div>

      {/* Giant Stylized Watermark */}
      <div
        className="text-[14vw] font-bold tracking-tighter text-transparent select-none pointer-events-none leading-[0.8] -mb-[0.14em] text-center"
        style={{
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
        }}
        aria-hidden="true"
      >
        CATENATE
      </div>
    </footer>
  );
};
