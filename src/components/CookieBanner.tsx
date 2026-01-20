import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Button } from '@/components/ui/button';
import { Cookie, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const { showBanner, acceptAll, acceptNecessaryOnly } = useCookieConsent();

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 hidden sm:block">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Cookie-Einstellungen</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                Einige Cookies sind technisch notwendig, während andere uns helfen, die Website zu verbessern 
                und Ihnen personalisierte Inhalte anzuzeigen.{' '}
                <Link to="/datenschutz" className="text-primary hover:underline">
                  Mehr erfahren
                </Link>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="glow" onClick={acceptAll} className="flex-1 sm:flex-none">
                  Alle akzeptieren
                </Button>
                <Button variant="outline" onClick={acceptNecessaryOnly} className="flex-1 sm:flex-none">
                  Nur notwendige
                </Button>
                <Link to="/cookie-einstellungen">
                  <Button variant="ghost" className="w-full sm:w-auto gap-2">
                    <Settings className="w-4 h-4" />
                    Einstellungen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
