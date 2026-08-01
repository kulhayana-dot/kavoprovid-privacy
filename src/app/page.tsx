import { Header } from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Problem } from "@/components/sections/Problem";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Infrastructure />
      </main>
    </>
  );
}
