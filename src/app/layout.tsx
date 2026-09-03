import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { SmoothScroll } from "@/components/site/smooth-scroll";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
