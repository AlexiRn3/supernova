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
        background: "#030303", // Noir Profond
        surface: "#0F0F11",    // Gris Anthracite très sombre
        primary: "#3B82F6",    // Bleu Électrique
        accent: "#8B5CF6",     // Violet Néon
        success: "#10B981",    // Vert Signal
        danger: "#EF4444",     // Rouge Alerte
        text: "#EDEDED",
        subtle: "#52525B",     // Gris Zinc
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains)'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;