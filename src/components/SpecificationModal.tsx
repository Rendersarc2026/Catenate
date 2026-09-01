"use client";

import React, { useState } from "react";
import { X, CheckCircle, Send, Upload, Sparkles, Building2, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { APPS_DATA, CONDS_DATA } from "@/data/catenateData";

interface SpecificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export const SpecificationModal: React.FC<SpecificationModalProps> = ({
  isOpen,
  onClose,
  initialType = "Request a Specification",
}) => {
  const [app, setApp] = useState(APPS_DATA[0]);
  const [cond, setCond] = useState(CONDS_DATA[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectLocation, setProjectLocation] = useState("Middle East / International");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // auto close after 3 seconds if needed
    }, 3000);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[350] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0C143C]/65 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={resetAndClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="bg-[#1B2A7A] text-white px-8 py-6 flex justify-between items-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Technical Advisory & Supply
            </div>
            <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
              {initialType}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 sm:p-10 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 animate-bounce">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-semibold text-[#1A1D2E] mb-2">
                Specification Request Received
              </h4>
              <p className="text-[#767C93] max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-8">
                Thank you, <span className="font-medium text-[#1A1D2E]">{name || "Partner"}</span>. Our technical advisory desk is reviewing your project parameters for <b>{app}</b> under <b>{cond}</b> conditions. A dedicated engineering packet with technical data sheets, test certifications, and local stock confirmation will be sent to <b>{email || "your email"}</b> within 24 hours.
              </p>
              <Button onClick={resetAndClose} variant="default">
                Return to site
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-[#767C93] text-sm leading-relaxed">
                Connect directly with Catenate technical engineers for certified chemical systems, substrate evaluation, pull-off testing, and staged delivery against your project programme.
              </p>

              {/* Application & Condition Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#767C93] mb-2">
                    Application Sector
                  </label>
                  <select
                    value={app}
                    onChange={(e) => setApp(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A1D2E]/15 bg-[#F7F8FB] text-sm font-medium text-[#1A1D2E] focus:outline-none focus:ring-2 focus:ring-[#1B2A7A]"
                  >
                    {APPS_DATA.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#767C93] mb-2">
                    Operating Condition
                  </label>
                  <select
                    value={cond}
                    onChange={(e) => setCond(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A1D2E]/15 bg-[#F7F8FB] text-sm font-medium text-[#1A1D2E] focus:outline-none focus:ring-2 focus:ring-[#1B2A7A]"
                  >
                    {CONDS_DATA.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#767C93] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. David Vance"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A1D2E]/15 bg-white text-sm text-[#1A1D2E] focus:outline-none focus:ring-2 focus:ring-[#1B2A7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#767C93] mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="specification@contractor.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A1D2E]/15 bg-white text-sm text-[#1A1D2E] focus:outline-none focus:ring-2 focus:ring-[#1B2A7A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#767C93] mb-2 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> Company / Contractor
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. STRABAG / L&T / Galfar"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A1D2E]/15 bg-white text-sm text-[#1A1D2E] focus:outline-none focus:ring-2 focus:ring-[#1B2A7A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#767C93] mb-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Project Territory
                  </label>
                  <input
                    type="text"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    placeholder="e.g. Muscat / Dubai / Doha / UK"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A1D2E]/15 bg-white text-sm text-[#1A1D2E] focus:outline-none focus:ring-2 focus:ring-[#1B2A7A]"
                  />
                </div>
              </div>

              {/* Project Scope / Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#767C93] mb-2">
                  Substrate & Specific Project Requirements
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe area (m²), curing window, thermal/chemical exposures, or specific approval requirements (Agrément, Civil Defence, Potable)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1A1D2E]/15 bg-white text-sm text-[#1A1D2E] focus:outline-none focus:ring-2 focus:ring-[#1B2A7A]"
                />
              </div>

              {/* File upload hint */}
              <div className="border border-dashed border-[#1A1D2E]/20 rounded-xl p-4 text-center bg-[#F7F8FB] hover:bg-[#EEF0FA] transition-colors cursor-pointer">
                <Upload className="w-5 h-5 mx-auto text-[#767C93] mb-1" />
                <span className="text-xs text-[#767C93]">
                  Attach architectural drawings, BOQ, or substrate readings (Optional · PDF/DWG up to 25MB)
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex justify-end gap-3 items-center">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-5 py-2.5 text-sm font-medium text-[#767C93] hover:text-[#1A1D2E] cursor-pointer"
                >
                  Cancel
                </button>
                <Button type="submit" variant="default">
                  <span>Submit engineering request</span>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
