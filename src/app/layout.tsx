import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
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
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper font-sans">
        {children}
      </body>
    </html>
  );
}
