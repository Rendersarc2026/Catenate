import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Catenate — Bonding, sealing and protection systems",
  description:
    "A global market intelligence & distribution platform built around Trusted Brands, Efficient Teams, Technical knowhow & Dependable Supply Chain. Connecting international legacy brands to your doorstep.",
  keywords: [
    "Catenate",
    "Bonding",
    "Sealing",
    "Construction chemicals",
    "Henkel",
    "Polybit",
    "Weld-On",
    "Würth",
    "GE Sealants",
    "Sika",
    "Waterproofing",
    "Industrial adhesives",
  ],
  authors: [{ name: "Catenate" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} font-sans`}>
      <body className="antialiased selection:bg-[#1B2A7A] selection:text-white">
        {children}
      </body>
    </html>
  );
}
