import React from 'react';
import { Home, Compass, Sparkles, ClipboardList, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MobileBottomBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentPath, onNavigate }) => {
  const { inquiryItems, openInquiryDrawer, openQuickQuote } = useApp();
  const totalBasketCount = inquiryItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1612]/95 backdrop-blur-md border-t border-amber-900/30 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-semibold transition-colors ${
          currentPath === '/' ? 'text-[#D4AF37]' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-semibold transition-colors ${
          currentPath.startsWith('/shop') || currentPath.startsWith('/category') ? 'text-[#D4AF37]' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Compass className="w-5 h-5 mb-0.5" />
        <span>Catalog</span>
      </button>

      <button
        onClick={() => { onNavigate('/lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-semibold transition-colors ${
          currentPath === '/lookbook' ? 'text-[#D4AF37]' : 'text-stone-400 hover:text-stone-200'
        }`}
      >
        <Sparkles className="w-5 h-5 mb-0.5" />
        <span>Lookbook</span>
      </button>

      <button
        onClick={() => openQuickQuote()}
        className="flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] hover:text-[#f4db89]"
      >
        <FileText className="w-5 h-5 mb-0.5" />
        <span>Quick RFQ</span>
      </button>

      <button
        onClick={openInquiryDrawer}
        className="relative flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-semibold text-stone-300 hover:text-white"
      >
        <div className="relative">
          <ClipboardList className="w-5 h-5 mb-0.5" />
          {totalBasketCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#942C29] text-white text-[9px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-md">
              {totalBasketCount}
            </span>
          )}
        </div>
        <span>Basket</span>
      </button>
    </div>
  );
};
