import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import aboutPortrait from '@/assets/about-portrait.jpg';

const AboutSection = () => {
  const { t } = useLanguage();

  const features = [
    t('about.feature.1'),
    t('about.feature.2'),
    t('about.feature.3'),
    t('about.feature.4'),
    t('about.feature.5'),
    t('about.feature.6'),
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block text-accent text-sm font-body font-medium tracking-[0.2em] uppercase mb-4">
              {t('about.section.label')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              {t('about.section.title')}{' '}
              <span className="text-gold">{t('about.section.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground text-lg font-elegant italic mb-10 leading-relaxed">
              {t('about.section.description')}
            </p>

            {/* Features list - luxury styled */}
            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-4 h-4 text-background" />
                  </div>
                  <span className="text-foreground/90 font-body">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Portrait Image with luxury treatment */}
          <div className="relative">
            {/* Decorative background glows */}
            <div className="absolute -inset-8 bg-gradient-to-br from-primary/15 to-accent/15 rounded-[40px] blur-3xl" />
            
            <div className="relative">
              {/* Image container with luxury frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-accent/20">
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
              </div>
              
              {/* Decorative accents */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/25 rounded-2xl blur-2xl" />
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              
              {/* Quote card overlay - luxury styled */}
              <div className="absolute bottom-8 left-6 right-6 glass-luxury rounded-2xl p-6 border border-accent/20">
                <blockquote className="text-lg font-elegant italic text-foreground/90 text-center">
                  <span className="text-accent text-2xl">"</span>
                  {t('about.quote')}
                  <span className="text-accent text-2xl">"</span>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;