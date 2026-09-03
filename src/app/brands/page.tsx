import type { Metadata } from "next";

import { BrandPortfolio } from "@/components/site/brand-portfolio";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Brands and products — Catenate",
  description:
    "Five principals and twenty-eight product families, from bonding and sealing to waterproofing and concrete repair.",
};

export default function BrandsPage() {
  return (
    <>
      <SiteHeader />

      {/* The nav is pulled over the page by -mb-nav; give it its height back. */}
      <main className="pt-nav">
        <BrandPortfolio />
      </main>

      <SiteFooter />
    </>
  );
}
