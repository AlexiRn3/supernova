'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // On simule un petit délai pour la fluidité
    setTimeout(() => {
      if (password === 'lucid2026') {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '/dashboard';
      } else {
        setIsLoading(false);
        alert('Accès refusé');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[40px] w-full max-w-md shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Authentification</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="password" 
            placeholder="Clé d'accès" 
            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-primary transition-all text-center text-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black p-5 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isLoading ? "Vérification..." : "Entrer dans le système"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}