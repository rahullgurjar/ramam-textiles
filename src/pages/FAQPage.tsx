import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';
import { FAQS } from '../data/faqs';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#0E1612] text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Buyer Knowledge Base</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Everything you need to know about wholesale MOQ, custom private label manufacturing, sampling, and global export shipping.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
        <input
          type="text"
          placeholder="Search question, keyword, or topic (e.g. MOQ, Samples, Air Cargo)..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#0E1612] text-amber-100 shadow'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-stone-500 bg-white rounded-xl border border-stone-200">
            No matching questions found. Try another search term or contact our Jaipur team directly.
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-[#FAF7F2] border border-amber-900/15 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-base font-bold text-stone-900 hover:text-[#942C29] transition-colors"
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-stone-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#942C29]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-200/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Help Callout */}
      <div className="bg-[#0E1612] text-white p-6 sm:p-8 rounded-2xl border border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-serif text-xl font-bold text-white">Have a specific question not listed here?</h3>
          <p className="text-stone-400 text-xs mt-1">Our Jaipur export merchandisers are available on WhatsApp 6 days a week.</p>
        </div>
        <button
          onClick={() => window.open('https://wa.me/919351291471?text=Hello%20Ramam%20Textiles,%20I%20have%20a%20question%20regarding%20wholesale%20orders.', '_blank')}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-serif font-bold text-xs uppercase tracking-wider rounded shadow transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Ask On WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
