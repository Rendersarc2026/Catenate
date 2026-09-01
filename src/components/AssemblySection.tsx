"use client";

import React, { useState } from "react";
import { ASSEMBLIES_DATA, AssemblyItem } from "@/data/catenateData";
import { Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface AssemblySectionProps {
  onRequestSpec: (title?: string) => void;
}

export const AssemblySection: React.FC<AssemblySectionProps> = ({ onRequestSpec }) => {
  const [selectedAssemblyId, setSelectedAssemblyId] = useState<string>("podium");

  const currentAssembly =
    ASSEMBLIES_DATA.find((a) => a.id === selectedAssemblyId) || ASSEMBLIES_DATA[0];

  return (
    <section className="bg-white text-[#1A1D2E] sec-pad border-t border-[#1A1D2E]/10" id="buildup">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#767C93] mb-3 block">
            Technical build-ups
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.2] tracking-tight">
            System compatibility by design.
          </h2>
        </div>

        {/* Assembly Switcher Pills */}
        <div className="flex flex-wrap gap-2">
          {ASSEMBLIES_DATA.map((item) => {
            const active = selectedAssemblyId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedAssemblyId(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  active
                    ? "bg-[#1B2A7A] text-white shadow-md"
                    : "bg-[#F7F8FB] text-[#767C93] hover:text-[#1B2A7A] hover:bg-[#EEF0FA] border border-[#1A1D2E]/10"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Assembly Visualization Card */}
      <div className="bg-[#F7F8FB] rounded-[24px] p-6 sm:p-10 border border-[#1A1D2E]/[0.08] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          {/* Layer Graphic Schematic */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#767C93] block mb-2">
              Cross-Section Build-Up Schematic
            </span>
            <div className="space-y-2">
              {currentAssembly.layers.map((layer, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-3.5 sm:p-4 border transition-all duration-300 flex items-center justify-between gap-4 group hover:shadow-md"
                  style={{
                    backgroundColor:
                      layer.f === "bl-solid"
                        ? "#1B2A7A"
                        : layer.f === "bl-hatch"
                        ? "#E6E9F4"
                        : "#FFFFFF",
                    color: layer.f === "bl-solid" ? "#FFFFFF" : "#1A1D2E",
                    borderColor:
                      layer.f === "bl-solid"
                        ? "#1B2A7A"
                        : "rgba(26,29,46,0.12)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-medium ${
                        layer.f === "bl-solid"
                          ? "bg-white/20 text-white"
                          : "bg-[#1A1D2E]/[0.07] text-[#767C93]"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <b className="text-sm sm:text-base font-medium block">
                        {layer.n}
                      </b>
                      <span
                        className={`text-xs block ${
                          layer.f === "bl-solid"
                            ? "text-white/75"
                            : "text-[#767C93]"
                        }`}
                      >
                        {layer.p}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      layer.f === "bl-solid"
                        ? "bg-white/15 text-white"
                        : "bg-[#1A1D2E]/[0.05] text-[#767C93]"
                    }`}
                  >
                    Layer {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Explanatory Note */}
          <div className="lg:pl-6 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1B2A7A] block mb-1">
                Verified Compatibility
              </span>
              <h3 className="text-2xl font-medium text-[#1A1D2E]">
                {currentAssembly.name} System Specification
              </h3>
              <p className="text-sm sm:text-base text-[#767C93] leading-relaxed mt-3">
                All component chemical interfaces—from substrate preparation and primer to membrane and elastomeric joint detailing—are engineered and warrantied as a cohesive chain to eliminate delamination risks.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#1A1D2E]/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1A1D2E]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Single-point manufacturer warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#1A1D2E]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Joint site inspections &amp; pull-off testing included</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#1A1D2E]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Full Agrément / EN compliance dossier provided</span>
              </div>
            </div>

            <Button
              onClick={() =>
                onRequestSpec(`Full Build-up for ${currentAssembly.name}`)
              }
              variant="default"
            >
              <span>Download full build-up CAD &amp; Data Sheet</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
