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
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
              {t('about.section.label')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-6">
              {t('about.section.title')} <span className="text-gradient">{t('about.section.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t('about.section.description')}
            </p>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Portrait Image */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-3xl" />
            
            <div className="relative">
              {/* Image container with decorative elements */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutPortrait} 
                  alt="IYM Team" 
                  className="w-full h-auto object-cover aspect-square"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
              
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-2xl blur-xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              
              {/* Quote card overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-6">
                <blockquote className="text-lg italic text-foreground/90 text-center">
                  "{t('about.quote')}"
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