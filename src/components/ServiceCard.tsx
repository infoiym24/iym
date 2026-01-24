import { LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const learnMore = language === 'en' ? 'Learn more' : language === 'ru' ? 'Узнать больше' : 'Mehr erfahren';
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Scroll to top first, then navigate
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    navigate(href);
  };
  
  return (
    <a 
      href={href}
      onClick={handleClick}
      className="group block animate-fade-in cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative glass-luxury rounded-xl p-8 h-full transition-all duration-500 hover:scale-[1.02] overflow-hidden">
        {/* Gold glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 to-primary/10 blur-xl opacity-50" />
        </div>

        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Pulsing border on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pulse-glow" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500">
            <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold font-cinzel mb-3 text-foreground group-hover:text-primary transition-all duration-300 tracking-wide">
            {title}
          </h3>

          {/* Gold divider */}
          <div className="gold-divider mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed font-montserrat">
            {description}
          </p>

          {/* Arrow indicator */}
          <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <span className="text-sm font-medium font-montserrat tracking-wide uppercase">{learnMore}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;