import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ARTICLES, getArticle } from "@/lib/knowledge";
import { cn } from "@/lib/cn";
import { absUrl, breadcrumbJsonLd, lp, pageMeta, tr, type Lang } from "@/i18n";

export function articleStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function articleMetadata(slug: string, lang: Lang): Metadata {
  const article = getArticle(slug, lang);
  if (!article) return {};
  return pageMeta(lang, `/kava-v-biznesi/${article.slug}`, article.metaTitle, article.metaDescription, "article");
}

export function ArticleView({ slug, lang }: { slug: string; lang: Lang }) {
  const article = getArticle(slug, lang);
  if (!article) notFound();
  const t = tr(lang);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    publisher: { "@type": "Organization", name: "Kavoprovid" },
    author: { "@type": "Organization", name: "Kavoprovid" },
    inLanguage: lang,
    mainEntityOfPage: absUrl(lang, `/kava-v-biznesi/${article.slug}`),
    ...(article.slug === "kontrol-vytrat-na-kavu-na-vyrobnytstvi" && {
      image: "https://www.kavoprovid.com.ua/hero/kontrol-vytrat-cutout.png",
    }),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const crumbsJsonLd = breadcrumbJsonLd(lang, [
    [t("Кава в бізнесі", "Кофе в бизнесе"), "/kava-v-biznesi"],
    [article.title, `/kava-v-biznesi/${article.slug}`],
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsJsonLd) }}
      />

      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        {article.slug === "kontrol-vytrat-na-kavu-na-vyrobnytstvi" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_58%,rgba(252,237,79,0.16),transparent_55%)]"
          />
        )}
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-6">
          <div className="max-w-2xl">
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-paper/75">
                <li>
                  <Link href={lp(lang, "/")} className="hover:text-paper">
                    {t("Головна", "Главная")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={lp(lang, "/kava-v-biznesi")} className="hover:text-paper">
                    {t("Кава в бізнесі", "Кофе в бизнесе")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-paper/75" aria-current="page">
                  {article.title}
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-paper/75">{article.dek}</p>
            <time
              dateTime={article.datePublished}
              className="mt-3 block text-xs text-paper/60"
            >
              {new Date(article.datePublished).toLocaleDateString(lang === "ru" ? "ru-UA" : "uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          {article.slug === "kontrol-vytrat-na-kavu-na-vyrobnytstvi" && (
            <div className="relative h-64 w-full shrink-0 sm:h-80 lg:h-[420px] lg:w-[380px]">
              <Image
                src="/hero/kontrol-vytrat-cutout.png"
                alt={t("Кавомашина Dr.coffee з платіжним терміналом", "Кофемашина Dr.coffee с платёжным терминалом")}
                fill
                priority
                sizes="(min-width: 1024px) 380px, 60vw"
                className="object-contain object-bottom"
              />
            </div>
          )}
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-28">
        <div className="container-start max-w-3xl px-4 lg:px-6">
          <article>
            {article.sections.map((section, i) => (
              <div
                key={section.heading ?? section.paragraphs[0]}
                className={cn(
                  "grid gap-4 py-10 sm:grid-cols-[3rem_1fr] sm:gap-8 sm:py-12",
                  i > 0 && "border-t border-ink/10",
                )}
              >
                <span className="font-display hidden text-lg font-bold text-signal/70 sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  {section.heading && (
                    <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((p) => (
                      <p key={p} className="text-lg leading-relaxed text-ink/75">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </article>

          {article.faq.length > 0 && (
            <div className="mt-16 border-t border-ink/10 pt-14">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t("Запитання", "Вопросы")}</h2>
              <Accordion type="single" collapsible className="mt-6 space-y-4">
                {article.faq.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {article.related && article.related.length > 0 && (
            <div className="mt-16 border-t border-ink/10 pt-14">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{t("Читайте також", "Читайте также")}</h2>
              <ul className="mt-6 space-y-3">
                {article.related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="inline-flex items-center gap-2 text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                    >
                      {r.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="bg-ink py-16 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-4 lg:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t(
              "Підключіть кавову інфраструктуру для виробництва.",
              "Подключите кофейную инфраструктуру для производства.",
            )}
          </h2>
          <p className="mt-4 text-paper/75">
            {t(
              "Одна розмова — і порахуємо, який ліміт і яке обладнання підійдуть саме вашому майданчику.",
              "Один разговор — и посчитаем, какой лимит и какое оборудование подойдут именно вашей площадке.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="tel:+380636271567">{t("Підключити виробництво", "Подключить производство")}</Button>
            <Button href={lp(lang, "/production")} variant="secondary">
              {t("Про інфраструктуру для виробництв", "Об инфраструктуре для производств")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
