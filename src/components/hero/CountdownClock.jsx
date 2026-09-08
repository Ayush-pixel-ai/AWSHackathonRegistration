import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { Clock } from 'lucide-react';

export const CountdownClock = ({ targetStartDate }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetStartDate);

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl glass-panel border border-slate-800 mb-10">
      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 text-cyan-400" />
        <span>HACKATHON COUNTDOWN TO HACK OFF</span>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
          <div className="text-2xl sm:text-4xl font-extrabold font-mono text-cyan-400">{days}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold mt-1">Days</div>
        </div>
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
          <div className="text-2xl sm:text-4xl font-extrabold font-mono text-cyan-400">{hours}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold mt-1">Hours</div>
        </div>
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
          <div className="text-2xl sm:text-4xl font-extrabold font-mono text-cyan-400">{minutes}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold mt-1">Mins</div>
        </div>
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
          <div className="text-2xl sm:text-4xl font-extrabold font-mono text-cyan-400">{seconds}</div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold mt-1">Secs</div>
        </div>
      </div>
    </div>
  );
};
