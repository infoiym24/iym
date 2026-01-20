import { useLanguage } from '@/contexts/LanguageContext';

const GreenSeaWaveSection = () => {
  const { language } = useLanguage();
  
  const title = language === 'de' ? 'Exzellenz in jeder Dienstleistung' :
                language === 'en' ? 'Excellence in Every Service' :
                'Превосходство в каждой услуге';
                
  const subtitle = language === 'de' ? 'Wo Qualität auf Leidenschaft trifft' :
                   language === 'en' ? 'Where Quality Meets Passion' :
                   'Где качество встречается со страстью';

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated green sea background */}
      <div className="absolute inset-0">
        {/* Base deep forest green layer */}
        <div 
          className="absolute inset-0 animate-ocean-wave"
          style={{
            background: `
              linear-gradient(180deg, 
                hsl(155 55% 12% / 0.95) 0%, 
                hsl(160 60% 18% / 0.98) 25%,
                hsl(165 65% 22% / 1) 50%,
                hsl(160 60% 18% / 0.98) 75%,
                hsl(155 55% 12% / 0.95) 100%
              )
            `,
          }}
        />
        
        {/* Wave layer 1 */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 20% 100%, hsl(160 65% 25% / 0.6) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 80% 90%, hsl(155 60% 22% / 0.5) 0%, transparent 45%)
            `,
            animation: 'ocean-wave 6s ease-in-out infinite',
          }}
        />
        
        {/* Wave layer 2 */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 60% 85%, hsl(165 70% 28% / 0.5) 0%, transparent 40%),
              radial-gradient(ellipse 90% 45% at 30% 95%, hsl(160 65% 24% / 0.4) 0%, transparent 35%)
            `,
            animation: 'ocean-wave 8s ease-in-out infinite reverse',
            animationDelay: '-2s',
          }}
        />
        
        {/* Gold wave reflections - main */}
        <div 
          className="absolute inset-0 animate-gold-wave"
          style={{
            background: `
              radial-gradient(ellipse 60% 30% at 25% 45%, hsl(43 80% 55% / 0.35) 0%, transparent 50%),
              radial-gradient(ellipse 50% 25% at 70% 55%, hsl(45 85% 60% / 0.3) 0%, transparent 45%),
              radial-gradient(ellipse 40% 20% at 45% 65%, hsl(38 85% 50% / 0.25) 0%, transparent 40%)
            `,
          }}
        />
        
        {/* Gold shimmer streaks */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(125deg, transparent 30%, hsl(43 80% 55% / 0.15) 45%, hsl(45 90% 60% / 0.25) 50%, hsl(43 80% 55% / 0.15) 55%, transparent 70%),
              linear-gradient(-135deg, transparent 35%, hsl(45 85% 55% / 0.12) 48%, hsl(43 85% 60% / 0.2) 52%, hsl(45 85% 55% / 0.12) 56%, transparent 65%)
            `,
            animation: 'gold-wave-shimmer 5s ease-in-out infinite',
          }}
        />
        
        {/* Floating gold particles */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle 3px at 20% 30%, hsl(43 80% 60% / 0.6) 0%, transparent 100%),
              radial-gradient(circle 2px at 35% 50%, hsl(45 85% 65% / 0.5) 0%, transparent 100%),
              radial-gradient(circle 4px at 55% 35%, hsl(43 80% 55% / 0.55) 0%, transparent 100%),
              radial-gradient(circle 2px at 75% 60%, hsl(45 90% 60% / 0.5) 0%, transparent 100%),
              radial-gradient(circle 3px at 85% 40%, hsl(43 80% 58% / 0.6) 0%, transparent 100%),
              radial-gradient(circle 2px at 10% 70%, hsl(45 85% 62% / 0.45) 0%, transparent 100%),
              radial-gradient(circle 3px at 60% 75%, hsl(43 80% 55% / 0.5) 0%, transparent 100%),
              radial-gradient(circle 2px at 90% 25%, hsl(45 85% 60% / 0.55) 0%, transparent 100%)
            `,
            animation: 'luxury-float 10s ease-in-out infinite',
          }}
        />
        
        {/* Subtle vignette for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, hsl(150 15% 6% / 0.4) 100%)
            `,
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gold-shimmer leading-tight"
            style={{
              textShadow: '0 0 40px hsl(43 80% 55% / 0.5), 0 0 80px hsl(43 80% 55% / 0.3)',
            }}
          >
            {title}
          </h2>
          <p 
            className="text-xl md:text-2xl font-elegant italic text-foreground/90"
            style={{
              textShadow: '0 0 20px hsl(43 80% 55% / 0.2)',
            }}
          >
            {subtitle}
          </p>
          
          {/* Decorative gold line */}
          <div className="mt-10 mx-auto w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />
        </div>
      </div>
    </section>
  );
};

export default GreenSeaWaveSection;