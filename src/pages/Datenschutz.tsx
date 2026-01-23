import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8">
              Datenschutzerklärung
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8 text-foreground/90">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Allgemeine Hinweise</h2>
                <p>
                  Der Schutz Ihrer personenbezogenen Daten ist uns ein besonderes Anliegen. Wir behandeln 
                  Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                  Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p>
                  Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Verantwortliche Stelle</h2>
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p>
                  Dmitriy Gazarov<br />
                  Hopfgartenstraße 10<br />
                  01307 Dresden<br />
                  Deutschland
                </p>
                <p>
                  Telefon: 0163 8630704<br />
                  E-Mail: gazarov2004@mail.ru
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Hosting und Server-Log-Dateien</h2>
                <p>
                  Beim Besuch der Website verarbeitet der Hosting-Anbieter personenbezogene Daten, 
                  insbesondere sogenannte Server-Log-Dateien. Diese Daten sind technisch erforderlich, 
                  um die Website korrekt darzustellen und die Sicherheit des Systems zu gewährleisten.
                </p>
                <p>Verarbeitet werden können unter anderem:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="mt-4">
                  Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte 
                  Interesse liegt in der sicheren und stabilen Bereitstellung dieser Website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies</h2>
                <p>
                  Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem 
                  Endgerät gespeichert werden und bestimmte Informationen enthalten.
                </p>
                <p>
                  Beim ersten Besuch der Website können Sie über ein Cookie-Banner auswählen, welche 
                  Kategorien von Cookies Sie zulassen möchten. Ihre Auswahl können Sie jederzeit 
                  über die Seite „Cookie-Einstellungen" ändern oder widerrufen.
                </p>
                
                <h3 className="text-xl font-medium text-foreground mb-2 mt-6">Notwendige Cookies</h3>
                <p>
                  Notwendige Cookies sind für den Betrieb der Website technisch erforderlich und können 
                  nicht deaktiviert werden. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <h3 className="text-xl font-medium text-foreground mb-2 mt-6">Funktionale, Analyse- und Marketing-Cookies</h3>
                <p>
                  Diese Cookies werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt. 
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Kontaktaufnahme</h2>
                <p>
                  Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben einschließlich der 
                  übermittelten personenbezogenen Daten ausschließlich zur Bearbeitung Ihrer 
                  Anfrage verarbeitet.
                </p>
                <p>
                  Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO oder 
                  Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Ihre Rechte</h2>
                <p>Sie haben jederzeit das Recht:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten</li>
                  <li>Berichtigung unrichtiger Daten zu verlangen</li>
                  <li>Löschung Ihrer Daten zu verlangen</li>
                  <li>Einschränkung der Verarbeitung zu verlangen</li>
                  <li>Datenübertragbarkeit zu verlangen</li>
                  <li>Widerspruch gegen die Verarbeitung einzulegen</li>
                  <li>Eine erteilte Einwilligung jederzeit zu widerrufen</li>
                  <li>Sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Datensicherheit</h2>
                <p>
                  Diese Website nutzt eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte 
                  Verbindung erkennen Sie an der Adresszeile Ihres Browsers und dem Schloss-Symbol.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Änderung dieser Datenschutzerklärung</h2>
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an rechtliche 
                  oder technische Änderungen anzupassen.
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

export default Datenschutz;
