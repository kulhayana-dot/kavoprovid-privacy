import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { Benefits } from "@/components/sections/Benefits";
import { Coverage } from "@/components/sections/Coverage";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Solutions } from "@/components/sections/Solutions";
import { Trust } from "@/components/sections/Trust";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <Infrastructure />
        <Solutions />
        <div className="h-[3px] bg-signal" aria-hidden="true" />
        <Benefits />
        <Process />
        <div className="h-[3px] bg-signal" aria-hidden="true" />
        <Coverage />
        <div className="h-[3px] bg-signal" aria-hidden="true" />
        <Trust />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
