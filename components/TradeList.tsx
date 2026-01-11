'use client';
import { Trade } from '@/lib/types';
import { motion } from 'framer-motion';

export default function TradeList({ trades }: { trades: Trade[] }) {
  if (!trades.length) return <div className="p-8 text-center text-secondary">Aucune donnée disponible.</div>;

  return (
    <div className="w-full text-sm">
      {/* Header (Hidden on mobile) */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border text-secondary text-xs font-medium uppercase tracking-wide bg-surface/50">
        <div className="col-span-2">Date</div>
        <div className="col-span-3">Instrument</div>
        <div className="col-span-2">Direction</div>
        <div className="col-span-2 text-right">R:R</div>
        <div className="col-span-3 text-right">P&L</div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {trades.map((trade, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors items-center group"
          >
            {/* Mobile: Top Row */}
            <div className="md:col-span-2 font-mono text-secondary text-xs">{trade.date}</div>
            
            <div className="md:col-span-3 flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold text-primary text-base">{trade.symbol}</span>
              <span className="text-xs text-secondary px-1.5 py-0.5 rounded bg-white/5 md:ml-2 w-fit">
                {trade.setup}
              </span>
            </div>
            
            <div className="md:col-span-2">
               <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                  trade.direction === 'LONG' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-danger/10 text-danger'
               }`}>
                  {trade.direction}
               </span>
            </div>

            <div className="hidden md:block md:col-span-2 text-right font-mono text-secondary">
               {trade.rr}R
            </div>

            <div className={`col-span-2 md:col-span-3 text-right font-mono font-medium text-base ${
                trade.pnl > 0 ? 'text-success' : 'text-danger'
            }`}>
              {trade.pnl > 0 ? '+' : ''}{trade.pnl}$
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}