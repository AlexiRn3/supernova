'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { name: 'Index', href: '/' },
    { name: 'Admin', href: '/dashboard' },
  ];

  return (
    <nav className="fixed top-0 right-0 z-50 p-6 md:p-12 mix-blend-difference">
      <ul className="flex gap-8">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`text-sm font-mono uppercase tracking-widest hover:text-accent transition-colors ${
                  isActive ? 'underline underline-offset-4 decoration-2 decoration-accent' : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}