import React from 'react';
import { useEvent } from '../../context/EventContext';
import { Search } from 'lucide-react';

export const TrackFilters = () => {
  const { activeFilter, setActiveFilter, searchQuery, setSearchQuery } = useEvent();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[220px]">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter track tags or title..."
          className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
        />
      </div>

      <button
        onClick={() => setActiveFilter('all')}
        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
          activeFilter === 'all'
            ? 'bg-cyan-500 text-slate-950 font-bold'
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
        }`}
      >
        All Tracks
      </button>

      <button
        onClick={() => setActiveFilter('available')}
        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
          activeFilter === 'available'
            ? 'bg-cyan-500 text-slate-950 font-bold'
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
        }`}
      >
        Available
      </button>

      <button
        onClick={() => setActiveFilter('filling-fast')}
        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
          activeFilter === 'filling-fast'
            ? 'bg-cyan-500 text-slate-950 font-bold'
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
        }`}
      >
        Filling Fast
      </button>
    </div>
  );
};
