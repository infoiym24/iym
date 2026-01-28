import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Gift, Globe, Shield, Clock, ArrowRight } from 'lucide-react';

const SpecialOfferSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleNavigateToPackages = () => {
    navigate('/services/marketing');
    // Wait for navigation then scroll to packages section
    setTimeout(() => {
      const packagesSection = document.getElementById('packages');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const content = {
    de: {
      badge: 'Sonderangebot',
      title: 'Starter Website-Paket',
      subtitle: 'Professionelle One-Page Website mit allem was Sie brauchen – rechtssicher & performant.',
      price: 'ab 500€',
      priceNote: 'netto',
      features: [
        { icon: Globe, text: 'Domain + Hosting-Setup inklusive', highlight: true },
        { icon: Shield, text: 'SSL-Zertifikat inklusive', highlight: true },
        { icon: Sparkles, text: 'Modernes, responsives Design' },
        { icon: Clock, text: 'Performance-Optimierung (Ladezeit)' },
        { icon: Check, text: 'Basis SEO-Optimierung' },
        { icon: Check, text: 'DSGVO-Texte (Impressum, Datenschutz)' },
        { icon: Check, text: 'Cookie-Banner Integration' },
        { icon: Check, text: 'Google Analytics Basis-Setup' },
        { icon: Check, text: 'Kontaktformular' },
        { icon: Check, text: '1 Korrekturschleife' },
      ],
      cta: 'Jetzt Angebote vergleichen',
      guarantee: 'Zufriedenheitsgarantie',
    },
    en: {
      badge: 'Special Offer',
      title: 'Starter Website Package',
      subtitle: 'Professional one-page website with everything you need – legally compliant & performant.',
      price: 'from €500',
      priceNote: 'net',
      features: [
        { icon: Globe, text: 'Domain + Hosting Setup included', highlight: true },
        { icon: Shield, text: 'SSL certificate included', highlight: true },
        { icon: Sparkles, text: 'Modern, responsive design' },
        { icon: Clock, text: 'Performance optimization (load time)' },
        { icon: Check, text: 'Basic SEO optimization' },
        { icon: Check, text: 'GDPR texts (imprint, privacy policy)' },
        { icon: Check, text: 'Cookie banner integration' },
        { icon: Check, text: 'Google Analytics basic setup' },
        { icon: Check, text: 'Contact form' },
        { icon: Check, text: '1 revision round' },
      ],
      cta: 'Compare packages now',
      guarantee: 'Satisfaction guarantee',
    },
    ru: {
      badge: 'Специальное предложение',
      title: 'Стартовый пакет сайта',
      subtitle: 'Профессиональный одностраничный сайт со всем необходимым – юридически безопасный и быстрый.',
      price: 'от 500€',
      priceNote: 'нетто',
      features: [
        { icon: Globe, text: 'Домен + хостинг включены', highlight: true },
        { icon: Shield, text: 'SSL-сертификат включён', highlight: true },
        { icon: Sparkles, text: 'Современный, адаптивный дизайн' },
        { icon: Clock, text: 'Оптимизация производительности' },
        { icon: Check, text: 'Базовая SEO-оптимизация' },
        { icon: Check, text: 'Тексты GDPR (импринт, конфиденциальность)' },
        { icon: Check, text: 'Интеграция баннера cookies' },
        { icon: Check, text: 'Базовая настройка Google Analytics' },
        { icon: Check, text: 'Контактная форма' },
        { icon: Check, text: '1 раунд правок' },
      ],
      cta: 'Сравнить пакеты',
      guarantee: 'Гарантия качества',
    },
  };

  const currentContent = content[language] || content.de;

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, hsl(42 75% 50% / 0.2) 0%, transparent 70%)',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.04, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          style={{
            background: 'radial-gradient(circle, hsl(155 45% 30% / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main offer card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-primary via-primary/50 to-accent">
              <div className="w-full h-full rounded-3xl bg-card" />
            </div>

            {/* Content */}
            <div className="relative glass-luxury rounded-3xl p-8 md:p-12 lg:p-16">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Gift className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-sm">{currentContent.badge}</span>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Left: Title and price */}
                <div>
                  <motion.h2
                    className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {currentContent.title}
                  </motion.h2>
                  <motion.p
                    className="text-muted-foreground text-lg mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {currentContent.subtitle}
                  </motion.p>

                  {/* Price */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl md:text-6xl lg:text-7xl text-gradient-gold font-bold">
                        {currentContent.price}
                      </span>
                      <span className="text-muted-foreground text-lg">{currentContent.priceNote}</span>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <Button variant="luxury" size="xl" className="w-full sm:w-auto" onClick={handleNavigateToPackages}>
                        <ArrowRight className="w-5 h-5 mr-2" />
                        {currentContent.cta}
                      </Button>
                    <p className="text-muted-foreground text-sm mt-4 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      {currentContent.guarantee}
                    </p>
                  </motion.div>
                </div>

                {/* Right: Features */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {currentContent.features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                          feature.highlight 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'bg-muted/30 hover:bg-muted/50'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          feature.highlight 
                            ? 'bg-primary/20' 
                            : 'bg-muted'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            feature.highlight ? 'text-primary' : 'text-foreground'
                          }`} />
                        </div>
                        <span className={`font-medium ${
                          feature.highlight ? 'text-primary' : 'text-foreground'
                        }`}>
                          {feature.text}
                        </span>
                        {feature.highlight && (
                          <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            {language === 'de' ? 'Inkl.' : language === 'ru' ? 'Вкл.' : 'Incl.'}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferSection;
