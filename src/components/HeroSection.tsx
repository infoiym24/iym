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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Elegant grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(42 85% 55% / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(42 85% 55% / 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main heading - IYM huge and prominent */}
          <h1 className="text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black font-cinzel leading-none mb-8 opacity-0 animate-fade-in tracking-widest" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="text-gradient-gold animate-iym-glow inline-block">IYM</span>
          </h1>
          
          {/* I'm Your Man - words pop in with 2 second delays */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 mb-12 min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
            {words.map((word) => (
              <span
                key={word.text}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground font-cormorant italic animate-word-pop-smooth"
                style={{ 
                  animationDelay: `${word.delay}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {word.text}
              </span>
            ))}
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in font-montserrat" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <Link to="/services">
              <Button variant="luxury" size="xl">
                {t('hero.discover')}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="gold" size="xl">
                {t('hero.learn')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
