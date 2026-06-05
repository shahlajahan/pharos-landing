import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
  },
  outputFileTracingIncludes: {
    "/api/payment/*": ["./node_modules/iyzipay/lib/resources/**/*"],
  },
};

export default nextConfig;
