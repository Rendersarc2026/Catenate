import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";

import { ScrollArrows } from "@/components/site/scroll-arrows";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import "./globals.css";

/*
 * The brand pairing: Geist for headlines and other display sizes, Space
 * Grotesk for body copy and UI text. Both are variable, so each is one
 * `@font-face` spanning its weight range rather than a rule per weight.
 */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
    <html lang="en" className={`${geist.variable} ${spaceGrotesk.variable} antialiased`}>
      {/*
       * Extensions such as ColorZilla stamp their own attributes onto <body>
       * before React hydrates (`cz-shortcut-listen`), which React reports as a
       * mismatch against the server HTML. The suppression is one level deep,
       * so it covers the body tag's own attributes and nothing inside it.
       */}
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollArrows />
      </body>
    </html>
  );
}
