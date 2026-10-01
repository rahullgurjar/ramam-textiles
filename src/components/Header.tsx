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
      <div className="bg-[#4D0E0D] text-[#FAF3DC] text-xs py-2 px-4 border-b border-[#D4AF37]/35 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide text-[#FAF3DC]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="font-heading tracking-wider text-[#F5E6B5]">👑 Jaipur Heritage Craft House</span>
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
                  className="absolute right-0 mt-1 w-40 bg-[#4D0E0D] border border-[#D4AF37]/50 rounded shadow-2xl py-1 z-50 animate-fade-in"
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
          ? 'bg-[#FAF6EE]/98 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/30 py-2.5' 
          : 'bg-[#FAF6EE] border-b border-[#D4AF37]/25 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Quick Search */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4D0E0D] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#4D0E0D]" />}
            </button>

            <button 
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#751B19]/20 text-[#5C2E2A] hover:text-[#4D0E0D] hover:border-[#D4AF37] bg-white/80 shadow-sm transition-all text-xs font-medium"
              title="Search Catalog & Specifications"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden md:inline">Search prints, duffles, fabrics...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-[#F3EADB] rounded text-[#751B19] border border-[#D4AF37]/30 font-mono font-semibold">⌘K</kbd>
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
                <span className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-[#381A03] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">🪷</span>
              </div>
              <div className="text-left">
                <span className="block font-heading text-lg sm:text-2xl font-extrabold tracking-widest text-[#4D0E0D] uppercase leading-tight group-hover:text-[#942220] transition-colors">
                  RAMAM TEXTILES
                </span>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#942220] font-bold">
                  👑 Jaipur • Royal Craftsmanship • Luxury B2B
                </span>
              </div>
            </div>
          </div>

          {/* Right: B2B Status & Wholesale Inquiry Basket */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Custom Manufacturing Quick Link */}
            <button
              onClick={() => handleNav('/custom-manufacturing')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/60 bg-[#FFF5F5] text-[#751B19] text-xs font-bold hover:bg-[#751B19] hover:text-[#FAF3DC] transition-all shadow-sm"
            >
              <Factory className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Private Label Studio</span>
            </button>

            {/* Wholesale Inquiry Basket Button */}
            <button 
              onClick={openInquiryDrawer}
              className="relative flex items-center gap-2 bg-[#751B19] text-[#FAF3DC] hover:bg-[#942220] border border-[#D4AF37]/60 px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer group shadow-md hover:shadow-lg"
              title="Open Wholesale Inquiry Basket / Request Quote"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5E6B5] group-hover:scale-110 transition-transform" />
                {inquiryItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#381A03] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                    {inquiryItems.length}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
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
            <ul className="flex items-center justify-center gap-7 xl:gap-9 text-xs font-bold tracking-wider uppercase text-[#4D0E0D]">
              <li>
                <button 
                  onClick={() => handleNav('/')}
                  className={`py-1.5 border-b-2 transition-all font-heading ${
                    currentPath === '/' ? 'border-[#751B19] text-[#751B19]' : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
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
                  className={`py-1.5 flex items-center gap-1 border-b-2 transition-all font-heading ${
                    currentPath.startsWith('/shop') || currentPath.startsWith('/category')
                      ? 'border-[#751B19] text-[#751B19]' 
                      : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
                  }`}
                >
                  <span>Shop Catalog</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {activeMegaMenu === 'shop' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-[#FAF6EE] border border-[#D4AF37]/50 shadow-2xl rounded-b-xl p-6 z-50 animate-fade-in">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/30 mb-3">
                          <span className="text-[11px] font-bold text-[#751B19] tracking-widest uppercase font-heading">
                            👑 Handcrafted Product Lines (Wholesale Ready)
                          </span>
                          <button 
                            onClick={() => handleNav('/shop')} 
                            className="text-[11px] text-[#942220] hover:text-[#4D0E0D] flex items-center gap-1 font-semibold"
                          >
                            <span>view full catalog</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {CATEGORIES.map(cat => (
                            <div 
                              key={cat.id}
                              onClick={() => handleNav(`/category/${cat.id}`)}
                              className="group/item flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#F3EADB] cursor-pointer transition-all border border-transparent hover:border-[#D4AF37]/50"
                            >
                              <img 
                                src={cat.image} 
                                alt={cat.name} 
                                className="w-12 h-12 rounded-lg object-cover border border-[#D4AF37]/40 shadow-sm"
                              />
                              <div>
                                <h4 className="text-xs font-bold text-[#4D0E0D] group-hover/item:text-[#942220] transition-colors">
                                  {cat.name}
                                </h4>
                                <p className="text-[10px] text-[#7A5450] line-clamp-1">
                                  {cat.subtitle}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Featured Spotlight Card in Mega Menu */}
                      <div className="bg-[#4D0E0D] text-[#FAF3DC] p-5 rounded-xl flex flex-col justify-between border border-[#D4AF37]/45 shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] px-2.5 py-0.5 rounded-full bg-white/10 border border-[#D4AF37]/30 inline-block mb-2 font-heading">
                            👑 Jaipur B2B Spotlight
                          </span>
                          <h4 className="font-heading text-sm text-[#F5E6B5] mb-1 font-bold">
                            Quilted Duffles &amp; Vanity Trios
                          </h4>
                          <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                            Low MOQ of 25 pieces with custom woodblock carvings, woven neck labels &amp; export dispatch.
                          </p>
                        </div>
                        <button 
                          onClick={() => handleNav('/category/bags')}
                          className="mt-4 w-full py-2 px-3 bg-gradient-to-r from-[#D4AF37] to-[#B89426] text-[#381A03] text-[10px] font-bold tracking-wider uppercase rounded hover:brightness-110 transition-all text-center shadow-md font-heading"
                        >
                          Explore Bag Collection
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* Collections Mega Menu */}
              <li
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('collections')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button 
                  onClick={() => handleNav('/collections')}
                  className={`py-1.5 flex items-center gap-1 border-b-2 transition-all font-heading ${
                    currentPath.startsWith('/collections')
                      ? 'border-[#751B19] text-[#751B19]' 
                      : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {activeMegaMenu === 'collections' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#FAF6EE] border border-[#D4AF37]/50 shadow-2xl rounded-b-xl p-5 z-50 animate-fade-in">
                    <span className="block text-[11px] font-bold text-[#751B19] tracking-widest uppercase pb-2 border-b border-[#D4AF37]/30 mb-3 font-heading">
                      🪷 Curated Royal Rajasthan &amp; Craft Editions
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {COLLECTIONS.map(col => (
                        <div 
                          key={col.id}
                          onClick={() => handleNav(`/collections#${col.slug}`)}
                          className="flex gap-3 p-2.5 rounded-lg hover:bg-[#F3EADB] cursor-pointer transition-all border border-transparent hover:border-[#D4AF37]/50"
                        >
                          <img 
                            src={col.heroImage} 
                            alt={col.name} 
                            className="w-14 h-14 rounded-lg object-cover border border-[#D4AF37]/30 shadow-sm"
                          />
                          <div>
                            <span className="text-[9px] text-[#942220] font-bold tracking-wider uppercase font-heading">
                              {col.season}
                            </span>
                            <h4 className="text-xs font-bold text-[#4D0E0D]">
                              {col.name}
                            </h4>
                            <p className="text-[10px] text-[#7A5450] line-clamp-1">
                              {col.tagline}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/custom-manufacturing')}
                  className={`py-1.5 flex items-center gap-1 border-b-2 transition-all font-heading ${
                    currentPath === '/custom-manufacturing' 
                      ? 'border-[#751B19] text-[#751B19]' 
                      : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
                  }`}
                >
                  <Factory className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Custom OEM</span>
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/wholesale')}
                  className={`py-1.5 flex items-center gap-1 border-b-2 transition-all font-heading ${
                    currentPath === '/wholesale' 
                      ? 'border-[#751B19] text-[#751B19]' 
                      : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Wholesale Portal</span>
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/craftsmanship')}
                  className={`py-1.5 border-b-2 transition-all font-heading ${
                    currentPath === '/craftsmanship' ? 'border-[#751B19] text-[#751B19]' : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
                  }`}
                >
                  Our Craft
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/lookbook')}
                  className={`py-1.5 border-b-2 transition-all font-heading ${
                    currentPath === '/lookbook' ? 'border-[#751B19] text-[#751B19]' : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
                  }`}
                >
                  Lookbook
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/journal')}
                  className={`py-1.5 border-b-2 transition-all font-heading ${
                    currentPath.startsWith('/journal') ? 'border-[#751B19] text-[#751B19]' : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
                  }`}
                >
                  Journal
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/about')}
                  className={`py-1.5 border-b-2 transition-all font-heading ${
                    currentPath === '/about' ? 'border-[#751B19] text-[#751B19]' : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
                  }`}
                >
                  Jaipur Heritage
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/contact')}
                  className={`py-1.5 border-b-2 transition-all font-heading ${
                    currentPath === '/contact' ? 'border-[#751B19] text-[#751B19]' : 'border-transparent hover:text-[#942220] hover:border-[#D4AF37]'
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
        <div className="fixed inset-0 z-50 lg:hidden bg-[#4D0E0D]/70 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-5/6 max-w-sm bg-gradient-to-b from-[#FAF6EE] to-[#F3EADB] shadow-2xl flex flex-col justify-between overflow-y-auto p-5 border-r-2 border-[#D4AF37]/40 animate-fade-in text-[#4D0E0D]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md">
                    <img src="./logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-royal-heading font-bold text-sm text-[#4D0E0D] uppercase tracking-wider block">
                      RAMAM TEXTILES
                    </span>
                    <span className="text-[9px] font-royal-title text-[#751B19] tracking-widest block uppercase">
                      Jaipur Royal Atelier
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#751B19] hover:bg-[#FAF6EE] border border-[#D4AF37]/30"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-1 font-royal-body">
                <button 
                  onClick={() => handleNav('/')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D]"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNav('/shop')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D] flex justify-between items-center"
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
                      className="w-full text-left px-3 py-1.5 text-xs text-[#751B19] hover:text-[#4D0E0D] font-medium"
                    >
                      ✦ {c.name}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handleNav('/collections')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D]"
                >
                  Royal Collections
                </button>
                <button 
                  onClick={() => handleNav('/custom-manufacturing')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#751B19] to-[#4D0E0D] text-[#F5E6B5] flex items-center gap-2 shadow-sm"
                >
                  <Factory className="w-4 h-4 text-[#D4AF37]" />
                  <span>Custom &amp; Private Label</span>
                </button>
                <button 
                  onClick={() => handleNav('/wholesale')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D]"
                >
                  Wholesale Trade Information
                </button>
                <button 
                  onClick={() => handleNav('/craftsmanship')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D]"
                >
                  Our Craftsmanship
                </button>
                <button 
                  onClick={() => handleNav('/lookbook')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D]"
                >
                  Royal Lookbook
                </button>
                <button 
                  onClick={() => handleNav('/journal')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D]"
                >
                  Journal &amp; Guides
                </button>
                <button 
                  onClick={() => handleNav('/about')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D]"
                >
                  About Our Atelier
                </button>
                <button 
                  onClick={() => handleNav('/contact')}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl font-royal-title font-bold text-xs uppercase tracking-wider hover:bg-[#FAF6EE] text-[#4D0E0D]"
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
                <FileText className="w-4 h-4 text-[#751B19]" />
                <span>Request B2B Wholesale Quote</span>
              </button>

              <a 
                href="https://www.instagram.com/ramamtextiles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 border border-[#E1306C]/30 text-[#4D0E0D] text-xs font-royal-title font-semibold rounded-xl flex items-center justify-center gap-2"
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
