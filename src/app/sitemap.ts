import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/case-studies";
import { projects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/case-study`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = getAllCaseStudies().map((s) => ({
    url: `${SITE.url}/case-study/${s.slug}`,
    lastModified: s.date ? new Date(s.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...caseStudyRoutes, ...projectRoutes];
}
