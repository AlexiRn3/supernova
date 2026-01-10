'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({ symbol: '', direction: 'LONG', pnl: '', setup: 'MSNR' });

  useEffect(() => {
    const auth = localStorage.getItem('isLoggedIn');
    if (auth !== 'true') {
      router.replace('/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null; // Empêche le flash de contenu avant redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/trades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, pnl: Number(form.pnl), status: Number(form.pnl) >= 0 ? 'WIN' : 'LOSS' }),
    });
    setForm({ ...form, symbol: '', pnl: '' });
    alert('Trade ajouté');
  };

  return (
    <div className="pl-20 p-12">
      <h1 className="text-4xl font-bold mb-12 uppercase">Terminal_Input</h1>
      <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] text-white/40 uppercase">Instrument</label>
          <input 
            className="bg-transparent border-b border-border py-4 outline-none focus:border-white"
            value={form.symbol} onChange={e => setForm({...form, symbol: e.target.value})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] text-white/40 uppercase">Side</label>
          <select 
            className="bg-transparent border-b border-border py-4 outline-none appearance-none"
            value={form.direction} onChange={e => setForm({...form, direction: e.target.value})}
          >
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] text-white/40 uppercase">Result (PnL)</label>
          <input 
            type="number" className="bg-transparent border-b border-border py-4 outline-none"
            value={form.pnl} onChange={e => setForm({...form, pnl: e.target.value})}
          />
        </div>
        <button type="submit" className="border border-white p-6 font-mono text-xs uppercase hover:bg-white hover:text-black transition-all">
          Execute_Commit
        </button>
      </form>
    </div>
  );
}