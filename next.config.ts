import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography. Replace with the real asset host.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    // Modern formats first; the site's photography is all large and decorative.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    /*
     * Rewrites barrel imports to deep ones so a single icon does not pull the
     * whole set through the bundler.
     */
    optimizePackageImports: ["lucide-react", "@base-ui/react"],
  },
};

export default nextConfig;
