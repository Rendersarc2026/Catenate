import { ContactSection } from "@/components/site/contact-section";
import {
  ProjectsRail,
  StrengthsSection,
  TechnicalSupport,
  TrustedBySection,
  WhyCatenate,
} from "@/components/site/editorial-sections";
import { GlobalPresence } from "@/components/site/global-presence";
import { Hero } from "@/components/site/hero";
import { HeroStatement } from "@/components/site/hero-statement";
import { IndustriesSection } from "@/components/site/industries-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { WhatWeDo } from "@/components/site/what-we-do";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <HeroStatement />
        <WhatWeDo />
        <GlobalPresence />
        <IndustriesSection />
        <StrengthsSection />
        <TrustedBySection />
        <WhyCatenate />
        <ProjectsRail />
        <TechnicalSupport />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
