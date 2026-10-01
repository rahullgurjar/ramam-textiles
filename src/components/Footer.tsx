import React, { useState } from 'react';
import { 
  Mail, 
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
import { InstagramIcon } from './InstagramIcon';

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
    <footer className="bg-[#4D0E0D] text-[#FAF3DC] border-t-2 border-[#D4AF37]/50 pt-16 pb-12 shadow-2xl relative overflow-hidden">
      {/* Subtle Rajasthani Jaali Background Pattern */}
      <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-30 pointer-events-none" />

      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#D4AF37]/30 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#380708] border border-[#D4AF37]/45 flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-heading text-sm text-[#F5E6B5] font-bold mb-1">
                Authentic Jaipur Heritage
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Hand block-printed in Bagru &amp; Sanganer artisan clusters using AZO-free botanical and colorfast reactive dyes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#380708] border border-[#D4AF37]/45 flex items-center justify-center shrink-0 shadow-md">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-heading text-sm text-[#F5E6B5] font-bold mb-1">
                Worldwide Export Ready
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Door-to-door insured air cargo (DHL/FedEx) &amp; ocean freight with complete Certificate of Origin documentation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#380708] border border-[#D4AF37]/45 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-heading text-sm text-[#F5E6B5] font-bold mb-1">
                Low MOQ &amp; Private Label
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Starting from 25 pieces with custom woven brand tags, bespoke Sheesham block carvings, and export barcoding.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#380708] border border-[#D4AF37]/45 flex items-center justify-center shrink-0 shadow-md">
              <Download className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-heading text-sm text-[#F5E6B5] font-bold mb-1">
                Instant B2B Line Sheets
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Request tiered wholesale quotations, fabric swatch decks, and tech-pack consultations directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="./logo.jpeg" 
                alt="Ramam Textiles Crest" 
                className="w-12 h-12 rounded-full border-2 border-[#D4AF37] shadow-lg"
              />
              <div>
                <span className="block font-heading text-xl font-black tracking-widest text-[#FAF3DC] uppercase">
                  RAMAM TEXTILES
                </span>
                <span className="block text-[10.5px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                  👑 Jaipur • Royal Craftsmanship • Luxury B2B
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-200 leading-relaxed pr-6 font-light">
              Ramam Textiles is an authentic Jaipur heritage textile house based in Rajasthan, India. We supply independent luxury boutiques, international fashion houses, and resort brands worldwide with hand block-printed apparel, quilted cotton bags, and pure fabrics by the meter.
            </p>

            {/* Newsletter / B2B Catalog Form */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-[#F5E6B5] uppercase tracking-wider mb-2 font-heading">
                Download 2026 Wholesale Line Sheet
              </span>
              {isSubscribed ? (
                <div className="p-3 bg-[#380708] border border-[#D4AF37]/60 rounded-lg text-xs text-[#FAF3DC] flex items-center gap-2">
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
                    className="form-input-dark text-xs py-2.5 px-3.5 flex-1"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B89426] text-[#381A03] text-xs font-bold uppercase rounded-lg hover:brightness-110 transition-all shrink-0 cursor-pointer font-heading shadow-md"
                  >
                    Send PDF
                  </button>
                </form>
              )}
            </div>

            <div className="pt-2">
              <a
                href="https://www.instagram.com/ramamtextiles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-[#D4AF37]/50 text-[#FAF3DC] text-xs hover:border-[#E1306C] hover:bg-white/15 transition-all group shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs">Follow <strong>@ramamtextiles</strong> on Instagram</span>
                <ExternalLink className="w-3 h-3 text-stone-400 opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="font-heading text-xs uppercase tracking-widest text-[#F5E6B5] font-bold mb-4 pb-1 border-b border-[#D4AF37]/30">
              Collections &amp; Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button onClick={() => handleNav('/category/bags')} className="hover:text-[#D4AF37] transition-colors font-semibold text-[#FAF3DC]">
                  Quilted Travel Duffles &amp; Totes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/women')} className="hover:text-[#D4AF37] transition-colors">
                  Cosmetic &amp; Vanity Pouches
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/home')} className="hover:text-[#D4AF37] transition-colors">
                  Yoga Mat Carriers &amp; Styler Cases
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/shop')} className="hover:text-[#D4AF37] transition-colors">
                  All Ready-To-Order SKUs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/collections')} className="hover:text-[#D4AF37] transition-colors">
                  2026 Quilted Lookbook Editions
                </button>
              </li>
            </ul>
          </div>

          {/* B2B & Manufacturing */}
          <div>
            <h5 className="font-heading text-xs uppercase tracking-widest text-[#F5E6B5] font-bold mb-4 pb-1 border-b border-[#D4AF37]/30">
              B2B &amp; Manufacturing
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button onClick={() => handleNav('/wholesale')} className="hover:text-[#D4AF37] transition-colors font-semibold text-[#FAF3DC]">
                  Wholesale Buyer Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing')} className="hover:text-[#D4AF37] transition-colors">
                  Private Label Manufacturing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing#process')} className="hover:text-[#D4AF37] transition-colors">
                  Sampling &amp; Block Carving
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/lookbook')} className="hover:text-[#D4AF37] transition-colors">
                  Editorial Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/craftsmanship')} className="hover:text-[#D4AF37] transition-colors">
                  The Bagru &amp; Sanganer Craft
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/journal')} className="hover:text-[#D4AF37] transition-colors">
                  Textile Sourcing Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Atelier Contact */}
          <div>
            <h5 className="font-heading text-xs uppercase tracking-widest text-[#F5E6B5] font-bold mb-4 pb-1 border-b border-[#D4AF37]/30">
              Jaipur Atelier &amp; Contact
            </h5>
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  Ramam Textiles Artisan Workshops,<br />
                  Jaipur, Rajasthan 302020, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:inquiry@ramamtextiles.com" className="hover:text-[#D4AF37]">
                  inquiry@ramamtextiles.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:exports@ramamtextiles.com" className="hover:text-[#D4AF37]">
                  exports@ramamtextiles.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#E1306C] shrink-0" />
                <a 
                  href="https://www.instagram.com/ramamtextiles" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#D4AF37] inline-flex items-center gap-1 group font-medium"
                >
                  <span>@ramamtextiles</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => handleNav('/contact')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#380708] border border-[#D4AF37]/50 text-xs text-[#FAF3DC] hover:bg-[#D4AF37] hover:text-[#381A03] transition-all font-heading font-bold shadow-md"
                >
                  <span>Inquire Online &amp; Book Visit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-300 relative z-10">
        <div>
          © {new Date().getFullYear()} Ramam Textiles. All rights reserved. Handcrafted with pride in Jaipur, Rajasthan, India.
        </div>
        <div className="flex flex-wrap items-center gap-6 font-medium">
          <button onClick={() => handleNav('/faq')} className="hover:text-[#D4AF37] transition-colors">
            FAQ
          </button>
          <button onClick={() => handleNav('/shipping-returns')} className="hover:text-[#D4AF37] transition-colors">
            Shipping &amp; Export Terms
          </button>
          <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#D4AF37] transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => handleNav('/terms-conditions')} className="hover:text-[#D4AF37] transition-colors">
            Terms &amp; Conditions
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
