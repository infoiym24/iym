import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GoldenHeading, SlideUpReveal } from './animations/BlurReveal';
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
      {/* Smooth transition gradient from previous section */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-forest-dark pointer-events-none" />
      
      {/* Forest green background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-forest-dark" />
      
      {/* Animated floating particles/orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, hsl(42 75% 50% / 0.2) 0%, transparent 70%)',
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          style={{
            background: 'radial-gradient(circle, hsl(42 70% 45% / 0.18) 0%, transparent 70%)',
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full"
          animate={{
            x: [-10, 10, -10],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          style={{
            background: 'radial-gradient(circle, hsl(155 45% 35% / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>
      
      {/* Animated gold line across */}
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-px opacity-40"
        animate={{
          backgroundPosition: ['-200% 0', '200% 0'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(42 75% 50% / 0.5) 25%, hsl(42 80% 55% / 0.7) 50%, hsl(42 75% 50% / 0.5) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
      
      {/* Gold accent decorations */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <SlideUpReveal delay={0}>
            <span className="text-primary text-sm font-medium tracking-[0.25em] uppercase mb-4 block">
              {sectionLabel}
            </span>
          </SlideUpReveal>
          
          <GoldenHeading
            className="text-4xl md:text-5xl font-display font-semibold mb-6 justify-center"
            charDelay={0.025}
          >
            {sectionTitle}
          </GoldenHeading>
          
          <div className="gold-divider max-w-[200px] mx-auto mb-6" />
          
          <SlideUpReveal delay={0.3}>
            <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
              {sectionSubtitle}
            </p>
          </SlideUpReveal>
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto" ref={formRef}>
          <motion.div 
            className="rounded-2xl p-8 md:p-10 bg-card/90 backdrop-blur-xl border border-primary/20"
            initial={{ opacity: 0, y: 40 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-2xl font-semibold font-display mb-8 text-center text-gradient-gold">
              {t('contact.form.title')}
            </h3>
            <div className="gold-divider mb-8" />
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 15 }}
                animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <label className="block text-sm font-medium text-foreground/90 mb-2 tracking-wide">
                  {t('contact.form.name')} <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-card border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/50 text-foreground"
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
                    {t('contact.email')} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-card border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/50 text-foreground"
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
                    className="w-full px-4 py-3.5 rounded-lg bg-card border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none hover:border-primary/50 text-foreground"
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
                    className="w-full px-4 py-3.5 rounded-lg bg-card border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none appearance-none cursor-pointer hover:border-primary/50 text-foreground"
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
                  {t('contact.form.message')} <span className="text-primary">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-lg bg-card border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none resize-none hover:border-primary/50 text-foreground"
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
