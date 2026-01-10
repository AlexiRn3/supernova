'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [pwd, setPwd] = useState('');
  const [status, setStatus] = useState('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      if (pwd === 'lucid2026') {
        // 1. On set le token
        localStorage.setItem('admin_token', 'ACCESS_GRANTED');
        
        // 2. FORCE RELOAD vers le dashboard (Plus de boucle possible)
        window.location.replace('/dashboard');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="bento-card p-10 rounded-3xl w-full max-w-sm relative z-10 border-white/10">
        <h1 className="text-xl font-bold mb-2 text-center">Admin Access</h1>
        <p className="text-subtle text-center text-xs mb-8">Secure Environment</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Passphrase"
            className="bg-black/50 border border-white/10 rounded-xl p-4 text-center outline-none focus:border-primary transition-colors text-white"
            autoFocus
          />
          
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>

        {status === 'error' && (
          <p className="mt-4 text-center text-danger text-xs font-mono uppercase">Invalid Credentials</p>
        )}
        
        <Link href="/" className="block mt-6 text-center text-xs text-subtle hover:text-white">
          ← Return Home
        </Link>
      </div>
    </div>
  );
}