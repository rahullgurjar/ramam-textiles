import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  ExternalLink,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { showToast } = useApp();
  const [catalogEmail, setCatalogEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleCatalogSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catalogEmail || !catalogEmail.includes('@')) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Success! The 2026 Wholesale Lookbook & Line Sheet has been sent to your email.', 'success');
    setCatalogEmail('');
  };

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0C1813] text-[#FAF7F2] border-t border-[#254234] pt-16 pb-12">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#254234]/70">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#13241C] border border-[#C4A674]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C4A674]" />
            </div>
            <div>
              <h4 className="font-heading text-sm text-[#DFCA9F] font-semibold mb-1">
                Authentic Jaipur Heritage
              </h4>
              <p className="text-xs text-[#8F9E96] leading-relaxed">
                Hand block-printed by traditional artisan clusters using 100% natural, AZO-free botanical and reactive dyes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#13241C] border border-[#C4A674]/30 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-[#C4A674]" />
            </div>
            <div>
              <h4 className="font-heading text-sm text-[#DFCA9F] font-semibold mb-1">
                Worldwide Export Ready
              </h4>
              <p className="text-xs text-[#8F9E96] leading-relaxed">
                Door-to-door insured air cargo (DHL/FedEx) &amp; ocean freight with complete customs documentation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#13241C] border border-[#C4A674]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#C4A674]" />
            </div>
            <div>
              <h4 className="font-heading text-sm text-[#DFCA9F] font-semibold mb-1">
                Low MOQ &amp; Private Label
              </h4>
              <p className="text-xs text-[#8F9E96] leading-relaxed">
                Starting from 25 pieces with custom woven labels, customized print strikes, and bespoke packaging.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded bg-[#13241C] border border-[#C4A674]/30 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-[#C4A674]" />
            </div>
            <div>
              <h4 className="font-heading text-sm text-[#DFCA9F] font-semibold mb-1">
                Instant B2B Line Sheets
              </h4>
              <p className="text-xs text-[#8F9E96] leading-relaxed">
                Request tiered wholesale quotations, fabric swatch decks, and tech-pack consultations directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="./logo.jpeg" 
                alt="Ramam Textiles" 
                className="w-12 h-12 rounded-full border border-[#C4A674]/40"
              />
              <div>
                <span className="block font-heading text-xl font-bold tracking-widest text-[#DFCA9F] uppercase">
                  RAMAM TEXTILES
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#8F9E96] uppercase font-medium">
                  Jaipur • Craftsmanship • Modern Luxury
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A3AFA8] leading-relaxed pr-6">
              Ramam Textiles is an artisanal Indian textile manufacturer based in Jaipur, Rajasthan. We supply independent luxury boutiques, international fashion houses, and resort brands worldwide with hand block-printed apparel, quilted cotton bags, and pure fabrics by the meter.
            </p>

            {/* Newsletter / B2B Catalog Form */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-[#DFCA9F] uppercase tracking-wider mb-2">
                Download 2026 Wholesale Line Sheet
              </span>
              {isSubscribed ? (
                <div className="p-3 bg-[#13241C] border border-[#C4A674]/50 rounded text-xs text-[#DFCA9F] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>Wholesale catalog sent! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleCatalogSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    value={catalogEmail}
                    onChange={e => setCatalogEmail(e.target.value)}
                    placeholder="Enter your business email..."
                    className="form-input-dark text-xs py-2 px-3 flex-1"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#C4A674] text-[#0C1813] text-xs font-bold uppercase rounded hover:bg-[#DFCA9F] transition-all shrink-0 cursor-pointer"
                  >
                    Send PDF
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="font-heading text-xs uppercase tracking-widest text-[#DFCA9F] font-bold mb-4 pb-1 border-b border-[#254234]">
              Collections &amp; Categories
            </h5>
            <ul className="space-y-2 text-xs text-[#A3AFA8]">
              <li>
                <button onClick={() => handleNav('/category/women')} className="hover:text-[#DFCA9F] transition-colors">
                  Women's Apparel &amp; Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/men')} className="hover:text-[#DFCA9F] transition-colors">
                  Men's Handloom &amp; Shirts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/kids')} className="hover:text-[#DFCA9F] transition-colors">
                  Kids &amp; Festive Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/bags')} className="hover:text-[#DFCA9F] transition-colors font-medium text-[#DFCA9F]">
                  Quilted Duffles &amp; Pouches
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/fabrics')} className="hover:text-[#DFCA9F] transition-colors">
                  Fabrics by the Meter
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/home')} className="hover:text-[#DFCA9F] transition-colors">
                  Home Textiles &amp; Razai
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/collections')} className="hover:text-[#DFCA9F] transition-colors">
                  Seasonal Lookbook Editions
                </button>
              </li>
            </ul>
          </div>

          {/* B2B & Manufacturing */}
          <div>
            <h5 className="font-heading text-xs uppercase tracking-widest text-[#DFCA9F] font-bold mb-4 pb-1 border-b border-[#254234]">
              B2B &amp; Manufacturing
            </h5>
            <ul className="space-y-2 text-xs text-[#A3AFA8]">
              <li>
                <button onClick={() => handleNav('/wholesale')} className="hover:text-[#DFCA9F] transition-colors font-semibold text-[#DFCA9F]">
                  Wholesale Buyer Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing')} className="hover:text-[#DFCA9F] transition-colors">
                  Private Label Manufacturing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing#process')} className="hover:text-[#DFCA9F] transition-colors">
                  Sampling &amp; Block Carving
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/lookbook')} className="hover:text-[#DFCA9F] transition-colors">
                  Editorial Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/craftsmanship')} className="hover:text-[#DFCA9F] transition-colors">
                  The Bagru &amp; Sanganer Craft
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/journal')} className="hover:text-[#DFCA9F] transition-colors">
                  Textile Sourcing Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Atelier Contact */}
          <div>
            <h5 className="font-heading text-xs uppercase tracking-widest text-[#DFCA9F] font-bold mb-4 pb-1 border-b border-[#254234]">
              Jaipur Atelier &amp; Contact
            </h5>
            <ul className="space-y-3 text-xs text-[#A3AFA8]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C4A674] shrink-0 mt-0.5" />
                <span>
                  Ramam Textiles Artisan Workshops,<br />
                  Jaipur, Rajasthan 302020, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/919351291471" target="_blank" rel="noopener noreferrer" className="hover:text-[#DFCA9F]">
                  +91 93512 91471 (B2B WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C4A674] shrink-0" />
                <a href="mailto:inquiry@ramamtextiles.com" className="hover:text-[#DFCA9F]">
                  inquiry@ramamtextiles.com
                </a>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => handleNav('/contact')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#13241C] border border-[#C4A674]/40 text-xs text-[#DFCA9F] hover:bg-[#C4A674] hover:text-[#0C1813] transition-all"
                >
                  <span>Book Workshop Visit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#254234]/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8F9E96]">
        <div>
          © {new Date().getFullYear()} Ramam Textiles. All rights reserved. Handcrafted in Jaipur, India.
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <button onClick={() => handleNav('/faq')} className="hover:text-[#DFCA9F] transition-colors">
            FAQ
          </button>
          <button onClick={() => handleNav('/shipping-returns')} className="hover:text-[#DFCA9F] transition-colors">
            Shipping &amp; Export Terms
          </button>
          <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#DFCA9F] transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => handleNav('/terms-conditions')} className="hover:text-[#DFCA9F] transition-colors">
            Terms &amp; Conditions
          </button>
        </div>
      </div>
    </footer>
  );
};
