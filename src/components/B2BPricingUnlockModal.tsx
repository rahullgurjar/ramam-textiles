import React, { useState } from 'react';
import { X, Lock, Unlock, ShieldCheck, Building2, Mail, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface B2BPricingUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BPricingUnlockModal: React.FC<B2BPricingUnlockModalProps> = ({ isOpen, onClose }) => {
  const { unlockB2BPricing, isB2BPriceUnlocked, buyerProfile } = useApp();
  const [companyName, setCompanyName] = useState(buyerProfile?.companyName || '');
  const [email, setEmail] = useState(buyerProfile?.email || '');
  const [country, setCountry] = useState(buyerProfile?.country || 'India');
  const [buyerType, setBuyerType] = useState('Boutique Owner');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email) return;

    unlockB2BPricing({
      companyName,
      email,
      country
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-lg bg-[#FAF7F2] rounded-lg shadow-2xl border border-amber-900/30 overflow-hidden text-[#1C1917]">
        {/* Header */}
        <div className="bg-[#0E1612] text-amber-100 p-6 relative border-b border-amber-900/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>B2B Wholesale Portal</span>
          </div>

          <h3 className="font-serif text-2xl text-white font-bold tracking-wide">
            {isB2BPriceUnlocked ? 'B2B Wholesale Access Active' : 'Unlock Wholesale Tier Pricing'}
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            Access exporter FOB rates, tiered MOQ discounts (50 - 1,000+ units), and production lead-time estimates.
          </p>
        </div>

        {/* Body */}
        {isB2BPriceUnlocked ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="font-serif text-xl font-bold text-stone-900">Wholesale Pricing is Unlocked</h4>
            <p className="text-sm text-stone-600">
              Logged in as <strong className="text-stone-900">{buyerProfile?.companyName}</strong> ({buyerProfile?.email}).
              Wholesale pricing tables, volume discounts, and custom RFQ specifications are visible across the catalog.
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#0E1612] text-amber-100 font-serif tracking-widest text-xs uppercase font-bold hover:bg-stone-800 transition-colors rounded"
              >
                Browse Wholesale Catalog
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUnlock} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Company / Boutique Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3 top-3.5 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Bohemian Luxe Studio / Jaipur Chic London"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded text-sm focus:outline-none focus:border-[#0E1612]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Business Work Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="buyer@yourcompany.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded text-sm focus:outline-none focus:border-[#0E1612]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Country / Market *
                </label>
                <div className="relative">
                  <Globe2 className="w-4 h-4 absolute left-3 top-3.5 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. USA, UK, UAE, India"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded text-sm focus:outline-none focus:border-[#0E1612]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Buyer Category
                </label>
                <select
                  value={buyerType}
                  onChange={e => setBuyerType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-sm focus:outline-none focus:border-[#0E1612]"
                >
                  <option>Boutique Owner</option>
                  <option>Fashion Brand / Label</option>
                  <option>Department Store Buyer</option>
                  <option>E-commerce Reseller</option>
                  <option>Interior / Home Decor</option>
                  <option>Event / Wedding Gifter</option>
                </select>
              </div>
            </div>

            <div className="bg-[#F0EBE1] p-3.5 rounded border border-amber-900/20 text-xs text-stone-700 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-stone-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verified Direct-from-Jaipur Exporter Rates</span>
              </div>
              <p className="text-[11px] text-stone-600">
                No credit card required. Instant access to tiered discounts, export packing dimensions, and sample order options.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0E1612] text-amber-200 font-serif tracking-widest text-xs uppercase font-bold hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors rounded shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Wholesale Pricing Now</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
