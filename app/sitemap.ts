import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

const lastModified = new Date("2026-08-02");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/architecture", priority: 0.8 },
    { path: "/how-i-work", priority: 0.8 },
    { path: "/writing", priority: 0.7 },
    { path: "/about", priority: 0.7 },
  ].map((r) => ({
    url: `${profile.siteUrl}${r.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${profile.siteUrl}/work/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
