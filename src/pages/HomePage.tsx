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

  const filteredProducts = activeCategoryTab === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategoryTab);

  const handleDownloadCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catalogEmail) return;
    setCatalogDownloaded(true);
    showToast('2026 Wholesale Lookbook & Export Pricing sent to ' + catalogEmail, 'success');
  };

  return (
    <div className="space-y-16 md:space-y-24 bg-[#FAF7EE] text-[#11221B]">
      {/* 1. HERO SECTION - JAIPUR EMERALD COURT & REGAL SANDSTONE */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center bg-[#0B241C] text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('./products/duffle-indigo.jpg')`
          }}
        />
        {/* Royal Jaipur Emerald & Forest Gemstone Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061711] via-[#0E2F23]/85 to-[#0B241C]/90" />
        {/* Subtle Rajasthani Jaali Lattice Overlay */}
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
          {/* Royal Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#11352A] border-2 border-[#D4AF37] text-[#FAF3DC] text-xs font-bold tracking-widest uppercase mb-6 shadow-xl animate-fade-in font-royal-title">
            <span className="text-[#D4AF37] text-sm">👑</span>
            <span>Heritage Artisan Guild of Jaipur • 100% Pure Quilted Cotton • B2B Export</span>
          </div>

          {/* Heading */}
          <h1 className="font-royal-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF3DC] max-w-5xl leading-[1.12] mb-6 drop-shadow-md">
            Authentic Jaipur Hand Block-Printed Bags, <br className="hidden sm:inline" />
            <span className="italic font-editorial font-normal gold-shimmer-text">Quilted Travel Duffles &amp; Accessories.</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-3xl text-sm sm:text-base md:text-lg text-stone-200 font-royal-body leading-relaxed mb-10 text-center">
            Handcrafted in Bagru &amp; Sanganer workshops using pure combed cotton, traditional wooden block stamps, and double-channel padding. Direct export manufacturer supplying luxury boutiques worldwide with low MOQs from 25 pieces.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md sm:max-w-none">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto btn-royal-gold flex items-center justify-center gap-2 shadow-2xl rounded-xl"
            >
              <span>Explore Jaipur Collection ({PRODUCTS.length} Styles)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { onNavigate('/custom-manufacturing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto btn-royal-outline flex items-center justify-center gap-2 rounded-xl"
            >
              <Scissors className="w-4 h-4 text-[#D4AF37]" />
              <span>Custom OEM &amp; Private Label</span>
            </button>
          </div>

          {/* Key Value Micro-metrics with Gold Accents */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-14 border-t border-[#D4AF37]/30 mt-14 w-full max-w-4xl text-left">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#11352A] border border-[#D4AF37]/50 shadow-md">
              <div className="p-2.5 rounded-xl bg-[#0B241C] text-[#F5E6B5] border border-[#D4AF37]/40">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-[#FAF3DC] font-royal-title font-bold text-xs">Low MOQ 25 Pcs</div>
                <div className="text-stone-300 text-[11px] font-royal-body font-light">Mix patterns &amp; styles</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#11352A] border border-[#D4AF37]/50 shadow-md">
              <div className="p-2.5 rounded-xl bg-[#0B241C] text-[#F5E6B5] border border-[#D4AF37]/40">
                <Layers className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-[#FAF3DC] font-royal-title font-bold text-xs">100% Pure Cotton</div>
                <div className="text-stone-300 text-[11px] font-royal-body font-light">Padded channel quilting</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#11352A] border border-[#D4AF37]/50 shadow-md">
              <div className="p-2.5 rounded-xl bg-[#0B241C] text-[#F5E6B5] border border-[#D4AF37]/40">
                <Globe2 className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-[#FAF3DC] font-royal-title font-bold text-xs">Worldwide Export</div>
                <div className="text-stone-300 text-[11px] font-royal-body font-light">DHL / FedEx air cargo</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#11352A] border border-[#D4AF37]/50 shadow-md">
              <div className="p-2.5 rounded-xl bg-[#0B241C] text-[#F5E6B5] border border-[#D4AF37]/40">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-[#FAF3DC] font-royal-title font-bold text-xs">Azo-Free Dyes</div>
                <div className="text-stone-300 text-[11px] font-royal-body font-light">Colorfast &amp; pre-washed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLARS SHOWCASE WITH JHAROKHA ARCHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="royal-seal-emerald mb-3">
            <span>👑 Curated Jaipur Craft Lines</span>
          </div>
          <h2 className="font-royal-heading text-3xl sm:text-4xl text-[#0B241C] font-bold tracking-tight">
            Handcrafted Masterpieces of Rajasthan
          </h2>
          <div className="ornate-divider" />
          <p className="text-stone-600 font-royal-body text-base sm:text-lg leading-relaxed">
            Authentic Jaipur quilted duffles, ruffle tote bags, 3-piece vanity organizer sets, and yoga mat carriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => { onNavigate(`/category/${cat.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-[#FAF7EE] border-2 border-[#D4AF37]/35 hover:border-[#D4AF37]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061711] via-[#0B241C]/50 to-transparent group-hover:via-[#0B241C]/70 transition-colors" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
                <span className="text-[11px] font-royal-title uppercase tracking-widest text-[#D4AF37] mb-1 font-bold">
                  🪷 {cat.badge || 'Jaipur Workshop'}
                </span>
                <h3 className="font-royal-heading text-xl sm:text-2xl font-bold text-[#FAF3DC] group-hover:text-[#F5E6B5] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs font-royal-body text-stone-200 mt-1 line-clamp-2">
                  {cat.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-royal-title uppercase tracking-widest text-[#D4AF37] group-hover:translate-x-1.5 transition-transform font-bold">
                  <span>View Wholesale Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE PRODUCTS WITH INTERACTIVE TABS */}
      <section className="bg-[#F3EEDB] py-16 md:py-24 border-y border-[#D4AF37]/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#164335] font-bold mb-2 font-royal-title">
                👑 Ready-To-Order &amp; Custom Runs
              </div>
              <h2 className="font-royal-heading text-3xl sm:text-4xl text-[#0B241C] font-bold tracking-tight">
                Signature Hand Block Quilted Creations
              </h2>
              <p className="text-stone-700 font-royal-body text-base mt-1">
                Authentic Jaipur handcrafted pieces with candy-stripe straps, pure cotton padding, and export-grade stitching.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveCategoryTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap font-royal-title shadow-sm ${
                  activeCategoryTab === 'all'
                    ? 'bg-gradient-to-r from-[#11352A] to-[#0B241C] text-[#FAF3DC] border border-[#D4AF37]/50 shadow-md'
                    : 'bg-white text-[#0B241C] hover:bg-[#FAF7EE] border border-[#D4AF37]/30'
                }`}
              >
                All Pieces ({PRODUCTS.length})
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap font-royal-title shadow-sm ${
                    activeCategoryTab === cat.id
                      ? 'bg-gradient-to-r from-[#11352A] to-[#0B241C] text-[#FAF3DC] border border-[#D4AF37]/50 shadow-md'
                      : 'bg-white text-[#0B241C] hover:bg-[#FAF7EE] border border-[#D4AF37]/30'
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
              className="btn-royal-emerald inline-flex items-center gap-3 shadow-xl rounded-xl"
            >
              <span>Explore Complete Jaipur Wholesale Catalog ({PRODUCTS.length} SKUs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. THE ARTISAN STORY & HERITAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase with Real Product */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF7EE]">
                <img
                  src="./products/duffle-pink-botanical.jpg"
                  alt="Jaipur Hand Block Printed Quilted Weekender Bag"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Royal Medallion */}
              <div className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-8 bg-[#0B241C] text-[#FAF3DC] p-6 sm:p-7 rounded-3xl shadow-2xl border-2 border-[#D4AF37] max-w-xs">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1 font-royal-title">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>3rd Generation Jaipur Artistry</span>
                </div>
                <div className="font-royal-heading text-lg font-bold text-white">Pure Quilted Indian Cotton</div>
                <p className="text-[11px] font-royal-body text-stone-300 mt-1 leading-relaxed">
                  Every duffle and pouch is hand-stamped with wooden Sheesham blocks, channel-quilted with cotton batting, and finished with candy-stripe piping.
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="royal-seal-emerald">
              <Sparkles className="w-3.5 h-3.5 text-[#164335]" />
              <span>Living Heritage of Rajasthan</span>
            </div>

            <h2 className="font-royal-heading text-3xl sm:text-4xl lg:text-5xl text-[#0B241C] font-bold leading-tight">
              Where Ancient Mud-Resist Meets Modern Luxury Travel.
            </h2>

            <p className="text-stone-700 font-royal-body text-base sm:text-lg leading-relaxed">
              At <strong>Ramam Textiles</strong>, every bag is a tribute to the artisan quarters of Jaipur. In our Bagru and Sanganer workshops, master block-printers stamp intricate Mughal botanicals, delicate rose bootas, and vibrant wildlife art onto 100% pure combed cotton.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#F0F7F4] rounded-2xl border border-[#D4AF37]/30 shadow-sm">
                <h4 className="font-royal-title font-bold text-[#0B241C] text-sm mb-1">Padded Channel Quilting</h4>
                <p className="text-xs font-royal-body text-stone-600">Shock-absorbing soft cotton batting that provides structured shape and travel durability.</p>
              </div>

              <div className="p-4 bg-[#F0F7F4] rounded-2xl border border-[#D4AF37]/30 shadow-sm">
                <h4 className="font-royal-title font-bold text-[#0B241C] text-sm mb-1">Candy-Stripe Trims</h4>
                <p className="text-xs font-royal-body text-stone-600">Dual-tone candy striped carry handles, piping, and detachable shoulder slings with brass clips.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => { onNavigate('/craftsmanship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-royal-emerald flex items-center gap-2 rounded-xl"
              >
                <span>Read The Craftsmanship Process</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { onNavigate('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-royal-sand-outline rounded-xl"
              >
                Our Jaipur Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CUSTOM MANUFACTURING WIZARD SECTION */}
      <section className="bg-gradient-to-b from-[#0B241C] via-[#0E2F23] to-[#0B241C] py-16 md:py-24 text-white relative overflow-hidden border-y border-[#D4AF37]/40 shadow-2xl">
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-35 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="royal-seal mb-3">
              <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Private Label &amp; OEM Studio</span>
            </div>
            <h2 className="font-royal-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF3DC]">
              Launch Your Custom Quilted Bag Collection
            </h2>
            <div className="ornate-divider" />
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

      {/* 6. EDITORIAL LOOKBOOK PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#164335] font-bold mb-2 font-royal-title">
              🪷 Editorial Visuals
            </div>
            <h2 className="font-royal-heading text-3xl sm:text-4xl text-[#0B241C] font-bold tracking-tight">
              2026 Quilted Collection Lookbook
            </h2>
            <p className="text-stone-600 font-royal-body text-base mt-1">
              Authentic Jaipur hand block-printed duffles, totes, vanity boxes, and yoga mat bags.
            </p>
          </div>

          <button
            onClick={() => { onNavigate('/lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs font-royal-title uppercase tracking-widest text-[#11352A] font-bold hover:text-[#D4AF37] transition-colors"
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
              className="group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer aspect-[3/4] bg-[#FAF7EE] border-2 border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061711] via-[#061711]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="text-[10px] font-royal-title uppercase tracking-widest text-[#D4AF37] font-bold">{item.season}</span>
                <h3 className="font-royal-heading text-xl font-bold text-white mt-1 group-hover:text-[#F5E6B5] transition-colors">{item.title}</h3>
                <p className="text-xs font-royal-body text-stone-300 mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHOLESALE BUYER ADVANTAGES & LOGISTICS */}
      <section className="bg-[#F3EEDB] py-16 md:py-20 border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-[#164335] font-bold mb-2 font-royal-title">
              👑 B2B Manufacturing Partner
            </div>
            <h2 className="font-royal-heading text-3xl sm:text-4xl text-[#0B241C] font-bold tracking-tight">
              Why Global Boutiques Partner With Ramam Textiles
            </h2>
            <div className="ornate-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#D4AF37]/35 hover:border-[#D4AF37] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#F0F7F4] text-[#164335] rounded-2xl flex items-center justify-center mb-6 border border-[#D4AF37]/30">
                <ShieldCheck className="w-6 h-6 text-[#164335]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#0B241C] mb-2">Strict 4-Point Quality Inspection</h3>
              <p className="text-xs font-royal-body text-stone-600 leading-relaxed">
                Every stitched bag undergoes zero-defect inspection for zipper durability, strap tensile strength, quilting alignment, and clean edge binding.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#D4AF37]/35 hover:border-[#D4AF37] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#F0F7F4] text-[#164335] rounded-2xl flex items-center justify-center mb-6 border border-[#D4AF37]/30">
                <Truck className="w-6 h-6 text-[#164335]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#0B241C] mb-2">Doorstep Air Express Freight</h3>
              <p className="text-xs font-royal-body text-stone-600 leading-relaxed">
                Direct DHL / FedEx Express air shipments (4-7 business days) with full Certificate of Origin and export clearance handled seamlessly.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#D4AF37]/35 hover:border-[#D4AF37] hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-[#F0F7F4] text-[#164335] rounded-2xl flex items-center justify-center mb-6 border border-[#D4AF37]/30">
                <Scissors className="w-6 h-6 text-[#164335]" />
              </div>
              <h3 className="font-royal-title text-xl font-bold text-[#0B241C] mb-2">Low MOQ (25 Pcs) &amp; Private Label</h3>
              <p className="text-xs font-royal-body text-stone-600 leading-relaxed">
                Start with only 25 pieces per style. Custom brand woven neck tags, hangtags, and packaging are supported seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CATALOG DOWNLOAD */}
      <section className="bg-gradient-to-b from-[#0B241C] via-[#0E2F23] to-[#0B241C] py-16 text-white border-t border-[#D4AF37]/40 shadow-2xl relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-16 h-16 bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37] shadow-lg">
            <Download className="w-8 h-8" />
          </div>

          <h2 className="font-royal-heading text-3xl sm:text-4xl font-bold text-[#FAF3DC] mb-3">
            Download 2026 Wholesale Quilted Bags Catalog
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
                className="flex-1 px-4 py-3.5 bg-white/10 border border-[#D4AF37]/40 rounded-xl text-sm text-white placeholder-stone-300 focus:outline-none focus:border-[#D4AF37] shadow-inner font-royal-body"
              />
              <button
                type="submit"
                className="btn-royal-gold flex items-center justify-center gap-2 shadow-xl rounded-xl"
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
            <div className="text-xs uppercase tracking-widest text-[#164335] font-bold mb-2 font-royal-title">
              👑 Jaipur Craft Chronicles
            </div>
            <h2 className="font-royal-heading text-3xl sm:text-4xl text-[#0B241C] font-bold tracking-tight">
              Artisan Stories &amp; Textile Heritage
            </h2>
          </div>

          <button
            onClick={() => { onNavigate('/journal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-xs font-royal-title uppercase tracking-widest text-[#11352A] font-bold hover:text-[#D4AF37] transition-colors"
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
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#D4AF37]/35 hover:shadow-2xl transition-all cursor-pointer flex flex-col hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0B241C]/95 text-[#F5E6B5] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-royal-title border border-[#D4AF37]/40 shadow-sm">
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
                  <h3 className="font-royal-heading text-lg font-bold text-[#0B241C] group-hover:text-[#164335] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between text-xs font-royal-title font-bold text-[#0B241C]">
                  <span className="text-[#164335]">Read Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#164335]" />
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
