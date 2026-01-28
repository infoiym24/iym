import { CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ThankYou = () => {
  const { language } = useLanguage();

  const content = {
    de: {
      title: 'Vielen Dank!',
      subtitle: 'Ihre Anfrage ist bei uns eingegangen',
      message: 'Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden. In der Regel antworten wir innerhalb von 24 Stunden.',
      backHome: 'Zurück zur Startseite',
      backServices: 'Unsere Leistungen ansehen',
    },
    en: {
      title: 'Thank You!',
      subtitle: 'Your request has been received',
      message: 'We have received your message and will get back to you as soon as possible. We usually respond within 24 hours.',
      backHome: 'Back to Home',
      backServices: 'View Our Services',
    },
    ru: {
      title: 'Спасибо!',
      subtitle: 'Ваш запрос получен',
      message: 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время. Обычно мы отвечаем в течение 24 часов.',
      backHome: 'На главную',
      backServices: 'Наши услуги',
    },
  };

  const t = content[language] || content.de;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1 
            }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-12 h-12 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-semibold text-gradient-gold mb-4"
          >
            {t.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl md:text-2xl text-foreground/90 mb-6"
          >
            {t.subtitle}
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="gold-divider max-w-[200px] mx-auto mb-8"
          />

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-foreground/70 mb-10 max-w-lg mx-auto"
          >
            {t.message}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="luxury"
              size="lg"
              asChild
              className="group"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                {t.backHome}
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <Link to="/services">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t.backServices}
              </Link>
            </Button>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
