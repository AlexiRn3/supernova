import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/40 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-4">M.S.N.R. Protocol</h3>
            <p className="text-subtle text-sm leading-relaxed max-w-sm">
              Journal de trading public documentant le parcours vers le financement Prop Firm.
              Transparence totale sur les exécutions Futures (NQ/ES).
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase text-subtle mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Performance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Risk Mgmt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase text-subtle mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-subtle hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-subtle hover:text-white transition-colors"><Github size={20} /></a>
              <a href="mailto:contact@example.com" className="text-subtle hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-subtle font-mono">
          <p>© {year} The Ledger. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            SYSTEM OPERATIONAL
          </p>
        </div>
        
        <p className="mt-8 text-[10px] text-justify text-subtle/40 uppercase leading-normal">
          Disclaimer: Futures, forex, and options trading involves substantial risk of loss and is not suitable for every investor. The valuation of futures, stocks and options may fluctuate, and, as a result, clients may lose more than their original investment. The highly leveraged nature of futures trading means that small market movements will have a great impact on your trading account and this can work against you, leading to large losses or can work for you, leading to large gains.
        </p>
      </div>
    </footer>
  );
}