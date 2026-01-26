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
    'hero.description': 'Ihr zuverlässiger Partner für professionelle Dienstleistungen. Qualität, Vertrauen und Effizienz, alles aus einer Hand. Die meisten Services werden für Sachsen angeboten.',
    'hero.discover': 'Services entdecken',
    'hero.learn': 'Mehr erfahren',
    
    // Services Section
    'services.section.label': 'Was wir bieten',
    'services.section.title': 'Unsere',
    'services.section.titleHighlight': 'Services',
    'services.section.subtitle': 'Entdecken Sie unser breites Spektrum an professionellen Dienstleistungen. Klicken Sie auf einen Service, um mehr zu erfahren.',
    'services.page.label': 'Alle Services',
    'services.page.title': 'Unsere',
    'services.page.titleHighlight': 'Dienstleistungen',
    'services.page.subtitle': 'Entdecken Sie unser komplettes Angebot. Von Handwerk bis Marketing – wir sind Ihr Partner für alle Fälle, zu fairen Preisen.',
    
    // Service Items
    'service.marketing': 'Marketing & Webdesign',
    'service.marketing.desc': 'Social Media Marketing, Webdesign und digitale Präsenz für Ihr Unternehmen.',
    'service.handwerk': 'Handwerk & Renovierung',
    'service.handwerk.desc': 'Professionelle Handwerksarbeiten, Renovierungen, Bohren, Anbringen und mehr.',
    'service.transport': 'Transport',
    'service.transport.desc': 'Zuverlässiger Transportservice für alle Ihre Bedürfnisse.',
    'service.umzug': 'Umzugsservice',
    'service.umzug.desc': 'Stressfreier Umzug mit professioneller Unterstützung von A bis Z.',
    'service.installation': 'Installations & Reparaturservice',
    'service.installation.desc': 'Elektro-Kleinarbeiten, Türen & Fenster, Schlösser und Notfall-Reparaturen.',
    
    // About Section
    'about.section.label': 'Über IYM',
    'about.section.title': 'Ihr Partner für',
    'about.section.titleHighlight': 'alle Fälle',
    'about.section.description': 'IYM I\'m Your Man ist ein junges, engagiertes Team mit Erfahrung in verschiedensten Dienstleistungssektoren. Wir punkten mit Schnelligkeit, Innovation und Kompetenz und das alles zu fairen Preisen ohne versteckte Kosten. Wir scheuen uns nicht, unsere Hände dreckig zu machen!',
    'about.quote': 'Was auch immer Sie brauchen, ich bin Ihr Mann für den Job.',
    'about.stat.customers': 'Zufriedene Kunden',
    'about.stat.availability': 'Erreichbarkeit',
    'about.stat.experience': 'Jahre Erfahrung',
    'about.stat.prices': 'Faire Preise',
    'about.feature.1': 'Junges, engagiertes Team mit frischen Ideen',
    'about.feature.2': 'Faire und transparente Preisgestaltung',
    'about.feature.3': 'Erfahrung in verschiedensten Dienstleistungssektoren',
    'about.feature.4': 'Schnelligkeit, Innovation und Kompetenz',
    'about.feature.5': 'Persönliche Beratung ohne versteckte Kosten',
    'about.feature.6': 'Zufriedenheitsgarantie',
    
    // About Page
    'about.page.label': 'Über uns',
    'about.page.title': 'Wir sind',
    'about.page.subtitle': 'Ein junges, engagiertes Team mit Erfahrung in verschiedensten Dienstleistungssektoren. Wir punkten mit Schnelligkeit, Innovation und Kompetenz und das zu fairen Preisen.',
    'about.page.values.title': 'Was uns',
    'about.page.values.titleHighlight': 'auszeichnet',
    'about.page.values.subtitle': 'Wir scheuen uns nicht, unsere Hände dreckig zu machen. Für einen fairen Preis erhalten Sie Qualitätsarbeit mit Herzblut.',
    'about.value.speed': 'Schnelligkeit',
    'about.value.speed.desc': 'Wir reagieren schnell und setzen Ihre Projekte effizient um.',
    'about.value.innovation': 'Innovation',
    'about.value.innovation.desc': 'Moderne Lösungen und kreative Ansätze für jede Herausforderung.',
    'about.value.competence': 'Kompetenz',
    'about.value.competence.desc': 'Fundiertes Wissen aus verschiedensten Dienstleistungssektoren.',
    'about.value.fair': 'Faire Preise',
    'about.value.fair.desc': 'Transparente und ehrliche Preisgestaltung ohne versteckte Kosten.',
    'about.value.handson': 'Hands-On',
    'about.value.handson.desc': 'Wir scheuen uns nicht, unsere Hände dreckig zu machen.',
    'about.value.team': 'Teamgeist',
    'about.value.team.desc': 'Ein engagiertes Team, das gemeinsam für Ihren Erfolg arbeitet.',
    
    // FAQ
    'faq.label': 'FAQ',
    'faq.title': 'Häufig gestellte',
    'faq.titleHighlight': 'Fragen',
    'faq.subtitle': 'Hier finden Sie Antworten auf die wichtigsten Fragen rund um IYM.',
    'faq.more': 'Noch Fragen? Wir helfen Ihnen gerne weiter!',
    'faq.contact': 'Kontakt aufnehmen',
    'faq.q1': 'Welche Dienstleistungen bietet IYM an?',
    'faq.a1': 'Wir bieten ein breites Spektrum an Services: Marketing & Webdesign, Handwerk, Renovierung, Transport, Umzugsservice, Entrümpelung, Hausmeisterservice, Reparaturen, Gartenpflege, Hochdruckreinigung, Auto Service und Car Detailing. Egal was Sie brauchen, wir sind Ihr Mann für den Job!',
    'faq.q2': 'Wie schnell können Sie einen Auftrag übernehmen?',
    'faq.a2': 'Dank unserer flexiblen Struktur und unseres engagierten Teams können wir meist sehr kurzfristig reagieren. Kontaktieren Sie uns einfach und wir finden gemeinsam einen passenden Termin.',
    'faq.q3': 'Wie setzt sich der Preis zusammen?',
    'faq.a3': 'Wir arbeiten mit transparenten und fairen Preisen. Je nach Dienstleistung erstellen wir Ihnen ein individuelles Angebot basierend auf Aufwand, Material und Zeitbedarf. Es gibt keine versteckten Kosten!',
    'faq.q4': 'In welchen Regionen sind Sie tätig?',
    'faq.a4': 'Wir sind regional flexibel und können je nach Dienstleistung auch größere Entfernungen abdecken. Fragen Sie einfach nach – wir finden eine Lösung.',
    'faq.q5': 'Kann ich mehrere Services kombinieren?',
    'faq.a5': 'Absolut! Viele unserer Kunden nutzen mehrere Dienstleistungen gleichzeitig. Ob Umzug mit anschließender Renovierung oder Gartenpflege mit Hochdruckreinigung, wir koordinieren alles aus einer Hand.',
    'faq.q6': 'Was unterscheidet IYM von anderen Anbietern?',
    'faq.a6': 'Wir sind ein junges, dynamisches Team mit Erfahrung in verschiedensten Branchen. Das macht uns flexibel, innovativ und kompetent. Dazu kommen faire Preise und ein persönlicher Service, bei uns sind Sie keine Nummer!',
    
    // Contact Section
    'contact.section.label': 'Kontakt',
    'contact.section.title': 'Kontakt',
    'contact.section.titleHighlight': '',
    'contact.section.subtitle': 'Haben Sie Fragen oder benötigen Sie ein Angebot? Kontaktieren Sie uns, wir sind für Sie da.',
    'contact.phone': 'Telefon',
    'contact.email': 'E-Mail',
    'contact.address': 'Adresse',
    'contact.form.title': 'Nachricht senden',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Ihr Name',
    'contact.form.email.placeholder': 'ihre@email.de',
    'contact.form.phone.placeholder': '+49 123 456 789',
    'contact.form.message': 'Ihre Nachricht',
    'contact.form.message.placeholder': 'Wie können wir Ihnen helfen?',
    'contact.form.submit': 'Nachricht senden',
    'contact.map.loading': 'Karte wird geladen...',
    
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
    
    // Career
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
    'hero.description': 'Your reliable partner for professional services. Quality, trust, and efficiency, all from one source. Most services are offered for Saxony.',
    'hero.discover': 'Discover Services',
    'hero.learn': 'Learn More',
    
    // Services Section
    'services.section.label': 'What we offer',
    'services.section.title': 'Our',
    'services.section.titleHighlight': 'Services',
    'services.section.subtitle': 'Discover our wide range of professional services. Click on a service to learn more.',
    'services.page.label': 'All Services',
    'services.page.title': 'Our',
    'services.page.titleHighlight': 'Services',
    'services.page.subtitle': 'Discover our complete offer. From craftsmanship to marketing – we are your partner for all cases, at fair prices.',
    
    // Service Items
    'service.marketing': 'Marketing & Web Design',
    'service.marketing.desc': 'Social media marketing, web design and digital presence for your business.',
    'service.handwerk': 'Craftsmanship & Renovation',
    'service.handwerk.desc': 'Professional craftwork, renovations, drilling, mounting and more.',
    'service.transport': 'Transport',
    'service.transport.desc': 'Reliable transport service for all your needs.',
    'service.umzug': 'Moving Service',
    'service.umzug.desc': 'Stress-free moving with professional support from A to Z.',
    'service.installation': 'Installation & Repair Service',
    'service.installation.desc': 'Electrical work, doors & windows, locks and emergency repairs.',
    
    // About Section
    'about.section.label': 'About IYM',
    'about.section.title': 'Your Partner for',
    'about.section.titleHighlight': 'All Cases',
    'about.section.description': 'IYM I\'m Your Man is a young, dedicated team with experience in various service sectors. We score with speed, innovation and competence, all at fair prices without hidden costs. We are not afraid to get our hands dirty!',
    'about.quote': 'Whatever you need, I\'m your man for the job.',
    'about.stat.customers': 'Satisfied Customers',
    'about.stat.availability': 'Availability',
    'about.stat.experience': 'Years Experience',
    'about.stat.prices': 'Fair Prices',
    'about.feature.1': 'Young, dedicated team with fresh ideas',
    'about.feature.2': 'Fair and transparent pricing',
    'about.feature.3': 'Experience in various service sectors',
    'about.feature.4': 'Speed, innovation and competence',
    'about.feature.5': 'Personal advice without hidden costs',
    'about.feature.6': 'Satisfaction guarantee',
    
    // About Page
    'about.page.label': 'About Us',
    'about.page.title': 'We are',
    'about.page.subtitle': 'A young, dedicated team with experience in various service sectors. We score with speed, innovation and competence, all at fair prices.',
    'about.page.values.title': 'What makes us',
    'about.page.values.titleHighlight': 'special',
    'about.page.values.subtitle': 'We are not afraid to get our hands dirty. For a fair price you get quality work with passion.',
    'about.value.speed': 'Speed',
    'about.value.speed.desc': 'We respond quickly and implement your projects efficiently.',
    'about.value.innovation': 'Innovation',
    'about.value.innovation.desc': 'Modern solutions and creative approaches for every challenge.',
    'about.value.competence': 'Competence',
    'about.value.competence.desc': 'Sound knowledge from various service sectors.',
    'about.value.fair': 'Fair Prices',
    'about.value.fair.desc': 'Transparent and honest pricing without hidden costs.',
    'about.value.handson': 'Hands-On',
    'about.value.handson.desc': 'We are not afraid to get our hands dirty.',
    'about.value.team': 'Team Spirit',
    'about.value.team.desc': 'A dedicated team working together for your success.',
    
    // FAQ
    'faq.label': 'FAQ',
    'faq.title': 'Frequently Asked',
    'faq.titleHighlight': 'Questions',
    'faq.subtitle': 'Here you will find answers to the most important questions about IYM.',
    'faq.more': 'Still have questions? We are happy to help!',
    'faq.contact': 'Contact Us',
    'faq.q1': 'What services does IYM offer?',
    'faq.a1': 'We offer a wide range of services: Marketing & Web Design, Craftsmanship, Renovation, Transport, Moving Service, Clearance, Caretaker Service, Repairs, Garden Care, Pressure Washing, Auto Service and Car Detailing. Whatever you need, we are your man for the job!',
    'faq.q2': 'How quickly can you take on a job?',
    'faq.a2': 'Thanks to our flexible structure and dedicated team, we can usually respond very quickly. Just contact us and we will find a suitable appointment together.',
    'faq.q3': 'How is the price calculated?',
    'faq.a3': 'We work with transparent and fair prices. Depending on the service, we will create an individual offer based on effort, materials and time required. There are no hidden costs!',
    'faq.q4': 'In which regions do you operate?',
    'faq.a4': 'We are regionally flexible and can cover larger distances depending on the service. Just ask – we will find a solution.',
    'faq.q5': 'Can I combine multiple services?',
    'faq.a5': 'Absolutely! Many of our customers use multiple services at the same time. Whether moving with subsequent renovation or garden care with pressure washing, we coordinate everything from one source.',
    'faq.q6': 'What makes IYM different from other providers?',
    'faq.a6': 'We are a young, dynamic team with experience in various industries. This makes us flexible, innovative and competent. Add to that fair prices and personal service, you are not just a number with us!',
    
    // Contact Section
    'contact.section.label': 'Contact',
    'contact.section.title': 'Contact',
    'contact.section.titleHighlight': '',
    'contact.section.subtitle': 'Have questions or need a quote? Contact us, we are here for you.',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.form.title': 'Send Message',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Your Name',
    'contact.form.email.placeholder': 'your@email.com',
    'contact.form.phone.placeholder': '+49 123 456 789',
    'contact.form.message': 'Your Message',
    'contact.form.message.placeholder': 'How can we help you?',
    'contact.form.submit': 'Send Message',
    'contact.map.loading': 'Loading map...',
    
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
    
    // Career
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
    'hero.description': 'Ваш надежный партнер в сфере профессиональных услуг. Качество, доверие и эффективность, всё в одном месте. Большинство услуг предлагаются для Саксонии.',
    'hero.discover': 'Узнать услуги',
    'hero.learn': 'Узнать больше',
    
    // Services Section
    'services.section.label': 'Что мы предлагаем',
    'services.section.title': 'Наши',
    'services.section.titleHighlight': 'Услуги',
    'services.section.subtitle': 'Откройте для себя наш широкий спектр профессиональных услуг. Нажмите на услугу, чтобы узнать больше.',
    'services.page.label': 'Все услуги',
    'services.page.title': 'Наши',
    'services.page.titleHighlight': 'Услуги',
    'services.page.subtitle': 'Ознакомьтесь с нашим полным предложением. От ремесла до маркетинга – мы ваш партнер на все случаи жизни по справедливым ценам.',
    
    // Service Items
    'service.marketing': 'Маркетинг и веб-дизайн',
    'service.marketing.desc': 'Маркетинг в соцсетях, веб-дизайн и цифровое присутствие для вашего бизнеса.',
    'service.handwerk': 'Ремесло и ремонт',
    'service.handwerk.desc': 'Профессиональные ремесленные работы, ремонт, сверление, монтаж и многое другое.',
    'service.transport': 'Транспорт',
    'service.transport.desc': 'Надежные транспортные услуги для всех ваших потребностей.',
    'service.umzug': 'Переезд',
    'service.umzug.desc': 'Переезд без стресса с профессиональной поддержкой от А до Я.',
    'service.installation': 'Монтаж и ремонт',
    'service.installation.desc': 'Электроработы, двери и окна, замки и аварийный ремонт.',
    
    // About Section
    'about.section.label': 'О IYM',
    'about.section.title': 'Ваш партнер на',
    'about.section.titleHighlight': 'все случаи',
    'about.section.description': 'IYM I\'m Your Man это молодая, увлеченная команда с опытом в различных секторах услуг. Мы отличаемся скоростью, инновациями и компетентностью и всё это по справедливым ценам без скрытых расходов. Мы не боимся испачкать руки!',
    'about.quote': 'Что бы вам ни понадобилось, я ваш человек для этой работы.',
    'about.stat.customers': 'Довольных клиентов',
    'about.stat.availability': 'Доступность',
    'about.stat.experience': 'Лет опыта',
    'about.stat.prices': 'Честные цены',
    'about.feature.1': 'Молодая, увлеченная команда со свежими идеями',
    'about.feature.2': 'Честное и прозрачное ценообразование',
    'about.feature.3': 'Опыт в различных секторах услуг',
    'about.feature.4': 'Скорость, инновации и компетентность',
    'about.feature.5': 'Персональные консультации без скрытых расходов',
    'about.feature.6': 'Гарантия удовлетворенности',
    
    // About Page
    'about.page.label': 'О нас',
    'about.page.title': 'Мы',
    'about.page.subtitle': 'Молодая, увлеченная команда с опытом в различных секторах услуг. Мы отличаемся скоростью, инновациями и компетентностью по справедливым ценам.',
    'about.page.values.title': 'Что нас',
    'about.page.values.titleHighlight': 'отличает',
    'about.page.values.subtitle': 'Мы не боимся испачкать руки. За справедливую цену вы получаете качественную работу с душой.',
    'about.value.speed': 'Скорость',
    'about.value.speed.desc': 'Мы быстро реагируем и эффективно реализуем ваши проекты.',
    'about.value.innovation': 'Инновации',
    'about.value.innovation.desc': 'Современные решения и креативные подходы для любых задач.',
    'about.value.competence': 'Компетентность',
    'about.value.competence.desc': 'Глубокие знания из различных секторов услуг.',
    'about.value.fair': 'Честные цены',
    'about.value.fair.desc': 'Прозрачное и честное ценообразование без скрытых расходов.',
    'about.value.handson': 'Практичность',
    'about.value.handson.desc': 'Мы не боимся испачкать руки.',
    'about.value.team': 'Командный дух',
    'about.value.team.desc': 'Увлеченная команда, работающая вместе для вашего успеха.',
    
    // FAQ
    'faq.label': 'FAQ',
    'faq.title': 'Часто задаваемые',
    'faq.titleHighlight': 'вопросы',
    'faq.subtitle': 'Здесь вы найдете ответы на самые важные вопросы о IYM.',
    'faq.more': 'Остались вопросы? Мы с радостью поможем!',
    'faq.contact': 'Связаться с нами',
    'faq.q1': 'Какие услуги предлагает IYM?',
    'faq.a1': 'Мы предлагаем широкий спектр услуг: Маркетинг и веб-дизайн, Ремесло, Ремонт, Транспорт, Переезд, Вывоз мусора, Управдом, Ремонтные работы, Уход за садом, Мойка высокого давления, Авто сервис и Детейлинг. Что бы вам ни понадобилось, мы ваш человек для этой работы!',
    'faq.q2': 'Как быстро вы можете взяться за работу?',
    'faq.a2': 'Благодаря нашей гибкой структуре и увлеченной команде мы обычно можем реагировать очень быстро. Просто свяжитесь с нами, и мы вместе найдем подходящее время.',
    'faq.q3': 'Как формируется цена?',
    'faq.a3': 'Мы работаем с прозрачными и справедливыми ценами. В зависимости от услуги мы составим индивидуальное предложение на основе объема работ, материалов и времени. Никаких скрытых расходов!',
    'faq.q4': 'В каких регионах вы работаете?',
    'faq.a4': 'Мы географически гибки и можем охватывать большие расстояния в зависимости от услуги. Просто спросите – мы найдем решение.',
    'faq.q5': 'Можно ли комбинировать несколько услуг?',
    'faq.a5': 'Конечно! Многие наши клиенты используют несколько услуг одновременно. Будь то переезд с последующим ремонтом или уход за садом с мойкой, мы координируем всё из одного источника.',
    'faq.q6': 'Чем IYM отличается от других?',
    'faq.a6': 'Мы молодая, динамичная команда с опытом в различных отраслях. Это делает нас гибкими, инновационными и компетентными. Добавьте к этому справедливые цены и персональный сервис, у нас вы не просто номер!',
    
    // Contact Section
    // Contact Section
    'contact.section.label': 'Контакт',
    'contact.section.title': 'Контакт',
    'contact.section.titleHighlight': '',
    'contact.section.subtitle': 'Есть вопросы или нужно предложение? Свяжитесь с нами, мы здесь для вас.',
    'contact.phone': 'Телефон',
    'contact.email': 'Эл. почта',
    'contact.address': 'Адрес',
    'contact.form.title': 'Отправить сообщение',
    'contact.form.name': 'Имя',
    'contact.form.name.placeholder': 'Ваше имя',
    'contact.form.email.placeholder': 'ваша@почта.ru',
    'contact.form.phone.placeholder': '+49 123 456 789',
    'contact.form.message': 'Ваше сообщение',
    'contact.form.message.placeholder': 'Как мы можем вам помочь?',
    'contact.form.submit': 'Отправить сообщение',
    'contact.map.loading': 'Загрузка карты...',
    
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
    
    // Career
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
