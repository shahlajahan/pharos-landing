import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
  },
  serverExternalPackages: ["iyzipay"],
};

export default nextConfig;
