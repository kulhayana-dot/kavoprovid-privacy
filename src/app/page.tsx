import { Header } from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Problem />
      </main>
    </>
  );
}
