import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next.config.js
  experimental: {
    optimizeCss: false, // disables lightningcss
  },
};

export default nextConfig;
