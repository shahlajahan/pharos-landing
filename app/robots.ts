import type { MetadataRoute } from "next";
import { siteUrl } from "./company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/pay", "/pay/*", "/payment-success", "/payment-failed", "/payment-pending"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
