"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { LANGS, switchLangPath } from "@/i18n";
import { useLang } from "@/i18n/client";

const NAV = [
  { href: "/office", uk: "Офіси", ru: "Офисы" },
  { href: "/production", uk: "Виробництва", ru: "Производства" },
  { href: "/rishennya", uk: "Рішення", ru: "Решения" },
  { href: "/kava-v-biznesi", uk: "Кава в бізнесі", ru: "Кофе в бизнесе" },
  { href: "/#why", uk: "Переваги", ru: "Преимущества" },
  { href: "/faq", uk: "Запитання", ru: "Вопросы" },
];

const LANG_LABEL = { uk: "UA", ru: "RU" } as const;

/** UA / RU toggle: links to the same page in the other language. */
function LangSwitch({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const { lang } = useLang();
  return (
    <div className={cn("font-label flex items-center text-xs font-semibold tracking-widest", className)}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="px-1.5 text-paper/30">/</span>}
          {l === lang ? (
            <span aria-current="true" className="py-2 text-signal">
              {LANG_LABEL[l]}
            </span>
          ) : (
            <a
              href={switchLangPath(pathname, l)}
              hrefLang={l}
              lang={l}
              className="py-2 text-paper/70 transition-colors hover:text-paper"
            >
              {LANG_LABEL[l]}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, t, href } = useLang();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5 px-4 xl:gap-6 lg:px-6">
        <Link href={href("/")} className="shrink-0" aria-label={t("Kavoprovid — на головну", "Kavoprovid — на главную")}>
          <Image
            src="/brand/kavoprovid-wordmark-dark.svg"
            alt="Kavoprovid"
            width={567}
            height={100}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={href(item.href)}
              className="group relative flex items-center gap-2 whitespace-nowrap text-sm font-medium text-paper/85 transition-colors hover:text-paper"
            >
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 border border-paper/30 transition-all duration-200 group-hover:scale-125 group-hover:border-signal group-hover:bg-signal"
              />
              {item[lang]}
              <span className="absolute -bottom-1 left-0 h-px w-full overflow-hidden bg-paper/15">
                <span className="absolute inset-y-0 left-0 w-1/3 bg-signal opacity-0 transition-opacity duration-200 group-hover:animate-nav-flow group-hover:opacity-100" />
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LangSwitch />
          <a
            href="tel:+380636271567"
            className="text-sm font-medium whitespace-nowrap text-paper/85 transition-colors hover:text-paper"
          >
            +380 63 627-15-67
          </a>
          <Button href={href("/#cta")} className="whitespace-nowrap px-4 py-2.5">
            {t("Провести каву в мій бізнес", "Провести кофе в мой бизнес")}
          </Button>
        </div>

        <LangSwitch className="ml-auto xl:hidden" />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={t("Меню", "Меню")}
          className="chamfer-sm flex size-11 items-center justify-center border border-paper/50 xl:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-4 bg-paper transition-transform",
                open && "translate-y-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 bottom-0 h-px w-4 bg-paper transition-transform",
                open && "-translate-y-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-paper/10 bg-ink px-4 py-6 xl:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={href(item.href)}
                onClick={() => setOpen(false)}
                className="py-2.5 text-lg font-medium text-paper/90"
              >
                {item[lang]}
              </Link>
            ))}
            <a href="tel:+380636271567" className="py-2.5 text-lg font-medium text-paper/90">
              +380 63 627-15-67
            </a>
            <Button
              href={href("/#cta")}
              onClick={() => setOpen(false)}
              className="mt-3"
            >
              {t("Провести каву в мій бізнес", "Провести кофе в мой бизнес")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
