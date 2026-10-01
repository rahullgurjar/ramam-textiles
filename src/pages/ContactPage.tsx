import React, { useState } from 'react';
import { 
  MapPin, Mail, Clock, Send, MessageSquare, CheckCircle2, 
  Building2, Globe2, Sparkles, ShieldCheck, ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InstagramIcon } from '../components/InstagramIcon';

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
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#D4AF37]/25 border border-[#D4AF37]/45 rounded-full text-[#751B19] text-xs font-royal-title font-bold uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Jaipur Royal Export Desk</span>
        </div>
        <h1 className="font-royal-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#4D0E0D]">
          Connect With Ramam Textiles
        </h1>
        <p className="text-[#751B19]/80 font-royal-body text-base sm:text-lg leading-relaxed">
          Reach our Jaipur design studio, wholesale export desk, and master craftsman workshops. We support international buyers across all time zones.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-r from-[#4D0E0D] via-[#751B19] to-[#4D0E0D] text-white p-8 rounded-3xl border-2 border-[#D4AF37]/40 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-jaipur-jaali opacity-10 pointer-events-none" />
            <h3 className="font-royal-heading text-2xl font-bold text-[#F5E6B5]">Direct Jaipur Atelier Offices</h3>

            <div className="space-y-4 text-xs sm:text-sm font-royal-body relative z-10">
              <div className="flex items-start gap-3.5 text-[#FAF6EE]/90">
                <div className="p-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-royal-title text-sm">Main Studio &amp; Showroom:</strong>
                  <span>Sanganer &amp; Bagru Artisan Industrial Zone, Jaipur, Rajasthan 302020, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-[#FAF6EE]/90">
                <div className="p-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-royal-title text-sm">Wholesale &amp; Export Inquiries:</strong>
                  <a href="mailto:exports@ramamtextiles.com" className="text-[#F5E6B5] hover:underline">exports@ramamtextiles.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-[#FAF6EE]/90">
                <div className="p-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-royal-title text-sm">General Commercial Desk:</strong>
                  <a href="mailto:inquiry@ramamtextiles.com" className="text-[#F5E6B5] hover:underline">inquiry@ramamtextiles.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-[#FAF6EE]/90">
                <div className="p-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-royal-title text-sm">Studio Hours (IST):</strong>
                  <span>Monday – Saturday: 9:30 AM – 7:30 PM (IST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-[#FAF6EE]/90 pt-3 border-t border-[#D4AF37]/30">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#833ab4]/40 to-[#fd1d1d]/40 border border-[#E1306C]/40 text-[#E1306C] flex-shrink-0 mt-0.5">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-royal-title text-sm">Official Instagram:</strong>
                  <a 
                    href="https://www.instagram.com/ramamtextiles" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#F5E6B5] hover:text-white inline-flex items-center gap-1 font-semibold"
                  >
                    <span>@ramamtextiles</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[11px] text-[#FAF6EE]/70 mt-0.5">Behind-the-scenes printing table footage &amp; new lookbook drops.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FAF6EE] to-[#F3EADB] p-6 rounded-3xl border-2 border-[#D4AF37]/30 space-y-2.5 shadow-md">
            <h4 className="font-royal-title font-bold text-[#4D0E0D] text-sm">International Client Showroom Visits</h4>
            <p className="text-xs font-royal-body text-stone-700 leading-relaxed">
              We arrange direct factory pick-up from Jaipur International Airport (JAI) or Jaipur Junction Railway Station for commercial buyers visiting for sampling and production sign-off.
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#FAF6EE] to-[#F3EADB] p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37]/35 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-jaipur-jaali opacity-10 pointer-events-none" />

          {isSubmitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-royal-heading text-3xl font-bold text-[#4D0E0D]">Inquiry Received!</h3>
              <p className="text-stone-700 font-royal-body text-base max-w-md mx-auto leading-relaxed">
                Thank you <strong>{name}</strong>. Our commercial export merchandiser will review your inquiry and reply with complete product catalogs, swatch schedules, and pricing within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-royal-gold px-8 py-3 rounded-xl text-xs font-royal-title uppercase font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-royal-body relative z-10">
              <div className="border-b border-[#D4AF37]/30 pb-3 mb-4">
                <h3 className="font-royal-heading text-2xl font-bold text-[#4D0E0D]">Commercial Inquiry Form</h3>
                <p className="text-xs text-[#751B19]/80">Provide your requirements for wholesale orders, custom manufacturing, or sampling.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-royal-title uppercase tracking-wider text-[#4D0E0D] font-bold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#4D0E0D] focus:outline-none focus:border-[#751B19]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-royal-title uppercase tracking-wider text-[#4D0E0D] font-bold mb-1">
                    Company / Boutique Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Atelier Jaipur Paris"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#4D0E0D] focus:outline-none focus:border-[#751B19]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-royal-title uppercase tracking-wider text-[#4D0E0D] font-bold mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="buyer@brand.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#4D0E0D] focus:outline-none focus:border-[#751B19]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-royal-title uppercase tracking-wider text-[#4D0E0D] font-bold mb-1">
                    Buyer Country / Port
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. USA, UK, UAE, Germany"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#4D0E0D] focus:outline-none focus:border-[#751B19]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-royal-title uppercase tracking-wider text-[#4D0E0D] font-bold mb-1">
                  Inquiry Purpose
                </label>
                <select
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#4D0E0D] focus:outline-none focus:border-[#751B19]"
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
                <label className="block text-xs font-royal-title uppercase tracking-wider text-[#4D0E0D] font-bold mb-1">
                  Message / Specifications *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your requirements, target product categories, estimated quantity, timeline, or destination country..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full p-3.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#4D0E0D] focus:outline-none focus:border-[#751B19]"
                />
              </div>

              <button
                type="submit"
                className="btn-royal-gold w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl flex items-center justify-center gap-2"
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
