import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import iymLogo from '@/assets/iym-logo.png';

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
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  };


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
    <footer className="relative pt-24 pb-8 bg-secondary/40">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={iymLogo} 
                alt="I'm Your Man Logo" 
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t('hero.description')}
            </p>
          </div>

          {/* Links columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold font-display mb-4 text-foreground">
                {column.title}
              </h4>
              <div className="forest-divider mb-4 opacity-40" />
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link.href, !!link.isRoute)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 bg-transparent border-none cursor-pointer text-sm"
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
        <div className="pt-8 border-t border-border/30 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} IYM I'm Your Man. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
