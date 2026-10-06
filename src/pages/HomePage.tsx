import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, ShieldCheck, Truck, Layers, Award, CheckCircle2, 
  Download, Eye, PhoneCall, ChevronRight, Compass, Heart, Scissors, Clock, Globe2, MapPin, Feather
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

// Simulated real-time recent custom orders from global boutiques
const RECENT_ORDERS = [
  { name: 'Louis Carter', city: 'London, UK', item: 'Royal Bengal Tiger Quilted Duffle', time: '18 mins ago', qty: '50 Pcs' },
  { name: 'Elena Rostova', city: 'Milan, Italy', item: 'Sanganer Rose 3-Piece Vanity Trio', time: '42 mins ago', qty: '120 Sets' },
  { name: 'Sophie Laurent', city: 'Paris, France', item: 'Bagru Indigo Mud-Resist Weekender', time: '1 hour ago', qty: '80 Pcs' },
  { name: 'Aarav Patel', city: 'Mumbai, India', item: 'Marigold Botanical Quilted Tote', time: '2 hours ago', qty: '35 Pcs' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { openQuickQuote, showToast } = useApp();
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [activeCraftCluster, setActiveCraftCluster] = useState<'sanganer' | 'bagru' | 'kantha'>('sanganer');
  const [catalogEmail, setCatalogEmail] = useState('');
  const [catalogDownloaded, setCatalogDownloaded] = useState(false);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  // Rotate social proof live pill every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOrderIndex(prev => (prev + 1) % RECENT_ORDERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeOrder = RECENT_ORDERS[currentOrderIndex];

  const filteredProducts = activeCategoryTab === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategoryTab);

  const handleDownloadCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catalogEmail) return;
    setCatalogDownloaded(true);
    showToast('2026 Jaipur Wholesale Lookbook & Export Pricing sent to ' + catalogEmail, 'success');
  };

  return (
    <div className="space-y-16 md:space-y-24 bg-[#FFFDF9] text-[#1F1612]">
      
      {/* =========================================================================
          1. HERO SECTION - SIGNATURE CRAFT OF PINK CITY SPLIT HERO
          ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Subtext, Action Buttons & Live Order Proof */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-left">
              
              {/* Crafted in Jaipur Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-xs font-bold tracking-wider uppercase font-royal-title shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C8376B]" />
                <span>CRAFTED IN JAIPUR</span>
              </div>

              {/* Editorial Headline */}
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[66px] font-medium text-[#1F1612] leading-[1.08] tracking-tight">
                The Art of Block Printing, <span className="italic font-editorial font-normal text-[#C8376B]">Crafted</span> in Jaipur.
              </h1>

              {/* Subtext */}
              <p className="text-stone-600 font-royal-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                Discover thoughtfully crafted fabrics, quilted travel duffles, and handmade vanity pouches inspired by traditional block-printing techniques and the rich textile heritage of Jaipur.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="pill-btn-rose flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg"
                >
                  <span>Explore Collection ({PRODUCTS.length} Styles)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { onNavigate('/custom-manufacturing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="pill-btn-outline flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full"
                >
                  <Scissors className="w-4 h-4 text-[#C8376B]" />
                  <span>Custom Batch &amp; Bulk</span>
                </button>
              </div>

              {/* Micro-Badges: Pure Cotton & Global Export */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-stone-600 font-medium font-royal-body">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Low MOQ: 25 Pcs</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Padded Combed Cotton</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Worldwide DHL Express</span>
                </span>
              </div>

              {/* Live Order Social Proof Pill */}
              <div className="pt-4">
                <div className="inline-flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-[#F3CAD6]/80 shadow-md transition-all animate-fade-in max-w-md">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FBEAE5] shrink-0 border border-[#F3CAD6]">
                    <img 
                      src="./products/duffle-kantha-patchwork.jpg" 
                      alt="Order thumbnail"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-left font-royal-body">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8376B] font-royal-title">
                        ✨ CUSTOM BATCH PLACED
                      </span>
                      <span className="text-[10px] text-stone-400">•</span>
                      <span className="text-[10px] text-stone-500">{activeOrder.time}</span>
                    </div>
                    <p className="text-xs font-bold text-[#1F1612] line-clamp-1">
                      {activeOrder.name} ({activeOrder.city}) — <span className="font-normal text-stone-600">{activeOrder.item}</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Blush Card with Artisan Patchwork Bag & Rotating Seal */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="relative bg-[#FBEAE5] rounded-[36px] p-5 sm:p-7 border border-[#F3CAD6]/70 shadow-2xl overflow-hidden">
                
                {/* Floating Top-Left Artisan Patchwork Badge */}
                <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md border border-stone-200/80 flex items-center gap-2 text-xs font-bold text-[#1F1612]">
                  <span className="text-[#C8376B] text-sm">🪄</span>
                  <span className="font-royal-title tracking-wider text-[11px]">ARTISAN PATCHWORK</span>
                </div>

                {/* Floating Top-Right Rotating Circular Seal */}
                <div className="absolute top-5 right-5 z-20">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1F1612] text-[#FAF3DC] flex items-center justify-center shadow-xl border border-[#D4AF37]/50">
                    <svg className="w-full h-full animate-spin-seal" viewBox="0 0 100 100">
                      <path
                        id="heroSealPath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text className="text-[8.5px] font-bold uppercase tracking-[0.22em] fill-[#FAF3DC]">
                        <textPath href="#heroSealPath" startOffset="0%">
                          • 100% ARTISAN • JAIPUR HANDBLOCK •
                        </textPath>
                      </text>
                    </svg>
                    {/* Center Gold Star Emblem */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[#E5A93C] text-base sm:text-lg">✤</span>
                    </div>
                  </div>
                </div>

                {/* Hero Showcase Image */}
                <div className="aspect-[4/4.5] rounded-[28px] overflow-hidden bg-white shadow-inner relative group">
                  <img
                    src="./products/duffle-kantha-patchwork.jpg"
                    alt="Artisan Jaipur Hand Block Quilted Patchwork Duffle Bag"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Shade at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1F1612]/70 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5E6B5] font-royal-title">
                        Signature Collection
                      </span>
                      <h3 className="font-playfair text-lg sm:text-xl font-bold text-white">
                        Barmer Kantha Quilted Duffle
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Small Bottom Tag */}
                <div className="mt-4 flex items-center justify-between text-xs text-stone-600 font-royal-body px-1">
                  <span className="font-medium">Hand-stitched channel padding</span>
                  <button 
                    onClick={() => { onNavigate('/category/bags'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-[#C8376B] hover:text-[#1F1612] font-bold font-royal-title flex items-center gap-1"
                  >
                    <span>View Duffle Bags</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. JAIPUR CRAFT CLUSTERS INTERACTIVE ATLAS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-[32px] p-6 sm:p-10 border border-stone-200 shadow-lg relative overflow-hidden">
          
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-xs font-bold tracking-wider uppercase font-royal-title mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#C8376B]" />
              <span>Rajasthan Textile Heritage Clusters</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-4xl text-[#1F1612] font-bold">
              The Artisan Craft Quarters of Jaipur
            </h2>
            <p className="text-stone-600 font-royal-body text-sm sm:text-base mt-2">
              Every Ramam Textiles piece originates in centuries-old Rajasthani craft clusters, where generational master artisans preserve UNESCO-recognized block carving and hand-dye traditions.
            </p>
          </div>

          {/* Interactive Cluster Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setActiveCraftCluster('sanganer')}
              className={`p-5 rounded-2xl text-left transition-all border-2 ${
                activeCraftCluster === 'sanganer'
                  ? 'bg-white border-[#C8376B] shadow-xl ring-2 ring-[#C8376B]/20'
                  : 'bg-white/80 border-stone-200 hover:bg-white hover:border-[#C8376B]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">🪷</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FDF0F3] text-[#C8376B] font-royal-title">Fine Florals</span>
              </div>
              <h3 className="font-playfair font-bold text-base text-[#1F1612]">Sanganer Atelier</h3>
              <p className="text-xs text-stone-600 font-royal-body mt-1">Delicate botanical bootas and Mughal trellis patterns printed on pure white combed cotton.</p>
            </button>

            <button
              onClick={() => setActiveCraftCluster('bagru')}
              className={`p-5 rounded-2xl text-left transition-all border-2 ${
                activeCraftCluster === 'bagru'
                  ? 'bg-white border-[#1D456B] shadow-xl ring-2 ring-[#1D456B]/20'
                  : 'bg-white/80 border-stone-200 hover:bg-white hover:border-[#1D456B]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">🌿</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E8F0F8] text-[#1D456B] font-royal-title">Dabu Mud-Resist</span>
              </div>
              <h3 className="font-playfair font-bold text-base text-[#1D456B]">Bagru Indigo Works</h3>
              <p className="text-xs text-stone-600 font-royal-body mt-1">Natural fermented indigo, clay mud-resist stamps, and sun-curing on riverbank drying fields.</p>
            </button>

            <button
              onClick={() => setActiveCraftCluster('kantha')}
              className={`p-5 rounded-2xl text-left transition-all border-2 ${
                activeCraftCluster === 'kantha'
                  ? 'bg-white border-[#937319] shadow-xl ring-2 ring-[#937319]/20'
                  : 'bg-white/80 border-stone-200 hover:bg-white hover:border-[#937319]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">🧵</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FEFCE8] text-[#937319] font-royal-title">Hand Quilting</span>
              </div>
              <h3 className="font-playfair font-bold text-base text-[#937319]">Barmer Kantha Stitching</h3>
              <p className="text-xs text-stone-600 font-royal-body mt-1">Double-channel padded cotton batting, running kantha embroidery, and candy-stripe piping.</p>
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs font-royal-title">
            <span className="text-[#1F1612] font-bold">👑 GI-Certified Jaipur Hand Block Craftsmanship</span>
            <button 
              onClick={() => { onNavigate('/craftsmanship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[#C8376B] hover:text-[#1F1612] font-bold flex items-center gap-1"
            >
              <span>Explore full craft story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CATEGORY PILLARS SHOWCASE (HAVELI ARCH CARDS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-xs font-bold tracking-wider uppercase font-royal-title mb-3">
            <span>👑 Curated Jaipur Haveli Lines</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
            Handcrafted Masterpieces of Rajasthan
          </h2>
          <p className="text-stone-600 font-royal-body text-base sm:text-lg leading-relaxed mt-2">
            Authentic Jaipur quilted duffles, ruffle tote bags, 3-piece vanity organizer sets, and yoga mat carriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => { onNavigate(`/category/${cat.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group relative h-96 rounded-[28px] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-stone-200 hover:border-[#C8376B]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612] via-[#1F1612]/40 to-transparent group-hover:via-[#1F1612]/60 transition-colors" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
                <span className="text-[11px] font-royal-title uppercase tracking-widest text-[#E5A93C] mb-1 font-bold">
                  🪷 {cat.badge || 'Jaipur Workshop'}
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white group-hover:text-[#FAF3DC] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs font-royal-body text-stone-200 mt-1 line-clamp-2">
                  {cat.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-royal-title uppercase tracking-widest text-[#E5A93C] group-hover:translate-x-1.5 transition-transform font-bold">
                  <span>View Wholesale Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. SIGNATURE PRODUCTS WITH PILL FILTER TABS
          ========================================================================= */}
      <section className="bg-[#FAF7F2] py-16 md:py-24 border-y border-stone-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C8376B] font-bold mb-2 font-royal-title">
                👑 Ready-To-Order &amp; Custom Runs
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
                Signature Hand Block Quilted Creations
              </h2>
              <p className="text-stone-600 font-royal-body text-base mt-1">
                Authentic Jaipur handcrafted pieces with candy-stripe straps, pure cotton padding, and export-grade stitching.
              </p>
            </div>

            {/* Category Filter Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveCategoryTab('all')}
                className={`pill-nav-btn ${
                  activeCategoryTab === 'all'
                    ? 'pill-nav-btn-active bg-[#C8376B] text-white border-[#C8376B]'
                    : ''
                }`}
              >
                All Pieces ({PRODUCTS.length})
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`pill-nav-btn ${
                    activeCategoryTab === cat.id
                      ? 'pill-nav-btn-active bg-[#C8376B] text-white border-[#C8376B]'
                      : ''
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="pill-btn-rose inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-wider rounded-full shadow-xl"
            >
              <span>Explore Complete Jaipur Wholesale Catalog ({PRODUCTS.length} SKUs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. THE ARTISAN STORY & HERITAGE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase with Real Product */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="./products/duffle-pink-botanical.jpg"
                  alt="Jaipur Hand Block Printed Quilted Weekender Bag"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Royal Medallion */}
              <div className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-8 bg-[#1F1612] text-[#FAF3DC] p-6 sm:p-7 rounded-[28px] shadow-2xl border border-[#D4AF37]/60 max-w-xs">
                <div className="flex items-center gap-2 text-[#E5A93C] text-xs font-bold uppercase tracking-wider mb-1 font-royal-title">
                  <Award className="w-4 h-4 text-[#E5A93C]" />
                  <span>3rd Generation Jaipur Artistry</span>
                </div>
                <div className="font-playfair text-lg font-bold text-white">Pure Quilted Indian Cotton</div>
                <p className="text-[11px] font-royal-body text-stone-300 mt-1 leading-relaxed">
                  Every duffle and pouch is hand-stamped with wooden Sheesham blocks, channel-quilted with cotton batting, and finished with candy-stripe piping.
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-xs font-bold tracking-wider uppercase font-royal-title">
              <Sparkles className="w-3.5 h-3.5 text-[#C8376B]" />
              <span>Living Heritage of Rajasthan</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-[#1F1612] font-bold leading-tight">
              Where Ancient Mud-Resist Meets Modern Luxury Travel.
            </h2>

            <p className="text-stone-600 font-royal-body text-base sm:text-lg leading-relaxed">
              At <strong>Ramam Textiles</strong>, every bag is a tribute to the artisan quarters of Jaipur. In our Bagru and Sanganer workshops, master block-printers stamp intricate Mughal botanicals, delicate rose bootas, and vibrant wildlife art onto 100% pure combed cotton.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200 shadow-sm">
                <h4 className="font-royal-title font-bold text-[#1F1612] text-sm mb-1">Padded Channel Quilting</h4>
                <p className="text-xs font-royal-body text-stone-600">Shock-absorbing soft cotton batting that provides structured shape and travel durability.</p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200 shadow-sm">
                <h4 className="font-royal-title font-bold text-[#1F1612] text-sm mb-1">Candy-Stripe Trims</h4>
                <p className="text-xs font-royal-body text-stone-600">Dual-tone candy striped carry handles, piping, and detachable shoulder slings with brass clips.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => { onNavigate('/craftsmanship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="pill-btn-rose rounded-full px-6 py-3"
              >
                <span>Read The Craftsmanship Process</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { onNavigate('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="pill-btn-outline rounded-full px-6 py-3"
              >
                Our Jaipur Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. INTERACTIVE CUSTOM MANUFACTURING WIZARD SECTION
          ========================================================================= */}
      <section className="bg-[#1F1612] py-16 md:py-24 text-white relative overflow-hidden border-y border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8376B]/20 border border-[#C8376B]/40 text-[#FDF0F3] text-xs font-bold tracking-wider uppercase font-royal-title mb-3">
              <Scissors className="w-3.5 h-3.5 text-[#C8376B]" />
              <span>Private Label &amp; OEM Studio</span>
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF3DC]">
              Launch Your Custom Quilted Bag Collection
            </h2>
            <p className="text-stone-300 font-royal-body text-base sm:text-lg mt-2">
              Customize print artwork, bag dimensions, zipper pullers, and woven brand labels with direct-from-factory Jaipur pricing.
            </p>
          </div>

          {/* Interactive Wizard Component */}
          <div className="max-w-4xl mx-auto">
            <CustomManufacturingWizard />
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. EDITORIAL LOOKBOOK PREVIEW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C8376B] font-bold mb-2 font-royal-title">
              🪷 Editorial Visuals
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
              2026 Quilted Collection Lookbook
            </h2>
            <p className="text-stone-600 font-royal-body text-base mt-1">
              Authentic Jaipur hand block-printed duffles, totes, vanity boxes, and yoga mat bags.
            </p>
          </div>

          <button
            onClick={() => { onNavigate('/lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="pill-btn-outline rounded-full text-xs font-bold uppercase tracking-wider"
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
              className="group relative rounded-[28px] overflow-hidden shadow-lg cursor-pointer aspect-[3/4] bg-white border border-stone-200 hover:border-[#C8376B] transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1612] via-[#1F1612]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="text-[10px] font-royal-title uppercase tracking-widest text-[#E5A93C] font-bold">{item.season}</span>
                <h3 className="font-playfair text-xl font-bold text-white mt-1 group-hover:text-[#F5E6B5] transition-colors">{item.title}</h3>
                <p className="text-xs font-royal-body text-stone-300 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. WHOLESALE BUYER ADVANTAGES & LOGISTICS
          ========================================================================= */}
      <section className="bg-[#FAF7F2] py-16 md:py-20 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-[#C8376B] font-bold mb-2 font-royal-title">
              👑 Jaipur B2B Manufacturing Partner
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
              Why Global Boutiques Partner With Ramam Textiles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-[28px] shadow-sm border border-stone-200 hover:border-[#C8376B] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#FDF0F3] text-[#C8376B] rounded-2xl flex items-center justify-center mb-6 border border-[#F3CAD6]">
                <ShieldCheck className="w-6 h-6 text-[#C8376B]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#1F1612] mb-2">Strict 4-Point Quality Inspection</h3>
              <p className="text-xs font-royal-body text-stone-600 leading-relaxed">
                Every stitched bag undergoes zero-defect inspection for zipper durability, strap tensile strength, quilting alignment, and clean edge binding.
              </p>
            </div>

            <div className="p-8 bg-white rounded-[28px] shadow-sm border border-stone-200 hover:border-[#C8376B] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#FDF0F3] text-[#C8376B] rounded-2xl flex items-center justify-center mb-6 border border-[#F3CAD6]">
                <Truck className="w-6 h-6 text-[#C8376B]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#1F1612] mb-2">Doorstep Air Express Freight</h3>
              <p className="text-xs font-royal-body text-stone-600 leading-relaxed">
                Direct DHL / FedEx Express air shipments (4-7 business days) with full Certificate of Origin and export clearance handled seamlessly.
              </p>
            </div>

            <div className="p-8 bg-white rounded-[28px] shadow-sm border border-stone-200 hover:border-[#C8376B] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#FDF0F3] text-[#C8376B] rounded-2xl flex items-center justify-center mb-6 border border-[#F3CAD6]">
                <Scissors className="w-6 h-6 text-[#C8376B]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#1F1612] mb-2">Low MOQ (25 Pcs) &amp; Private Label</h3>
              <p className="text-xs font-royal-body text-stone-600 leading-relaxed">
                Start with only 25 pieces per style. Custom brand woven neck tags, hangtags, and packaging are supported seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8B. GLOBAL BOUTIQUE REVIEWS & CLIENT PROOF
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-xs font-bold font-royal-title uppercase tracking-wider mb-2">
            <span>⭐️ Verified Retailer &amp; Boutique Reviews</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
            Trusted by Luxury Boutiques Worldwide
          </h2>
          <p className="text-stone-600 font-royal-body text-base mt-2">
            Over 140+ independent lifestyle stores, resorts, and private labels rely on Ramam Textiles for authentic Jaipur craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-[28px] border border-stone-200 shadow-sm hover:border-[#C8376B] hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic font-royal-body">
                "The channel quilting and hand block print alignment on the weekender duffle bags exceeded our expectations. Our customers in Soho loved the authentic cotton feel. We reordered 150 more pieces within three weeks."
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h5 className="font-royal-title font-bold text-xs text-[#1F1612]">Charlotte Vance</h5>
                <span className="text-[10px] text-stone-500">Maison &amp; Fleur Boutique • London, UK</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Verified B2B</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-[28px] border border-stone-200 shadow-sm hover:border-[#C8376B] hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic font-royal-body">
                "Ramam Textiles custom embroidered our brand tags onto 200 units of the playing card vanity cases. The packaging was immaculate, and FedEx delivery to Milan was flawless with full Certificate of Origin."
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h5 className="font-royal-title font-bold text-xs text-[#1F1612]">Matteo Moretti</h5>
                <span className="text-[10px] text-stone-500">Moretti Lifestyle Concept • Milan, Italy</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Verified B2B</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-[28px] border border-stone-200 shadow-sm hover:border-[#C8376B] hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 text-sm">★★★★★</div>
              <p className="text-xs text-stone-700 leading-relaxed italic font-royal-body">
                "Finding an authentic Jaipur manufacturer with low MOQs and genuine vegetable-dyed cotton was tough until we connected with Ramam Textiles. Their WhatsApp communication and sample turnaround are world-class."
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h5 className="font-royal-title font-bold text-xs text-[#1F1612]">Hannah Brooks</h5>
                <span className="text-[10px] text-stone-500">Sanctuary Resort Studio • Byron Bay, Australia</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Verified B2B</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CATALOG DOWNLOAD
          ========================================================================= */}
      <section className="bg-[#1F1612] py-16 text-white border-t border-[#D4AF37]/30 shadow-2xl relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-16 h-16 bg-[#D4AF37]/20 border border-[#D4AF37]/60 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37] shadow-lg">
            <Download className="w-8 h-8" />
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FAF3DC] mb-3">
            Download 2026 Wholesale Jaipur Bags Catalog
          </h2>
          <p className="text-stone-300 font-royal-body text-base max-w-2xl mx-auto mb-8">
            Receive our high-resolution line sheet featuring all {PRODUCTS.length} ready-to-order Jaipur hand block quilted bag designs, fabric swatches, and FOB wholesale price tiers.
          </p>

          {catalogDownloaded ? (
            <div className="p-6 bg-emerald-950/70 border border-emerald-500/50 rounded-2xl max-w-md mx-auto text-emerald-200 text-sm flex items-center justify-center gap-3 shadow-lg font-royal-body">
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
                className="flex-1 px-5 py-3.5 bg-white/10 border border-[#D4AF37]/50 rounded-full text-sm text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] shadow-inner font-royal-body"
              />
              <button
                type="submit"
                className="pill-btn-rose px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Instant Download</span>
                <Download className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          10. JOURNAL / JAIPUR CRAFT CHRONICLES PREVIEW
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C8376B] font-bold mb-2 font-royal-title">
              👑 Jaipur Craft Chronicles
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl text-[#1F1612] font-bold tracking-tight">
              Artisan Stories &amp; Textile Heritage
            </h2>
          </div>

          <button
            onClick={() => { onNavigate('/journal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="pill-btn-outline rounded-full text-xs font-bold uppercase tracking-wider"
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
              className="group bg-white rounded-[28px] overflow-hidden shadow-sm border border-stone-200 hover:border-[#C8376B] hover:shadow-2xl transition-all cursor-pointer flex flex-col hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1F1612]/95 text-[#FAF3DC] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-royal-title border border-[#D4AF37]/40 shadow-sm">
                  🪷 {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between font-royal-body">
                <div>
                  <div className="text-[11px] text-stone-500 mb-2 flex items-center gap-2 font-mono">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-[#1F1612] group-hover:text-[#C8376B] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-royal-title font-bold text-[#1F1612]">
                  <span className="text-[#C8376B]">Read Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C8376B]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
