# Redesign: Hell, Clean, WebGL-3D (igloo.inc-Stil)

## Vision
Von aktuellem dunklen Gold/Forest-Luxus-Look zu **hellem Paper-&-Ink**: Off-White Hintergrund, tiefes Anthrazit für Text, Gold als sparsam eingesetzter Akzent. Große Weißflächen, ruhige Typografie, echte 3D-Objekte, die beim Scrollen mitreagieren.

## 1. Design-Tokens umbauen (index.css + tailwind.config.ts)

**Neue Palette (Paper & Ink)**
- Background: `#f5f3ee` (off-white paper)
- Surface/Card: `#ffffff` mit weichem Schatten
- Border/Muted: `#e8e4dd`
- Foreground: `#2d2d2d` (ink)
- Muted-Foreground: `#6b6b6b`
- Accent Gold: `#c9a84c` (nur für Akzente, CTAs, Icons – nicht mehr Grundton)
- Alle `--forest-*` Tokens entfernen bzw. neutralisieren

**Effekte**
- `glass`/`glass-luxury` → `paper-card` (Weiß, Border `#e8e4dd`, Schatten `0 20px 60px -20px rgba(0,0,0,0.08)`)
- Gold-Gradienten deutlich reduzieren, statt Text-Gradient meist einfarbig Ink
- Neuer Kartenstil ohne Innen-Glow, mit sanften Hover-Lift

**Body-Overlay** (der aktuelle dunkle Radial-Gradient in `body::after`) durch ein sehr subtiles helles Grain/Noise ersetzen.

## 2. WebGL-3D-Layer (React Three Fiber)

**Installieren**
- `three@0.160.0`
- `@react-three/fiber@^8.18`
- `@react-three/drei@^9.122.0`
- `@react-three/postprocessing` (für Bloom/DoF)

**Neue Komponenten**
```text
src/components/three/
  Scene.tsx              -- Canvas-Wrapper, Suspense, Lights, Environment
  HeroObject.tsx         -- großes glasiges Zentral-Objekt (Torus/Blob) mit MeshTransmissionMaterial, langsame Rotation
  FloatingShapes.tsx     -- 4-6 leichte Primitives (Sphere, Icosahedron), Float-Helper
  ScrollScene.tsx        -- ScrollControls, verknüpft Kamera-Position mit Scroll-Progress
  useScrollProgress.ts   -- exposiert normalisierten Scroll-Wert für andere Sektionen
```

**Wo eingesetzt**
- Home-Hero: Canvas hinter Logo/Text, transparent, `pointer-events-none`
- Services-Section: kleines schwebendes Objekt pro Karte (Icosahedron in Gold-Ton)
- Section-Übergänge: Kamera zoomt/rotiert beim Scrollen (Framer Motion `useScroll` → R3F)
- Fallback: `if (!navigator.gpu === false)`-artiger Fallback nicht nötig, aber `Suspense`-Loader + reduziertes Poster-Fallback bei `prefers-reduced-motion`

**Performance**
- `<Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>`
- `frameloop="demand"` wo möglich, sonst throttling per IntersectionObserver (nur rendern wenn im Viewport)

## 3. Smoothe Scroll-Übergänge

- `lenis` (`@studio-freight/lenis`) für butterweiches Scrolling global aktivieren
- Framer Motion `useScroll` + `useTransform` an Section-Grenzen für Fades/Y-Parallax
- Section-Trenner: keine harten Kanten, sondern lange Weißflächen (Padding `py-40`), Hintergrundfarbe bleibt durchgehend Paper

## 4. Betroffene Seiten (alle)

- `pages/Index.tsx` (Home) – Hero neu, alle Sections auf Paper
- `pages/Services.tsx` + `pages/ServiceDetail.tsx` – Karten neu, Pricing-Cards weiß mit dünnem Border
- `pages/About.tsx`, `Karriere.tsx` – Typo-getrieben, viel Whitespace
- `pages/AGB.tsx`, `Datenschutz.tsx`, `Impressum.tsx`, `CookieSettings.tsx`, `ThankYou.tsx`, `NotFound.tsx` – nur Farb-Tokens tauschen (kein 3D)
- `components/Navbar.tsx` – transparent-weißes Glas statt dunkles, Ink-Links
- `components/Footer.tsx` – heller
- `components/CookieBanner.tsx` – Paper-Style
- `components/ContactSection.tsx`, `AboutSection.tsx`, `ServicesSection.tsx`, `ProcessSection.tsx`, `SpecialOfferSection.tsx`, `GreenSeaSection.tsx`, `RotatingTextSection.tsx` – Farb-Tokens tauschen, Karten neu

Da die Komponenten meist über semantische Tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `glass`, `luxury-card`) stylen, geht der Großteil der Umstellung durch **Token-Änderung** in `index.css` + Tailwind config. Nur Hardcoded Gold/Forest-Klassen (z. B. `bg-forest/20`, `text-gradient-gold`) werden gezielt gesucht und ersetzt.

## 5. Typografie
- Headings bleiben Playfair Display, aber leichter (weight 400/500 statt 700), Farbe Ink statt Gold-Gradient
- Body bleibt DM Sans
- `tracking-tight` bei H1/H2, mehr `leading-relaxed` bei Body

## 6. Assets/Bilder
- Aktuelles Hero-Logo (`hero-logo.png`) auf hellem BG prüfen – wenn Kontrast nicht reicht, invertierte Variante generieren
- IYM-Logo in Navbar braucht ggf. dunkle Version

## Reihenfolge der Umsetzung
1. Pakete installieren (three, r3f, drei, postprocessing, lenis)
2. Design-Tokens flippen (index.css, tailwind.config.ts) – ganze Seite ist danach hell
3. Lenis + smooth scroll global
4. R3F Scene + HeroObject in Home-Hero
5. FloatingShapes in Services-Section, ScrollScene-Verknüpfung
6. Alle Hardcoded Dark-Klassen (`bg-forest*`, `text-gradient-forest`, Dark-Only Gradients) durchsuchen und tauschen
7. Karten- und Navbar-Feinschliff, Logo-Kontrast prüfen
8. Reduced-Motion / mobile Fallback für 3D-Canvas

## Nicht enthalten
- Keine inhaltlichen Änderungen (Texte, Preise, Struktur bleiben)
- Keine Änderungen an Edge Functions / Kontaktformular-Logik
- Kein neuer Content, nur visuelle Neugestaltung

## Hinweis zu Aufwand
Das ist ein großer visueller Umbau, der über mehrere Iterationen laufen wird. Ich schlage vor, in **zwei Wellen** zu bauen:
- **Welle 1** (dieser Turn): Tokens flippen + Home-Hero mit WebGL-Objekt + Lenis + Navbar. Du siehst sofort den neuen Look auf der Startseite.
- **Welle 2** (danach, auf dein Go): 3D in Services, Scroll-Kopplung, Feinschliff aller Unterseiten.

Passt das so, oder soll ich etwas anders priorisieren?
