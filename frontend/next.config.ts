import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,  // enable minification in production
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000",
  },
  images: {
    domains: ["res.cloudinary.com"], // add if you use Cloudinary
  },
};

export default nextConfig;
