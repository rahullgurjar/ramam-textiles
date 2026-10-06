import React from 'react';
import { Sparkles, Award, ShieldCheck, Heart, ArrowRight, Building2, MapPin, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '../components/InstagramIcon';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 font-royal-body">
      {/* Hero */}
      <div className="bg-[#1F1612] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-xl border border-[#D4AF37]/30">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('./products/duffle-kantha-patchwork.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1612] via-[#1F1612]/90 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FDF0F3] border border-[#F3CAD6] rounded-full text-[#C8376B] text-xs font-royal-title font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C8376B]" />
            <span>Rooted in the Pink City of Jaipur</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF3DC] leading-tight">
            Preserving Indian Textile Heritage, Empowering Global Modern Fashion.
          </h1>

          <p className="text-stone-300 font-royal-body text-base sm:text-lg leading-relaxed">
            Ramam Textiles is a premier textile design house and wholesale apparel manufacturer established in Jaipur, Rajasthan. We bridge authentic traditional artisan guilds with modern international quality standards.
          </p>
        </div>
      </div>

      {/* Brand Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[28px] border border-stone-200 hover:border-[#C8376B] shadow-sm space-y-3 relative overflow-hidden transition-all">
          <div className="w-14 h-14 bg-[#FDF0F3] text-[#C8376B] rounded-2xl flex items-center justify-center mb-4 border border-[#F3CAD6] shadow-sm">
            <Award className="w-7 h-7 text-[#C8376B]" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-[#1F1612]">Uncompromising Craft Integrity</h3>
          <p className="text-xs sm:text-sm font-royal-body text-stone-600 leading-relaxed">
            We preserve pure handmade block printing techniques, resisting synthetic shortcuts. Every rhythm of the wooden block represents centuries of honed human skill.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[28px] border border-stone-200 hover:border-[#C8376B] shadow-sm space-y-3 relative overflow-hidden transition-all">
          <div className="w-14 h-14 bg-[#FDF0F3] text-[#C8376B] rounded-2xl flex items-center justify-center mb-4 border border-[#F3CAD6] shadow-sm">
            <ShieldCheck className="w-7 h-7 text-[#C8376B]" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-[#1F1612]">Sustainable &amp; Pure Materials</h3>
          <p className="text-xs sm:text-sm font-royal-body text-stone-600 leading-relaxed">
            We use only 100% natural, breathable long-staple Indian cotton, pure Mulberry and Chanderi silks, and certified azo-free herbal and mineral dyes.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[28px] border border-stone-200 hover:border-[#C8376B] shadow-sm space-y-3 relative overflow-hidden transition-all">
          <div className="w-14 h-14 bg-[#FDF0F3] text-[#C8376B] rounded-2xl flex items-center justify-center mb-4 border border-[#F3CAD6] shadow-sm">
            <Heart className="w-7 h-7 text-[#C8376B]" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-[#1F1612]">Artisan Guild Stewardship</h3>
          <p className="text-xs sm:text-sm font-royal-body text-stone-600 leading-relaxed">
            Our artisan partners in Bagru and Sanganer are co-owners of our craft vision. We provide stable year-round employment, safe printing sheds, and dignity in artisan labor.
          </p>
        </div>
      </div>

      {/* Instagram Studio Showcase Card */}
      <div className="bg-[#1F1612] text-white p-8 sm:p-12 rounded-[32px] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-royal-title font-bold uppercase tracking-wider">
            <InstagramIcon className="w-3.5 h-3.5 text-[#C8376B]" />
            <span>Artisan Studio Stories</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white">
            Follow Our Craft Journey on Instagram
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            Discover live workshop demonstrations, woodblock carving timelapses, natural botanical dye baths, and client order preparation on <strong>@ramamtextiles</strong>.
          </p>
        </div>

        <a
          href="https://www.instagram.com/ramamtextiles"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn-rose px-7 py-3.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-xl flex items-center gap-2 relative z-10"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>Follow @ramamtextiles</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Jaipur Presence */}
      <div className="bg-white p-8 sm:p-12 rounded-[32px] border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-royal-title font-bold uppercase tracking-widest text-[#C8376B]">
            <MapPin className="w-4 h-4 text-[#C8376B]" />
            <span>Jaipur Studio &amp; Manufacturing Units</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1F1612]">
            Visit Our Design Studio &amp; Workshop
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            International buyers, designers, and boutique owners are warmly invited to visit our Jaipur design studio and witness block printing and dyeing on our workshop tables.
          </p>
        </div>

        <button
          onClick={() => { onNavigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="pill-btn-dark px-8 py-3.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-lg"
        >
          Schedule Studio Visit
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
