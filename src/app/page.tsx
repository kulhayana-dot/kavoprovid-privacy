import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import { Benefits } from "@/components/sections/Benefits";
import { Hero } from "@/components/sections/Hero";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Problem } from "@/components/sections/Problem";
import { Solutions } from "@/components/sections/Solutions";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Infrastructure />
        <Solutions />
        <Benefits />
      </main>
    </>
  );
}
