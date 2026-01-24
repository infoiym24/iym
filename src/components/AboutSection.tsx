import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import aboutPortrait from '@/assets/about-portrait.jpg';
import { TrainReveal, PopReveal, SequentialReveal } from './ScrollRevealText';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const AboutSection = () => {
  const { t, language } = useLanguage();
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
  const sectionTitle = t('about.section.title');
  const sectionHighlight = t('about.section.titleHighlight');
  const sectionDescription = t('about.section.description');

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <TrainReveal
              lines={[sectionLabel]}
              className="mb-4"
              lineClassName="text-accent text-sm font-medium tracking-[0.3em] uppercase font-inter inline-block"
              wordDelay={0.1}
            />
            
            <TrainReveal
              lines={[`${sectionTitle} ${sectionHighlight}`]}
              className="mb-6"
              lineClassName="text-4xl md:text-5xl font-semibold font-playfair tracking-tight text-gradient-gold"
              wordDelay={0.08}
              lineDelay={0.3}
            />
            
            <div className="forest-divider max-w-xs mb-6" />
            
            <TrainReveal
              lines={sectionDescription.split('. ').filter(s => s).map(s => s + '.')}
              className="mb-8"
              lineClassName="text-muted-foreground text-lg leading-relaxed font-inter block mb-2"
              wordDelay={0.04}
              lineDelay={0.15}
            />

            {/* Features list with sequential reveal */}
            <SequentialReveal 
              className="grid sm:grid-cols-2 gap-4 mb-8"
              staggerDelay={0.12}
            >
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90 font-inter">{feature}</span>
                </div>
              ))}
            </SequentialReveal>
          </div>

          {/* Right content - Portrait Image with glow effect */}
          <div className="relative" ref={imageRef}>
            {/* Decorative background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-forest/20 to-accent/10 rounded-2xl blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            />
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, filter: 'blur(15px)', y: 30 }}
              animate={imageInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(15px)', y: 30 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Image container with decorative elements */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-accent/20">
                <img 
                  src={aboutPortrait} 
                  alt="IYM Team" 
                  className="w-full h-auto object-cover aspect-square"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              
              {/* Decorative accent */}
              <motion.div 
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-forest/30 rounded-xl blur-xl"
                initial={{ opacity: 0 }}
                animate={imageInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
              <motion.div 
                className="absolute -top-4 -left-4 w-32 h-32 bg-accent/15 rounded-full blur-2xl"
                initial={{ opacity: 0 }}
                animate={imageInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
              
              {/* Quote card overlay */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6 glass-luxury rounded-xl p-6"
                initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
                animate={imageInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(8px)', y: 20 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <blockquote className="text-lg italic text-foreground/90 text-center font-playfair">
                  "{t('about.quote')}"
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