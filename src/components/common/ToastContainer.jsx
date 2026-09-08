import React from 'react';
import { useEvent } from '../../context/EventContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useEvent();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 sm:px-0">
      {toasts.map(toast => {
        let Icon = Info;
        let iconColor = 'text-cyan-400';
        let borderColor = 'border-cyan-500/40';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
          borderColor = 'border-emerald-500/40';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-rose-400';
          borderColor = 'border-rose-500/40';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
          borderColor = 'border-amber-500/40';
        }

        return (
          <div
            key={toast.id}
            className={`glass-panel ${borderColor} px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm text-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
            <span className="flex-1 text-xs sm:text-sm">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
