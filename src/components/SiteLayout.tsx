import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

/** Header + footer shell shared by every inner page's layout. */
export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
