'use client';
import { Trade } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TradeList({ trades }: { trades: Trade[] }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {trades.map((trade, i) => {
        const isWin = trade.pnl > 0;
        const accentColor = isWin ? 'text-neonCyan' : 'text-neonMagenta';
        
        return (
        <motion.div
          key={trade.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="group relative glass-panel rounded-lg p-4 hover:bg-white/[0.02] transition-all cursor-crosshair overflow-hidden"
        >
           {/* Glow effect on hover */}
           <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${isWin ? 'from-neonCyan/20 to-transparent' : 'from-neonMagenta/20 to-transparent'}`}></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            
            {/* Left: Symbol & Setup */}
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded bg-void/50 border border-white/5 ${accentColor}`}>
                    {trade.direction === 'LONG' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <h4 className="font-bold text-xl tracking-tight text-white">{trade.symbol}</h4>
                        <span className={`text-[0.65rem] font-mono uppercase px-1.5 py-0.5 rounded bg-void border border-white/10 ${accentColor} bg-opacity-20`}>
                            {trade.direction}
                        </span>
                    </div>
                     <p className="text-xs text-ashes/60 font-mono mt-1 uppercase tracking-wider">{trade.setup} // {trade.date}</p>
                </div>
            </div>

            {/* Right: Data Points & PnL */}
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end font-mono text-sm">
                 <div className="text-right hidden md:block">
                  <p className="text-[10px] text-ashes/40 uppercase mb-1">Entry -{'>'} Exit</p>
                  <p className="text-ashes">{trade.entryPrice} -{'>'} {trade.exitPrice}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-ashes/40 uppercase mb-1">Net P&L</p>
                   <p className={`text-2xl font-bold ${accentColor} ${isWin ? 'text-glow-cyan' : 'text-glow-magenta'}`}>
                    {trade.pnl > 0 ? '+' : ''}{trade.pnl}$
                  </p>
                </div>
            </div>

          </div>
        </motion.div>
      )})}
    </div>
  );
}