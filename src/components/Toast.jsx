import React, { useEffect } from 'react';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-indigo-500/40 bg-zinc-950/95 px-4 py-3 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl animate-bounce-short border-l-4 border-l-indigo-500">
      <CheckCircle className="h-4 w-4 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
}
