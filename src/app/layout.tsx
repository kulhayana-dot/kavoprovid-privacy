import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const gilroy = localFont({
  variable: "--font-gilroy",
  display: "swap",
  src: [
    {
      path: "../assets/fonts/GilroyUltraLight.ttf",
      weight: "200",
      style: "normal",
    },
  ],
});

const SITE_TITLE = "Оренда кавомашини для офісу — Кавопровід";
const SITE_DESCRIPTION =
  "Оренда кавомашини для офісу та бізнесу в Києві й Київській області: апарат, зерно й сервіс — в одного партнера. Безкоштовно від 10 кг кави. Перші 7 днів на пробу.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kavoprovid.com.ua"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "uk_UA",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kavoprovid",
  legalName: "ТОВ «ЮНІТ КЕЙ»",
  url: "https://kavoprovid.com.ua",
  logo: "https://kavoprovid.com.ua/brand/kavoprovid-mark.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+380-63-627-15-67",
    email: "hello@kavoprovid.com.ua",
    contactType: "sales",
    areaServed: "UA-32",
  },
  areaServed: [
    { "@type": "City", name: "Київ" },
    { "@type": "AdministrativeArea", name: "Київська область" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${unbounded.variable} ${gilroy.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
