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
    <div className="bg-[#FAF7F2] border border-amber-900/30 rounded-xl shadow-xl overflow-hidden text-[#1C1917]">
      {/* Progress Bar */}
      <div className="bg-[#0E1612] px-6 py-5 border-b border-amber-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-[11px] font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Private Label & OEM Studio</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-white font-bold">
              Custom Manufacturing & Private Label Wizard
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s 
                    ? 'bg-[#D4AF37] text-[#0E1612] ring-4 ring-[#D4AF37]/30 scale-105' 
                    : step > s 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-white/10 text-stone-400'
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
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h4 className="font-serif text-3xl font-bold text-stone-900">
            Manufacturing Brief Received!
          </h4>
          <p className="text-stone-600 leading-relaxed text-sm md:text-base">
            Thank you <strong className="text-stone-900">{contactName}</strong> from <strong className="text-stone-900">{brandName || 'your brand'}</strong>. 
            Our master sampling master and technical merchandising team in Jaipur will analyze your specifications and email you an exact cost breakdown, sampling timeline, and fabric swatches at <strong>{email}</strong> within 24 hours.
          </p>

          <div className="bg-[#F0EBE1] p-5 rounded-lg border border-amber-900/20 text-left text-xs space-y-2">
            <div className="font-serif text-sm font-bold text-stone-900 border-b border-stone-300 pb-2">
              Brief Summary Preview:
            </div>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Fabric:</strong> {fabric}</p>
            <p><strong>Technique:</strong> {technique}</p>
            <p><strong>Estimated Batch:</strong> {quantity}</p>
            <p><strong>Add-ons:</strong> {customServices.join(', ')}</p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => { setIsSubmitted(false); setStep(1); }}
              className="py-3.5 px-8 bg-[#0E1612] text-amber-100 hover:bg-[#D4AF37] hover:text-[#0E1612] font-serif text-xs font-bold uppercase tracking-wider rounded shadow transition-all"
            >
              Start Another Project Brief
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 md:p-8">
          {/* STEP 1: CATEGORY & BASE FABRIC */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  1. Select Product Line / Category
                </h4>
                <p className="text-xs text-stone-500 mb-4">Choose what you want our Jaipur workshops to manufacture for your brand.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        category === c.id 
                          ? 'border-[#0E1612] bg-[#0E1612] text-white shadow-md' 
                          : 'border-stone-300 bg-white hover:border-stone-400 text-stone-800'
                      }`}
                    >
                      <div className="text-2xl mb-2">{c.icon}</div>
                      <div className="font-bold text-sm">{c.title}</div>
                      <div className={`text-[11px] mt-1 leading-snug ${category === c.id ? 'text-stone-300' : 'text-stone-500'}`}>{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  2. Base Fabric Choice
                </h4>
                <p className="text-xs text-stone-500 mb-4">All fabrics are sustainably sourced and pre-shrunk in Jaipur.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fabrics.map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFabric(f.id)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        fabric === f.id 
                          ? 'border-[#0E1612] bg-[#EFE9DF] text-stone-900 ring-2 ring-[#0E1612]' 
                          : 'border-stone-300 bg-white hover:border-stone-400 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-stone-900">{f.name}</span>
                        <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-mono">{f.gsm}</span>
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
                  className="px-6 py-3 bg-[#0E1612] text-amber-100 font-serif tracking-widest text-xs uppercase font-bold hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors rounded flex items-center gap-2"
                >
                  <span>Next: Technique & Printing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PRINTING / DYEING & VOLUME */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  3. Select Artisan Technique or Print Style
                </h4>
                <p className="text-xs text-stone-500 mb-4">Choose heritage artisan hand crafts or modern precision printing.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {techniques.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTechnique(t.id)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        technique === t.id 
                          ? 'border-[#0E1612] bg-[#EFE9DF] text-stone-900 ring-2 ring-[#0E1612]' 
                          : 'border-stone-300 bg-white hover:border-stone-400 text-stone-800'
                      }`}
                    >
                      <div className="font-bold text-sm text-stone-900">{t.name}</div>
                      <p className="text-xs text-stone-600 mt-1">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  4. Target Batch Quantity
                </h4>
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
                      className={`p-3 rounded-lg border text-center font-medium text-xs transition-all ${
                        quantity === q 
                          ? 'border-[#0E1612] bg-[#0E1612] text-white shadow' 
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
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
                  className="px-5 py-3 border border-stone-400 text-stone-700 hover:bg-stone-200 font-serif text-xs uppercase font-bold rounded flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#0E1612] text-amber-100 font-serif tracking-widest text-xs uppercase font-bold hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors rounded flex items-center gap-2"
                >
                  <span>Next: Branding & Custom Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOM BRANDING & SPECS */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  5. Manufacturing Add-ons & Finishing Specifications
                </h4>
                <p className="text-xs text-stone-500 mb-4">Select all customizations and finishing touches you need prepared.</p>
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
                        className={`p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 ${
                          isChecked 
                            ? 'border-emerald-700 bg-emerald-50/50 text-stone-900 ring-1 ring-emerald-600' 
                            : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-emerald-700 text-white' : 'border border-stone-400 bg-white'}`}>
                          {isChecked && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-stone-900">{srv.title}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">{srv.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  6. Technical Brief & Sizing Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={techPackNotes}
                  onChange={e => setTechPackNotes(e.target.value)}
                  placeholder="Describe your design inspirations, Pantone shade codes, sizing breakdown (XS to 3XL), or specific garment dimensions..."
                  className="w-full p-3 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 border border-stone-400 text-stone-700 hover:bg-stone-200 font-serif text-xs uppercase font-bold rounded flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-[#0E1612] text-amber-100 font-serif tracking-widest text-xs uppercase font-bold hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors rounded flex items-center gap-2"
                >
                  <span>Next: Contact Details & Submit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & SUBMISSION */}
          {step === 4 && (
            <form onSubmit={handleFinish} className="space-y-6 animate-fade-in">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  7. Your Contact & Brand Information
                </h4>
                <p className="text-xs text-stone-500 mb-4">Where should our export department send the formal quotation and tech proposal?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Mehta"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Brand / Studio Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jaipur Indigo Co."
                      value={brandName}
                      onChange={e => setBrandName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@brand.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Destination Country &amp; Shipping Port
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. India (Delhi / Mumbai) or USA (New York, Air Cargo)"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-[#0E1612]"
                    />
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F2ECE1] p-4 rounded-lg border border-amber-900/20 text-xs space-y-1.5">
                <div className="font-bold text-stone-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>Brief Specification Snapshot:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-700 pt-1">
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
                  className="px-5 py-3 border border-stone-400 text-stone-700 hover:bg-stone-200 font-serif text-xs uppercase font-bold rounded flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#0E1612] text-amber-200 font-serif tracking-widest text-xs uppercase font-bold hover:bg-[#D4AF37] hover:text-[#0E1612] transition-colors rounded shadow-lg flex items-center gap-2"
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
