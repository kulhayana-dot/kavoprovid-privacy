"use client";

import { clearConsent } from "@/lib/consent";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => clearConsent()}
      className={className}
    >
      Налаштування cookie-файлів
    </button>
  );
}
