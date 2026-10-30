import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

const SOLUTIONS_NAV = [
  { href: "/office", label: "Офіси" },
  { href: "/production", label: "Виробництва" },
  { href: "/rishennya", label: "Усі рішення" },
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
      <div className="mx-auto max-w-7xl px-4 pb-[calc(3.5rem+env(safe-area-inset-bottom))] pt-14 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo tone="dark" className="h-6" />
            <p className="mt-4 max-w-xs text-base text-paper/75 sm:text-sm">
              Кавова інфраструктура для бізнесу в Києві та Київській
              області.
            </p>
          </div>

          <nav aria-label="Рішення">
            <span className="font-label text-sm uppercase tracking-widest text-paper/70 sm:text-xs">
              Рішення
            </span>
            <ul className="mt-2 flex flex-col sm:mt-4 sm:gap-3">
              {SOLUTIONS_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2.5 text-base text-paper/80 transition-colors hover:text-paper sm:py-0 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Про компанію">
            <span className="font-label text-sm uppercase tracking-widest text-paper/70 sm:text-xs">
              Компанія
            </span>
            <ul className="mt-2 flex flex-col sm:mt-4 sm:gap-3">
              {COMPANY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2.5 text-base text-paper/80 transition-colors hover:text-paper sm:py-0 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <span className="font-label text-sm uppercase tracking-widest text-paper/70 sm:text-xs">
              Контакти
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
              <span className="py-2.5 text-paper/75 sm:py-0">Київ та Київська область</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-paper/70 sm:flex-row sm:text-xs sm:items-center sm:justify-between">
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
