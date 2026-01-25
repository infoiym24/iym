import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import GreenSeaSection from '@/components/GreenSeaSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import iymLogo from '@/assets/iym-logo.png';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Decorative logo on the right side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block">
        <img 
          src={iymLogo} 
          alt="" 
          aria-hidden="true"
          className="w-32 xl:w-40 opacity-[0.08] -mr-8 xl:-mr-10"
        />
      </div>
      
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <GreenSeaSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
