import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { InstagramIcon } from '../components/InstagramIcon';
import { resolveProductImage, resolveWebpImage } from '../utils/imageUtils';
import { usePageSEO, DEFAULT_SEO } from '../utils/seo';

interface FAQPageProps {
  onNavigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  usePageSEO(DEFAULT_SEO.faq);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIds, setOpenIds] = useState<string[]>([FAQS[0]?.id || 'faq-1']);

  const categories = ['all', 'Wholesale & MOQ', 'Custom Manufacturing', 'Fabrics & Quality', 'Shipping & Export', 'Ordering & Payments', 'Returns & Quality'];

  const filteredFaqs = FAQS.filter(f => {
    const matchCat = selectedCategory === 'all' || f.category === selectedCategory;
    if (!matchCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
  });

  const toggleOpen = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12 font-royal-body">
      {/* Hero Banner */}
      <div className="bg-[#FAF0EB] text-[#241A16] rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-[#D4AF37]/40 shadow-sm text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${resolveWebpImage('/products/vanity-trio-marigold-cream.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-[#FAF0EB]/85" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0EB] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-widest shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>Buyer Knowledge Base</span>
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#241A16]">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-700 font-royal-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know about wholesale MOQ, custom manufacturing, sampling, and global export shipping.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 absolute left-4 top-4 text-[#9B332C]" />
        <input
          type="text"
          placeholder="Search question, keyword, or topic (e.g. MOQ, Samples, Air Cargo)..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-[#FAF5EE] border border-[#D4AF37]/35 rounded-full text-xs text-[#241A16] font-royal-body focus:outline-none focus:border-[#9B332C] shadow-sm"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`pill-nav-btn text-xs ${
              selectedCategory === cat
                ? 'pill-nav-btn-active bg-[#9B332C] text-white border-[#9B332C]'
                : ''
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-stone-600 bg-[#FAF5EE] rounded-2xl border border-[#D4AF37]/35 font-royal-body text-sm">
            No matching questions found. Try another search term or message us on Instagram @ramamtextiles.
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-[#FAF5EE] border border-[#D4AF37]/35 hover:border-[#9B332C] rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-royal-title text-sm sm:text-base font-bold text-[#241A16] hover:text-[#9B332C] transition-colors"
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#9B332C] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-stone-600 font-royal-body text-xs sm:text-sm leading-relaxed border-t border-[#D4AF37]/20 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Help Callout */}
      <div className="bg-[#FAF0EB] text-[#241A16] p-6 sm:p-8 rounded-[28px] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-jaipur-jaali opacity-30 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="font-playfair text-xl font-bold text-[#241A16]">Have a specific question not listed here?</h3>
          <p className="text-stone-700 font-royal-body text-xs sm:text-sm mt-1">Our Jaipur export merchandisers are available on Instagram DM for instant consultations.</p>
        </div>
        <a
          href="https://www.instagram.com/ramamtextiles"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn-rani px-7 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-md whitespace-nowrap flex items-center gap-2 relative z-10"
        >
          <InstagramIcon className="w-4 h-4 text-white" />
          <span>DM @ramamtextiles</span>
        </a>
      </div>
    </div>
  );
};

export default FAQPage;
