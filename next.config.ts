import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve project-owned vehicle photography directly. This keeps the raw
  // Cloudflare package and local preview independent of an image proxy.
  images: { unoptimized: true },
};

export default nextConfig;
