import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { ApiService } from '../../services/apiService';
import { X, Ticket, Search, Loader2, AlertCircle, QrCode } from 'lucide-react';

export const LookupModal = () => {
  const { isLookupModalOpen, setIsLookupModalOpen, setLastIssuedTicket, setIsTicketModalOpen } = useEvent();
  
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLookupModalOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsSearching(true);
      setErrorMsg('');
      setResult(null);

      const attendee = await ApiService.getAttendeeLookup(query.trim());

      if (attendee) {
        setResult(attendee);
      } else {
        setErrorMsg(`No registration record found for "${query}". Please check your email or Ticket ID.`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to lookup attendee record.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleDisplayTicket = () => {
    if (result) {
      setLastIssuedTicket(result);
      setIsLookupModalOpen(false);
      setIsTicketModalOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
        
        <button
          onClick={() => {
            setIsLookupModalOpen(false);
            setResult(null);
            setErrorMsg('');
            setQuery('');
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-3">
            <Ticket className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Lookup Registered Ticket</h3>
          <p className="text-xs text-slate-400 mt-1">Enter your registered email address or Ticket ID</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. sophia.chen@mit.edu or NEXUS-2026-A891"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSearching}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search Ticket Record</span>
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="ticket-badge p-5 rounded-2xl border border-cyan-500/40 text-slate-200 mt-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-cyan-400 font-bold">{result.ticketId}</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-medium">VERIFIED ATTENDEE</span>
            </div>

            <h4 className="text-lg font-bold text-white mb-1">{result.fullName}</h4>
            <p className="text-xs text-slate-400">{result.email} | {result.organization}</p>

            <div className="p-3 bg-slate-900/80 rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Track:</span>
                <span className="font-bold text-cyan-300">{result.trackName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Registered:</span>
                <span className="text-slate-300 font-mono">{new Date(result.registeredAt).toLocaleDateString()}</span>
              </div>
            </div>

            <button
              onClick={handleDisplayTicket}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Display Full Confirmation Pass</span>
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-center text-rose-300 text-xs mt-4">
            <AlertCircle className="w-5 h-5 mx-auto mb-1 text-rose-400" />
            <p>{errorMsg}</p>
          </div>
        )}

      </div>
    </div>
  );
};
