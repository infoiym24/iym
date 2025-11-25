import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const footerLinks = [
    {
      title: 'Services',
      links: [
        { name: 'Handwerk', href: '/services/handwerk' },
        { name: 'Renovierung', href: '/services/renovierung' },
        { name: 'Transport', href: '/services/transport' },
        { name: 'Hausmeister', href: '/services/hausmeister' },
      ],
    },
    {
      title: 'Unternehmen',
      links: [
        { name: 'Über uns', href: '#about' },
        { name: 'Kontakt', href: '#contact' },
        { name: 'Karriere', href: '#' },
        { name: 'Partner', href: '#' },
      ],
    },
    {
      title: 'Rechtliches',
      links: [
        { name: 'Impressum', href: '#' },
        { name: 'Datenschutz', href: '#' },
        { name: 'AGB', href: '#' },
        { name: 'Cookie-Einstellungen', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative pt-24 pb-8">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <span className="text-3xl font-bold font-space-grotesk text-gradient">
                IYM
              </span>
            </a>
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
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
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
