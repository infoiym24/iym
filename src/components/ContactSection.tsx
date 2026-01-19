import { Mail, Send } from 'lucide-react';
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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4 animate-fade-in">
            {t('contact.section.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-6">
            <span className="text-gradient">{t('contact.section.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t('contact.section.subtitle')}
          </p>
          
          {/* Email card centered above form */}
          <a
            href="mailto:gazarov2004@mail.ru"
            className="inline-flex items-center gap-4 glass rounded-xl px-6 py-4 hover-glow group transition-all duration-300 hover:scale-105"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground">{t('contact.email')}</div>
              <div className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">gazarov2004@mail.ru</div>
            </div>
          </a>
        </div>

        {/* Contact form - centered */}
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-10 border border-primary/10 shadow-2xl shadow-primary/5 animate-fade-in">
            <h3 className="text-2xl font-semibold font-space-grotesk mb-8 text-center">
              {t('contact.form.title')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-foreground/90 mb-2">
                  {t('contact.form.name')} <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/30"
                  placeholder={t('contact.form.name.placeholder')}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-foreground/90 mb-2">
                    {t('contact.email')} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/30"
                    placeholder={t('contact.form.email.placeholder')}
                    required
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-foreground/90 mb-2">
                    {phoneOptionalLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/30"
                    placeholder={t('contact.form.phone.placeholder')}
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-foreground/90 mb-2">
                  {serviceSelectLabel}
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none appearance-none cursor-pointer hover:border-primary/30"
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
                <label className="block text-sm font-medium text-foreground/90 mb-2">
                  {t('contact.form.message')} <span className="text-primary">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none resize-none hover:border-primary/30"
                  rows={5}
                  placeholder={t('contact.form.message.placeholder')}
                  required
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-muted-foreground">{requiredNote}</p>
              </div>
              <Button variant="hero" size="lg" className="w-full group relative overflow-hidden">
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
