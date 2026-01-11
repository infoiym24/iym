import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { 
  Megaphone, 
  Hammer, 
  Truck, 
  PackageOpen, 
  Trash2, 
  Wrench, 
  PenTool, 
  Trees, 
  Droplets, 
  Car, 
  Search, 
  Sparkles,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

interface ServiceInfo {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
  features: string[];
  featuresEn: string[];
  featuresRu: string[];
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
    ]
  },
  'handwerk': {
    titleKey: 'service.handwerk',
    descKey: 'service.handwerk.desc',
    icon: Hammer,
    features: [
      'Renovierung & Umbau',
      'Bohren & Montage',
      'Malerarbeiten',
      'Bodenverlegung',
      'Möbelaufbau',
      'Kleinreparaturen'
    ],
    featuresEn: [
      'Renovation & Remodeling',
      'Drilling & Mounting',
      'Painting Work',
      'Flooring Installation',
      'Furniture Assembly',
      'Minor Repairs'
    ],
    featuresRu: [
      'Ремонт и перепланировка',
      'Сверление и монтаж',
      'Малярные работы',
      'Укладка полов',
      'Сборка мебели',
      'Мелкий ремонт'
    ]
  },
  'transport': {
    titleKey: 'service.transport',
    descKey: 'service.transport.desc',
    icon: Truck,
    features: [
      'Möbeltransport',
      'Warenzustellung',
      'Sperrgut-Transport',
      'Kurierfahrten',
      'Expresszustellung',
      'Fahrzeuge verschiedener Größen'
    ],
    featuresEn: [
      'Furniture Transport',
      'Goods Delivery',
      'Bulky Goods Transport',
      'Courier Services',
      'Express Delivery',
      'Vehicles of Various Sizes'
    ],
    featuresRu: [
      'Транспортировка мебели',
      'Доставка товаров',
      'Перевозка крупногабаритных грузов',
      'Курьерские услуги',
      'Экспресс-доставка',
      'Транспорт разных размеров'
    ]
  },
  'umzug': {
    titleKey: 'service.umzug',
    descKey: 'service.umzug.desc',
    icon: PackageOpen,
    features: [
      'Privatumzüge',
      'Firmenumzüge',
      'Ein- und Auspacken',
      'Möbelabbau & Aufbau',
      'Verpackungsmaterial',
      'Einlagerung möglich'
    ],
    featuresEn: [
      'Private Moves',
      'Company Moves',
      'Packing & Unpacking',
      'Furniture Disassembly & Assembly',
      'Packaging Materials',
      'Storage Available'
    ],
    featuresRu: [
      'Частные переезды',
      'Переезд компаний',
      'Упаковка и распаковка',
      'Разборка и сборка мебели',
      'Упаковочные материалы',
      'Возможно хранение'
    ]
  },
  'entruempelung': {
    titleKey: 'service.entruempelung',
    descKey: 'service.entruempelung.desc',
    icon: Trash2,
    features: [
      'Wohnungsentrümpelung',
      'Kellerentrümpelung',
      'Dachbodenentrümpelung',
      'Nachlassauflösung',
      'Gewerbeobjekte',
      'Fachgerechte Entsorgung'
    ],
    featuresEn: [
      'Apartment Clearance',
      'Basement Clearance',
      'Attic Clearance',
      'Estate Clearance',
      'Commercial Properties',
      'Professional Disposal'
    ],
    featuresRu: [
      'Расчистка квартир',
      'Расчистка подвалов',
      'Расчистка чердаков',
      'Ликвидация наследства',
      'Коммерческие объекты',
      'Профессиональная утилизация'
    ]
  },
  'hausmeister': {
    titleKey: 'service.hausmeister',
    descKey: 'service.hausmeister.desc',
    icon: Wrench,
    features: [
      'Gebäudebetreuung',
      'Winterdienst',
      'Treppenhausreinigung',
      'Kleinreparaturen',
      'Grünflächenpflege',
      'Regelmäßige Rundgänge'
    ],
    featuresEn: [
      'Building Maintenance',
      'Winter Service',
      'Stairwell Cleaning',
      'Minor Repairs',
      'Green Area Care',
      'Regular Inspections'
    ],
    featuresRu: [
      'Обслуживание здания',
      'Зимний сервис',
      'Уборка подъездов',
      'Мелкий ремонт',
      'Уход за зелеными насаждениями',
      'Регулярные обходы'
    ]
  },
  'reparatur': {
    titleKey: 'service.reparatur',
    descKey: 'service.reparatur.desc',
    icon: PenTool,
    features: [
      'Haushaltsgeräte',
      'Türen & Fenster',
      'Sanitär-Kleinreparaturen',
      'Elektro-Kleinreparaturen',
      'Schlösser & Beschläge',
      'Schneller Service'
    ],
    featuresEn: [
      'Household Appliances',
      'Doors & Windows',
      'Minor Plumbing Repairs',
      'Minor Electrical Repairs',
      'Locks & Fittings',
      'Fast Service'
    ],
    featuresRu: [
      'Бытовая техника',
      'Двери и окна',
      'Мелкий сантехнический ремонт',
      'Мелкий электроремонт',
      'Замки и фурнитура',
      'Быстрый сервис'
    ]
  },
  'gartenpflege': {
    titleKey: 'service.garten',
    descKey: 'service.garten.desc',
    icon: Trees,
    features: [
      'Rasenpflege & Mähen',
      'Heckenschnitt',
      'Baumschnitt',
      'Unkrautbekämpfung',
      'Beetpflege',
      'Saisonale Bepflanzung'
    ],
    featuresEn: [
      'Lawn Care & Mowing',
      'Hedge Trimming',
      'Tree Pruning',
      'Weed Control',
      'Flower Bed Care',
      'Seasonal Planting'
    ],
    featuresRu: [
      'Уход за газоном и стрижка',
      'Стрижка живой изгороди',
      'Обрезка деревьев',
      'Борьба с сорняками',
      'Уход за клумбами',
      'Сезонная посадка'
    ]
  },
  'hochdruckreinigung': {
    titleKey: 'service.hochdruck',
    descKey: 'service.hochdruck.desc',
    icon: Droplets,
    features: [
      'Terrassenreinigung',
      'Fassadenreinigung',
      'Einfahrten & Gehwege',
      'Poolbereiche',
      'Gartenmöbel',
      'Graffiti-Entfernung'
    ],
    featuresEn: [
      'Terrace Cleaning',
      'Facade Cleaning',
      'Driveways & Walkways',
      'Pool Areas',
      'Garden Furniture',
      'Graffiti Removal'
    ],
    featuresRu: [
      'Чистка террас',
      'Чистка фасадов',
      'Подъездные пути и дорожки',
      'Зоны бассейна',
      'Садовая мебель',
      'Удаление граффити'
    ]
  },
  'autoservice': {
    titleKey: 'service.auto',
    descKey: 'service.auto.desc',
    icon: Car,
    features: [
      'Mobiler Reifenwechsel',
      'Zentralverriegelung nachrüsten',
      'Einparkhilfe Einbau',
      'Batteriewechsel',
      'Glühlampen austauschen',
      'Vor-Ort-Service'
    ],
    featuresEn: [
      'Mobile Tire Change',
      'Central Locking Retrofit',
      'Parking Sensor Installation',
      'Battery Replacement',
      'Bulb Replacement',
      'On-Site Service'
    ],
    featuresRu: [
      'Мобильная замена шин',
      'Установка центрального замка',
      'Установка парктроника',
      'Замена аккумулятора',
      'Замена лампочек',
      'Выезд на место'
    ]
  },
  'autofind': {
    titleKey: 'service.autofind',
    descKey: 'service.autofind.desc',
    icon: Search,
    features: [
      'Fahrzeugsuche nach Wunsch',
      'Zustandsprüfung',
      'Preisverhandlung',
      'Kaufberatung',
      'Dokumentenprüfung',
      'Probefahrt-Begleitung'
    ],
    featuresEn: [
      'Vehicle Search by Request',
      'Condition Inspection',
      'Price Negotiation',
      'Purchase Consultation',
      'Document Review',
      'Test Drive Assistance'
    ],
    featuresRu: [
      'Поиск автомобиля по запросу',
      'Проверка состояния',
      'Переговоры о цене',
      'Консультация по покупке',
      'Проверка документов',
      'Сопровождение на тест-драйве'
    ]
  },
  'detailing': {
    titleKey: 'service.detailing',
    descKey: 'service.detailing.desc',
    icon: Sparkles,
    features: [
      'Außenreinigung & Politur',
      'Innenraumreinigung',
      'Lederpflege',
      'Geruchsentfernung',
      'Motorwäsche',
      'Keramikversiegelung'
    ],
    featuresEn: [
      'Exterior Cleaning & Polishing',
      'Interior Cleaning',
      'Leather Care',
      'Odor Removal',
      'Engine Wash',
      'Ceramic Coating'
    ],
    featuresRu: [
      'Внешняя мойка и полировка',
      'Чистка салона',
      'Уход за кожей',
      'Удаление запахов',
      'Мойка двигателя',
      'Керамическое покрытие'
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service nicht gefunden</h1>
            <Link to="/services">
              <Button variant="glow">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zu Services
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const features = language === 'en' ? service.featuresEn : language === 'ru' ? service.featuresRu : service.features;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const backLabel = language === 'en' ? 'Back to Services' : language === 'ru' ? 'Назад к услугам' : 'Zurück zu Services';
  const formTitle = language === 'en' ? 'Request a Quote' : language === 'ru' ? 'Запросить предложение' : 'Angebot anfragen';
  const includedLabel = language === 'en' ? 'What\'s Included' : language === 'ru' ? 'Что включено' : 'Das ist enthalten';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
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

                {/* Quick Contact */}
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="tel:+491234567890" 
                    className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+49 123 456 7890</span>
                  </a>
                  <a 
                    href="mailto:info@iym-service.de" 
                    className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-accent" />
                    <span>info@iym-service.de</span>
                  </a>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="w-full lg:w-[450px]">
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
                    
                    <Button type="submit" className="w-full" variant="glow" size="lg">
                      {t('contact.form.submit')}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
