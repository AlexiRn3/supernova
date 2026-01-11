import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF", // Fond blanc pur
        paper: "#000000",      // Texte noir profond
        subtle: "#E5E5E5",     // Gris très clair pour les lignes de grille
        accent: "#FF3B30",     // "Swiss Red" (Vibrant et signalétique)
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'], // Priorité à la lisibilité
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'huge': ['14vw', { lineHeight: '0.8', letterSpacing: '-0.04em' }], // Plus serré et plus grand
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))', // Grille 12 colonnes explicite
      },
      spacing: {
        'grid-gap': '1px', // Pour créer les lignes de grille via gap
      }
    },
  },
  plugins: [],
};
export default config;