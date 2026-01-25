import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import heroLogo from '@/assets/hero-logo.png';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-forest/20 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo with I'm Your Man at shield tip */}
          <div className="relative inline-block mb-8">
            {/* Shield Logo */}
            <motion.img 
              src={heroLogo}
              alt="IYM Logo"
              className="w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto mx-auto drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            
            {/* I'm Your Man text - positioned at bottom tip of shield */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[2%] sm:bottom-[3%] w-full">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {["I'm", "Your", "Man"].map((word, index) => (
                  <motion.span
                    key={word}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gradient-gold tracking-wide"
                    style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
                    initial={{ opacity: 0, scale: 0.3, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: 1.0 + index * 0.35,
                      duration: 0.8,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-sans leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <Link to="/services">
              <Button variant="luxury" size="xl">
                {t('hero.discover')}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl" className="border-forest/50 hover:bg-forest/20 hover:border-forest">
                {t('hero.learn')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
