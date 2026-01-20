import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

const ServiceCard = ({ title, description, icon: Icon, href, delay = 0 }: ServiceCardProps) => {
  const { language } = useLanguage();
  
  const learnMore = language === 'en' ? 'Learn more' : language === 'ru' ? 'Узнать больше' : 'Mehr erfahren';
  
  return (
    <Link 
      to={href}
      className="group block animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative glass-luxury rounded-2xl p-8 h-full transition-all duration-500 hover:scale-[1.02] overflow-hidden">
        {/* Luxury glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/25 to-accent/25 blur-xl opacity-60" />
        </div>

        {/* Pulsing border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pulse-glow" />
        
        {/* Gold accent corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon - luxury styled */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-500 border border-accent/10">
            <Icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-gold transition-all duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed font-body">
            {description}
          </p>

          {/* Arrow indicator */}
          <div className="mt-6 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <span className="text-sm font-medium font-body">{learnMore}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;