'use client';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  value: string;
  sub?: string;
  isCurrency?: boolean;
}

export default function StatsCard({ title, value, sub, isCurrency }: Props) {
  return (
    <div className="flex flex-col h-full justify-between group">
      <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
        <span className="w-1 h-1 bg-white"></span>
        {title}
      </h3>
      
      <div>
        <div className="flex items-baseline">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-bold tracking-tighter text-white group-hover:text-transparent group-hover:text-outline transition-all duration-500"
            style={{ WebkitTextStroke: '1px white' }} // Fallback pour l'effet outline
          >
            {value}
          </motion.span>
          {(sub || isCurrency) && (
            <span className="text-2xl ml-1 font-light text-gray-400">
              {isCurrency ? '$' : sub}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}