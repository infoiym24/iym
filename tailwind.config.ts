import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'syne': ['Syne', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        glow: {
          primary: "hsl(var(--glow-primary))",
          accent: "hsl(var(--glow-accent))",
        },
        gold: {
          light: "hsl(45 80% 60%)",
          DEFAULT: "hsl(42 75% 50%)",
          dark: "hsl(38 70% 42%)",
        },
        forest: {
          light: "hsl(160 50% 35%)",
          DEFAULT: "hsl(160 50% 22%)",
          dark: "hsl(160 40% 12%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "blur-reveal": {
          "0%": { opacity: "0.3", filter: "blur(8px)", transform: "translateY(8px)" },
          "100%": { opacity: "1", filter: "blur(0px)", transform: "translateY(0)" },
        },
        "glow-reveal": {
          "0%": { opacity: "0.2", filter: "blur(4px) brightness(0.5)" },
          "50%": { filter: "blur(0px) brightness(1.15)" },
          "100%": { opacity: "1", filter: "blur(0px) brightness(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "blur-reveal": "blur-reveal 0.8s ease-out forwards",
        "glow-reveal": "glow-reveal 1s ease-out forwards",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-forest': 'linear-gradient(135deg, hsl(160 40% 10%) 0%, hsl(155 35% 15%) 50%, hsl(160 40% 10%) 100%)',
        'gradient-gold': 'linear-gradient(135deg, hsl(45 80% 55%) 0%, hsl(38 70% 42%) 100%)',
        'gradient-luxury': 'linear-gradient(160deg, hsl(160 20% 9%) 0%, hsl(160 18% 5%) 100%)',
        'gradient-forest-gold': 'linear-gradient(135deg, hsl(160 50% 30%) 0%, hsl(42 75% 50%) 50%, hsl(160 50% 30%) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;