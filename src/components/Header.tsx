"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, ArrowUpRight } from "lucide-react";
import { MEGA_DATA } from "@/data/catenateData";
import { Button } from "./ui/button";

interface HeaderProps {
  onRequestSpec: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRequestSpec }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [activeMegaKey, setActiveMegaKey] = useState<string>("do");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const megaColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMegaOpen(false);
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavClick = (key: string) => {
    if (isMegaOpen && activeMegaKey === key) {
      setIsMegaOpen(false);
    } else {
      setActiveMegaKey(key);
      setIsMegaOpen(true);
    }
  };

  const handleNavHover = (key: string) => {
    if (isMegaOpen) {
      setActiveMegaKey(key);
    }
  };

  const keys = Object.keys(MEGA_DATA);

  return (
    <header
      className={`sticky top-0 z-[120] transition-all duration-300 ${
        isMegaOpen || isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(26,29,46,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1180px] mx-auto h-[78px] flex items-center justify-between px-6 sm:px-10 gap-4">
        {/* Wordmark */}
        <Link
          href="#"
          className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${
            isMegaOpen || isScrolled ? "text-[#1B2A7A]" : "text-white"
          }`}
        >
          CATEN<span className="tracking-tighter opacity-90">ATE</span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Primary">
          {keys.map((key) => {
            const isActive = isMegaOpen && activeMegaKey === key;
            return (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                onMouseEnter={() => handleNavHover(key)}
                className={`px-3.5 py-2 rounded-full text-[14.5px] font-medium transition-all duration-200 cursor-pointer ${
                  isMegaOpen || isScrolled
                    ? isActive
                      ? "text-[#1B2A7A] bg-[#1B2A7A]/[0.08]"
                      : "text-[#767C93] hover:text-[#1B2A7A] hover:bg-[#1B2A7A]/[0.04]"
                    : isActive
                    ? "text-white bg-white/20"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
                aria-expanded={isActive}
              >
                {MEGA_DATA[key].label}
              </button>
            );
          })}

          {/* CTA Button */}
          <Button
            onClick={onRequestSpec}
            variant={isMegaOpen || isScrolled ? "default" : "onBlue"}
            size="sm"
            className="ml-2.5 font-medium"
          >
            <span>Request a specification</span>
          </Button>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isMegaOpen || isScrolled
                ? "text-[#1B2A7A] shadow-[inset_0_0_0_1px_rgba(27,42,122,0.18)]"
                : "text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {isMegaOpen && (
        <div
          className="hidden lg:grid grid-cols-[38%_62%] absolute left-0 right-0 top-[78px] bg-white border-b border-[#1A1D2E]/10 shadow-[0_30px_60px_rgba(12,20,60,0.14)] px-12 py-10 max-w-[1180px] mx-auto rounded-b-[28px] animate-in fade-in slide-in-from-top-2 duration-200"
          role="region"
          aria-label="Site sections"
        >
          {/* Left Column: Mega Categories */}
          <div ref={megaColRef} className="flex flex-col space-y-1 pr-8 border-r border-[#1A1D2E]/[0.08]">
            {keys.map((k) => {
              const active = activeMegaKey === k;
              return (
                <button
                  key={k}
                  onClick={() => setActiveMegaKey(k)}
                  onMouseEnter={() => setActiveMegaKey(k)}
                  className={`flex items-center gap-3 text-left py-2.5 px-3 rounded-xl text-xl font-medium tracking-tight transition-all duration-200 cursor-pointer group ${
                    active ? "text-[#1B2A7A] bg-[#1B2A7A]/[0.05]" : "text-[#767C93] hover:text-[#1A1D2E]"
                  }`}
                >
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      active ? "opacity-100 translate-x-0 text-[#1B2A7A]" : "opacity-0 -translate-x-2"
                    }`}
                  />
                  <span>{MEGA_DATA[k].label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Active Sub-links / Groups */}
          <div className="pl-10 transition-opacity duration-150">
            {MEGA_DATA[activeMegaKey]?.groups ? (
              <div className="columns-2 gap-8 space-y-6">
                {MEGA_DATA[activeMegaKey].groups?.map((group, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <h5 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#767C93] mb-3">
                      {group.t}
                    </h5>
                    <ul className="space-y-2">
                      {group.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            href={`#${activeMegaKey === "brands" ? "brands" : "technologies"}`}
                            onClick={() => setIsMegaOpen(false)}
                            className="text-[15px] text-[#1A1D2E]/80 hover:text-[#1B2A7A] font-normal transition-colors flex items-center justify-between group py-0.5"
                          >
                            <span>{item}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#1B2A7A]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="columns-2 gap-8">
                {MEGA_DATA[activeMegaKey]?.items?.map((item, idx) => (
                  <div key={idx} className="break-inside-avoid mb-4">
                    <Link
                      href={`#${
                        activeMegaKey === "industries"
                          ? "industries"
                          : activeMegaKey === "tech"
                          ? "technologies"
                          : activeMegaKey === "about"
                          ? "strengths"
                          : "finder"
                      }`}
                      onClick={() => setIsMegaOpen(false)}
                      className="text-[15.5px] text-[#1A1D2E]/80 hover:text-[#1B2A7A] font-normal transition-colors flex items-center justify-between group py-1 border-b border-[#1A1D2E]/[0.05]"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#1B2A7A]" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#1A1D2E]/10 px-6 py-6 space-y-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            {keys.map((k) => (
              <div key={k} className="border-b border-[#1A1D2E]/[0.08] pb-3">
                <div className="text-lg font-semibold text-[#1B2A7A] mb-2">
                  {MEGA_DATA[k].label}
                </div>
                <div className="grid grid-cols-1 gap-1.5 pl-2">
                  {MEGA_DATA[k].groups
                    ? MEGA_DATA[k].groups?.flatMap((g) => g.items).slice(0, 6).map((sub, i) => (
                        <Link
                          key={i}
                          href={`#${k}`}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-sm text-[#767C93] hover:text-[#1B2A7A] py-1"
                        >
                          {sub}
                        </Link>
                      ))
                    : MEGA_DATA[k].items?.slice(0, 6).map((sub, i) => (
                        <Link
                          key={i}
                          href={`#${k}`}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-sm text-[#767C93] hover:text-[#1B2A7A] py-1"
                        >
                          {sub}
                        </Link>
                      ))}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => {
              setIsMobileOpen(false);
              onRequestSpec();
            }}
            className="w-full justify-center"
          >
            <span>Request a specification</span>
          </Button>
        </div>
      )}
    </header>
  );
};
