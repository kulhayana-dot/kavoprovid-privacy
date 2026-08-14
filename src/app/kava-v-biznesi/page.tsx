import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/knowledge";

const TITLE = "Кава в бізнесі — база знань Kavoprovid";
const DESCRIPTION =
  "Практичні матеріали про кавову інфраструктуру для офісів і виробництв: як організувати, скільки потрібно, як контролювати витрати.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kava-v-biznesi" },
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
    { "@type": "ListItem", position: 1, name: "Kavoprovid", item: "https://kavoprovid.com.ua/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Кава в бізнесі",
      item: "https://kavoprovid.com.ua/kava-v-biznesi",
    },
  ],
};

export default function KnowledgeHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="flex items-center justify-center gap-2 text-xs text-paper/58">
              <li>
                <Link href="/" className="hover:text-paper/70">
                  Kavoprovid
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/60" aria-current="page">
                Кава в бізнесі
              </li>
            </ol>
          </nav>

          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            База знань
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Кава в бізнесі.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-paper/60">
            Практичні матеріали про кавову інфраструктуру для офісів і
            виробництв — з досвіду Kavoprovid.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {ARTICLES.map((a) => (
              <Link
                key={a.slug}
                href={`/kava-v-biznesi/${a.slug}`}
                className="chamfer group flex flex-col border border-ink/10 bg-ink/[0.02] p-7 transition-colors hover:border-signal"
              >
                <h2 className="font-display text-xl font-bold">{a.title}</h2>
                <p className="mt-3 flex-1 text-sm text-ink/60">{a.dek}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
                  Читати
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
