import type { Metadata } from "next";

import { ApprovalsSection } from "@/components/site/approvals-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "About Catenate — approvals and accreditations",
  description:
    "The certifications Catenate holds and the approvals carried by our principals, so proof travels with the system.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      {/* The nav is pulled over the page by -mb-nav; give it its height back. */}
      <main className="pt-nav">
        <ApprovalsSection />
      </main>

      <SiteFooter />
    </>
  );
}
