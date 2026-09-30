import React, { useState } from 'react';
import { 
  MapPin, Mail, Clock, Send, MessageSquare, CheckCircle2, 
  Building2, Globe2, Sparkles, ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [inquiryType, setInquiryType] = useState('Wholesale Catalog & Pricing');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Your inquiry has been sent to our Jaipur export desk!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#0E1612] text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Jaipur Export Desk</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
          Connect With Ramam Textiles
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Reach our Jaipur design studio, wholesale export desk, and master craftsman workshops. We support international buyers across all time zones.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0E1612] text-white p-8 rounded-2xl border border-amber-900/30 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">Direct Jaipur Offices</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-stone-300">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">Main Studio & Showroom:</strong>
                  <span>Sanganer &amp; Bagru Artisan Industrial Zone, Jaipur, Rajasthan 302020, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-stone-300">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">Wholesale &amp; Export Inquiries:</strong>
                  <a href="mailto:exports@ramamtextiles.com" className="hover:text-amber-200">exports@ramamtextiles.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-stone-300">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">General Commercial Desk:</strong>
                  <a href="mailto:inquiry@ramamtextiles.com" className="hover:text-amber-200">inquiry@ramamtextiles.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-stone-300">
                <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif">Studio Hours (IST):</strong>
                  <span>Monday – Saturday: 9:30 AM – 7:30 PM (IST)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-amber-900/15 space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm">International Client Showroom Visits</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We arrange direct factory pick-up from Jaipur International Airport (JAI) or Jaipur Junction Railway Station for commercial buyers visiting for sampling and production sign-off.
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-[#FAF7F2] p-8 sm:p-10 rounded-2xl border border-amber-900/15">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-stone-900">Inquiry Received!</h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Thank you <strong>{name}</strong>. Our commercial export merchandiser will review your inquiry and reply with complete product catalogs, swatch schedules, and pricing within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 bg-[#0E1612] text-amber-100 rounded text-xs font-serif uppercase font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-stone-200 pb-3 mb-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900">Commercial Inquiry Form</h3>
                <p className="text-xs text-stone-500">Provide your requirements for wholesale orders, custom manufacturing, or sampling.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Company / Boutique Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Atelier Jaipur Paris"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="buyer@brand.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Buyer Country / Port
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. USA, UK, UAE, Germany"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Inquiry Purpose
                </label>
                <select
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                >
                  <option>Wholesale Ready-to-Order Catalog & Pricing</option>
                  <option>Custom Garment Manufacturing / Private Label OEM</option>
                  <option>Fabric Yardage by the Meter (Bulk Rolls)</option>
                  <option>Physical Swatch Kit Courier Request</option>
                  <option>Jaipur Factory / Showroom Visit</option>
                  <option>Retail Order Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Message / Specifications *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your requirements, target product categories, estimated quantity, timeline, or destination country..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full p-3 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0E1612] text-amber-100 font-serif font-bold text-xs uppercase tracking-widest rounded shadow hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Jaipur Merchandiser</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
