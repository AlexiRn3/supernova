'use client';
import { useState } from 'react';

export default function Login() {
  const [pwd, setPwd] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, error

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      if (pwd === 'lucid2026') {
        // Stockage du token
        localStorage.setItem('admin_token', 'true');
        // REDIRECTION FORCÉE (Contourne le routeur)
        window.location.href = '/dashboard';
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 800);
  };

  return (
    <div className="h-screen w-full bg-bg flex items-center justify-center relative overflow-hidden">
      {/* Texture */}
      <div className="texture-overlay" />

      <div className="z-10 w-full max-w-sm p-8 border border-line bg-surface relative">
        {/* Effet "Ticket" */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-bg rounded-full border border-line" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-bg rounded-full border border-line" />

        <h2 className="font-serif text-2xl italic text-center mb-2">Restricted Area</h2>
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted mb-8">
          Admin Credentials Required
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="PASSPHRASE"
            className="bg-bg border border-line p-4 text-center font-mono text-xs focus:border-text outline-none text-text transition-colors placeholder:text-muted/50"
            autoFocus
          />
          
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="bg-text text-bg py-4 font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Verifying...' : 'Enter System'}
          </button>
        </form>

        {status === 'error' && (
          <div className="absolute -bottom-12 left-0 w-full text-center font-mono text-xs text-loss uppercase animate-pulse">
            Access Denied
          </div>
        )}
      </div>
    </div>
  );
}