export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 lg:px-12 mt-auto">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-8 items-start font-mono text-xs uppercase tracking-wider text-ashes/40">
        
        <div className="max-w-md">
            <p className="leading-relaxed text-justify mb-4">
                RISK DISCLOSURE: FUTURES TRADING CONTAINS SUBSTANTIAL RISK AND IS NOT FOR EVERY INVESTOR. AN INVESTOR COULD POTENTIALLY LOSE ALL OR MORE THAN THE INITIAL INVESTMENT. PAST PERFORMANCE IS NOT NECESSARILY INDICATIVE OF FUTURE RESULTS.
            </p>
             <p>© 2026 MSNR Protocol. Crafted in the void.</p>
        </div>

        <div className="flex gap-8">
            <a href="#" className="hover:text-neonCyan transition-colors">X (Twitter)</a>
            <a href="#" className="hover:text-neonCyan transition-colors">Discord</a>
        </div>

      </div>
    </footer>
  );
}