'use client';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { Trade } from '@/lib/types';

// Custom Label qui suit la souris
const CustomActiveDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload || cx === undefined || cy === undefined) return null;

  const isPositive = payload.pnl >= 0;

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="black" stroke={isPositive ? "white" : "#ff3333"} strokeWidth={2} />
      <line x1={cx} y1={cy - 8} x2={cx} y2={cy - 20} stroke={isPositive ? "white" : "#ff3333"} strokeWidth={1} />
      <text 
        x={cx} 
        y={cy - 28} 
        textAnchor="middle" 
        fill={isPositive ? "white" : "#ff3333"} 
        fontSize={12} 
        fontFamily="monospace" 
        fontWeight="bold"
        style={{ textShadow: '0px 2px 4px rgba(0,0,0,1)' }}
      >
        {payload.pnl.toFixed(2)}$
      </text>
    </g>
  );
};

export default function PnLChart({ trades }: { trades: Trade[] }) {
  let runningPnL = 0;
  
  // On crée un index 'i' pour garantir l'unicité de l'axe X
  const data = trades.map((trade, index) => {
    runningPnL += trade.pnl;
    return {
      i: index, // Clé unique technique
      date: trade.date, // Donnée d'affichage
      pnl: runningPnL,
    };
  });

  if (data.length === 0) return null;

  const isPositive = runningPnL >= 0;

  return (
    <div className="w-full h-[300px] md:h-[400px] select-none">
       <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 40, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isPositive ? "#fff" : "#ff3333"} stopOpacity={0.1}/>
              <stop offset="95%" stopColor={isPositive ? "#fff" : "#ff3333"} stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          {/* AXE X : On utilise 'i' (index) mais on affiche 'date' */}
          <XAxis 
            dataKey="i" 
            tickFormatter={(i) => data[i]?.date || ''} 
            tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }} 
            axisLine={false} 
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis 
            tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }} 
            axisLine={false} 
            tickLine={false}
          />
          
          <ReferenceLine y={0} stroke="#333" strokeDasharray="3 3" />
          
          <Tooltip 
            content={() => null}
            cursor={{ stroke: 'white', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.3 }}
          />

          <Area 
            type="monotone" 
            dataKey="pnl" 
            stroke={isPositive ? "#fff" : "#ff3333"} 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorPnL)"
            activeDot={<CustomActiveDot />} 
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}