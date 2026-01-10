'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trade } from './api/trades/route';

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  
  useEffect(() => {
    fetch('/api/trades').then(r => r.json()).then(setTrades);
  }, []);

  const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);

  return (
    <main className="min-h-screen bg-bg relative px-4 md:px-8 pt-32 pb-20 border-l border-r border-line mx-auto max-w-7xl">
      <div className="texture-overlay" />
      
      {/* Lignes de grille décoratives */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-8 max-w-7xl mx-auto border-r border-l border-line opacity-20">
        <div className="border-r border-line h-full w-1/3" />
        <div className="border-r border-line h-full w-1/3" />
      </div>

      {/* 1. Header Editorial */}
      <header className="relative z-10 mb-32 border-b border-line pb-12">
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[12vw] leading-[0.85] tracking-tight text-text"
          >
            LUCID<span className="italic font-light opacity-50">FLEX</span>
          </motion.h1>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mt-8 font-mono text-xs uppercase tracking-widest text-muted">
          <p className="max-w-xs">
            Volume 01 — 2026<br/>
            Proprietary Trading Log<br/>
            Strategy: MSNR Protocol
          </p>
          <div className="text-right">
             <p>Net Asset Value</p>
             <p className={`text-2xl font-serif mt-2 ${totalPnL >= 0 ? 'text-text' : 'text-loss'}`}>
               {totalPnL > 0 ? '+' : ''}{totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2 })} $
             </p>
          </div>
        </div>
      </header>

      {/* 2. Liste des Trades (Style Galerie) */}
      <section className="relative z-10">
        <div className="grid grid-cols-12 gap-4 border-b border-line pb-2 mb-8 text-muted font-mono text-[10px] uppercase tracking-widest">
          <div className="col-span-2">Date</div>
          <div className="col-span-4">Instrument</div>
          <div className="col-span-4">Pattern</div>
          <div className="col-span-2 text-right">Result</div>
        </div>

        <div className="space-y-0">
          {trades.map((trade, i) => (
            <motion.div 
              key={trade.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group grid grid-cols-12 gap-4 items-baseline py-6 border-b border-line hover:bg-surface transition-colors cursor-crosshair"
            >
              <div className="col-span-2 font-mono text-xs text-muted group-hover:text-text transition-colors">
                {trade.date}
              </div>
              <div className="col-span-4 font-serif text-3xl md:text-5xl italic group-hover:translate-x-4 transition-transform duration-500">
                {trade.symbol}
                <span className="text-[10px] font-sans font-normal ml-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-muted not-italic">
                  {trade.direction}
                </span>
              </div>
              <div className="col-span-4 flex items-center">
                <span className="text-xs text-muted uppercase tracking-widest border border-line px-2 py-1 rounded-full">
                  {trade.setup}
                </span>
              </div>
              <div className={`col-span-2 text-right font-mono text-lg ${
                trade.pnl > 0 ? 'text-accent' : 'text-loss'
              }`}>
                {trade.pnl > 0 ? '+' : ''}{trade.pnl}
              </div>
            </motion.div>
          ))}
          
          {trades.length === 0 && (
            <div className="py-20 text-center font-serif text-muted italic">
              Aucune donnée enregistrée pour le moment.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}