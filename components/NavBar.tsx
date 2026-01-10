'use client';
import Link from 'next/link';
import { LayoutGrid, Lock } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
      <div className="bento-card rounded-full px-5 py-2.5 flex items-center gap-6 shadow-2xl">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-white/10 p-1.5 rounded-md text-white group-hover:bg-primary group-hover:text-black transition-colors">
            <LayoutGrid size={16} />
          </div>
          <span className="font-bold text-sm tracking-tight">THE_LEDGER</span>
        </Link>

        <div className="w-[1px] h-4 bg-white/10" />

        <div className="flex items-center gap-4 text-xs font-mono">
          <Link href="/" className="text-white hover:text-primary transition-colors">Journal</Link>
          <span className="text-subtle cursor-not-allowed">Analytics</span>
          <Link href="/login" className="text-subtle hover:text-white transition-colors" title="Admin">
            <Lock size={12} />
          </Link>
        </div>
      </div>
    </nav>
  );
}