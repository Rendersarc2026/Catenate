"use client";

import React, { useState } from "react";
import { APPS_DATA, CONDS_DATA, SYSTEMS_DATA, COND_NOTES } from "@/data/catenateData";
import { Sparkles, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";

interface SolutionsFinderProps {
  onRequestSpec: (customTitle?: string) => void;
}

export const SolutionsFinder: React.FC<SolutionsFinderProps> = ({ onRequestSpec }) => {
  const [selectedApp, setSelectedApp] = useState<string>(APPS_DATA[0]);
  const [selectedCond, setSelectedCond] = useState<string>(CONDS_DATA[1]);
  const [isFading, setIsFading] = useState(false);

  const handleAppChange = (app: string) => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedApp(app);
      setIsFading(false);
    }, 150);
  };

  const handleCondChange = (cond: string) => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedCond(cond);
      setIsFading(false);
    }, 150);
  };

  const system = SYSTEMS_DATA[selectedApp] || SYSTEMS_DATA["Waterproofing"];
  const condNote = COND_NOTES[selectedCond] || "";

  return (
    <section className="bg-[#1B2A7A] text-white sec-pad" id="finder">
      <div className="mb-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-3 block">
          Solutions finder
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight max-w-xl text-balance">
          Start with the job, not the product code.
        </h2>
      </div>

      <div className="space-y-8">
        {/* Step 1: Choose Application */}
        <div>
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-white/75 mb-3.5">
            <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-mono">
              1
            </span>
            <span>Choose the application</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {APPS_DATA.map((app) => {
              const active = selectedApp === app;
              return (
                <button
                  key={app}
                  onClick={() => handleAppChange(app)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-white text-[#1B2A7A] shadow-md font-semibold"
                      : "text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] hover:text-white"
                  }`}
                  aria-pressed={active}
                >
                  {app}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Choose Condition */}
        <div>
          <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-white/75 mb-3.5">
            <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-mono">
              2
            </span>
            <span>Choose the operating condition</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {CONDS_DATA.map((cond) => {
              const active = selectedCond === cond;
              return (
                <button
                  key={cond}
                  onClick={() => handleCondChange(cond)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-white text-[#1B2A7A] shadow-md font-semibold"
                      : "text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] hover:text-white"
                  }`}
                  aria-pressed={active}
                >
                  {cond}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-Time Result Box */}
        <div
          className={`bg-white text-[#1A1D2E] rounded-[24px] p-6 sm:p-10 shadow-2xl transition-opacity duration-200 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
          aria-live="polite"
        >
          {/* Result Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[#1A1D2E]/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#767C93] mb-1 block">
                Recommended System Build-Up
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1A1D2E] tracking-tight">
                {selectedApp} · <span className="capitalize font-normal">{selectedCond}</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-[#767C93] bg-[#F7F8FB] border border-[#1A1D2E]/10 px-3 py-1.5 rounded-lg">
                Standard: {system.std}
              </span>
            </div>
          </div>

          {/* Steps Sequence List */}
          <div className="divide-y divide-[#1A1D2E]/[0.07] my-4">
            {system.steps.map((st, i) => (
              <div
                key={i}
                className="grid grid-cols-[28px_1fr_auto] gap-4 items-center py-4 text-left"
              >
                <span className="w-7 h-7 rounded-full border border-[#1A1D2E]/15 flex items-center justify-center text-xs font-mono text-[#767C93] font-medium">
                  {i + 1}
                </span>
                <div>
                  <b className="text-sm sm:text-base font-medium text-[#1A1D2E] block">
                    {st[1]}
                  </b>
                  <span className="text-xs text-[#767C93] font-normal block">
                    Phase: {st[0]}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1B2A7A] bg-[#1B2A7A]/[0.08] px-3 py-1 rounded-full whitespace-nowrap">
                  {st[2]}
                </span>
              </div>
            ))}
          </div>

          {/* Condition Advisory Note */}
          <div className="pt-4 mt-4 border-t border-[#1A1D2E]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-2.5 max-w-xl text-xs sm:text-sm text-[#767C93] leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-[#1B2A7A] flex-none mt-0.5" />
              <span>
                <b>Engineering Note:</b> {condNote}
              </span>
            </div>
            <Button
              onClick={() =>
                onRequestSpec(`Specification for ${selectedApp} (${selectedCond})`)
              }
              variant="default"
              size="sm"
            >
              <span>Request this specification</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
