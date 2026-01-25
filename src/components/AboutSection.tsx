import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import aboutPortrait from '@/assets/about-portrait.jpg';
import { GoldenHeading, TrainRevealText, SlideUpReveal, StaggerContainer } from './animations/BlurReveal';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const AboutSection = () => {
  const { t } = useLanguage();
  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true, margin: '-100px' });

  const features = [
    t('about.feature.1'),
    t('about.feature.2'),
    t('about.feature.3'),
    t('about.feature.4'),
    t('about.feature.5'),
    t('about.feature.6'),
  ];

  const sectionLabel = t('about.section.label');
  const sectionTitle = `${t('about.section.title')} ${t('about.section.titleHighlight')}`;
  const sectionDescription = t('about.section.description');

  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div>
            <SlideUpReveal delay={0}>
              <span className="text-primary text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
                {sectionLabel}
              </span>
            </SlideUpReveal>
            
            <GoldenHeading
              className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight"
              charDelay={0.008}
            >
              {sectionTitle}
            </GoldenHeading>
            
            <div className="gold-divider max-w-[200px] mb-8" />
            
            <SlideUpReveal delay={0.3}>
              <TrainRevealText 
                className="text-foreground/90 text-lg leading-relaxed mb-10"
                charDelay={0.015}
              >
                {sectionDescription}
              </TrainRevealText>
            </SlideUpReveal>

            {/* Features list */}
            <StaggerContainer 
              className="grid sm:grid-cols-2 gap-4"
              staggerDelay={0.1}
              initialDelay={0.4}
            >
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{feature}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Right content - Portrait Image */}
          <div className="relative" ref={imageRef}>
            {/* Decorative background glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/15 to-forest/10 rounded-2xl blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1 }}
            />
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
                <img 
                  src={aboutPortrait} 
                  alt="IYM Team" 
                  className="w-full h-auto object-cover aspect-square"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              
              {/* Quote card overlay */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6 glass-luxury rounded-xl p-6 border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <blockquote className="text-lg italic text-primary text-center font-display">
                  "Was auch immer Sie brauchen, wir haben den Mann für Ihren Job."
                </blockquote>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
