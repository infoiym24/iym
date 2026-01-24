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
  
  const learnMore = language === 'en' ? 'Learn more' : 
                    language === 'ru' ? 'Узнать больше' : 
                    'Mehr erfahren';
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    navigate(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group luxury-card p-8 transition-all duration-500 cursor-pointer hover:border-accent/40"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon container */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-forest to-accent flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500">
        <Icon className="w-7 h-7 text-foreground" />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-3 font-playfair tracking-tight group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-inter">
        {description}
      </p>
      
      {/* CTA */}
      <div className="flex items-center text-accent font-medium text-sm group-hover:text-primary transition-colors duration-300 font-inter">
        <span>{learnMore}</span>
        <svg 
          className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </a>
  );
};

export default ServiceCard;