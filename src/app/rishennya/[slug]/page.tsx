import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { LeadForm } from "@/components/LeadForm";
import { MachinePhoto } from "@/components/MachinePhoto";
import { IconCheck } from "@/components/icons";
import { MACHINES, getMachine } from "@/lib/machines";
import { FIT_AUDIENCE, NOT_FIT_AUDIENCE } from "@/lib/audience";

export function generateStaticParams() {
  return MACHINES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) return {};

  return {
    title: machine.metaTitle,
    description: machine.metaDescription,
    alternates: { canonical: `/rishennya/${machine.slug}` },
    openGraph: {
      title: machine.metaTitle,
      description: machine.metaDescription,
      locale: "uk_UA",
      type: "website",
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: machine.metaTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: machine.metaTitle,
      description: machine.metaDescription,
      images: ["/og-image.png"],
    },
  };
}

function faqFor(machine: { machine: string; threshold: number }) {
  return [
    {
      q: `Скільки коштує оренда ${machine.machine}?`,
      a: `Оренда безкоштовна від ${machine.threshold} кг кави на місяць — конкретну умову для вашого офісу назвемо після короткої розмови про команду.`,
    },
    {
      q: "Що входить у сервіс?",
      a: "Апарат, зерно, чистка й ремонт за графіком, підмінне обладнання на час ремонту та один контакт на всі випадки — без списку окремих постачальників.",
    },
    {
      q: "Чи можна спробувати перед підписанням?",
      a: "Так — апарат працює у вас 7 днів, команда п'є каву, ви оцінюєте сервіс до підпису договору.",
    },
    {
      q: `Де ви обслуговуєте ${machine.machine}?`,
      a: "У Києві та Київській області — технік доїжджає в межах години, а не днів.",
    },
  ];
}

export default async function MachinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const machine = getMachine(slug);
  if (!machine) notFound();

  const faq = faqFor(machine);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div
            className={
              machine.photo
                ? "grid gap-12 lg:grid-cols-[420px_1fr] lg:items-center lg:gap-16"
                : "max-w-4xl"
            }
          >
            <div>
              <Link
                href="/rishennya"
                className="text-sm text-paper/50 transition-colors hover:text-paper/80"
              >
                ← Усі рішення
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="font-label border border-paper/20 px-3 py-1 text-[11px] uppercase tracking-widest text-paper/50">
                  {machine.tag}
                </span>
                {machine.badge && (
                  <span className="font-label bg-signal px-3 py-1 text-[11px] uppercase tracking-widest text-ink">
                    {machine.badge}
                  </span>
                )}
              </div>

              <h1 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {machine.machine} в оренду для офісу
              </h1>

              <p className="mt-6 max-w-2xl text-paper/60">{machine.intro}</p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="tel:+380636271567">Підключити офіс</Button>
                <Button href="#faq" variant="secondary">
                  Умови й запитання
                </Button>
              </div>
            </div>

            {machine.photo && (
              <MachinePhoto
                src={machine.photo.src}
                alt={machine.machine}
                callouts={machine.photo.callouts}
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
            <ul className="space-y-3">
              {machine.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink/70">
                  <IconCheck className="size-4 shrink-0 text-signal" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="chamfer-sm flex items-center justify-between gap-6 border border-ink/10 bg-ink/[0.02] px-5 py-4 sm:flex-col sm:items-start sm:justify-start">
              <span className="font-label text-xs uppercase tracking-widest text-ink/60">
                Оренда безкоштовна від
              </span>
              <span className="font-display text-2xl font-bold">
                {machine.threshold} кг
              </span>
            </div>
          </div>

          <div className="mt-16 grid gap-10 border-t border-ink/10 pt-14 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-lg font-bold">
                Кому підходимо:
              </h2>
              <ul className="mt-4 space-y-2">
                {FIT_AUDIENCE.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-ink/60">
                    <IconCheck className="size-4 shrink-0 text-signal" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold">Кому — ні:</h2>
              <ul className="mt-4 space-y-2">
                {NOT_FIT_AUDIENCE.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-ink/60">
                    <span className="block size-4 shrink-0 text-center leading-4 text-ink/50">
                      ×
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="faq" className="mt-16 scroll-mt-24 border-t border-ink/10 pt-14">
            <h2 className="font-display text-2xl font-bold">Запитання</h2>
            <div className="mt-8 space-y-6">
              {faq.map((item) => (
                <details key={item.q} className="chamfer-sm group border border-ink/10 p-5">
                  <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-ink/60">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-center text-paper sm:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Підключіть {machine.machine} до офісу.
          </h2>
          <p className="mt-4 text-paper/60">
            Одна розмова на 10 хвилин — і кава перестає бути вашою проблемою.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="tel:+380636271567">Підключити офіс</Button>
          </div>

          <div className="mx-auto mt-14 max-w-sm border-t border-paper/10 pt-10 text-left">
            <p className="text-center text-sm text-paper/60">
              Або залиште контакти — передзвонимо самі.
            </p>
            <LeadForm source={`Модель — ${machine.machine}`} className="mt-5" />
          </div>
        </div>
      </section>
    </>
  );
}
