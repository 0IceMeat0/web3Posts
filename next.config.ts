import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
    minimumCacheTTL: 604800,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
