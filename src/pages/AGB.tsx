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
                <h2 className="text-2xl font-semibold text-foreground mb-4">§1 Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen IYM – I'm Your Man 
                  (nachfolgend "Anbieter") und dem Kunden (nachfolgend "Auftraggeber") über die Erbringung 
                  von Dienstleistungen.
                </p>
                <p>
                  Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter 
                  stimmt ihrer Geltung ausdrücklich schriftlich zu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§2 Vertragsschluss</h2>
                <p>
                  Die Darstellung der Dienstleistungen auf unserer Website stellt kein rechtlich bindendes 
                  Angebot, sondern eine Aufforderung zur Angebotsabgabe dar.
                </p>
                <p>
                  Der Vertrag kommt durch die Annahme des Angebots durch den Anbieter zustande. Die Annahme 
                  erfolgt durch schriftliche Auftragsbestätigung oder durch Beginn der Leistungserbringung.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§3 Preise und Zahlungsbedingungen</h2>
                <p>
                  Alle angegebenen Preise verstehen sich in Euro und enthalten die gesetzliche Mehrwertsteuer, 
                  sofern nicht anders angegeben.
                </p>
                <p>
                  Die Zahlung ist, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach 
                  Rechnungsstellung ohne Abzug fällig.
                </p>
                <p>
                  Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in Höhe von 5 Prozentpunkten 
                  über dem Basiszinssatz zu berechnen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§4 Leistungserbringung</h2>
                <p>
                  Der Anbieter verpflichtet sich, die vereinbarten Dienstleistungen sorgfältig und 
                  fachgerecht auszuführen.
                </p>
                <p>
                  Termine und Fristen sind nur verbindlich, wenn sie ausdrücklich als verbindlich 
                  vereinbart wurden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§5 Mitwirkungspflichten des Auftraggebers</h2>
                <p>
                  Der Auftraggeber ist verpflichtet, alle für die Durchführung des Auftrags erforderlichen 
                  Informationen rechtzeitig und vollständig zur Verfügung zu stellen.
                </p>
                <p>
                  Der Auftraggeber gewährt dem Anbieter Zugang zu den Räumlichkeiten, soweit dies für die 
                  Leistungserbringung erforderlich ist.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§6 Gewährleistung</h2>
                <p>
                  Der Anbieter haftet für Mängel nach den gesetzlichen Vorschriften. Mängelansprüche 
                  verjähren innerhalb von zwei Jahren ab Abnahme der Leistung.
                </p>
                <p>
                  Der Auftraggeber ist verpflichtet, offensichtliche Mängel unverzüglich, spätestens 
                  jedoch innerhalb von 14 Tagen nach Leistungserbringung, schriftlich anzuzeigen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§7 Haftung</h2>
                <p>
                  Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für 
                  Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
                </p>
                <p>
                  Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher 
                  Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§8 Stornierung</h2>
                <p>
                  Bei Stornierung durch den Auftraggeber fallen folgende Gebühren an:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bis 48 Stunden vor dem Termin: kostenlos</li>
                  <li>24-48 Stunden vor dem Termin: 25% des vereinbarten Preises</li>
                  <li>Weniger als 24 Stunden vor dem Termin: 50% des vereinbarten Preises</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">§9 Schlussbestimmungen</h2>
                <p>
                  Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                </p>
                <p>
                  Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der 
                  übrigen Bestimmungen unberührt.
                </p>
              </section>

              <p className="text-sm mt-12">
                Stand: November 2024
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
