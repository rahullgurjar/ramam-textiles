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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-[#0B241C]/98 via-[#11352A]/98 to-[#0B241C]/98 backdrop-blur-md border-t-2 border-[#D4AF37]/45 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-bold transition-colors font-royal-title ${
          currentPath === '/' ? 'text-[#D4AF37]' : 'text-stone-300 hover:text-white'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-bold transition-colors font-royal-title ${
          currentPath.startsWith('/shop') || currentPath.startsWith('/category') ? 'text-[#D4AF37]' : 'text-stone-300 hover:text-white'
        }`}
      >
        <Compass className="w-5 h-5 mb-0.5" />
        <span>Catalog</span>
      </button>

      <button
        onClick={() => { onNavigate('/lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-bold transition-colors font-royal-title ${
          currentPath === '/lookbook' ? 'text-[#D4AF37]' : 'text-stone-300 hover:text-white'
        }`}
      >
        <Sparkles className="w-5 h-5 mb-0.5" />
        <span>Lookbook</span>
      </button>

      <button
        onClick={() => openQuickQuote()}
        className="flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-bold text-[#F5E6B5] hover:text-[#D4AF37] font-royal-title"
      >
        <FileText className="w-5 h-5 mb-0.5 text-[#D4AF37]" />
        <span>Quick RFQ</span>
      </button>

      <button
        onClick={openInquiryDrawer}
        className="relative flex flex-col items-center justify-center p-1.5 text-[10px] uppercase tracking-wider font-bold text-[#FAF7EE] hover:text-white font-royal-title"
      >
        <div className="relative">
          <ClipboardList className="w-5 h-5 mb-0.5 text-[#F5E6B5]" />
          {totalBasketCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#0B241C] text-[9px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-md">
              {totalBasketCount}
            </span>
          )}
        </div>
        <span>Basket</span>
      </button>
    </div>
  );
};
