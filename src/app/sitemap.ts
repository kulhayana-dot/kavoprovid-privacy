import type { MetadataRoute } from "next";
import { MACHINES } from "@/lib/machines";

const BASE_URL = "https://kavoprovid.com.ua";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/rishennya`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const machineRoutes: MetadataRoute.Sitemap = MACHINES.map((m) => ({
    url: `${BASE_URL}/rishennya/${m.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...machineRoutes];
}
