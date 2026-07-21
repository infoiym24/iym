import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import heroLogo from '@/assets/hero-logo.png';
import HeroScene from '@/components/three/HeroScene';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Soft light backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* WebGL 3D scene */}
      <HeroScene />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo and Text Container - layered */}
          <div className="relative inline-block">
            {/* Shield Logo - Background layer */}
            <motion.img 
              src={heroLogo}
              alt="IYM Logo"
              className="w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto mx-auto drop-shadow-2xl relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            
            {/* I'm Your Man text - Foreground layer, positioned at bottom of shield */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8%] z-20 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 whitespace-nowrap">
              {["I'M", "YOUR", "MAN"].map((word, index) => (
                <motion.span
                  key={word}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-gradient-gold tracking-widest"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 40px rgba(212,175,55,0.4)' }}
                  initial={{ opacity: 0, scale: 0.3, y: 30 }}
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
          
          {/* Spacer for content below */}
          <div className="mt-16 sm:mt-20"></div>

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
              <Button variant="outline" size="xl" className="border-foreground/20 hover:bg-foreground/5 hover:border-foreground/40">
                {t('hero.learn')}
              </Button>
            </Link>
          </motion.div>
          
          {/* Extra spacing before section divider */}
          <div className="mt-24 sm:mt-32 lg:mt-40"></div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
