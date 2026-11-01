import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/knowledge";
import { breadcrumbJsonLd, lp, pageMeta, tr, type Lang } from "@/i18n";

export function knowledgeHubMetadata(lang: Lang): Metadata {
  const t = tr(lang);
  return pageMeta(
    lang,
    "/kava-v-biznesi",
    t("Кава в бізнесі — база знань Kavoprovid", "Кофе в бизнесе — база знаний Kavoprovid"),
    t(
      "Практичні матеріали про кавову інфраструктуру для офісів і виробництв: як організувати, скільки потрібно, як контролювати витрати.",
      "Практические материалы о кофейной инфраструктуре для офисов и производств: как организовать, сколько нужно, как контролировать расходы.",
    ),
  );
}

export function KnowledgeHubView({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const jsonLd = breadcrumbJsonLd(lang, [[t("Кава в бізнесі", "Кофе в бизнесе"), "/kava-v-biznesi"]]);
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
                {t("Кава в бізнесі", "Кофе в бизнесе")}
              </li>
            </ol>
          </nav>

          <span className="font-label text-sm font-medium uppercase tracking-widest text-paper/70">
            {t("База знань", "База знаний")}
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("Кава в бізнесі.", "Кофе в бизнесе.")}
          </h1>
          <p className="mt-5 max-w-xl text-paper/75">
            {t(
              "Практичні матеріали про кавову інфраструктуру для офісів і виробництв — з досвіду Kavoprovid.",
              "Практические материалы о кофейной инфраструктуре для офисов и производств — из опыта Kavoprovid.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-4xl px-4 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {getArticles(lang).map((a) => (
              <Link
                key={a.slug}
                href={lp(lang, `/kava-v-biznesi/${a.slug}`)}
                className="chamfer group flex flex-col border border-ink/10 bg-ink/[0.02] p-7 transition-colors hover:border-signal"
              >
                <h2 className="font-display text-xl font-bold">{a.title}</h2>
                <p className="mt-3 flex-1 text-sm text-ink/75">{a.dek}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
                  {t("Читати", "Читать")}
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
