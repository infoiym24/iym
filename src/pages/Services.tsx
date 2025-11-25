import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
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
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
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
      title: t('service.renovierung'),
      description: t('service.renovierung.desc'),
      icon: Paintbrush,
      href: '/services/renovierung',
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
      href: '/services/reparaturen',
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
      href: '/services/auto',
    },
    {
      title: t('service.autofind'),
      description: t('service.autofind.desc'),
      icon: Search,
      href: '/services/auto-find',
    },
    {
      title: t('service.detailing'),
      description: t('service.detailing.desc'),
      icon: Sparkles,
      href: '/services/car-detailing',
    },
  ];

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
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
                {t('services.page.label')}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6">
                {t('services.page.title')} <span className="text-gradient">{t('services.page.titleHighlight')}</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('services.page.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  {...service}
                  delay={index * 50}
                />
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
