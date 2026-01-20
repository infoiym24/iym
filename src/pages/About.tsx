import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, Zap, Target, Wallet, Wrench, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  const teamValues = [
    {
      icon: Zap,
      title: t('about.value.speed'),
      description: t('about.value.speed.desc')
    },
    {
      icon: Target,
      title: t('about.value.innovation'),
      description: t('about.value.innovation.desc')
    },
    {
      icon: Shield,
      title: t('about.value.competence'),
      description: t('about.value.competence.desc')
    },
    {
      icon: Wallet,
      title: t('about.value.fair'),
      description: t('about.value.fair.desc')
    },
    {
      icon: Wrench,
      title: t('about.value.handson'),
      description: t('about.value.handson.desc')
    },
    {
      icon: Users,
      title: t('about.value.team'),
      description: t('about.value.team.desc')
    }
  ];

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
                {t('about.page.label')}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6">
                {t('about.page.title')} <span className="text-gradient">IYM</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('about.page.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Team Values Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                {t('about.page.values.title')} <span className="text-gradient">{t('about.page.values.titleHighlight')}</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('about.page.values.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamValues.map((value, index) => (
                <div 
                  key={value.title}
                  className="glass rounded-2xl p-8 hover:bg-card/90 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-space-grotesk mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
                {t('faq.label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                {t('faq.title')} <span className="text-gradient">{t('faq.titleHighlight')}</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('faq.subtitle')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="glass rounded-xl px-6 border-none"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-semibold font-space-grotesk text-lg">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-6">
                {t('faq.more')}
              </p>
              <Button variant="hero" size="lg" onClick={handleContactClick}>
                {t('faq.contact')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
