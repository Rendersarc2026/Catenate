import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TechnologySupport } from "@/components/site/technologies/technology-support";
import { TechnologyShowcase } from "@/components/site/technologies/technology-showcase";
import { TechnologiesSection } from "@/components/site/technologies-section";

export const metadata: Metadata = {
  title: "Technologies — Catenate",
  description:
    "The four chemistries we carry, each with the working rules, substrates and cure data a specification needs.",
};

export default function TechnologiesPage() {
  return (
    <>
      <SiteHeader />

      <main id="content" className="pt-nav bg-white">
        <TechnologyShowcase />
        <TechnologiesSection />
        <TechnologySupport />
      </main>

      <SiteFooter />
    </>
  );
}
