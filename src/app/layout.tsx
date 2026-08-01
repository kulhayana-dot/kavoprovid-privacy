import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://kavoprovid.com.ua"),
  title: "Кавопровід — кавова інфраструктура для бізнесу",
  description:
    "Не продаємо кавомашини. Будуємо безперервну кавову інфраструктуру для офісів і підприємств Києва та Київської області.",
  openGraph: {
    title: "Кавопровід — кавова інфраструктура для бізнесу",
    description:
      "Не продаємо кавомашини. Будуємо безперервну кавову інфраструктуру для офісів і підприємств Києва та Київської області.",
    locale: "uk_UA",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
