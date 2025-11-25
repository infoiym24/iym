import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { 
  Wrench, 
  Paintbrush, 
  Truck, 
  Home, 
  Leaf,
  Megaphone,
  Car,
  Droplets,
  Trash2,
  Package,
  Sparkles,
  Settings,
  Search
} from 'lucide-react';

const services = [
  {
    title: 'Marketing & Webdesign',
    description: 'Social Media Marketing, Webdesign und digitale Präsenz für Ihr Unternehmen.',
    icon: Megaphone,
    href: '/services/marketing',
  },
  {
    title: 'Handwerk',
    description: 'Professionelle Handwerksarbeiten für Ihr Zuhause oder Unternehmen.',
    icon: Wrench,
    href: '/services/handwerk',
  },
  {
    title: 'Renovierung',
    description: 'Komplett-Renovierungen und Modernisierungen nach Ihren Wünschen.',
    icon: Paintbrush,
    href: '/services/renovierung',
  },
  {
    title: 'Transport',
    description: 'Zuverlässiger Transportservice für alle Ihre Bedürfnisse.',
    icon: Truck,
    href: '/services/transport',
  },
  {
    title: 'Umzugsservice',
    description: 'Stressfreier Umzug mit professioneller Unterstützung von A bis Z.',
    icon: Package,
    href: '/services/umzug',
  },
  {
    title: 'Entrümpelung',
    description: 'Schnelle und saubere Entrümpelung von Wohnungen und Gewerbeobjekten.',
    icon: Trash2,
    href: '/services/entruempelung',
  },
  {
    title: 'Hausmeisterservice',
    description: 'Umfassender Hausmeisterservice für Ihr Gebäude oder Ihre Anlage.',
    icon: Home,
    href: '/services/hausmeister',
  },
  {
    title: 'Reparaturservice',
    description: 'Schnelle und fachgerechte Reparaturen aller Art.',
    icon: Settings,
    href: '/services/reparaturen',
  },
  {
    title: 'Gartenpflege',
    description: 'Professionelle Garten- und Landschaftspflege rund ums Jahr.',
    icon: Leaf,
    href: '/services/gartenpflege',
  },
  {
    title: 'Hochdruckreinigung',
    description: 'Gründliche Reinigung von Terrassen, Fassaden und Einfahrten.',
    icon: Droplets,
    href: '/services/hochdruckreinigung',
  },
  {
    title: 'Auto Service',
    description: 'Mobiler Reifenwechsel, Zentralverriegelung und Einparkhilfe Einbau.',
    icon: Car,
    href: '/services/auto',
  },
  {
    title: 'Auto Find Service',
    description: 'Professionelle Prüfung und Suche Ihres Traumwagens mit Expertise.',
    icon: Search,
    href: '/services/auto-find',
  },
  {
    title: 'Car Detailing',
    description: 'Professionelle Fahrzeugaufbereitung für Innen- und Außenbereich.',
    icon: Sparkles,
    href: '/services/car-detailing',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
                Alle Services
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6">
                Unsere <span className="text-gradient">Dienstleistungen</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Entdecken Sie unser komplettes Angebot. Von Handwerk bis Marketing – 
                wir sind Ihr Partner für alle Fälle, zu fairen Preisen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  {...service}
                  delay={index * 50}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
