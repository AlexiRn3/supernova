'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trade } from './api/trades/route';
import { ArrowUpRight, Plus } from 'lucide-react';

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  
  useEffect(() => {
    fetch('/api/trades').then(r => r.json()).then(setTrades);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-accent selection:text-white">
      
      {/* HEADER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-black">
        {/* Titre Massivement Suisse */}
        <div className="col-span-1 md:col-span-8 p-6 md:p-12 border-r border-black relative overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-huge font-bold tracking-tighter leading-[0.8] uppercase mt-20"
          >
            The<br/>Ledger
          </motion.h1>
        </div>

        {/* Panneau d'info latéral - Alignement fer à gauche */}
        <div className="col-span-1 md:col-span-4 p-6 flex flex-col justify-between font-mono text-sm leading-relaxed">
          <div className="space-y-4">
            <p>
              <span className="block text-accent font-bold">PROJET</span>
              SUPERNOVA / MSNR
            </p>
            <p>
              <span className="block text-accent font-bold">OBJECTIF</span>
              DOCUMENTATION RIGOUREUSE<br/>
              TRANSACTIONS FUTURES
            </p>
          </div>
          <div className="mt-20">
             <div className="w-4 h-4 bg-accent mb-2 animate-pulse"></div>
             <p className="uppercase">System Status: Active</p>
          </div>
        </div>
      </div>

      {/* DATA GRID HEADERS */}
      <div className="grid grid-cols-12 border-b border-black font-mono text-xs uppercase tracking-widest sticky top-0 bg-white z-10">
        <div className="col-span-2 p-4 border-r border-black">ID_REF</div>
        <div className="col-span-4 p-4 border-r border-black">Instrument</div>
        <div className="col-span-2 p-4 border-r border-black">Setup</div>
        <div className="col-span-2 p-4 border-r border-black">Date</div>
        <div className="col-span-2 p-4 text-right">Performance</div>
      </div>

      {/* DATA ROWS */}
      <div className="flex flex-col">
        {trades.map((trade, i) => (
          <TradeItem key={trade.id} trade={trade} index={i} />
        ))}
        {trades.length === 0 && (
          <div className="p-20 text-center font-mono text-sm border-b border-black">
            ACQUISITION DES DONNÉES...
          </div>
        )}
      </div>
      
      {/* FOOTER SIMPLE */}
      <footer className="p-4 font-mono text-xs uppercase border-b border-black flex justify-between">
        <span>© 2026 MSNR Academy</span>
        <span>Zurich — Montreal</span>
      </footer>
    </main>
  );
}

function TradeItem({ trade, index }: { trade: Trade, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group grid grid-cols-1 md:grid-cols-12 border-b border-subtle hover:bg-accent hover:text-white transition-colors duration-0 cursor-pointer"
    >
      {/* 01. ID */}
      <div className="col-span-2 p-4 font-mono text-xs border-r border-subtle group-hover:border-transparent flex items-center">
        {String(index + 1).padStart(3, '0')}
      </div>

      {/* 02. Instrument (Gros caractères) */}
      <div className="col-span-4 p-3 border-r border-subtle group-hover:border-transparent flex items-center">
        <span className="text-3xl font-bold tracking-tight">{trade.symbol}</span>
      </div>

      {/* 03. Setup */}
      <div className="col-span-2 p-4 font-mono text-xs border-r border-subtle group-hover:border-transparent flex items-center uppercase">
        {trade.setup}
      </div>

      {/* 04. Date */}
      <div className="col-span-2 p-4 font-mono text-xs border-r border-subtle group-hover:border-transparent flex items-center">
        {trade.date}
      </div>

      {/* 05. PnL */}
      <div className="col-span-2 p-4 flex items-center justify-end gap-2">
        <span className="font-mono text-lg">
          {trade.pnl > 0 ? '+' : ''}{trade.pnl}
        </span>
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}