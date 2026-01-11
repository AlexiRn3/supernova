export interface Trade {
  id: string;
  symbol: string; // Ex: NQ, ES
  direction: 'LONG' | 'SHORT';
  contracts: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  rr: number;
  setup: string;
  status: 'WIN' | 'LOSS' | 'BE';
  date: string;
  screenshot?: string;
}