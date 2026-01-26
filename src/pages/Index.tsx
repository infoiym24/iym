import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import GreenSeaSection from '@/components/GreenSeaSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // On initial page load (refresh or direct access), scroll to top and clear hash
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      // If there's a hash from a page refresh (not from navigation), clear it and scroll to top
      if (location.hash && window.performance) {
        const navEntries = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        const isPageRefresh = navEntries.length > 0 && navEntries[0].type === 'reload';
        const isDirectAccess = navEntries.length > 0 && navEntries[0].type === 'navigate';
        
        if (isPageRefresh || isDirectAccess) {
          // Remove hash and scroll to top
          window.history.replaceState(null, '', '/');
          window.scrollTo(0, 0);
          return;
        }
      }
      
      // No hash - just scroll to top
      if (!location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, [location.hash, navigate]);
  return (
    <div className="min-h-screen bg-background">
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
