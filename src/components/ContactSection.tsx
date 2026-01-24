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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 animate-fade-in font-montserrat">
            {t('contact.section.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-cinzel mb-6 tracking-wide">
            <span className="text-gradient-gold">{t('contact.section.title')}</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-montserrat">
            {t('contact.section.subtitle')}
          </p>
        </div>

        {/* Contact form - centered */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-luxury rounded-2xl p-8 md:p-10 animate-fade-in">
            <h3 className="text-2xl font-semibold font-cinzel mb-8 text-center tracking-wide">
              {t('contact.form.title')}
            </h3>
            <div className="gold-divider mb-8" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-foreground/90 mb-2 font-montserrat tracking-wide">
                  {t('contact.form.name')} <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-secondary/50 border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/40 font-montserrat"
                  placeholder={t('contact.form.name.placeholder')}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-foreground/90 mb-2 font-montserrat tracking-wide">
                    {t('contact.email')} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-secondary/50 border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/40 font-montserrat"
                    placeholder={t('contact.form.email.placeholder')}
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-foreground/90 mb-2 font-montserrat tracking-wide">
                    {phoneOptionalLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-secondary/50 border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/40 font-montserrat"
                    placeholder={t('contact.form.phone.placeholder')}
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-foreground/90 mb-2 font-montserrat tracking-wide">
                  {serviceSelectLabel}
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-secondary/50 border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none appearance-none cursor-pointer hover:border-primary/40 font-montserrat"
                  >
                    <option value="">{serviceSelectLabel}</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-foreground/90 mb-2 font-montserrat tracking-wide">
                  {t('contact.form.message')} <span className="text-primary">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-secondary/50 border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none resize-none hover:border-primary/40 font-montserrat"
                  rows={5}
                  placeholder={t('contact.form.message.placeholder')}
                  required
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-muted-foreground font-montserrat">{requiredNote}</p>
              </div>
              <Button variant="luxury" size="lg" className="w-full group relative overflow-hidden">
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