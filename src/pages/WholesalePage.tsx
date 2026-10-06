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
  const [targetVolume, setTargetVolume] = useState('25 - 200 pcs');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 font-royal-body">
      {/* Hero */}
      <div className="bg-[#1F1612] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden border border-[#D4AF37]/30 shadow-xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('./products/duffle-kantha-patchwork.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1612] via-[#1F1612]/90 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-xs font-bold font-royal-title uppercase tracking-widest shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#C8376B]" />
            <span>Direct Jaipur Manufacturer &amp; Exporter</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF3DC] leading-tight">
            Wholesale B2B Supply &amp; Global Export
          </h1>

          <p className="text-stone-300 font-royal-body text-base sm:text-lg leading-relaxed">
            Direct-from-source artisan wholesale pricing for boutiques, department stores, and international fashion brands. Low MOQs from 25 pieces, certified colorfast pure cotton, and reliable worldwide logistics.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="pill-btn-rose inline-flex items-center gap-2 shadow-xl px-7 py-3.5 text-xs font-bold uppercase rounded-full"
            >
              <span>Explore Wholesale Ready Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#swatch-kit"
              className="pill-btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase rounded-full bg-white text-[#1F1612]"
            >
              <Package className="w-4 h-4 text-[#C8376B]" />
              <span>Order Physical Swatch Kit</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Pillars of B2B Wholesale */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[28px] border border-stone-200 space-y-2 shadow-sm hover:border-[#C8376B] hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] text-[#C8376B] flex items-center justify-center font-playfair font-bold text-lg mb-4 border border-[#F3CAD6]">
            25
          </div>
          <h3 className="font-royal-title font-bold text-[#1F1612] text-base">Low Minimum Order Qty</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Start with only 25 pieces per style with mixed pattern &amp; color breakdown to test market traction before scaling.
          </p>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-stone-200 space-y-2 shadow-sm hover:border-[#C8376B] hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] text-[#C8376B] flex items-center justify-center font-playfair font-bold text-lg mb-4 border border-[#F3CAD6]">
            %
          </div>
          <h3 className="font-royal-title font-bold text-[#1F1612] text-base">Tiered Volume Discounts</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Enjoy 40% to 65% off retail reference prices with additional volume rebates for recurring commercial contracts.
          </p>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-stone-200 space-y-2 shadow-sm hover:border-[#C8376B] hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] text-[#C8376B] flex items-center justify-center font-playfair font-bold text-lg mb-4 border border-[#F3CAD6]">
            <Truck className="w-5 h-5 text-[#C8376B]" />
          </div>
          <h3 className="font-royal-title font-bold text-[#1F1612] text-base">Global Air &amp; Sea Cargo</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Doorstep delivery via DHL / FedEx Express (4-7 business days) or sea freight container (FOB Mundra / Nhava Sheva).
          </p>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-stone-200 space-y-2 shadow-sm hover:border-[#C8376B] hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0F3] text-[#C8376B] flex items-center justify-center font-playfair font-bold text-lg mb-4 border border-[#F3CAD6]">
            <FileCheck className="w-5 h-5 text-[#C8376B]" />
          </div>
          <h3 className="font-royal-title font-bold text-[#1F1612] text-base">Full Export Documentation</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Certificate of Origin, Commercial Invoices, Packing Lists, GSP / Form A, and Phytosanitary certification provided.
          </p>
        </div>
      </div>

      {/* Order Swatch Booklets Form Section */}
      <div id="swatch-kit" className="scroll-mt-24 bg-[#FAF7F2] p-8 sm:p-12 rounded-[32px] border border-stone-200 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF0F3] border border-[#F3CAD6] text-[#C8376B] text-xs font-bold font-royal-title uppercase tracking-wider">Physical Touch &amp; Feel</div>
            <h2 className="font-playfair text-3xl font-bold text-[#1F1612]">
              Request A Ramam Textile Swatch Booklet
            </h2>
            <p className="text-stone-600 font-royal-body text-base leading-relaxed">
              We courier a curated swatch folder containing 25+ real hand block-printed pure cotton swatches (Cambric 60s, Mulmul Muslin, Indigo Dabu, Chanderi Silk) directly to your studio or office.
            </p>

            <div className="space-y-2.5 text-xs text-[#1F1612] font-semibold pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Includes colorfastness wash test swatches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Includes 2026 FOB price index booklet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Couriered worldwide via DHL Express</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[28px] shadow-xl border border-stone-200">
            {swatchKitRequested ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#FDF0F3] border-2 border-[#C8376B] text-[#C8376B] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-9 h-9 text-[#C8376B]" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-[#1F1612]">Swatch Kit Dispatched for Processing!</h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Thank you {name} ({company}). Our dispatch team in Jaipur is assembling your bespoke swatch booklet. You will receive an AWB tracking code and export catalog directly on {email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSwatchSubmit} className="space-y-4 font-royal-body">
                <h3 className="font-playfair text-lg font-bold text-[#1F1612] pb-2 border-b border-stone-200">
                  👑 Buyer Swatch Kit Courier Request
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1612] mb-1 font-royal-title">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8376B] text-[#1F1612]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1612] mb-1 font-royal-title">
                      Boutique / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bloom &amp; Loom Sydney"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8376B] text-[#1F1612]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1612] mb-1 font-royal-title">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@bloomandloom.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8376B] text-[#1F1612]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1612] mb-1 font-royal-title">
                      Target Order Volume
                    </label>
                    <select
                      value={targetVolume}
                      onChange={e => setTargetVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8376B] text-[#1F1612]"
                    >
                      <option value="25 - 200 pcs">25 - 200 pcs (Boutique Starter)</option>
                      <option value="200 - 1000 pcs">200 - 1,000 pcs (Multi-store)</option>
                      <option value="1000+ pcs">1,000+ pcs (Enterprise / Private Label)</option>
                      <option value="Fabric yardage">Fabric Yardage (100+ meters)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1612] mb-1 font-royal-title">
                      Studio Shipping Address &amp; Destination Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Complete physical courier delivery address with City and Postal Code"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#C8376B] text-[#1F1612]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full pill-btn-rose text-xs font-bold uppercase tracking-widest shadow-lg rounded-full py-3.5"
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

export default WholesalePage;
