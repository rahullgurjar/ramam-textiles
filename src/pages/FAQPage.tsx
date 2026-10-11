import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { InstagramIcon } from '../components/InstagramIcon';

interface FAQPageProps {
  onNavigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIds, setOpenIds] = useState<string[]>([FAQS[0]?.id || 'faq-1']);

  const categories = ['all', 'Wholesale & MOQ', 'Custom Manufacturing', 'Fabrics & Quality', 'Shipping & Export', 'Ordering & Payments'];

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
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0EB] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-widest shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-[#9B332C]" />
          <span>Buyer Knowledge Base</span>
        </div>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#241A16]">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 font-royal-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Everything you need to know about wholesale MOQ, custom private label manufacturing, sampling, and global export shipping.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 absolute left-4 top-4 text-[#9B332C]" />
        <input
          type="text"
          placeholder="Search question, keyword, or topic (e.g. MOQ, Samples, Air Cargo)..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E0D6CB] rounded-full text-xs text-[#241A16] font-royal-body focus:outline-none focus:border-[#9B332C] shadow-sm"
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
          <div className="p-8 text-center text-stone-600 bg-white rounded-2xl border border-stone-200 font-royal-body text-sm">
            No matching questions found. Try another search term or message us on Instagram @ramamtextiles.
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white border border-[#E0D6CB] hover:border-[#D48B7A] rounded-2xl overflow-hidden transition-all shadow-sm"
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
                  <div className="px-5 pb-5 pt-1 text-stone-600 font-royal-body text-xs sm:text-sm leading-relaxed border-t border-stone-100 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Help Callout */}
      <div className="bg-gradient-to-br from-[#241A16] via-[#2F211C] to-[#241A16] text-[#FAF5EE] p-6 sm:p-8 rounded-[28px] border border-[#D4AF37]/35 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-15 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="font-playfair text-xl font-bold text-[#F5E6B5]">Have a specific question not listed here?</h3>
          <p className="text-stone-300 font-royal-body text-xs sm:text-sm mt-1">Our Jaipur export merchandisers are available on Instagram DM for instant consultations.</p>
        </div>
        <a
          href="https://www.instagram.com/ramamtextiles"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn-rose px-7 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg whitespace-nowrap flex items-center gap-2 relative z-10"
        >
          <InstagramIcon className="w-4 h-4 text-white" />
          <span>DM @ramamtextiles</span>
        </a>
      </div>
    </div>
  );
};

export default FAQPage;
