import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const routes = [
  "",
  "/mulch-calculator",
  "/concrete-calculator",
  "/paint-calculator",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://yardandhomecalc.com${route}/`,
    lastModified: new Date("2026-06-23"),
    changeFrequency: route.includes("calculator") || route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.includes("calculator") ? 0.8 : 0.3
  }));
}
