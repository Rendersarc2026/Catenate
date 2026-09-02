import { ApprovalsSection } from "@/components/site/approvals-section";
import { BrandPortfolio } from "@/components/site/brand-portfolio";
import { ContactSection } from "@/components/site/contact-section";
import {
  PartnersStrip,
  ProjectsRail,
  StatementSection,
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
import { SolutionsFinder } from "@/components/site/solutions-finder";
import { TechnologiesSection } from "@/components/site/technologies-section";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <HeroStatement />
        <GlobalPresence />
        <IndustriesSection />
        <StatementSection />
        <PartnersStrip />
        <StrengthsSection />
        <TrustedBySection />
        <WhyCatenate />
        <BrandPortfolio />
        <SolutionsFinder />
        <TechnologiesSection />
        <ApprovalsSection />
        <ProjectsRail />
        <TechnicalSupport />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
