'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [form, setForm] = useState({ symbol: '', direction: 'LONG', pnl: '', setup: 'MSNR' });

  // SÉCURITÉ
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tradeData = {
      ...form, 
      pnl: Number(form.pnl), 
      status: Number(form.pnl) > 0 ? 'WIN' : 'LOSS',
      rr: 0 // Défaut
    };

    await fetch('/api/trades', { method: 'POST', body: JSON.stringify(tradeData) });
    alert('Entry Logged.');
    setForm({ ...form, pnl: '', symbol: '' });
  };

  return (
    <div className="min-h-screen bg-background text-paper p-8 pt-24 font-mono">
      <div className="max-w-xl mx-auto border border-subtle p-8 bg-background relative z-10">
        <div className="flex justify-between items-center mb-8 border-b border-subtle pb-4">
          <h1 className="text-xl uppercase">New Entry</h1>
          <Link href="/" className="text-xs text-accent hover:underline">Exit to Site</Link>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-6">
          <div>
            <label className="text-xs text-subtle uppercase block mb-2">Instrument</label>
            <input 
              className="w-full bg-white/5 border border-subtle p-3 outline-none focus:border-accent text-paper"
              value={form.symbol} onChange={e => setForm({...form, symbol: e.target.value})} placeholder="NQ"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="text-xs text-subtle uppercase block mb-2">Side</label>
              <select 
                className="w-full bg-white/5 border border-subtle p-3 outline-none focus:border-accent text-paper"
                value={form.direction} onChange={e => setForm({...form, direction: e.target.value})}
              >
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-subtle uppercase block mb-2">PnL</label>
              <input 
                type="number"
                className="w-full bg-white/5 border border-subtle p-3 outline-none focus:border-accent text-paper"
                value={form.pnl} onChange={e => setForm({...form, pnl: e.target.value})} placeholder="0.00"
              />
            </div>
          </div>
          
           <div>
            <label className="text-xs text-subtle uppercase block mb-2">Setup</label>
            <input 
              className="w-full bg-white/5 border border-subtle p-3 outline-none focus:border-accent text-paper"
              value={form.setup} onChange={e => setForm({...form, setup: e.target.value})}
            />
          </div>

          <button className="bg-accent text-black font-bold uppercase py-4 hover:bg-white transition-colors mt-4">
            Commit Data
          </button>
        </form>
      </div>
    </div>
  );
}