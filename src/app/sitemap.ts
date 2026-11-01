import type { MetadataRoute } from "next";
import { MACHINES } from "@/lib/machines";
import { ARTICLES } from "@/lib/knowledge";
import { LANGS, lp } from "@/i18n";

const BASE_URL = "https://www.kavoprovid.com.ua";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: [string, Freq, number][] = [
    ["/", "weekly", 1],
    ["/office", "weekly", 0.9],
    ["/production", "weekly", 0.9],
    ["/rishennya", "weekly", 0.8],
    ["/rishennya/porivnyannya", "monthly", 0.5],
    ["/kava-v-biznesi", "weekly", 0.7],
    ["/faq", "monthly", 0.6],
    ["/privacy", "yearly", 0.2],
    ...MACHINES.map((m): [string, Freq, number] => [`/rishennya/${m.slug}`, "weekly", 0.7]),
    ...ARTICLES.map((a): [string, Freq, number] => [`/kava-v-biznesi/${a.slug}`, "monthly", 0.6]),
  ];

  const url = (lang: (typeof LANGS)[number], path: string) =>
    lp(lang, path) === "/" ? BASE_URL : BASE_URL + lp(lang, path);

  // Every page in both languages, each entry listing its hreflang twins.
  return routes.flatMap(([path, changeFrequency, priority]) =>
    LANGS.map((lang) => ({
      url: url(lang, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { uk: url("uk", path), ru: url("ru", path) } },
    })),
  );
}
