import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const routes = [
  { path: "", lastModified: "2026-06-23" },
  { path: "/mulch-calculator", lastModified: "2026-07-06" },
  { path: "/concrete-calculator", lastModified: "2026-07-06" },
  { path: "/paint-calculator", lastModified: "2026-07-11" },
  { path: "/about", lastModified: "2026-06-23" },
  { path: "/contact", lastModified: "2026-06-23" },
  { path: "/privacy", lastModified: "2026-06-23" },
  { path: "/terms", lastModified: "2026-06-23" },
  { path: "/disclaimer", lastModified: "2026-06-23" }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://yardandhomecalc.com${route.path}/`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.path.includes("calculator") || route.path === "" ? "monthly" : "yearly",
    priority: route.path === "" ? 1 : route.path.includes("calculator") ? 0.8 : 0.3
  }));
}
