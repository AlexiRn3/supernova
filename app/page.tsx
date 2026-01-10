'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trade } from '@/lib/types';

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    fetch('/api/trades').then(res => res.json()).then(setTrades);
  }, []);

  const totalPnL = trades.reduce((acc, trade) => acc + trade.pnl, 0);

  return (
    <main className="pl-20 min-h-screen">
      <section className="p-12 md:p-24 border-b border-border">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="font-mono text-xs text-white/40 mb-4 uppercase tracking-widest"
        >
          // MSNR Trading Protocol
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase"
        >
          Ledger <br/> <span className="text-white/10 italic">001</span>
        </motion.h1>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Stat Block */}
        <div className="p-12 border-r border-b border-border flex flex-col justify-between aspect-square">
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Global PnL</span>
          <h2 className={`text-7xl font-bold font-mono ${totalPnL >= 0 ? 'text-white' : 'text-red-500'}`}>
            {totalPnL > 0 ? '+' : ''}{totalPnL}$
          </h2>
        </div>

        {/* Trade List Block (Scrollable) */}
        <div className="col-span-1 md:col-span-2 border-b border-border p-0 overflow-hidden">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-border">
              <tr className="text-white/40">
                <th className="p-6 font-normal">SYMBOL</th>
                <th className="p-6 font-normal">SIDE</th>
                <th className="p-6 font-normal text-right">RESULT</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">{trade.symbol}</td>
                  <td className="p-6">{trade.direction}</td>
                  <td className={`p-6 text-right ${trade.pnl >= 0 ? 'text-white' : 'text-red-500'}`}>
                    {trade.pnl > 0 ? '+' : ''}{trade.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}