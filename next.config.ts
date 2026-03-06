import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["localhost"],
  images: {
    unoptimized: true, // Disable Next.js image optimization (not supported with static export)
  },
  /* config options here */
};

export default nextConfig;
