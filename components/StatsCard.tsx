'use client';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  value: string;
  sub?: string;
  delay?: number;
  isPositive?: boolean;
}

export default function StatsCard({ title, value, sub, delay = 0, isPositive }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-surface border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:border-white/10 transition-colors"
    >
      <h3 className="text-muted text-sm uppercase tracking-wider font-mono mb-2">{title}</h3>
      <div className={`text-4xl font-bold font-mono tracking-tight ${
        isPositive === true ? 'text-success' : isPositive === false ? 'text-danger' : 'text-white'
      }`}>
        {value}
      </div>
      {sub && <p className="text-xs text-muted mt-2">{sub}</p>}
    </motion.div>
  );
}