import React from 'react';
import { useEvent } from '../../context/EventContext';
import { 
  BrainCircuit, 
  Cloud, 
  Blocks, 
  ShieldAlert, 
  Bot, 
  Code, 
  CheckCircle2, 
  Armchair, 
  ArrowRight 
} from 'lucide-react';

const ICON_MAP = {
  BrainCircuit,
  Cloud,
  Blocks,
  ShieldAlert,
  Bot
};

export const TrackCard = ({ track }) => {
  const { selectedTrackId, setSelectedTrackId, addToast } = useEvent();
  const isSelected = track.id === selectedTrackId;

  const IconComponent = ICON_MAP[track.iconName] || Code;
  const fillPercentage = Math.round(((track.totalSeats - track.seatsLeft) / track.totalSeats) * 100);
  
  const isLow = track.seatsLeft <= 5;
  const isFillingFast = track.seatsLeft <= 15 && !isLow;

  let badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let badgeLabel = 'Available';
  let progressColor = 'bg-emerald-500';

  if (isLow) {
    badgeBg = 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse';
    badgeLabel = 'Critical (Few Left!)';
    progressColor = 'bg-gradient-to-r from-rose-500 to-amber-500';
  } else if (isFillingFast) {
    badgeBg = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    badgeLabel = 'Filling Fast';
    progressColor = 'bg-gradient-to-r from-amber-500 to-cyan-500';
  }

  const handleSelectTrack = () => {
    setSelectedTrackId(track.id);

    const el = document.getElementById('rsvp-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    addToast(`Selected "${track.name}" track. Complete your details below.`, 'info');
  };

  return (
    <div
      onClick={handleSelectTrack}
      className={`track-card glass-card relative p-6 rounded-2xl cursor-pointer flex flex-col justify-between transition-all duration-300 ${
        isSelected ? 'selected-track' : ''
      }`}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-2 bg-cyan-500 text-slate-950 px-3 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
        </div>
      )}

      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 text-2xl group-hover:scale-110 transition-transform">
            <IconComponent className="w-6 h-6 text-cyan-400" />
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeBg}`}>
            {badgeLabel}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          {track.name}
        </h3>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {track.description}
        </p>

        <div className="flex wrap gap-1.5 mb-6">
          {track.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-slate-800/60 border border-slate-700/50 rounded-md text-xs text-slate-300 font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Armchair className="w-3.5 h-3.5 text-cyan-400" /> Real-Time Seats
          </span>
          <span className={`font-bold font-mono ${isLow ? 'text-rose-400 font-extrabold' : 'text-slate-200'}`}>
            {track.seatsLeft} / {track.totalSeats} seats left
          </span>
        </div>

        <div className="w-full bg-slate-800/90 rounded-full h-2 overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className={`${progressColor} h-full rounded-full transition-all duration-500`}
            style={{ width: `${fillPercentage}%` }}
          ></div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-cyan-400 group-hover:text-cyan-300 font-medium">
          <span>{isSelected ? 'Selected for RSVP' : 'Click card to select'}</span>
          {isSelected ? <CheckCircle2 className="w-4 h-4 text-cyan-400" /> : <ArrowRight className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
};
