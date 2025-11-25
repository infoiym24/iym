import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Ihre Lösung für alle Dienstleistungen</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-space-grotesk mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-gradient">IYM</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground/90 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            I'm Your Man
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Ihr zuverlässiger Partner für professionelle Dienstleistungen. 
            Qualität, Vertrauen und Effizienz – alles aus einer Hand.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl">
              Services entdecken
            </Button>
            <Button variant="glass" size="xl">
              Mehr erfahren
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
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
