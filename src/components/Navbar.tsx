import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import iymLogo from '@/assets/iym-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Handle scroll direction to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
      
      // Always show navbar when at top of page
      if (currentScrollY < 50) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // Only update if scroll distance exceeds threshold
      if (Math.abs(currentScrollY - lastScrollY.current) < scrollThreshold) {
        return;
      }
      
      // Scrolling down - hide navbar
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } 
      // Scrolling up - show navbar
      else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation after page load
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [location]);

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setIsOpen(false);
    
    if (isRoute) {
      navigate(href);
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 glass transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center gap-3 group bg-transparent border-none cursor-pointer">
            <img 
              src={iymLogo} 
              alt="I'm Your Man Logo" 
              className="h-14 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.isRoute)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group bg-transparent border-none cursor-pointer tracking-wide text-sm"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-forest to-forest-light transition-all duration-300 group-hover:w-full" />
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
                  className="text-muted-foreground hover:text-foreground transition-colors py-2 text-left bg-transparent border-none cursor-pointer tracking-wide text-sm"
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
