import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, ShieldCheck, Truck, Layers, Award, CheckCircle2, 
  Download, Eye, PhoneCall, ChevronRight, Compass, Heart, Scissors, Clock, Globe2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { JOURNAL_POSTS } from '../data/journal';
import { LOOKBOOK_ITEMS } from '../data/lookbook';
import { ProductCard } from '../components/ProductCard';
import { CustomManufacturingWizard } from '../components/CustomManufacturingWizard';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { openQuickQuote, showToast } = useApp();
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [catalogEmail, setCatalogEmail] = useState('');
  const [catalogDownloaded, setCatalogDownloaded] = useState(false);

  const featuredProducts = PRODUCTS.filter(p => p.isFeatured || p.isBestseller).slice(0, 8);
  const filteredProducts = activeCategoryTab === 'all' 
    ? featuredProducts 
    : PRODUCTS.filter(p => p.category === activeCategoryTab).slice(0, 8);

  const handleDownloadCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catalogEmail) return;
    setCatalogDownloaded(true);
    showToast('2026 Wholesale Lookbook & Export Pricing sent to ' + catalogEmail, 'success');
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-[#0E1612] text-white overflow-hidden">
        {/* Background Image Overlay with Grain / Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1612] via-[#0E1612]/70 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Jaipur Heritage • Global Luxury • Wholesale OEM</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-5xl leading-[1.1] mb-6 drop-shadow-sm">
            Authentic Jaipur Craftsmanship, <br className="hidden sm:inline" />
            <span className="italic font-serif font-light text-[#E5D3B3]">Modern Luxury Textiles.</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed mb-10 text-center">
            Manufacturer & exporter of hand block-printed apparel, quilted cotton bags, pure cambric fabrics, and custom private-label collections for boutique brands worldwide.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md sm:max-w-none">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#bfa238] text-[#0E1612] font-serif font-bold text-xs uppercase tracking-widest rounded shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Wholesale Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { onNavigate('/custom-manufacturing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-stone-400/40 font-serif font-semibold text-xs uppercase tracking-widest rounded backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Scissors className="w-4 h-4 text-[#D4AF37]" />
              <span>Custom OEM Manufacturing</span>
            </button>
          </div>

          {/* Key Value Micro-metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-16 border-t border-white/15 mt-16 w-full max-w-4xl text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-serif font-bold text-sm">Low MOQ 25-50 Pcs</div>
                <div className="text-stone-400 text-xs">Small batch & private label</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[#D4AF37]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-serif font-bold text-sm">100% Pure Cotton</div>
                <div className="text-stone-400 text-xs">Pre-shrunk 60s Cambric & Mulmul</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[#D4AF37]">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-serif font-bold text-sm">Worldwide Export</div>
                <div className="text-stone-400 text-xs">Doorstep air & sea cargo</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-serif font-bold text-sm">Azo-Free / Herbal</div>
                <div className="text-stone-400 text-xs">Certified non-toxic natural dyes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLARS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#942C29] font-bold mb-2">Curated Craft Collections</div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight">
            Explore By Manufacturing Category
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            From hand-quilted duffles and vanity cases to designer apparel and pure running fabric yardage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => { onNavigate(`/category/${cat.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group relative h-96 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1612] via-[#0E1612]/30 to-transparent group-hover:via-[#0E1612]/50 transition-colors" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37] mb-1 font-semibold">
                  {cat.badge || 'Jaipur Workshop'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#E5D3B3] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2 font-light">
                  {cat.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#D4AF37] group-hover:translate-x-1.5 transition-transform">
                  <span>View Wholesale Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE PRODUCTS WITH INTERACTIVE TABS */}
      <section className="bg-[#F6F2EA] py-16 md:py-20 border-y border-amber-900/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#942C29] font-bold mb-2">Ready-To-Order & Custom Runs</div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight">
                Signature Wholesale Creations
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Export-ready, pre-washed, hand block-printed by master craftsmen in Bagru & Sanganer.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveCategoryTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategoryTab === 'all'
                    ? 'bg-[#0E1612] text-amber-100 shadow'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                All Pieces
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeCategoryTab === cat.id
                      ? 'bg-[#0E1612] text-amber-100 shadow'
                      : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-8 py-4 bg-[#0E1612] text-amber-100 hover:bg-[#D4AF37] hover:text-[#0E1612] font-serif font-bold text-xs uppercase tracking-widest rounded shadow-lg transition-colors inline-flex items-center gap-3"
            >
              <span>View Complete 2026 Collection ({PRODUCTS.length} SKUs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. THE ARTISAN STORY & HERITAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
                  alt="Carving wooden block for Jaipur hand printing"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Badge */}
              <div className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-8 bg-[#0E1612] text-amber-100 p-6 rounded-xl shadow-2xl border border-amber-900/40 max-w-xs">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>3rd Generation Jaipur Artistry</span>
                </div>
                <div className="font-serif text-lg font-bold text-white">400+ Hand-Carved Wooden Blocks</div>
                <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                  Carved from seasoned Sheesham wood by master chisellers with up to 45 years of craft mastery.
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#942C29]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Living Heritage of Rajasthan</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-bold leading-tight">
              Where Ancient Mud-Resist Meets Global Haute Couture.
            </h2>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              At <strong>Ramam Textiles</strong>, every meter of fabric tells an authentic story of Jaipur. In the sunlit printing courtyards of Bagru and Sanganer, our artisan guilds practice the centuries-old art of <em>Dabu</em> (mud-resist printing) and <em>Sanganeri</em> botanical precision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F7F4EE] rounded-lg border border-amber-900/15">
                <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Natural Indigo Fermentation</h4>
                <p className="text-xs text-stone-600">Deep, living blue shades dipped multiple times in natural earthen fermentation vats.</p>
              </div>

              <div className="p-4 bg-[#F7F4EE] rounded-lg border border-amber-900/15">
                <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Pure 60s Cambric Cotton</h4>
                <p className="text-xs text-stone-600">Ultra-soft, feather-light, breathable cotton suited for luxury resort wear and tropical climates.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => { onNavigate('/craftsmanship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3.5 bg-[#0E1612] text-amber-100 hover:bg-[#D4AF37] hover:text-[#0E1612] font-serif text-xs uppercase font-bold tracking-widest rounded shadow transition-colors flex items-center gap-2"
              >
                <span>Read The Craftsmanship Process</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { onNavigate('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3.5 border border-stone-400 text-stone-800 hover:bg-stone-200 font-serif text-xs uppercase font-bold tracking-widest rounded transition-colors"
              >
                Our Jaipur Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CUSTOM MANUFACTURING WIZARD SECTION */}
      <section className="bg-[#0E1612] py-16 md:py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3">
              <Scissors className="w-3.5 h-3.5" />
              <span>Private Label & OEM Studio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Launch Your Own Luxury Fashion Line
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-3 font-light">
              Configure your garment specifications, choose from 100+ pure cotton & silk varieties, and get a fast transparent quote from our Jaipur factory floor.
            </p>
          </div>

          {/* Interactive Wizard Component */}
          <div className="max-w-4xl mx-auto">
            <CustomManufacturingWizard />
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL LOOKBOOK PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#942C29] font-bold mb-2">Editorial Visuals</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight">
              Autumn / Festive 2026 Lookbook
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Inspired by the palace frescoes of Jaipur and golden sunlit courtyards of Rajasthan.
            </p>
          </div>

          <button
            onClick={() => { onNavigate('/lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-stone-900 font-bold hover:text-[#942C29] transition-colors"
          >
            <span>View Full Editorial Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOOKBOOK_ITEMS.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              onClick={() => { onNavigate('/lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-[3/4]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">{item.season}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-1 group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHOLESALE BUYER ADVANTAGES & LOGISTICS */}
      <section className="bg-[#FAF7F2] py-16 md:py-20 border-t border-amber-900/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-[#942C29] font-bold mb-2">B2B Manufacturing Partner</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight">
              Why 120+ Boutiques & Global Designers Trust Ramam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-sm border border-stone-200 hover:border-amber-900/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Strict 4-Point Quality Inspection</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every meter of fabric and every stitched garment undergoes zero-defect inspection for colorfastness, block alignment, seam tension, and export barcoding.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm border border-stone-200 hover:border-amber-900/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-lg flex items-center justify-center mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Doorstep Air & Sea Export</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct DHL / FedEx Express air shipments (4-7 business days) and ocean container freight with full Certificate of Origin and export clearance handled seamlessly.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm border border-stone-200 hover:border-amber-900/40 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-rose-100 text-rose-900 rounded-lg flex items-center justify-center mb-6">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Flexible MOQ & Lab Dip Swatches</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Start with as low as 25-50 pieces per design. Request physical swatch booklets and prototype samples couriered to your studio before committing to production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CATALOG DOWNLOAD & NEWSLETTER HERO */}
      <section className="bg-[#0E1612] py-16 text-white border-t border-amber-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37]">
            <Download className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Download 2026 Wholesale Lookbook & Price List
          </h2>
          <p className="text-stone-300 text-sm max-w-2xl mx-auto mb-8 font-light">
            Receive our high-resolution lookbook featuring over 150+ ready-to-order Jaipur hand block print styles, fabric swatches, and FOB export price tiers.
          </p>

          {catalogDownloaded ? (
            <div className="p-6 bg-emerald-900/40 border border-emerald-500/50 rounded-lg max-w-md mx-auto text-emerald-200 text-sm flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <span>Catalog download link dispatched to your inbox! Check promotions/spam if delayed.</span>
            </div>
          ) : (
            <form onSubmit={handleDownloadCatalog} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your business email..."
                value={catalogEmail}
                onChange={e => setCatalogEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-white/10 border border-stone-400/40 rounded text-sm text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#bfa238] text-[#0E1612] font-serif font-bold text-xs uppercase tracking-widest rounded transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>Instant Download</span>
                <Download className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 9. JOURNAL / CRAFT CHRONICLES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#942C29] font-bold mb-2">Jaipur Craft Chronicles</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight">
              Artisan Stories & Textile Guides
            </h2>
          </div>

          <button
            onClick={() => { onNavigate('/journal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-stone-900 font-bold hover:text-[#942C29] transition-colors"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_POSTS.slice(0, 3).map(post => (
            <article 
              key={post.id}
              onClick={() => { onNavigate(`/journal/${post.slug}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0E1612]/90 text-[#D4AF37] px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-stone-500 mb-2 flex items-center gap-2 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#942C29] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-serif font-bold text-stone-900">
                  <span className="text-[#942C29]">Read Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
