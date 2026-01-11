'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [form, setForm] = useState({ symbol: '', direction: 'LONG', pnl: '', setup: 'MSNR', rr: '' });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) router.push('/login');
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tradeData = {
      ...form, 
      pnl: Number(form.pnl), 
      status: Number(form.pnl) > 0 ? 'WIN' : 'LOSS',
      rr: form.rr ? Number(form.rr) : 0 
    };
    await fetch('/api/trades', { method: 'POST', body: JSON.stringify(tradeData) });
    alert('Transaction enregistrée.');
    setForm({ ...form, pnl: '', symbol: '', rr: '' });
  };

  const labelStyle = "block text-xs font-medium text-secondary mb-1.5 ml-1";

  return (
    <div className="min-h-screen bg-background text-primary pt-12 pb-20 px-4 md:px-0">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 px-2">
          <Link href="/" className="p-2 rounded-full hover:bg-surface transition-colors">
            <ChevronLeft className="text-secondary" size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Nouvelle Entrée</h1>
        </div>

        {/* Card Form */}
        <div className="apple-card p-8">
          <form onSubmit={submit} className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Instrument</label>
                <input 
                  className="apple-input w-full"
                  value={form.symbol} 
                  onChange={e => setForm({...form, symbol: e.target.value})} 
                  placeholder="ex: NQ1!"
                  autoFocus
                />
              </div>
              
              <div>
                <label className={labelStyle}>Direction</label>
                <div className="relative">
                  <select 
                    className="apple-input w-full appearance-none cursor-pointer"
                    value={form.direction} 
                    onChange={e => setForm({...form, direction: e.target.value})}
                  >
                    <option value="LONG">LONG (Achat)</option>
                    <option value="SHORT">SHORT (Vente)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>P&L ($)</label>
                <input 
                  type="number"
                  step="any"
                  className="apple-input w-full font-mono"
                  value={form.pnl} 
                  onChange={e => setForm({...form, pnl: e.target.value})} 
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className={labelStyle}>Risk/Reward (R)</label>
                <input 
                  type="number"
                  step="0.1"
                  className="apple-input w-full font-mono"
                  value={form.rr} 
                  onChange={e => setForm({...form, rr: e.target.value})} 
                  placeholder="2.0"
                />
              </div>
            </div>
            
             <div>
              <label className={labelStyle}>Setup / Stratégie</label>
              <input 
                className="apple-input w-full"
                value={form.setup} 
                onChange={e => setForm({...form, setup: e.target.value})}
                placeholder="ex: Reversal M15"
              />
            </div>

            <div className="pt-4">
              <button className="w-full bg-primary text-black font-semibold rounded-xl py-4 hover:bg-white/90 transition-all shadow-lg shadow-white/5 active:scale-[0.98]">
                Enregistrer la transaction
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}