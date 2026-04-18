import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/ayahuya',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
