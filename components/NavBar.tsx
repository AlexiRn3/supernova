'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, PieChart, Lock, Settings } from 'lucide-react';

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { name: 'Index', href: '/', icon: <Home size={20} /> },
    { name: 'Admin', href: '/dashboard', icon: <Settings size={20} /> },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="glass flex items-center gap-2 p-2 rounded-2xl shadow-2xl">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className="relative p-3">
              <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 hover:text-white'}`}>
                {link.icon}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}