import type { Metadata } from "next";
import Link from "next/link";
import { MACHINES } from "@/lib/machines";
import { LeadForm } from "@/components/LeadForm";

const TITLE = "Кавове обладнання для офісу та виробництва — Kavoprovid";
const DESCRIPTION =
  "Обладнання — частина кавової інфраструктури Kavoprovid: апарат, кава, сервіс і підтримка працюють як одна система для офісів і виробництв у Києві та Київській області.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "uk_UA",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Kavoprovid",
      item: "https://kavoprovid.com.ua/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Рішення",
      item: "https://kavoprovid.com.ua/rishennya",
    },
  ],
};

export default function RishennyaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex items-center justify-center gap-2 text-xs text-paper/40">
              <li>
                <Link href="/" className="hover:text-paper/70">
                  Kavoprovid
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/60" aria-current="page">
                Рішення
              </li>
            </ol>
          </nav>
          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Кавові рішення
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Обладнання — частина кавової інфраструктури.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-paper/60">
            Ми не продаємо кавомашини поштучно. Кожна модель — вузол одного
            рішення: обладнання, кава, сервіс і підтримка працюють разом.
            Оберіть модель під ваше навантаження — решту інфраструктури ми
            вже зібрали навколо неї.
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
                className="chamfer group flex flex-col overflow-hidden border border-ink/10 bg-ink/[0.02] transition-colors hover:border-signal"
              >
                {m.photo && (
                  <div className="relative aspect-[4/3] bg-ink">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.photo.src}
                      alt={m.machine}
                      className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-label border border-ink/20 px-3 py-1 text-[11px] uppercase tracking-widest text-ink/60">
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

                  <p className="font-label mt-2 text-xs uppercase tracking-widest text-ink/40">
                    {m.audienceFit}
                  </p>

                  <p className="mt-3 flex-1 text-sm text-ink/60">
                    {m.features[0]}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
                    Підібрати рішення
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Ще не визначились із моделлю?
          </h2>
          <p className="mt-4 text-paper/60">
            Залиште контакти — розкажемо про вашу команду й підберемо модель
            самі.
          </p>
          <LeadForm
            source="Rishennya hub"
            className="mx-auto mt-8 max-w-sm text-left"
          />
        </div>
      </section>
    </>
  );
}
