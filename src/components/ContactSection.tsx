import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurRevealText, SlideUpReveal } from './animations/BlurReveal';
import { motion, useInView } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ContactSection = () => {
  const { t, language } = useLanguage();
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          service: formData.service || undefined,
          message: formData.message,
        },
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      
      const successMessage = language === 'de' ? 'Nachricht erfolgreich gesendet!' :
                            language === 'en' ? 'Message sent successfully!' :
                            'Сообщение успешно отправлено!';
      toast.success(successMessage);

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      console.error('Error sending message:', error);
      const errorMessage = language === 'de' ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.' :
                          language === 'en' ? 'Failed to send. Please try again.' :
                          'Ошибка отправки. Пожалуйста, попробуйте снова.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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

  const sectionLabel = t('contact.section.label');
  const sectionTitle = t('contact.section.title');
  const sectionSubtitle = t('contact.section.subtitle');

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/40 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-forest/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal delay={0}>
            <span className="text-forest-light text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
              {sectionLabel}
            </span>
          </SlideUpReveal>
          
          <BlurRevealText
            className="text-4xl md:text-5xl font-display font-semibold text-gradient-gold mb-6 justify-center"
            delay={0.1}
            staggerDelay={0.1}
          >
            {sectionTitle}
          </BlurRevealText>
          
          <div className="gold-divider max-w-[200px] mx-auto mb-6" />
          
          <SlideUpReveal delay={0.3}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          </SlideUpReveal>
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto" ref={formRef}>
          <motion.div 
            className="glass-forest rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 40 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-2xl font-semibold font-display mb-8 text-center">
              {t('contact.form.title')}
            </h3>
            <div className="forest-divider mb-8" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 15 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <label className="block text-sm font-medium text-foreground/90 mb-2 tracking-wide">
                  {t('contact.form.name')} <span className="text-forest-light">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-background/50 border border-border focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all duration-300 outline-none hover:border-forest/50"
                  placeholder={t('contact.form.name.placeholder')}
                  required
                />
              </motion.div>
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-foreground/90 mb-2 tracking-wide">
                    {t('contact.email')} <span className="text-forest-light">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-background/50 border border-border focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all duration-300 outline-none hover:border-forest/50"
                    placeholder={t('contact.form.email.placeholder')}
                    required
                  />
                </motion.div>
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-foreground/90 mb-2 tracking-wide">
                    {phoneOptionalLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-background/50 border border-border focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all duration-300 outline-none hover:border-forest/50"
                    placeholder={t('contact.form.phone.placeholder')}
                  />
                </motion.div>
              </div>
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 15 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-sm font-medium text-foreground/90 mb-2 tracking-wide">
                  {serviceSelectLabel}
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-background/50 border border-border focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all duration-300 outline-none appearance-none cursor-pointer hover:border-forest/50"
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
              </motion.div>
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 15 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <label className="block text-sm font-medium text-foreground/90 mb-2 tracking-wide">
                  {t('contact.form.message')} <span className="text-forest-light">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-background/50 border border-border focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all duration-300 outline-none resize-none hover:border-forest/50"
                  rows={5}
                  placeholder={t('contact.form.message.placeholder')}
                  required
                />
              </motion.div>
              <motion.div 
                className="flex items-center justify-between pt-2"
                initial={{ opacity: 0 }}
                animate={formInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <p className="text-sm text-muted-foreground">{requiredNote}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <Button 
                  variant="luxury" 
                  size="lg" 
                  className="w-full group relative overflow-hidden"
                  disabled={isSubmitting || isSubmitted}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {language === 'de' ? 'Wird gesendet...' : language === 'en' ? 'Sending...' : 'Отправка...'}
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {language === 'de' ? 'Gesendet!' : language === 'en' ? 'Sent!' : 'Отправлено!'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
