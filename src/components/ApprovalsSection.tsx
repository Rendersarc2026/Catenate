"use client";

import React from "react";
import { CERTS_OWN, CERTS_PRINCIPAL, CertificateItem } from "@/data/catenateData";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

interface ApprovalsSectionProps {
  onSelectCert: (cert: CertificateItem, kind: "own" | "principal") => void;
}

export const ApprovalsSection: React.FC<ApprovalsSectionProps> = ({ onSelectCert }) => {
  return (
    <section className="bg-[#1B2A7A] text-white sec-pad" id="approvals">
      <div className="mb-12">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-3 block">
          Approvals and accreditations
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight max-w-xl text-balance">
          Proof travels with the system.
        </h2>
      </div>

      {/* Tier 1: Held by Catenate */}
      <div className="mb-14">
        <div className="flex items-baseline gap-3 mb-6">
          <h3 className="text-xl sm:text-2xl font-medium text-white">Held by Catenate</h3>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Tier one
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {CERTS_OWN.map((cert) => (
            <button
              key={cert.c}
              onClick={() => onSelectCert(cert, "own")}
              className="rounded-2xl p-6 text-left min-h-[160px] bg-white/[0.04] border border-white/15 hover:bg-white hover:text-[#1B2A7A] transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between w-full mb-auto">
                <span className="text-xs font-mono font-medium tracking-wider text-white/60 group-hover:text-[#767C93]">
                  {cert.c}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#1B2A7A]" />
              </div>
              <div className="mt-4">
                <span className="text-base sm:text-lg font-medium leading-snug tracking-tight text-white group-hover:text-[#1B2A7A] transition-colors block">
                  {cert.n}
                </span>
                <span className="text-xs text-white/60 group-hover:text-[#767C93] transition-colors block mt-1 line-clamp-1">
                  {cert.b}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tier 2: Carried by our principals */}
      <div>
        <div className="flex items-baseline gap-3 mb-6">
          <h3 className="text-xl sm:text-2xl font-medium text-white">Carried by our principals</h3>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Tier two
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {CERTS_PRINCIPAL.map((cert) => (
            <button
              key={cert.c}
              onClick={() => onSelectCert(cert, "principal")}
              className="rounded-2xl p-6 text-left min-h-[160px] bg-white/[0.04] border border-white/15 hover:bg-white hover:text-[#1B2A7A] transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between w-full mb-auto">
                <span className="text-xs font-mono font-medium tracking-wider text-white/60 group-hover:text-[#767C93]">
                  {cert.c}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#1B2A7A]" />
              </div>
              <div className="mt-4">
                <span className="text-base sm:text-lg font-medium leading-snug tracking-tight text-white group-hover:text-[#1B2A7A] transition-colors block">
                  {cert.n}
                </span>
                <span className="text-xs text-white/60 group-hover:text-[#767C93] transition-colors block mt-1 line-clamp-1">
                  {cert.b}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
