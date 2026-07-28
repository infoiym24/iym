import { motion } from 'framer-motion';
import { ExternalLink, Globe, Target, Sparkles, TrendingUp } from 'lucide-react';
import viralup from '@/assets/references/viralup.jpg.asset.json';
import steuerberater from '@/assets/references/steuerberater.jpg.asset.json';
import iym24de from '@/assets/references/iym24de.jpg.asset.json';
import iym24com from '@/assets/references/iym24com.jpg.asset.json';

type Shot = {
  url: string;
  domain: string;
  image: string;
  tag: string;
  // Positioning (desktop) — percentages relative to the stage
  top: string;
  left: string;
  rotate: number;
  width: string;
  z: number;
  // Fly-in origin
  from: { x: number; y: number };
  delay: number;
};

const SHOTS: Shot[] = [
  {
    url: 'https://viralup.eu',
    domain: 'viralup.eu',
    image: viralup.url,
    tag: 'Marketing • Google Ads',
    top: '4%',
    left: '2%',
    rotate: -7,
    width: '46%',
    z: 20,
    from: { x: -260, y: -120 },
    delay: 0.1,
  },
  {
    url: 'https://dersteuerberater.de',
    domain: 'dersteuerberater.de',
    image: steuerberater.url,
    tag: 'Business • One-Pager',
    top: '30%',
    left: '30%',
    rotate: 3,
    width: '52%',
    z: 40,
    from: { x: 0, y: 260 },
    delay: 0.25,
  },
  {
    url: 'https://iym24.de',
    domain: 'iym24.de',
    image: iym24de.url,
    tag: 'Corporate • Multilingual',
    top: '2%',
    left: '52%',
    rotate: 6,
    width: '44%',
    z: 30,
    from: { x: 260, y: -140 },
    delay: 0.4,
  },
  {
    url: 'https://iym24.com',
    domain: 'iym24.com',
    image: iym24com.url,
    tag: 'Landing • Conversion',
    top: '52%',
    left: '6%',
    rotate: -4,
    width: '40%',
    z: 25,
    from: { x: -220, y: 200 },
    delay: 0.55,
  },
];

const BrowserFrame = ({ shot }: { shot: Shot }) => (
  <a
    href={shot.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block group"
    aria-label={shot.domain}
  >
    <div className="rounded-xl overflow-hidden luxury-card border border-primary/25 shadow-[0_30px_80px_-20px_hsl(0_0%_0%_/_0.75)] transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-0">
      <div className="h-7 md:h-8 bg-forest-dark/95 border-b border-primary/20 flex items-center gap-1.5 px-3">
        <span className="w-2 h-2 rounded-full bg-destructive/70" />
        <span className="w-2 h-2 rounded-full bg-primary/70" />
        <span className="w-2 h-2 rounded-full bg-primary/40" />
        <span className="ml-3 text-[10px] md:text-xs font-mono text-muted-foreground truncate">
          {shot.domain}
        </span>
        <ExternalLink className="ml-auto w-3 h-3 text-primary/70" />
      </div>
      <div className="relative aspect-[16/10] bg-forest-dark overflow-hidden">
        <img
          src={shot.image}
          alt={shot.domain}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-transparent" />
        <span className="absolute bottom-2 left-3 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-primary">
          {shot.tag}
        </span>
      </div>
    </div>
  </a>
);

const AgencyShowcase = () => {
  return (
    <section id="agentur" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-24 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-forest-light/15 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs md:text-sm tracking-[0.25em] uppercase text-primary"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Webdesign & Google Ads Agentur
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-[1.05] text-gradient-gold"
            >
              Webseiten die verkaufen.
              <br />
              Kampagnen die konvertieren.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Wir bauen moderne, schnelle Webseiten & Online-Shops und schalten
              performante Google Ads Kampagnen — messbar, DSGVO-konform und
              ohne versteckte Kosten. Handgemacht in Sachsen für Kunden in ganz DACH.
            </motion.p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
              }}
              className="mt-8 space-y-3"
            >
              {[
                { icon: Globe, label: 'Custom Webdesign & Webshops' },
                { icon: Target, label: 'Google Ads & Conversion Tracking' },
                { icon: TrendingUp, label: 'SEO & Performance Optimierung' },
              ].map(({ icon: Icon, label }) => (
                <motion.li
                  key={label}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
                  }}
                  className="flex items-center gap-3 text-foreground/90"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="font-medium">{label}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span>Ab 299€</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span>DSGVO-konform</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span>Made in Sachsen</span>
            </motion.div>
          </div>

          {/* Right: fly-in reference screenshots */}
          <div className="lg:col-span-7">
            {/* Desktop: layered stage */}
            <div className="relative hidden md:block w-full aspect-[4/3.2]">
              {SHOTS.map((shot) => (
                <motion.div
                  key={shot.domain}
                  className="absolute"
                  style={{
                    top: shot.top,
                    left: shot.left,
                    width: shot.width,
                    zIndex: shot.z,
                  }}
                  initial={{
                    opacity: 0,
                    x: shot.from.x,
                    y: shot.from.y,
                    rotate: shot.rotate * 3,
                    scale: 0.6,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: shot.rotate,
                    scale: 1,
                  }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{
                    duration: 0.9,
                    delay: shot.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 60 }}
                >
                  <BrowserFrame shot={shot} />
                </motion.div>
              ))}
            </div>

            {/* Mobile: simple stack */}
            <div className="md:hidden space-y-6">
              {SHOTS.map((shot, i) => (
                <motion.div
                  key={shot.domain}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <BrowserFrame shot={shot} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyShowcase;
