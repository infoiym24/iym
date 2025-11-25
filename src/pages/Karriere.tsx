import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';

const Karriere = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Junges Team',
      description: 'Arbeite mit motivierten Kollegen in einem dynamischen Umfeld'
    },
    {
      icon: TrendingUp,
      title: 'Wachstum',
      description: 'Entwickle dich weiter mit spannenden Projekten und Weiterbildungen'
    },
    {
      icon: Heart,
      title: 'Work-Life-Balance',
      description: 'Flexible Arbeitszeiten und faire Vergütung'
    },
    {
      icon: Briefcase,
      title: 'Vielfalt',
      description: 'Abwechslungsreiche Aufgaben in verschiedenen Branchen'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk mb-6">
              Werde Teil von <span className="text-gradient">IYM</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Wir suchen engagierte Menschen, die mit uns wachsen wollen. 
              Bei uns erwartet dich ein junges, dynamisches Team und spannende Herausforderungen.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-space-grotesk text-center mb-12">
            Warum <span className="text-gradient">IYM</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <benefit.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold font-space-grotesk mb-2 text-center">
                Jetzt bewerben
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Sende uns deine Bewerbung und werde Teil unseres Teams
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname *</Label>
                    <Input id="firstName" placeholder="Max" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname *</Label>
                    <Input id="lastName" placeholder="Mustermann" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input id="email" type="email" placeholder="max@beispiel.de" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" placeholder="+49 123 456789" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Gewünschte Position *</Label>
                  <Input id="position" placeholder="z.B. Handwerker, Fahrer, Marketing..." required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Über dich *</Label>
                  <Textarea
                    id="message"
                    placeholder="Erzähl uns etwas über dich, deine Erfahrungen und warum du bei IYM arbeiten möchtest..."
                    rows={5}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cv">Lebenslauf (optional)</Label>
                  <Input id="cv" type="file" accept=".pdf,.doc,.docx" />
                  <p className="text-xs text-muted-foreground">PDF, DOC oder DOCX (max. 5MB)</p>
                </div>
                
                <Button type="submit" variant="glow" size="lg" className="w-full">
                  Bewerbung absenden
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Karriere;
