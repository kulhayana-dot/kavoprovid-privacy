import type { Metadata } from "next";
import Link from "next/link";
import { MachineComparisonPanel } from "@/components/MachineComparisonPanel";
import { breadcrumbJsonLd, lp, pageMeta, tr, type Lang } from "@/i18n";

export function porivnyannyaMetadata(lang: Lang): Metadata {
  const t = tr(lang);
  return pageMeta(
    lang,
    "/rishennya/porivnyannya",
    t("Порівняння кавомашин — Kavoprovid", "Сравнение кофемашин — Kavoprovid"),
    t(
      "Технічні характеристики кавомашин Dr. Coffee та Bianchi: кількість напоїв, продуктивність, габарити, тип молока. Оберіть моделі для порівняння.",
      "Технические характеристики кофемашин Dr. Coffee и Bianchi: количество напитков, производительность, габариты, тип молока. Выберите модели для сравнения.",
    ),
  );
}

export function PorivnyannyaView({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const jsonLd = breadcrumbJsonLd(lang, [
    [t("Рішення", "Решения"), "/rishennya"],
    [t("Порівняння", "Сравнение"), "/rishennya/porivnyannya"],
  ]);
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
              <li>
                <Link href={lp(lang, "/rishennya")} className="hover:text-paper">
                  {t("Рішення", "Решения")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/75" aria-current="page">
                {t("Порівняння", "Сравнение")}
              </li>
            </ol>
          </nav>
          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("Технічні характеристики", "Технические характеристики")}
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("Порівняйте кавомашини за цифрами.", "Сравните кофемашины по цифрам.")}
          </h1>
          <p className="mt-5 max-w-xl text-paper/75">
            {t(
              "Характеристики виробника — без округлень. Позначте кілька моделей прапорцем, щоб побачити їх поруч.",
              "Характеристики производителя — без округлений. Отметьте несколько моделей флажком, чтобы увидеть их рядом.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <h2 className="sr-only">{t("Порівняльна таблиця кавомашин", "Сравнительная таблица кофемашин")}</h2>
          <MachineComparisonPanel />
        </div>
      </section>
    </>
  );
}
