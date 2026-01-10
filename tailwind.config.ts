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
        background: "#050505", // Noir presque total
        paper: "#EAEAEA",      // Blanc cassé (pour le contraste fort)
        accent: "#FF3300",     // Orange International (Awwwards classic)
        subtle: "#333333",     // Gris foncé pour les lignes
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'], // On utilisera une font massive
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'huge': ['12vw', { lineHeight: '0.9' }], // Titres gigantesques
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
      }
    },
  },
  plugins: [],
};
export default config;