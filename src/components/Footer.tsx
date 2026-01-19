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
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + href);
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
    <footer className="relative pt-24 pb-8">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-bold font-space-grotesk text-gradient">
                IYM
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t('hero.description')}
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold font-space-grotesk mb-4 text-foreground">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link.href, !!link.isRoute)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 bg-transparent border-none cursor-pointer"
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
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} IYM – I'm Your Man. {t('footer.rights')}
          </p>
          <p className="text-muted-foreground text-sm">
            {t('footer.made')} <span className="text-primary">♥</span> {t('footer.created')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
