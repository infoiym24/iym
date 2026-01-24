import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

const ServiceCard = ({ title, description, icon: Icon, href }: ServiceCardProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const learnMore = language === 'en' ? 'Learn more' : language === 'ru' ? 'Узнать больше' : 'Mehr erfahren';
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    navigate(href);
  };
  
  return (
    <a 
      href={href}
      onClick={handleClick}
      className="group block cursor-pointer"
    >
      <div className="relative luxury-card rounded-xl p-8 h-full transition-all duration-500 hover-lift overflow-hidden">
        {/* Forest green glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-forest/15 via-transparent to-primary/10" />
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-14 h-14 rounded-lg bg-forest/15 border border-forest/30 flex items-center justify-center mb-6 group-hover:bg-forest/25 group-hover:border-forest/50 transition-all duration-500">
            <Icon className="w-7 h-7 text-forest-light group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold font-display mb-3 text-foreground group-hover:text-primary transition-all duration-300">
            {title}
          </h3>

          {/* Divider */}
          <div className="forest-divider mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Arrow indicator */}
          <div className="mt-6 flex items-center gap-2 text-forest-light opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <span className="text-sm font-medium tracking-wide">{learnMore}</span>
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
