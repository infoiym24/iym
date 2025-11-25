import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (href: string) => {
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

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const footerLinks = [
    {
      title: 'Unternehmen',
      links: [
        { name: 'Über uns', href: '/about', isRoute: true },
        { name: 'Kontakt', href: '#contact', isAnchor: true },
        { name: 'Karriere', href: '/karriere', isRoute: true },
      ],
    },
    {
      title: 'Rechtliches',
      links: [
        { name: 'Impressum', href: '/impressum', isRoute: true },
        { name: 'Datenschutz', href: '/datenschutz', isRoute: true },
        { name: 'AGB', href: '/agb', isRoute: true },
        { name: 'Cookie-Einstellungen', href: '/cookie-einstellungen', isRoute: true },
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
              Ihr zuverlässiger Partner für alle Dienstleistungen. 
              Qualität und Vertrauen seit über 10 Jahren.
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
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAnchorClick(link.href)}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 bg-transparent border-none cursor-pointer"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} IYM – I'm Your Man. Alle Rechte vorbehalten.
          </p>
          <p className="text-muted-foreground text-sm">
            Mit <span className="text-primary">♥</span> erstellt
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
