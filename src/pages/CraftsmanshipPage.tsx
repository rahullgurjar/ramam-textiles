import React from 'react';
import { Sparkles, Award, Layers, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

interface CraftsmanshipPageProps {
  onNavigate: (path: string) => void;
}

export const CraftsmanshipPage: React.FC<CraftsmanshipPageProps> = ({ onNavigate }) => {
  const craftStages = [
    {
      title: '1. Hand Carving of Sheesham Wood Blocks',
      location: 'Sanganer & Jaipur Workshops',
      desc: 'Master wood-carvers (Kharod) spend up to 10 days hand-chiseling intricate botanical and royal lattice patterns into seasoned Sheesham and Teak wood. Each block includes pin-sized air escape holes to allow uniform dye absorption.',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: '2. Preparation of Natural & Azo-Free Dyes',
      location: 'Bagru Natural Dye Gardens',
      desc: 'We brew natural mineral and herbal dyes using pomegranate rind (yellow), madder root / manjistha (rich brick red), turmeric, rusted iron filings with jaggery (deep black kashish), and fermented indigo leaves.',
      image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: '3. Bagru Dabu Mud-Resist Printing',
      location: 'Chhipa Artisan Courtyards, Bagru',
      desc: 'A thick paste of local clay (kali mitti), gum (beedan), and sawdust is applied to the fabric using wooden blocks. The sawdust prevents the clay from sticking, allowing the printed areas to resist deep natural indigo vat dyeing.',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: '4. Sun-Drying & River Washing',
      location: 'Sanjarria Riverbed & Open Courtyards',
      desc: 'Dyed fabrics are laid out in the radiant Rajasthan sunlight for natural oxidation. Once the color fixes, fabrics undergo multiple cold-water rinses to remove the mud paste, revealing sharp, crisp natural contrasts.',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#0E1612] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Heritage of the Pink City</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
          The Art of Jaipur Hand Block Printing
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          An unhurried tradition passed down through generations of Chhipa master artisans in Bagru and Sanganer. Discover the living craft behind every Ramam Textiles creation.
        </p>
      </div>

      {/* Craft Stages */}
      <div className="space-y-16">
        {craftStages.map((stage, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div 
              key={stage.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F2] p-6 sm:p-10 rounded-2xl border border-amber-900/15"
            >
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-lg">
                  <img src={stage.image} alt={stage.title} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-3 ${isReversed ? 'lg:order-1' : ''}`}>
                <span className="text-xs uppercase tracking-widest text-[#942C29] font-bold">
                  {stage.location}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {stage.title}
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Artisan Commitment Banner */}
      <div className="bg-[#0E1612] text-white p-8 sm:p-12 rounded-2xl border border-amber-900/30 text-center max-w-4xl mx-auto space-y-4">
        <div className="w-12 h-12 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
          <Heart className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold">Artisan Welfare & Ethical Fair Wages</h3>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
          Every yard of fabric purchased from Ramam Textiles directly supports traditional craft families in Rajasthan. We guarantee safe working conditions, fair wages, zero child labor, and continuous investment in clean water filtration systems.
        </p>
        <div className="pt-2">
          <button
            onClick={() => { onNavigate('/shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#bfa238] text-[#0E1612] font-serif font-bold text-xs uppercase tracking-widest rounded shadow transition-colors"
          >
            Explore Authentic Handcrafted Pieces
          </button>
        </div>
      </div>
    </div>
  );
};
