import type { Metadata } from "next";

import { AboutFeature } from "@/components/site/about/about-feature";
import { AboutGlobalChain } from "@/components/site/about/about-global-chain";
import { AboutHero } from "@/components/site/about/about-hero";
import { AboutNetworkTeam } from "@/components/site/about/about-network-team";
import { AboutPowerBuild } from "@/components/site/about/about-power-build";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "About Us — Catenate",
  description:
    "Connecting the world's trusted brands to the builders who need them — bonding, sealing and protection systems, moved with the same discipline every time.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="content" className="bg-black">
        <AboutHero />
        <AboutGlobalChain />
        <AboutPowerBuild />
        <AboutFeature />
        <AboutNetworkTeam />
      </main>

      <SiteFooter />
    </>
  );
}
