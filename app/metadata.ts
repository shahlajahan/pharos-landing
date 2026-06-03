import type { Metadata } from "next";
import { siteUrl } from "./company";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title: `${title} | Pharos Teknoloji`,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | Pharos Teknoloji`,
      description,
      url,
      siteName: "Pharos Teknoloji",
      locale: "tr_TR",
      type: "website",
      images: ["/logo.png"],
    },
    twitter: {
      card: "summary",
      title: `${title} | Pharos Teknoloji`,
      description,
      images: ["/logo.png"],
    },
  };
}
