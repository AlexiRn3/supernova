'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de page
    setStatus('loading');

    // Petit délai artificiel pour voir l'effet de chargement
    setTimeout(() => {
      if (password === 'lucid2026') {
        localStorage.setItem('admin_token', 'secure_access_granted');
        router.push('/dashboard');
      } else {
        setStatus('error');
        // Reset l'erreur après 2 secondes
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 500);
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center relative p-4">
      {/* Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="z-10 w-full max-w-sm">
        <div className="flex justify-center mb-8 text-accent">
          <Lock size={24} />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="ENTER PASSWORD"
              className={`w-full bg-transparent border-b py-4 text-center text-xl outline-none transition-all font-mono placeholder:text-subtle/30
                ${status === 'error' ? 'border-red-500 text-red-500' : 'border-subtle focus:border-accent text-paper'}
              `}
              autoFocus
            />
            {/* Indicateur visuel du focus */}
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-focus-within:w-full" />
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-subtle hover:text-white transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                Confirm Access <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Message d'erreur explicite */}
        {status === 'error' && (
          <p className="text-center mt-6 text-xs font-mono text-red-500 uppercase tracking-widest animate-pulse">
            Access Denied
          </p>
        )}
      </div>
    </div>
  );
}