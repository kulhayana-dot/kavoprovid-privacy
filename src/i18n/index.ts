export type Lang = "uk" | "ru";

export const LANGS: Lang[] = ["uk", "ru"];

/** Ukrainian lives at the site root, Russian under /ru. */
export function langFromPath(pathname: string | null | undefined): Lang {
  return pathname === "/ru" || pathname?.startsWith("/ru/") ? "ru" : "uk";
}

/** Prefixes an internal path for the given language; leaves tel:, mailto:,
 *  external URLs and bare #anchors untouched. */
export function lp(lang: Lang, href: string): string {
  if (lang === "uk" || !href.startsWith("/") || href.startsWith("/ru")) return href;
  if (href === "/") return "/ru";
  if (href.startsWith("/#")) return `/ru${href.slice(1)}`;
  return `/ru${href}`;
}

/** The same page in the other language. */
export function switchLangPath(pathname: string, to: Lang): string {
  const base = langFromPath(pathname) === "ru" ? pathname.replace(/^\/ru/, "") || "/" : pathname;
  return lp(to, base);
}

/** Picks the string for the active language: t(lang)("укр", "рус"). */
export function tr(lang: Lang) {
  return <T,>(uk: T, ru: T): T => (lang === "ru" ? ru : uk);
}

/** canonical + hreflang alternates for a Ukrainian base path. */
export function alternates(lang: Lang, path: string) {
  return {
    canonical: lp(lang, path),
    languages: { uk: path, ru: lp("ru", path), "x-default": path },
  };
}

export const OG_LOCALE: Record<Lang, string> = { uk: "uk_UA", ru: "ru_UA" };

const SITE = "https://www.kavoprovid.com.ua";

/** Absolute URL for JSON-LD. */
export function absUrl(lang: Lang, path: string): string {
  return SITE + (lp(lang, path) === "/" ? "/" : lp(lang, path));
}

/** Title/description + canonical, hreflang, Open Graph and Twitter card. */
export function pageMeta(
  lang: Lang,
  path: string,
  title: string,
  description: string,
  type: "website" | "article" = "website",
) {
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      title,
      description,
      locale: OG_LOCALE[lang],
      type,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

/** BreadcrumbList JSON-LD; crumbs are [name, base path] pairs after the home crumb. */
export function breadcrumbJsonLd(lang: Lang, crumbs: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Kavoprovid", "/"] as [string, string], ...crumbs].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absUrl(lang, path),
    })),
  };
}
