export interface Trade {
  id: string;
  symbol: string; // Ex: NQ, ES
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  setup: string; // Ex: MSNR Reversal
  status: 'WIN' | 'LOSS' | 'BE';
  date: string;
  screenshot?: string;
}