import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Wrench, CheckCircle2 } from 'lucide-react';

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'So funktioniert\'s',
      subtitle: 'Einfach und unkompliziert zu Ihrem Ergebnis.',
      steps: [
        {
          number: '01',
          title: 'Kontakt aufnehmen',
          description: 'Beschreiben Sie uns Ihr Anliegen. Telefonisch, per E-Mail oder über unser Kontaktformular. Wir melden uns schnellstmöglich zurück.',
          features: ['Persönliche Beratung', 'Schnelle Antwort', 'Unverbindlich'],
        },
        {
          number: '02',
          title: 'Umsetzung',
          description: 'Unser Team macht sich an die Arbeit. Ob Fahrzeugüberführung, Entrümpelung oder Webdesign, wir kümmern uns professionell darum.',
          features: ['Erfahrene Experten', 'Transparente Preise', 'Zuverlässig'],
        },
        {
          number: '03',
          title: 'Fertig!',
          description: 'Sie lehnen sich zurück und genießen das Ergebnis. Zufriedenheit garantiert oder wir finden gemeinsam eine Lösung.',
          features: ['Qualitätsgarantie', 'Nachbetreuung', '100% Zufriedenheit'],
        },
      ],
    },
    en: {
      title: 'How it works',
      subtitle: 'Simple and straightforward to your result.',
      steps: [
        {
          number: '01',
          title: 'Get in touch',
          description: 'Tell us about your needs – by phone, email, or our contact form. We\'ll get back to you as soon as possible.',
          features: ['Personal consultation', 'Quick response', 'No obligation'],
        },
        {
          number: '02',
          title: 'Implementation',
          description: 'Our team gets to work. Whether vehicle transfer, clearance, or web design – we handle it professionally.',
          features: ['Experienced experts', 'Transparent prices', 'Reliable'],
        },
        {
          number: '03',
          title: 'Done!',
          description: 'You sit back and enjoy the result. Satisfaction guaranteed – or we\'ll find a solution together.',
          features: ['Quality guarantee', 'After-care', '100% satisfaction'],
        },
      ],
    },
    ru: {
      title: 'Как это работает',
      subtitle: 'Просто и понятно к вашему результату.',
      steps: [
        {
          number: '01',
          title: 'Свяжитесь с нами',
          description: 'Расскажите нам о ваших потребностях – по телефону, электронной почте или через контактную форму.',
          features: ['Личная консультация', 'Быстрый ответ', 'Без обязательств'],
        },
        {
          number: '02',
          title: 'Реализация',
          description: 'Наша команда приступает к работе. Будь то перегон автомобиля, расчистка или веб-дизайн.',
          features: ['Опытные эксперты', 'Прозрачные цены', 'Надёжно'],
        },
        {
          number: '03',
          title: 'Готово!',
          description: 'Вы отдыхаете и наслаждаетесь результатом. Гарантия удовлетворённости.',
          features: ['Гарантия качества', 'Послепродажное обслуживание', '100% довольных'],
        },
      ],
    },
  };

  const icons = [Phone, Wrench, CheckCircle2];
  const currentContent = content[language] || content.de;

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {currentContent.title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {currentContent.subtitle}
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {currentContent.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              >
                {/* Connecting line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-px">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary/50 to-primary/10"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                )}

                {/* Card */}
                <div className="glass-luxury rounded-2xl p-6 md:p-8 h-full hover-lift group">
                  {/* Step number & icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <span className="font-display text-5xl text-primary/20 font-bold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
