import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Solution from '@/components/sections/Solution';
import Process from '@/components/sections/Process';
import Benefits from '@/components/sections/Benefits';
import SocialProof from '@/components/sections/SocialProof';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Problem />
      <Solution />
      <Process />
      <Benefits />
      <SocialProof />
      <CTA />
      <Footer />
    </div>
  );
}
