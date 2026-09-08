import React from 'react';
import { useEvent } from '../../context/EventContext';
import { CountdownClock } from './CountdownClock';
import { Sparkles, Calendar, MapPin, Trophy, Armchair } from 'lucide-react';

export const HeroSection = () => {
  const { eventDetails, totalRemaining, totalCapacity } = useEvent();

  return (
    <header className="relative pt-12 pb-16 px-4 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4" />
          <span>36-HOUR GLOBAL INNOVATION HACKATHON</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Architect the Next Era of <br className="hidden sm:inline" />
          <span className="text-gradient-cyan">Intelligent Systems</span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
          Join <strong className="text-cyan-400">1,500+ developers, researchers, and creators</strong> building break-through solutions in AI/ML, Cloud Mesh, Zero-Knowledge Web3, and Autonomous Robotics. Live track capacity tracking & instant RSVP badge generation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          <div className="p-4 rounded-2xl glass-card text-left">
            <div className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Event Dates
            </div>
            <div className="text-sm font-bold text-white">{eventDetails.dateString}</div>
          </div>

          <div className="p-4 rounded-2xl glass-card text-left">
            <div className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Venue & Mode
            </div>
            <div className="text-sm font-bold text-white">San Francisco + Virtual</div>
          </div>

          <div className="p-4 rounded-2xl glass-card text-left">
            <div className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Total Prize Pool
            </div>
            <div className="text-sm font-bold text-gradient-gold">{eventDetails.prizePool}</div>
          </div>

          <div className="p-4 rounded-2xl glass-card text-left relative overflow-hidden">
            <div className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1.5">
              <Armchair className="w-3.5 h-3.5 text-emerald-400" /> Remaining Seats
            </div>
            <div className="text-sm font-extrabold text-cyan-400 font-mono">
              {totalRemaining} / {totalCapacity}
            </div>
          </div>
        </div>

        <CountdownClock targetStartDate={eventDetails.targetStartDate} />

      </div>
    </header>
  );
};
