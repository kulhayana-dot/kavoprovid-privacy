import type { Metadata } from "next";
import Link from "next/link";
import { getMachines } from "@/lib/machines";
import { LeadForm } from "@/components/LeadForm";
import { MachineCard } from "@/components/MachineCard";
import { breadcrumbJsonLd, lp, pageMeta, tr, type Lang } from "@/i18n";

export function rishennyaMetadata(lang: Lang): Metadata {
  const t = tr(lang);
  return pageMeta(
    lang,
    "/rishennya",
    t(
      "Кавове обладнання для офісу та виробництва — Kavoprovid",
      "Кофейное оборудование для офиса и производства — Kavoprovid",
    ),
    t(
      "Обладнання — частина кавової інфраструктури Kavoprovid: кавомашина, кава, сервіс і підтримка як одна система для офісів і виробництв у Києві.",
      "Оборудование — часть кофейной инфраструктуры Kavoprovid: кофемашина, кофе, сервис и поддержка как одна система для офисов и производств в Киеве.",
    ),
  );
}

export function RishennyaView({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const jsonLd = breadcrumbJsonLd(lang, [[t("Рішення", "Решения"), "/rishennya"]]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        <div className="container-start max-w-4xl px-4 lg:px-6">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-paper/75">
              <li>
                <Link href={lp(lang, "/")} className="hover:text-paper">
                  {t("Головна", "Главная")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/75" aria-current="page">
                {t("Рішення", "Решения")}
              </li>
            </ol>
          </nav>
          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("Кавові рішення", "Кофейные решения")}
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("Обладнання — частина кавової інфраструктури.", "Оборудование — часть кофейной инфраструктуры.")}
          </h1>
          <p className="mt-5 max-w-xl text-paper/75">
            {t(
              "Ми не продаємо кавомашини поштучно. Кожна модель — вузол одного рішення: обладнання, кава, сервіс і підтримка працюють разом. Оберіть модель під ваше навантаження — решту інфраструктури ми вже зібрали навколо неї.",
              "Мы не продаём кофемашины поштучно. Каждая модель — узел одного решения: оборудование, кофе, сервис и поддержка работают вместе. Выберите модель под вашу нагрузку — остальную инфраструктуру мы уже собрали вокруг неё.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getMachines(lang).map((m) => (
              <MachineCard
                key={m.slug}
                machine={m}
                headingLevel="h2"
                showBadge
                showFeature
                ctaLabel={t("Підібрати рішення", "Подобрать решение")}
                lang={lang}
              />
            ))}
          </div>

          <div className="mt-10 flex">
            <Link
              href={lp(lang, "/rishennya/porivnyannya")}
              className="chamfer-sm inline-flex items-center gap-2 border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-signal"
            >
              {t("Порівняти характеристики моделей", "Сравнить характеристики моделей")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("Ще не визначились із моделлю?", "Ещё не определились с моделью?")}
          </h2>
          <p className="mt-4 text-paper/75">
            {t(
              "Залиште контакти — розкажемо про вашу команду й підберемо модель самі.",
              "Оставьте контакты — расскажите о вашей команде, и мы подберём модель сами.",
            )}
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
