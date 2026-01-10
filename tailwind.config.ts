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
        bg: "#050505",       // Noir Absolu
        surface: "#0A0A0A",  // Noir Panneau
        text: "#E5E5E5",     // Blanc Cassé (plus doux)
        muted: "#525252",    // Gris Pierre
        accent: "#D4AF37",   // Or Métallique (subtil, pour le profit)
        loss: "#9F1239",     // Rouge Sang (profond, pour la perte)
        line: "#1F1F1F",     // Lignes de structure
      },
      fontFamily: {
        // On force l'utilisation de polices Serif système pour l'effet "Journal Financier"
        serif: ['Times New Roman', 'Times', 'serif'], 
        sans: ['var(--font-inter)', 'Arial', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
};
export default config;