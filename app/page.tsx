'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trade } from '@/lib/types';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    fetch('/api/trades').then(res => res.json()).then(setTrades);
  }, []);

  const totalPnL = trades.reduce((acc, trade) => acc + trade.pnl, 0);

  return (
    <main className="min-h-screen p-6 md:p-24">
      {/* Aurora Background Blobs */}
      <div className="aurora-bg">
        <div className="blob bg-primary top-0 -left-20 animate-float"></div>
        <div className="blob bg-secondary bottom-0 right-0 animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>

      <header className="max-w-6xl mx-auto mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
        >
          Supernova.
        </motion.h1>
        <p className="text-white/40 mt-4 font-medium tracking-widest uppercase text-xs">MSNR Trading Journal</p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card */}
        <div className="glass rounded-3xl p-8 flex flex-col justify-between aspect-video md:aspect-square">
          <Activity className="text-primary" size={32} />
          <div>
            <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-2">Total Net PnL</p>
            <h2 className={`text-5xl font-bold ${totalPnL >= 0 ? 'text-white' : 'text-red-400'}`}>
              {totalPnL > 0 ? '+' : ''}{totalPnL}$
            </h2>
          </div>
        </div>

        {/* Trade List Container */}
        <div className="glass rounded-3xl p-8 md:col-span-2 overflow-hidden">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-40">Recent Executions</h3>
          <div className="space-y-4">
            {trades.map((trade, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${trade.pnl >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {trade.pnl >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  </div>
                  <div>
                    <p className="font-bold">{trade.symbol}</p>
                    <p className="text-[10px] text-white/40 uppercase">{trade.direction}</p>
                  </div>
                </div>
                <p className={`font-mono font-bold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trade.pnl > 0 ? '+' : ''}{trade.pnl}$
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}