import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function RishennyaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
