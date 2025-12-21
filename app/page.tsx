import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Solution from '@/components/sections/Solution';
import Process from '@/components/sections/Process';
import Products from '@/components/sections/Products';
import Benefits from '@/components/sections/Benefits';
import SocialProof from '@/components/sections/SocialProof';
import NewsSection from '@/components/sections/NewsSection';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Process />
        <Products />
        <Benefits />
        <SocialProof />
        <NewsSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
