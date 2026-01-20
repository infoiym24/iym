import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AGB = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8">
              Allgemeine Geschäftsbedingungen
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 1 Geltungsbereich</h2>
                <p>
                  (1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen IYM – I'm Your Man 
                  (Dmitriy Gazarov, Hopfgartenstraße 10, 01307 Dresden) und dem Kunden über Dienstleistungen 
                  im Bereich Haushalts- und Alltagshilfe sowie verwandte Tätigkeiten.
                </p>
                <p>
                  (2) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, IYM stimmt ihrer 
                  Geltung ausdrücklich schriftlich zu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 2 Vertragsgegenstand</h2>
                <p>
                  (1) IYM erbringt Dienstleistungen im Bereich Haushalts- und Alltagshilfe, einschließlich aber 
                  nicht beschränkt auf: Einkaufshilfe, Haushaltsarbeiten, Begleitservice, Besorgungen und 
                  individuelle Unterstützungsleistungen.
                </p>
                <p>
                  (2) Der genaue Leistungsumfang ergibt sich aus dem individuellen Angebot bzw. der Auftragsbestätigung.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 3 Vertragsschluss</h2>
                <p>
                  (1) Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich bindendes 
                  Angebot dar, sondern eine Aufforderung zur Abgabe eines Angebots.
                </p>
                <p>
                  (2) Der Vertrag kommt durch die schriftliche Auftragsbestätigung von IYM oder durch 
                  Beginn der Leistungserbringung zustande.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 4 Preise und Zahlungsbedingungen</h2>
                <p>
                  (1) Es gelten die im Angebot genannten Preise. Alle Preise verstehen sich netto und sind 
                  gemäß Kleinunternehmerregelung (§ 19 UStG) von der Umsatzsteuer befreit.
                </p>
                <p>
                  (2) Rechnungen sind innerhalb von 14 Tagen nach Erhalt ohne Abzug zahlbar, sofern nicht 
                  anders vereinbart.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 5 Mitwirkungspflichten des Kunden</h2>
                <p>
                  (1) Der Kunde stellt alle für die Leistungserbringung erforderlichen Informationen, Zugänge 
                  und Materialien rechtzeitig zur Verfügung.
                </p>
                <p>
                  (2) Der Kunde ist für die Richtigkeit und Vollständigkeit der bereitgestellten Informationen verantwortlich.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 6 Nutzungsrechte</h2>
                <p>
                  (1) IYM behält sich das Recht vor, anonymisierte Referenzen zu Werbezwecken zu verwenden, 
                  sofern der Kunde nicht widerspricht.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 7 Haftung</h2>
                <p>
                  (1) IYM haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.
                </p>
                <p>
                  (2) Bei leichter Fahrlässigkeit haftet IYM nur bei Verletzung wesentlicher Vertragspflichten 
                  und begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 8 Vertragslaufzeit und Kündigung</h2>
                <p>
                  (1) Die Vertragslaufzeit richtet sich nach der individuellen Vereinbarung.
                </p>
                <p>
                  (2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§ 9 Schlussbestimmungen</h2>
                <p>
                  (1) Es gilt das Recht der Bundesrepublik Deutschland.
                </p>
                <p>
                  (2) Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen 
                  Bestimmungen unberührt.
                </p>
              </section>

              <p className="text-sm mt-12">
                Stand: Januar 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AGB;
