"use client";

import { clearConsent } from "@/lib/consent";
import { useLang } from "@/i18n/client";

export function CookieSettingsButton({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <button
      type="button"
      onClick={() => clearConsent()}
      className={className}
    >
      {t("Налаштування cookie-файлів", "Настройки cookie-файлов")}
    </button>
  );
}
