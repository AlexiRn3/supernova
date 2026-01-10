import { NextResponse } from 'next/server';

// Interface pour TypeScript
export interface Trade {
  id: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  pnl: number;
  setup: string;
  status: 'WIN' | 'LOSS' | 'BE';
  date: string;
  rr: number; // Risk/Reward
}

// Mock Database (mémoire vive)
let trades: Trade[] = [
  { id: '1', symbol: 'NQ1!', direction: 'SHORT', pnl: 1250, setup: 'MSNR Reversal', status: 'WIN', date: '2025-11-28', rr: 2.5 },
  { id: '2', symbol: 'ES1!', direction: 'LONG', pnl: -400, setup: 'Liquidity Grab', status: 'LOSS', date: '2025-11-29', rr: 0 }
];

export async function GET() {
  return NextResponse.json(trades);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTrade: Trade = {
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString().split('T')[0],
    ...body
  };
  trades.unshift(newTrade); // Ajoute en haut de liste
  return NextResponse.json(newTrade);
}