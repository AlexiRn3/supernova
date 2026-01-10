'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center px-6 md:px-12 bg-background">
      <form onSubmit={handleSubmit} className="max-w-4xl w-full mx-auto">
        <label htmlFor="pwd" className="block text-sm font-mono uppercase tracking-widest text-gray-500 mb-8">
          Identify Yourself
        </label>
        
        <div className="relative group">
          <input
            id="pwd"
            type="password"
            value={password}
            onChange={(e) => { setError(false); setPassword(e.target.value); }}
            placeholder="ACCESS KEY"
            className="w-full bg-transparent text-5xl md:text-8xl font-bold tracking-tighter text-white placeholder:text-neutral focus:outline-none border-b border-neutral focus:border-white transition-colors py-4 uppercase"
            autoFocus
          />
          <motion.div 
            initial={false}
            animate={{ width: error ? '100%' : '0%' }}
            className="absolute bottom-0 left-0 h-[1px] bg-accent"
          />
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-accent font-mono text-sm uppercase tracking-widest"
          >
            Access Denied // Invalid Key
          </motion.p>
        )}

        <button 
          type="submit" 
          className="mt-12 text-sm font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center gap-2"
        >
          [ Enter Protocol ]
        </button>
      </form>
    </main>
  );
}