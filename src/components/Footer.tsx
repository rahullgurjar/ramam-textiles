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
  Download,
  BookOpen,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InstagramIcon } from './InstagramIcon';
import { submitToGoogleSheet } from '../utils/googleScript';
import { validateEmailAddress } from '../utils/formValidation';
import { JOURNAL_POSTS } from '../data/journal';
import { resolveProductImage } from '../utils/imageUtils';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { showToast, openPolicyModal } = useApp();
  const [catalogEmail, setCatalogEmail] = useState('');
  const [catalogError, setCatalogError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleCatalogSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRes = validateEmailAddress(catalogEmail);
    if (!emailRes.isValid) {
      const err = emailRes.error || 'Please provide a valid business email address.';
      setCatalogError(err);
      showToast(err, 'error');
      return;
    }

    setCatalogError('');
    submitToGoogleSheet({
      formType: 'Wholesale Catalog PDF Download',
      email: catalogEmail.trim(),
    });

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

      {/* Featured Blog Section in Footer to Boost Site Ranking & User Engagement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[#D4AF37]/25 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#9B332C] font-bold font-royal-title">
              <BookOpen className="w-3.5 h-3.5 text-[#9B332C]" />
              <span>Jaipur Artisan Blog &amp; Sourcing Guides</span>
            </div>
            <h4 className="font-playfair text-xl sm:text-2xl text-[#241A16] font-bold mt-1">
              Textile Chronicles, Fabric Insights &amp; Manufacturing Roadmaps
            </h4>
          </div>
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); handleNav('/blog'); }}
            className="text-xs font-royal-title font-bold text-[#9B332C] hover:text-[#241A16] flex items-center gap-1 transition-colors uppercase tracking-wider shrink-0"
          >
            <span>Read All {JOURNAL_POSTS.length} Guides</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9B332C]" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {JOURNAL_POSTS.slice(0, 3).map(post => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              onClick={(e) => { e.preventDefault(); handleNav(`/blog/${post.slug}`); }}
              className="group bg-white/75 hover:bg-white rounded-2xl p-4 border border-[#D4AF37]/35 hover:border-[#9B332C] transition-all hover:shadow-lg flex items-center gap-3.5 cursor-pointer"
            >
              <img
                src={resolveProductImage(post.image)}
                alt={post.title}
                className="w-16 h-16 rounded-xl object-cover border border-[#D4AF37]/30 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono mb-1">
                  <span className="text-[#9B332C] font-royal-title font-bold uppercase">{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h5 className="font-playfair font-bold text-xs sm:text-sm text-[#241A16] group-hover:text-[#9B332C] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h5>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <a 
              href="/"
              onClick={(e) => { e.preventDefault(); handleNav('/'); }}
              aria-label="Ramam Textiles Jaipur - Return to Homepage"
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF5EE] border-2 border-[#D4AF37] shadow-md flex items-center justify-center p-2 shrink-0 group-hover:border-[#9B332C] transition-colors">
                <picture className="w-full h-full block">
                  <source srcSet="/logo.webp" type="image/webp" />
                  <img 
                    src="/logo.png" 
                    alt="Ramam Textiles Jaipur" 
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
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
            </a>

            <p className="text-xs text-stone-600 leading-relaxed pr-2">
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
                <div>
                  <form onSubmit={handleCatalogSubscribe} className="flex gap-2">
                    <input 
                      type="email" 
                      value={catalogEmail}
                      onChange={e => {
                        setCatalogEmail(e.target.value);
                        if (catalogError) setCatalogError('');
                      }}
                      placeholder="Enter your business email..."
                      className={`flex-1 px-4 py-2 bg-white border ${catalogError ? 'border-red-500' : 'border-[#D4AF37]/40'} rounded-full text-xs text-[#241A16] placeholder-stone-400 focus:outline-none focus:border-[#9B332C]`}
                      required
                    />
                    <button 
                      type="submit"
                      className="pill-btn-rani px-4 py-2 text-xs font-bold uppercase rounded-full shrink-0 shadow-md"
                    >
                      Send PDF
                    </button>
                  </form>
                  {catalogError && (
                    <span className="text-[11px] text-red-600 block mt-1.5 pl-2 font-medium">
                      {catalogError}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="pt-1">
              <a
                href="https://www.instagram.com/ramamtextiles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs hover:bg-[#9B332C] hover:text-white transition-all group shadow-sm font-semibold"
              >
                <InstagramIcon className="w-4 h-4 text-[#9B332C] group-hover:text-white group-hover:scale-110 transition-transform" />
                <span>Follow <strong>@ramamtextiles</strong> on Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-2">
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-4 pb-1 border-b border-[#D4AF37]/25">
              Collections
            </h5>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button onClick={() => handleNav('/category/bags')} className="hover:text-[#9B332C] transition-colors font-semibold text-[#241A16]">
                  Quilted Travel Duffles
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/women')} className="hover:text-[#9B332C] transition-colors">
                  Cosmetic Vanity Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/category/home')} className="hover:text-[#9B332C] transition-colors">
                  Specialty Organizers
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
          <div className="lg:col-span-2">
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-4 pb-1 border-b border-[#D4AF37]/25">
              B2B Portal
            </h5>
            <ul className="space-y-2 text-xs text-stone-600">
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
                  Custom OEM Production
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/custom-manufacturing#process')} className="hover:text-[#9B332C] transition-colors">
                  Sampling &amp; Block Carving
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/lookbook')} className="hover:text-[#9B332C] transition-colors">
                  Editorial Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/craftsmanship')} className="hover:text-[#9B332C] transition-colors">
                  Bagru &amp; Sanganer Craft
                </button>
              </li>
            </ul>
          </div>

          {/* Artisan Blog & Sourcing Guides (Dedicated SEO Ranking Column) */}
          <div className="lg:col-span-2">
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-4 pb-1 border-b border-[#D4AF37]/25">
              Artisan Blog &amp; Guides
            </h5>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <a 
                  href="/blog/alchemy-of-bagru-dabu-indigo" 
                  onClick={(e) => { e.preventDefault(); handleNav('/blog/alchemy-of-bagru-dabu-indigo'); }}
                  className="hover:text-[#9B332C] transition-colors line-clamp-1"
                  title="Bagru Dabu Mud-Resist Printing and Indigo Dyeing Guide"
                >
                  Bagru Dabu &amp; Indigo Guide
                </a>
              </li>
              <li>
                <a 
                  href="/blog/sourcing-guide-pure-cotton-mulmul" 
                  onClick={(e) => { e.preventDefault(); handleNav('/blog/sourcing-guide-pure-cotton-mulmul'); }}
                  className="hover:text-[#9B332C] transition-colors line-clamp-1"
                  title="Sourcing Pure Jaipur Cotton Mulmul & Cambric"
                >
                  Pure Cotton Mulmul Sourcing
                </a>
              </li>
              <li>
                <a 
                  href="/blog/block-print-vs-screen-print-guide" 
                  onClick={(e) => { e.preventDefault(); handleNav('/blog/block-print-vs-screen-print-guide'); }}
                  className="hover:text-[#9B332C] transition-colors font-semibold text-[#241A16] line-clamp-1"
                  title="Hand Block Print vs Screen Print Identification Guide"
                >
                  Block Print vs Screen Print
                </a>
              </li>
              <li>
                <a 
                  href="/blog/how-to-launch-private-label-apparel" 
                  onClick={(e) => { e.preventDefault(); handleNav('/blog/how-to-launch-private-label-apparel'); }}
                  className="hover:text-[#9B332C] transition-colors line-clamp-1"
                  title="How to Launch Private Label Apparel and Bag Line"
                >
                  Private Label Production Guide
                </a>
              </li>
              <li>
                <a 
                  href="/blog/low-moq-textile-sourcing-india-guide" 
                  onClick={(e) => { e.preventDefault(); handleNav('/blog/low-moq-textile-sourcing-india-guide'); }}
                  className="hover:text-[#9B332C] transition-colors line-clamp-1"
                  title="Low-MOQ Textile Sourcing and Export from India"
                >
                  Low-MOQ Sourcing &amp; Export
                </a>
              </li>
              <li className="pt-1">
                <a 
                  href="/blog" 
                  onClick={(e) => { e.preventDefault(); handleNav('/blog'); }}
                  className="text-[#9B332C] font-royal-title font-bold text-[11px] hover:underline flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>All Sourcing Guides</span>
                  <ArrowRight className="w-3 h-3 text-[#9B332C]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Atelier Contact */}
          <div className="lg:col-span-2">
            <h5 className="font-royal-title text-xs uppercase tracking-widest text-[#9B332C] font-bold mb-4 pb-1 border-b border-[#D4AF37]/25">
              Jaipur Atelier
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9B332C] shrink-0 mt-0.5" />
                <span>Jaipur, Rajasthan 302020, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9B332C] shrink-0" />
                <a href="tel:+911412890000" className="hover:text-[#9B332C] font-semibold text-[#241A16] transition-colors" title="Call Atelier">
                  +91 141 289 0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#9B332C] shrink-0" />
                <a href="mailto:ramamtextiles@gmail.com" className="hover:text-[#9B332C] font-semibold text-[#241A16] transition-colors" title="Email Atelier Desk">
                  ramamtextiles@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => handleNav('/contact')}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[11px] text-[#9B332C] hover:bg-[#9B332C] hover:text-white transition-all font-royal-title font-bold shadow-sm"
                >
                  <span>Book Studio Visit</span>
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
        <div className="flex flex-wrap items-center gap-5 font-medium">
          <a href="/blog" onClick={(e) => { e.preventDefault(); handleNav('/blog'); }} className="hover:text-[#9B332C] transition-colors cursor-pointer font-semibold text-[#241A16]">
            Artisan Blog &amp; Guides
          </a>
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
          <a
            href="/admin"
            onClick={(e) => { e.preventDefault(); navigate('/admin'); }}
            className="hover:text-[#9B332C] transition-colors cursor-pointer flex items-center gap-1 text-stone-400 hover:text-stone-700"
            title="Internal Staff & SEO Control Room"
          >
            <Lock className="w-3 h-3" />
            <span>Atelier Portal</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
