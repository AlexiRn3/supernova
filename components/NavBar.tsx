'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 border-r border-border flex flex-col items-center justify-between py-10 z-50 bg-background">
      <Link href="/" className="font-bold text-xl tracking-tighter -rotate-90 py-4">
        SNV.
      </Link>
      
      <div className="flex flex-col gap-12 font-mono text-[10px] uppercase tracking-[0.3em] -rotate-90">
        <Link href="/" className={pathname === '/' ? 'text-accent' : 'text-white/40 hover:text-white transition-colors'}>
          Index
        </Link>
        <Link href="/dashboard" className={pathname === '/dashboard' ? 'text-accent' : 'text-white/40 hover:text-white transition-colors'}>
          Admin
        </Link>
      </div>

      <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
    </nav>
  );
}