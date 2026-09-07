import type { Metadata } from "next";

import { AboutHero } from "@/components/site/about-hero";
import { ApprovalsSection } from "@/components/site/approvals-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "About Catenate — Channel Partner Network & Approvals",
  description:
    "The certifications Catenate holds and the approvals carried by our principals, so proof travels with the system.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="content">
        <AboutHero />
        <ApprovalsSection />
      </main>

      <SiteFooter />
    </>
  );
}
