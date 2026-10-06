import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-700 flex-shrink-0" />,
    error: <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
  };

  const borderColors = {
    success: 'border-emerald-700/30 bg-[#F4F9F4] text-emerald-950',
    info: 'border-amber-700/30 bg-[#FFFDF9] text-amber-950',
    error: 'border-rose-700/30 bg-[#FFF5F5] text-rose-950',
  };

  return (
    <aside aria-label="Notification" className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-md animate-fade-in shadow-2xl rounded-lg overflow-hidden">
      <div className={`flex items-center gap-3 p-4 border-2 rounded-lg ${borderColors[toast.type]} shadow-xl`}>
        {icons[toast.type]}
        <p className="text-xs md:text-sm font-medium pr-2 leading-snug">{toast.message}</p>
      </div>
    </aside>
  );
};
