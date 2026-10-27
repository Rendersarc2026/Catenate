import type { Metadata } from "next";

import { AboutCareers } from "@/components/site/about/about-careers";
import { AboutCountries } from "@/components/site/about/about-countries";
import { AboutHero } from "@/components/site/about/about-hero";
import { AboutIndustries } from "@/components/site/about/about-industries";
import { AboutStatement } from "@/components/site/about/about-statement";
import { AboutTeam } from "@/components/site/about/about-team";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StrengthsSection } from "@/components/site/strengths-section";

export const metadata: Metadata = {
  title: "About Us — Catenate",
  description:
    "Connecting the world's trusted brands to the builders who need them — bonding, sealing and protection systems, moved with the same discipline every time.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="content" className="bg-white">
        <AboutHero />
        <AboutStatement />
        <AboutCountries />
        <StrengthsSection />
        <AboutIndustries />
        <AboutTeam />
        <AboutCareers />
      </main>

      <SiteFooter />
    </>
  );
}
