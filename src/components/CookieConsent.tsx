"use client";

import { useEffect, useRef } from "react";
import { CONSENT_EVENT, getConsent, setConsent } from "@/lib/consent";

/**
 * Hidden by default so server and first client render match; an effect
 * flips visibility imperatively (no React state) once localStorage can
 * actually be read, same pattern as Preloader's display toggling.
 */
export function CookieConsent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function sync() {
      const el = ref.current;
      if (!el) return;
      el.style.display = getConsent() === null ? "block" : "none";
    }

    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return (
    <div
      ref={ref}
      style={{ display: "none" }}
      role="region"
      aria-label="Налаштування cookie-файлів"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-paper/10 bg-ink text-paper"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="max-w-2xl text-sm text-paper/70">
          Аналітичні cookie-файли допомагають нам розуміти, які розділи
          сайту цікавлять відвідувачів.{" "}
          <a href="/privacy" className="text-paper underline">
            Детальніше в політиці конфіденційності
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="chamfer-sm border border-paper/25 px-5 py-2.5 text-sm text-paper/90 transition-colors hover:border-paper/50"
          >
            Відхилити
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="chamfer-sm bg-signal px-5 py-2.5 text-sm font-medium text-ink"
          >
            Прийняти
          </button>
        </div>
      </div>
    </div>
  );
}
