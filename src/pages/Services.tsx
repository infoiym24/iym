import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { 
  Monitor, Megaphone, Search, Target
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrainReveal, PopReveal } from '@/components/ScrollRevealText';

const Services = () => {
  const { t } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 2 core services
  const services = [
    {
      title: t('service.webdesign'),
      description: t('service.webdesign.desc'),
      icon: Monitor,
      href: '/services/webdesign',
    },
    {
      title: t('service.marketing'),
      description: t('service.marketing.desc'),
      icon: Megaphone,
      href: '/services/marketing',
    },
    {
      title: t('service.seo'),
      description: t('service.seo.desc'),
      icon: Search,
      href: '/services/seo',
    },
    {
      title: t('service.ads'),
      description: t('service.ads.desc'),
      icon: Target,
      href: '/services/ads',
    },
  ];

  const pageLabel = t('services.page.label');
  const pageTitle = t('services.page.title');
  const pageHighlight = t('services.page.titleHighlight');
  const pageSubtitle = t('services.page.subtitle');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <TrainReveal
                lines={[pageLabel]}
                className="mb-4"
                lineClassName="text-primary text-sm font-medium tracking-[0.3em] uppercase font-montserrat inline-block"
                charDelay={0.04}
              />
              
              <TrainReveal
                lines={[`${pageTitle} ${pageHighlight}`]}
                className="mb-6"
                lineClassName="text-4xl md:text-6xl font-bold font-cinzel tracking-wide text-gradient-gold"
                charDelay={0.025}
                lineDelay={0.3}
              />
              
              <div className="gold-divider max-w-xs mx-auto mb-6" />
              
              <TrainReveal
                lines={[pageSubtitle]}
                className="max-w-2xl mx-auto"
                lineClassName="text-muted-foreground text-lg font-montserrat"
                charDelay={0.015}
                lineDelay={0.5}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <PopReveal key={service.title} delay={index * 0.1}>
                  <ServiceCard
                    {...service}
                    delay={0}
                  />
                </PopReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;