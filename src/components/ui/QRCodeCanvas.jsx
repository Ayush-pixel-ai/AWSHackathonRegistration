import React from 'react';

export const QRCodeCanvas = ({ ticketId }) => {
  return (
    <div className="p-2 bg-white rounded-lg shadow-inner flex flex-col items-center">
      <svg width="130" height="130" viewBox="0 0 100 100" className="shape-rendering-crisp">
        <rect width="100" height="100" fill="#ffffff" />
        <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
        <rect x="9" y="9" width="17" height="17" fill="#ffffff" />
        <rect x="13" y="13" width="9" height="9" fill="#0f172a" />

        <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
        <rect x="74" y="9" width="17" height="17" fill="#ffffff" />
        <rect x="78" y="13" width="9" height="9" fill="#0f172a" />

        <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
        <rect x="9" y="74" width="17" height="17" fill="#ffffff" />
        <rect x="13" y="78" width="9" height="9" fill="#0f172a" />

        <rect x="35" y="10" width="6" height="6" fill="#0f172a" />
        <rect x="45" y="10" width="6" height="6" fill="#0f172a" />
        <rect x="55" y="15" width="6" height="6" fill="#0f172a" />

        <rect x="10" y="35" width="6" height="6" fill="#0f172a" />
        <rect x="25" y="40" width="6" height="6" fill="#0f172a" />
        <rect x="35" y="35" width="12" height="12" fill="#06b6d4" />
        <rect x="50" y="40" width="8" height="8" fill="#0f172a" />
        <rect x="65" y="35" width="6" height="12" fill="#7c3aed" />
        <rect x="80" y="40" width="6" height="6" fill="#0f172a" />

        <rect x="35" y="55" width="8" height="8" fill="#0f172a" />
        <rect x="50" y="55" width="12" height="6" fill="#0f172a" />
        <rect x="70" y="55" width="6" height="6" fill="#0f172a" />
        <rect x="85" y="60" width="6" height="6" fill="#0f172a" />

        <rect x="35" y="75" width="6" height="6" fill="#0f172a" />
        <rect x="45" y="80" width="12" height="6" fill="#0f172a" />
        <rect x="65" y="75" width="6" height="12" fill="#0f172a" />
        <rect x="80" y="80" width="10" height="10" fill="#06b6d4" />
      </svg>
      <span className="text-[10px] font-mono text-slate-700 mt-1 font-bold">
        {ticketId || 'VERIFIED QR'}
      </span>
    </div>
  );
};
