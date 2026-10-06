import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Sparkles, 
  FileText, 
  Mail, 
  ShieldCheck,
  Factory,
  Layers,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { useApp, CURRENCIES } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { InstagramIcon } from './InstagramIcon';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const { 
    inquiryItems, 
    openInquiryDrawer, 
    openSearch, 
    openQuickQuote,
    currency, 
    setCurrencyCode,
    isB2BPriceUnlocked,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const totalInquiryCount = inquiryItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path: string) => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Soft Roasted Espresso with amber gold accents) */}
      <div className="bg-gradient-to-r from-[#241A16] via-[#2F211C] to-[#241A16] text-[#FAF5EE] text-xs py-2 px-4 border-b border-[#D4AF37]/25 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Left: Gold Dot + Atelier label */}
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse"></span>
            <span className="text-[#E5A93C] text-[11px] font-bold tracking-widest uppercase font-royal-title">
              JAIPUR ARTISAN ATELIER
            </span>
          </div>

          {/* Center: Free Delivery Banner */}
          <div className="hidden md:flex items-center gap-2 text-stone-300 text-xs font-medium">
            <span className="text-[#E5A93C]">🚚</span>
            <span>Free Express Delivery Across India on Orders Above ₹1,999 • Low Wholesale MOQs (25 Pcs)</span>
          </div>

          {/* Right: Currency Selector Pill */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 text-[#FAF5EE] hover:text-[#E5A93C] transition-colors cursor-pointer py-0.5 px-2.5 rounded-full bg-white/10 border border-[#D4AF37]/30 text-xs font-semibold"
                title="Change Currency"
              >
                <span>{currency.code === 'INR' ? '🇮🇳 INR' : `${currency.code} (${currency.symbol})`}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-40 bg-[#241A16] border border-[#D4AF37]/40 rounded-xl shadow-2xl py-1 z-50 animate-fade-in"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  {Object.entries(CURRENCIES).map(([code, item]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrencyCode(code as any);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs flex justify-between items-center transition-colors ${
                        currency.code === code ? 'bg-[#9B332C] text-white font-bold' : 'text-stone-200 hover:bg-white/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[#E5A93C] font-semibold">{item.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Email Desk Action */}
            <a 
              href="mailto:exports@ramamtextiles.com"
              className="hidden lg:flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors text-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>exports@ramamtextiles.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR (Soft Alabaster Linen with Brand Logo, Center Pill Navigation, and Action Pills) */}
      <div className={`w-full transition-all duration-300 bg-[#FAF8F5]/95 backdrop-blur-md ${
        isScrolled 
          ? 'shadow-md border-b border-[#EAE2D7] py-2.5' 
          : 'border-b border-[#EAE2D7] py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#241A16] hover:text-[#9B332C] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#241A16]" />}
            </button>

            <div 
              onClick={() => handleNav('/')}
              className="flex items-center gap-3.5 cursor-pointer group flex-shrink-0"
            >
              <div className="relative flex-shrink-0 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-gradient-to-br from-[#FAF6F0] via-white to-[#F5ECE1] border-2 border-[#D4AF37]/50 shadow-md flex items-center justify-center p-1.5 group-hover:border-[#9B332C] group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <img 
                  src="./logo.png" 
                  alt="Ramam Textiles Jaipur" 
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="text-left whitespace-nowrap flex flex-col justify-center">
                <div className="flex items-baseline gap-2 leading-none">
                  <span className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight text-[#241A16]">
                    Ramam
                  </span>
                  <span className="font-editorial italic text-2xl sm:text-3xl font-semibold text-[#9B332C]">
                    Textiles
                  </span>
                </div>
                <span className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.28em] text-stone-500 font-royal-title font-bold mt-1.5 leading-none">
                  JAIPUR ARTISAN ATELIER
                </span>
              </div>
            </div>
          </div>

          {/* Center: Signature Pill Capsule Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-2 font-royal-body">
            
            {/* Collection Dropdown Pill */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('shop')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button 
                onClick={() => handleNav('/shop')}
                className={`pill-nav-btn ${
                  currentPath.startsWith('/shop') || currentPath.startsWith('/category')
                    ? 'pill-nav-btn-active' 
                    : ''
                }`}
              >
                <span>COLLECTION</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {activeMegaMenu === 'shop' && (
                <div className="absolute top-full left-0 mt-2 w-[720px] bg-white border border-stone-200 shadow-2xl rounded-2xl p-6 z-50 animate-fade-in text-[#1F1612]">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-3">
                        <span className="text-[11px] font-bold text-[#1F1612] tracking-widest uppercase font-royal-title">
                          🌸 Curated Jaipur Product Lines
                        </span>
                        <button 
                          onClick={() => handleNav('/shop')} 
                          className="text-[11px] text-[#C8376B] hover:text-[#1F1612] flex items-center gap-1 font-semibold"
                        >
                          <span>view full catalog</span>
                          <ArrowRight className="w-3 h-3 text-[#C8376B]" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {CATEGORIES.map(cat => (
                          <div 
                            key={cat.id}
                            onClick={() => handleNav(`/category/${cat.id}`)}
                            className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FDF0F3] cursor-pointer transition-all border border-stone-200 hover:border-[#C8376B] shadow-sm"
                          >
                            <img 
                              src={cat.image} 
                              alt={cat.name} 
                              className="w-12 h-12 rounded-lg object-cover border border-stone-200 shadow-sm"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-[#1F1612] group-hover/item:text-[#C8376B] transition-colors font-royal-title">
                                {cat.name}
                              </h4>
                              <p className="text-[10px] text-stone-500 line-clamp-1">
                                {cat.subtitle}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Spotlight Card */}
                    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8376B] font-bold">
                          Featured Line
                        </span>
                        <h4 className="font-heading font-bold text-base mt-1 text-[#1F1612]">
                          Quilted Duffles &amp; Bags
                        </h4>
                        <p className="text-[11px] text-stone-600 mt-2 leading-relaxed">
                          Hand-quilted in Bagru with 100% pure combed cotton batting.
                        </p>
                      </div>
                      <button
                        onClick={() => handleNav('/category/bags')}
                        className="mt-4 w-full py-2 bg-[#1F1612] text-white font-royal-title font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-[#C8376B] transition-colors shadow"
                      >
                        Explore Bags →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Curated Sets Pill */}
            <button 
              onClick={() => handleNav('/collections')}
              className={`pill-nav-btn ${
                currentPath === '/collections' ? 'pill-nav-btn-active' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>CURATED SETS</span>
            </button>

            {/* Our Craft Pill */}
            <button 
              onClick={() => handleNav('/craftsmanship')}
              className={`pill-nav-btn ${
                currentPath === '/craftsmanship' ? 'pill-nav-btn-active' : ''
              }`}
            >
              <span>OUR CRAFT</span>
            </button>

            {/* Bulk Orders (Highlighted Soft Velvet Rose Pill) */}
            <button 
              onClick={() => handleNav('/custom-manufacturing')}
              className={`pill-nav-btn pill-nav-bulk ${
                currentPath === '/custom-manufacturing' ? 'ring-2 ring-[#9B332C]' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9B332C]" />
              <span>BULK ORDERS</span>
            </button>

            {/* Lookbook / Reviews Pill */}
            <button 
              onClick={() => handleNav('/lookbook')}
              className={`pill-nav-btn ${
                currentPath === '/lookbook' ? 'pill-nav-btn-active' : ''
              }`}
            >
              <span>REVIEWS</span>
            </button>

            {/* About Pill */}
            <button 
              onClick={() => handleNav('/about')}
              className={`pill-nav-btn ${
                currentPath === '/about' ? 'pill-nav-btn-active' : ''
              }`}
            >
              <span>ABOUT</span>
            </button>
          </nav>

          {/* Right: Action Pills matching reference (BAG + CHAT) */}
          <div className="flex items-center gap-2.5">
            
            {/* Search Quick Icon */}
            <button
              onClick={openSearch}
              className="p-2.5 rounded-full border border-[#EAE2D7] bg-white text-stone-700 hover:text-[#9B332C] hover:border-[#D48B7A] transition-colors shadow-sm"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* BAG Pill Button */}
            <button 
              onClick={openInquiryDrawer}
              className="pill-btn-outline group relative"
              title="Open Bag / Inquiry Basket"
            >
              <ShoppingBag className="w-4 h-4 text-[#241A16] group-hover:text-[#9B332C] transition-colors" />
              <span>BAG</span>
              <span className="w-5 h-5 rounded-full bg-[#9B332C] text-white text-[10px] font-bold flex items-center justify-center -mr-1 shadow-sm">
                {inquiryItems.length}
              </span>
            </button>

            {/* Solid Dark CHAT Pill Button */}
            <a 
              href="https://wa.me/911412890000?text=Hi%20Ramam%20Textiles,%20I%20am%20interested%20in%20Jaipur%20hand%20block%20quilted%20bags%20and%20wholesale%20catalog."
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn-dark shadow-md"
              title="Chat with Jaipur Export Desk"
            >
              <span className="text-emerald-400 text-sm">💬</span>
              <span>CHAT</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60">
          <div className="fixed inset-y-0 left-0 w-5/6 max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col justify-between overflow-y-auto p-5 border-r border-[#EAE2D7] animate-fade-in text-[#241A16]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D7]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF6F0] via-white to-[#F5ECE1] border-2 border-[#D4AF37]/50 shadow-md flex items-center justify-center p-1.5 shrink-0">
                    <img src="./logo.png" alt="Ramam Textiles" className="w-full h-full object-contain filter drop-shadow-sm" />
                  </div>
                  <div className="whitespace-nowrap">
                    <div className="flex items-baseline gap-1.5 leading-none">
                      <span className="font-playfair font-bold text-lg text-[#241A16]">
                        Ramam
                      </span>
                      <span className="italic font-editorial font-semibold text-lg text-[#9B332C]">
                        Textiles
                      </span>
                    </div>
                    <span className="text-[9px] font-royal-title text-stone-500 tracking-[0.24em] block uppercase font-bold mt-1.5">
                      JAIPUR ARTISAN ATELIER
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-stone-700 hover:bg-stone-100 border border-[#EAE2D7]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-1 font-royal-body">
                <button 
                  onClick={() => handleNav('/')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FDF0F3] text-[#1F1612]"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNav('/shop')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FDF0F3] text-[#1F1612] flex justify-between items-center"
                >
                  <span>Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#C8376B]" />
                </button>

                {/* Subcategories list */}
                <div className="pl-4 py-1 space-y-1">
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleNav(`/category/${c.id}`)}
                      className="w-full text-left px-3 py-1.5 text-xs text-stone-600 hover:text-[#C8376B] font-medium"
                    >
                      ✦ {c.name}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handleNav('/collections')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FDF0F3] text-[#1F1612]"
                >
                  Curated Sets
                </button>
                <button 
                  onClick={() => handleNav('/custom-manufacturing')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider bg-[#FDF0F3] text-[#C8376B] flex items-center gap-2 border border-[#F3CAD6]"
                >
                  <Sparkles className="w-4 h-4 text-[#C8376B]" />
                  <span>Bulk Orders &amp; Private Label</span>
                </button>
                <button 
                  onClick={() => handleNav('/wholesale')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FDF0F3] text-[#1F1612]"
                >
                  Wholesale Trade Portal
                </button>
                <button 
                  onClick={() => handleNav('/craftsmanship')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FDF0F3] text-[#1F1612]"
                >
                  Our Craft
                </button>
                <button 
                  onClick={() => handleNav('/lookbook')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FDF0F3] text-[#1F1612]"
                >
                  Reviews &amp; Lookbook
                </button>
                <button 
                  onClick={() => handleNav('/about')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FDF0F3] text-[#1F1612]"
                >
                  About Atelier
                </button>
                <button 
                  onClick={() => handleNav('/contact')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FDF0F3] text-[#1F1612]"
                >
                  Contact Jaipur Workshop
                </button>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); openQuickQuote(); }}
                className="pill-btn-rose w-full py-3 text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>Request Bulk Wholesale Quote</span>
              </button>

              <a 
                href="https://wa.me/911412890000?text=Hi%20Ramam%20Textiles,%20I%20am%20interested%20in%20Jaipur%20hand%20block%20quilted%20bags."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#1F1612] text-white text-xs font-royal-title font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <span>💬 Direct WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
