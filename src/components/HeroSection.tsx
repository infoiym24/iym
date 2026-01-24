import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { t } = useLanguage();
  
  const words = [
    { text: "I'm", delay: 0.8 },
    { text: "Your", delay: 2.2 },
    { text: "Man", delay: 3.6 }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Subtle animated background elements with forest green */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-[600px] h-[600px] bg-forest/20 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[130px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-forest-dark/20 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main heading - IYM with forest-gold glow */}
          <motion.h1 
            className="text-[7rem] sm:text-[9rem] md:text-[12rem] lg:text-[16rem] font-black font-syne leading-none mb-6 tracking-tight"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-gradient-gold animate-iym-glow inline-block">IYM</span>
          </motion.h1>
          
          {/* I'm Your Man - elegant blur-to-focus word reveal */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 mb-14 min-h-[60px] sm:min-h-[80px] md:min-h-[100px]">
            {words.map((word) => (
              <motion.span
                key={word.text}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground/90 font-playfair italic"
                initial={{ 
                  opacity: 0.1, 
                  filter: 'blur(15px)',
                  y: 10
                }}
                animate={{ 
                  opacity: 1, 
                  filter: 'blur(0px)',
                  y: 0
                }}
                transition={{ 
                  delay: word.delay,
                  duration: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </div>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 font-inter font-light leading-relaxed"
            initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link to="/services">
              <Button variant="luxury" size="xl">
                {t('hero.discover')}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="gold" size="xl">
                {t('hero.learn')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;