import React from 'react';
import { Zap, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

const SPONSORS = ['NVIDIA', 'AWS', 'Google Cloud', 'OpenAI', 'Vercel'];

const NAV_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Code of Conduct', href: '#' },
  { label: 'Sponsors', href: '#' },
  { label: 'FAQ', href: '#' },
];

const SOCIAL_LINKS = [
  { Icon: Twitter, href: '#', label: 'Twitter/X' },
  { Icon: Github, href: '#', label: 'GitHub' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Mail, href: '#', label: 'Contact' },
];

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 pt-14 pb-10 px-4 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Top Row: Branding + Social */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                NEXUS<span className="text-cyan-400">HACK</span>{' '}
                <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono">2026</span>
              </span>
              <span className="text-[10px] text-slate-400 block font-medium tracking-wider">
                OCT 24–26 • SAN FRANCISCO &amp; VIRTUAL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Sponsor Strip */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold text-center">
            Backed by world-class sponsors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SPONSORS.map(sponsor => (
              <span
                key={sponsor}
                className="px-4 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs font-semibold text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-all cursor-default"
              >
                {sponsor}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/60" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-mono">© 2026 NexusHack Summit. All rights reserved.</p>

          <div className="flex items-center gap-5">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
