import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: "SNV | Protocol",
  description: "Trading Ledger",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-background`}>
        <NavBar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}