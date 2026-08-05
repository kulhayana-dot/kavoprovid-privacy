import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

const NAV = [
  { href: "/office", label: "Офіси" },
  { href: "/production", label: "Виробництва" },
  { href: "/#infrastructure", label: "Інфраструктура" },
  { href: "/rishennya", label: "Рішення" },
  { href: "/#why", label: "Переваги" },
  { href: "/#process", label: "Процес" },
  { href: "/#coverage", label: "Покриття" },
];

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <Logo tone="dark" className="h-4" />
            <p className="mt-4 max-w-xs text-sm text-paper/50">
              Кавова інфраструктура для бізнесу в Києві та Київській
              області.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-paper/60 transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-sm text-paper/60">
            <a href="tel:+380636271567" className="hover:text-paper">
              063 627-15-67
            </a>
            <a
              href="mailto:hello@kavoprovid.com.ua"
              className="hover:text-paper"
            >
              hello@kavoprovid.com.ua
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ТОВ «ЮНІТ КЕЙ». Усі права захищені.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-paper/70">
              Політика конфіденційності
            </Link>
            <CookieSettingsButton className="hover:text-paper/70" />
          </div>
        </div>
      </div>
    </footer>
  );
}
