import React, { useEffect, useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { QRCodeCanvas } from '../ui/QRCodeCanvas';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Copy, Printer, Check } from 'lucide-react';

export const TicketModal = () => {
  const { isTicketModalOpen, setIsTicketModalOpen, lastIssuedTicket } = useEvent();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isTicketModalOpen) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#7c3aed', '#10b981', '#fbbf24']
      });
    }
  }, [isTicketModalOpen]);

  if (!isTicketModalOpen || !lastIssuedTicket) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(lastIssuedTicket.ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl">
        
        <button
          onClick={() => setIsTicketModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 transition-colors no-print"
        >
          <X className="w-5 h-5" />
        </button>

        <div id="ticketPrintArea" className="space-y-6">
          <div className="text-center border-b border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" /> RSVP CONFIRMED
            </div>
            <h3 className="text-2xl font-extrabold text-white">NEXUS HACK 2026 TICKET</h3>
            <p className="text-xs text-slate-400 mt-1">Official Event Entry Pass</p>
          </div>

          <div className="ticket-badge p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">TICKET ID</span>
              <span className="text-base font-extrabold font-mono text-cyan-400">
                {lastIssuedTicket.ticketId}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Attendee Name</span>
                <span className="font-bold text-white text-sm">{lastIssuedTicket.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                <span className="font-medium text-slate-200 truncate block">{lastIssuedTicket.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">College / Organization</span>
                <span className="font-medium text-slate-200">{lastIssuedTicket.organization}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Selected Track</span>
                <span className="font-bold text-cyan-300">{lastIssuedTicket.trackName}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Issued: <strong className="text-slate-300 font-mono">{new Date(lastIssuedTicket.registeredAt).toLocaleDateString()}</strong></span>
              <span>Venue: <strong className="text-slate-300">San Francisco, CA</strong></span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <QRCodeCanvas ticketId={lastIssuedTicket.ticketId} />
            <span className="text-[10px] text-slate-400 mt-2 font-mono">Present QR code at check-in desk</span>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80 no-print">
          <button
            onClick={handleCopy}
            className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'Copied Ticket ID!' : 'Copy Ticket ID'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Pass</span>
          </button>
        </div>

      </div>
    </div>
  );
};
