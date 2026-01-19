import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Megaphone, Hammer, Truck, Package, Trash2, Car, 
  Home, Leaf, Building, Shield, PaintBucket, Wrench,
  CheckCircle2, ArrowLeft, ExternalLink
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceInfo {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
  features: string[];
  featuresEn: string[];
  featuresRu: string[];
  extendedDescription?: {
    de: string;
    en: string;
    ru: string;
  };
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
  'handwerk': {
    titleKey: 'service.handwerk',
    descKey: 'service.handwerk.desc',
    icon: Hammer,
    features: [
      'Renovierungsarbeiten',
      'Bohren & Montage',
      'Möbelaufbau',
      'Reparaturarbeiten',
      'Malerarbeiten',
      'Fliesenarbeiten'
    ],
    featuresEn: [
      'Renovation Work',
      'Drilling & Assembly',
      'Furniture Assembly',
      'Repair Work',
      'Painting',
      'Tiling'
    ],
    featuresRu: [
      'Ремонтные работы',
      'Сверление и монтаж',
      'Сборка мебели',
      'Ремонтные работы',
      'Малярные работы',
      'Плиточные работы'
    ]
  },
  'transport': {
    titleKey: 'service.transport',
    descKey: 'service.transport.desc',
    icon: Truck,
    features: [
      'Warentransport',
      'Möbeltransport',
      'Express-Lieferungen',
      'Kurierfahrten',
      'Abholung & Zustellung',
      'Deutschlandweite Transporte'
    ],
    featuresEn: [
      'Goods Transport',
      'Furniture Transport',
      'Express Deliveries',
      'Courier Services',
      'Pickup & Delivery',
      'Nationwide Transport'
    ],
    featuresRu: [
      'Перевозка грузов',
      'Перевозка мебели',
      'Экспресс-доставка',
      'Курьерские услуги',
      'Забор и доставка',
      'Перевозки по Германии'
    ]
  },
  'umzug': {
    titleKey: 'service.umzug',
    descKey: 'service.umzug.desc',
    icon: Package,
    features: [
      'Privatumzüge',
      'Firmenumzüge',
      'Möbelmontage',
      'Verpackungsservice',
      'Einlagerung',
      'Umzugsplanung'
    ],
    featuresEn: [
      'Private Moves',
      'Commercial Moves',
      'Furniture Assembly',
      'Packing Service',
      'Storage',
      'Moving Planning'
    ],
    featuresRu: [
      'Частные переезды',
      'Офисные переезды',
      'Сборка мебели',
      'Услуги упаковки',
      'Хранение',
      'Планирование переезда'
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
    ]
  },
  'autovermietung': {
    titleKey: 'service.autovermietung',
    descKey: 'service.autovermietung.desc',
    icon: Car,
    features: [
      'PKW-Vermietung',
      'Transporter-Vermietung',
      'Tages- & Wochenmiete',
      'Flexible Konditionen',
      'Versicherung inklusive',
      'Kilometerpaket nach Wahl'
    ],
    featuresEn: [
      'Car Rental',
      'Van Rental',
      'Daily & Weekly Rates',
      'Flexible Terms',
      'Insurance Included',
      'Mileage Packages'
    ],
    featuresRu: [
      'Аренда легковых автомобилей',
      'Аренда микроавтобусов',
      'Посуточная и понедельная аренда',
      'Гибкие условия',
      'Страховка включена',
      'Выбор пакета километров'
    ]
  },
  'reinigung': {
    titleKey: 'service.reinigung',
    descKey: 'service.reinigung.desc',
    icon: Home,
    features: [
      'Wohnungsreinigung',
      'Büroreinigung',
      'Grundreinigung',
      'Fensterreinigung',
      'Endreinigung',
      'Regelmäßige Reinigung'
    ],
    featuresEn: [
      'Apartment Cleaning',
      'Office Cleaning',
      'Deep Cleaning',
      'Window Cleaning',
      'Move-out Cleaning',
      'Regular Cleaning'
    ],
    featuresRu: [
      'Уборка квартир',
      'Уборка офисов',
      'Генеральная уборка',
      'Мытьё окон',
      'Уборка при выезде',
      'Регулярная уборка'
    ]
  },
  'garten': {
    titleKey: 'service.garten',
    descKey: 'service.garten.desc',
    icon: Leaf,
    features: [
      'Rasenpflege',
      'Heckenschnitt',
      'Baumfällung',
      'Gartengestaltung',
      'Unkrautentfernung',
      'Saisonale Pflege'
    ],
    featuresEn: [
      'Lawn Care',
      'Hedge Trimming',
      'Tree Felling',
      'Garden Design',
      'Weed Removal',
      'Seasonal Care'
    ],
    featuresRu: [
      'Уход за газоном',
      'Стрижка кустов',
      'Спил деревьев',
      'Ландшафтный дизайн',
      'Удаление сорняков',
      'Сезонный уход'
    ]
  },
  'montage': {
    titleKey: 'service.montage',
    descKey: 'service.montage.desc',
    icon: Building,
    features: [
      'Küchenmontage',
      'Möbelaufbau',
      'TV-Wandmontage',
      'Regalsysteme',
      'Lampeninstallation',
      'Spiegel & Bilder'
    ],
    featuresEn: [
      'Kitchen Assembly',
      'Furniture Assembly',
      'TV Wall Mounting',
      'Shelving Systems',
      'Lamp Installation',
      'Mirrors & Pictures'
    ],
    featuresRu: [
      'Сборка кухонь',
      'Сборка мебели',
      'Настенный монтаж ТВ',
      'Системы стеллажей',
      'Установка светильников',
      'Зеркала и картины'
    ]
  },
  'sicherheit': {
    titleKey: 'service.sicherheit',
    descKey: 'service.sicherheit.desc',
    icon: Shield,
    features: [
      'Schlossaustausch',
      'Sicherheitsschlösser',
      'Türsicherungen',
      'Schließanlagen',
      'Notfall-Service',
      'Beratung'
    ],
    featuresEn: [
      'Lock Replacement',
      'Security Locks',
      'Door Security',
      'Locking Systems',
      'Emergency Service',
      'Consultation'
    ],
    featuresRu: [
      'Замена замков',
      'Защитные замки',
      'Дверная безопасность',
      'Запирающие системы',
      'Аварийная служба',
      'Консультация'
    ]
  },
  'malerarbeiten': {
    titleKey: 'service.malerarbeiten',
    descKey: 'service.malerarbeiten.desc',
    icon: PaintBucket,
    features: [
      'Innenmalerei',
      'Außenanstrich',
      'Tapezieren',
      'Lackierarbeiten',
      'Fassadengestaltung',
      'Farbberatung'
    ],
    featuresEn: [
      'Interior Painting',
      'Exterior Painting',
      'Wallpapering',
      'Lacquer Work',
      'Facade Design',
      'Color Consultation'
    ],
    featuresRu: [
      'Внутренняя покраска',
      'Наружная покраска',
      'Поклейка обоев',
      'Лакировочные работы',
      'Дизайн фасадов',
      'Консультация по цвету'
    ]
  },
  'reparaturen': {
    titleKey: 'service.reparaturen',
    descKey: 'service.reparaturen.desc',
    icon: Wrench,
    features: [
      'Kleinreparaturen',
      'Haushaltsgeräte',
      'Sanitär-Notfälle',
      'Elektro-Kleinarbeiten',
      'Türen & Fenster',
      'Schnellservice'
    ],
    featuresEn: [
      'Small Repairs',
      'Household Appliances',
      'Plumbing Emergencies',
      'Minor Electrical Work',
      'Doors & Windows',
      'Fast Service'
    ],
    featuresRu: [
      'Мелкий ремонт',
      'Бытовая техника',
      'Сантехника (аварийно)',
      'Мелкие электроработы',
      'Двери и окна',
      'Быстрый сервис'
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
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

              {/* Extended Description for Marketing */}
              {extendedDesc && (
                <div className="mb-10 glass rounded-2xl p-8">
                  <div className="prose prose-invert max-w-none">
                    {extendedDesc.split('\n').map((paragraph, index) => (
                      <p 
                        key={index} 
                        className="text-muted-foreground mb-4 last:mb-0"
                        dangerouslySetInnerHTML={{ 
                          __html: paragraph
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                            .replace(/• /g, '<span class="text-accent">•</span> ')
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
            </div>

            {/* Right: Contact Form */}
            <div className="w-full lg:w-[450px] lg:sticky lg:top-32">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-semibold font-space-grotesk mb-6">{formTitle}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {t('contact.form.name')}
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
                      {t('contact.email')}
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
                      {t('contact.phone')}
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
                      {t('contact.form.message')}
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
                  
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  >
                    {submitLabel}
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
