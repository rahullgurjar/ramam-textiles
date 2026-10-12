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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0EB] border border-[#EACAC0] rounded-full text-[#9B332C] text-xs font-royal-title font-bold uppercase tracking-widest shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 text-[#9B332C]" />
          <span>Jaipur Artisan Atelier &amp; Export Desk</span>
        </div>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#241A16]">
          Connect With Ramam Textiles
        </h1>
        <p className="text-stone-600 font-royal-body text-base sm:text-lg leading-relaxed">
          Reach our Jaipur design studio, wholesale production workshop, and master craftsman quarters. Direct manufacturer coordination for global boutiques &amp; brands.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-[#241A16] via-[#2E201B] to-[#241A16] text-[#FAF5EE] p-8 rounded-[32px] border border-[#D4AF37]/40 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-15 pointer-events-none" />
            <h3 className="font-playfair text-2xl font-bold text-[#F5E6B5]">Direct Jaipur Atelier Offices</h3>

            <div className="space-y-5 text-xs sm:text-sm font-royal-body relative z-10">
              <div className="flex items-start gap-3.5 text-stone-200">
                <div className="p-2 rounded-xl bg-white/10 border border-[#D4AF37]/35 text-[#E5A93C] flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-royal-title text-sm">Main Studio &amp; Production Workshop:</strong>
                  <span className="text-stone-300">Sanganer &amp; Bagru Artisan Industrial Zone, Jaipur, Rajasthan 302020, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-stone-200">
                <div className="p-2 rounded-xl bg-white/10 border border-[#D4AF37]/35 text-[#E5A93C] flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-royal-title text-sm">Studio Working Hours (IST):</strong>
                  <span className="text-stone-300">Monday – Saturday: 9:30 AM – 7:30 PM (IST)</span>
                </div>
              </div>

              {/* Highlighted Instagram Official Connect */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-[#D4AF37]/40 space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-tr from-[#fd1d1d] to-[#833ab4] text-white">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A93C] font-royal-title block">
                      Primary Contact &amp; Social Desk
                    </span>
                    <a 
                      href="https://www.instagram.com/ramamtextiles" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#E5A93C] font-bold text-base inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>@ramamtextiles</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#E5A93C]" />
                    </a>
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed pt-1">
                  Connect directly on Instagram DM for instant wholesale quotes, fabric swatch videos, custom printing runs, and live workshop demonstrations.
                </p>
                <div className="pt-1">
                  <a
                    href="https://www.instagram.com/ramamtextiles"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn-rose text-xs py-2 px-4 rounded-full inline-flex items-center gap-2 shadow-md w-full justify-center"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-white" />
                    <span>Send Message on Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF5EE] p-6 rounded-[28px] border border-[#D4AF37]/35 space-y-2.5 shadow-sm">
            <h4 className="font-royal-title font-bold text-[#241A16] text-sm">International Client Showroom Visits</h4>
            <p className="text-xs font-royal-body text-stone-600 leading-relaxed">
              We arrange direct factory pick-up from Jaipur International Airport (JAI) or Jaipur Junction Railway Station for commercial buyers visiting for sampling and production sign-off.
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-[#FAF5EE] p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/35 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-jaipur-jaali opacity-10 pointer-events-none" />

          {isSubmitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-20 h-20 bg-[#FAF0EB] text-[#9B332C] rounded-full flex items-center justify-center mx-auto border-2 border-[#EACAC0] shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-3xl font-bold text-[#241A16]">Inquiry Received!</h3>
              <p className="text-stone-700 font-royal-body text-base max-w-md mx-auto leading-relaxed">
                Thank you <strong>{name}</strong>. Our commercial export merchandiser will review your inquiry and reply with complete product catalogs, swatch schedules, and pricing within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="pill-btn-rose px-8 py-3 rounded-full text-xs font-royal-title uppercase font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-royal-body relative z-10">
              <div className="border-b border-[#D4AF37]/25 pb-3 mb-4">
                <h3 className="font-playfair text-2xl font-bold text-[#241A16]">Commercial Inquiry Form</h3>
                <p className="text-xs text-stone-500 font-royal-body">Provide your requirements for wholesale orders, custom manufacturing, or sampling.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                    Company / Boutique Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Atelier Jaipur Paris"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="buyer@brand.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                    Buyer Country / Port
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. USA, UK, UAE, Germany"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                  Inquiry Purpose
                </label>
                <select
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]"
                >
                  <option>Wholesale Ready-to-Order Catalog &amp; Pricing</option>
                  <option>Custom Manufacturing / OEM Production</option>
                  <option>Fabric Yardage by the Meter (Bulk Rolls)</option>
                  <option>Physical Swatch Kit Courier Request</option>
                  <option>Jaipur Factory / Showroom Visit</option>
                  <option>Retail Order Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-royal-title uppercase tracking-wider text-[#241A16] font-bold mb-1">
                  Message / Specifications *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your requirements, target product categories, estimated quantity, timeline, or destination country..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full p-3.5 bg-[#F5EDE1] border border-[#D4AF37]/35 rounded-xl text-xs text-[#241A16] focus:outline-none focus:border-[#9B332C] focus:bg-[#FAF5EE]"
                />
              </div>

              <button
                type="submit"
                className="pill-btn-rose w-full py-4 text-xs font-bold uppercase tracking-widest rounded-full shadow-xl flex items-center justify-center gap-2"
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
