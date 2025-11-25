import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    { icon: Phone, label: 'Telefon', value: '+49 123 456 789', href: 'tel:+49123456789' },
    { icon: Mail, label: 'E-Mail', value: 'info@iym-service.de', href: 'mailto:info@iym-service.de' },
    { icon: MapPin, label: 'Adresse', value: 'Musterstraße 1, 12345 Stadt', href: '#' },
  ];

  return (
    <section id="contact" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
            Kontakt
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-6">
            Lassen Sie uns <span className="text-gradient">sprechen</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Haben Sie Fragen oder benötigen Sie ein Angebot? 
            Kontaktieren Sie uns – wir sind für Sie da.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <div className="space-y-6 mb-12">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-4 glass rounded-xl p-4 hover-glow group"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="text-foreground font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2 animate-pulse" />
                  <p className="text-muted-foreground">Karte wird geladen...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-semibold font-space-grotesk mb-6">
              Nachricht senden
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none"
                  placeholder="Ihr Name"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground/90 mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none"
                    placeholder="ihre@email.de"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/90 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none"
                    placeholder="+49 123 456 789"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-2">
                  Ihre Nachricht
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none resize-none"
                  rows={5}
                  placeholder="Wie können wir Ihnen helfen?"
                  required
                />
              </div>
              <Button variant="hero" size="lg" className="w-full">
                <Send className="w-5 h-5 mr-2" />
                Nachricht senden
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
