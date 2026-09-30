import React from 'react';
import { 
  Scissors, Sparkles, CheckCircle2, ShieldCheck, Layers, FileText, 
  Send, PhoneCall, Package, Award, ArrowRight, HelpCircle
} from 'lucide-react';
import { CustomManufacturingWizard } from '../components/CustomManufacturingWizard';

interface CustomManufacturingPageProps {
  onNavigate: (path: string) => void;
}

export const CustomManufacturingPage: React.FC<CustomManufacturingPageProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Design Brief & Tech Pack',
      desc: 'Submit your moodboard, CAD sketches, dimension specs, or physical reference samples. Our technical merchandisers review fit and feasibility.'
    },
    {
      num: '02',
      title: 'Custom Wooden Block Carving',
      desc: 'Our master chisellers hand-carve your custom brand motifs into seasoned Sheesham teak wood blocks within 4-6 business days.'
    },
    {
      num: '03',
      title: 'Lab Dip & Prototype Approval',
      desc: 'We dye lab dips in your exact Pantone shades and stitch pre-production fit samples for your physical review before cutting bulk yardage.'
    },
    {
      num: '04',
      title: 'Bulk Artisan Printing & Stitching',
      desc: 'Hand printing by seasoned artisans, river washing, steam setting, single-needle garment tailoring, and private label tag attachment.'
    },
    {
      num: '05',
      title: '4-Point Quality Audit & Export',
      desc: 'Zero-defect inspection, steam pressing, custom polybag packaging, barcoding, and doorstep air express or ocean container dispatch.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero */}
      <div className="bg-[#0E1612] text-white rounded-2xl p-8 sm:p-14 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1612] via-[#0E1612]/85 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5" />
            <span>OEM & Private Label Manufacturing</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Bring Your Apparel & Textile Visions to Life in Jaipur
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            From custom wooden block carving to full-scale garment manufacturing, we partner with emerging fashion labels, luxury boutiques, and global retailers. Low minimums, certified eco dyes, and reliable turnaround.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#wizard"
              className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#bfa238] text-[#0E1612] font-serif font-bold text-xs uppercase tracking-widest rounded shadow transition-colors inline-flex items-center gap-2"
            >
              <span>Build Your Custom Brief</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                window.open('https://wa.me/919351291471?text=Hello%20Ramam%20Textiles,%20I%20would%20like%20to%20discuss%20a%20custom%20garment%20manufacturing%20project.', '_blank');
              }}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-stone-400/40 font-serif font-semibold text-xs uppercase tracking-widest rounded backdrop-blur-sm transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>Talk to Senior Merchandiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Process */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#942C29] font-bold">End-To-End Factory Workflow</div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">How We Manufacture For Your Brand</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map(s => (
            <div key={s.num} className="bg-[#FAF7F2] p-6 rounded-xl border border-amber-900/15 space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#D4AF37] block">{s.num}</span>
              <h3 className="font-serif text-base font-bold text-stone-900">{s.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Private Label Capabilities Grid */}
      <div className="bg-[#F6F2EA] p-8 sm:p-12 rounded-2xl border border-amber-900/15 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-bold text-stone-900">Full Private Label Branding Suite</h2>
          <p className="text-xs text-stone-600">Every piece leaves our Jaipur workshop ready for luxury retail shelves.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Woven Neck & Care Labels</h4>
            <p className="text-xs text-stone-600">High-density damask or satin woven tags with custom wash instructions and country of origin.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Custom Cardstock Hangtags</h4>
            <p className="text-xs text-stone-600">Heavyweight 350 GSM craft or art card with gold foil embossing, cotton cord, and retail barcoding.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Bespoke Hardware</h4>
            <p className="text-xs text-stone-600">Engraved coconut shell buttons, antique brass metal pullers, and custom printed cotton drawstring bags.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Eco Packaging & Barcoding</h4>
            <p className="text-xs text-stone-600">Biodegradable polybags with Amazon FBA / Shopify barcode stickers ready for direct warehouse intake.</p>
          </div>
        </div>
      </div>

      {/* Interactive Manufacturing Brief Builder */}
      <div id="wizard" className="scroll-mt-24 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#942C29] font-bold">Online Quotation Tool</div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">Interactive Custom Production Brief</h2>
        </div>

        <CustomManufacturingWizard />
      </div>
    </div>
  );
};
