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
import { Wordmark } from "@/components/Wordmark";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/kava-v-biznesi/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      locale: "uk_UA",
      type: "article",
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: article.metaTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    publisher: { "@type": "Organization", name: "Kavoprovid" },
    author: { "@type": "Organization", name: "Kavoprovid" },
    mainEntityOfPage: `https://www.kavoprovid.com.ua/kava-v-biznesi/${article.slug}`,
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kavoprovid", item: "https://www.kavoprovid.com.ua/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Кава в бізнесі",
        item: "https://www.kavoprovid.com.ua/kava-v-biznesi",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://www.kavoprovid.com.ua/kava-v-biznesi/${article.slug}`,
      },
    ],
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        {article.slug === "kontrol-vytrat-na-kavu-na-vyrobnytstvi" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_58%,rgba(252,237,79,0.16),transparent_55%)]"
          />
        )}
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8">
          <div className="max-w-2xl">
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-paper/58">
                <li>
                  <Link href="/" className="inline-flex opacity-90 transition-opacity hover:opacity-100">
                    <Wordmark tone="dark" className="h-4" />
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/kava-v-biznesi" className="hover:text-paper/70">
                    Кава в бізнесі
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-paper/60" aria-current="page">
                  {article.title}
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-paper/60">{article.dek}</p>
          </div>

          {article.slug === "kontrol-vytrat-na-kavu-na-vyrobnytstvi" && (
            <div className="relative h-64 w-full shrink-0 sm:h-80 lg:h-[420px] lg:w-[380px]">
              <Image
                src="/hero/kontrol-vytrat-cutout.png"
                alt="Кавомашина Dr.coffee з платіжним терміналом"
                fill
                priority
                sizes="(min-width: 1024px) 380px, 60vw"
                className="object-contain object-bottom"
              />
            </div>
          )}
        </div>
      </section>

      <section className="bg-paper py-20 text-ink sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
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
                      <p key={p} className="text-lg leading-relaxed text-ink/70">
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
              <h2 className="font-display text-xl font-bold">Запитання</h2>
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
        </div>
      </section>

      <section className="bg-ink py-20 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Підключіть кавову інфраструктуру для виробництва.
          </h2>
          <p className="mt-4 text-paper/60">
            Одна розмова — і порахуємо, який ліміт і яке обладнання підійдуть
            саме вашому майданчику.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="tel:+380636271567">Підключити виробництво</Button>
            <Button href="/production" variant="secondary">
              Про інфраструктуру для виробництв
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
