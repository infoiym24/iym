import { useEffect, useRef } from 'react';

const GreenSeaSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] overflow-hidden rounded-2xl my-12"
    >
      {/* Deep green sea background */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-dark via-forest to-forest-dark" />
      
      {/* Animated wave layers */}
      <div className="absolute inset-0">
        {/* Wave 1 - Gold reflection */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[60%] animate-sea-wave"
          style={{
            background: `
              radial-gradient(ellipse 100% 60% at 50% 100%, hsl(42 85% 55% / 0.15) 0%, transparent 70%),
              radial-gradient(ellipse 80% 40% at 30% 80%, hsl(42 90% 60% / 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 80% 40% at 70% 85%, hsl(42 80% 50% / 0.12) 0%, transparent 50%)
            `,
            animationDelay: '0s',
          }}
        />
        
        {/* Wave 2 - Deeper gold */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[50%] animate-sea-wave"
          style={{
            background: `
              radial-gradient(ellipse 120% 50% at 50% 100%, hsl(42 85% 55% / 0.1) 0%, transparent 60%),
              radial-gradient(ellipse 60% 30% at 20% 90%, hsl(45 80% 55% / 0.08) 0%, transparent 45%)
            `,
            animationDelay: '2s',
          }}
        />
        
        {/* Wave 3 - Subtle shimmer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[40%] animate-sea-wave"
          style={{
            background: `
              radial-gradient(ellipse 150% 40% at 50% 100%, hsl(42 90% 60% / 0.08) 0%, transparent 55%)
            `,
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Gold shimmer line on water */}
      <div 
        className="absolute bottom-[30%] left-0 right-0 h-1 animate-gold-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(42 85% 55% / 0.4) 25%, hsl(42 90% 65% / 0.6) 50%, hsl(42 85% 55% / 0.4) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          filter: 'blur(2px)',
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h3 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gradient-gold mb-6 tracking-wider">
            Exzellenz & Eleganz
          </h3>
          <p className="font-cormorant text-xl md:text-2xl text-foreground/80 italic max-w-2xl mx-auto">
            Erleben Sie Service auf höchstem Niveau mit Hingabe zum Detail
          </p>
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
  );
};

export default GreenSeaSection;