"use client";

import { useEffect } from "react";
import { useLang } from "@/i18n/client";

/** The root layout is shared by both languages and renders lang="uk";
 *  correct it on /ru pages (hreflang alternates carry the SEO signal). */
export function HtmlLang() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

export function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
    >
      {t("Перейти до основного контенту", "Перейти к основному содержимому")}
    </a>
  );
}
