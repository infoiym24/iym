import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-space-grotesk mb-8">
              Impressum
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8 text-foreground/90">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Angaben gemäß § 5 TMG</h2>
                <p>
                  Dmitriy Gazarov<br />
                  Hopfgartenstraße 10<br />
                  01307 Dresden<br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Kontakt</h2>
                <p>
                  Telefon: 0163 8630704<br />
                  E-Mail: <a href="mailto:gazarov2004@mail.ru" className="text-primary hover:underline">gazarov2004@mail.ru</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Umsatzsteuer</h2>
                <p>
                  Kleinunternehmer gemäß § 19 UStG, es wird keine Umsatzsteuer ausgewiesen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Haftung für Inhalte</h2>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach 
                  den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter 
                  jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen 
                  oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="mt-4">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                  Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
                  der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Haftung für Links</h2>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                  Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche 
                  Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="mt-4">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
                  einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir 
                  derartige Links umgehend entfernen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Urheberrecht</h2>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                  der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                  Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
                  nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="mt-4">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die 
                  Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. 
                  Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen 
                  entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
                  Inhalte umgehend entfernen.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impressum;
