"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { GlobalPresence } from "@/components/GlobalPresence";
import { IndustriesSection } from "@/components/IndustriesSection";
import { StatementSection } from "@/components/StatementSection";
import { PartnersStrip } from "@/components/PartnersStrip";
import { StrengthsSection } from "@/components/StrengthsSection";
import { TrustedBySection } from "@/components/TrustedBySection";
import { WhyCatenate } from "@/components/WhyCatenate";
import { BrandPortfolio } from "@/components/BrandPortfolio";
import { SolutionsFinder } from "@/components/SolutionsFinder";
import { AssemblySection } from "@/components/AssemblySection";
import { TechnologiesSection } from "@/components/TechnologiesSection";
import { ApprovalsSection } from "@/components/ApprovalsSection";
import { ProjectsRail } from "@/components/ProjectsRail";
import { TechnicalSupport } from "@/components/TechnicalSupport";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CertificateDrawer } from "@/components/CertificateDrawer";
import { SpecificationModal } from "@/components/SpecificationModal";
import { CertificateItem } from "@/data/catenateData";

export default function Home() {
  // Certificate Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [certKind, setCertKind] = useState<"own" | "principal">("own");

  // Specification / Contact Modal state
  const [specModalOpen, setSpecModalOpen] = useState(false);
  const [specModalTitle, setSpecModalTitle] = useState("Request a Specification");

  const handleOpenCert = (cert: CertificateItem, kind: "own" | "principal") => {
    setSelectedCert(cert);
    setCertKind(kind);
    setDrawerOpen(true);
  };

  const handleOpenSpecModal = (title: string = "Request a Technical Specification") => {
    setSpecModalTitle(title);
    setSpecModalOpen(true);
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4">
      {/* Central Shell Card */}
      <main className="shell-container">
        {/* Navigation & Header */}
        <Header onRequestSpec={() => handleOpenSpecModal("Request a Technical Specification")} />

        {/* Hero Section */}
        <Hero />

        {/* Global Presence with Interactive World Map & Stats */}
        <GlobalPresence />

        {/* Industries We Serve with Dynamic Background & Accordion */}
        <IndustriesSection />

        {/* One Chain Impact Statement */}
        <StatementSection />

        {/* Authorized Distributor Partner Strip */}
        <PartnersStrip />

        {/* Strengths Grid */}
        <StrengthsSection />

        {/* Trusted By Clients */}
        <TrustedBySection />

        {/* Why Catenate Gradient Banner */}
        <WhyCatenate />

        {/* Brand Portfolio & Principals */}
        <BrandPortfolio />

        {/* Interactive Solutions Finder Tool */}
        <SolutionsFinder onRequestSpec={handleOpenSpecModal} />

        {/* System Build-Up & Assembly Schematic */}
        <AssemblySection onRequestSpec={handleOpenSpecModal} />

        {/* Chemistries & Technologies */}
        <TechnologiesSection />

        {/* Approvals & Accreditations */}
        <ApprovalsSection onSelectCert={handleOpenCert} />

        {/* Projects Showcase Rail */}
        <ProjectsRail />

        {/* Technical Support Deliverables */}
        <TechnicalSupport />

        {/* Contact & Channel Network Cards */}
        <ContactSection onOpenModal={handleOpenSpecModal} />

        {/* Footer */}
        <Footer onOpenModal={handleOpenSpecModal} />
      </main>

      {/* Slide-out Certificate Drawer */}
      <CertificateDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        certificate={selectedCert}
        kind={certKind}
      />

      {/* Engineering Specification & Inquiry Modal */}
      <SpecificationModal
        isOpen={specModalOpen}
        onClose={() => setSpecModalOpen(false)}
        initialType={specModalTitle}
      />
    </div>
  );
}
