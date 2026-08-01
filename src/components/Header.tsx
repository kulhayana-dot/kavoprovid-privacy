"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#infrastructure", label: "Інфраструктура" },
  { href: "#solutions", label: "Рішення" },
  { href: "#process", label: "Процес" },
  { href: "#coverage", label: "Покриття" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-paper"
        >
          Кавопровід
          <span className="text-signal">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-paper/70 transition-colors hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="tel:+380636271567"
            className="text-sm text-paper/70 transition-colors hover:text-paper"
          >
            063 627-15-67
          </a>
          <a
            href="#cta"
            className="rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-105"
          >
            Отримати консультацію
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Меню"
          className="flex size-10 items-center justify-center rounded-full border border-paper/20 md:hidden"
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
        <div className="border-t border-paper/10 bg-ink px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base text-paper/80"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:+380636271567"
              className="text-base text-paper/80"
            >
              063 627-15-67
            </a>
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-signal px-5 py-3 text-center text-sm font-medium text-ink"
            >
              Отримати консультацію
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
