'use client';
import { Trade } from '@/lib/types';
import { motion } from 'framer-motion';

export default function TradeList({ trades }: { trades: Trade[] }) {
  if (!trades.length) return <div className="py-12 text-gray-500 font-mono">No data registered in the ledger.</div>;

  return (
    <div className="w-full">
      {/* Table Headers */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-4 pb-4 text-xs font-mono uppercase tracking-widest text-gray-500">
        <div className="md:col-span-2">Date</div>
        <div className="md:col-span-2">Asset</div>
        <div className="md:col-span-2">Direction</div>
        <div className="md:col-span-2">Setup</div>
        <div className="md:col-span-2 text-right">Entry</div>
        <div className="md:col-span-2 text-right">Result</div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {trades.map((trade, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-2 md:grid-cols-12 gap-4 py-6 border-b border-neutral hover:bg-white/5 transition-colors items-center group"
          >
            {/* Date */}
            <div className="md:col-span-2 font-mono text-gray-500 text-sm">{trade.date}</div>
            
            {/* Asset */}
            <div className="md:col-span-2 font-bold text-xl md:text-2xl">{trade.symbol}</div>
            
            {/* Direction */}
            <div className="md:col-span-2">
               <span className={`px-3 py-1 text-xs font-mono border ${
                  trade.direction === 'LONG' ? 'border-white text-white' : 'border-neutral text-gray-400'
               }`}>
                  {trade.direction}
               </span>
            </div>

            {/* Setup */}
            <div className="md:col-span-2 font-mono text-sm uppercase">{trade.setup}</div>

            {/* Entry */}
            <div className="md:col-span-2 text-right font-mono text-gray-500">{trade.entryPrice}</div>

            {/* Result */}
            <div className={`md:col-span-2 text-right font-mono font-bold text-xl ${
                trade.pnl > 0 ? 'text-white' : 'text-accent'
            }`}>
              {trade.pnl > 0 ? '+' : ''}{trade.pnl}$
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}