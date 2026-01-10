'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trade } from './api/trades/route';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  
  useEffect(() => {
    fetch('/api/trades').then(r => r.json()).then(setTrades);
  }, []);

  return (
    <main className="min-h-screen bg-background relative pt-40 pb-32 px-4 md:px-8">
      <div className="noise-overlay" />
      
      {/* 1. HERO : TYPOGRAPHIE MASSIVE */}
      <section className="mb-32 border-b border-subtle pb-10">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-huge font-bold tracking-tighter text-paper leading-[0.85] uppercase"
        >
          Radical <br/>
          <span className="text-subtle ml-20">Transparency</span>
        </motion.h1>
        
        <div className="flex flex-col md:flex-row justify-between mt-12 font-mono text-sm text-paper/60 uppercase">
          <p className="max-w-xs">
            Documentation rigoureuse des transactions sur Futures - MNQ.
            Stratégie MSNR.
          </p>
          <p className="mt-4 md:mt-0 text-right">
            Obj. Funding <br/> <span className="text-accent">In Progress</span>
          </p>
        </div>
      </section>

      {/* 2. THE LIST (Style Magazine) */}
      <section>
        <div className="flex justify-between items-end mb-6 font-mono text-xs text-paper/40 uppercase border-b border-subtle pb-2">
          <span>Date / ID</span>
          <span>Performance</span>
        </div>

        <div className="flex flex-col">
          {trades.map((trade, i) => (
            <TradeItem key={trade.id} trade={trade} index={i} />
          ))}
          {trades.length === 0 && (
            <div className="py-20 text-center font-mono text-subtle uppercase">Initialisation des données...</div>
          )}
        </div>
      </section>
    </main>
  );
}

// Composant pour chaque ligne de trade (Micro-interactions)
function TradeItem({ trade, index }: { trade: Trade, index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-b border-subtle py-8 cursor-pointer transition-colors hover:bg-white/5"
    >
      <div className="flex justify-between items-baseline relative z-10 px-2">
        {/* Gauche: Symbol & Setup */}
        <div className="flex items-baseline gap-8 md:gap-20">
          <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            0{index + 1}
          </span>
          <h3 className="text-4xl md:text-6xl font-bold text-paper tracking-tighter group-hover:translate-x-4 transition-transform duration-500 ease-out">
            {trade.symbol}
          </h3>
          <span className="hidden md:inline-block font-mono text-xs text-paper/50 uppercase">
            [{trade.setup}]
          </span>
        </div>

        {/* Droite: PnL */}
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className={`text-2xl md:text-4xl font-mono ${trade.pnl > 0 ? 'text-paper' : 'text-subtle'}`}>
              {trade.pnl > 0 ? '+' : ''}{trade.pnl}$
            </span>
            <ArrowUpRight 
              className={`transition-transform duration-500 ${hovered ? 'rotate-45 text-accent' : 'rotate-0 text-subtle'}`} 
            />
          </div>
          <p className="font-mono text-[10px] text-paper/40 mt-1 uppercase group-hover:text-accent transition-colors">
            {trade.direction} / {trade.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}