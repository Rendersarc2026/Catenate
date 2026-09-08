import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { SmoothScroll } from "@/components/site/smooth-scroll";
import "./globals.css";

/*
 * Figtree is a variable font, so naming weights explicitly fetched seven
 * separate static files — one per weight, all render-blocking-ish on first
 * paint. Omitting `weight` takes the variable file instead: one request that
 * covers the whole 300-900 range the design uses.
 */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catenate — Bonding, sealing and construction chemicals",
  description:
    "A global market intelligence and distribution platform for bonding, sealing and construction chemicals — trusted brands, technical knowhow and a dependable supply chain.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
