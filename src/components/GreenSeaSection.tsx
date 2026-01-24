import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GoldenHeading, TrainRevealText } from './animations/BlurReveal';
import { useLanguage } from '@/contexts/LanguageContext';

const GreenSeaSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { language } = useLanguage();

  const title = language === 'de' ? 'Qualität trifft Leidenschaft' :
                language === 'en' ? 'Quality Meets Passion' :
                'Качество Встречает Страсть';
                
  const subtitle = language === 'de' ? 'Professionelle Dienstleistungen mit persönlichem Engagement — für Ergebnisse, die überzeugen.' :
                   language === 'en' ? 'Professional services with personal commitment — for results that convince.' :
                   'Профессиональные услуги с личной приверженностью — для результатов, которые убеждают.';

  return (
    <motion.div 
      ref={sectionRef}
      className="relative w-full overflow-hidden my-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl mx-auto max-w-7xl">
        {/* Dark anthracite with gold accent background */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card" />
        
        {/* Animated gold accent layers */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(circle, hsl(42 75% 50% / 0.2) 0%, transparent 70%)',
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.12, 0.08, 0.12],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            style={{
              background: 'radial-gradient(circle, hsl(42 70% 45% / 0.18) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Gold accent line */}
        <motion.div 
          className="absolute top-1/2 left-0 right-0 h-px"
          animate={{
            backgroundPosition: ['-200% 0', '200% 0'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(42 75% 50% / 0.4) 25%, hsl(42 80% 55% / 0.6) 50%, hsl(42 75% 50% / 0.4) 75%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-3xl">
            <GoldenHeading
              className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 justify-center"
              charDelay={0.03}
            >
              {title}
            </GoldenHeading>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <TrainRevealText
                className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed justify-center"
                charDelay={0.012}
              >
                {subtitle}
              </TrainRevealText>
            </motion.div>
          </div>
        </div>

        {/* Edge fades */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </motion.div>
  );
};

export default GreenSeaSection;
