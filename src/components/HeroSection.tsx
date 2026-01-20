import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  
  const words = [
    { text: "I'm", delay: 0.5 },
    { text: "Your", delay: 2.5 },
    { text: "Man", delay: 4.5 }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Luxury animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep emerald glow */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        {/* Gold glow */}
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {/* Central radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-primary/8 to-transparent rounded-full" />
        {/* Floating gold particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-accent/40 rounded-full blur-sm animate-luxury-float" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-accent/50 rounded-full blur-sm animate-luxury-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-accent/45 rounded-full blur-sm animate-luxury-float" style={{ animationDelay: '-5s' }} />
        <div className="absolute bottom-60 right-1/4 w-3 h-3 bg-accent/35 rounded-full blur-sm animate-luxury-float" style={{ animationDelay: '-7s' }} />
      </div>

      {/* Elegant grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(43 80% 55%) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(43 80% 55%) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main heading - IYM huge and prominent with gold shimmer */}
          <h1 className="text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-display font-bold leading-none mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span 
              className="text-gold animate-iym-glow inline-block"
              style={{
                textShadow: '0 0 60px hsl(43 80% 55% / 0.6), 0 0 120px hsl(43 80% 55% / 0.4)',
              }}
            >
              IYM
            </span>
          </h1>
          
          {/* I'm Your Man - elegant words pop in with 2 second delays */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 mb-14 min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
            {words.map((word) => (
              <span
                key={word.text}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-foreground animate-word-pop-smooth"
                style={{ 
                  animationDelay: `${word.delay}s`,
                  animationFillMode: 'forwards',
                  textShadow: '0 0 30px hsl(43 80% 55% / 0.2)',
                }}
              >
                {word.text}
              </span>
            ))}
          </div>

          <p className="text-lg md:text-xl font-elegant italic text-muted-foreground max-w-2xl mx-auto mb-14 opacity-0 animate-fade-in leading-relaxed" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            {t('hero.description')}
          </p>

          {/* CTA Buttons - Luxury styled */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <Link to="/services">
              <Button variant="gold" size="xl" className="min-w-[200px]">
                {t('hero.discover')}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="glass" size="xl" className="min-w-[200px]">
                {t('hero.learn')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="gold-divider" />
      </div>
    </section>
  );
};

export default HeroSection;