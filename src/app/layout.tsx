import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { SmoothScroll } from "@/components/site/smooth-scroll";
import "./globals.css";

/*
 * Figtree is variable, so no weight list: one `@font-face` spanning 300-900
 * rather than seven rules that all resolve to the same file. Next already
 * served the variable file either way, so this is tidier CSS, not fewer bytes.
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
