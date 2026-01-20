import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Cookie, Shield, BarChart, Target, CheckCircle } from 'lucide-react';
import { useCookieConsent, CookieSettings as CookieSettingsType } from '@/contexts/CookieConsentContext';
import { toast } from 'sonner';

const CookieSettings = () => {
  const navigate = useNavigate();
  const { settings: savedSettings, updateSettings, acceptAll, acceptNecessaryOnly } = useCookieConsent();
  
  const [localSettings, setLocalSettings] = useState<CookieSettingsType>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Sync with saved settings on mount
  useEffect(() => {
    setLocalSettings(savedSettings);
  }, [savedSettings]);

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success('Cookie-Einstellungen gespeichert!', {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    });
    navigate('/');
  };

  const handleAcceptAll = () => {
    acceptAll();
    toast.success('Alle Cookies akzeptiert!', {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    });
    navigate('/');
  };

  const handleAcceptNecessary = () => {
    acceptNecessaryOnly();
    toast.success('Nur notwendige Cookies aktiviert!', {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    });
    navigate('/');
  };

  const cookieTypes = [
    {
      id: 'necessary' as const,
      icon: Shield,
      title: 'Notwendige Cookies',
      description: 'Diese Cookies sind für das Funktionieren der Website unbedingt erforderlich und können nicht deaktiviert werden. Sie speichern z.B. Ihre Cookie-Einstellungen.',
      required: true,
    },
    {
      id: 'functional' as const,
      icon: Cookie,
      title: 'Funktionale Cookies',
      description: 'Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung, wie z.B. das Speichern Ihrer Spracheinstellungen.',
      required: false,
    },
    {
      id: 'analytics' as const,
      icon: BarChart,
      title: 'Analyse Cookies',
      description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren (z.B. Google Analytics). Die Daten werden anonymisiert erhoben.',
      required: false,
    },
    {
      id: 'marketing' as const,
      icon: Target,
      title: 'Marketing Cookies',
      description: 'Diese Cookies werden verwendet, um Werbung relevanter für Sie und Ihre Interessen zu gestalten.',
      required: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-4">
              Cookie-Einstellungen
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Hier können Sie Ihre Cookie-Präferenzen verwalten. Wir respektieren Ihre Privatsphäre 
              und geben Ihnen die Kontrolle über Ihre Daten.
            </p>
            
            <div className="space-y-6">
              {cookieTypes.map((cookie) => (
                <div
                  key={cookie.id}
                  className="p-6 rounded-2xl bg-secondary/30 border border-border/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <cookie.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          {cookie.title}
                          {cookie.required && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                              Erforderlich
                            </span>
                          )}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {cookie.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={cookie.id}
                        checked={localSettings[cookie.id]}
                        onCheckedChange={(checked) =>
                          !cookie.required && setLocalSettings({ ...localSettings, [cookie.id]: checked })
                        }
                        disabled={cookie.required}
                      />
                      <Label htmlFor={cookie.id} className="sr-only">
                        {cookie.title}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button variant="glow" onClick={handleSave} className="flex-1">
                Einstellungen speichern
              </Button>
              <Button
                variant="outline"
                onClick={handleAcceptAll}
                className="flex-1"
              >
                Alle akzeptieren
              </Button>
              <Button
                variant="ghost"
                onClick={handleAcceptNecessary}
                className="flex-1"
              >
                Nur notwendige
              </Button>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-secondary/20 border border-border/30">
              <h3 className="text-lg font-semibold mb-4">Was sind Cookies?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Cookies sind kleine Textdateien, die auf Ihrem Computer oder Mobilgerät gespeichert werden, 
                wenn Sie eine Website besuchen. Sie werden häufig verwendet, um Websites effizienter zu 
                gestalten und Informationen an die Eigentümer der Website zu übermitteln.
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                <strong>Hinweis zu Google Analytics:</strong> Wenn Sie Analyse-Cookies aktivieren, wird 
                Google Analytics geladen, um anonymisierte Nutzungsstatistiken zu erfassen. Die IP-Adresse 
                wird dabei gekürzt (IP-Anonymisierung).
              </p>
              <p className="text-muted-foreground text-sm">
                Weitere Informationen finden Sie in unserer{' '}
                <a href="/datenschutz" className="text-primary hover:underline">
                  Datenschutzerklärung
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookieSettings;
