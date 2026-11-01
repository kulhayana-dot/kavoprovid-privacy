"use client";

import { usePathname } from "next/navigation";
import { langFromPath, lp, tr, type Lang } from "@/i18n";

/** Language of the current page, derived from the URL (/ru/... = Russian). */
export function useLang() {
  const lang: Lang = langFromPath(usePathname());
  return { lang, t: tr(lang), href: (path: string) => lp(lang, path) };
}
