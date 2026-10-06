import React from 'react';
import { Sparkles, Award, Layers, ShieldCheck, ArrowRight, Heart, MapPin } from 'lucide-react';

interface CraftsmanshipPageProps {
  onNavigate: (path: string) => void;
}

export const CraftsmanshipPage: React.FC<CraftsmanshipPageProps> = ({ onNavigate }) => {
  const craftStages = [
    {
      title: '1. Hand Carving of Sheesham Wood Blocks',
      location: 'Sanganer & Jaipur Workshops',
      desc: 'Master wood-carvers (Kharod) spend up to 10 days hand-chiseling intricate botanical and royal lattice patterns into seasoned Sheesham and Teak wood. Each block includes pin-sized air escape holes to allow uniform dye absorption.',
      image: './products/duffle-kantha-patchwork.jpg'
    },
    {
      title: '2. Preparation of Natural & Azo-Free Dyes',
      location: 'Bagru Natural Dye Gardens',
      desc: 'We brew natural mineral and herbal dyes using pomegranate rind (yellow), madder root / manjistha (rich brick red), turmeric, rusted iron filings with jaggery (deep black kashish), and fermented indigo leaves.',
      image: './products/duffle-indigo.jpg'
    },
    {
      title: '3. Bagru Dabu Mud-Resist Printing',
      location: 'Chhipa Artisan Courtyards, Bagru',
      desc: 'A thick paste of local clay (kali mitti), gum (beedan), and sawdust is applied to the fabric using wooden blocks. The sawdust prevents the clay from sticking, allowing the printed areas to resist deep natural indigo vat dyeing.',
      image: './products/duffle-pink-botanical.jpg'
    },
    {
      title: '4. Sun-Drying & River Washing',
      location: 'Sanjarria Riverbed & Open Courtyards',
      desc: 'Dyed fabrics are laid out in the radiant Rajasthan sunlight for natural oxidation. Once the color fixes, fabrics undergo multiple cold-water rinses to remove the mud paste, revealing sharp, crisp natural contrasts.',
      image: './products/tote-sanganeri-ruffle-lifestyle.jpg'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 font-royal-body">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#FDF0F3] border border-[#F3CAD6] rounded-full text-[#C8376B] text-xs font-royal-title font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#C8376B]" />
          <span>Heritage of the Pink City</span>
        </div>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#1F1612]">
          The Art of Jaipur Hand Block Printing
        </h1>
        <p className="text-stone-600 font-royal-body text-base sm:text-lg leading-relaxed">
          An unhurried tradition passed down through generations of Chhipa master artisans in Bagru and Sanganer. Discover the living craft behind every Ramam Textiles creation.
        </p>
      </div>

      {/* Craft Stages */}
      <div className="space-y-12">
        {craftStages.map((stage, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div 
              key={stage.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-[32px] border border-stone-200 shadow-sm relative overflow-hidden group hover:border-[#C8376B] transition-all"
            >
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="aspect-[16/10] rounded-[24px] overflow-hidden shadow-lg border border-stone-200 group-hover:scale-[1.02] transition-transform duration-500 bg-slate-100">
                  <img src={stage.image} alt={stage.title} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-3.5 ${isReversed ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center gap-1.5 text-xs font-royal-title uppercase tracking-widest text-[#C8376B] font-bold">
                  <span>✦</span>
                  <span>{stage.location}</span>
                </div>
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1F1612]">
                  {stage.title}
                </h2>
                <p className="text-stone-600 font-royal-body text-sm sm:text-base leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Artisan Commitment Banner */}
      <div className="bg-[#1F1612] text-[#FAF3DC] p-8 sm:p-12 rounded-[32px] border border-[#D4AF37]/30 text-center max-w-4xl mx-auto space-y-5 shadow-2xl relative overflow-hidden">
        <div className="w-14 h-14 bg-white/10 border border-[#D4AF37]/40 rounded-full flex items-center justify-center mx-auto text-[#E5A93C] shadow-lg">
          <Heart className="w-7 h-7 fill-[#E5A93C]/20" />
        </div>
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#FAF3DC]">Artisan Welfare &amp; Ethical Fair Wages</h3>
        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Every yard of fabric purchased from Ramam Textiles directly supports traditional craft families in Rajasthan. We guarantee safe working conditions, fair wages, zero child labor, and continuous investment in clean water filtration systems.
        </p>
        <div className="pt-2">
          <button
            onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="pill-btn-rose px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-xl"
          >
            Explore Authentic Handcrafted Pieces
          </button>
        </div>
      </div>
    </div>
  );
};

export default CraftsmanshipPage;
