import type { Metadata } from "next";
import Link from "next/link";
import { MachineComparisonPanel } from "@/components/MachineComparisonPanel";

const TITLE = "Порівняння кавомашин — Kavoprovid";
const DESCRIPTION =
  "Технічні характеристики кавомашин Dr. Coffee та Bianchi від Kavoprovid: кількість напоїв, продуктивність, габарити, тип молока. Оберіть кілька моделей для порівняння.";

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
    { "@type": "ListItem", position: 1, name: "Kavoprovid", item: "https://kavoprovid.com.ua/" },
    { "@type": "ListItem", position: 2, name: "Рішення", item: "https://kavoprovid.com.ua/rishennya" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Порівняння",
      item: "https://kavoprovid.com.ua/rishennya/porivnyannya",
    },
  ],
};

export default function PorivnyannyaPage() {
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
              <li>
                <Link href="/rishennya" className="hover:text-paper/70">
                  Рішення
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/60" aria-current="page">
                Порівняння
              </li>
            </ol>
          </nav>
          <span className="font-label text-xs uppercase tracking-widest text-paper/50">
            Технічні характеристики
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Порівняйте кавомашини за цифрами.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-paper/60">
            Характеристики виробника — без округлень. Позначте кілька
            моделей прапорцем, щоб побачити їх поруч.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <MachineComparisonPanel />
        </div>
      </section>
    </>
  );
}
