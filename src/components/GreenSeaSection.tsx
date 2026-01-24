import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { TrainReveal } from './ScrollRevealText';
import { useLanguage } from '@/contexts/LanguageContext';

const GreenSeaSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { language } = useLanguage();

  const title = language === 'de' ? 'Exzellenz & Eleganz' :
                language === 'en' ? 'Excellence & Elegance' :
                'Превосходство и Элегантность';
                
  const subtitle = language === 'de' ? 'Erleben Sie Service auf höchstem Niveau mit Hingabe zum Detail' :
                   language === 'en' ? 'Experience service at the highest level with dedication to detail' :
                   'Испытайте сервис высочайшего уровня с вниманием к деталям';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full animate-float-particle';
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.background = `radial-gradient(circle, hsl(42 85% 55% / ${Math.random() * 0.4 + 0.2}), transparent)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <motion.div 
      ref={sectionRef}
      className="relative w-full overflow-hidden my-12"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        ref={containerRef}
        className="relative w-full h-[500px] overflow-hidden rounded-2xl mx-auto max-w-7xl"
      >
        {/* Deep green sea background */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark via-forest to-forest-dark" />
        
        {/* Animated wave layers */}
        <div className="absolute inset-0">
          {/* Wave 1 - Gold reflection */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[60%]"
            animate={{
              y: [0, -10, 5, -5, 0],
              scaleY: [1, 1.05, 0.98, 1.02, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: `
                radial-gradient(ellipse 100% 60% at 50% 100%, hsl(42 85% 55% / 0.15) 0%, transparent 70%),
                radial-gradient(ellipse 80% 40% at 30% 80%, hsl(42 90% 60% / 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 80% 40% at 70% 85%, hsl(42 80% 50% / 0.12) 0%, transparent 50%)
              `,
            }}
          />
          
          {/* Wave 2 - Deeper gold */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[50%]"
            animate={{
              y: [0, 5, -8, 3, 0],
              scaleY: [1, 0.98, 1.03, 0.99, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            style={{
              background: `
                radial-gradient(ellipse 120% 50% at 50% 100%, hsl(42 85% 55% / 0.1) 0%, transparent 60%),
                radial-gradient(ellipse 60% 30% at 20% 90%, hsl(45 80% 55% / 0.08) 0%, transparent 45%)
              `,
            }}
          />
          
          {/* Wave 3 - Subtle shimmer */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[40%]"
            animate={{
              y: [0, -5, 8, -3, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
            style={{
              background: `
                radial-gradient(ellipse 150% 40% at 50% 100%, hsl(42 90% 60% / 0.08) 0%, transparent 55%)
              `,
            }}
          />
        </div>

        {/* Gold shimmer line on water */}
        <motion.div 
          className="absolute bottom-[30%] left-0 right-0 h-1"
          animate={{
            backgroundPosition: ['-200% 0', '200% 0'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(42 85% 55% / 0.4) 25%, hsl(42 90% 65% / 0.6) 50%, hsl(42 85% 55% / 0.4) 75%, transparent 100%)',
            backgroundSize: '200% 100%',
            filter: 'blur(2px)',
          }}
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <TrainReveal
              lines={[title]}
              className="mb-6"
              lineClassName="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gradient-gold tracking-wider"
              charDelay={0.04}
            />
            <motion.p 
              className="font-cormorant text-xl md:text-2xl text-foreground/80 italic max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        {/* Top gradient fade */}
        <div 
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, hsl(0 0% 10%), transparent)',
          }}
        />
        
        {/* Bottom gradient fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, hsl(0 0% 10%), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default GreenSeaSection;