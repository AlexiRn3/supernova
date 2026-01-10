'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trade } from './api/trades/route';
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Layers } from 'lucide-react';

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  
  useEffect(() => {
    fetch('/api/trades').then(r => r.json()).then(setTrades).catch(console.error);
  }, []);

  const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);
  const winCount = trades.filter(t => t.status === 'WIN').length;
  const winRate = trades.length > 0 ? ((winCount / trades.length) * 100).toFixed(0) : 0;

  return (
    <main className="min-h-screen pt-32 pb-10 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="text-primary font-mono text-xs uppercase tracking-wider mb-2 block">
            LucidFlex 50K Challenge
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Trading <span className="text-subtle">Log.</span>
          </h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm text-subtle max-w-xs">
            Live documentation of every execution. <br/> No filter. Pure price action.
          </p>
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4 mb-20">
        
        {/* CASE 1 : PnL (Grand carré) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bento-card col-span-1 md:col-span-2 row-span-1 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={100} />
          </div>
          <div className="flex items-center gap-2 text-subtle font-mono text-xs uppercase">
            <div className={`w-2 h-2 rounded-full ${totalPnL >= 0 ? 'bg-success' : 'bg-danger'}`} />
            Net Profit
          </div>
          <div>
            <div className={`text-6xl font-bold tracking-tighter ${totalPnL >= 0 ? 'text-white' : 'text-danger'}`}>
              {totalPnL > 0 ? '+' : ''}{totalPnL}$
            </div>
            <div className="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
               <div className={`h-full ${totalPnL >= 0 ? 'bg-success' : 'bg-danger'}`} style={{ width: '60%' }} />
            </div>
          </div>
        </motion.div>

        {/* CASE 2 : Winrate (Petit carré) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bento-card col-span-1 rounded-3xl p-6 flex flex-col justify-center gap-2"
        >
          <span className="text-subtle font-mono text-xs uppercase">Win Rate</span>
          <div className="text-4xl font-bold text-white">{winRate}%</div>
          <p className="text-xs text-subtle">{trades.length} Trades Total</p>
        </motion.div>

        {/* CASE 3 : Strategy (Petit carré) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bento-card col-span-1 rounded-3xl p-6 flex flex-col justify-center gap-2"
        >
          <span className="text-subtle font-mono text-xs uppercase">Strategy</span>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers size={20} className="text-accent" /> MSNR
          </div>
          <p className="text-xs text-subtle">Malaysian S/R</p>
        </motion.div>

        {/* CASE 4 : Recent Trades List (Large bande bas) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bento-card col-span-1 md:col-span-4 rounded-3xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Recent Executions</h3>
            <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-subtle">LIVE FEED</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-subtle font-mono text-xs uppercase border-b border-white/5">
                <tr>
                  <th className="pb-4 font-normal">Date</th>
                  <th className="pb-4 font-normal">Symbol</th>
                  <th className="pb-4 font-normal">Side</th>
                  <th className="pb-4 font-normal">Setup</th>
                  <th className="pb-4 font-normal text-right">PnL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {trades.map((trade) => (
                  <tr key={trade.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 font-mono text-subtle">{trade.date}</td>
                    <td className="py-4 font-bold">{trade.symbol}</td>
                    <td className="py-4">
                      <span className={`text-[10px] uppercase px-2 py-1 rounded ${
                        trade.direction === 'LONG' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                      }`}>
                        {trade.direction}
                      </span>
                    </td>
                    <td className="py-4 text-subtle">{trade.setup}</td>
                    <td className="py-4 text-right font-mono font-bold">
                      <span className={trade.pnl > 0 ? 'text-success' : 'text-danger'}>
                        {trade.pnl > 0 ? '+' : ''}{trade.pnl}$
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {trades.length === 0 && (
              <div className="py-12 text-center text-subtle font-mono text-xs">Waiting for data...</div>
            )}
          </div>
        </motion.div>

      </div>
    </main>
  );
}