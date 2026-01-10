'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [form, setForm] = useState({ symbol: '', direction: 'LONG', pnl: '', setup: 'MSNR' });

  useEffect(() => {
    // Vérification au montage
    const token = localStorage.getItem('admin_token');
    if (token !== 'ACCESS_GRANTED') {
      window.location.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/trades', { 
      method: 'POST', 
      body: JSON.stringify({
        ...form,
        pnl: Number(form.pnl),
        status: Number(form.pnl) > 0 ? 'WIN' : 'LOSS',
        rr: 0
      }) 
    });
    alert('Entry Logged');
    setForm({ ...form, symbol: '', pnl: '' });
  };

  // Si pas authentifié, on n'affiche RIEN (pour éviter le flash avant la redirection)
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 pt-32 flex justify-center">
      <div className="bento-card w-full max-w-2xl p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-2xl font-bold">New Entry</h1>
          <Link href="/" className="text-xs text-primary hover:underline">Exit</Link>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-6">
          <div>
            <label className="text-xs text-subtle uppercase mb-2 block">Symbol</label>
            <input 
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-primary outline-none"
              value={form.symbol} onChange={e => setForm({...form, symbol: e.target.value})} placeholder="NQ"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-subtle uppercase mb-2 block">Side</label>
              <select 
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 outline-none"
                value={form.direction} onChange={e => setForm({...form, direction: e.target.value})}
              >
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-subtle uppercase mb-2 block">PnL ($)</label>
              <input 
                type="number"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-primary outline-none"
                value={form.pnl} onChange={e => setForm({...form, pnl: e.target.value})} placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-subtle uppercase mb-2 block">Setup</label>
            <input 
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-primary outline-none"
              value={form.setup} onChange={e => setForm({...form, setup: e.target.value})}
            />
          </div>

          <button className="bg-primary text-black font-bold py-4 rounded-xl hover:bg-blue-400 transition-colors mt-2">
            Commit Data
          </button>
        </form>
      </div>
    </div>
  );
}