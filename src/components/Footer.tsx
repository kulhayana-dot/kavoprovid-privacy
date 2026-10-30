import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

const SOLUTIONS_NAV = [
  { href: "/office", label: "Офіси" },
  { href: "/production", label: "Виробництва" },
  { href: "/rishennya", label: "Рішення" },
  { href: "/rishennya/porivnyannya", label: "Порівняння кавомашин" },
];

const COMPANY_NAV = [
  { href: "/#infrastructure", label: "Інфраструктура" },
  { href: "/#why", label: "Переваги" },
  { href: "/#process", label: "Процес" },
  { href: "/kava-v-biznesi", label: "Кава в бізнесі" },
  { href: "/faq", label: "Запитання" },
];

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo tone="dark" className="h-6" />
            <p className="mt-4 max-w-xs text-sm text-paper/50">
              Кавова інфраструктура для бізнесу в Києві та Київській
              області.
            </p>
          </div>

          <nav aria-label="Рішення">
            <span className="font-label text-xs uppercase tracking-widest text-paper/40">
              Рішення
            </span>
            <ul className="mt-4 flex flex-col gap-3">
              {SOLUTIONS_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Про компанію">
            <span className="font-label text-xs uppercase tracking-widest text-paper/40">
              Компанія
            </span>
            <ul className="mt-4 flex flex-col gap-3">
              {COMPANY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <span className="font-label text-xs uppercase tracking-widest text-paper/40">
              Контакти
            </span>
            <div className="mt-4 flex flex-col gap-2 text-sm text-paper/60">
              <a href="tel:+380636271567" className="hover:text-paper">
                +380 63 627-15-67
              </a>
              <a
                href="mailto:office@kavoprovid.com.ua"
                className="hover:text-paper"
              >
                office@kavoprovid.com.ua
              </a>
              <span>Київ та Київська область</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ТОВ «ЮНІТ КЕЙ», ЄДРПОУ 46306370.
            Усі права захищені.
          </p>
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
