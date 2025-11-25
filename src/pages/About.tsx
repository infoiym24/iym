import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Zap, Target, Wallet, Wrench, Shield } from 'lucide-react';

const teamValues = [
  {
    icon: Zap,
    title: 'Schnelligkeit',
    description: 'Wir reagieren schnell und setzen Ihre Projekte effizient um.'
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'Moderne Lösungen und kreative Ansätze für jede Herausforderung.'
  },
  {
    icon: Shield,
    title: 'Kompetenz',
    description: 'Fundiertes Wissen aus verschiedensten Dienstleistungssektoren.'
  },
  {
    icon: Wallet,
    title: 'Faire Preise',
    description: 'Transparente und ehrliche Preisgestaltung ohne versteckte Kosten.'
  },
  {
    icon: Wrench,
    title: 'Hands-On',
    description: 'Wir scheuen uns nicht, unsere Hände dreckig zu machen.'
  },
  {
    icon: Users,
    title: 'Teamgeist',
    description: 'Ein engagiertes Team, das gemeinsam für Ihren Erfolg arbeitet.'
  }
];

const faqs = [
  {
    question: 'Welche Dienstleistungen bietet IYM an?',
    answer: 'Wir bieten ein breites Spektrum an Services: Marketing & Webdesign, Handwerk, Renovierung, Transport, Umzugsservice, Entrümpelung, Hausmeisterservice, Reparaturen, Gartenpflege, Hochdruckreinigung, Auto Service und Car Detailing. Egal was Sie brauchen – wir sind Ihr Mann für den Job!'
  },
  {
    question: 'Wie schnell können Sie einen Auftrag übernehmen?',
    answer: 'Dank unserer flexiblen Struktur und unseres engagierten Teams können wir meist sehr kurzfristig reagieren. Kontaktieren Sie uns einfach und wir finden gemeinsam einen passenden Termin.'
  },
  {
    question: 'Wie setzt sich der Preis zusammen?',
    answer: 'Wir arbeiten mit transparenten und fairen Preisen. Je nach Dienstleistung erstellen wir Ihnen ein individuelles Angebot basierend auf Aufwand, Material und Zeitbedarf. Es gibt keine versteckten Kosten!'
  },
  {
    question: 'In welchen Regionen sind Sie tätig?',
    answer: 'Wir sind regional flexibel und können je nach Dienstleistung auch größere Entfernungen abdecken. Fragen Sie einfach nach – wir finden eine Lösung.'
  },
  {
    question: 'Kann ich mehrere Services kombinieren?',
    answer: 'Absolut! Viele unserer Kunden nutzen mehrere Dienstleistungen gleichzeitig. Ob Umzug mit anschließender Renovierung oder Gartenpflege mit Hochdruckreinigung – wir koordinieren alles aus einer Hand.'
  },
  {
    question: 'Was unterscheidet IYM von anderen Anbietern?',
    answer: 'Wir sind ein junges, dynamisches Team mit Erfahrung in verschiedensten Branchen. Das macht uns flexibel, innovativ und kompetent. Dazu kommen faire Preise und ein persönlicher Service – bei uns sind Sie keine Nummer!'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
                Über uns
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6">
                Wir sind <span className="text-gradient">IYM</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Ein junges, engagiertes Team mit Erfahrung in verschiedensten 
                Dienstleistungssektoren. Wir punkten mit Schnelligkeit, Innovation 
                und Kompetenz – und das zu fairen Preisen.
              </p>
            </div>
          </div>
        </section>

        {/* Team Values Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                Was uns <span className="text-gradient">auszeichnet</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Wir scheuen uns nicht, unsere Hände dreckig zu machen – für einen 
                fairen Preis erhalten Sie Qualitätsarbeit mit Herzblut.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamValues.map((value, index) => (
                <div 
                  key={value.title}
                  className="glass rounded-2xl p-8 hover:bg-card/90 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-space-grotesk mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                Häufig gestellte <span className="text-gradient">Fragen</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hier finden Sie Antworten auf die wichtigsten Fragen rund um IYM.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="glass rounded-xl px-6 border-none"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-semibold font-space-grotesk text-lg">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-6">
                Noch Fragen? Wir helfen Ihnen gerne weiter!
              </p>
              <Link to="/#contact">
                <Button variant="hero" size="lg">
                  Kontakt aufnehmen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
