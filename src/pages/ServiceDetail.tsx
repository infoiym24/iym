import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Megaphone, Wrench, CheckCircle2, ArrowLeft, ExternalLink, Loader2
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Helper function to safely render formatted text without XSS vulnerability
const sanitizeAndFormatText = (text: string): string => {
  // First apply formatting transformations
  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
    .replace(/• /g, '<span class="text-accent">•</span> ');
  
  // Then sanitize to prevent XSS attacks
  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ['strong', 'span', 'em', 'b', 'i'],
    ALLOWED_ATTR: ['class']
  });
};

// Import generated images
import reparatur1 from '@/assets/reparatur-1.jpg';
import reparatur2 from '@/assets/reparatur-2.jpg';

interface PricingPackage {
  name: { de: string; en: string; ru: string };
  price: string;
  features: { de: string[]; en: string[]; ru: string[] };
  highlighted?: boolean;
}

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
  pricingPackages?: PricingPackage[];
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
    ],
    pricingPackages: [
      {
        name: { de: 'Starter', en: 'Starter', ru: 'Стартер' },
        price: 'Ab 500€',
        features: {
          de: [
            'One-Page Website',
            'Responsives Design (Mobil & Desktop)',
            'Basis SEO-Optimierung',
            'SSL-Zertifikat inklusive',
            'DSGVO-Texte (Impressum, Datenschutz)',
            'DSGVO-konforme Formular-Umsetzung',
            'Cookie-Banner mit Einstellungen',
            'Domain + Hosting-Setup',
            'Performance-Optimierung (Ladezeit)'
          ],
          en: [
            'One-Page Website',
            'Responsive Design (Mobile & Desktop)',
            'Basic SEO Optimization',
            'SSL Certificate included',
            'GDPR Texts (Imprint, Privacy Policy)',
            'GDPR-compliant Form Implementation',
            'Cookie Banner with Settings',
            'Domain + Hosting Setup',
            'Performance Optimization (Load Time)'
          ],
          ru: [
            'Одностраничный сайт',
            'Адаптивный дизайн (мобильный и десктоп)',
            'Базовая SEO-оптимизация',
            'SSL-сертификат включён',
            'Тексты GDPR (импринт, политика конфиденциальности)',
            'GDPR-совместимые формы',
            'Баннер cookies с настройками',
            'Настройка домена и хостинга',
            'Оптимизация производительности'
          ]
        }
      },
      {
        name: { de: 'Business', en: 'Business', ru: 'Бизнес' },
        price: 'Ab 1.000€',
        highlighted: true,
        features: {
          de: [
            'Mehrseitige Website (bis 5 Seiten)',
            'Individuelles Design',
            'Kontaktformular mit E-Mail-Benachrichtigung',
            'Social Media Einbindung',
            'Erweiterte SEO-Optimierung',
            'DSGVO-konforme Umsetzung aller Formulare',
            'Cookie-Banner mit Einstellungen',
            'Google Analytics Setup',
            'Page Speed Optimierung',
            'Bild-Optimierung',
            '1 Monat Support'
          ],
          en: [
            'Multi-page Website (up to 5 pages)',
            'Custom Design',
            'Contact Form with Email Notifications',
            'Social Media Integration',
            'Advanced SEO Optimization',
            'GDPR-compliant Form Implementation',
            'Cookie Banner with Settings',
            'Google Analytics Setup',
            'Page Speed Optimization',
            'Image Optimization',
            '1 Month Support'
          ],
          ru: [
            'Многостраничный сайт (до 5 страниц)',
            'Индивидуальный дизайн',
            'Контактная форма с email-уведомлениями',
            'Интеграция соцсетей',
            'Расширенная SEO-оптимизация',
            'GDPR-совместимые формы',
            'Баннер cookies с настройками',
            'Google Analytics Setup',
            'Оптимизация скорости страницы',
            'Оптимизация изображений',
            '1 месяц поддержки'
          ]
        }
      },
      {
        name: { de: 'Premium', en: 'Premium', ru: 'Премиум' },
        price: 'Ab 2.500€',
        features: {
          de: [
            'Kompletter Online-Shop oder umfangreiche Website',
            'Terminbuchungssystem / Kalender',
            'Kundenverwaltung & Dashboard',
            'Payment-Integration (Stripe, PayPal)',
            'DSGVO-konformes Newsletter-System',
            
            'Mehrsprachigkeit',
            'Blog / News-Bereich',
            'Performance-Tuning & Ladezeit-Optimierung',
            'Backups & Sicherheits-Hardening',
            
            '3 Monate Support & Wartung'
          ],
          en: [
            'Complete Online Shop or Comprehensive Website',
            'Appointment Booking System / Calendar',
            'Customer Management & Dashboard',
            'Payment Integration (Stripe, PayPal)',
            'GDPR-compliant Newsletter System',
            
            'Multi-language Support',
            'Blog / News Section',
            'Performance Tuning & Load Time Optimization',
            'Backups & Security Hardening',
            
            '3 Months Support & Maintenance'
          ],
          ru: [
            'Полный интернет-магазин или комплексный сайт',
            'Система бронирования / календарь',
            'Управление клиентами и панель управления',
            'Интеграция оплаты (Stripe, PayPal)',
            'GDPR-совместимая система рассылки',
            
            'Многоязычность',
            'Блог / раздел новостей',
            'Оптимизация производительности и загрузки',
            'Резервные копии и усиление безопасности',
            
            '3 месяца поддержки и обслуживания'
          ]
        }
      }
    ]
  },
  'installation': {
    titleKey: 'service.installation',
    descKey: 'service.installation.desc',
    icon: Wrench,
    features: [
      'Elektro-Kleinarbeiten',
      'Türen & Fenster',
      'Schlösser & Beschläge',
      'Notfall-Reparaturen'
    ],
    featuresEn: [
      'Electrical Work',
      'Doors & Windows',
      'Locks & Fittings',
      'Emergency Repairs'
    ],
    featuresRu: [
      'Электроработы',
      'Двери и окна',
      'Замки и фурнитура',
      'Аварийный ремонт'
    ],
    extendedDescription: {
      de: `Unser Installations & Reparaturservice bietet schnelle und zuverlässige Lösungen für alle alltäglichen Reparaturen und Installationen in Haus und Wohnung.

Unsere Leistungen im Überblick:
• **Elektro-Kleinarbeiten** – Steckdosen, Schalter, Lampen und andere elektrische Kleinreparaturen
• **Türen & Fenster** – Klemmen, Quietschen, Dichtungen austauschen, Einstellungen
• **Schlösser & Beschläge** – Schlossaustausch, Türgriffe, Scharniere und Möbelbeschläge
• **Notfall-Reparaturen** – Schnelle Hilfe bei dringenden Problemen`,
      en: `Our Installation & Repair Service offers fast and reliable solutions for all everyday repairs and installations in house and apartment.

Our services at a glance:
• **Electrical Work** – Outlets, switches, lamps and other small electrical repairs
• **Doors & Windows** – Sticking, squeaking, seal replacement, adjustments
• **Locks & Fittings** – Lock replacement, door handles, hinges and furniture fittings
• **Emergency Repairs** – Quick help for urgent problems`,
      ru: `Наш сервис монтажа и ремонта предлагает быстрые и надёжные решения для всех повседневных ремонтов и установок в доме и квартире.

Наши услуги:
• **Электроработы** – Розетки, выключатели, светильники и другой мелкий электроремонт
• **Двери и окна** – Заедание, скрип, замена уплотнителей, регулировка
• **Замки и фурнитура** – Замена замков, дверных ручек, петель и мебельной фурнитуры
• **Аварийный ремонт** – Быстрая помощь при срочных проблемах`
    },
    images: [reparatur1, reparatur2]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    honeypot: '' // Hidden field to catch bots
  });

  // Scroll to top when component mounts or serviceId changes
  useEffect(() => {
    // Immediate scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    // Fallback with timeout for edge cases
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, 0);
    return () => clearTimeout(timeoutId);
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
    { value: 'installation', label: t('service.installation') },
    { value: 'other', label: otherServiceLabel },
  ];

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
          honeypot: formData.honeypot || undefined,
        },
      });

      if (error) {
        throw error;
      }

      // Redirect to thank you page
      navigate('/danke');
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

  const extendedDesc = service.extendedDescription?.[language] || service.extendedDescription?.de;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>

          {/* Service Header */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Service Info */}
            <div className="flex-1">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-6">
                <span className="text-gradient">{t(service.titleKey)}</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                {t(service.descKey)}
              </p>

              {/* Extended Description */}
              {extendedDesc && (
                <div className="mb-10 glass rounded-2xl p-8">
                  <div className="prose prose-invert max-w-none">
                    {extendedDesc.split('\n').map((paragraph, index) => (
                      <p 
                        key={index} 
                        className="text-muted-foreground mb-4 last:mb-0"
                        dangerouslySetInnerHTML={{ 
                          __html: sanitizeAndFormatText(paragraph)
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold font-space-grotesk mb-6">{includedLabel}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 glass rounded-xl animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Gallery for non-marketing services */}
              {service.images && service.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold font-space-grotesk mb-6">{impressionsLabel}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.images.map((img, index) => (
                      <div
                        key={index}
                        className="group block glass rounded-2xl overflow-hidden"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                          <img
                            src={img}
                            alt={`${t(service.titleKey)} - ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References Section for Marketing */}
              {service.references && service.references.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold font-space-grotesk mb-6">{referencesLabel}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.references.map((ref, index) => (
                      <a
                        key={index}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block glass rounded-2xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-300 transform hover:scale-[1.02]"
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
                          <h3 className="text-xl font-semibold font-space-grotesk mb-2 group-hover:text-primary transition-colors">
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
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Packages Section */}
              {service.pricingPackages && service.pricingPackages.length > 0 && (
                <div id="packages" className="mb-8 scroll-mt-32">
                  <h2 className="text-2xl font-semibold font-space-grotesk mb-6">
                    {language === 'de' ? 'Unsere Pakete' : language === 'en' ? 'Our Packages' : 'Наши пакеты'}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 pt-4">
                    {service.pricingPackages.map((pkg, index) => (
                      <div
                        key={index}
                        className={`relative glass rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                          pkg.highlighted 
                            ? 'ring-2 ring-primary shadow-lg shadow-primary/20' 
                            : 'hover:ring-1 hover:ring-primary/30'
                        }`}
                      >
                        {pkg.highlighted && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap z-10">
                            {language === 'de' ? 'Beliebt' : language === 'en' ? 'Popular' : 'Популярный'}
                          </div>
                        )}
                        
                        <h3 className="text-xl font-semibold font-space-grotesk mb-2">
                          {pkg.name[language] || pkg.name.de}
                        </h3>
                        
                        <p className="text-3xl font-bold text-primary mb-6">
                          {pkg.price}
                        </p>
                        
                        <ul className="space-y-3 flex-1" style={{ hyphens: 'none' }}>
                          {(pkg.features[language] || pkg.features.de).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                              <span style={{ hyphens: 'none' }}>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground text-center">
                    {language === 'de' 
                      ? 'Alle Preise verstehen sich als Startpreise. Der finale Preis richtet sich nach Ihren individuellen Anforderungen.' 
                      : language === 'en' 
                      ? 'All prices are starting prices. The final price depends on your individual requirements.'
                      : 'Все цены являются начальными. Итоговая цена зависит от ваших индивидуальных требований.'}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Contact Form */}
            <div className="w-full lg:w-[450px] lg:sticky lg:top-32">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-semibold font-space-grotesk mb-6">{formTitle}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {t('contact.form.name')} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.form.name.placeholder')}
                      className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {t('contact.email')} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.form.email.placeholder')}
                      className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
                      className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {serviceSelectLabel}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
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
                      {t('contact.form.message')} <span className="text-primary">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact.form.message.placeholder')}
                      rows={4}
                      className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      required
                    />
                  </div>
                  
                  {/* Honeypot field - hidden from users, catches bots */}
                  <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
                    <label htmlFor="website-detail">Website</label>
                    <input
                      type="text"
                      id="website-detail"
                      name="website-detail"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {language === 'de' ? 'Wird gesendet...' : language === 'en' ? 'Sending...' : 'Отправка...'}
                      </>
                    ) : (
                      submitLabel
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;