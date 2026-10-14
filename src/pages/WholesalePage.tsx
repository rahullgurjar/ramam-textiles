import React, { useState } from 'react';
import { 
  Building2, Sparkles, ShieldCheck, Truck, Download, CheckCircle2, 
  HelpCircle, ArrowRight, Globe2, Package, Mail, Layers, FileCheck, AlertCircle, Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { InstagramIcon } from '../components/InstagramIcon';
import { resolveProductImage } from '../utils/imageUtils';
import { submitToGoogleSheet } from '../utils/googleScript';
import { validateComprehensiveLead } from '../utils/formValidation';
import { CountrySelect } from '../components/CountrySelect';
import { PhoneInputWithCountry } from '../components/PhoneInputWithCountry';
import { usePageSEO, DEFAULT_SEO } from '../utils/seo';

interface WholesalePageProps {
  onNavigate: (path: string) => void;
}

export const WholesalePage: React.FC<WholesalePageProps> = ({ onNavigate }) => {
  usePageSEO(DEFAULT_SEO.wholesale);
  const { showToast, openPolicyModal } = useApp();
  const [swatchKitRequested, setSwatchKitRequested] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [targetVolume, setTargetVolume] = useState('25 - 200 pcs');
  const [country, setCountry] = useState('United States');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleSwatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validation = validateComprehensiveLead({
      name,
      email,
      phone: phone.trim() ? phone : undefined,
      countryCode: phone.trim() ? countryCode : undefined,
      company,
      address,
      message: notes,
    });

    if (!validation.isValid) {
      const err = validation.error || 'Please provide genuine contact details.';
      setFormError(err);
      showToast(err, 'error');
      return;
    }

    if (!country.trim()) {
      const err = 'Please select your shipping destination country.';
      setFormError(err);
      showToast(err, 'error');
      return;
    }

    submitToGoogleSheet({
      formType: 'Fabric Swatch Booklet Request',
      name,
      company: company || 'N/A',
      email,
      phone: phone.trim() ? `${countryCode} ${phone}` : 'N/A',
      country,
      address,
      targetVolume,
      notes: notes || 'N/A',
    });

    setSwatchKitRequested(true);
    setFormError(null);
    showToast('Fabric Swatch Booklet request received! We will courier tracking info shortly.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 font-royal-body">
      {/* Hero */}
      <div className="bg-[#FAF0EB] text-[#241A16] rounded-[32px] p-8 sm:p-14 relative overflow-hidden border border-[#D4AF37]/40 shadow-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${resolveProductImage('/products/duffle-indigo.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-[#FAF0EB]/85" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold font-royal-title uppercase tracking-widest shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>Direct Jaipur Manufacturer &amp; Exporter</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#241A16] leading-tight">
            Wholesale B2B Supply &amp; Global Export
          </h1>

          <p className="text-stone-700 font-royal-body text-base sm:text-lg leading-relaxed">
            Direct-from-source artisan wholesale pricing for boutiques, department stores, and international fashion brands. Low MOQs from 25 pieces, certified colorfast pure cotton, and reliable worldwide logistics.
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <button
              onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="pill-btn-rose inline-flex items-center gap-2 shadow-xl px-7 py-3.5 text-xs font-bold uppercase rounded-full"
            >
              <span>Explore Wholesale Ready Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://www.instagram.com/ramamtextiles"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn-outline inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase rounded-full bg-[#FAF5EE] text-[#241A16] border border-[#D4AF37]/45"
            >
              <InstagramIcon className="w-4 h-4 text-[#9B332C]" />
              <span>DM on Instagram @ramamtextiles</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Pillars of B2B Wholesale */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#FAF5EE] p-6 rounded-[28px] border-2 border-[#FBCFE8]/60 space-y-2 shadow-sm hover:border-[#DB2777] hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF2F8] text-[#BE185D] flex items-center justify-center font-playfair font-bold text-lg mb-4 border border-[#FBCFE8] shadow-sm">
            25
          </div>
          <h3 className="font-royal-title font-bold text-[#831843] text-base">Low Minimum Order Qty</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Start with only 25 pieces per style with mixed pattern &amp; color breakdown to test market traction before scaling.
          </p>
        </div>

        <div className="bg-[#FAF5EE] p-6 rounded-[28px] border-2 border-[#FDE68A]/60 space-y-2 shadow-sm hover:border-[#D97706] hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] text-[#B45309] flex items-center justify-center font-playfair font-bold text-lg mb-4 border border-[#FDE68A] shadow-sm">
            %
          </div>
          <h3 className="font-royal-title font-bold text-[#92400E] text-base">Tiered Volume Discounts</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Enjoy 40% to 65% off retail reference prices with additional volume rebates for recurring commercial contracts.
          </p>
        </div>

        <div className="bg-[#FAF5EE] p-6 rounded-[28px] border-2 border-[#BFDBFE]/60 space-y-2 shadow-sm hover:border-[#2563EB] hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center font-playfair font-bold text-lg mb-4 border border-[#BFDBFE] shadow-sm">
            <Truck className="w-5 h-5 text-[#1D4ED8]" />
          </div>
          <h3 className="font-royal-title font-bold text-[#1E295B] text-base">Global Air Cargo</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Doorstep delivery via DHL / FedEx Express (4-7 business days) with direct real-time air airway bill tracking.
          </p>
        </div>

        <div className="bg-[#FAF5EE] p-6 rounded-[28px] border-2 border-[#A7F3D0]/60 space-y-2 shadow-sm hover:border-[#059669] hover:shadow-xl transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center font-playfair font-bold text-lg mb-4 border border-[#A7F3D0] shadow-sm">
            <FileCheck className="w-5 h-5 text-[#047857]" />
          </div>
          <h3 className="font-royal-title font-bold text-[#065F46] text-base">Full Export Documentation</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Certificate of Origin, Commercial Invoices, Packing Lists, GSP / Form A, and Phytosanitary certification provided.
          </p>
        </div>
      </div>

      {/* Milestone Terms Banner matching craftofpinkcity.shop */}
      <div className="bg-[#FAF5EE] rounded-[28px] p-6 border-2 border-amber-500/30 bg-amber-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-lg shrink-0">
            <FileCheck className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h4 className="font-royal-title font-bold text-sm text-[#241A16]">
              Transparent 60% Advance Milestone &amp; Sample Approval Process
            </h4>
            <p className="text-xs text-stone-600">
              60% advance confirms custom batch crafting. Physical sample piece sent first for approval. 40% balance payable prior to courier dispatch after video proof on WhatsApp.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openPolicyModal('terms')}
          className="pill-btn-outline px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
        >
          View Trade Terms →
        </button>
      </div>

      {/* Order Swatch Booklets Form Section */}
      <div id="swatch-kit" className="scroll-mt-24 bg-[#FAF5EE] p-8 sm:p-12 rounded-[32px] border border-[#D4AF37]/35 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold font-royal-title uppercase tracking-wider">Physical Touch &amp; Feel</div>
            <h2 className="font-playfair text-3xl font-bold text-[#241A16]">
              Request A Ramam Textile Swatch Booklet
            </h2>
            <p className="text-stone-600 font-royal-body text-base leading-relaxed">
              We courier a curated swatch folder containing 25+ real hand block-printed pure cotton swatches (Cambric 60s, Mulmul Muslin, Indigo Dabu, Chanderi Silk) directly to your studio or office.
            </p>

            <div className="space-y-2.5 text-xs text-[#241A16] font-semibold pt-2">
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

          <div className="lg:col-span-7 bg-[#F5EDE1] p-6 sm:p-8 rounded-[28px] shadow-xl border border-[#D4AF37]/35">
            {swatchKitRequested ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-9 h-9 text-[#9B332C]" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-[#241A16]">Swatch Kit Dispatched for Processing!</h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you <strong>{name}</strong> ({company}). Our dispatch team in Jaipur is assembling your bespoke swatch booklet. Connect directly with our studio on Instagram <strong>@ramamtextiles</strong> for live dispatch updates.
                </p>
                <div className="pt-2 flex justify-center">
                  <a
                    href="https://www.instagram.com/ramamtextiles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn-rose text-xs px-6 py-2.5 rounded-full inline-flex items-center gap-2 shadow"
                  >
                    <InstagramIcon className="w-4 h-4 text-white" />
                    <span>Follow &amp; Message @ramamtextiles</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSwatchSubmit} className="space-y-4 font-royal-body">
                <h3 className="font-playfair text-lg font-bold text-[#241A16] pb-2 border-b border-[#D4AF37]/25">
                  Buyer Swatch Kit Courier Request
                </h3>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#241A16] mb-1 font-royal-title">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#9B332C] text-[#241A16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#241A16] mb-1 font-royal-title">
                      Boutique / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bloom &amp; Loom Sydney"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#9B332C] text-[#241A16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#241A16] mb-1 font-royal-title">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@bloomandloom.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#9B332C] text-[#241A16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#241A16] mb-1 font-royal-title">
                      Target Order Volume
                    </label>
                    <select
                      value={targetVolume}
                      onChange={e => setTargetVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#9B332C] text-[#241A16]"
                    >
                      <option value="25 - 200 pcs">25 - 200 pcs (Boutique Starter)</option>
                      <option value="200 - 1000 pcs">200 - 1,000 pcs (Multi-store)</option>
                      <option value="1000+ pcs">1,000+ pcs (Enterprise / Custom Manufacturing)</option>
                      <option value="Fabric yardage">Fabric Yardage (100+ meters)</option>
                    </select>
                  </div>

                  <div>
                    <CountrySelect
                      value={country}
                      onChange={setCountry}
                      label="Destination Country *"
                      selectClassName="bg-[#FAF5EE]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <PhoneInputWithCountry
                      phone={phone}
                      countryCode={countryCode}
                      onPhoneChange={setPhone}
                      onCountryCodeChange={setCountryCode}
                      label="WhatsApp / Phone Number (For courier tracking updates) *"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#241A16] mb-1 font-royal-title">
                      Studio / Boutique Courier Shipping Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street address, Suite / Floor, City, State / Province & Postal PIN"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF5EE] border border-[#D4AF37]/35 rounded-xl text-xs focus:outline-none focus:border-[#9B332C] text-[#241A16]"
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
