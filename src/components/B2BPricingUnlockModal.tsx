import React, { useState } from 'react';
import { X, Lock, Unlock, ShieldCheck, Building2, Mail, Globe2, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { submitToGoogleSheet } from '../utils/googleScript';
import { validateCompanyName, validateEmailAddress } from '../utils/formValidation';
import { CountrySelect } from './CountrySelect';

interface B2BPricingUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BPricingUnlockModal: React.FC<B2BPricingUnlockModalProps> = ({ isOpen, onClose }) => {
  const { unlockB2BPricing, isB2BPriceUnlocked, buyerProfile, showToast } = useApp();
  const [companyName, setCompanyName] = useState(buyerProfile?.companyName || '');
  const [email, setEmail] = useState(buyerProfile?.email || '');
  const [country, setCountry] = useState(buyerProfile?.country || 'India');
  const [buyerType, setBuyerType] = useState('Boutique Owner');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();

    const compRes = validateCompanyName(companyName);
    if (!compRes.isValid || !companyName.trim()) {
      const err = compRes.error || 'Please enter your genuine company or boutique name.';
      setFormError(err);
      showToast(err, 'error');
      return;
    }

    const emailRes = validateEmailAddress(email);
    if (!emailRes.isValid) {
      const err = emailRes.error || 'Please provide your official business email.';
      setFormError(err);
      showToast(err, 'error');
      return;
    }

    setFormError('');
    submitToGoogleSheet({
      formType: 'B2B Wholesale Price Tier Unlock',
      company: companyName,
      email,
      country,
      buyerType,
    });

    unlockB2BPricing({
      companyName,
      email,
      country
    });
    onClose();
  };

  return (
    <div 
      id="b2b-pricing-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="b2b-pricing-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 flex items-center justify-center animate-fade-in"
    >
      <div className="w-full max-w-lg bg-[#FAF5EE] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden text-[#241A16]">
        {/* Header */}
        <div className="bg-[#FAF0EB] text-[#241A16] p-6 relative border-b border-[#D4AF37]/35 shadow-sm">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-600 hover:text-white rounded-full hover:bg-[#9B332C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF0EB] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-bold uppercase tracking-wider mb-3 font-royal-title">
            <Lock className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>Jaipur B2B Wholesale Portal</span>
          </div>

          <h3 id="b2b-pricing-modal-title" className="font-playfair text-2xl text-[#241A16] font-extrabold tracking-wide">
            {isB2BPriceUnlocked ? 'B2B Wholesale Access Active' : 'Unlock Wholesale Tier Pricing'}
          </h3>
          <p className="text-xs text-stone-600 mt-1 font-royal-body">
            Access exporter FOB rates, tiered MOQ discounts (25 - 1,000+ units), and production lead-time estimates.
          </p>
        </div>

        {/* Body */}
        {isB2BPriceUnlocked ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9 text-[#9B332C]" />
            </div>
            <h4 className="font-playfair text-xl font-bold text-[#241A16]">Wholesale Pricing is Unlocked</h4>
            <p className="text-sm text-stone-600 font-royal-body">
              Logged in as <strong className="text-[#241A16]">{buyerProfile?.companyName}</strong> ({buyerProfile?.email}).
              Wholesale pricing tables, volume discounts, and custom RFQ specifications are visible across the catalog.
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="w-full pill-btn-rose py-3 tracking-widest text-xs uppercase font-bold"
              >
                Browse Wholesale Catalog
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUnlock} className="p-6 space-y-4 font-royal-body">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-xs text-red-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#241A16] mb-1 font-royal-title">
                Company / Boutique Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#9B332C] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Amber & Indigo Boutique"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5EDE1] rounded-xl border border-[#D4AF37]/35 text-xs focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE] text-[#241A16]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#241A16] mb-1 font-royal-title">
                Official Business Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9B332C] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="buyer@amberindigo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5EDE1] rounded-xl border border-[#D4AF37]/35 text-xs focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE] text-[#241A16]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#241A16] mb-1 font-royal-title">
                  Business Type
                </label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F5EDE1] rounded-xl border border-[#D4AF37]/35 text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]"
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
                <CountrySelect
                  value={country}
                  onChange={setCountry}
                  label="Country *"
                  selectClassName="bg-[#F5EDE1]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full pill-btn-rose py-3 flex items-center justify-center gap-2 shadow-lg text-xs uppercase font-bold"
              >
                <Unlock className="w-4 h-4 text-white" />
                <span>Unlock Commercial Price Tiers</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#9B332C]" />
              <span>Instant access. No credit card required.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default B2BPricingUnlockModal;
