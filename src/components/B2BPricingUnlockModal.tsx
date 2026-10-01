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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-lg bg-[#FAF6EE] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden text-[#221516]">
        {/* Header */}
        <div className="bg-[#4D0E0D] text-[#FAF3DC] p-6 relative border-b border-[#D4AF37]/40 shadow-md">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/45 rounded-full text-[#F5E6B5] text-xs font-bold uppercase tracking-wider mb-3 font-heading">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>👑 Jaipur B2B Wholesale Portal</span>
          </div>

          <h3 className="font-heading text-2xl text-white font-extrabold tracking-wide">
            {isB2BPriceUnlocked ? 'B2B Wholesale Access Active' : 'Unlock Wholesale Tier Pricing'}
          </h3>
          <p className="text-xs text-stone-200 mt-1 font-light">
            Access exporter FOB rates, tiered MOQ discounts (25 - 1,000+ units), and production lead-time estimates.
          </p>
        </div>

        {/* Body */}
        {isB2BPriceUnlocked ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#380708] border-2 border-[#D4AF37] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-9 h-9 text-[#25D366]" />
            </div>
            <h4 className="font-heading text-xl font-bold text-[#4D0E0D]">Wholesale Pricing is Unlocked</h4>
            <p className="text-sm text-[#5C4540] font-light">
              Logged in as <strong className="text-[#4D0E0D]">{buyerProfile?.companyName}</strong> ({buyerProfile?.email}).
              Wholesale pricing tables, volume discounts, and custom RFQ specifications are visible across the catalog.
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="w-full btn-royal-rose tracking-widest text-xs uppercase font-bold"
              >
                Browse Wholesale Catalog
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUnlock} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                Company / Boutique Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#942220] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Amber & Indigo Boutique"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-[#D4AF37]/35 text-sm focus:outline-none focus:border-[#D4AF37] text-[#4D0E0D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                Official Business Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#942220] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="buyer@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-[#D4AF37]/35 text-sm focus:outline-none focus:border-[#D4AF37] text-[#4D0E0D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                  Business Type
                </label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white rounded-lg border border-[#D4AF37]/35 text-xs text-[#4D0E0D]"
                >
                  <option value="Boutique Owner">Boutique Owner</option>
                  <option value="Fashion Brand">Fashion Brand</option>
                  <option value="Resort Store">Resort Store</option>
                  <option value="Online Retailer">Online Retailer</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Other">Other Wholesale</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5450] mb-1 font-heading">
                  Country
                </label>
                <div className="relative">
                  <Globe2 className="w-4 h-4 text-[#942220] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. USA, UK"
                    className="w-full pl-9 pr-3 py-2.5 bg-white rounded-lg border border-[#D4AF37]/35 text-xs text-[#4D0E0D]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-royal-gold flex items-center justify-center gap-2 shadow-lg"
              >
                <Unlock className="w-4 h-4 text-[#381A03]" />
                <span>Unlock Commercial Price Tiers</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A5450] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#942220]" />
              <span>Instant access. No credit card required.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default B2BPricingUnlockModal;
