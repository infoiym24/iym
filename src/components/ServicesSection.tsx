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
import { TextReveal, PopReveal, SlideReveal, LineReveal, StaggerReveal, StaggerItem, GlowReveal } from './ScrollReveal';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ServicesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
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

  return (
    <section id="services" className="py-28 relative" ref={sectionRef}>
      {/* Gold divider top */}
      <div className="absolute top-0 left-0 right-0">
        <div className="gold-divider" />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section header - luxury styled */}
        <div className="text-center mb-20">
          <SlideReveal delay={0}>
            <span className="inline-block text-accent text-sm font-body font-medium tracking-[0.2em] uppercase mb-4">
              {t('services.section.label')}
            </span>
          </SlideReveal>
          
          <PopReveal delay={0.2} scale={0.6}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {t('services.section.title')}{' '}
              <GlowReveal className="text-gold" delay={0.8}>
                {t('services.section.titleHighlight')}
              </GlowReveal>
            </h2>
          </PopReveal>
          
          <TextReveal 
            className="text-muted-foreground text-lg font-elegant italic max-w-2xl mx-auto"
            delay={0.4}
            staggerDelay={0.05}
          >
            {t('services.section.subtitle')}
          </TextReveal>
          
          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <LineReveal className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent" delay={0.6} />
          </div>
        </div>

        {/* Services grid with stagger */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard
                {...service}
                delay={0}
              />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
      
      {/* Gold divider bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="gold-divider" />
      </div>
    </section>
  );
};

export default ServicesSection;
