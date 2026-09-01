"use client";

import React, { useEffect } from "react";
import { X, Download, ShieldCheck, CheckCircle2, FileText } from "lucide-react";
import { CertificateItem } from "@/data/catenateData";
import { Button } from "./ui/button";

interface CertificateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateItem | null;
  kind: "own" | "principal";
}

export const CertificateDrawer: React.FC<CertificateDrawerProps> = ({
  isOpen,
  onClose,
  certificate,
  kind,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  const handleDownload = () => {
    alert(`Downloading official documentation for ${certificate.c}: ${certificate.n}`);
  };

  return (
    <div className="fixed inset-0 z-[300] flex justify-end">
      {/* Scrim backdrop */}
      <div
        className="fixed inset-0 bg-[#0C143C]/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[480px] bg-white h-full shadow-2xl z-10 p-8 sm:p-10 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 animate-in slide-in-from-right">
        <div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F7F8FB] hover:bg-[#EEF0FA] text-[#767C93] hover:text-[#1B2A7A] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#1B2A7A]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1B2A7A]">
              {kind === "own" ? "Held by Catenate · Tier 1" : "Carried by our Principals · Tier 2"}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-medium text-[#1A1D2E] tracking-tight leading-snug mb-3">
            {certificate.n}
          </h3>

          <p className="text-[#767C93] text-sm sm:text-base leading-relaxed mb-8">
            {certificate.s}
          </p>

          {/* Meta definition list */}
          <div className="border-t border-[#1A1D2E]/10 divide-y divide-[#1A1D2E]/[0.07] mb-8">
            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-[#767C93]">Reference code</span>
              <span className="font-mono font-medium text-[#1A1D2E] bg-[#F7F8FB] px-2.5 py-1 rounded-md">
                {certificate.c}
              </span>
            </div>
            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-[#767C93]">Issuing authority</span>
              <span className="font-medium text-[#1A1D2E] text-right">
                {certificate.b}
              </span>
            </div>
            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-[#767C93]">Validity status</span>
              <span className="font-medium text-[#1B2A7A] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {certificate.v}
              </span>
            </div>
            <div className="py-3.5 flex justify-between items-center text-sm">
              <span className="text-[#767C93]">Format</span>
              <span className="font-medium text-[#767C93] flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Verified PDF / Data Sheet
              </span>
            </div>
          </div>
        </div>

        {/* Action footer */}
        <div className="pt-6 border-t border-[#1A1D2E]/10">
          <Button
            onClick={handleDownload}
            className="w-full justify-between"
          >
            <span>Download certificate</span>
            <Download className="w-4 h-4" />
          </Button>
          <p className="text-xs text-center text-[#767C93] mt-3">
            Official test reports and third-party validation certificates supplied with each delivery.
          </p>
        </div>
      </div>
    </div>
  );
};
