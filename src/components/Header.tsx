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
      {/* Top Announcement & B2B Bar */}
      <div className="bg-[#0C1813] text-[#DFCA9F] text-xs py-2 px-4 border-b border-[#254234]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#C4A674] animate-pulse"></span>
              Official Manufacturer &amp; Exporter — Jaipur, Rajasthan
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-white/80">
              Low Wholesale MOQs from 25 Pcs | Custom Private Label &amp; Sampling
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-0.5 px-2 rounded bg-white/5 border border-white/10"
                title="Change Currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#C4A674]" />
                <span className="font-semibold">{currency.code} ({currency.symbol})</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-36 bg-[#13241C] border border-[#254234] rounded shadow-xl py-1 z-50 animate-fade-in"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  {Object.entries(CURRENCIES).map(([code, item]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrencyCode(code as any);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex justify-between items-center transition-colors ${
                        currency.code === code ? 'bg-[#C4A674]/20 text-[#DFCA9F] font-semibold' : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-gray-400">{item.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Email Desk Action */}
            <a 
              href="mailto:exports@ramamtextiles.com"
              className="flex items-center gap-1.5 text-[#DFCA9F] hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline font-medium">B2B Export Desk: exports@ramamtextiles.com</span>
            </a>

            {/* Instagram Profile */}
            <a 
              href="https://www.instagram.com/ramamtextiles"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#DFCA9F] hover:text-white transition-colors"
              title="Follow @ramamtextiles on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
              <span className="hidden xl:inline text-xs font-medium">@ramamtextiles</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Header */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#121815]/10 py-3' 
          : 'bg-[#FAF7F2] border-b border-[#121815]/10 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Quick Search */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#121815] hover:text-[#C4A674] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button 
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-2 rounded border border-[#121815]/15 text-[#4F5A54] hover:text-[#121815] hover:border-[#C4A674] bg-white/60 transition-all text-xs font-medium"
              title="Search Catalog & Specifications"
            >
              <Search className="w-4 h-4 text-[#C4A674]" />
              <span className="hidden md:inline">Search prints, fabrics, SKUs...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-[#EDE4D5] rounded text-[#4F5A54] border border-black/5">⌘K</kbd>
            </button>
          </div>

          {/* Center: Brand Crest Logo & Typography */}
          <div 
            onClick={() => handleNav('/')}
            className="flex flex-col items-center cursor-pointer group px-2 text-center"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="./logo.jpeg" 
                alt="Ramam Textiles Crest Logo" 
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-full border border-[#C4A674]/40 group-hover:scale-105 transition-transform"
              />
              <div className="text-left">
                <span className="block font-heading text-lg sm:text-2xl font-bold tracking-widest text-[#0C1813] uppercase leading-tight group-hover:text-[#8A4A3B] transition-colors">
                  RAMAM TEXTILES
                </span>
                <span className="block text-[9px] sm:text-[10.5px] uppercase tracking-[0.25em] text-[#8A4A3B] font-semibold">
                  Jaipur • Craftsmanship • Luxury B2B
                </span>
              </div>
            </div>
          </div>

          {/* Right: B2B Status & Wholesale Inquiry Basket */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Custom Manufacturing Quick Link */}
            <button
              onClick={() => handleNav('/custom-manufacturing')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#C4A674]/50 bg-[#F2ECE0] text-[#0C1813] text-xs font-semibold hover:bg-[#C4A674] hover:text-[#0C1813] transition-all"
            >
              <Factory className="w-3.5 h-3.5 text-[#8A4A3B]" />
              <span>Private Label</span>
            </button>

            {/* Wholesale Inquiry Basket Button */}
            <button 
              onClick={openInquiryDrawer}
              className="relative flex items-center gap-2 bg-[#0C1813] text-[#FAF7F2] hover:bg-[#13241C] border border-[#C4A674]/60 px-3 sm:px-4 py-2 rounded transition-all cursor-pointer group shadow-sm hover:shadow-md"
              title="Open Wholesale Inquiry Basket / Request Quote"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#DFCA9F] group-hover:scale-110 transition-transform" />
                {inquiryItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8A4A3B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {inquiryItems.length}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] tracking-wider uppercase text-[#DFCA9F] leading-none font-semibold">
                  Wholesale RFQ
                </span>
                <span className="text-xs font-bold leading-tight">
                  {totalInquiryCount > 0 ? `${totalInquiryCount} Pcs Selected` : 'Basket Empty'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Primary Navigation Bar */}
        <nav className="hidden lg:block border-t border-[#121815]/10 mt-3 pt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center justify-center gap-6 xl:gap-8 text-xs font-semibold tracking-wider uppercase text-[#121815]">
              <li>
                <button 
                  onClick={() => handleNav('/')}
                  className={`py-2 border-b-2 transition-all ${
                    currentPath === '/' ? 'border-[#8A4A3B] text-[#8A4A3B]' : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
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
                  className={`py-2 flex items-center gap-1 border-b-2 transition-all ${
                    currentPath.startsWith('/shop') || currentPath.startsWith('/category')
                      ? 'border-[#8A4A3B] text-[#8A4A3B]' 
                      : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
                  }`}
                >
                  <span>Shop Catalog</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {activeMegaMenu === 'shop' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] bg-[#FAF7F2] border border-[#121815]/15 shadow-2xl rounded-b-md p-6 z-50 animate-fade-in">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <div className="flex items-center justify-between pb-2 border-b border-[#121815]/10 mb-3">
                          <span className="text-[11px] font-bold text-[#8A4A3B] tracking-widest uppercase">
                            Product Categories (Wholesale Ready)
                          </span>
                          <button 
                            onClick={() => handleNav('/shop')} 
                            className="text-[11px] text-[#4F5A54] hover:text-[#8A4A3B] flex items-center gap-1 lowercase"
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
                              className="group/item flex items-center gap-3 p-2 rounded hover:bg-[#F2ECE0] cursor-pointer transition-all border border-transparent hover:border-[#C4A674]/40"
                            >
                              <img 
                                src={cat.image} 
                                alt={cat.name} 
                                className="w-12 h-12 rounded object-cover border border-black/5"
                              />
                              <div>
                                <h4 className="text-xs font-bold text-[#121815] group-hover/item:text-[#8A4A3B] transition-colors">
                                  {cat.name}
                                </h4>
                                <p className="text-[10px] text-[#7E8A83] line-clamp-1">
                                  {cat.subtitle}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Featured Spotlight Card in Mega Menu */}
                      <div className="bg-[#0C1813] text-[#FAF7F2] p-4 rounded flex flex-col justify-between border border-[#254234]">
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#DFCA9F] px-2 py-0.5 rounded bg-white/10 inline-block mb-2">
                            B2B Spotlight
                          </span>
                          <h4 className="font-heading text-sm text-[#DFCA9F] mb-1">
                            Quilted Duffles &amp; Pouches
                          </h4>
                          <p className="text-[11px] text-[#A3AFA8] leading-relaxed">
                            Low MOQ of 25 pieces with custom print placement &amp; brand woven labels.
                          </p>
                        </div>
                        <button 
                          onClick={() => handleNav('/category/bags')}
                          className="mt-4 w-full py-1.5 px-3 bg-[#C4A674] text-[#0C1813] text-[10px] font-bold tracking-wider uppercase rounded hover:bg-[#DFCA9F] transition-all text-center"
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
                  className={`py-2 flex items-center gap-1 border-b-2 transition-all ${
                    currentPath.startsWith('/collections')
                      ? 'border-[#8A4A3B] text-[#8A4A3B]' 
                      : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {activeMegaMenu === 'collections' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-[#FAF7F2] border border-[#121815]/15 shadow-2xl rounded-b-md p-5 z-50 animate-fade-in">
                    <span className="block text-[11px] font-bold text-[#8A4A3B] tracking-widest uppercase pb-2 border-b border-[#121815]/10 mb-3">
                      Curated Seasonal &amp; Craft Editions
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {COLLECTIONS.map(col => (
                        <div 
                          key={col.id}
                          onClick={() => handleNav(`/collections#${col.slug}`)}
                          className="flex gap-3 p-2 rounded hover:bg-[#F2ECE0] cursor-pointer transition-all border border-transparent hover:border-[#C4A674]/40"
                        >
                          <img 
                            src={col.heroImage} 
                            alt={col.name} 
                            className="w-14 h-14 rounded object-cover"
                          />
                          <div>
                            <span className="text-[9px] text-[#8A4A3B] font-bold tracking-wider uppercase">
                              {col.season}
                            </span>
                            <h4 className="text-xs font-bold text-[#121815]">
                              {col.name}
                            </h4>
                            <p className="text-[10px] text-[#7E8A83] line-clamp-1">
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
                  className={`py-2 flex items-center gap-1 border-b-2 transition-all ${
                    currentPath === '/custom-manufacturing' 
                      ? 'border-[#8A4A3B] text-[#8A4A3B]' 
                      : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
                  }`}
                >
                  <Factory className="w-3.5 h-3.5 text-[#C4A674]" />
                  <span>Custom / Private Label</span>
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/wholesale')}
                  className={`py-2 flex items-center gap-1 border-b-2 transition-all ${
                    currentPath === '/wholesale' 
                      ? 'border-[#8A4A3B] text-[#8A4A3B]' 
                      : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C4A674]" />
                  <span>Wholesale Portal</span>
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/craftsmanship')}
                  className={`py-2 border-b-2 transition-all ${
                    currentPath === '/craftsmanship' ? 'border-[#8A4A3B] text-[#8A4A3B]' : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
                  }`}
                >
                  Our Craft
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/lookbook')}
                  className={`py-2 border-b-2 transition-all ${
                    currentPath === '/lookbook' ? 'border-[#8A4A3B] text-[#8A4A3B]' : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
                  }`}
                >
                  Lookbook
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/journal')}
                  className={`py-2 border-b-2 transition-all ${
                    currentPath.startsWith('/journal') ? 'border-[#8A4A3B] text-[#8A4A3B]' : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
                  }`}
                >
                  Journal
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/about')}
                  className={`py-2 border-b-2 transition-all ${
                    currentPath === '/about' ? 'border-[#8A4A3B] text-[#8A4A3B]' : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
                  }`}
                >
                  About
                </button>
              </li>

              <li>
                <button 
                  onClick={() => handleNav('/contact')}
                  className={`py-2 border-b-2 transition-all ${
                    currentPath === '/contact' ? 'border-[#8A4A3B] text-[#8A4A3B]' : 'border-transparent hover:text-[#8A4A3B] hover:border-[#C4A674]'
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
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-5/6 max-w-sm bg-[#FAF7F2] shadow-2xl flex flex-col justify-between overflow-y-auto p-5 animate-fade-in">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#121815]/10">
                <div className="flex items-center gap-2">
                  <img src="./logo.jpeg" alt="Logo" className="w-8 h-8 rounded-full" />
                  <span className="font-heading font-bold text-sm text-[#0C1813] uppercase tracking-wider">
                    RAMAM TEXTILES
                  </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded text-[#121815] hover:bg-black/5"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-1">
                <button 
                  onClick={() => handleNav('/')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813]"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNav('/shop')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813] flex justify-between items-center"
                >
                  <span>Shop All Products</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>

                {/* Subcategories list */}
                <div className="pl-3 py-1 space-y-1">
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleNav(`/category/${c.id}`)}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#4F5A54] hover:text-[#8A4A3B] font-medium"
                    >
                      • {c.name}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handleNav('/collections')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813]"
                >
                  Collections
                </button>
                <button 
                  onClick={() => handleNav('/custom-manufacturing')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm bg-[#F2ECE0] text-[#8A4A3B] flex items-center gap-2"
                >
                  <Factory className="w-4 h-4" />
                  <span>Custom &amp; Private Label</span>
                </button>
                <button 
                  onClick={() => handleNav('/wholesale')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813]"
                >
                  Wholesale Information
                </button>
                <button 
                  onClick={() => handleNav('/craftsmanship')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813]"
                >
                  Our Craftsmanship
                </button>
                <button 
                  onClick={() => handleNav('/lookbook')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813]"
                >
                  Lookbook
                </button>
                <button 
                  onClick={() => handleNav('/journal')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813]"
                >
                  Journal &amp; Guides
                </button>
                <button 
                  onClick={() => handleNav('/about')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813]"
                >
                  About Us
                </button>
                <button 
                  onClick={() => handleNav('/contact')}
                  className="w-full text-left px-3 py-2.5 rounded font-semibold text-sm hover:bg-[#F2ECE0] text-[#0C1813]"
                >
                  Contact Jaipur Workshop
                </button>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-4 border-t border-[#121815]/10 space-y-2">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); openQuickQuote(); }}
                className="w-full py-2.5 px-4 bg-[#0C1813] text-[#DFCA9F] text-xs font-bold uppercase rounded flex items-center justify-center gap-2 shadow"
              >
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>Request B2B Wholesale Quote</span>
              </button>

              <a 
                href="https://www.instagram.com/ramamtextiles"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 border border-[#E1306C]/30 text-[#0C1813] text-xs font-semibold rounded flex items-center justify-center gap-2"
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
