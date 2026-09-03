import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
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

      {/* The nav is pulled over the page by -mb-nav; give it its height back. */}
      <main className="pt-nav">
        <TechnologiesSection />
      </main>

      <SiteFooter />
    </>
  );
}
