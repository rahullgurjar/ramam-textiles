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
      
      {/* TOP ATELIER HALLMARK STRIP */}
      <div className="bg-[#1C1613] text-[#E8D8C3] text-[10.5px] py-1.5 px-4 font-royal-title border-b border-[#D4AF37]/20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-ellipsis whitespace-nowrap text-[10.5px] tracking-[0.14em] uppercase">
            <span className="text-[#F5E6B5] font-semibold">Jaipur Artisan Atelier</span>
            <span className="text-[#D4AF37]/40">•</span>
            <span className="text-stone-300 hidden sm:inline">100% Combed Cotton</span>
            <span className="text-[#D4AF37]/40 hidden md:inline">•</span>
            <span className="text-stone-300 hidden md:inline">Worldwide Express Cargo</span>
            <span className="text-[#D4AF37]/40 hidden lg:inline">•</span>
            <span className="text-[#E5A93C] hidden lg:inline">Low MOQ: 25 Pcs</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[10.5px] tracking-wider">
            <a 
              href="https://www.instagram.com/ramamtextiles" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E8D8C3] hover:text-[#F5E6B5] transition-colors flex items-center gap-1.5 font-medium"
            >
              <InstagramIcon className="w-3.5 h-3.5 opacity-80" />
              <span>@ramamtextiles</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN LUXURY HEADER BAR */}
      <div className={`w-full transition-all duration-300 bg-[#FAF5EE]/95 backdrop-blur-md ${
        isScrolled 
          ? 'shadow-sm border-b border-[#D4AF37]/35 py-2' 
          : 'border-b border-[#D4AF37]/25 py-2.5 sm:py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-6">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#241A16] hover:text-[#9B332C] transition-colors rounded-lg hover:bg-[#FAF0EB]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#241A16]" />}
            </button>

            <div 
              onClick={() => handleNav('/')}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FAF5EE] via-[#F6EDE2] to-[#ECE1D2] border border-[#D4AF37]/50 shadow-sm flex items-center justify-center p-1 group-hover:border-[#9B332C] transition-all duration-300 group-hover:scale-105">
                <picture className="w-full h-full block">
                  <source srcSet="./logo.webp" type="image/webp" />
                  <img 
                    src="./logo.png" 
                    alt="Ramam Textiles Jaipur" 
                    width="48"
                    height="48"
                    decoding="async"
                    className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                  />
                </picture>
              </div>
              <div className="text-left whitespace-nowrap flex flex-col justify-center">
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="font-playfair text-xl sm:text-2xl lg:text-[25px] font-bold tracking-tight text-[#241A16]">
                    Ramam
                  </span>
                  <span className="font-editorial italic text-xl sm:text-2xl lg:text-[25px] font-semibold text-[#9B332C]">
                    Textiles
                  </span>
                </div>
                <span className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.24em] text-[#7E2822] font-royal-title font-semibold mt-1 leading-none">
                  JAIPUR ARTISAN ATELIER
                </span>
              </div>
            </div>
          </div>

          {/* Center: Refined Luxury Atelier Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-royal-body">
            
            {/* Collection Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('shop')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button 
                onClick={() => handleNav('/shop')} 
                className={`nav-luxury-link ${
                  currentPath.startsWith('/shop') || currentPath.startsWith('/category') ? 'active' : ''
                }`}
              >
                <span>COLLECTION</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>

              {activeMegaMenu === 'shop' && (
                <div className="absolute top-full left-0 mt-2 w-[720px] bg-[#FAF5EE] border border-[#D4AF37]/45 shadow-2xl rounded-2xl p-6 z-50 animate-fade-in text-[#241A16]">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/30 mb-3">
                        <span className="text-[11px] font-bold text-[#241A16] tracking-widest uppercase font-royal-title">
                          🌸 Curated Jaipur Product Lines
                        </span>
                        <button 
                          onClick={() => handleNav('/shop')} 
                          className="text-[11px] text-[#9B332C] hover:text-[#241A16] flex items-center gap-1 font-semibold"
                        >
                          <span>view full catalog</span>
                          <ArrowRight className="w-3 h-3 text-[#9B332C]" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {CATEGORIES.map(cat => (
                          <div 
                            key={cat.id}
                            onClick={() => handleNav(`/category/${cat.id}`)}
                            className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FAF0EB] cursor-pointer transition-all border border-[#D4AF37]/30 hover:border-[#9B332C] bg-[#FAF5EE] shadow-sm"
                          >
                            <img 
                              src={cat.image} 
                              alt={cat.name} 
                              className="w-12 h-12 rounded-lg object-cover border border-[#D4AF37]/30 shadow-sm"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-[#241A16] group-hover/item:text-[#9B332C] transition-colors font-royal-title">
                                {cat.name}
                              </h4>
                              <p className="text-[10px] text-stone-600 line-clamp-1">
                                {cat.subtitle}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Spotlight Card */}
                    <div className="bg-gradient-to-br from-[#FAF0EB] via-[#F4ECE1] to-[#EFE4D6] p-5 rounded-2xl border border-[#D4AF37]/40 flex flex-col justify-between shadow-sm">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B332C] font-bold">
                          Featured Line
                        </span>
                        <h4 className="font-heading font-bold text-base mt-1 text-[#241A16]">
                          Quilted Duffles &amp; Bags
                        </h4>
                        <p className="text-[11px] text-stone-700 mt-2 leading-relaxed">
                          Hand-quilted in Bagru with 100% pure combed cotton batting.
                        </p>
                      </div>
                      <button
                        onClick={() => handleNav('/category/bags')}
                        className="mt-4 w-full py-2 bg-[#241A16] text-[#FAF5EE] font-royal-title font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-[#9B332C] transition-colors shadow"
                      >
                        Explore Bags →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Curated Sets */}
            <button 
              onClick={() => handleNav('/collections')}
              className={`nav-luxury-link ${currentPath === '/collections' ? 'active' : ''}`}
            >
              <span>CURATED SETS</span>
            </button>

            {/* Our Craft */}
            <button 
              onClick={() => handleNav('/craftsmanship')}
              className={`nav-luxury-link ${currentPath === '/craftsmanship' ? 'active' : ''}`}
            >
              <span>OUR CRAFT</span>
            </button>

            {/* Lookbook */}
            <button 
              onClick={() => handleNav('/lookbook')}
              className={`nav-luxury-link ${currentPath === '/lookbook' ? 'active' : ''}`}
            >
              <span>LOOKBOOK</span>
            </button>

            {/* About */}
            <button 
              onClick={() => handleNav('/about')}
              className={`nav-luxury-link ${currentPath === '/about' ? 'active' : ''}`}
            >
              <span>ABOUT</span>
            </button>

            {/* Bulk Orders Subtle CTA */}
            <button 
              onClick={() => handleNav('/bulk-enquiry')}
              className="nav-subtle-cta ml-1"
            >
              <span>BULK ORDERS</span>
            </button>
          </nav>

          {/* Right Action Suite (Minimalist, Subtle, Zero Clutter) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 whitespace-nowrap">
            
            {/* Currency Selector */}
            <div className="relative hidden sm:block shrink-0">
              <button 
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-[#241A16] hover:text-[#9B332C] transition-colors cursor-pointer py-1.5 px-2 text-xs font-semibold rounded-lg hover:bg-[#FAF0EB] whitespace-nowrap"
                title="Select Currency"
              >
                <span>{currency.code}</span>
                <span className="text-[#9B332C] font-bold">{currency.symbol}</span>
                <ChevronDown className="w-3 h-3 opacity-40 ml-0.5" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-40 bg-[#FAF5EE] border border-[#D4AF37]/45 rounded-xl shadow-2xl py-1 z-50 animate-fade-in text-[#241A16]"
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
                        currency.code === code ? 'bg-[#FAF0EB] text-[#9B332C] font-bold' : 'hover:bg-[#F5EDE1]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[#9B332C] font-semibold">{item.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Quick Icon Button */}
            <button
              onClick={openSearch}
              className="w-8 h-8 rounded-full text-[#241A16] hover:text-[#9B332C] hover:bg-[#FAF0EB] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* BAG Icon with delicate ruby count badge */}
            <button 
              onClick={openInquiryDrawer}
              className="relative w-8 h-8 rounded-full text-[#241A16] hover:text-[#9B332C] hover:bg-[#FAF0EB] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              title="Open Bag / Inquiry Basket"
            >
              <ShoppingBag className="w-4 h-4" />
              {inquiryItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#9B332C] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {inquiryItems.length}
                </span>
              )}
            </button>

            {/* Subtle Inquire Button */}
            <a 
              href="https://wa.me/911412890000?text=Hi%20Ramam%20Textiles,%20I%20am%20interested%20in%20Jaipur%20hand%20block%20quilted%20bags%20and%20wholesale%20catalog."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full border border-[#241A16]/20 hover:border-[#9B332C] text-[#241A16] hover:text-[#9B332C] hover:bg-[#FAF0EB] text-[11px] font-royal-title font-semibold tracking-wider transition-all whitespace-nowrap shrink-0"
              title="Chat with Jaipur Export Desk"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>INQUIRE</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60">
          <div className="fixed inset-y-0 left-0 w-5/6 max-w-sm bg-[#F5EEE6] shadow-2xl flex flex-col justify-between overflow-y-auto p-5 border-r border-[#D4AF37]/35 animate-fade-in text-[#241A16]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF5EE] via-[#F6EDE2] to-[#ECE1D2] border-2 border-[#D4AF37]/60 shadow-md flex items-center justify-center p-1.5 shrink-0">
                    <picture className="w-full h-full block">
                      <source srcSet="./logo.webp" type="image/webp" />
                      <img src="./logo.png" alt="Ramam Textiles" width="48" height="48" decoding="async" className="w-full h-full object-contain filter drop-shadow-sm" />
                    </picture>
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
                    <span className="text-[9px] font-royal-title text-[#7E2822] tracking-[0.24em] block uppercase font-bold mt-1.5">
                      JAIPUR ARTISAN ATELIER
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#241A16] hover:bg-[#FAF0EB] border border-[#D4AF37]/40"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-1 font-royal-body">
                <button 
                  onClick={() => handleNav('/')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF0EB] text-[#241A16]"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNav('/shop')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF0EB] text-[#241A16] flex justify-between items-center"
                >
                  <span>Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#9B332C]" />
                </button>

                {/* Subcategories list */}
                <div className="pl-4 py-1 space-y-1">
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleNav(`/category/${c.id}`)}
                      className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:text-[#9B332C] font-medium"
                    >
                      ✦ {c.name}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handleNav('/collections')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF0EB] text-[#241A16]"
                >
                  Curated Sets
                </button>
                <button 
                  onClick={() => handleNav('/bulk-enquiry')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider bg-[#FAF0EB] text-[#9B332C] flex items-center gap-2 border border-[#EACAC0]"
                >
                  <Sparkles className="w-4 h-4 text-[#9B332C]" />
                  <span>Bulk Order &amp; Wholesale Enquiry</span>
                </button>
                <button 
                  onClick={() => handleNav('/wholesale')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF0EB] text-[#241A16]"
                >
                  Wholesale Trade Portal
                </button>
                <button 
                  onClick={() => handleNav('/craftsmanship')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF0EB] text-[#241A16]"
                >
                  Our Craft
                </button>
                <button 
                  onClick={() => handleNav('/lookbook')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF0EB] text-[#241A16]"
                >
                  Editorial Lookbook
                </button>
                <button 
                  onClick={() => handleNav('/about')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF0EB] text-[#241A16]"
                >
                  About Atelier
                </button>
                <button 
                  onClick={() => handleNav('/contact')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF0EB] text-[#241A16]"
                >
                  Contact Jaipur Workshop
                </button>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-4 border-t border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="text-xs text-stone-600 font-royal-title uppercase font-bold">Currency:</span>
                <select
                  value={currency.code}
                  onChange={(e) => setCurrencyCode(e.target.value as any)}
                  className="px-2.5 py-1 bg-[#FAF5EE] border border-[#D4AF37]/45 rounded-lg text-xs font-semibold text-[#241A16]"
                >
                  {Object.entries(CURRENCIES).map(([code, item]) => (
                    <option key={code} value={code}>
                      {item.label} ({item.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <a 
                href="https://www.instagram.com/ramamtextiles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 border border-[#E1306C]/40 text-[#9B332C] text-xs font-royal-title font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#FAF0EB] transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 text-[#9B332C]" />
                <span>Follow @ramamtextiles on Instagram</span>
              </a>

              <button 
                onClick={() => { setIsMobileMenuOpen(false); openQuickQuote(); }}
                className="pill-btn-rose w-full py-3 text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>Request Bulk Wholesale Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
