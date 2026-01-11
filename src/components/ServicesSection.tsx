import { 
  Wrench, 
  Paintbrush, 
  Truck, 
  Home, 
  Leaf,
  Megaphone,
  Car,
  Droplets,
  Trash2,
  Package,
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
      title: t('service.handwerk'),
      description: t('service.handwerk.desc'),
      icon: Wrench,
      href: '/services/handwerk',
    },
    {
      title: t('service.transport'),
      description: t('service.transport.desc'),
      icon: Truck,
      href: '/services/transport',
    },
    {
      title: t('service.umzug'),
      description: t('service.umzug.desc'),
      icon: Package,
      href: '/services/umzug',
    },
    {
      title: t('service.entruempelung'),
      description: t('service.entruempelung.desc'),
      icon: Trash2,
      href: '/services/entruempelung',
    },
    {
      title: t('service.hausmeister'),
      description: t('service.hausmeister.desc'),
      icon: Home,
      href: '/services/hausmeister',
    },
    {
      title: t('service.reparatur'),
      description: t('service.reparatur.desc'),
      icon: Settings,
      href: '/services/reparatur',
    },
    {
      title: t('service.garten'),
      description: t('service.garten.desc'),
      icon: Leaf,
      href: '/services/gartenpflege',
    },
    {
      title: t('service.hochdruck'),
      description: t('service.hochdruck.desc'),
      icon: Droplets,
      href: '/services/hochdruckreinigung',
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
    <section id="services" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
            {t('services.section.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-6">
            {t('services.section.title')} <span className="text-gradient">{t('services.section.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('services.section.subtitle')}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
