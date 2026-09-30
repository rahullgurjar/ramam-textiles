import React from 'react';
import { Sparkles, Award, ShieldCheck, Heart, ArrowRight, Building2, MapPin } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero */}
      <div className="bg-[#0E1612] text-white rounded-2xl p-8 sm:p-14 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1612] via-[#0E1612]/85 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rooted in the Pink City</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Preserving Indian Textile Heritage, Empowering Global Modern Fashion.
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Ramam Textiles is a premier textile design house and wholesale apparel manufacturer established in Jaipur, Rajasthan. We bridge authentic traditional artisan guilds with modern international quality standards.
          </p>
        </div>
      </div>

      {/* Brand Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#FAF7F2] p-8 rounded-xl border border-amber-900/15 space-y-3">
          <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-lg flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">Uncompromising Craft Integrity</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We preserve pure handmade block printing techniques, resisting synthetic shortcuts. Every rhythm of the wooden block represents centuries of honed human skill.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-8 rounded-xl border border-amber-900/15 space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">Sustainable & Pure Materials</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We use only 100% natural, breathable long-staple Indian cotton, pure Mulberry and Chanderi silks, and certified azo-free herbal and mineral dyes.
          </p>
        </div>

        <div className="bg-[#FAF7F2] p-8 rounded-xl border border-amber-900/15 space-y-3">
          <div className="w-12 h-12 bg-rose-100 text-rose-900 rounded-lg flex items-center justify-center mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">Artisan Guild Stewardship</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Our artisan partners in Bagru and Sanganer are co-owners of our craft vision. We provide stable year-round employment, safe printing sheds, and dignity in artisan labor.
          </p>
        </div>
      </div>

      {/* Jaipur Presence */}
      <div className="bg-[#F6F2EA] p-8 sm:p-12 rounded-2xl border border-amber-900/15 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#942C29]">
            <MapPin className="w-4 h-4" />
            <span>Jaipur Studio & Manufacturing Units</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Visit Our Design Studio & Workshop
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            International buyers, designers, and boutique owners are warmly invited to visit our Jaipur design studio and witness block printing and dyeing on our workshop tables.
          </p>
        </div>

        <button
          onClick={() => { onNavigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="px-6 py-3.5 bg-[#0E1612] text-amber-100 font-serif font-bold text-xs uppercase tracking-widest rounded hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors whitespace-nowrap shadow"
        >
          Schedule Studio Visit
        </button>
      </div>
    </div>
  );
};
