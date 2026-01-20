import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const serviceSelectLabel = language === 'de' ? 'Service auswählen (optional)' :
                             language === 'en' ? 'Select Service (optional)' :
                             'Выбрать услугу (опционально)';

  const otherServiceLabel = language === 'de' ? 'Andere Dienstleistung' :
                            language === 'en' ? 'Other Service' :
                            'Другая услуга';

  const phoneOptionalLabel = language === 'de' ? 'Telefon (optional)' :
                             language === 'en' ? 'Phone (optional)' :
                             'Телефон (опционально)';

  const requiredNote = language === 'de' ? '* Pflichtfelder' :
                       language === 'en' ? '* Required fields' :
                       '* Обязательные поля';

  const serviceOptions = [
    { value: 'marketing', label: t('service.marketing') },
    { value: 'entruempelung', label: t('service.entruempelung') },
    { value: 'reparatur', label: t('service.reparatur') },
    { value: 'autoservice', label: t('service.auto') },
    { value: 'autofind', label: t('service.autofind') },
    { value: 'detailing', label: t('service.detailing') },
    { value: 'other', label: otherServiceLabel },
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0">
        <div className="gold-divider" />
      </div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header - luxury styled */}
        <div className="text-center mb-16">
          <span className="inline-block text-accent text-sm font-body font-medium tracking-[0.2em] uppercase mb-4 animate-fade-in">
            {t('contact.section.label')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="text-gold">{t('contact.section.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg font-elegant italic max-w-2xl mx-auto">
            {t('contact.section.subtitle')}
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        </div>

        {/* Contact form - centered with luxury styling */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-luxury rounded-3xl p-10 md:p-12 animate-fade-in">
            <h3 className="text-2xl font-display font-semibold mb-10 text-center text-foreground">
              {t('contact.form.title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="group">
                <label className="block text-sm font-body font-medium text-foreground/90 mb-2.5 tracking-wide">
                  {t('contact.form.name')} <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-secondary/60 border-2 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none hover:border-accent/40 font-body"
                  placeholder={t('contact.form.name.placeholder')}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-7">
                <div className="group">
                  <label className="block text-sm font-body font-medium text-foreground/90 mb-2.5 tracking-wide">
                    {t('contact.email')} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-secondary/60 border-2 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none hover:border-accent/40 font-body"
                    placeholder={t('contact.form.email.placeholder')}
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-body font-medium text-foreground/90 mb-2.5 tracking-wide">
                    {phoneOptionalLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-secondary/60 border-2 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none hover:border-accent/40 font-body"
                    placeholder={t('contact.form.phone.placeholder')}
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-body font-medium text-foreground/90 mb-2.5 tracking-wide">
                  {serviceSelectLabel}
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-secondary/60 border-2 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none appearance-none cursor-pointer hover:border-accent/40 font-body"
                  >
                    <option value="">{serviceSelectLabel}</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-body font-medium text-foreground/90 mb-2.5 tracking-wide">
                  {t('contact.form.message')} <span className="text-accent">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-secondary/60 border-2 border-border/50 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none resize-none hover:border-accent/40 font-body"
                  rows={5}
                  placeholder={t('contact.form.message.placeholder')}
                  required
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-muted-foreground font-body">{requiredNote}</p>
              </div>
              <Button variant="gold" size="lg" className="w-full group relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                  {t('contact.form.submit')}
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;