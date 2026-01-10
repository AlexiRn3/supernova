'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    symbol: '',
    direction: 'LONG',
    setup: '',
    entryPrice: '',
    exitPrice: '',
    pnl: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/trades', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        entryPrice: Number(formData.entryPrice),
        exitPrice: Number(formData.exitPrice),
        pnl: Number(formData.pnl),
      }),
    });
    router.push('/'); // Retour à l'index après ajout
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = "w-full bg-transparent border-b border-neutral focus:border-white text-white text-xl md:text-2xl font-bold py-4 focus:outline-none transition-colors rounded-none";
  const labelStyle = "text-xs font-mono uppercase tracking-widest text-gray-500 mb-2 block";

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <header className="mb-20">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4">NEW ENTRY</h1>
            <p className="font-mono text-gray-500">Record execution data into the ledger.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <label className={labelStyle}>Instrument / Symbol</label>
              <input name="symbol" placeholder="BTCUSDT" onChange={handleChange} className={inputStyle} required />
            </div>
            
            <div>
              <label className={labelStyle}>Date</label>
              <input name="date" type="date" value={formData.date} onChange={handleChange} className={inputStyle} required />
            </div>
          </div>

          <div>
             <label className={labelStyle}>Direction</label>
             <div className="flex gap-8 pt-4">
                {['LONG', 'SHORT'].map((dir) => (
                  <label key={dir} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="direction" 
                      value={dir} 
                      checked={formData.direction === dir} 
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className={`w-4 h-4 border border-white flex items-center justify-center transition-colors ${formData.direction === dir ? 'bg-white' : ''}`}>
                    </span>
                    <span className={`text-xl font-bold transition-colors ${formData.direction === dir ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`}>
                      {dir}
                    </span>
                  </label>
                ))}
             </div>
          </div>

          <div>
            <label className={labelStyle}>Strategy / Setup</label>
            <input name="setup" placeholder="Breakout, Reversal..." onChange={handleChange} className={inputStyle} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <label className={labelStyle}>Entry Price</label>
              <input name="entryPrice" type="number" step="any" placeholder="0.00" onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Exit Price</label>
              <input name="exitPrice" type="number" step="any" placeholder="0.00" onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
              <label className={labelStyle}>Net PnL ($)</label>
              <input name="pnl" type="number" step="any" placeholder="0.00" onChange={handleChange} className={inputStyle} required />
            </div>
          </div>

          <div className="pt-12">
            <button 
              type="submit" 
              className="w-full md:w-auto px-12 py-6 bg-white text-black font-bold text-xl uppercase tracking-tighter hover:bg-accent hover:text-white transition-colors"
            >
              Commit Data
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}