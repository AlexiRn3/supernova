'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ symbol: '', direction: 'LONG', pnl: '', setup: 'MSNR' });

  useEffect(() => {
    // Vérification simple côté client
    const token = localStorage.getItem('admin_token');
    if (!token) {
      window.location.href = '/login';
    } else {
      setMounted(true);
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symbol || !form.pnl) return;

    await fetch('/api/trades', { 
      method: 'POST', 
      body: JSON.stringify({
        ...form,
        pnl: Number(form.pnl),
        status: Number(form.pnl) > 0 ? 'WIN' : 'LOSS',
        rr: 0
      }) 
    });
    
    alert('Entry logged successfully.');
    setForm({ ...form, symbol: '', pnl: '' });
  };

  // Empêche l'affichage flash avant la vérification
  if (!mounted) return <div className="min-h-screen bg-bg" />;

  return (
    <div className="min-h-screen bg-bg p-8 pt-32 font-serif text-text max-w-2xl mx-auto">
      <Link href="/" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-text mb-12 block">
        ← Back to Journal
      </Link>

      <h1 className="text-4xl italic mb-12 border-b border-line pb-8">Add New Entry</h1>

      <form onSubmit={submit} className="space-y-8 font-mono text-xs uppercase tracking-widest">
        
        <div className="space-y-2">
          <label className="text-muted">Symbol</label>
          <input 
            className="w-full bg-surface border border-line p-4 text-lg text-text focus:border-white outline-none font-serif italic normal-case"
            value={form.symbol} 
            onChange={e => setForm({...form, symbol: e.target.value})}
            placeholder="e.g. NQ1!"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-muted">Side</label>
            <select 
              className="w-full bg-surface border border-line p-4 outline-none appearance-none cursor-pointer hover:border-muted"
              value={form.direction} 
              onChange={e => setForm({...form, direction: e.target.value})}
            >
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-muted">Realized PnL</label>
            <input 
              type="number"
              className="w-full bg-surface border border-line p-4 text-text focus:border-white outline-none"
              value={form.pnl} 
              onChange={e => setForm({...form, pnl: e.target.value})}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-muted">Setup / Notes</label>
          <input 
            className="w-full bg-surface border border-line p-4 text-text focus:border-white outline-none"
            value={form.setup} 
            onChange={e => setForm({...form, setup: e.target.value})}
          />
        </div>

        <button className="w-full bg-text text-bg py-5 hover:bg-white transition-colors mt-8 font-bold">
          Commit Record
        </button>
      </form>
    </div>
  );
}