import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TechnologiesHero } from "@/components/site/technologies/technologies-hero";
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

      {/* No `pt-nav` here: the nav is pulled over the hero on purpose, and the
          hero gives the height back from the inside. */}
      <main id="content" className="bg-white">
        <TechnologiesHero />
        <TechnologyShowcase />
        <TechnologiesSection />
        <TechnologySupport />
      </main>

      <SiteFooter />
    </>
  );
}
