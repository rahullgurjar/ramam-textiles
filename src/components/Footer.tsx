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
    <footer className="bg-[#1F1612] text-[#FAF3DC] border-t border-[#D4AF37]/30 pt-16 pb-12 shadow-2xl relative overflow-hidden font-royal-body">
      {/* Subtle Jaipur Jaali Lattice Overlay */}
      <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-20 pointer-events-none" />

      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-5 h-5 text-[#E5A93C]" />
            </div>
            <div>
              <h4 className="font-royal-title text-sm text-[#FAF3DC] font-bold mb-1">
                Authentic Jaipur Atelier
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Hand block-printed in Bagru &amp; Sanganer artisan quarters using AZO-free botanical and colorfast reactive dyes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-md">
              <Globe className="w-5 h-5 text-[#E5A93C]" />
            </div>
            <div>
              <h4 className="font-royal-title text-sm text-[#FAF3DC] font-bold mb-1">
                Worldwide Export Logistics
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Door-to-door insured air cargo (DHL/FedEx) &amp; ocean freight with complete Certificate of Origin documentation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-[#E5A93C]" />
            </div>
            <div>
              <h4 className="font-royal-title text-sm text-[#FAF3DC] font-bold mb-1">
                Low MOQ &amp; Private Label
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Starting from 25 pieces with bespoke Sheesham block carvings, strike-offs, and custom woven brand tags.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-md">
              <Download className="w-5 h-5 text-[#E5A93C]" />
            </div>
            <div>
              <h4 className="font-royal-title text-sm text-[#FAF3DC] font-bold mb-1">
                Instant B2B Line Sheets
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
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
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 border-2 border-[#D4AF37]/60 shadow-xl flex items-center justify-center p-2 shrink-0 backdrop-blur-sm">
                <img 
                  src="./logo.png" 
                  alt="Ramam Textiles Jaipur" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div className="whitespace-nowrap">
                <div className="flex items-baseline gap-2 leading-none">
                  <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Ramam
                  </span>
                  <span className="italic font-editorial text-2xl sm:text-3xl font-semibold text-[#E5A93C]">
                    Textiles
                  </span>
                </div>
                <span className="block text-[10px] sm:text-[11px] tracking-[0.28em] text-[#E5A93C] uppercase font-royal-title font-bold mt-1.5">
                  JAIPUR ARTISAN ATELIER
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed pr-6">
              Ramam Textiles is an authentic Jaipur heritage artisan house based in Rajasthan, India. We supply luxury boutiques, independent retailers, and travel lifestyle brands worldwide with handcrafted quilted duffle bags, vanity cosmetic pouches, and pure block-printed cotton fabrics.
            </p>

            {/* Newsletter / B2B Catalog Form */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-[#E5A93C] uppercase tracking-wider mb-2 font-royal-title">
                Download 2026 Wholesale Line Sheet
              </span>
              {isSubscribed ? (
                <div className="p-3 bg-white/10 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Wholesale catalog sent! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleCatalogSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    value={catalogEmail}
                    onChange={e => setCatalogEmail(e.target.value)}
                    placeholder="Enter your business email..."
                    className="flex-1 px-4 py-2.5 bg-white/10 border border-[#D4AF37]/40 rounded-full text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C8376B]"
                    required
                  />
                  <button 
                    type="submit"
                    className="pill-btn-rose px-5 py-2.5 text-xs font-bold uppercase rounded-full shrink-0 shadow-md"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-stone-200 text-xs hover:border-[#C8376B] hover:text-white transition-all group shadow-sm"
              >
                <InstagramIcon className="w-4 h-4 text-[#C8376B] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-xs">Follow <strong>@ramamtextiles</strong> on Instagram</span>
                <ExternalLink className="w-3 h-3 text-stone-400 opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#E5A93C] font-bold mb-4 pb-1 border-b border-white/10">
              Collections &amp; Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button onClick={() => handleNav('/category/bags')} className="hover:text-[#C8376B] transition-colors font-semibold text-white">
                  Quilted Travel Duffles &amp; Totes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/women')} className="hover:text-[#C8376B] transition-colors">
                  Cosmetic &amp; Vanity Pouch Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/home')} className="hover:text-[#C8376B] transition-colors">
                  Specialty Organizers &amp; Sleeves
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/collections')} className="hover:text-[#C8376B] transition-colors">
                  Curated Craft Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/shop')} className="hover:text-[#C8376B] transition-colors">
                  All Ready-To-Order SKUs
                </button>
              </li>
            </ul>
          </div>

          {/* B2B & Manufacturing */}
          <div>
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#E5A93C] font-bold mb-4 pb-1 border-b border-white/10">
              B2B &amp; Manufacturing
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button onClick={() => handleNav('/wholesale')} className="hover:text-[#C8376B] transition-colors font-semibold text-white">
                  Wholesale Buyer Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing')} className="hover:text-[#C8376B] transition-colors">
                  Bulk Orders &amp; Private Label
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing#process')} className="hover:text-[#C8376B] transition-colors">
                  Sampling &amp; Block Carving
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/lookbook')} className="hover:text-[#C8376B] transition-colors">
                  Editorial Lookbook &amp; Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/craftsmanship')} className="hover:text-[#C8376B] transition-colors">
                  The Bagru &amp; Sanganer Craft
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/journal')} className="hover:text-[#C8376B] transition-colors">
                  Textile Sourcing Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Atelier Contact */}
          <div>
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#E5A93C] font-bold mb-4 pb-1 border-b border-white/10">
              Jaipur Atelier &amp; Contact
            </h5>
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <span>
                  Ramam Textiles Artisan Workshops,<br />
                  Jaipur, Rajasthan 302020, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href="mailto:inquiry@ramamtextiles.com" className="hover:text-[#C8376B]">
                  inquiry@ramamtextiles.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href="mailto:exports@ramamtextiles.com" className="hover:text-[#C8376B]">
                  exports@ramamtextiles.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#C8376B] shrink-0" />
                <a 
                  href="https://www.instagram.com/ramamtextiles" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#C8376B] inline-flex items-center gap-1 group font-medium text-white"
                >
                  <span>@ramamtextiles</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => handleNav('/contact')}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 border border-[#D4AF37]/50 text-xs text-white hover:bg-[#C8376B] hover:border-[#C8376B] transition-all font-royal-title font-bold shadow-md"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-400 relative z-10 font-royal-body">
        <div>
          © {new Date().getFullYear()} Ramam Textiles. All rights reserved. Handcrafted in Jaipur, Rajasthan.
        </div>
        <div className="flex flex-wrap items-center gap-6 font-medium">
          <button onClick={() => handleNav('/faq')} className="hover:text-[#C8376B] transition-colors">
            FAQ
          </button>
          <button onClick={() => handleNav('/shipping-returns')} className="hover:text-[#C8376B] transition-colors">
            Shipping &amp; Export Terms
          </button>
          <button onClick={() => handleNav('/privacy-policy')} className="hover:text-[#C8376B] transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => handleNav('/terms-conditions')} className="hover:text-[#C8376B] transition-colors">
            Terms &amp; Conditions
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
