'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lucid2026') {
      localStorage.setItem('isLoggedIn', 'true');
      // On utilise window.location pour vider le cache de navigation et forcer le refresh
      window.location.href = '/dashboard';
    } else {
      alert('Mauvais code');
    }
  };

  return (
    <div className="pl-20 h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-64">
        <input 
          type="password" 
          placeholder="AUTH_CODE" 
          className="bg-transparent border border-border p-4 font-mono text-xs outline-none focus:border-white transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-white text-black p-4 font-mono text-[10px] uppercase font-bold hover:invert transition-all">
          Verify_Identity
        </button>
      </form>
    </div>
  );
}