import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { TrackingEvents } from "@/components/TrackingEvents";
import "./globals.css";

const GTM_ID = "GTM-PDKGZ8ZT";

// Brand typeface per brandbook p.38-39 ("Gilroy — чистий, сучасний і
// добре читабельний гротеск"). All 9 weights we have on file — no
// synthetic bold/light stand-ins for missing cuts.
const gilroy = localFont({
  variable: "--font-gilroy",
  display: "swap",
  src: [
    { path: "../assets/fonts/Gilroy-Thin.ttf", weight: "100", style: "normal" },
    { path: "../assets/fonts/Gilroy-UltraLight.ttf", weight: "200", style: "normal" },
    { path: "../assets/fonts/Gilroy-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Gilroy-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Gilroy-Semibold.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/Gilroy-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/fonts/Gilroy-Extrabold.ttf", weight: "800", style: "normal" },
    { path: "../assets/fonts/Gilroy-Black.ttf", weight: "900", style: "normal" },
    { path: "../assets/fonts/Gilroy-Heavy.ttf", weight: "950", style: "normal" },
  ],
});

const SITE_TITLE = "Оренда кавомашини для офісу — Кавопровід";
const SITE_DESCRIPTION =
  "Оренда кавомашини для офісу та бізнесу в Києві й Київській області: кавомашина, зерно й сервіс — в одного партнера. Безкоштовно від 10 кг кави.";

const SITE_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kavoprovid.com.ua"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "uk_UA",
    type: "website",
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE.url],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kavoprovid",
  legalName: "ТОВ «ЮНІТ КЕЙ»",
  url: "https://www.kavoprovid.com.ua",
  logo: "https://www.kavoprovid.com.ua/brand/kavoprovid-mark.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+380-63-627-15-67",
    email: "office@kavoprovid.com.ua",
    contactType: "sales",
    areaServed: "UA-32",
  },
  areaServed: [
    { "@type": "City", name: "Київ" },
    { "@type": "AdministrativeArea", name: "Київська область" },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Кавова інфраструктура для бізнесу",
  provider: { "@type": "Organization", name: "Kavoprovid" },
  areaServed: [
    { "@type": "City", name: "Київ" },
    { "@type": "AdministrativeArea", name: "Київська область" },
  ],
  audience: [
    { "@type": "BusinessAudience", audienceType: "Офіси" },
    { "@type": "BusinessAudience", audienceType: "Виробництва" },
  ],
  description:
    "Комплексна кавова інфраструктура для офісів і виробництв: обладнання, кава, витратні матеріали, постачання, сервіс і технічна підтримка від одного партнера.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${gilroy.variable} h-full antialiased`}
    >
      {/* Google Consent Mode v2 — everything denied until the visitor
          accepts in the cookie banner (see CookieConsent). Must run before
          GTM so tags start in the right state. */}
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);`}
      </Script>
      {/* Google Tag Manager */}
      <Script id="gtm-base" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      <body className="min-h-full flex flex-col bg-ink text-paper font-sans">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Перейти до основного контенту
        </a>
        {children}
        <TrackingEvents />
        <CookieConsent />

        {/* Binotel call tracking — swaps the site phone number per traffic
            source and ties calls back to a session. Loaded unconditionally
            so number substitution always runs; call analytics forwarding to
            GA4 / Google Ads is configured on the Binotel side. */}
        <Script
          src="https://widgets.binotel.com/calltracking/widgets/9tnpxez0uw1xmev76v8w.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
