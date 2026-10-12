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
  const { showToast, openPolicyModal } = useApp();
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
    <footer className="bg-[#FAF5EE] text-[#241A16] border-t border-[#D4AF37]/35 pt-16 pb-12 shadow-sm relative overflow-hidden font-royal-body">
      {/* Subtle Jaipur Jaali Lattice Overlay */}
      <div className="absolute inset-0 bg-jaipur-jaali opacity-40 pointer-events-none" />

      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#D4AF37]/25 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF0EB] border border-[#EACAC0] flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#9B332C]" />
            </div>
            <div>
              <h4 className="font-royal-title text-sm text-[#241A16] font-bold mb-1">
                Authentic Jaipur Atelier
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hand block-printed in Bagru &amp; Sanganer artisan quarters using AZO-free botanical and colorfast reactive dyes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF0EB] border border-[#EACAC0] flex items-center justify-center shrink-0 shadow-sm">
              <Globe className="w-5 h-5 text-[#9B332C]" />
            </div>
            <div>
              <h4 className="font-royal-title text-sm text-[#241A16] font-bold mb-1">
                Worldwide Export Logistics
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Door-to-door insured air cargo (DHL/FedEx) &amp; ocean freight with complete Certificate of Origin documentation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF0EB] border border-[#EACAC0] flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#9B332C]" />
            </div>
            <div>
              <h4 className="font-royal-title text-sm text-[#241A16] font-bold mb-1">
                Low MOQ &amp; Custom Orders
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Starting from 25 pieces with bespoke Sheesham block carvings, strike-offs, and custom woven brand tags.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF0EB] border border-[#EACAC0] flex items-center justify-center shrink-0 shadow-sm">
              <Download className="w-5 h-5 text-[#9B332C]" />
            </div>
            <div>
              <h4 className="font-royal-title text-sm text-[#241A16] font-bold mb-1">
                Instant B2B Line Sheets
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
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
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FAF5EE] via-[#F6EDE2] to-[#ECE1D2] border-2 border-[#D4AF37] shadow-md flex items-center justify-center p-2 shrink-0">
                <picture className="w-full h-full block">
                  <source srcSet="./logo.webp" type="image/webp" />
                  <img 
                    src="./logo.png" 
                    alt="Ramam Textiles Jaipur" 
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </picture>
              </div>
              <div className="whitespace-nowrap">
                <div className="flex items-baseline gap-2 leading-none">
                  <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#241A16]">
                    Ramam
                  </span>
                  <span className="italic font-editorial text-2xl sm:text-3xl font-semibold text-[#9B332C]">
                    Textiles
                  </span>
                </div>
                <span className="block text-[10px] sm:text-[11px] tracking-[0.28em] text-[#9B332C] uppercase font-royal-title font-bold mt-1.5">
                  JAIPUR ARTISAN ATELIER
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed pr-6">
              Ramam Textiles is an authentic Jaipur heritage artisan house based in Rajasthan, India. We supply luxury boutiques, independent retailers, and travel lifestyle brands worldwide with handcrafted quilted duffle bags, vanity cosmetic pouches, and pure block-printed cotton fabrics.
            </p>

            {/* Newsletter / B2B Catalog Form */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-[#9B332C] uppercase tracking-wider mb-2 font-royal-title">
                Download 2026 Wholesale Line Sheet
              </span>
              {isSubscribed ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Wholesale catalog sent! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleCatalogSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    value={catalogEmail}
                    onChange={e => setCatalogEmail(e.target.value)}
                    placeholder="Enter your business email..."
                    className="flex-1 px-4 py-2.5 bg-white border border-[#D4AF37]/40 rounded-full text-xs text-[#241A16] placeholder-stone-400 focus:outline-none focus:border-[#9B332C]"
                    required
                  />
                  <button 
                    type="submit"
                    className="pill-btn-rani px-5 py-2.5 text-xs font-bold uppercase rounded-full shrink-0 shadow-md"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs hover:bg-[#9B332C] hover:text-white transition-all group shadow-sm font-semibold"
              >
                <InstagramIcon className="w-4 h-4 text-[#9B332C] group-hover:text-white group-hover:scale-110 transition-transform" />
                <span>Follow <strong>@ramamtextiles</strong> on Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-4 pb-1 border-b border-[#D4AF37]/25">
              Collections &amp; Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <button onClick={() => handleNav('/category/bags')} className="hover:text-[#9B332C] transition-colors font-semibold text-[#241A16]">
                  Quilted Travel Duffles &amp; Totes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/women')} className="hover:text-[#9B332C] transition-colors">
                  Cosmetic &amp; Vanity Pouch Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/home')} className="hover:text-[#9B332C] transition-colors">
                  Specialty Organizers &amp; Sleeves
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/collections')} className="hover:text-[#9B332C] transition-colors">
                  Curated Craft Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/shop')} className="hover:text-[#9B332C] transition-colors">
                  All Ready-To-Order SKUs
                </button>
              </li>
            </ul>
          </div>

          {/* B2B & Manufacturing */}
          <div>
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-4 pb-1 border-b border-[#D4AF37]/25">
              B2B &amp; Manufacturing
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <button onClick={() => handleNav('/bulk-enquiry')} className="hover:text-[#9B332C] transition-colors font-semibold text-[#241A16]">
                  Bulk Order Enquiry
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/wholesale')} className="hover:text-[#9B332C] transition-colors">
                  Wholesale Buyer Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing')} className="hover:text-[#9B332C] transition-colors">
                  Custom Manufacturing &amp; OEM
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing#process')} className="hover:text-[#9B332C] transition-colors">
                  Sampling &amp; Block Carving
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/lookbook')} className="hover:text-[#9B332C] transition-colors">
                  Editorial Lookbook &amp; Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/craftsmanship')} className="hover:text-[#9B332C] transition-colors">
                  The Bagru &amp; Sanganer Craft
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/journal')} className="hover:text-[#9B332C] transition-colors">
                  Textile Sourcing Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Atelier Contact */}
          <div>
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-4 pb-1 border-b border-[#D4AF37]/25">
              Jaipur Atelier &amp; Contact
            </h5>
            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9B332C] shrink-0 mt-0.5" />
                <span>
                  Ramam Textiles Artisan Workshops,<br />
                  Jaipur, Rajasthan 302020, India
                </span>
              </li>
              <li className="pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-[#D4AF37]/35 space-y-2 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B332C] font-royal-title block">
                    Official Social Desk
                  </span>
                  <a 
                    href="https://www.instagram.com/ramamtextiles" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-[#241A16] font-bold hover:text-[#9B332C] transition-colors group"
                  >
                    <InstagramIcon className="w-5 h-5 text-[#9B332C] group-hover:scale-110 transition-transform" />
                    <span className="text-sm">@ramamtextiles</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#9B332C] opacity-70 group-hover:opacity-100" />
                  </a>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    DM for wholesale inquiries, custom batch consultations, and live atelier videos.
                  </p>
                </div>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => handleNav('/contact')}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-xs text-[#9B332C] hover:bg-[#9B332C] hover:text-white transition-all font-royal-title font-bold shadow-sm"
                >
                  <span>Inquire Online &amp; Book Studio Visit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500 relative z-10 font-royal-body">
        <div>
          © {new Date().getFullYear()} Ramam Textiles. All rights reserved. Handcrafted in Jaipur, Rajasthan.
        </div>
        <div className="flex flex-wrap items-center gap-6 font-medium">
          <button onClick={() => handleNav('/faq')} className="hover:text-[#9B332C] transition-colors cursor-pointer">
            FAQ
          </button>
          <button onClick={() => openPolicyModal('shipping')} className="hover:text-[#9B332C] transition-colors cursor-pointer">
            Shipping &amp; Delivery
          </button>
          <button onClick={() => openPolicyModal('privacy')} className="hover:text-[#9B332C] transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => openPolicyModal('terms')} className="hover:text-[#9B332C] transition-colors cursor-pointer">
            Terms &amp; Conditions
          </button>
          <button onClick={() => openPolicyModal('returns')} className="hover:text-[#9B332C] transition-colors cursor-pointer">
            Returns &amp; Refunds
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
