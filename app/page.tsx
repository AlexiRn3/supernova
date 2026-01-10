'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trade } from '@/lib/types';
import StatsCard from '@/components/StatsCard';
import TradeList from '@/components/TradeList';
import { ArrowDownRight } from 'lucide-react';

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    fetch('/api/trades').then(res => res.json()).then(setTrades);
  }, []);

  const totalPnL = trades.reduce((acc, trade) => acc + trade.pnl, 0);

  return (
    <main className="min-h-screen pb-40">
      
      {/* 1. HERO SECTION - Massive Typography */}
      <section className="pt-32 pb-20 px-6 md:px-12 border-b border-neutral">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display font-bold tracking-tighter uppercase break-words"
            >
              Super<br/><span className="text-accent">Nova</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end items-start">
             <div className="mb-8 max-w-xs">
                <p className="text-xl leading-tight font-medium">
                  Journal de trading algorithmique & analyse de performance en temps réel.
                </p>
             </div>
             <div className="w-full border-t border-white pt-4 flex justify-between items-end">
                <span className="text-sm font-mono text-gray-500 uppercase">Status</span>
                <span className="text-sm font-mono uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Live Feed
                </span>
             </div>
          </div>
        </div>
      </section>

      {/* 2. DATA GRID - Asymmetric Layout */}
      <section className="px-6 md:px-12 border-b border-neutral">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral">
            
            {/* KPI 1 - Le plus important */}
            <div className="py-12 md:pr-12">
              <StatsCard title="Net Profit" value={`${totalPnL > 0 ? '+' : ''}${totalPnL}`} isCurrency />
            </div>

            {/* KPI 2 */}
            <div className="py-12 md:px-12">
               <StatsCard title="Total Executions" value={trades.length.toString()} />
            </div>
            
            {/* KPI 3 */}
            <div className="py-12 md:px-12">
               <StatsCard title="Win Rate" value="68.4" sub="%" />
            </div>

            {/* Decoration / Info */}
            <div className="py-12 md:pl-12 flex flex-col justify-between">
               <ArrowDownRight size={48} strokeWidth={1} className="text-accent" />
               <p className="text-sm text-gray-500 font-mono mt-4">
                 Données brutes extraites directement du protocole d'exécution.
                 <br/>Aucun filtre. Transparence totale.
               </p>
            </div>
         </div>
      </section>

      {/* 3. THE LIST - Minimalist Table */}
      <section className="pt-20 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex items-end justify-between mb-8 border-b border-white pb-2">
           <h2 className="text-6xl font-bold tracking-tighter">LATEST ENTRIES</h2>
           <span className="font-mono text-sm text-gray-500 mb-2">001 — {trades.length.toString().padStart(3, '0')}</span>
        </div>
        <TradeList trades={trades} />
      </section>

    </main>
  );
}