import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { ARTICLES, getArticle } from "@/lib/knowledge";

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
    publisher: { "@type": "Organization", name: "Kavoprovid" },
    author: { "@type": "Organization", name: "Kavoprovid" },
    mainEntityOfPage: `https://kavoprovid.com.ua/kava-v-biznesi/${article.slug}`,
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
      { "@type": "ListItem", position: 1, name: "Kavoprovid", item: "https://kavoprovid.com.ua/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Кава в бізнесі",
        item: "https://kavoprovid.com.ua/kava-v-biznesi",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://kavoprovid.com.ua/kava-v-biznesi/${article.slug}`,
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

      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-paper/40">
              <li>
                <Link href="/" className="hover:text-paper/70">
                  Kavoprovid
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
      </section>

      <section className="bg-paper py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <article className="space-y-12">
            {article.sections.map((section) => (
              <div key={section.heading ?? section.paragraphs[0]}>
                {section.heading && (
                  <h2 className="font-display text-xl font-bold sm:text-2xl">
                    {section.heading}
                  </h2>
                )}
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((p) => (
                    <p key={p} className="text-ink/70 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </article>

          {article.faq.length > 0 && (
            <div className="mt-16 border-t border-ink/10 pt-14">
              <h2 className="font-display text-xl font-bold">Запитання</h2>
              <div className="mt-6 space-y-4">
                {article.faq.map((item) => (
                  <details key={item.q} className="chamfer-sm group border border-ink/10 p-5">
                    <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-ink/60">{item.a}</p>
                  </details>
                ))}
              </div>
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
