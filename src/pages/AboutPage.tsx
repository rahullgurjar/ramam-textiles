import React from 'react';
import { Sparkles, Award, ShieldCheck, Heart, ArrowRight, Building2, MapPin, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../components/InstagramIcon';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#541712] via-[#7E2822] to-[#541712] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-jaipur-jaali opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/60 rounded-full text-[#F5E6B5] text-xs font-royal-title font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Rooted in the Pink City of Jaipur</span>
          </div>

          <h1 className="font-royal-heading text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Preserving Indian Textile Heritage, Empowering Global Modern Fashion.
          </h1>

          <p className="text-[#F5E6B5]/90 font-royal-body text-base sm:text-lg leading-relaxed">
            Ramam Textiles is a premier textile design house and wholesale apparel manufacturer established in Jaipur, Rajasthan. We bridge authentic traditional artisan guilds with modern international quality standards.
          </p>
        </div>
      </div>

      {/* Brand Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border-2 border-stone-200 hover:border-[#D4AF37] shadow-sm space-y-3 relative overflow-hidden transition-all jharokha-arch-card">
          <div className="w-14 h-14 bg-[#FAF0EC] text-[#7E2822] rounded-2xl flex items-center justify-center mb-4 border border-[#D4AF37]/40 shadow-sm">
            <Award className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <h3 className="font-royal-heading text-xl font-bold text-[#7E2822]">Uncompromising Craft Integrity</h3>
          <p className="text-xs sm:text-sm font-royal-body text-stone-600 leading-relaxed">
            We preserve pure handmade block printing techniques, resisting synthetic shortcuts. Every rhythm of the wooden block represents centuries of honed human skill.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-stone-200 hover:border-[#D4AF37] shadow-sm space-y-3 relative overflow-hidden transition-all jharokha-arch-card">
          <div className="w-14 h-14 bg-[#FAF0EC] text-[#7E2822] rounded-2xl flex items-center justify-center mb-4 border border-[#D4AF37]/40 shadow-sm">
            <ShieldCheck className="w-7 h-7 text-[#7E2822]" />
          </div>
          <h3 className="font-royal-heading text-xl font-bold text-[#7E2822]">Sustainable & Pure Materials</h3>
          <p className="text-xs sm:text-sm font-royal-body text-stone-600 leading-relaxed">
            We use only 100% natural, breathable long-staple Indian cotton, pure Mulberry and Chanderi silks, and certified azo-free herbal and mineral dyes.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-stone-200 hover:border-[#D4AF37] shadow-sm space-y-3 relative overflow-hidden transition-all jharokha-arch-card">
          <div className="w-14 h-14 bg-[#FAF0EC] text-[#7E2822] rounded-2xl flex items-center justify-center mb-4 border border-[#D4AF37]/40 shadow-sm">
            <Heart className="w-7 h-7 text-[#D4AF37]" />
          </div>
          <h3 className="font-royal-heading text-xl font-bold text-[#7E2822]">Artisan Guild Stewardship</h3>
          <p className="text-xs sm:text-sm font-royal-body text-stone-600 leading-relaxed">
            Our artisan partners in Bagru and Sanganer are co-owners of our craft vision. We provide stable year-round employment, safe printing sheds, and dignity in artisan labor.
          </p>
        </div>
      </div>

      {/* Instagram Studio Showcase Card */}
      <div className="bg-gradient-to-r from-[#541712] via-[#7E2822] to-[#541712] text-white p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-jaipur-jaali opacity-10 pointer-events-none" />
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 border border-[#E1306C]/50 text-white text-xs font-royal-title font-bold uppercase tracking-wider">
            <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>Artisan Studio Stories</span>
          </div>
          <h2 className="font-royal-heading text-2xl sm:text-3xl font-bold text-white">
            Follow Our Craft Journey on Instagram
          </h2>
          <p className="text-sm font-royal-body text-[#F5E6B5]/90 leading-relaxed">
            Discover live workshop demonstrations, woodblock carving timelapses, natural botanical dye baths, and client order preparation on <strong>@ramamtextiles</strong>.
          </p>
        </div>

        <a
          href="https://www.instagram.com/ramamtextiles"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-royal-title font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap shadow-xl flex items-center gap-2 relative z-10"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>Follow @ramamtextiles</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Jaipur Presence */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-stone-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-royal-title font-bold uppercase tracking-widest text-[#7E2822]">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Jaipur Studio &amp; Manufacturing Units</span>
          </div>
          <h2 className="font-royal-heading text-2xl sm:text-3xl font-bold text-[#7E2822]">
            Visit Our Design Studio &amp; Workshop
          </h2>
          <p className="text-sm font-royal-body text-stone-600 leading-relaxed">
            International buyers, designers, and boutique owners are warmly invited to visit our Jaipur design studio and witness block printing and dyeing on our workshop tables.
          </p>
        </div>

        <button
          onClick={() => { onNavigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="btn-jaipur-pink px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl whitespace-nowrap shadow-xl"
        >
          Schedule Studio Visit
        </button>
      </div>
    </div>
  );
};
