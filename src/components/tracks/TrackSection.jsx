import React from 'react';
import { useEvent } from '../../context/EventContext';
import { TrackCard } from './TrackCard';
import { TrackFilters } from './TrackFilters';
import { FolderOpen, Loader2 } from 'lucide-react';

export const TrackSection = () => {
  const { filteredTracks, loading, setSearchQuery, setActiveFilter } = useEvent();

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
  };

  return (
    <section id="tracks-section" className="scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
            STEP 1: SELECT YOUR TRACK
          </div>
          <h2 className="text-3xl font-extrabold text-white">Innovation Tracks & Real-Time Seats</h2>
          <p className="text-slate-400 text-sm mt-1">Click a track card to pre-select it in your registration form below.</p>
        </div>

        <TrackFilters />
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-cyan-400" />
          <p className="text-sm">Fetching live track seat counts...</p>
        </div>
      ) : filteredTracks.length === 0 ? (
        <div className="py-12 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          <FolderOpen className="w-10 h-10 mx-auto mb-3 text-slate-600" />
          <p className="text-lg font-medium">No hackathon tracks match your search filter.</p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-sm transition-all"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      )}
    </section>
  );
};
