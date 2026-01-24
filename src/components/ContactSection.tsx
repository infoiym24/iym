import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrainReveal } from './ScrollRevealText';
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

      // Reset success state after 5 seconds
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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-forest/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <TrainReveal
            lines={[sectionLabel]}
            className="mb-4"
            lineClassName="text-accent text-sm font-medium tracking-[0.3em] uppercase font-inter inline-block"
            wordDelay={0.1}
          />
          
          <TrainReveal
            lines={[sectionTitle]}
            className="mb-6"
            lineClassName="text-4xl md:text-5xl font-semibold font-playfair tracking-tight text-gradient-gold"
            wordDelay={0.1}
            lineDelay={0.3}
          />
          
          <div className="forest-divider max-w-xs mx-auto mb-6" />
          
          <TrainReveal
            lines={[sectionSubtitle]}
            className="max-w-2xl mx-auto"
            lineClassName="text-muted-foreground text-lg font-inter"
            wordDelay={0.05}
            lineDelay={0.5}
          />
        </div>

        {/* Contact form - centered with glow effect */}
        <div className="max-w-2xl mx-auto" ref={formRef}>
          <motion.div 
            className="glass-luxury rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, filter: 'blur(15px)', y: 30 }}
            animate={formInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(15px)', y: 30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-2xl font-semibold font-playfair mb-8 text-center tracking-tight">
              {t('contact.form.title')}
            </h3>
            <div className="forest-divider mb-8" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="group"
                initial={{ opacity: 0, x: -20 }}
                animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground/90 mb-2 font-inter tracking-wide">
                  {t('contact.form.name')} <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none hover:border-accent/40 font-inter"
                  placeholder={t('contact.form.name.placeholder')}
                  required
                />
              </motion.div>
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <label className="block text-sm font-medium text-foreground/90 mb-2 font-inter tracking-wide">
                    {t('contact.email')} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none hover:border-accent/40 font-inter"
                    placeholder={t('contact.form.email.placeholder')}
                    required
                  />
                </motion.div>
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <label className="block text-sm font-medium text-foreground/90 mb-2 font-inter tracking-wide">
                    {phoneOptionalLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none hover:border-accent/40 font-inter"
                    placeholder={t('contact.form.phone.placeholder')}
                  />
                </motion.div>
              </div>
              <motion.div 
                className="group"
                initial={{ opacity: 0, x: -20 }}
                animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground/90 mb-2 font-inter tracking-wide">
                  {serviceSelectLabel}
                </label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none appearance-none cursor-pointer hover:border-accent/40 font-inter"
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
                initial={{ opacity: 0, x: -20 }}
                animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground/90 mb-2 font-inter tracking-wide">
                  {t('contact.form.message')} <span className="text-accent">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 outline-none resize-none hover:border-accent/40 font-inter"
                  rows={5}
                  placeholder={t('contact.form.message.placeholder')}
                  required
                />
              </motion.div>
              <motion.div 
                className="flex items-center justify-between pt-2"
                initial={{ opacity: 0 }}
                animate={formInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <p className="text-sm text-muted-foreground font-inter">{requiredNote}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7, duration: 0.4 }}
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