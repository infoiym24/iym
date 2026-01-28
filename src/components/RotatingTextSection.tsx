import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const RotatingTextSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const quotes = {
    de: [
      '"Die Website vom Bekannten war nett gemeint, aber gebracht hat sie nichts."',
      '"Mit dem Baukasten hab ich ewig rumprobiert – professionell sah\'s nicht aus."',
      '"Die eine Agentur sah ganz gut aus – aber einfach viel zu teuer."',
      '"Andere stehen bei Google oben – ich war nirgends zu sehen."',
      '"Website ändern – geht nicht und der, der es machen soll, ist nicht erreichbar."',
      '"Meine aktuelle Agentur ist einfach viel zu langsam und nie zu erreichen."',
    ],
    en: [
      '"The website from a friend was well-meant, but it didn\'t bring any results."',
      '"I spent forever on the website builder – it still didn\'t look professional."',
      '"One agency looked good – but way too expensive."',
      '"Others rank at the top on Google – I was nowhere to be found."',
      '"Can\'t change the website – and the person who should do it is unreachable."',
      '"My current agency is just too slow and never available."',
    ],
    ru: [
      '"Сайт от знакомого был с добрыми намерениями, но результата не принёс."',
      '"Я потратил кучу времени на конструктор – всё равно выглядело непрофессионально."',
      '"Одно агентство выглядело хорошо – но слишком дорого."',
      '"Другие в топе Google – а меня нигде не было видно."',
      '"Изменить сайт нельзя – а тот, кто должен это делать, недоступен."',
      '"Моё текущее агентство слишком медленное и никогда не на связи."',
    ],
  };

  const intro = {
    de: 'Weil wir immer wieder hörten:',
    en: 'Because we kept hearing:',
    ru: 'Потому что мы постоянно слышали:',
  };

  const currentQuotes = quotes[language] || quotes.de;
  const currentIntro = intro[language] || intro.de;

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentQuotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, currentQuotes.length]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, hsl(42 75% 50% / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Intro text */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {currentIntro}
          </motion.p>

          {/* Rotating quotes */}
          <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentIndex}
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gradient-gold font-bold px-4"
                initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, scale: 0.8, rotateX: 30 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                style={{
                  textShadow: '0 4px 30px rgba(212,175,55,0.3)',
                }}
              >
                {currentQuotes[currentIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Decorative dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {currentQuotes.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-muted-foreground/30'
                }`}
                animate={{
                  scale: index === currentIndex ? 1 : 0.8,
                }}
              />
            ))}
          </div>

          {/* Subtext */}
          <motion.p
            className="text-muted-foreground mt-10 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {language === 'de' && '...haben wir IYM gegründet.'}
            {language === 'en' && '...we founded IYM.'}
            {language === 'ru' && '...мы основали IYM.'}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default RotatingTextSection;
