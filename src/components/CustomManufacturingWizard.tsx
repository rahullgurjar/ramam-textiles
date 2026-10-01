import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Send, ShieldCheck, 
  Layers, Palette, Scissors, PackageCheck, FileText, Award, Mail
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomManufacturingWizard: React.FC = () => {
  const { showToast } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [category, setCategory] = useState('Quilted Bags & Pouches');
  const [fabric, setFabric] = useState('100% Pure Cambric 60s Cotton');
  const [technique, setTechnique] = useState('Heritage Wooden Hand Block Print');
  const [quantity, setQuantity] = useState('100 - 300 pieces');
  const [customServices, setCustomServices] = useState<string[]>([
    'Custom Wooden Block Carving',
    'Pre-production Fit Sample Approval'
  ]);
  const [techPackNotes, setTechPackNotes] = useState('');
  const [contactName, setContactName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'Quilted Bags & Pouches', title: 'Quilted Bags & Pouches', desc: 'Duffles, Vanity Boxes, Totes, Cosmetic Kits, Tech Sleeves', icon: '👜' },
    { id: 'Women Apparel', title: 'Women Apparel', desc: 'Dresses, Kurtas, Kaftans, Co-ords, Tops', icon: '👗' },
    { id: 'Men Fashion', title: 'Men Fashion', desc: 'Short Kurtas, Resort Shirts, Bandhgalas', icon: '👔' },
    { id: 'Fabrics by Meter', title: 'Running Fabric by Meter', desc: 'Bulk Yardage for Designers & Garment Houses', icon: '🧵' },
    { id: 'Home & Living', title: 'Home & Living', desc: 'Quilts, Cushion Covers, Table Runners, Napkins', icon: '🛏️' },
  ];

  const fabrics = [
    { id: '100% Pure Cambric 60s Cotton', name: '60s Pure Cambric Cotton', gsm: '85 GSM', desc: 'Finest hand feel, breathable, ideal for high-end resort wear and summer dresses' },
    { id: 'Jaipur Mulmul Cotton (Muslin)', name: 'Pure Mulmul Muslin Cotton', gsm: '70 GSM', desc: 'Cloud-soft sheer luxury cotton, quintessential for royal Rajasthani kurtas & dupattas' },
    { id: 'Chanderi Silk Cotton Blend', name: 'Chanderi Silk Cotton', gsm: '95 GSM', desc: 'Subtle festive sheen, crisp drape, perfect for luxury contemporary occasion wear' },
    { id: 'Heavy Cotton Canvas / Duck (Quilted)', name: 'Heavy Canvas 280+ GSM', gsm: '280 GSM', desc: 'Sturdy weave with poly-cotton batting, specialized for duffles & vanity boxes' },
    { id: 'Organic Linen Cotton Blend', name: 'Organic Linen Cotton', gsm: '120 GSM', desc: 'Rich textural slub, natural cooling properties for modern minimalist fashion' },
  ];

  const techniques = [
    { id: 'Heritage Wooden Hand Block Print', name: 'Jaipur Wooden Hand Block Print', desc: 'Single or multi-color hand block carved in Sheesham wood by master artisans' },
    { id: 'Bagru Dabu Mud Resist & Natural Indigo', name: 'Bagru Dabu Mud Resist Indigo', desc: 'Ancient clay-resist method, dipped in natural fermentation indigo vats' },
    { id: 'Sanganeri Delicate Botanical Print', name: 'Sanganeri Botanical Precision', desc: 'Fine-line floral bootis and royal bel motifs with crisp sharpness' },
    { id: 'Natural Vegetable & Mineral Eco Dyeing', name: 'Azo-Free / Natural Herbal Dye', desc: 'Certified eco-friendly dyes using pomegranate rind, madder root, turmeric & iron' },
    { id: 'Screen Printing (High Volume / Sharp Patterns)', name: 'Precision Flatbed Screen Print', desc: 'Cost-effective for high volume (500m+) or multi-tone geometric patterns' },
  ];

  const toggleService = (srv: string) => {
    setCustomServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !email) {
      showToast('Please fill in your name and business email address.', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Custom Manufacturing brief created successfully! Our tech-pack team is reviewing it.', 'success');
  };

  return (
    <div className="bg-gradient-to-br from-[#FAF7EE] to-[#F3EEDB] border-2 border-[#D4AF37]/35 rounded-3xl shadow-2xl overflow-hidden text-[#0B241C]">
      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-[#0B241C] via-[#11352A] to-[#0B241C] px-6 py-6 border-b-2 border-[#D4AF37]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-jaipur-jaali opacity-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#F5E6B5] text-[10px] font-royal-title uppercase tracking-widest mb-1.5 font-bold">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Jaipur Private Label &amp; OEM Atelier</span>
            </div>
            <h3 className="font-royal-heading text-xl md:text-2xl text-white font-bold tracking-wide">
              Custom Manufacturing &amp; Private Label Studio
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-royal-title font-bold transition-all ${
                  step === s 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B89426] text-[#0B241C] ring-4 ring-[#D4AF37]/40 scale-105 shadow-md' 
                    : step > s 
                      ? 'bg-emerald-700 text-white border border-[#D4AF37]/50' 
                      : 'bg-white/10 text-[#FAF7EE]/50 border border-white/20'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isSubmitted ? (
        <div className="p-8 md:p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-300">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h4 className="font-royal-heading text-3xl font-bold text-[#0B241C]">
            Manufacturing Brief Received!
          </h4>
          <p className="text-stone-700 font-royal-body leading-relaxed text-sm md:text-base">
            Thank you <strong className="text-[#0B241C]">{contactName}</strong> from <strong className="text-[#0B241C]">{brandName || 'your brand'}</strong>. 
            Our master sampling master and technical merchandising team in Jaipur will analyze your specifications and email you an exact cost breakdown, sampling timeline, and fabric swatches at <strong>{email}</strong> within 24 hours.
          </p>

          <div className="bg-white/90 p-6 rounded-2xl border-2 border-[#D4AF37]/30 text-left text-xs font-royal-body space-y-2 shadow-sm">
            <div className="font-royal-title text-sm font-bold text-[#164335] border-b border-[#D4AF37]/30 pb-2">
              Royal Brief Summary Preview:
            </div>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Base Fabric:</strong> {fabric}</p>
            <p><strong>Artisan Technique:</strong> {technique}</p>
            <p><strong>Estimated Batch:</strong> {quantity}</p>
            <p><strong>Bespoke Add-ons:</strong> {customServices.join(', ')}</p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => { setIsSubmitted(false); setStep(1); }}
              className="btn-royal-gold py-3.5 px-8 font-royal-title text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl transition-all"
            >
              Start Another Project Brief
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 md:p-10 font-royal-body">
          {/* STEP 1: CATEGORY & BASE FABRIC */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#11352A] text-[#F5E6B5] flex items-center justify-center text-xs font-royal-title font-bold">1</span>
                  <h4 className="font-royal-title text-lg font-bold text-[#0B241C]">
                    Select Product Line / Category
                  </h4>
                </div>
                <p className="text-xs text-stone-600 mb-4 font-royal-body">Choose what you want our Jaipur workshops to manufacture for your brand.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        category === c.id 
                          ? 'border-2 border-[#D4AF37] bg-gradient-to-r from-[#11352A] to-[#0B241C] text-[#F5E6B5] shadow-lg scale-[1.02]' 
                          : 'border-[#D4AF37]/30 bg-white hover:border-[#11352A] text-[#0B241C]'
                      }`}
                    >
                      <div className="text-2xl mb-2">{c.icon}</div>
                      <div className="font-royal-title font-bold text-sm">{c.title}</div>
                      <div className={`text-[11px] mt-1 leading-snug ${category === c.id ? 'text-[#FAF7EE]/90' : 'text-stone-600'}`}>{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#11352A] text-[#F5E6B5] flex items-center justify-center text-xs font-royal-title font-bold">2</span>
                  <h4 className="font-royal-title text-lg font-bold text-[#0B241C]">
                    Base Fabric Choice
                  </h4>
                </div>
                <p className="text-xs text-stone-600 mb-4 font-royal-body">All fabrics are sustainably woven and pre-shrunk in Jaipur.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fabrics.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFabric(f.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        fabric === f.id 
                          ? 'border-2 border-[#D4AF37] bg-[#FAF7EE] text-[#0B241C] ring-2 ring-[#11352A] shadow-md' 
                          : 'border-[#D4AF37]/30 bg-white hover:border-[#11352A] text-[#0B241C]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-royal-title font-bold text-sm text-[#0B241C]">{f.name}</span>
                        <span className="text-[10px] bg-[#11352A]/15 text-[#11352A] px-2.5 py-0.5 rounded-full font-mono font-bold">{f.gsm}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">{f.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-royal-gold px-7 py-3 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>Next: Technique &amp; Printing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PRINTING / DYEING & VOLUME */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#11352A] text-[#F5E6B5] flex items-center justify-center text-xs font-royal-title font-bold">3</span>
                  <h4 className="font-royal-title text-lg font-bold text-[#0B241C]">
                    Select Artisan Technique or Print Style
                  </h4>
                </div>
                <p className="text-xs text-stone-600 mb-4 font-royal-body">Choose heritage artisan hand crafts or modern precision printing.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {techniques.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTechnique(t.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        technique === t.id 
                          ? 'border-2 border-[#D4AF37] bg-[#FAF7EE] text-[#0B241C] ring-2 ring-[#11352A] shadow-md' 
                          : 'border-[#D4AF37]/30 bg-white hover:border-[#11352A] text-[#0B241C]'
                      }`}
                    >
                      <div className="font-royal-title font-bold text-sm text-[#0B241C]">{t.name}</div>
                      <p className="text-xs text-stone-600 mt-1">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#11352A] text-[#F5E6B5] flex items-center justify-center text-xs font-royal-title font-bold">4</span>
                  <h4 className="font-royal-title text-lg font-bold text-[#0B241C]">
                    Target Batch Quantity
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    'Sample Prototyping (1-5 pcs)',
                    'Micro Batch (30-99 pcs)',
                    'Wholesale Run (100-499 pcs)',
                    'Volume Export (500 - 5,000+ pcs)'
                  ].map(q => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`p-3.5 rounded-xl border text-center font-royal-title font-bold text-xs transition-all ${
                        quantity === q 
                          ? 'border-2 border-[#D4AF37] bg-gradient-to-r from-[#11352A] to-[#0B241C] text-[#F5E6B5] shadow-md' 
                          : 'border-[#D4AF37]/30 bg-white text-[#0B241C] hover:border-[#11352A]'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-royal-outline px-5 py-3 text-xs uppercase font-bold rounded-xl flex items-center gap-2 text-[#0B241C] border-[#11352A]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-royal-gold px-7 py-3 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>Next: Branding &amp; Custom Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOM BRANDING & SPECS */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#11352A] text-[#F5E6B5] flex items-center justify-center text-xs font-royal-title font-bold">5</span>
                  <h4 className="font-royal-title text-lg font-bold text-[#0B241C]">
                    Manufacturing Add-ons &amp; Finishing Specifications
                  </h4>
                </div>
                <p className="text-xs text-stone-600 mb-4 font-royal-body">Select all customizations and finishing touches you need prepared.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Custom Wooden Block Carving', desc: 'Hand-carve your exclusive motif into Sheesham wood blocks' },
                    { title: 'Fabric Pre-Shrinking & Soft Wash Finishing', desc: 'Steam processing and organic bio-wash for zero residual shrinkage' },
                    { title: 'Hand Kantha Quilting Alignment', desc: 'Even multi-layer diamond or linear running stitch quilting' },
                    { title: 'Custom YKK Hardware & Pullers', desc: 'Antique brass or matte gold metal zippers with embossed pullers' },
                    { title: 'Individual Export Polybag Packing', desc: '100% biodegradable or sealed bags with SKU stickers' },
                    { title: 'Pre-production Fit Sample Approval', desc: 'Courier prototype sample to your studio before bulk cutting' }
                  ].map(srv => {
                    const isChecked = customServices.includes(srv.title);
                    return (
                      <button
                        key={srv.title}
                        type="button"
                        onClick={() => toggleService(srv.title)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                          isChecked 
                            ? 'border-2 border-emerald-700 bg-emerald-50/70 text-[#0B241C] ring-1 ring-emerald-600' 
                            : 'border-[#D4AF37]/30 bg-white text-[#0B241C] hover:border-[#11352A]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-emerald-700 text-white' : 'border border-[#D4AF37]/60 bg-white'}`}>
                          {isChecked && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-royal-title font-bold text-xs text-[#0B241C]">{srv.title}</div>
                          <div className="text-[11px] text-stone-600 mt-0.5 font-royal-body">{srv.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-royal-title uppercase tracking-wider text-[#0B241C] font-bold mb-1.5">
                  6. Technical Brief &amp; Sizing Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={techPackNotes}
                  onChange={e => setTechPackNotes(e.target.value)}
                  placeholder="Describe your design inspirations, Pantone shade codes, sizing breakdown (XS to 3XL), or specific garment dimensions..."
                  className="w-full p-3.5 bg-white border-2 border-[#D4AF37]/30 rounded-2xl text-xs text-[#0B241C] focus:outline-none focus:border-[#11352A]"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-royal-outline px-5 py-3 text-xs uppercase font-bold rounded-xl flex items-center gap-2 text-[#0B241C] border-[#11352A]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="btn-royal-gold px-7 py-3 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>Next: Contact Details &amp; Submit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & SUBMISSION */}
          {step === 4 && (
            <form onSubmit={handleFinish} className="space-y-6 animate-fade-in">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-[#11352A] text-[#F5E6B5] flex items-center justify-center text-xs font-royal-title font-bold">7</span>
                  <h4 className="font-royal-title text-lg font-bold text-[#0B241C]">
                    Your Contact &amp; Brand Information
                  </h4>
                </div>
                <p className="text-xs text-stone-600 mb-4 font-royal-body">Where should our export department send the formal quotation and tech proposal?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-royal-title uppercase tracking-wider text-[#0B241C] font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Mehta"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#0B241C] focus:outline-none focus:border-[#11352A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-royal-title uppercase tracking-wider text-[#0B241C] font-bold mb-1">
                      Brand / Studio Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jaipur Indigo Co."
                      value={brandName}
                      onChange={e => setBrandName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#0B241C] focus:outline-none focus:border-[#11352A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-royal-title uppercase tracking-wider text-[#0B241C] font-bold mb-1">
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@brand.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#0B241C] focus:outline-none focus:border-[#11352A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-royal-title uppercase tracking-wider text-[#0B241C] font-bold mb-1">
                      Destination Country &amp; Shipping Port
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. India (Delhi / Mumbai) or USA (New York, Air Cargo)"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-xl text-xs text-[#0B241C] focus:outline-none focus:border-[#11352A]"
                    />
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white/90 p-5 rounded-2xl border-2 border-[#D4AF37]/30 text-xs space-y-1.5 shadow-sm">
                <div className="font-royal-title font-bold text-[#164335] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>Brief Specification Snapshot:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-700 pt-1 font-royal-body">
                  <div><strong>Product:</strong> {category}</div>
                  <div><strong>Fabric:</strong> {fabric.split(' ')[0]} {fabric.split(' ')[1]}</div>
                  <div><strong>Technique:</strong> {technique.split(' ')[0]}</div>
                  <div><strong>Batch Volume:</strong> {quantity}</div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-royal-outline px-5 py-3 text-xs uppercase font-bold rounded-xl flex items-center gap-2 text-[#0B241C] border-[#11352A]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="btn-royal-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Custom Manufacturing Brief</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
