'use client';
import { motion } from "framer-motion";

export default function HeroGlitch() {
    // Effet de texte qui défile en arrière-plan
  return (
    <div className="relative w-full overflow-hidden py-4 bg-void/50 border-y border-white/5 backdrop-blur-sm mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void z-10"></div>
        <div className="flex animate-marquee whitespace-nowrap font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-ashes/30">
            <span className="mx-4">Transparency Protocol Initialized //</span>
            <span className="mx-4 text-neonCyan/50">Live Execution Data //</span>
            <span className="mx-4">Futures Operations //</span>
            <span className="mx-4">Risk Defined //</span>
            <span className="mx-4">No Hiding //</span>
             <span className="mx-4">Transparency Protocol Initialized //</span>
            <span className="mx-4 text-neonCyan/50">Live Execution Data //</span>
        </div>
    </div>
  );
}