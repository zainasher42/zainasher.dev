import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static: every byte is known at build time. No server runtime, no
  // API routes, no database.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
