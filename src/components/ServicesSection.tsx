import { 
  Megaphone,
  Car,
  Trash2,
  Sparkles,
  Settings,
  Search
} from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrainReveal, PopReveal } from './ScrollRevealText';

const ServicesSection = () => {
  const { t, language } = useLanguage();
  
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

  const sectionLabel = t('services.section.label');
  const sectionTitle = t('services.section.title');
  const sectionHighlight = t('services.section.titleHighlight');
  const sectionSubtitle = t('services.section.subtitle');

  return (
    <section id="services" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section header with train reveal */}
        <div className="text-center mb-16">
          <TrainReveal
            lines={[sectionLabel]}
            className="mb-4"
            lineClassName="text-accent text-sm font-medium tracking-[0.3em] uppercase font-inter"
            wordDelay={0.1}
          />
          
          <TrainReveal
            lines={[`${sectionTitle} ${sectionHighlight}`]}
            className="mb-6"
            lineClassName="text-4xl md:text-5xl font-semibold font-playfair tracking-tight text-gradient-gold"
            wordDelay={0.1}
            lineDelay={0.5}
          />
          
          <div className="forest-divider max-w-xs mx-auto mb-6" />
          
          <TrainReveal
            lines={[sectionSubtitle]}
            className="max-w-2xl mx-auto"
            lineClassName="text-muted-foreground text-lg font-inter"
            wordDelay={0.05}
            lineDelay={0.8}
          />
        </div>

        {/* Services grid with glow reveal */}
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
  );
};

export default ServicesSection;