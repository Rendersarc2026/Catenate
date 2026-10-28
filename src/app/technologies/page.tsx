import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TechnologySupport } from "@/components/site/technologies/technology-support";
import { TechnologyIndustries } from "@/components/site/technologies/technology-industries";

export const metadata: Metadata = {
  title: "Technologies — Catenate",
  description:
    "One portfolio across many industries — from glass facades and oil fields to solar modules and bus bodies.",
};

export default function TechnologiesPage() {
  return (
    <>
      <SiteHeader />

      <main id="content" className="pt-nav bg-white">
        <TechnologyIndustries />
        <TechnologySupport />
      </main>

      <SiteFooter />
    </>
  );
}
