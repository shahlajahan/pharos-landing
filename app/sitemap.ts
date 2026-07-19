import type { MetadataRoute } from "next";
import { legalRoutes, siteUrl } from "./company";
import { services } from "./services";

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
    {
      url: `${siteUrl}/devaudit`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/products/petsupo`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/products/hubmonix`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...legalRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];

  return routes;
}
