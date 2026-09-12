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
    /*
     * Optimised images are cached for a week rather than the default four
     * hours. The imagery here is marketing photography that changes on the
     * scale of months, so re-deriving an AVIF six times a day buys nothing.
     *
     * The cost of raising this is staleness: there is no way to invalidate the
     * cache, and several sources are addressed by a stable path
     * (`/images/industries/<slug>.jpg`), so a photo swapped in at the same
     * filename keeps serving the old one to anyone who already has it until
     * the week is out. Lower it, or rename the file, when swapping artwork.
     */
    minimumCacheTTL: 604800,
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
