import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import aboutPortrait from '@/assets/about-portrait.jpg';
import { TextReveal, PopReveal, SlideReveal, StaggerReveal, StaggerItem, GlowReveal, LineReveal } from './ScrollReveal';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const features = [
    t('about.feature.1'),
    t('about.feature.2'),
    t('about.feature.3'),
    t('about.feature.4'),
    t('about.feature.5'),
    t('about.feature.6'),
  ];

  return (
    <section id="about" className="py-28 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div>
            <SlideReveal delay={0}>
              <span className="inline-block text-accent text-sm font-body font-medium tracking-[0.2em] uppercase mb-4">
                {t('about.section.label')}
              </span>
            </SlideReveal>
            
            <PopReveal delay={0.2} scale={0.6}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                {t('about.section.title')}{' '}
                <GlowReveal className="text-gold" delay={0.8}>
                  {t('about.section.titleHighlight')}
                </GlowReveal>
              </h2>
            </PopReveal>
            
            <TextReveal 
              className="text-muted-foreground text-lg font-elegant italic mb-10 leading-relaxed"
              delay={0.4}
              staggerDelay={0.04}
            >
              {t('about.section.description')}
            </TextReveal>

            {/* Features list - luxury styled with stagger */}
            <StaggerReveal className="grid sm:grid-cols-2 gap-5 mb-8" staggerDelay={0.1}>
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-start gap-4 group">
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-background" />
                    </motion.div>
                    <span className="text-foreground/90 font-body">{feature}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>

          {/* Right content - Portrait Image with luxury treatment */}
          <SlideReveal delay={0.3} direction="left">
            <div className="relative">
              {/* Decorative background glows */}
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/15 to-accent/15 rounded-[40px] blur-3xl" />
              
              <div className="relative">
                {/* Image container with luxury frame */}
                <motion.div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-accent/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={aboutPortrait} 
                    alt="IYM Team" 
                    className="w-full h-auto object-cover aspect-square"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  
                  {/* Gold corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent/50 rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent/50 rounded-br-3xl" />
                </motion.div>
                
                {/* Decorative accents */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/25 rounded-2xl blur-2xl" />
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
                
                {/* Quote card overlay - luxury styled */}
                <motion.div 
                  className="absolute bottom-8 left-6 right-6 glass-luxury rounded-2xl p-6 border border-accent/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <blockquote className="text-lg font-elegant italic text-foreground/90 text-center">
                    <span className="text-accent text-2xl">"</span>
                    {t('about.quote')}
                    <span className="text-accent text-2xl">"</span>
                  </blockquote>
                </motion.div>
              </div>
            </div>
          </SlideReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
