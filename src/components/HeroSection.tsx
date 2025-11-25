import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const words = [
    { text: "I'm", delay: 0.5 },
    { text: "Your", delay: 2.5 },
    { text: "Man", delay: 4.5 }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Tagline - at the very top */}
          <p className="text-primary text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase font-medium mb-6 animate-fade-in">
            Ihre Lösung für fast alle Dienstleistungen
          </p>

          {/* Main heading - IYM huge and prominent */}
          <h1 className="text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black font-space-grotesk leading-none mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-gradient animate-iym-glow inline-block">IYM</span>
          </h1>
          
          {/* I'm Your Man - words pop in with 2 second delays */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 mb-12 perspective-1000">
            {words.map((word) => (
              <span
                key={word.text}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground animate-word-pop"
                style={{ 
                  animationDelay: `${word.delay}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {word.text}
              </span>
            ))}
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '5.5s' }}>
            Ihr zuverlässiger Partner für professionelle Dienstleistungen. 
            Qualität, Vertrauen und Effizienz – alles aus einer Hand.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '6s' }}>
            <Button variant="hero" size="xl">
              Services entdecken
            </Button>
            <Button variant="glass" size="xl">
              Mehr erfahren
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDelay: '7s' }}>
            <a href="#services" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <span className="text-sm">Scrollen</span>
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
