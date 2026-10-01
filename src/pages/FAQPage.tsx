import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageSquare, Mail } from 'lucide-react';
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
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#D4AF37]/25 border border-[#D4AF37]/45 rounded-full text-[#11352A] text-xs font-royal-title font-bold uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Buyer Knowledge Base</span>
        </div>
        <h1 className="font-royal-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#0B241C]">
          Frequently Asked Questions
        </h1>
        <p className="text-[#164335]/80 font-royal-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Everything you need to know about wholesale MOQ, custom private label manufacturing, sampling, and global export shipping.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 absolute left-4 top-4 text-[#11352A]" />
        <input
          type="text"
          placeholder="Search question, keyword, or topic (e.g. MOQ, Samples, Air Cargo)..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-[#D4AF37]/40 rounded-2xl text-xs text-[#0B241C] font-royal-body focus:outline-none focus:border-[#11352A] shadow-sm"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-royal-title font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#0B241C] to-[#164335] text-[#F5E6B5] shadow-md border border-[#D4AF37]'
                : 'bg-white text-[#0B241C] hover:bg-[#FAF7EE] border border-[#D4AF37]/30'
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-[#11352A] bg-white rounded-2xl border-2 border-[#D4AF37]/30 font-royal-body text-sm">
            No matching questions found. Try another search term or contact our Jaipur team directly.
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-gradient-to-br from-[#FAF7EE] to-[#F3EEDB] border-2 border-[#D4AF37]/35 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-royal-title text-base font-bold text-[#0B241C] hover:text-[#11352A] transition-colors"
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#11352A]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-stone-700 font-royal-body text-sm sm:text-base leading-relaxed border-t border-[#D4AF37]/25 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Help Callout */}
      <div className="bg-gradient-to-r from-[#0B241C] via-[#11352A] to-[#0B241C] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-jaipur-jaali opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="font-royal-heading text-xl font-bold text-[#F5E6B5]">Have a specific question not listed here?</h3>
          <p className="text-[#FAF7EE]/80 font-royal-body text-sm mt-1">Our Jaipur export merchandisers reply to all commercial inquiries within 4–6 business hours.</p>
        </div>
        <a
          href="mailto:inquiry@ramamtextiles.com"
          className="btn-royal-gold px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg whitespace-nowrap flex items-center gap-2 relative z-10"
        >
          <Mail className="w-4 h-4 text-[#0B241C]" />
          <span>Email Jaipur Desk</span>
        </a>
      </div>
    </div>
  );
};
