'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trade } from '@/lib/types';
import { Trash2, RefreshCcw } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // État du formulaire
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const initialForm = {
    symbol: '',
    direction: 'LONG',
    setup: '',
    entryPrice: '',
    exitPrice: '',
    pnl: '',
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialForm);

  // Charger les trades au montage
  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    const res = await fetch('/api/trades');
    const data = await res.json();
    setTrades(data);
  };

  // Remplir le formulaire quand on clique sur un trade
  const handleSelectTrade = (trade: Trade) => {
    setIsEditing(true);
    setEditId(trade.id);
    setFormData({
      symbol: trade.symbol,
      direction: trade.direction,
      setup: trade.setup,
      entryPrice: trade.entryPrice.toString(),
      exitPrice: trade.exitPrice.toString(),
      pnl: trade.pnl.toString(),
      date: trade.date, // Assure-toi que c'est au format YYYY-MM-DD
    });
    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData(initialForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const method = isEditing ? 'PUT' : 'POST';
    const body = isEditing ? { ...formData, id: editId } : formData;

    await fetch('/api/trades', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    await fetchTrades(); // Rafraîchir la liste
    if (!isEditing) resetForm(); // Reset seulement si c'était une création
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!editId || !confirm('CONFIRM DELETION? This action is irreversible.')) return;
    
    setIsLoading(true);
    await fetch('/api/trades', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId }),
    });

    await fetchTrades();
    resetForm();
    setIsLoading(false);
  };

  const inputStyle = "w-full bg-transparent border-b border-neutral focus:border-white text-white text-xl md:text-2xl font-bold py-3 focus:outline-none transition-colors rounded-none placeholder:text-neutral/30";
  const labelStyle = "text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1 block";

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 md:px-12 bg-background">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: THE FORM (STICKY) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-32">
            <header className="mb-12 border-b border-white pb-4 flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-bold tracking-tighter text-white">
                    {isEditing ? 'EDIT ENTRY' : 'NEW ENTRY'}
                  </h1>
                  <p className="font-mono text-gray-500 text-xs mt-2">
                    {isEditing ? `Target ID: ${editId}` : 'Protocol: Append to Ledger'}
                  </p>
                </div>
                {isEditing && (
                   <button onClick={resetForm} className="text-xs font-mono uppercase hover:text-white text-gray-500 flex items-center gap-2">
                     <RefreshCcw size={12} /> Cancel
                   </button>
                )}
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Symbol</label>
                  <input name="symbol" value={formData.symbol} onChange={handleChange} placeholder="BTCUSDT" className={inputStyle} required />
                </div>
                <div>
                  <label className={labelStyle}>Date</label>
                  <input name="date" type="date" value={formData.date} onChange={handleChange} className={inputStyle} required />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Direction</label>
                <div className="flex gap-6 pt-2">
                    {['LONG', 'SHORT'].map((dir) => (
                      <label key={dir} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="direction" value={dir} checked={formData.direction === dir} onChange={handleChange} className="hidden" />
                        <span className={`w-3 h-3 border border-white flex items-center justify-center transition-colors ${formData.direction === dir ? 'bg-white' : ''}`}></span>
                        <span className={`text-lg font-bold transition-colors ${formData.direction === dir ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`}>{dir}</span>
                      </label>
                    ))}
                </div>
              </div>

              <div>
                <label className={labelStyle}>Setup / Strategy</label>
                <input name="setup" value={formData.setup} onChange={handleChange} placeholder="Pullback..." className={inputStyle} required />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className={labelStyle}>Entry</label>
                  <input name="entryPrice" type="number" step="any" value={formData.entryPrice} onChange={handleChange} className={inputStyle} required />
                </div>
                <div>
                  <label className={labelStyle}>Exit</label>
                  <input name="exitPrice" type="number" step="any" value={formData.exitPrice} onChange={handleChange} className={inputStyle} required />
                </div>
                <div>
                  <label className={labelStyle}>PnL</label>
                  <input name="pnl" type="number" step="any" value={formData.pnl} onChange={handleChange} className={inputStyle} required />
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`flex-1 py-4 font-bold text-sm uppercase tracking-widest transition-colors ${
                    isEditing ? 'bg-white text-black hover:bg-gray-200' : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {isLoading ? 'Processing...' : isEditing ? 'Update Entry' : 'Commit Data'}
                </button>
                
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={handleDelete}
                    className="px-6 py-4 bg-red-900/20 border border-red-900/50 text-red-500 hover:bg-red-900/40 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: THE LEDGER (LIST) */}
        <div className="lg:col-span-7 xl:col-span-8 lg:border-l lg:border-neutral lg:pl-12">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-mono uppercase tracking-widest text-gray-500">Database Records</h2>
            <span className="text-xs font-mono text-neutral">{trades.length} entries loaded</span>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-12 gap-4 pb-2 text-[10px] font-mono uppercase tracking-widest text-neutral border-b border-neutral mb-4 px-4">
               <div className="col-span-2">Date</div>
               <div className="col-span-2">Sym</div>
               <div className="col-span-2">Dir</div>
               <div className="col-span-2">PnL</div>
               <div className="col-span-4 text-right">Action</div>
            </div>

            {trades.map((trade) => (
              <div 
                key={trade.id}
                onClick={() => handleSelectTrade(trade)}
                className={`grid grid-cols-12 gap-4 p-4 items-center cursor-pointer transition-all border border-transparent rounded-sm group
                  ${editId === trade.id ? 'bg-white text-black border-white' : 'hover:bg-neutral/30 hover:border-neutral'}
                `}
              >
                <div className="col-span-2 font-mono text-xs opacity-70">{trade.date}</div>
                <div className="col-span-2 font-bold">{trade.symbol}</div>
                <div className="col-span-2 text-xs font-mono">{trade.direction}</div>
                <div className={`col-span-2 font-mono font-bold ${
                  editId === trade.id ? 'text-black' : (trade.pnl > 0 ? 'text-white' : 'text-accent')
                }`}>
                  {trade.pnl > 0 ? '+' : ''}{trade.pnl}$
                </div>
                <div className="col-span-4 text-right">
                   <span className="text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      [ Edit ]
                   </span>
                </div>
              </div>
            ))}
            
            {trades.length === 0 && (
               <div className="py-20 text-center text-gray-500 font-mono text-sm">
                 Waiting for data stream...
               </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}