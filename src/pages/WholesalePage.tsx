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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero */}
      <div className="bg-[#4D0E0D] text-white rounded-2xl p-8 sm:p-14 relative overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#380708] via-[#4D0E0D]/85 to-transparent" />
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-35 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="royal-seal mb-2">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>👑 Direct Jaipur Manufacturer &amp; Exporter</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FAF3DC] leading-tight">
            Wholesale B2B Supply &amp; Global Export
          </h1>

          <p className="text-stone-200 text-sm sm:text-base font-light leading-relaxed">
            Direct-from-source artisan wholesale pricing for boutiques, department stores, and international fashion brands. Low MOQs from 25 pieces, certified colorfast pure cotton, and reliable worldwide logistics.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-royal-gold inline-flex items-center gap-2 shadow-xl"
            >
              <span>Explore Wholesale Ready Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#swatch-kit"
              className="btn-royal-outline inline-flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-[#D4AF37]" />
              <span>Order Physical Swatch Kit</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Pillars of B2B Wholesale */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/35 space-y-2 shadow-md hover:border-[#D4AF37] hover:shadow-xl transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#4D0E0D] text-[#D4AF37] flex items-center justify-center font-heading font-bold text-lg mb-4 shadow-inner border border-[#D4AF37]/40">
            25
          </div>
          <h3 className="font-heading font-bold text-[#4D0E0D] text-base">Low Minimum Order Qty</h3>
          <p className="text-xs text-[#5C4540] leading-relaxed font-light">
            Start with only 25 pieces per style with mixed pattern &amp; color breakdown to test market traction before scaling.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/35 space-y-2 shadow-md hover:border-[#D4AF37] hover:shadow-xl transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#4D0E0D] text-[#D4AF37] flex items-center justify-center font-heading font-bold text-lg mb-4 shadow-inner border border-[#D4AF37]/40">
            %
          </div>
          <h3 className="font-heading font-bold text-[#4D0E0D] text-base">Tiered Volume Discounts</h3>
          <p className="text-xs text-[#5C4540] leading-relaxed font-light">
            Enjoy 40% to 65% off retail reference prices with additional volume rebates for recurring commercial contracts.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/35 space-y-2 shadow-md hover:border-[#D4AF37] hover:shadow-xl transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#4D0E0D] text-[#D4AF37] flex items-center justify-center font-heading font-bold text-lg mb-4 shadow-inner border border-[#D4AF37]/40">
            <Truck className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h3 className="font-heading font-bold text-[#4D0E0D] text-base">Global Air &amp; Sea Cargo</h3>
          <p className="text-xs text-[#5C4540] leading-relaxed font-light">
            Doorstep delivery via DHL / FedEx Express (4-7 business days) or sea freight container (FOB Mundra / Nhava Sheva).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/35 space-y-2 shadow-md hover:border-[#D4AF37] hover:shadow-xl transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#4D0E0D] text-[#D4AF37] flex items-center justify-center font-heading font-bold text-lg mb-4 shadow-inner border border-[#D4AF37]/40">
            <FileCheck className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h3 className="font-heading font-bold text-[#4D0E0D] text-base">Full Export Documentation</h3>
          <p className="text-xs text-[#5C4540] leading-relaxed font-light">
            Certificate of Origin, Commercial Invoices, Packing Lists, GSP / Form A, and Phytosanitary certification provided.
          </p>
        </div>
      </div>

      {/* Order Swatch Booklets Form Section */}
      <div id="swatch-kit" className="scroll-mt-24 bg-[#F3EADB] p-8 sm:p-12 rounded-2xl border border-[#D4AF37]/35">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="royal-seal-rose">Physical Touch &amp; Feel</div>
            <h2 className="font-heading text-3xl font-extrabold text-[#4D0E0D]">
              Request A Ramam Textile Swatch Booklet
            </h2>
            <p className="text-[#5C4540] text-sm leading-relaxed font-light">
              We courier a curated swatch folder containing 25+ real hand block-printed pure cotton swatches (Cambric 60s, Mulmul Muslin, Indigo Dabu, Chanderi Silk) directly to your studio or office.
            </p>

            <div className="space-y-2 text-xs text-[#4D0E0D] font-medium pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#942220]" />
                <span>Includes colorfastness wash test swatches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#942220]" />
                <span>Includes 2026 FOB price index booklet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#942220]" />
                <span>Couriered worldwide via DHL Express</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-[#D4AF37]/35">
            {swatchKitRequested ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#380708] border-2 border-[#D4AF37] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-9 h-9 text-[#25D366]" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#4D0E0D]">Swatch Kit Dispatched for Processing!</h3>
                <p className="text-xs text-[#5C4540] max-w-md mx-auto font-light">
                  Thank you {name} ({company}). Our dispatch team in Jaipur is assembling your bespoke swatch booklet. You will receive an AWB tracking code and export catalog directly on {email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSwatchSubmit} className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-[#4D0E0D] pb-2 border-b border-[#D4AF37]/30">
                  👑 Buyer Swatch Kit Courier Request
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#D4AF37]/35 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37] text-[#4D0E0D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                      Boutique / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bloom & Loom Sydney"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#D4AF37]/35 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37] text-[#4D0E0D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@bloomandloom.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#D4AF37]/35 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37] text-[#4D0E0D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                      Target Order Volume
                    </label>
                    <select
                      value={targetVolume}
                      onChange={e => setTargetVolume(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#D4AF37]/35 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37] text-[#4D0E0D]"
                    >
                      <option value="25 - 200 pcs">25 - 200 pcs (Boutique Starter)</option>
                      <option value="200 - 1000 pcs">200 - 1,000 pcs (Multi-store)</option>
                      <option value="1000+ pcs">1,000+ pcs (Enterprise / Private Label)</option>
                      <option value="Fabric yardage">Fabric Yardage (100+ meters)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                      Studio Shipping Address &amp; Destination Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Complete physical courier delivery address with City and Postal Code"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#D4AF37]/35 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37] text-[#4D0E0D]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-royal-rose text-xs font-bold uppercase tracking-widest shadow-lg"
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
