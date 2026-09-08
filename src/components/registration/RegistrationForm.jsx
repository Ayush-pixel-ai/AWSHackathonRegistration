import React, { useState } from 'react';
import { useEvent } from '../../context/EventContext';
import { useDuplicateCheck } from '../../hooks/useDuplicateCheck';
import { TechStackSelector } from './TechStackSelector';
import { User, Mail, Building2, Layers, ChevronDown, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

export const RegistrationForm = () => {
  const { tracks, selectedTrackId, setSelectedTrackId, registerUser, addToast } = useEvent();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [conductAgreed, setConductAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isChecking, isRegistered, existingAttendee } = useDuplicateCheck(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      addToast('Please enter your full name.', 'error');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    if (!organization.trim()) {
      addToast('Please enter your college or organization.', 'error');
      return;
    }

    if (!selectedTrackId) {
      addToast('Please select an innovation track.', 'error');
      return;
    }

    if (!conductAgreed) {
      addToast('You must agree to the Code of Conduct.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({
        fullName,
        email,
        organization,
        trackId: selectedTrackId,
        techStack
      });

      setFullName('');
      setEmail('');
      setOrganization('');
      setTechStack([]);
      setConductAgreed(false);
      setSelectedTrackId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp-section" className="scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              STEP 2: CLAIM YOUR SPOT
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">Hackathon Registration & RSVP</h2>
            <p className="text-slate-400 text-sm">
              Instant duplicate check & immediate seat reservation upon submission.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.mercer@university.edu"
                    className={`w-full bg-slate-900/90 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      isRegistered
                        ? 'border-amber-500 focus:border-amber-500'
                        : email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                        ? 'border-emerald-500/80 focus:border-emerald-500'
                        : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {isChecking && (
                    <Loader2 className="w-4 h-4 animate-spin absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400" />
                  )}
                </div>

                {isRegistered && existingAttendee && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs flex items-center gap-2 mt-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div>
                      <strong>Email Already Registered!</strong> Found Ticket{' '}
                      <span className="font-mono underline font-bold">{existingAttendee.ticketId}</span>.
                      Use "Lookup Ticket" to retrieve your pass.
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  College / Company / Organization <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. UC Berkeley / Meta"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Select Track <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select
                    required
                    value={selectedTrackId || ''}
                    onChange={(e) => setSelectedTrackId(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-11 pr-10 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>-- Choose an Innovation Track --</option>
                    {tracks.map(t => (
                      <option key={t.id} value={t.id} disabled={t.seatsLeft <= 0}>
                        {t.name} ({t.seatsLeft} seats left) {t.seatsLeft <= 0 ? '- FULL' : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

            </div>

            <TechStackSelector selectedTags={techStack} onChange={setTechStack} />

            <div className="pt-2">
              <label className="cursor-pointer flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                <input
                  type="checkbox"
                  required
                  checked={conductAgreed}
                  onChange={(e) => setConductAgreed(e.target.checked)}
                  className="mt-0.5 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>
                  I agree to abide by the <a href="#" className="text-cyan-400 underline">NexusHack 2026 Code of Conduct</a>, attendance terms, and privacy agreement.
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-violet-600 to-cyan-500 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm RSVP & Claim Seat</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
