import React from 'react';
import { 
  Scissors, Sparkles, CheckCircle2, ShieldCheck, Layers, FileText, 
  Send, Mail, Package, Award, ArrowRight, HelpCircle
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
      <div className="bg-gradient-to-r from-[#0B241C] via-[#11352A] to-[#0B241C] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061711] via-[#0E2F23]/85 to-transparent" />
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-35 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="royal-seal mb-2">
            <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>👑 Jaipur OEM &amp; Private Label Studio</span>
          </div>

          <h1 className="font-royal-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF3DC] leading-tight">
            Bring Your Apparel &amp; Textile Visions to Life in Jaipur
          </h1>

          <p className="text-stone-200 font-royal-body text-base sm:text-lg leading-relaxed">
            From custom wooden block carving to full-scale garment manufacturing, we partner with emerging fashion labels, luxury boutiques, and global retailers. Low minimums, certified eco dyes, and reliable turnaround.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#wizard"
              className="btn-royal-gold inline-flex items-center gap-2 shadow-xl rounded-xl"
            >
              <span>Build Your Custom Brief</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                onNavigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-royal-outline inline-flex items-center gap-2 rounded-xl"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>Contact Merchandising Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Process */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="royal-seal-emerald">End-To-End Factory Workflow</div>
          <h2 className="font-royal-heading text-3xl font-bold text-[#0B241C]">How We Manufacture For Your Brand</h2>
          <div className="ornate-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map(s => (
            <div key={s.num} className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37]/35 space-y-3 relative shadow-md hover:border-[#D4AF37] hover:shadow-xl transition-all">
              <span className="font-royal-heading text-3xl font-bold text-[#D4AF37] block">{s.num}</span>
              <h3 className="font-royal-title text-base font-bold text-[#0B241C]">{s.title}</h3>
              <p className="text-xs font-royal-body text-stone-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Wizard Section */}
      <div id="wizard" className="bg-gradient-to-b from-[#0B241C] via-[#0E2F23] to-[#0B241C] text-white p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-jaipur-jaali-dark opacity-35 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-royal-heading text-3xl sm:text-4xl font-bold text-[#FAF3DC]">Interactive Brief Builder</h2>
            <p className="text-sm font-royal-body text-stone-200">
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
