'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-8 z-40 flex justify-between items-start mix-blend-difference pointer-events-none">
      {/* Les pointer-events-auto permettent de cliquer sur les liens même si la nav est "transparente" */}
      
      {/* Logo Typographique */}
      <Link href="/" className="pointer-events-auto group">
        <h1 className="font-serif text-3xl italic tracking-tighter leading-none group-hover:text-gray-400 transition-colors">
          The<br/>Journal.
        </h1>
      </Link>

      {/* Menu Latéral */}
      <div className="flex flex-col text-right gap-1 font-mono text-xs uppercase tracking-widest pointer-events-auto">
        <Link href="/" className="hover:line-through">Index</Link>
        <span className="text-muted">Analytics [LOCKED]</span>
        <Link href="/login" className="mt-4 hover:bg-white hover:text-black px-1 transition-colors">
          Private Access
        </Link>
      </div>
    </nav>
  );
}