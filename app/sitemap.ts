import type { MetadataRoute } from "next";
import { profile } from "@/src/content/profile";
import { projects } from "@/src/content/projects";

/** Home plus the four case study routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-04");

  return [
    { url: profile.siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${profile.siteUrl}/work/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
