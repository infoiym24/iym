import { CheckCircle2, Users, Clock, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Zufriedene Kunden' },
  { icon: Clock, value: '24/7', label: 'Erreichbarkeit' },
  { icon: Award, value: '10+', label: 'Jahre Erfahrung' },
];

const features = [
  'Persönliche Beratung und individuelle Lösungen',
  'Faire und transparente Preisgestaltung',
  'Zuverlässigkeit und Pünktlichkeit',
  'Höchste Qualitätsstandards',
  'Schnelle Reaktionszeiten',
  'Zufriedenheitsgarantie',
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
              Über IYM
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-6">
              Ihr Partner für <span className="text-gradient">alle Fälle</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              IYM – I'm Your Man steht für Zuverlässigkeit, Qualität und 
              persönlichen Service. Wir sind Ihr Ansprechpartner für alle 
              Dienstleistungen rund um Haus, Hof und mehr. Mit langjähriger 
              Erfahrung und einem engagierten Team sorgen wir dafür, dass 
              Ihre Projekte erfolgreich umgesetzt werden.
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

          {/* Right content - Stats cards */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl blur-3xl" />
            
            <div className="relative glass rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold font-space-grotesk text-gradient mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-12 pt-8 border-t border-border/50">
                <blockquote className="text-lg italic text-foreground/80 text-center">
                  "Was auch immer Sie brauchen – ich bin Ihr Mann für den Job."
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
