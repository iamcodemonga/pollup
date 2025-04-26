import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ]
  }
  // images: {
  //   domains: ["res.cloudinary.com", "images.pexels.com"],
  // }
};
export default nextConfig;
