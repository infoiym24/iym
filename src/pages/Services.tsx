import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { 
  Megaphone,
  Trash2,
  Settings,
  Car,
  Search,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrainReveal, PopReveal } from '@/components/ScrollRevealText';

const Services = () => {
  const { t } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 6 core services
  const services = [
    {
      title: t('service.marketing'),
      description: t('service.marketing.desc'),
      icon: Megaphone,
      href: '/services/marketing',
    },
    {
      title: t('service.entruempelung'),
      description: t('service.entruempelung.desc'),
      icon: Trash2,
      href: '/services/entruempelung',
    },
    {
      title: t('service.reparatur'),
      description: t('service.reparatur.desc'),
      icon: Settings,
      href: '/services/reparatur',
    },
    {
      title: t('service.auto'),
      description: t('service.auto.desc'),
      icon: Car,
      href: '/services/autoservice',
    },
    {
      title: t('service.autofind'),
      description: t('service.autofind.desc'),
      icon: Search,
      href: '/services/autofind',
    },
    {
      title: t('service.detailing'),
      description: t('service.detailing.desc'),
      icon: Sparkles,
      href: '/services/detailing',
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
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-forest/15 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <TrainReveal
                lines={[pageLabel]}
                className="mb-4"
                lineClassName="text-accent text-sm font-medium tracking-[0.3em] uppercase font-inter inline-block"
                wordDelay={0.1}
              />
              
              <TrainReveal
                lines={[`${pageTitle} ${pageHighlight}`]}
                className="mb-6"
                lineClassName="text-4xl md:text-6xl font-semibold font-playfair tracking-tight text-gradient-gold"
                wordDelay={0.1}
                lineDelay={0.3}
              />
              
              <div className="forest-divider max-w-xs mx-auto mb-6" />
              
              <TrainReveal
                lines={[pageSubtitle]}
                className="max-w-2xl mx-auto"
                lineClassName="text-muted-foreground text-lg font-inter"
                wordDelay={0.05}
                lineDelay={0.5}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <PopReveal key={service.title} delay={index * 0.08}>
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