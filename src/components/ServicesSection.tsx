import { 
  Wrench, 
  Paintbrush, 
  Truck, 
  Home, 
  Shield, 
  Zap,
  Hammer,
  Leaf
} from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Handwerk',
    description: 'Professionelle Handwerksarbeiten für Ihr Zuhause oder Unternehmen. Qualität, die überzeugt.',
    icon: Hammer,
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
    description: 'Zuverlässiger Transport- und Umzugsservice für alle Ihre Bedürfnisse.',
    icon: Truck,
    href: '/services/transport',
  },
  {
    title: 'Hausmeister',
    description: 'Umfassender Hausmeisterservice für Ihr Gebäude oder Ihre Anlage.',
    icon: Home,
    href: '/services/hausmeister',
  },
  {
    title: 'Reparaturen',
    description: 'Schnelle und fachgerechte Reparaturen aller Art.',
    icon: Wrench,
    href: '/services/reparaturen',
  },
  {
    title: 'Sicherheit',
    description: 'Sicherheitslösungen und Installation von Sicherheitstechnik.',
    icon: Shield,
    href: '/services/sicherheit',
  },
  {
    title: 'Elektrik',
    description: 'Elektrische Installationen und Reparaturen vom Fachmann.',
    icon: Zap,
    href: '/services/elektrik',
  },
  {
    title: 'Gartenpflege',
    description: 'Professionelle Garten- und Landschaftspflege rund ums Jahr.',
    icon: Leaf,
    href: '/services/gartenpflege',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
