export default function Footer() {
  return (
    <footer className="pl-20 border-t border-border p-12 flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="max-w-xs">
        <p className="font-mono text-[10px] text-white/40 uppercase leading-relaxed">
          The SNV ledger is a private documentation project for future prop-firm funding. Not financial advice.
        </p>
      </div>
      <div className="flex gap-12 font-mono text-[10px] uppercase">
        <a href="#" className="hover:text-accent transition-colors underline">Discord</a>
        <a href="#" className="hover:text-accent transition-colors underline">Twitter</a>
        <span className="text-white/20">©2026</span>
      </div>
    </footer>
  );
}