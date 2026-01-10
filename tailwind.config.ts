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
        background: "#000000", // Noir pur
        foreground: "#ffffff", // Blanc pur
        neutral: "#1a1a1a",    // Gris très sombre pour les éléments secondaires
        accent: "#ff3333",     // Rouge Suisse International
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica', 'Arial', 'sans-serif'], // Le style Suisse repose sur du sans-serif propre
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'display': ['8rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }], // Pour les titres géants
        'huge': ['4rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
};
export default config;