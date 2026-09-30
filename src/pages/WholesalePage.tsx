import React, { useState } from 'react';
import { 
  Building2, Sparkles, ShieldCheck, Truck, Download, CheckCircle2, 
  HelpCircle, ArrowRight, Globe2, Package, Mail, Layers, FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

interface WholesalePageProps {
  onNavigate: (path: string) => void;
}

export const WholesalePage: React.FC<WholesalePageProps> = ({ onNavigate }) => {
  const { showToast } = useApp();
  const [swatchKitRequested, setSwatchKitRequested] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [targetVolume, setTargetVolume] = useState('50 - 200 pcs');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');

  const handleSwatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !country) {
      showToast('Please provide your full contact details.', 'error');
      return;
    }
    setSwatchKitRequested(true);
    showToast('Fabric Swatch Booklet request received! We will courier tracking info shortly.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero */}
      <div className="bg-[#0E1612] text-white rounded-2xl p-8 sm:p-14 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1612] via-[#0E1612]/85 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Direct Jaipur Manufacturer & Exporter</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Wholesale B2B Supply & Global Export
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Direct-from-source artisan wholesale pricing for boutiques, department stores, and international fashion brands. Low MOQs, certified colorfast pure cotton, and reliable worldwide logistics.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#bfa238] text-[#0E1612] font-serif font-bold text-xs uppercase tracking-widest rounded shadow transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Wholesale Ready Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#swatch-kit"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-stone-400/40 font-serif font-semibold text-xs uppercase tracking-widest rounded backdrop-blur-sm transition-colors inline-flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-[#D4AF37]" />
              <span>Order Physical Swatch Kit</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Pillars of B2B Wholesale */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#FAF7F2] p-6 rounded-xl border border-amber-900/15 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-[#0E1612] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-lg mb-4">
            50
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-base">Low Minimum Order Qty</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Start with only 50 pieces per style with mixed size breakdown (S, M, L, XL, XXL) to test market traction before scaling.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-6 rounded-xl border border-amber-900/15 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-[#0E1612] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-lg mb-4">
            %
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-base">Tiered Volume Discounts</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Enjoy 40% to 65% off retail reference prices with additional volume rebates for recurring commercial contracts.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-6 rounded-xl border border-amber-900/15 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-[#0E1612] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-lg mb-4">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-base">Global Air & Sea Cargo</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Doorstep delivery via DHL / FedEx Express (4-7 business days) or sea freight container (FOB Mundra / Nhava Sheva).
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-6 rounded-xl border border-amber-900/15 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-[#0E1612] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-lg mb-4">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-base">Full Export Documentation</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Certificate of Origin, Commercial Invoices, Packing Lists, GSP / Form A, and Phytosanitary certification provided.
          </p>
        </div>
      </div>

      {/* Order Swatch Booklets Form Section */}
      <div id="swatch-kit" className="scroll-mt-24 bg-[#F6F2EA] p-8 sm:p-12 rounded-2xl border border-amber-900/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#942C29] font-bold">Physical Touch & Feel</div>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Request A Ramam Textile Swatch Booklet
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              We courier a curated swatch folder containing 25+ real hand block-printed pure cotton swatches (Cambric 60s, Mulmul Muslin, Indigo Dabu, Chanderi Silk) directly to your studio or office.
            </p>

            <div className="space-y-2 text-xs text-stone-700 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Includes colorfastness wash test swatches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Includes 2026 FOB price index booklet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Couriered worldwide via DHL Express</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-stone-200">
            {swatchKitRequested ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Swatch Kit Dispatched for Processing!</h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Thank you {name} ({company}). Our dispatch team in Jaipur is assembling your bespoke swatch booklet. You will receive an AWB tracking code and export catalog directly on {email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSwatchSubmit} className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-stone-900 pb-2 border-b border-stone-200">
                  Buyer Swatch Kit Courier Request
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Boutique / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bloom & Loom Sydney"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@bloomandloom.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Target Order Volume
                    </label>
                    <select
                      value={targetVolume}
                      onChange={e => setTargetVolume(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    >
                      <option value="50 - 200 pcs">50 - 200 pcs (Boutique Starter)</option>
                      <option value="200 - 1000 pcs">200 - 1,000 pcs (Multi-store)</option>
                      <option value="1000+ pcs">1,000+ pcs (Enterprise / Private Label)</option>
                      <option value="Fabric yardage">Fabric Yardage (100+ meters)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Studio Shipping Address & Destination Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Complete physical courier delivery address with City and Postal Code"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0E1612] text-amber-100 font-serif font-bold text-xs uppercase tracking-widest rounded shadow hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors"
                >
                  Request Courier Swatch Folder
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
