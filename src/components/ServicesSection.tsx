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

const ServicesSection = () => {
  const { t } = useLanguage();
  
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
    <section id="services" className="py-28 relative">
      {/* Gold divider top */}
      <div className="absolute top-0 left-0 right-0">
        <div className="gold-divider" />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section header - luxury styled */}
        <div className="text-center mb-20">
          <span className="inline-block text-accent text-sm font-body font-medium tracking-[0.2em] uppercase mb-4">
            {t('services.section.label')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('services.section.title')}{' '}
            <span className="text-gold">{t('services.section.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg font-elegant italic max-w-2xl mx-auto">
            {t('services.section.subtitle')}
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
      
      {/* Gold divider bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="gold-divider" />
      </div>
    </section>
  );
};

export default ServicesSection;