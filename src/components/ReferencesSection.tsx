import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Reference {
  url: string;
  domain: string;
  title: string;
  tag: string;
}

const REFERENCES: Reference[] = [
  {
    url: 'https://dersteuerberater.de',
    domain: 'dersteuerberater.de',
    title: 'Steuerberater — moderne Kanzlei-Website',
    tag: 'Business • One-Pager',
  },
  {
    url: 'https://viralup.eu',
    domain: 'viralup.eu',
    title: 'ViralUp — Marketing-Agentur',
    tag: 'Marketing • Landing',
  },
  {
    url: 'https://tennisschule-baseline.de',
    domain: 'tennisschule-baseline.de',
    title: 'Baseline — Tennisschule mit Buchung',
    tag: 'Premium • Terminbuchung',
  },
];

const shot = (url: string) =>
  `https://image.thum.io/get/width/1400/crop/900/noanimate/${url}`;

const ReferenceCard = ({
  reference,
  index,
  progress,
  total,
}: {
  reference: Reference;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) => {
  // Each card owns a slice of the scroll timeline.
  const slice = 1 / total;
  const start = index * slice;
  const mid = start + slice / 2;
  const end = start + slice;

  const scale = useTransform(progress, [start, mid, end], [0.55, 1, 0.55]);
  const opacity = useTransform(progress, [start, mid, end], [0.15, 1, 0.15]);
  const y = useTransform(progress, [start, mid, end], [80, 0, -80]);

  return (
    <motion.a
      href={reference.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ scale, opacity, y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-[min(92vw,1100px)] aspect-[16/10] rounded-2xl overflow-hidden luxury-card group">
        {/* Browser chrome */}
        <div className="absolute top-0 left-0 right-0 h-9 bg-forest-dark/90 backdrop-blur border-b border-primary/20 flex items-center gap-2 px-4 z-10">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />
          <span className="ml-4 text-xs font-mono text-muted-foreground truncate">
            {reference.domain}
          </span>
          <ExternalLink className="ml-auto w-3.5 h-3.5 text-primary/70" />
        </div>

        <img
          src={shot(reference.url)}
          alt={reference.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top pt-9 transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Overlay caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-forest-dark via-forest-dark/80 to-transparent">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary">
            {reference.tag}
          </span>
          <h3 className="text-xl md:text-2xl font-display text-gradient-gold mt-1">
            {reference.title}
          </h3>
        </div>
      </div>
    </motion.a>
  );
};

const ReferencesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="referenzen" ref={ref} className="relative" style={{ height: `${REFERENCES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Header */}
        <div className="absolute top-10 left-0 right-0 text-center z-20 pointer-events-none">
          <span className="text-primary text-sm font-medium tracking-[0.25em] uppercase mb-2 block">
            Referenzen
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-gradient-gold">
            Inspiration aus unseren Paketen
          </h2>
          <div className="gold-divider max-w-[160px] mx-auto mt-4" />
        </div>

        {/* Progress indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {REFERENCES.map((_, i) => {
            const slice = 1 / REFERENCES.length;
            const active = useTransform(scrollYProgress, [i * slice, i * slice + slice / 2, (i + 1) * slice], [0.3, 1, 0.3]);
            return (
              <motion.span
                key={i}
                style={{ opacity: active }}
                className="w-1.5 h-8 rounded-full bg-primary"
              />
            );
          })}
        </div>

        {/* Cards */}
        <div className="relative w-full h-full">
          {REFERENCES.map((r, i) => (
            <ReferenceCard
              key={r.url}
              reference={r}
              index={i}
              total={REFERENCES.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;
