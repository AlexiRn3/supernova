'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navigation() {
  return (
    <>
      {/* Coin Haut Gauche : Logo */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference text-white">
        <Link href="/" className="font-bold tracking-tighter text-xl hover:text-accent transition-colors">
          SUPERNOVA ©2026
        </Link>
      </div>

      {/* Coin Haut Droit : Status */}
      <div className="fixed top-8 right-8 z-50 mix-blend-difference text-white hidden md:block text-right">
        <p className="font-mono text-xs uppercase opacity-60">Status</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="font-bold">LUCID_FLEX_ACTIVE</span>
        </div>
      </div>

      {/* Coin Bas Gauche : Admin (Discret) */}
      <div className="fixed bottom-8 left-8 z-50 mix-blend-difference text-white">
         <Link href="/login" className="font-mono text-xs hover-underline-animation uppercase">
           [ Admin Area ]
         </Link>
      </div>

      {/* Coin Bas Droit : Socials */}
      <div className="fixed bottom-8 right-8 z-50 mix-blend-difference text-white flex gap-6 font-mono text-xs uppercase">
        <a href="#" className="hover-underline-animation">Twitter</a>
        <a href="#" className="hover-underline-animation">Discord</a>
      </div>
    </>
  );
}