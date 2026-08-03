import type { Metadata } from "next";
import Link from "next/link";
import { MACHINES } from "@/lib/machines";

export const metadata: Metadata = {
  title: "Кавові рішення для офісу — Kavoprovid",
  description:
    "П'ять моделей кавомашин в оренду для офісів і підприємств Києва та Київської області. Апарат, зерно, сервіс і підтримка — в одного партнера.",
};

export default function RishennyaPage() {
  return (
    <>
      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Кавові рішення
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            П&apos;ять моделей для будь-якого офісу.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-paper/60">
            Кожна модель — під конкретне навантаження, а не універсальний
            каталог на вибір. Оберіть свою — характеристики й умови оренди
            на кожній сторінці.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MACHINES.map((m) => (
              <Link
                key={m.slug}
                href={`/rishennya/${m.slug}`}
                className="chamfer group flex flex-col border border-ink/10 bg-ink/[0.02] p-7 transition-colors hover:border-signal"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-label border border-ink/20 px-3 py-1 text-[11px] uppercase tracking-widest text-ink/50">
                    {m.tag}
                  </span>
                  {m.badge && (
                    <span className="font-label bg-signal px-3 py-1 text-[11px] uppercase tracking-widest text-ink">
                      {m.badge}
                    </span>
                  )}
                </div>

                <h2 className="font-display mt-5 text-xl font-bold">
                  {m.machine}
                </h2>

                <p className="mt-3 flex-1 text-sm text-ink/60">
                  {m.features[0]}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
                  Детальніше
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
