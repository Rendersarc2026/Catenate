import type { Metadata } from "next";

import { ContactPageView } from "@/components/site/contact/contact-page-view";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Contact Us — Catenate",
  description:
    "Contact Catenate. Find the branch nearest you in Oman, the UAE, Qatar and the United Kingdom.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main id="content" className="pt-nav bg-white">
        <ContactPageView />
      </main>

      <SiteFooter />
    </>
  );
}
