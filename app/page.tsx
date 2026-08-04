import { SiteHeader } from "@/src/components/layout/SiteHeader";
import { About } from "@/src/components/sections/About";
import { Background } from "@/src/components/sections/Background";
import { Contact } from "@/src/components/sections/Contact";
import { Currently } from "@/src/components/sections/Currently";
import { Hero } from "@/src/components/sections/Hero";
import { Practice } from "@/src/components/sections/Practice";
import { ProductAnalysis } from "@/src/components/sections/ProductAnalysis";
import { SiteFooter } from "@/src/components/sections/SiteFooter";
import { Skills } from "@/src/components/sections/Skills";
import { Work } from "@/src/components/sections/Work";

/**
 * Home.
 *
 * Sequence: the claim, then momentum, then evidence, then method, then the toolkit,
 * then the person, then the formal record, then the ask. Work comes before everything
 * except Currently because the projects are the argument.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Currently />
        <Work />
        <ProductAnalysis />
        <Practice />
        <Skills />
        <About />
        <Background />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
