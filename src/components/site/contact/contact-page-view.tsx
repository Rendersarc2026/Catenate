"use client";

import * as React from "react";
import {
  CONTACT_LOCATIONS,
  CONTACT_SERVICES,
  formatDirections,
  formatMapEmbed,
  formatTel,
  formatWhatsApp,
  type ContactBranch,
  type ContactLocation,
} from "@/data/contact-data";

export function ContactPageView() {
  const [selectedLocId, setSelectedLocId] = React.useState<string>("uae");
  const [selectedBranchId, setSelectedBranchId] = React.useState<string>("dubai-1");

  // Form states
  const [formName, setFormName] = React.useState("");
  const [formCompany, setFormCompany] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [formPhone, setFormPhone] = React.useState("");
  const [formMessage, setFormMessage] = React.useState("");
  const [submitFeedback, setSubmitFeedback] = React.useState<string | null>(null);
  const [isError, setIsError] = React.useState(false);

  const tabsRef = React.useRef<HTMLDivElement>(null);

  // Get current active location and branch
  const activeLoc = React.useMemo(() => {
    return (
      CONTACT_LOCATIONS.find((l) => l.id === selectedLocId) ??
      CONTACT_LOCATIONS[0]
    );
  }, [selectedLocId]);

  const activeBranch = React.useMemo(() => {
    return (
      activeLoc.branches.find((b) => b.id === selectedBranchId) ??
      activeLoc.branches[0]
    );
  }, [activeLoc, selectedBranchId]);

  const selectLocationAndBranch = React.useCallback(
    (locId: string, branchId?: string, scrollTabs = false) => {
      const loc = CONTACT_LOCATIONS.find((l) => l.id === locId);
      if (!loc) return;
      setSelectedLocId(locId);
      const targetBranchId =
        branchId ?? (loc.branches.some((b) => b.id === selectedBranchId)
          ? selectedBranchId
          : loc.branches[0].id);
      setSelectedBranchId(targetBranchId);

      if (scrollTabs && tabsRef.current) {
        tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [selectedBranchId]
  );

  // Keyboard navigation for tabs
  const handleTabsKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const currentIndex = CONTACT_LOCATIONS.findIndex((l) => l.id === selectedLocId);
    const n = CONTACT_LOCATIONS.length;
    let nextIndex = currentIndex;

    if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = n - 1;
    else if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % n;
    else if (e.key === "ArrowLeft") nextIndex = (currentIndex - 1 + n) % n;

    const nextLoc = CONTACT_LOCATIONS[nextIndex];
    selectLocationAndBranch(nextLoc.id);

    // Focus the newly active tab button
    const tabEl = document.getElementById(`tab-${nextLoc.id}`);
    tabEl?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formEmail.includes("@")) {
      setIsError(true);
      setSubmitFeedback("Please provide your name and a valid email address.");
      return;
    }

    setIsError(false);
    setSubmitFeedback(
      `Thank you, ${formName.trim()}. Your enquiry has been received and forwarded to our ${activeBranch.name.replace("Catenate — ", "")} team.`
    );
    setFormName("");
    setFormCompany("");
    setFormEmail("");
    setFormPhone("");
    setFormMessage("");
  };

  return (
    <div className="w-full bg-white text-[#121633] antialiased selection:bg-[#F2A541]/30 selection:text-[#121D5C]">
      {/* HERO & LOCATIONS CONTAINER */}
      <div className="content-pad pt-10 sm:pt-14 md:pt-16 pb-14 sm:pb-20">
        {/* HERO SECTION */}
        <section aria-labelledby="page-title">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#5D6382]">
                <span className="size-2 rounded-full bg-[#F2A541]" />
                Contact us
              </span>
              <h1
                id="page-title"
                className="mt-4.5 mb-5 max-w-[13ch] text-[clamp(36px,5.2vw,72px)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#1B2A7A]"
              >
                Talk to the branch nearest you.
              </h1>
              <p className="max-w-[52ch] text-[16px] sm:text-[18px] leading-relaxed text-[#5D6382]">
                Every market we serve has its own branch, local stock and technical team.
                Choose a location to reach them directly.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-3">
              <a
                href="#enquiry"
                className="group flex items-center justify-between gap-4 rounded-[14px] border border-[#E3E6EF] p-4.5 transition hover:border-[#1B2A7A] hover:bg-[#F4F5F9] focus-visible:outline-3 focus-visible:outline-[#F2A541]"
              >
                <div>
                  <span className="block text-[13px] text-[#5D6382]">
                    Specifications &amp; projects
                  </span>
                  <strong className="text-[16px] font-semibold text-[#121633]">
                    Submit an enquiry
                  </strong>
                </div>
                <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#F4F5F9] text-[#1B2A7A] transition-colors group-hover:bg-[#1B2A7A] group-hover:text-white">
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5 stroke-current stroke-[2] fill-none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </a>

              <a
                href="mailto:specification@catenate.com"
                className="group flex items-center justify-between gap-4 rounded-[14px] border border-[#E3E6EF] p-4.5 transition hover:border-[#1B2A7A] hover:bg-[#F4F5F9] focus-visible:outline-3 focus-visible:outline-[#F2A541]"
              >
                <div>
                  <span className="block text-[13px] text-[#5D6382]">
                    General email
                  </span>
                  <strong className="text-[16px] font-semibold text-[#121633]">
                    specification@catenate.com
                  </strong>
                </div>
                <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#F4F5F9] text-[#1B2A7A] transition-colors group-hover:bg-[#1B2A7A] group-hover:text-white">
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5 stroke-current stroke-[2] fill-none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* COUNTRY TABS */}
          <div
            ref={tabsRef}
            className="mt-10 sm:mt-14 flex flex-wrap gap-2.5"
            role="tablist"
            aria-label="Choose a country"
            onKeyDown={handleTabsKeyDown}
          >
            {CONTACT_LOCATIONS.map((loc) => {
              const isSelected = loc.id === selectedLocId;
              return (
                <button
                  key={loc.id}
                  id={`tab-${loc.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls="detail-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectLocationAndBranch(loc.id)}
                  className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-[15px] font-semibold transition cursor-pointer focus-visible:outline-3 focus-visible:outline-[#F2A541] ${
                    isSelected
                      ? "border-[#1B2A7A] bg-[#1B2A7A] text-white"
                      : "border-[#E3E6EF] bg-white text-[#121633] hover:border-[#1B2A7A]"
                  }`}
                >
                  <span>{loc.label}</span>
                  {loc.branches.length > 1 && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${
                        isSelected
                          ? "bg-white/16 text-white"
                          : "bg-[#F4F5F9] text-[#5D6382]"
                      }`}
                    >
                      {loc.branches.length} branches
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* LOCATION DETAIL & MAP */}
        <section className="mt-10 sm:mt-12" aria-live="polite">
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            {/* DETAIL CARD */}
            <article
              id="detail-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeLoc.id}`}
              className="relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-[#1B2A7A] p-7 sm:p-10 text-white shadow-lg"
            >
              {/* Glow circle overlay */}
              <div
                className="pointer-events-none absolute -top-28 -right-28 size-[320px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(242,165,65,0.35), rgba(242,165,65,0) 70%)",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col gap-7">
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="text-[13px] font-semibold tracking-[0.14em] uppercase text-[#F2A541]">
                      {activeLoc.country}
                    </div>
                    <h2 className="mt-2 text-[28px] sm:text-[32px] font-semibold leading-[1.1] tracking-[-0.02em]">
                      {activeBranch.name}
                    </h2>
                  </div>
                  <span className="inline-block self-start rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap text-white">
                    {activeBranch.tag}
                  </span>
                </div>

                {/* Information Rows */}
                <div className="grid gap-4.5">
                  {/* Address */}
                  <div className="grid grid-cols-[36px_1fr] items-start gap-3.5">
                    <span className="grid size-9 place-items-center rounded-full bg-white/10 text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4 stroke-current stroke-[1.8] fill-none"
                      >
                        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                        <circle cx="12" cy="9.5" r="2.5" />
                      </svg>
                    </span>
                    <div>
                      <small className="block text-[12px] tracking-[0.08em] uppercase text-white/60 mb-0.5">
                        Address
                      </small>
                      <p className="text-[15px] sm:text-[16px] text-white leading-snug">
                        {activeBranch.address.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="grid grid-cols-[36px_1fr] items-start gap-3.5">
                    <span className="grid size-9 place-items-center rounded-full bg-white/10 text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4 stroke-current stroke-[1.8] fill-none"
                      >
                        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                      </svg>
                    </span>
                    <div>
                      <small className="block text-[12px] tracking-[0.08em] uppercase text-white/60 mb-0.5">
                        Phone
                      </small>
                      <a
                        href={formatTel(activeBranch.phone)}
                        className="text-[15px] sm:text-[16px] text-white border-b border-white/30 hover:border-[#F2A541] transition"
                      >
                        {activeBranch.phone}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="grid grid-cols-[36px_1fr] items-start gap-3.5">
                    <span className="grid size-9 place-items-center rounded-full bg-white/10 text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4 stroke-current stroke-[1.8] fill-none"
                      >
                        <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.3z" />
                      </svg>
                    </span>
                    <div>
                      <small className="block text-[12px] tracking-[0.08em] uppercase text-white/60 mb-0.5">
                        WhatsApp
                      </small>
                      <a
                        href={formatWhatsApp(activeBranch.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] sm:text-[16px] text-white border-b border-white/30 hover:border-[#F2A541] transition"
                      >
                        {activeBranch.whatsapp}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="grid grid-cols-[36px_1fr] items-start gap-3.5">
                    <span className="grid size-9 place-items-center rounded-full bg-white/10 text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4 stroke-current stroke-[1.8] fill-none"
                      >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </span>
                    <div>
                      <small className="block text-[12px] tracking-[0.08em] uppercase text-white/60 mb-0.5">
                        Email
                      </small>
                      <a
                        href={`mailto:${activeBranch.email}`}
                        className="text-[15px] sm:text-[16px] text-white border-b border-white/30 hover:border-[#F2A541] transition"
                      >
                        {activeBranch.email}
                      </a>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="grid grid-cols-[36px_1fr] items-start gap-3.5">
                    <span className="grid size-9 place-items-center rounded-full bg-white/10 text-white">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4 stroke-current stroke-[1.8] fill-none"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </span>
                    <div>
                      <small className="block text-[12px] tracking-[0.08em] uppercase text-white/60 mb-0.5">
                        Opening hours
                      </small>
                      <p className="text-[15px] sm:text-[16px] text-white">{activeBranch.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Service Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {CONTACT_SERVICES.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/25 px-3 py-1.5 text-[12px] text-white/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                <a
                  href={formatDirections(activeBranch.map)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white py-2 pr-2 pl-5 text-[14px] font-semibold text-[#1B2A7A] transition hover:bg-[#F4F5F9]"
                >
                  Get directions
                  <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-[#1B2A7A] text-white transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-rotate-45">
                    <svg
                      viewBox="0 0 16 16"
                      className="size-3.5 stroke-current stroke-[2] fill-none"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </a>

                <a
                  href={formatTel(activeBranch.phone)}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-white/40 bg-transparent py-2 pr-2 pl-5 text-[14px] font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  Call branch
                  <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-white/14 text-white transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-rotate-45">
                    <svg
                      viewBox="0 0 16 16"
                      className="size-3.5 stroke-current stroke-[2] fill-none"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </a>
              </div>
            </article>

            {/* MAP & SUB-BRANCHES */}
            <div className="flex min-w-0 flex-col gap-5">
              {/* Map Container */}
              <div className="relative min-h-[340px] sm:min-h-[380px] flex-1 overflow-hidden rounded-[22px] bg-[#F4F5F9] shadow-inner">
                <iframe
                  title="Branch location map"
                  src={formatMapEmbed(activeBranch.map)}
                  className="absolute inset-0 size-full border-0 contrast-[1.05] grayscale-[0.55] saturate-[0.8]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Pulsing Pin Badge */}
                <div className="absolute bottom-5 left-5 z-10 flex max-w-[calc(100%-40px)] items-center gap-3 rounded-[14px] bg-white p-3.5 sm:px-4.5 sm:py-3.5 shadow-[0_12px_30px_-10px_rgba(18,29,92,0.4)]">
                  <span
                    className="size-3 shrink-0 rounded-full bg-[#F2A541] shadow-[0_0_0_6px_rgba(242,165,65,0.25)] animate-pulse"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <strong className="block truncate text-[14px] font-semibold text-[#121633]">
                      {activeBranch.name}
                    </strong>
                    <span className="block truncate text-[12px] text-[#5D6382]">
                      {activeBranch.address[activeBranch.address.length - 1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-branches List (Shown when country has multiple branches) */}
              {activeLoc.branches.length > 1 && (
                <div className="grid gap-2.5">
                  <div className="flex items-baseline justify-between text-[13px] text-[#5D6382]">
                    <strong className="font-semibold text-[#121633]">
                      {activeLoc.branches.length} branches in {activeBranch.city}
                    </strong>
                    <span>Select a branch</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {activeLoc.branches.map((b) => {
                      const isBranchSelected = b.id === activeBranch.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          aria-pressed={isBranchSelected}
                          onClick={() => setSelectedBranchId(b.id)}
                          className={`flex items-center justify-between gap-3 rounded-[14px] border p-4 text-left transition cursor-pointer focus-visible:outline-3 focus-visible:outline-[#F2A541] ${
                            isBranchSelected
                              ? "border-[#F2A541] bg-[#FFF9F0]"
                              : "border-[#E3E6EF] bg-white hover:border-[#1B2A7A]"
                          }`}
                        >
                          <div>
                            <strong className="block text-[15px] font-semibold text-[#121633]">
                              {b.name.replace("Catenate — ", "")}
                            </strong>
                            <span className="block text-[13px] text-[#5D6382]">{b.tag}</span>
                          </div>
                          <span
                            className={`size-2.5 shrink-0 rounded-full border-2 ${
                              isBranchSelected
                                ? "border-[#F2A541] bg-[#F2A541]"
                                : "border-[#E3E6EF] bg-transparent"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* NETWORK STRIP */}
      <section className="w-full border-t border-[#E3E6EF] bg-[#FAFAFC]">
        <nav
          aria-label="All locations"
          className="content-pad grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_LOCATIONS.map((loc, idx) => {
            const isSelected = loc.id === selectedLocId;
            const uniqueCities = Array.from(new Set(loc.branches.map((b) => b.city))).join(", ");

            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => selectLocationAndBranch(loc.id, undefined, true)}
                className={`py-8 sm:py-9 px-4 sm:px-6 md:px-8 text-left transition cursor-pointer border-b sm:border-b-0 border-[#E3E6EF] lg:border-r last:border-r-0 hover:bg-[#F4F5F9] focus-visible:outline-3 focus-visible:outline-[#F2A541] ${
                  isSelected ? "bg-white sm:bg-white shadow-sm" : "bg-transparent"
                }`}
              >
                <span className="block text-[12px] font-semibold tracking-[0.1em] text-[#5D6382]">
                  0{idx + 1} · {loc.region}
                </span>
                <strong className="mt-1.5 mb-0.5 block text-[20px] font-semibold tracking-[-0.01em] text-[#1B2A7A]">
                  {loc.country === "United Arab Emirates" ? "UAE" : loc.country}
                </strong>
                <span className="block text-[13px] text-[#5D6382]">
                  {uniqueCities}
                  {loc.branches.length > 1 ? ` · ${loc.branches.length} branches` : ""}
                </span>
              </button>
            );
          })}
        </nav>
      </section>

      {/* ENQUIRY SECTION */}
      <section
        id="enquiry"
        aria-labelledby="enquiry-title"
        className="w-full bg-[#1B2A7A] py-16 sm:py-20 md:py-24 text-white"
      >
        <div className="content-pad grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.25fr]">
          {/* Left Column */}
          <div>
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-white/70">
              <span className="size-2 rounded-full bg-[#F2A541]" />
              Enquiry
            </span>
            <h2
              id="enquiry-title"
              className="mt-4.5 mb-4 text-[clamp(32px,3.6vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            >
              Tell us about the project.
            </h2>
            <p className="max-w-[48ch] text-[16px] leading-relaxed text-white/75">
              Your enquiry goes straight to the branch you choose, and a technical specialist will
              respond within one working day.
            </p>

            <ul className="mt-8 grid gap-3 list-none">
              <li className="flex items-center gap-3 text-[15px] text-white/85">
                <span className="size-1.5 shrink-0 rounded-full bg-[#F2A541]" />
                System specification &amp; data sheets
              </li>
              <li className="flex items-center gap-3 text-[15px] text-white/85">
                <span className="size-1.5 shrink-0 rounded-full bg-[#F2A541]" />
                Site inspection &amp; substrate testing
              </li>
              <li className="flex items-center gap-3 text-[15px] text-white/85">
                <span className="size-1.5 shrink-0 rounded-full bg-[#F2A541]" />
                Applicator training &amp; toolbox talks
              </li>
            </ul>
          </div>

          {/* Right Column: Form Card */}
          <form
            onSubmit={handleFormSubmit}
            noValidate
            className="grid grid-cols-1 gap-4 rounded-[22px] bg-white p-6 sm:p-9 text-[#121633] shadow-xl sm:grid-cols-2"
          >
            <div className="grid gap-1.5">
              <label htmlFor="f-name" className="text-[13px] font-semibold text-[#121633]">
                Name *
              </label>
              <input
                id="f-name"
                name="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                autoComplete="name"
                required
                placeholder="Your full name"
                className="w-full rounded-xl border border-[#E3E6EF] bg-white px-3.5 py-3 text-[15px] transition focus:border-[#1B2A7A] focus:ring-4 focus:ring-[#1B2A7A]/12 focus:outline-none"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="f-company" className="text-[13px] font-semibold text-[#121633]">
                Company
              </label>
              <input
                id="f-company"
                name="company"
                value={formCompany}
                onChange={(e) => setFormCompany(e.target.value)}
                autoComplete="organization"
                placeholder="Company name"
                className="w-full rounded-xl border border-[#E3E6EF] bg-white px-3.5 py-3 text-[15px] transition focus:border-[#1B2A7A] focus:ring-4 focus:ring-[#1B2A7A]/12 focus:outline-none"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="f-email" className="text-[13px] font-semibold text-[#121633]">
                Email *
              </label>
              <input
                id="f-email"
                name="email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="email@company.com"
                className="w-full rounded-xl border border-[#E3E6EF] bg-white px-3.5 py-3 text-[15px] transition focus:border-[#1B2A7A] focus:ring-4 focus:ring-[#1B2A7A]/12 focus:outline-none"
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="f-phone" className="text-[13px] font-semibold text-[#121633]">
                Phone
              </label>
              <input
                id="f-phone"
                name="phone"
                type="tel"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                autoComplete="tel"
                placeholder="+000 0000 0000"
                className="w-full rounded-xl border border-[#E3E6EF] bg-white px-3.5 py-3 text-[15px] transition focus:border-[#1B2A7A] focus:ring-4 focus:ring-[#1B2A7A]/12 focus:outline-none"
              />
            </div>

            <div className="grid gap-1.5 sm:col-span-2">
              <label htmlFor="f-branch" className="text-[13px] font-semibold text-[#121633]">
                Nearest branch
              </label>
              <select
                id="f-branch"
                name="branch"
                value={selectedBranchId}
                onChange={(e) => {
                  const bId = e.target.value;
                  const loc = CONTACT_LOCATIONS.find((l) =>
                    l.branches.some((b) => b.id === bId)
                  );
                  if (loc) {
                    setSelectedLocId(loc.id);
                    setSelectedBranchId(bId);
                  }
                }}
                className="w-full rounded-xl border border-[#E3E6EF] bg-white px-3.5 py-3 text-[15px] transition focus:border-[#1B2A7A] focus:ring-4 focus:ring-[#1B2A7A]/12 focus:outline-none cursor-pointer"
              >
                {CONTACT_LOCATIONS.map((loc) => (
                  <optgroup key={loc.id} label={loc.country}>
                    {loc.branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name.replace("Catenate — ", "")} ({loc.country})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="grid gap-1.5 sm:col-span-2">
              <label htmlFor="f-msg" className="text-[13px] font-semibold text-[#121633]">
                Message
              </label>
              <textarea
                id="f-msg"
                name="message"
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                rows={4}
                placeholder="Project, application, quantities, timeline…"
                className="w-full resize-y rounded-xl border border-[#E3E6EF] bg-white px-3.5 py-3 text-[15px] transition focus:border-[#1B2A7A] focus:ring-4 focus:ring-[#1B2A7A]/12 focus:outline-none"
              />
            </div>

            {/* Status Message */}
            {submitFeedback && (
              <div
                role="status"
                className={`sm:col-span-2 rounded-xl p-3.5 text-[14px] leading-relaxed transition ${
                  isError
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : "bg-[#FFF4E2] text-[#121633] border border-[#F2A541]/30"
                }`}
              >
                {submitFeedback}
              </div>
            )}

            {/* Foot of Form */}
            <div className="mt-1 flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
              <p className="text-[13px] text-[#5D6382]">
                We&apos;ll only use your details to respond to this enquiry.
              </p>

              <button
                type="submit"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#1B2A7A] py-2.5 pr-2.5 pl-6 text-[14px] font-semibold text-white transition hover:bg-[#121D5C] cursor-pointer"
              >
                Send enquiry
                <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-white text-[#1B2A7A] transition-transform duration-250 ease-out group-hover:translate-x-0.5 group-hover:-rotate-45">
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5 stroke-current stroke-[2] fill-none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
