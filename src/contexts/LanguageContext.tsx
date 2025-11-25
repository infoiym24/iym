import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'de' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navbar
    'nav.services': 'Services',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.request': 'Jetzt anfragen',
    
    // Hero
    'hero.tagline': 'Ihre Lösung für fast alle Dienstleistungen',
    'hero.description': 'Ihr zuverlässiger Partner für professionelle Dienstleistungen. Qualität, Vertrauen und Effizienz – alles aus einer Hand.',
    'hero.discover': 'Services entdecken',
    'hero.learn': 'Mehr erfahren',
    
    // Services
    'services.title': 'Unsere Services',
    'services.subtitle': 'Von Handwerk bis Marketing – wir bieten Ihnen ein breites Spektrum an professionellen Dienstleistungen',
    'services.handwerk': 'Handwerk',
    'services.handwerk.desc': 'Professionelle Handwerksarbeiten aller Art',
    'services.renovierung': 'Renovierung',
    'services.renovierung.desc': 'Komplette Renovierungen für Ihr Zuhause',
    'services.transport': 'Transport',
    'services.transport.desc': 'Zuverlässiger Transport für alle Güter',
    'services.umzug': 'Umzugsservice',
    'services.umzug.desc': 'Stressfreie Umzüge mit Vollservice',
    'services.entruempelung': 'Entrümplungsservice',
    'services.entruempelung.desc': 'Schnelle und saubere Entrümpelungen',
    'services.hausmeister': 'Hausmeisterservice',
    'services.hausmeister.desc': 'Zuverlässige Hausmeisterdienste',
    'services.reparatur': 'Reparaturservice',
    'services.reparatur.desc': 'Schnelle Reparaturen aller Art',
    'services.garten': 'Gartenpflege',
    'services.garten.desc': 'Professionelle Garten- und Grünpflege',
    'services.hochdruck': 'Hochdruckreinigen',
    'services.hochdruck.desc': 'Gründliche Reinigung mit Hochdrucktechnik',
    'services.marketing': 'Marketing & Webdesign',
    'services.marketing.desc': 'Digitale Lösungen für Ihr Business',
    'services.auto': 'Auto Service',
    'services.auto.desc': 'Mobiler Reifenwechsel und mehr',
    'services.autofind': 'Auto Find Service',
    'services.autofind.desc': 'Professionelle Fahrzeugsuche und Prüfung',
    'services.zentralverriegelung': 'Zentralverriegelung',
    'services.zentralverriegelung.desc': 'Einbau von Zentralverriegelungen',
    'services.einparkhilfe': 'Einparkhilfe',
    'services.einparkhilfe.desc': 'Installation von Einparksystemen',
    'services.detailing': 'Car Detailing',
    'services.detailing.desc': 'Professionelle Fahrzeugaufbereitung',
    
    // About
    'about.title': 'Über IYM',
    'about.subtitle': 'Ihr Partner für alle Fälle',
    'about.description': 'Wir sind ein junges, engagiertes Team mit umfangreicher Erfahrung in verschiedensten Dienstleistungssektoren. Unsere Stärken sind Schnelligkeit, Innovation und Kompetenz.',
    'about.philosophy': 'Wir scheuen uns nicht, unsere Hände dreckig zu machen – für einen fairen Preis.',
    'about.quality': 'Qualität',
    'about.quality.desc': 'Höchste Standards bei jeder Arbeit',
    'about.trust': 'Vertrauen',
    'about.trust.desc': 'Zuverlässigkeit, auf die Sie bauen können',
    'about.fair': 'Fairer Preis',
    'about.fair.desc': 'Transparente und faire Preisgestaltung',
    
    // Contact
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Nehmen Sie Kontakt mit uns auf',
    'contact.name': 'Name',
    'contact.email': 'E-Mail',
    'contact.message': 'Nachricht',
    'contact.send': 'Nachricht senden',
    
    // Footer
    'footer.company': 'Unternehmen',
    'footer.legal': 'Rechtliches',
    'footer.career': 'Karriere',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.cookies': 'Cookie-Einstellungen',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.made': 'Mit',
    'footer.created': 'erstellt',
    
    // Karriere
    'career.title': 'Werde Teil von',
    'career.subtitle': 'Wir suchen engagierte Menschen, die mit uns wachsen wollen. Bei uns erwartet dich ein junges, dynamisches Team und spannende Herausforderungen.',
    'career.why': 'Warum',
    'career.team': 'Junges Team',
    'career.team.desc': 'Arbeite mit motivierten Kollegen in einem dynamischen Umfeld',
    'career.growth': 'Wachstum',
    'career.growth.desc': 'Entwickle dich weiter mit spannenden Projekten und Weiterbildungen',
    'career.balance': 'Work-Life-Balance',
    'career.balance.desc': 'Flexible Arbeitszeiten und faire Vergütung',
    'career.variety': 'Vielfalt',
    'career.variety.desc': 'Abwechslungsreiche Aufgaben in verschiedenen Branchen',
    'career.apply': 'Jetzt bewerben',
    'career.apply.desc': 'Sende uns deine Bewerbung und werde Teil unseres Teams',
    'career.firstname': 'Vorname',
    'career.lastname': 'Nachname',
    'career.phone': 'Telefon',
    'career.position': 'Gewünschte Position',
    'career.position.placeholder': 'z.B. Handwerker, Fahrer, Marketing...',
    'career.aboutyou': 'Über dich',
    'career.aboutyou.placeholder': 'Erzähl uns etwas über dich, deine Erfahrungen und warum du bei IYM arbeiten möchtest...',
    'career.cv': 'Lebenslauf (optional)',
    'career.submit': 'Bewerbung absenden',
  },
  en: {
    // Navbar
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.request': 'Get in Touch',
    
    // Hero
    'hero.tagline': 'Your Solution for Almost All Services',
    'hero.description': 'Your reliable partner for professional services. Quality, trust, and efficiency – all from one source.',
    'hero.discover': 'Discover Services',
    'hero.learn': 'Learn More',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'From craftsmanship to marketing – we offer a wide range of professional services',
    'services.handwerk': 'Craftsmanship',
    'services.handwerk.desc': 'Professional craftwork of all kinds',
    'services.renovierung': 'Renovation',
    'services.renovierung.desc': 'Complete renovations for your home',
    'services.transport': 'Transport',
    'services.transport.desc': 'Reliable transport for all goods',
    'services.umzug': 'Moving Service',
    'services.umzug.desc': 'Stress-free moves with full service',
    'services.entruempelung': 'Clearance Service',
    'services.entruempelung.desc': 'Fast and clean clearances',
    'services.hausmeister': 'Caretaker Service',
    'services.hausmeister.desc': 'Reliable caretaker services',
    'services.reparatur': 'Repair Service',
    'services.reparatur.desc': 'Quick repairs of all kinds',
    'services.garten': 'Garden Care',
    'services.garten.desc': 'Professional garden and green care',
    'services.hochdruck': 'Pressure Washing',
    'services.hochdruck.desc': 'Thorough cleaning with pressure technology',
    'services.marketing': 'Marketing & Web Design',
    'services.marketing.desc': 'Digital solutions for your business',
    'services.auto': 'Auto Service',
    'services.auto.desc': 'Mobile tire change and more',
    'services.autofind': 'Auto Find Service',
    'services.autofind.desc': 'Professional vehicle search and inspection',
    'services.zentralverriegelung': 'Central Locking',
    'services.zentralverriegelung.desc': 'Installation of central locking systems',
    'services.einparkhilfe': 'Parking Assist',
    'services.einparkhilfe.desc': 'Installation of parking systems',
    'services.detailing': 'Car Detailing',
    'services.detailing.desc': 'Professional vehicle detailing',
    
    // About
    'about.title': 'About IYM',
    'about.subtitle': 'Your Partner for All Cases',
    'about.description': 'We are a young, dedicated team with extensive experience in various service sectors. Our strengths are speed, innovation, and competence.',
    'about.philosophy': 'We are not afraid to get our hands dirty – for a fair price.',
    'about.quality': 'Quality',
    'about.quality.desc': 'Highest standards in every job',
    'about.trust': 'Trust',
    'about.trust.desc': 'Reliability you can count on',
    'about.fair': 'Fair Price',
    'about.fair.desc': 'Transparent and fair pricing',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.career': 'Career',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.cookies': 'Cookie Settings',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with',
    'footer.created': '',
    
    // Karriere
    'career.title': 'Join',
    'career.subtitle': 'We are looking for dedicated people who want to grow with us. With us, you can expect a young, dynamic team and exciting challenges.',
    'career.why': 'Why',
    'career.team': 'Young Team',
    'career.team.desc': 'Work with motivated colleagues in a dynamic environment',
    'career.growth': 'Growth',
    'career.growth.desc': 'Develop yourself with exciting projects and training',
    'career.balance': 'Work-Life Balance',
    'career.balance.desc': 'Flexible working hours and fair compensation',
    'career.variety': 'Variety',
    'career.variety.desc': 'Diverse tasks in different industries',
    'career.apply': 'Apply Now',
    'career.apply.desc': 'Send us your application and become part of our team',
    'career.firstname': 'First Name',
    'career.lastname': 'Last Name',
    'career.phone': 'Phone',
    'career.position': 'Desired Position',
    'career.position.placeholder': 'e.g. Craftsman, Driver, Marketing...',
    'career.aboutyou': 'About You',
    'career.aboutyou.placeholder': 'Tell us about yourself, your experience and why you want to work at IYM...',
    'career.cv': 'Resume (optional)',
    'career.submit': 'Submit Application',
  },
  ru: {
    // Navbar
    'nav.services': 'Услуги',
    'nav.about': 'О нас',
    'nav.contact': 'Контакт',
    'nav.request': 'Связаться',
    
    // Hero
    'hero.tagline': 'Ваше решение для почти всех услуг',
    'hero.description': 'Ваш надежный партнер в сфере профессиональных услуг. Качество, доверие и эффективность – всё в одном месте.',
    'hero.discover': 'Узнать услуги',
    'hero.learn': 'Узнать больше',
    
    // Services
    'services.title': 'Наши услуги',
    'services.subtitle': 'От ремесла до маркетинга – мы предлагаем широкий спектр профессиональных услуг',
    'services.handwerk': 'Ремесло',
    'services.handwerk.desc': 'Профессиональные ремесленные работы',
    'services.renovierung': 'Ремонт',
    'services.renovierung.desc': 'Полный ремонт для вашего дома',
    'services.transport': 'Транспорт',
    'services.transport.desc': 'Надежная перевозка любых грузов',
    'services.umzug': 'Переезд',
    'services.umzug.desc': 'Переезд без стресса с полным сервисом',
    'services.entruempelung': 'Вывоз мусора',
    'services.entruempelung.desc': 'Быстрая и чистая уборка',
    'services.hausmeister': 'Управдом',
    'services.hausmeister.desc': 'Надежные услуги управляющего',
    'services.reparatur': 'Ремонт',
    'services.reparatur.desc': 'Быстрый ремонт любого вида',
    'services.garten': 'Уход за садом',
    'services.garten.desc': 'Профессиональный уход за садом',
    'services.hochdruck': 'Мойка высокого давления',
    'services.hochdruck.desc': 'Тщательная очистка под давлением',
    'services.marketing': 'Маркетинг и веб-дизайн',
    'services.marketing.desc': 'Цифровые решения для вашего бизнеса',
    'services.auto': 'Авто сервис',
    'services.auto.desc': 'Мобильная замена шин и многое другое',
    'services.autofind': 'Поиск авто',
    'services.autofind.desc': 'Профессиональный поиск и проверка авто',
    'services.zentralverriegelung': 'Центральный замок',
    'services.zentralverriegelung.desc': 'Установка центрального замка',
    'services.einparkhilfe': 'Парковочный помощник',
    'services.einparkhilfe.desc': 'Установка парковочных систем',
    'services.detailing': 'Детейлинг авто',
    'services.detailing.desc': 'Профессиональная подготовка автомобиля',
    
    // About
    'about.title': 'О IYM',
    'about.subtitle': 'Ваш партнер на все случаи',
    'about.description': 'Мы молодая, увлеченная команда с большим опытом в различных секторах услуг. Наши сильные стороны – скорость, инновации и компетентность.',
    'about.philosophy': 'Мы не боимся испачкать руки – за справедливую цену.',
    'about.quality': 'Качество',
    'about.quality.desc': 'Высочайшие стандарты в каждой работе',
    'about.trust': 'Доверие',
    'about.trust.desc': 'Надежность, на которую можно положиться',
    'about.fair': 'Честная цена',
    'about.fair.desc': 'Прозрачное и честное ценообразование',
    
    // Contact
    'contact.title': 'Контакт',
    'contact.subtitle': 'Свяжитесь с нами',
    'contact.name': 'Имя',
    'contact.email': 'Эл. почта',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить сообщение',
    
    // Footer
    'footer.company': 'Компания',
    'footer.legal': 'Правовая информация',
    'footer.career': 'Карьера',
    'footer.imprint': 'Импрессум',
    'footer.privacy': 'Конфиденциальность',
    'footer.terms': 'Условия',
    'footer.cookies': 'Настройки cookie',
    'footer.rights': 'Все права защищены.',
    'footer.made': 'Сделано с',
    'footer.created': '',
    
    // Karriere
    'career.title': 'Присоединяйся к',
    'career.subtitle': 'Мы ищем целеустремленных людей, которые хотят расти вместе с нами. У нас вас ждет молодая, динамичная команда и захватывающие задачи.',
    'career.why': 'Почему',
    'career.team': 'Молодая команда',
    'career.team.desc': 'Работайте с мотивированными коллегами в динамичной среде',
    'career.growth': 'Рост',
    'career.growth.desc': 'Развивайтесь с интересными проектами и обучением',
    'career.balance': 'Баланс работы и жизни',
    'career.balance.desc': 'Гибкий график и справедливая оплата',
    'career.variety': 'Разнообразие',
    'career.variety.desc': 'Разнообразные задачи в разных отраслях',
    'career.apply': 'Подать заявку',
    'career.apply.desc': 'Отправьте нам заявку и станьте частью нашей команды',
    'career.firstname': 'Имя',
    'career.lastname': 'Фамилия',
    'career.phone': 'Телефон',
    'career.position': 'Желаемая должность',
    'career.position.placeholder': 'напр. Мастер, Водитель, Маркетинг...',
    'career.aboutyou': 'О себе',
    'career.aboutyou.placeholder': 'Расскажите о себе, своем опыте и почему вы хотите работать в IYM...',
    'career.cv': 'Резюме (необязательно)',
    'career.submit': 'Отправить заявку',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'de';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
