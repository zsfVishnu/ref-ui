import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ConnectingSection from '@/components/ConnectingSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TailoredSection from '@/components/TailoredSection';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ConnectingSection />
        <HowItWorksSection />
        <TailoredSection />
        <SuccessStoriesSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}