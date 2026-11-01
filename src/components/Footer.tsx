"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { useLang } from "@/i18n/client";

const SOLUTIONS_NAV = [
  { href: "/office", uk: "Офіси", ru: "Офисы" },
  { href: "/production", uk: "Виробництва", ru: "Производства" },
  { href: "/rishennya", uk: "Усі рішення", ru: "Все решения" },
  { href: "/rishennya/porivnyannya", uk: "Порівняння кавомашин", ru: "Сравнение кофемашин" },
];

const COMPANY_NAV = [
  { href: "/#infrastructure", uk: "Інфраструктура", ru: "Инфраструктура" },
  { href: "/#why", uk: "Переваги", ru: "Преимущества" },
  { href: "/#process", uk: "Процес", ru: "Процесс" },
  { href: "/kava-v-biznesi", uk: "Кава в бізнесі", ru: "Кофе в бизнесе" },
  { href: "/faq", uk: "Запитання", ru: "Вопросы" },
];

export function Footer() {
  const { lang, t, href } = useLang();
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-14 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo tone="dark" className="h-6" />
            <p className="mt-4 max-w-xs text-base text-paper/75 sm:text-sm">
              {t(
                "Кавова інфраструктура для бізнесу в Києві та Київській області.",
                "Кофейная инфраструктура для бизнеса в Киеве и Киевской области.",
              )}
            </p>
          </div>

          <nav aria-label={t("Рішення", "Решения")}>
            <span className="font-label text-sm uppercase tracking-widest text-paper/70 sm:text-xs">
              {t("Рішення", "Решения")}
            </span>
            <ul className="mt-2 flex flex-col sm:mt-4 sm:gap-3">
              {SOLUTIONS_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="block py-2.5 text-base text-paper/80 transition-colors hover:text-paper sm:py-0 sm:text-sm"
                  >
                    {item[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("Про компанію", "О компании")}>
            <span className="font-label text-sm uppercase tracking-widest text-paper/70 sm:text-xs">
              {t("Компанія", "Компания")}
            </span>
            <ul className="mt-2 flex flex-col sm:mt-4 sm:gap-3">
              {COMPANY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={href(item.href)}
                    className="block py-2.5 text-base text-paper/80 transition-colors hover:text-paper sm:py-0 sm:text-sm"
                  >
                    {item[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <span className="font-label text-sm uppercase tracking-widest text-paper/70 sm:text-xs">
              {t("Контакти", "Контакты")}
            </span>
            <div className="mt-2 flex flex-col text-base text-paper sm:mt-4 sm:gap-2 sm:text-sm sm:text-paper/75">
              <a href="tel:+380636271567" className="py-2.5 font-medium hover:text-paper sm:py-0 sm:font-normal">
                +380 63 627-15-67
              </a>
              <a
                href="mailto:office@kavoprovid.com.ua"
                className="py-2.5 font-medium hover:text-paper sm:py-0 sm:font-normal"
              >
                office@kavoprovid.com.ua
              </a>
              <span className="py-2.5 text-paper/75 sm:py-0">{t("Київ та Київська область", "Киев и Киевская область")}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-paper/70 sm:flex-row sm:text-xs sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            {t(
              "ТОВ «ЮНІТ КЕЙ», ЄДРПОУ 46306370. Усі права захищені.",
              "ООО «ЮНИТ КЕЙ», ЕГРПОУ 46306370. Все права защищены.",
            )}
          </p>
          <div className="flex gap-6">
            <Link href={href("/privacy")} className="hover:text-paper/70">
              {t("Політика конфіденційності", "Политика конфиденциальности")}
            </Link>
            <CookieSettingsButton className="hover:text-paper/70" />
          </div>
        </div>
      </div>
    </footer>
  );
}
