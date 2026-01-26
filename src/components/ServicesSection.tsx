import { 
  Megaphone,
  Wrench
} from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { GoldenHeading, SlideUpReveal, StaggerContainer } from './animations/BlurReveal';

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
      title: t('service.installation'),
      description: t('service.installation.desc'),
      icon: Wrench,
      href: '/services/installation',
    },
  ];

  const sectionLabel = t('services.section.label');
  const sectionTitle = `${t('services.section.title')} ${t('services.section.titleHighlight')}`;
  const sectionSubtitle = t('services.section.subtitle');

  return (
    <section id="services" className="py-28 relative">
      {/* Top decorative line with gold */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-20">
          <SlideUpReveal delay={0}>
            <span className="text-primary text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
              {sectionLabel}
            </span>
          </SlideUpReveal>
          
          <GoldenHeading
            className="text-4xl md:text-5xl font-display font-semibold mb-6 justify-center"
            charDelay={0.025}
          >
            {sectionTitle}
          </GoldenHeading>
          
          <div className="gold-divider max-w-[200px] mx-auto mb-6" />
          
          <SlideUpReveal delay={0.3}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          </SlideUpReveal>
        </div>

        {/* Services grid */}
        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          staggerDelay={0.1}
          initialDelay={0.4}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={0}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ServicesSection;
