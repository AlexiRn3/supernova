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
        background: "#0a0a0a",
        foreground: "#ffffff",
        accent: "#3b82f6", // Bleu électrique
        muted: "#1a1a1a",
        border: "#262626",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains)'],
      },
    },
  },
  plugins: [],
};
export default config;