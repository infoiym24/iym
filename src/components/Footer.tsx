import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLinkClick = (href: string, isRoute: boolean) => {
    if (isRoute) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      if (location.pathname === '/') {
        // Small delay to ensure DOM is ready, then scroll to element
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        navigate('/');
        // After navigation, scroll to element
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const footerLinks = [
    {
      title: t('footer.company'),
      links: [
        { name: t('nav.about'), href: '/about', isRoute: true },
        { name: t('nav.contact'), href: '#contact', isAnchor: true },
        { name: t('footer.career'), href: '/karriere', isRoute: true },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { name: t('footer.imprint'), href: '/impressum', isRoute: true },
        { name: t('footer.privacy'), href: '/datenschutz', isRoute: true },
        { name: t('footer.terms'), href: '/agb', isRoute: true },
        { name: t('footer.cookies'), href: '/cookie-einstellungen', isRoute: true },
      ],
    },
  ];

  return (
    <footer className="relative pt-28 pb-10">
      {/* Top gold border */}
      <div className="absolute top-0 left-0 right-0">
        <div className="gold-divider" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand column - luxury styled */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8">
              <span 
                className="text-4xl font-display font-bold text-gold"
                style={{
                  textShadow: '0 0 30px hsl(43 80% 55% / 0.4)',
                }}
              >
                IYM
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm font-elegant italic text-lg leading-relaxed">
              {t('hero.description')}
            </p>
            {/* Social links - luxury styled */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 border border-accent/10 hover:border-accent/30 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-display font-semibold mb-6 text-foreground text-lg tracking-wide">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link.href, !!link.isRoute)}
                      className="text-muted-foreground hover:text-accent transition-all duration-300 bg-transparent border-none cursor-pointer font-body hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-accent/10 flex items-center justify-center">
          <p className="text-muted-foreground text-sm font-body">
            © 2026 <span className="text-accent">IYM</span> I'm Your Man. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;