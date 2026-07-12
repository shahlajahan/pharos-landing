import type { MetadataRoute } from "next";
import { legalRoutes, siteUrl } from "./company";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-03");
  const routes = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/devclean`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...legalRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];

  return routes;
}
