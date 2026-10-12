import React from 'react';
import { 
  Scissors, Sparkles, CheckCircle2, ShieldCheck, Layers, FileText, 
  Send, Mail, Package, Award, ArrowRight, HelpCircle
} from 'lucide-react';
import { CustomManufacturingWizard } from '../components/CustomManufacturingWizard';
import { resolveProductImage } from '../utils/imageUtils';

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
      title: 'Sample First Prototype Approval',
      desc: 'We courier a physical pre-production prototype piece for your touch, feel, and fit review. Bulk batch cutting commences strictly after your sample confirmation.'
    },
    {
      num: '04',
      title: 'Batch Production & Milestone Proof',
      desc: '60% advance locks artisan workshop capacity and yardage dyeing. Remaining 40% balance is payable prior to courier dispatch after sharing high-definition WhatsApp video proof of the completed batch.'
    },
    {
      num: '05',
      title: '4-Point Quality Audit & Export',
      desc: 'Zero-defect inspection, steam pressing, custom polybag packaging, barcoding, and doorstep air express or ocean container dispatch.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 font-royal-body">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#241A16] via-[#2F211C] to-[#241A16] text-[#FAF5EE] rounded-[32px] p-8 sm:p-14 relative overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${resolveProductImage('./products/duffle-kantha-patchwork.jpg')}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241A16] via-[#241A16]/90 to-transparent" />
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold uppercase tracking-wider font-royal-title shadow-sm">
            <Scissors className="w-3.5 h-3.5 text-[#9B332C]" />
            <span>Jaipur OEM &amp; Custom Manufacturing Studio</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF3DC] leading-tight">
            Bring Your Apparel &amp; Textile Visions to Life in Jaipur
          </h1>

          <p className="text-stone-300 font-royal-body text-base sm:text-lg leading-relaxed">
            From custom wooden block carving to full-scale garment manufacturing, we partner with emerging fashion labels, luxury boutiques, and global retailers. Low minimums, certified eco dyes, and reliable turnaround.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#wizard"
              className="pill-btn-rose inline-flex items-center gap-2 shadow-xl px-7 py-3.5 text-xs font-bold uppercase rounded-full"
            >
              <span>Build Your Custom Brief</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                onNavigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="pill-btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase rounded-full bg-[#FAF5EE] text-[#241A16] border border-[#D4AF37]/45"
            >
              <span>Contact Merchandising Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Process */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0EB] border border-[#EACAC0] text-[#9B332C] text-xs font-bold uppercase tracking-wider font-royal-title">
            <span>End-To-End Factory Workflow</span>
          </div>
          <h2 className="font-playfair text-3xl font-bold text-[#241A16]">How We Manufacture For Your Brand</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map(s => (
            <div key={s.num} className="bg-[#FAF5EE] p-6 rounded-[28px] border border-[#D4AF37]/35 hover:border-[#9B332C] space-y-3 relative shadow-sm hover:shadow-xl transition-all">
              <span className="font-playfair text-3xl font-bold text-[#9B332C] block">{s.num}</span>
              <h3 className="font-royal-title text-base font-bold text-[#241A16]">{s.title}</h3>
              <p className="text-xs font-royal-body text-stone-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Wizard Section */}
      <div id="wizard" className="bg-[#241A16] text-white p-8 sm:p-12 rounded-[32px] border border-[#D4AF37]/35 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#FAF3DC]">Interactive Brief Builder</h2>
            <p className="text-sm font-royal-body text-stone-300">
              Customize fabric, silhouette, printing technique, and packaging add-ons. Receive an instant estimate and quotation packet.
            </p>
          </div>
          <CustomManufacturingWizard />
        </div>
      </div>
    </div>
  );
};

export default CustomManufacturingPage;
