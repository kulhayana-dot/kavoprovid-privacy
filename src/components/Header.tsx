"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";

const NAV = [
  { href: "/#infrastructure", label: "Інфраструктура" },
  { href: "/#solutions", label: "Рішення" },
  { href: "/#why", label: "Переваги" },
  { href: "/#process", label: "Процес" },
  { href: "/#coverage", label: "Покриття" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="Kavoprovid — на початок">
          <Logo tone="dark" className="h-7 sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm text-paper/70 transition-colors hover:text-paper"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 ease-out group-hover:scale-x-100" />
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
          <Button href="/#cta" className="px-5 py-2.5">
            Підключити офіс
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Меню"
          className="chamfer-sm flex size-10 items-center justify-center border border-paper/20 md:hidden"
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
            <a href="tel:+380636271567" className="text-base text-paper/80">
              063 627-15-67
            </a>
            <Button
              href="/#cta"
              onClick={() => setOpen(false)}
              className="mt-2"
            >
              Підключити офіс
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
