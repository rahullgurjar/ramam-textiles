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
  ArrowRight
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
      setIsScrolled(window.scrollY > 30);
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
      {/* Top Royal Announcement & B2B Bar */}
      <div className="bg-gradient-to-r from-[#0B241C] via-[#11352A] to-[#0B241C] text-[#FAF3DC] text-xs py-2 px-4 border-b border-[#D4AF37]/40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide text-[#FAF3DC]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="font-royal-title tracking-wider text-[#F5E6B5]">✨ Royal Jaipur Heritage Atelier</span>
              <span className="hidden sm:inline text-[#D4AF37]/60">•</span>
              <span className="hidden sm:inline text-white/90">Bagru &amp; Sanganer Hand Block Printing</span>
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-[#FAF3DC]/80 font-light">
              Low Wholesale MOQs from 25 Pcs • Custom Private Label &amp; Sampling
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-[#FAF3DC] hover:text-[#D4AF37] transition-colors cursor-pointer py-0.5 px-2.5 rounded bg-white/10 border border-[#D4AF37]/40 text-xs font-semibold"
                title="Change Currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currency.code} ({currency.symbol})</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-40 bg-[#0B241C] border border-[#D4AF37]/50 rounded-lg shadow-2xl py-1 z-50 animate-fade-in"
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
                        currency.code === code ? 'bg-[#D4AF37]/25 text-[#FAF3DC] font-bold' : 'text-stone-200 hover:bg-white/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[#D4AF37] font-semibold">{item.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Email Desk Action */}
            <a 
              href="mailto:exports@ramamtextiles.com"
              className="flex items-center gap-1.5 text-[#F5E6B5] hover:text-white transition-colors text-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline font-medium">Jaipur Export Desk: exports@ramamtextiles.com</span>
            </a>

            {/* Instagram Profile */}
            <a 
              href="https://www.instagram.com/ramamtextiles"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#F5E6B5] hover:text-white transition-colors"
              title="Follow @ramamtextiles on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
              <span className="hidden xl:inline text-xs font-medium">@ramamtextiles</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Header with Jaipur Sandstone / Ivory Base */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7EE]/98 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/35 py-2.5' 
          : 'bg-[#FAF7EE] border-b border-[#D4AF37]/25 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Quick Search */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#11352A] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#11352A]" />}
            </button>

            <button 
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#11352A]/20 text-[#11352A] hover:text-[#0B241C] hover:border-[#D4AF37] bg-white/80 shadow-sm transition-all text-xs font-medium"
              title="Search Catalog & Specifications"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden md:inline font-royal-body">Search prints, duffles, fabrics...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-[#F3EEDB] rounded text-[#11352A] border border-[#D4AF37]/30 font-mono font-semibold">⌘K</kbd>
            </button>
          </div>

          {/* Center: Brand Crest Logo & Royal Jaipur Typography */}
          <div 
            onClick={() => handleNav('/')}
            className="flex flex-col items-center cursor-pointer group px-2 text-center"
          >
            <div className="flex items-center gap-2 sm:gap-3.5">
              <div className="relative">
                <img 
                  src="./logo.jpeg" 
                  alt="Ramam Textiles Royal Crest" 
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-[#0B241C] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">🪷</span>
              </div>
              <div className="text-left">
                <span className="block font-royal-heading text-lg sm:text-2xl font-bold tracking-widest text-[#0B241C] uppercase leading-tight group-hover:text-[#164335] transition-colors">
                  RAMAM TEXTILES
                </span>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#164335] font-royal-title font-bold">
                  Jaipur • Heritage Atelier • Luxury B2B
                </span>
              </div>
            </div>
          </div>

          {/* Right: B2B Status & Wholesale Inquiry Basket */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Custom Manufacturing Quick Link */}
            <button
              onClick={() => handleNav('/custom-manufacturing')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/60 bg-[#F0F7F4] text-[#11352A] text-xs font-royal-title font-bold hover:bg-[#11352A] hover:text-[#FAF3DC] transition-all shadow-sm"
            >
              <Factory className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Private Label Studio</span>
            </button>

            {/* Wholesale Inquiry Basket Button */}
            <button 
              onClick={openInquiryDrawer}
              className="relative flex items-center gap-2 bg-gradient-to-r from-[#11352A] to-[#0B241C] text-[#FAF3DC] hover:from-[#164335] hover:to-[#11352A] border border-[#D4AF37]/60 px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer group shadow-md hover:shadow-lg"
              title="Open Wholesale Inquiry Basket / Request Quote"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5E6B5] group-hover:scale-110 transition-transform" />
                {inquiryItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0B241C] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                    {inquiryItems.length}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left font-royal-title">
                <span className="text-[10px] tracking-wider uppercase text-[#F5E6B5] leading-none font-bold">
                  Wholesale RFQ
                </span>
                <span className="text-xs font-bold leading-tight text-white">
                  {totalInquiryCount > 0 ? `${totalInquiryCount} Pcs Selected` : 'Basket Empty'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Primary Navigation Bar */}
        <nav className="hidden lg:block border-t border-[#D4AF37]/20 mt-2.5 pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center justify-center gap-7 xl:gap-9 text-xs font-bold tracking-wider uppercase text-[#11221B]">
              <li>
                <button 
                  onClick={() => handleNav('/')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath === '/' ? 'border-[#11352A] text-[#11352A]' : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  Home
                </button>
              </li>

              {/* Shop & Categories Mega Menu */}
              <li 
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('shop')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button 
                  onClick={() => handleNav('/shop')}
                  className={`py-1.5 flex items-center gap-1 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath.startsWith('/shop') || currentPath.startsWith('/category')
                      ? 'border-[#11352A] text-[#11352A]' 
                      : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  <span>Shop Catalog</span>
                  <ChevronDown className="w-3 h-3 opacity-60 text-[#D4AF37]" />
                </button>

                {activeMegaMenu === 'shop' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[820px] bg-gradient-to-br from-[#FAF7EE] to-[#F3EEDB] border-2 border-[#D4AF37]/45 shadow-2xl rounded-2xl p-6 z-50 animate-fade-in text-[#11221B]">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/30 mb-3">
                          <span className="text-[11px] font-bold text-[#11352A] tracking-widest uppercase font-royal-title">
                            👑 Handcrafted Product Lines (Wholesale Ready)
                          </span>
                          <button 
                            onClick={() => handleNav('/shop')} 
                            className="text-[11px] text-[#164335] hover:text-[#0B241C] flex items-center gap-1 font-semibold"
                          >
                            <span>view full catalog</span>
                            <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {CATEGORIES.map(cat => (
                            <div 
                              key={cat.id}
                              onClick={() => handleNav(`/category/${cat.id}`)}
                              className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/80 cursor-pointer transition-all border border-transparent hover:border-[#D4AF37]/50 shadow-sm"
                            >
                              <img 
                                src={cat.image} 
                                alt={cat.name} 
                                className="w-12 h-12 rounded-lg object-cover border border-[#D4AF37]/40 shadow-sm"
                              />
                              <div>
                                <h4 className="text-xs font-bold text-[#0B241C] group-hover/item:text-[#164335] transition-colors font-royal-title">
                                  {cat.name}
                                </h4>
                                <p className="text-[10px] text-stone-600 line-clamp-1 font-royal-body">
                                  {cat.subtitle}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mega Menu Spotlight Card */}
                      <div className="bg-gradient-to-br from-[#0B241C] to-[#11352A] text-white p-5 rounded-2xl border border-[#D4AF37]/40 flex flex-col justify-between shadow-lg">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                            Featured Line
                          </span>
                          <h4 className="font-royal-heading font-bold text-base mt-1 text-[#F5E6B5]">
                            Jaipur Quilted Duffles &amp; Bags
                          </h4>
                          <p className="text-[11px] text-stone-300 mt-2 font-royal-body leading-relaxed">
                            Hand-quilted in Bagru with 100% pure cotton batting and vintage brass zippers.
                          </p>
                        </div>
                        <button
                          onClick={() => handleNav('/category/quilted-bags')}
                          className="mt-4 w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#B89426] text-[#0B241C] font-royal-title font-bold text-[10px] uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity shadow"
                        >
                          Explore Bags →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Collections */}
              <li>
                <button 
                  onClick={() => handleNav('/collections')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath === '/collections' ? 'border-[#11352A] text-[#11352A]' : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  Collections
                </button>
              </li>

              {/* Custom Manufacturing */}
              <li>
                <button 
                  onClick={() => handleNav('/custom-manufacturing')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold flex items-center gap-1 ${
                    currentPath === '/custom-manufacturing' 
                      ? 'border-[#11352A] text-[#11352A]' 
                      : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Custom OEM Studio</span>
                </button>
              </li>

              {/* Wholesale Portal */}
              <li>
                <button 
                  onClick={() => handleNav('/wholesale')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath === '/wholesale' ? 'border-[#11352A] text-[#11352A]' : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  Wholesale &amp; Export
                </button>
              </li>

              {/* Craftsmanship */}
              <li>
                <button 
                  onClick={() => handleNav('/craftsmanship')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath === '/craftsmanship' ? 'border-[#11352A] text-[#11352A]' : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  Artisan Craft
                </button>
              </li>

              {/* Lookbook */}
              <li>
                <button 
                  onClick={() => handleNav('/lookbook')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath === '/lookbook' ? 'border-[#11352A] text-[#11352A]' : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  Lookbook
                </button>
              </li>

              {/* Journal */}
              <li>
                <button 
                  onClick={() => handleNav('/journal')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath.startsWith('/journal') ? 'border-[#11352A] text-[#11352A]' : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  Journal
                </button>
              </li>

              {/* About */}
              <li>
                <button 
                  onClick={() => handleNav('/about')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath === '/about' ? 'border-[#11352A] text-[#11352A]' : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  About Atelier
                </button>
              </li>

              {/* Contact */}
              <li>
                <button 
                  onClick={() => handleNav('/contact')}
                  className={`py-1.5 border-b-2 transition-all font-royal-title font-bold ${
                    currentPath === '/contact' ? 'border-[#11352A] text-[#11352A]' : 'border-transparent hover:text-[#164335] hover:border-[#D4AF37]'
                  }`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#0B241C]/75 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-5/6 max-w-sm bg-gradient-to-b from-[#FAF7EE] to-[#F3EEDB] shadow-2xl flex flex-col justify-between overflow-y-auto p-5 border-r-2 border-[#D4AF37]/45 animate-fade-in text-[#0B241C]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md">
                    <img src="./logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-royal-heading font-bold text-sm text-[#0B241C] uppercase tracking-wider block">
                      RAMAM TEXTILES
                    </span>
                    <span className="text-[9px] font-royal-title text-[#164335] tracking-widest block uppercase font-bold">
                      Jaipur Emerald Court
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#11352A] hover:bg-[#FAF7EE] border border-[#D4AF37]/30"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-1 font-royal-body">
                <button 
                  onClick={() => handleNav('/')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C]"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNav('/shop')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C] flex justify-between items-center"
                >
                  <span>Shop All Creations</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                {/* Subcategories list */}
                <div className="pl-4 py-1 space-y-1">
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleNav(`/category/${c.id}`)}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#164335] hover:text-[#0B241C] font-medium"
                    >
                      ✦ {c.name}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handleNav('/collections')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C]"
                >
                  Royal Collections
                </button>
                <button 
                  onClick={() => handleNav('/custom-manufacturing')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#164335] to-[#0B241C] text-[#F5E6B5] flex items-center gap-2 shadow-sm"
                >
                  <Factory className="w-4 h-4 text-[#D4AF37]" />
                  <span>Custom &amp; Private Label</span>
                </button>
                <button 
                  onClick={() => handleNav('/wholesale')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C]"
                >
                  Wholesale Trade Information
                </button>
                <button 
                  onClick={() => handleNav('/craftsmanship')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C]"
                >
                  Our Craftsmanship
                </button>
                <button 
                  onClick={() => handleNav('/lookbook')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C]"
                >
                  Royal Lookbook
                </button>
                <button 
                  onClick={() => handleNav('/journal')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C]"
                >
                  Journal &amp; Guides
                </button>
                <button 
                  onClick={() => handleNav('/about')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C]"
                >
                  About Our Atelier
                </button>
                <button 
                  onClick={() => handleNav('/contact')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF7EE] text-[#0B241C]"
                >
                  Contact Jaipur Workshop
                </button>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-4 border-t border-[#D4AF37]/30 space-y-2">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); openQuickQuote(); }}
                className="btn-royal-gold w-full py-3 px-4 text-xs font-bold uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4 text-[#0B241C]" />
                <span>Request B2B Wholesale Quote</span>
              </button>

              <a 
                href="https://www.instagram.com/ramamtextiles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 border border-[#E1306C]/30 text-[#0B241C] text-xs font-royal-title font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                <span>Follow @ramamtextiles on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
