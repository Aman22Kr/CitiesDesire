import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-[#1c1917] border border-[#c29b38]/40 shadow-xl rounded-lg text-sm text-[#f5f5f4] animate-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#c29b38] shrink-0" />
            )}
            <span className="text-xs font-medium leading-tight">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#78716c] hover:text-[#f5f5f4] transition-colors p-1"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
