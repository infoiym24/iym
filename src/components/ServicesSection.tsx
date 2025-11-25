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
  Settings
} from 'lucide-react';
import ServiceCard from './ServiceCard';

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
    title: 'Car Detailing',
    description: 'Professionelle Fahrzeugaufbereitung für Innen- und Außenbereich.',
    icon: Sparkles,
    href: '/services/car-detailing',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
            Was wir bieten
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-6">
            Unsere <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entdecken Sie unser breites Spektrum an professionellen Dienstleistungen. 
            Klicken Sie auf einen Service, um mehr zu erfahren.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
