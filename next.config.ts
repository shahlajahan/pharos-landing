import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["iyzipay"],
  images: {
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
