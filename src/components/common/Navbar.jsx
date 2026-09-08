import React from 'react';
import { useEvent } from '../../context/EventContext';
import { Zap, Ticket, RotateCcw, ArrowDown } from 'lucide-react';

export const Navbar = () => {
  const { totalRemaining, setIsLookupModalOpen, resetDemoData } = useEvent();

  const scrollToRsvp = (e) => {
    e.preventDefault();
    const el = document.getElementById('rsvp-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 glass-nav px-4 lg:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              NEXUS<span className="text-cyan-400">HACK</span> <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono">2026</span>
            </span>
            <span className="text-[10px] text-slate-400 block font-medium tracking-wider">OCT 24-26 • SAN FRANCISCO & VIRTUAL</span>
          </div>
        </a>

        {/* Right Nav Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono font-bold text-cyan-400">
              {totalRemaining} Seats Left
            </span>
          </div>

          <button
            onClick={() => setIsLookupModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Ticket className="w-4 h-4 text-cyan-400" />
            <span className="hidden xs:inline">Lookup Ticket</span>
          </button>

          <button
            onClick={resetDemoData}
            title="Reset Seat & RSVP Demo State"
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700 text-slate-400 hover:text-cyan-400 text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <a
            href="#rsvp-section"
            onClick={scrollToRsvp}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>RSVP Now</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
};
