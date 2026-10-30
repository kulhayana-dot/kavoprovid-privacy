import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { StackSection } from "@/components/StackSection";
import { AppSection } from "@/components/sections/AppSection";
import { Benefits } from "@/components/sections/Benefits";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Solutions } from "@/components/sections/Solutions";
import { Trust } from "@/components/sections/Trust";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main id="main-content">
        <StackSection index={1} pullUp={false}>
          <Hero />
        </StackSection>
        <StackSection index={2}>
          <Problem />
        </StackSection>
        <StackSection index={3}>
          <Infrastructure />
        </StackSection>
        <StackSection index={4}>
          <Solutions />
        </StackSection>
        <StackSection index={5} dim={false}>
          <AppSection />
        </StackSection>
        <div className="h-[3px] bg-signal" aria-hidden="true" />
        <StackSection index={6} pullUp={false}>
          <Benefits />
        </StackSection>
        <StackSection index={7} dim={false}>
          <Process />
        </StackSection>
        <div className="h-[3px] bg-signal" aria-hidden="true" />
        <StackSection index={8} pullUp={false}>
          <Trust />
        </StackSection>
        <StackSection index={9} dim={false}>
          <FinalCta />
        </StackSection>
      </main>
      <Footer />
    </>
  );
}
