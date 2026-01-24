import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setIsOpen(false);
    
    if (isRoute) {
      navigate(href);
      // Scroll to top after navigation
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      return;
    }
    
    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + href);
      }
    }
  };

  const navLinks = [
    { name: t('nav.services'), href: '/services', isRoute: true },
    { name: t('nav.about'), href: '#about', isRoute: false },
    { name: t('nav.contact'), href: '#contact', isRoute: false },
  ];

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-luxury">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - navigates to homepage top */}
          <button onClick={handleLogoClick} className="flex items-center gap-3 group bg-transparent border-none cursor-pointer">
            <span className="text-3xl font-bold font-cinzel text-gradient-gold tracking-widest">
              IYM
            </span>
            <span className="text-sm text-muted-foreground hidden sm:block group-hover:text-primary transition-colors font-cormorant italic">
              I'm Your Man
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.isRoute)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group bg-transparent border-none cursor-pointer font-montserrat tracking-wide text-sm uppercase"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-gold-light transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <LanguageSwitcher />
            <Button variant="luxury" size="sm" onClick={() => handleNavClick('#contact')}>
              {t('nav.request')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="text-foreground p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href, link.isRoute)}
                  className="text-muted-foreground hover:text-primary transition-colors py-2 text-left bg-transparent border-none cursor-pointer font-montserrat tracking-wide text-sm uppercase"
                >
                  {link.name}
                </button>
              ))}
              <Button variant="luxury" className="mt-2" onClick={() => handleNavClick('#contact')}>
                {t('nav.request')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
