import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Megaphone, Trash2, Car, Wrench, CheckCircle2, ArrowLeft, ExternalLink
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { TextReveal, PopReveal, SlideReveal, StaggerReveal, StaggerItem, GlowReveal, LetterReveal } from '@/components/ScrollReveal';

// Import generated images
import entruempelung1 from '@/assets/entruempelung-1.jpg';
import entruempelung2 from '@/assets/entruempelung-2.jpg';
import reparatur1 from '@/assets/reparatur-1.jpg';
import reparatur2 from '@/assets/reparatur-2.jpg';
import mechanicObd from '@/assets/mechanic-obd.jpg';
import parkingSensors from '@/assets/parking-sensors.jpg';
import audiA4 from '@/assets/audi-a4-2018.jpg';
import bmwF10 from '@/assets/bmw-f10.jpg';
import serviceDetailing from '@/assets/service-detailing.jpg';

interface ServiceInfo {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
  features: string[];
  featuresEn: string[];
  featuresRu: string[];
  extendedDescription: {
    de: string;
    en: string;
    ru: string;
  };
  images?: string[];
  references?: {
    title: string;
    url: string;
    image: string;
    description: {
      de: string;
      en: string;
      ru: string;
    };
  }[];
}

const serviceData: Record<string, ServiceInfo> = {
  'marketing': {
    titleKey: 'service.marketing',
    descKey: 'service.marketing.desc',
    icon: Megaphone,
    features: [
      'Social Media Marketing & Management',
      'Webdesign & Entwicklung',
      'SEO Optimierung',
      'Branding & Corporate Design',
      'Content-Erstellung',
      'Online-Werbung & Kampagnen'
    ],
    featuresEn: [
      'Social Media Marketing & Management',
      'Web Design & Development',
      'SEO Optimization',
      'Branding & Corporate Design',
      'Content Creation',
      'Online Advertising & Campaigns'
    ],
    featuresRu: [
      'Маркетинг и управление соцсетями',
      'Веб-дизайн и разработка',
      'SEO оптимизация',
      'Брендинг и корпоративный дизайн',
      'Создание контента',
      'Онлайн-реклама и кампании'
    ],
    extendedDescription: {
      de: `Wir bieten Ihnen professionelles Webdesign und digitales Marketing aus einer Hand. Von der Erstellung moderner, responsiver Websites bis hin zur kontinuierlichen Betreuung und Wartung – wir sind Ihr Partner für den digitalen Erfolg.

Unsere Leistungen umfassen:
• **Webdesign & Entwicklung** – Individuelle, moderne Websites die auf allen Geräten perfekt funktionieren
• **Website-Betreuung** – Regelmäßige Updates, Sicherheitspatches und technischer Support
• **Google Ads** – Zielgerichtete Werbekampagnen für maximale Reichweite und Conversions
• **Google Analytics** – Detaillierte Auswertungen und datenbasierte Optimierung Ihrer Online-Präsenz
• **SEO Optimierung** – Bessere Sichtbarkeit in Suchmaschinen für mehr organischen Traffic
• **Social Media Marketing** – Professionelle Betreuung Ihrer Social-Media-Kanäle`,
      en: `We offer professional web design and digital marketing from a single source. From creating modern, responsive websites to ongoing maintenance and support – we are your partner for digital success.

Our services include:
• **Web Design & Development** – Custom, modern websites that work perfectly on all devices
• **Website Maintenance** – Regular updates, security patches and technical support
• **Google Ads** – Targeted advertising campaigns for maximum reach and conversions
• **Google Analytics** – Detailed analysis and data-driven optimization of your online presence
• **SEO Optimization** – Better visibility in search engines for more organic traffic
• **Social Media Marketing** – Professional management of your social media channels`,
      ru: `Мы предлагаем профессиональный веб-дизайн и цифровой маркетинг из одних рук. От создания современных, адаптивных сайтов до постоянного обслуживания и поддержки – мы ваш партнёр для цифрового успеха.

Наши услуги включают:
• **Веб-дизайн и разработка** – Индивидуальные, современные сайты, идеально работающие на всех устройствах
• **Обслуживание сайтов** – Регулярные обновления, патчи безопасности и техническая поддержка
• **Google Ads** – Целевые рекламные кампании для максимального охвата и конверсий
• **Google Analytics** – Детальный анализ и оптимизация вашего онлайн-присутствия на основе данных
• **SEO оптимизация** – Лучшая видимость в поисковых системах для большего органического трафика
• **Маркетинг в соцсетях** – Профессиональное управление вашими каналами в социальных сетях`
    },
    references: [
      {
        title: 'Der Steuerberater',
        url: 'https://dersteuerberater.de/',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        description: {
          de: 'Professionelle Website für Steuerberatung mit modernem Design und klarer Benutzerführung.',
          en: 'Professional tax consulting website with modern design and clear user guidance.',
          ru: 'Профессиональный сайт налогового консультирования с современным дизайном и понятной навигацией.'
        }
      },
      {
        title: 'ViralUp',
        url: 'https://www.viralup.eu/',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop',
        description: {
          de: 'Dynamische Marketing-Agentur Website mit ansprechendem Layout und starker visueller Identität.',
          en: 'Dynamic marketing agency website with attractive layout and strong visual identity.',
          ru: 'Динамичный сайт маркетингового агентства с привлекательным дизайном и сильной визуальной идентичностью.'
        }
      }
    ]
  },
  'entruempelung': {
    titleKey: 'service.entruempelung',
    descKey: 'service.entruempelung.desc',
    icon: Trash2,
    features: [
      'Haushaltsauflösungen',
      'Kellerentrümpelung',
      'Dachbodenräumung',
      'Büroauflösungen',
      'Sperrmüllentsorgung',
      'Schnelle Abwicklung'
    ],
    featuresEn: [
      'Household Clearance',
      'Basement Clearing',
      'Attic Clearance',
      'Office Clearance',
      'Bulky Waste Disposal',
      'Quick Processing'
    ],
    featuresRu: [
      'Расчистка домов',
      'Уборка подвалов',
      'Уборка чердаков',
      'Ликвидация офисов',
      'Вывоз крупногабаритного мусора',
      'Быстрое выполнение'
    ],
    extendedDescription: {
      de: `Ob Keller, Dachboden, Wohnung oder Geschäftsräume – wir räumen professionell und zuverlässig. Unser erfahrenes Team kümmert sich um die komplette Entrümpelung, von der Planung bis zur fachgerechten Entsorgung.

Unsere Entrümpelungsleistungen:
• **Haushaltsauflösungen** – Komplette Räumung von Wohnungen und Häusern, auch bei Nachlassauflösungen
• **Kellerentrümpelung** – Befreiung Ihrer Kellerräume von angesammeltem Ballast
• **Dachbodenräumung** – Professionelle Räumung auch schwer zugänglicher Bereiche
• **Büro- & Gewerberäumungen** – Diskrete und effiziente Auflösung von Geschäftsräumen
• **Umweltgerechte Entsorgung** – Fachgerechte Trennung und Entsorgung aller Materialien
• **Besenreine Übergabe** – Wir hinterlassen Ihre Räume sauber und bezugsfertig`,
      en: `Whether basement, attic, apartment or commercial space – we clear professionally and reliably. Our experienced team handles complete clearance, from planning to proper disposal.

Our clearance services:
• **Household Clearance** – Complete clearance of apartments and houses, including estate clearances
• **Basement Clearing** – Freeing your basement from accumulated clutter
• **Attic Clearance** – Professional clearing of hard-to-access areas
• **Office & Commercial Clearance** – Discreet and efficient clearance of business premises
• **Eco-Friendly Disposal** – Proper separation and disposal of all materials
• **Clean Handover** – We leave your spaces clean and ready to move in`,
      ru: `Будь то подвал, чердак, квартира или коммерческое помещение – мы убираем профессионально и надёжно. Наша опытная команда занимается полной расчисткой, от планирования до правильной утилизации.

Наши услуги по расчистке:
• **Расчистка домов** – Полная уборка квартир и домов, включая наследственные дела
• **Уборка подвалов** – Освобождение подвальных помещений от накопившегося хлама
• **Уборка чердаков** – Профессиональная уборка труднодоступных мест
• **Офисная расчистка** – Дискретная и эффективная уборка коммерческих помещений
• **Экологичная утилизация** – Правильная сортировка и утилизация всех материалов
• **Чистая передача** – Мы оставляем помещения чистыми и готовыми к заселению`
    },
    images: [entruempelung1, entruempelung2]
  },
  'reparatur': {
    titleKey: 'service.reparatur',
    descKey: 'service.reparatur.desc',
    icon: Wrench,
    features: [
      'Haushaltsgeräte-Reparatur',
      'Elektro-Kleinarbeiten',
      'Sanitär-Reparaturen',
      'Türen & Fenster',
      'Schlösser & Beschläge',
      'Schnellservice'
    ],
    featuresEn: [
      'Appliance Repair',
      'Minor Electrical Work',
      'Plumbing Repairs',
      'Doors & Windows',
      'Locks & Fittings',
      'Fast Service'
    ],
    featuresRu: [
      'Ремонт бытовой техники',
      'Мелкие электроработы',
      'Сантехнический ремонт',
      'Двери и окна',
      'Замки и фурнитура',
      'Быстрый сервис'
    ],
    extendedDescription: {
      de: `Kleine Probleme können große Auswirkungen haben. Unser Reparaturservice bietet schnelle und zuverlässige Lösungen für alle alltäglichen Reparaturen in Haus und Wohnung.

Unser Reparaturservice umfasst:
• **Haushaltsgeräte** – Reparatur von Waschmaschinen, Trocknern, Geschirrspülern und mehr
• **Elektro-Kleinarbeiten** – Steckdosen, Schalter, Lampen und andere elektrische Kleinreparaturen
• **Sanitäranlagen** – Tropfende Wasserhähne, verstopfte Abflüsse, Toilettenreparaturen
• **Türen & Fenster** – Klemmen, Quietschen, Dichtungen austauschen, Einstellungen
• **Schlösser & Beschläge** – Schlossaustausch, Türgriffe, Scharniere und Möbelbeschläge
• **Notfall-Reparaturen** – Schnelle Hilfe bei dringenden Problemen`,
      en: `Small problems can have big effects. Our repair service offers fast and reliable solutions for all everyday repairs in house and apartment.

Our repair service includes:
• **Household Appliances** – Repair of washing machines, dryers, dishwashers and more
• **Minor Electrical Work** – Outlets, switches, lamps and other small electrical repairs
• **Plumbing** – Dripping faucets, clogged drains, toilet repairs
• **Doors & Windows** – Sticking, squeaking, seal replacement, adjustments
• **Locks & Fittings** – Lock replacement, door handles, hinges and furniture fittings
• **Emergency Repairs** – Quick help for urgent problems`,
      ru: `Маленькие проблемы могут иметь большие последствия. Наш ремонтный сервис предлагает быстрые и надёжные решения для всех повседневных ремонтов в доме и квартире.

Наш ремонтный сервис включает:
• **Бытовая техника** – Ремонт стиральных машин, сушилок, посудомоечных машин и многого другого
• **Мелкие электроработы** – Розетки, выключатели, светильники и другой мелкий электроремонт
• **Сантехника** – Капающие краны, забитые трубы, ремонт унитазов
• **Двери и окна** – Заедание, скрип, замена уплотнителей, регулировка
• **Замки и фурнитура** – Замена замков, дверных ручек, петель и мебельной фурнитуры
• **Аварийный ремонт** – Быстрая помощь при срочных проблемах`
    },
    images: [reparatur1, reparatur2]
  },
  'autoservice': {
    titleKey: 'service.auto',
    descKey: 'service.auto.desc',
    icon: Car,
    features: [
      'Mobiler Reifenwechsel',
      'Zentralverriegelung Einbau',
      'Einparkhilfe Installation',
      'Ölwechsel vor Ort',
      'Batterie-Service',
      'Professionelle Auto Diagnose'
    ],
    featuresEn: [
      'Mobile Tire Change',
      'Central Locking Installation',
      'Parking Sensor Installation',
      'On-site Oil Change',
      'Battery Service',
      'Professional Car Diagnostics'
    ],
    featuresRu: [
      'Мобильная замена шин',
      'Установка центрального замка',
      'Установка парктроников',
      'Замена масла на месте',
      'Обслуживание аккумулятора',
      'Профессиональная диагностика авто'
    ],
    extendedDescription: {
      de: `Unser mobiler Auto Service kommt zu Ihnen – bequem, zeitsparend und professionell. Ob Reifenwechsel, Nachrüstungen oder Wartungsarbeiten, wir erledigen alles vor Ort.

Unser Auto Service bietet:
• **Mobiler Reifenwechsel** – Sommer- oder Winterreifen, wir kommen zu Ihrem Standort
• **Zentralverriegelung** – Nachrüstung und Reparatur von Zentralverriegelungssystemen
• **Einparkhilfe** – Installation von PDC-Sensoren und Rückfahrkameras
• **Ölwechsel** – Professioneller Ölwechsel direkt bei Ihnen zu Hause oder am Arbeitsplatz
• **Batterie-Service** – Überprüfung, Austausch und Starthilfe
• **Professionelle Auto Diagnose** – Computergestützte Fehlerauslese mit modernen OBD-Diagnosegeräten`,
      en: `Our mobile car service comes to you – convenient, time-saving and professional. Whether tire change, retrofits or maintenance work, we do everything on-site.

Our car service offers:
• **Mobile Tire Change** – Summer or winter tires, we come to your location
• **Central Locking** – Retrofitting and repair of central locking systems
• **Parking Assist** – Installation of PDC sensors and rear cameras
• **Oil Change** – Professional oil change directly at your home or workplace
• **Battery Service** – Inspection, replacement and jump start
• **Professional Car Diagnostics** – Computer-based error reading with modern OBD diagnostic devices`,
      ru: `Наш мобильный автосервис приезжает к вам – удобно, экономит время и профессионально. Замена шин, дооснащение или техобслуживание – мы делаем всё на месте.

Наш автосервис предлагает:
• **Мобильная замена шин** – Летние или зимние шины, мы приезжаем к вам
• **Центральный замок** – Дооснащение и ремонт систем центрального замка
• **Парктроник** – Установка датчиков PDC и камер заднего вида
• **Замена масла** – Профессиональная замена масла прямо у вас дома или на работе
• **Обслуживание аккумулятора** – Проверка, замена и запуск
• **Профессиональная диагностика** – Компьютерная диагностика с современными OBD-устройствами`
    },
    images: [mechanicObd, parkingSensors]
  },
  'autofind': {
    titleKey: 'service.autofind',
    descKey: 'service.autofind.desc',
    icon: Car,
    features: [
      'Fahrzeugsuche nach Wunsch',
      'Preisverhandlung',
      'Fahrzeugprüfung',
      'Import-Service',
      'Übergabe & Anmeldung'
    ],
    featuresEn: [
      'Vehicle Search by Request',
      'Price Negotiation',
      'Vehicle Inspection',
      'Import Service',
      'Handover & Registration'
    ],
    featuresRu: [
      'Поиск автомобиля по заказу',
      'Переговоры о цене',
      'Проверка автомобиля',
      'Импорт-сервис',
      'Передача и регистрация'
    ],
    extendedDescription: {
      de: `Sie suchen Ihr Traumauto? Wir finden es für Sie! Unser Auto Find Service übernimmt die komplette Suche, Prüfung und Abwicklung – Sie lehnen sich entspannt zurück.

Unser Auto Find Service bietet:
• **Individuelle Suche** – Wir finden genau das Fahrzeug, das Ihren Wünschen entspricht
• **Professionelle Fahrzeugprüfung** – Technische Begutachtung, Unfallcheck und Zustandsbewertung
• **Preisverhandlung** – Wir verhandeln den besten Preis für Sie
• **Import-Service** – Fahrzeuge aus dem Ausland mit kompletter Abwicklung
• **Komplette Übergabe** – Von der Anmeldung bis zur Schlüsselübergabe`,
      en: `Looking for your dream car? We'll find it for you! Our Auto Find Service handles the complete search, inspection and processing – you just sit back and relax.

Our Auto Find Service offers:
• **Individual Search** – We find exactly the vehicle that matches your wishes
• **Professional Vehicle Inspection** – Technical assessment, accident check and condition evaluation
• **Price Negotiation** – We negotiate the best price for you
• **Import Service** – Vehicles from abroad with complete processing
• **Complete Handover** – From registration to key handover`,
      ru: `Ищете автомобиль мечты? Мы найдём его для вас! Наш сервис Auto Find берёт на себя полный поиск, проверку и оформление – вы просто расслабляетесь.

Наш сервис Auto Find предлагает:
• **Индивидуальный поиск** – Мы найдём именно тот автомобиль, который соответствует вашим пожеланиям
• **Профессиональная проверка** – Техническая оценка, проверка на ДТП и оценка состояния
• **Переговоры о цене** – Мы договоримся о лучшей цене для вас
• **Импорт-сервис** – Автомобили из-за рубежа с полным оформлением
• **Полная передача** – От регистрации до передачи ключей`
    },
    images: [audiA4, bmwF10]
  },
  'detailing': {
    titleKey: 'service.detailing',
    descKey: 'service.detailing.desc',
    icon: Car,
    features: [
      'Innenraumreinigung',
      'Außenpolitur',
      'Keramikversiegelung',
      'Lederaufbereitung',
      'Felgenreinigung',
      'Motorwäsche'
    ],
    featuresEn: [
      'Interior Cleaning',
      'Exterior Polish',
      'Ceramic Coating',
      'Leather Conditioning',
      'Wheel Cleaning',
      'Engine Wash'
    ],
    featuresRu: [
      'Чистка салона',
      'Полировка кузова',
      'Керамическое покрытие',
      'Обработка кожи',
      'Чистка дисков',
      'Мойка двигателя'
    ],
    extendedDescription: {
      de: `Professionelles Car Detailing für höchste Ansprüche. Wir verwandeln Ihr Fahrzeug in einen Neuzustand – innen wie außen, mit Liebe zum Detail und Premium-Produkten.

Unser Car Detailing Service:
• **Innenraumaufbereitung** – Tiefenreinigung von Sitzen, Teppichen, Armaturenbrett und allen Oberflächen
• **Außenpolitur** – Mehrfach-Politur zur Entfernung von Kratzern und Swirl-Marks
• **Keramikversiegelung** – Langanhaltender Schutz und Hochglanz für Ihren Lack
• **Lederaufbereitung** – Reinigung, Pflege und Imprägnierung von Ledersitzen
• **Felgenaufbereitung** – Professionelle Reinigung und optional Versiegelung
• **Motorwäsche** – Schonende Reinigung des Motorraums`,
      en: `Professional car detailing for the highest standards. We transform your vehicle to new condition – inside and out, with attention to detail and premium products.

Our Car Detailing Service:
• **Interior Detailing** – Deep cleaning of seats, carpets, dashboard and all surfaces
• **Exterior Polish** – Multi-stage polishing to remove scratches and swirl marks
• **Ceramic Coating** – Long-lasting protection and high gloss for your paint
• **Leather Conditioning** – Cleaning, care and waterproofing of leather seats
• **Wheel Detailing** – Professional cleaning and optional sealing
• **Engine Wash** – Gentle cleaning of the engine bay`,
      ru: `Профессиональный детейлинг для самых высоких требований. Мы преображаем ваш автомобиль до состояния нового – внутри и снаружи, с вниманием к деталям и премиальными продуктами.

Наш сервис Car Detailing:
• **Детейлинг салона** – Глубокая чистка сидений, ковров, приборной панели и всех поверхностей
• **Полировка кузова** – Многоступенчатая полировка для удаления царапин и голограмм
• **Керамическое покрытие** – Долговременная защита и блеск для вашего лака
• **Обработка кожи** – Чистка, уход и пропитка кожаных сидений
• **Детейлинг дисков** – Профессиональная чистка и опционально защитное покрытие
• **Мойка двигателя** – Бережная очистка моторного отсека`
    },
    images: [serviceDetailing]
  }
};

// Animated paragraph component for extended description
const AnimatedParagraph = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const words = text.split(' ');
  
  return (
    <motion.p
      ref={ref}
      className="text-muted-foreground mb-4 last:mb-0"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.02,
            delayChildren: delay,
          }
        }
      }}
    >
      {words.map((word, index) => {
        // Handle bold text
        const isBold = word.includes('**');
        const cleanWord = word.replace(/\*\*/g, '');
        const hasBullet = cleanWord.startsWith('•');
        
        return (
          <motion.span
            key={index}
            className={`inline-block mr-[0.25em] ${isBold ? 'text-foreground font-semibold' : ''}`}
            variants={{
              hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
              visible: { 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)',
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }
            }}
            dangerouslySetInnerHTML={{
              __html: hasBullet 
                ? `<span class="text-accent">•</span>${cleanWord.slice(1)}`
                : cleanWord
            }}
          />
        );
      })}
    </motion.p>
  );
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const service = serviceId ? serviceData[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {language === 'de' ? 'Service nicht gefunden' : 
             language === 'en' ? 'Service not found' : 
             'Услуга не найдена'}
          </h1>
          <Link to="/services" className="text-primary hover:underline">
            {language === 'de' ? 'Zurück zu allen Services' :
             language === 'en' ? 'Back to all services' :
             'Назад ко всем услугам'}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const features = language === 'en' ? service.featuresEn : 
                   language === 'ru' ? service.featuresRu : 
                   service.features;

  const includedLabel = language === 'de' ? 'Unsere Leistungen' :
                        language === 'en' ? 'Our Services' :
                        'Наши услуги';

  const formTitle = language === 'de' ? 'Anfrage senden' :
                    language === 'en' ? 'Send Inquiry' :
                    'Отправить запрос';

  const submitLabel = language === 'de' ? 'Anfrage absenden' :
                      language === 'en' ? 'Submit Inquiry' :
                      'Отправить запрос';

  const backLabel = language === 'de' ? 'Zurück zu Services' :
                    language === 'en' ? 'Back to Services' :
                    'Назад к услугам';

  const referencesLabel = language === 'de' ? 'Unsere Referenzen' :
                          language === 'en' ? 'Our References' :
                          'Наши работы';

  const visitSiteLabel = language === 'de' ? 'Website besuchen' :
                         language === 'en' ? 'Visit Website' :
                         'Посетить сайт';

  const impressionsLabel = language === 'de' ? 'Eindrücke unserer Arbeit' :
                           language === 'en' ? 'Impressions of Our Work' :
                           'Впечатления от нашей работы';

  const serviceSelectLabel = language === 'de' ? 'Service auswählen' :
                             language === 'en' ? 'Select Service' :
                             'Выбрать услугу';

  const otherServiceLabel = language === 'de' ? 'Andere Dienstleistung' :
                            language === 'en' ? 'Other Service' :
                            'Другая услуга';

  const serviceOptions = [
    { value: 'marketing', label: t('service.marketing') },
    { value: 'entruempelung', label: t('service.entruempelung') },
    { value: 'reparatur', label: t('service.reparatur') },
    { value: 'autoservice', label: t('service.auto') },
    { value: 'autofind', label: t('service.autofind') },
    { value: 'detailing', label: t('service.detailing') },
    { value: 'other', label: otherServiceLabel },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const extendedDesc = service.extendedDescription?.[language] || service.extendedDescription?.de;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <SlideReveal delay={0} direction="right">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLabel}
            </Link>
          </SlideReveal>

          {/* Service Header */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Service Info */}
            <div className="flex-1">
              <PopReveal delay={0.1} scale={0.5}>
                <motion.div 
                  className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-10 h-10 text-primary" />
                </motion.div>
              </PopReveal>
              
              <PopReveal delay={0.2} scale={0.6}>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
                  <GlowReveal className="text-gold" delay={0.4}>
                    {t(service.titleKey)}
                  </GlowReveal>
                </h1>
              </PopReveal>
              
              <TextReveal
                className="text-xl text-muted-foreground mb-8 max-w-2xl"
                delay={0.3}
                staggerDelay={0.03}
              >
                {t(service.descKey)}
              </TextReveal>

              {/* Extended Description */}
              {extendedDesc && (
                <SlideReveal delay={0.4}>
                  <div className="mb-10 glass-luxury rounded-2xl p-8 border border-accent/20">
                    <div className="prose prose-invert max-w-none">
                      {extendedDesc.split('\n').map((paragraph, index) => (
                        <AnimatedParagraph 
                          key={index} 
                          text={paragraph}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                  </div>
                </SlideReveal>
              )}

              {/* Features */}
              <div className="mb-8">
                <PopReveal delay={0.5} scale={0.8}>
                  <h2 className="text-2xl font-semibold font-display mb-6">{includedLabel}</h2>
                </PopReveal>
                <StaggerReveal className="grid sm:grid-cols-2 gap-4" staggerDelay={0.1}>
                  {features.map((feature, index) => (
                    <StaggerItem key={index}>
                      <motion.div 
                        className="flex items-center gap-3 p-4 glass-luxury rounded-xl border border-accent/10"
                        whileHover={{ scale: 1.02, borderColor: 'hsl(43 80% 55% / 0.3)' }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        </motion.div>
                        <span>{feature}</span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerReveal>
              </div>

              {/* Image Gallery for non-marketing services */}
              {service.images && service.images.length > 0 && (
                <div className="mb-8">
                  <PopReveal delay={0.6} scale={0.8}>
                    <h2 className="text-2xl font-semibold font-display mb-6">{impressionsLabel}</h2>
                  </PopReveal>
                  <StaggerReveal className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
                    {service.images.map((img, index) => (
                      <StaggerItem key={index}>
                        <motion.div
                          className="group block glass-luxury rounded-2xl overflow-hidden border border-accent/10"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                            <img
                              src={img}
                              alt={`${t(service.titleKey)} - ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerReveal>
                </div>
              )}

              {/* References Section for Marketing */}
              {service.references && service.references.length > 0 && (
                <div className="mb-8">
                  <PopReveal delay={0.6} scale={0.8}>
                    <h2 className="text-2xl font-semibold font-display mb-6">{referencesLabel}</h2>
                  </PopReveal>
                  <StaggerReveal className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
                    {service.references.map((ref, index) => (
                      <StaggerItem key={index}>
                        <motion.a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block glass-luxury rounded-2xl overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {/* Screenshot Preview */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                            <img
                              src={ref.image}
                              alt={ref.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                            
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="flex items-center gap-2 bg-background/90 px-4 py-2 rounded-full">
                                <ExternalLink className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{visitSiteLabel}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Info */}
                          <div className="p-6">
                            <h3 className="text-xl font-semibold font-display mb-2 group-hover:text-accent transition-colors">
                              {ref.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {ref.description[language] || ref.description.de}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                              <span>{ref.url.replace('https://', '').replace('www.', '').replace(/\/$/, '')}</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </motion.a>
                      </StaggerItem>
                    ))}
                  </StaggerReveal>
                </div>
              )}
            </div>

            {/* Right: Contact Form */}
            <div className="w-full lg:w-[450px] lg:sticky lg:top-32">
              <SlideReveal delay={0.3} direction="left">
                <motion.div 
                  className="glass-luxury rounded-2xl p-8 border border-accent/20"
                  whileHover={{ boxShadow: '0 0 40px hsl(43 80% 55% / 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold font-display mb-6">{formTitle}</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        {t('contact.form.name')} <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t('contact.form.name.placeholder')}
                        className="w-full px-4 py-3 bg-secondary/50 border-2 border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        {t('contact.email')} <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('contact.form.email.placeholder')}
                        className="w-full px-4 py-3 bg-secondary/50 border-2 border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        {t('contact.phone')} <span className="text-muted-foreground/60">({language === 'de' ? 'optional' : language === 'en' ? 'optional' : 'необязательно'})</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('contact.form.phone.placeholder')}
                        className="w-full px-4 py-3 bg-secondary/50 border-2 border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        {serviceSelectLabel}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary/50 border-2 border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none cursor-pointer"
                        required
                      >
                        <option value="">{serviceSelectLabel}</option>
                        {serviceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        {t('contact.form.message')} <span className="text-accent">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t('contact.form.message.placeholder')}
                        rows={4}
                        className="w-full px-4 py-3 bg-secondary/50 border-2 border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                        required
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-background font-medium py-3 px-6 rounded-xl transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitLabel}
                    </motion.button>
                  </form>
                </motion.div>
              </SlideReveal>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
