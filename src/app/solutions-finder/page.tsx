import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { FinderExperience } from "@/components/site/solutions-finder/finder-experience";
import { FinderHero } from "@/components/site/solutions-finder/finder-hero";

export const metadata: Metadata = {
  title: "Solutions finder — Catenate",
  description:
    "Choose an application and the conditions it works under, and see the recommended system build-up, component by component.",
};

export default function SolutionsFinderPage() {
  return (
    <>
      <SiteHeader />

      {/* The nav is pulled over the page by -mb-nav; give it its height back. */}
      <main className="pt-nav">
        <FinderHero />
        <FinderExperience />
      </main>

      <SiteFooter />
    </>
  );
}
