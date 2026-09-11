import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { SmoothScroll } from "@/components/site/smooth-scroll";
import "./globals.css";

/*
 * Montserrat stands in for Gotham, which is licensed and cannot be bundled.
 * It is the closest geometric sans on Google Fonts — same circular bowls and
 * tall, open apertures — and it is variable, so this is one `@font-face`
 * spanning 100-900 rather than a rule per weight.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
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
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
