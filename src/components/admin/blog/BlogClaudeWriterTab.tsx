import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Key, CheckCircle2, AlertCircle, Bot, ArrowRight, 
  Eye, EyeOff, Save, RefreshCw, BookOpen, Layers, Table, HelpCircle, 
  Check, FileText, Send, Zap, ChevronRight, Sliders
} from 'lucide-react';
import { 
  CLAUDE_MODELS, 
  ClaudeModelId, 
  getStoredAnthropicKey, 
  setStoredAnthropicKey, 
  getStoredClaudeModel, 
  setStoredClaudeModel, 
  testAnthropicKey, 
  generateBlogWithClaude 
} from '../../../utils/claudeClient';
import { BlogArticleItem } from '../../../types/blog';
import { saveBlogArticle, publishBlogArticle } from '../../../utils/blogStorage';

interface BlogClaudeWriterTabProps {
  onOpenReview?: (article: BlogArticleItem) => void;
  onOpenEdit?: (article: BlogArticleItem) => void;
  onArticlePublished?: (articleId: string) => void;
}

// 30-Day Calendar Quick Pick Topics
const CALENDAR_PRESETS = [
  {
    day: 'Day 7',
    date: 'Oct 26, 2026',
    title: 'Mulmul vs Voile vs Cambric: Which Jaipur Cotton Weave is Right for You?',
    keyword: 'mulmul vs cambric cotton difference',
    category: 'Fabric Sourcing',
    notes: 'Compare 60s combed vs crepe twist yarn, transparency, drape, and quilted bags suitability.'
  },
  {
    day: 'Day 8',
    date: 'Oct 27, 2026',
    title: 'The Chemistry of Natural Mordants: Harda, Alum, and Iron Rust Syahi',
    keyword: 'natural mordants for cotton dyeing',
    category: 'Natural Dyeing',
    notes: 'Explain Terminalia chebula gallotannins, potassium alum coordination complexes, and jaggery fermentation.'
  },
  {
    day: 'Day 9',
    date: 'Oct 28, 2026',
    title: 'How to Calculate Fabric Shrinkage & Cutting Wastage in Garment Production',
    keyword: 'cotton fabric shrinkage calculation',
    category: 'Custom Manufacturing',
    notes: 'Warp vs weft shrinkage formula, pre-wash relaxation buffers, and sample marker optimization.'
  },
  {
    day: 'Day 10',
    date: 'Oct 29, 2026',
    title: 'Dabu Mud-Resist vs Batik Wax-Resist: Comparing Ancient Resist Arts',
    keyword: 'dabu printing vs batik print',
    category: 'Craft Heritage',
    notes: 'Cold river clay vs hot paraffin/beeswax, removal temperatures, and characteristic veining.'
  },
  {
    day: 'Day 11',
    date: 'Oct 30, 2026',
    title: 'The Revival of Kala Cotton: Organic, Rainfed Indigenous Indian Cotton',
    keyword: 'organic kala cotton Gujarat',
    category: 'Sustainable Fashion',
    notes: '100% rainfed Gossypium herbaceum, zero tube-well water pumping, and rustic textured handfeel.'
  },
  {
    day: 'Day 12',
    date: 'Oct 31, 2026',
    title: 'How to Tell Real Handblock Print from Digital Screen Imitations',
    keyword: 'how to identify real hand block print',
    category: 'Craft Heritage',
    notes: 'Reverse penetration bleed, irregular Chhapa joints, organic earthy scent, and tactile slubs.'
  }
];

export const BlogClaudeWriterTab: React.FC<BlogClaudeWriterTabProps> = ({
  onOpenReview,
  onOpenEdit,
  onArticlePublished
}) => {
  // API Key State
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [keyStatus, setKeyStatus] = useState<{ testing: boolean; message: string; success?: boolean }>({
    testing: false,
    message: ''
  });

  // Selected Model
  const [selectedModel, setSelectedModel] = useState<ClaudeModelId>('claude-3-7-sonnet-20250219');

  // Generator Inputs
  const [focusKeyword, setFocusKeyword] = useState('mulmul vs cambric cotton difference');
  const [topicTitle, setTopicTitle] = useState('Mulmul vs Voile vs Cambric: Which Jaipur Cotton Weave is Right for You?');
  const [category, setCategory] = useState('Fabric Sourcing');
  const [competitorGaps, setCompetitorGaps] = useState('');
  const [targetAudience, setTargetAudience] = useState('Independent boutique fashion designers and sustainable textile buyers');

  // Generation Progress & Result
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generationError, setGenerationError] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState<BlogArticleItem | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Load stored settings on mount
  useEffect(() => {
    const storedKey = getStoredAnthropicKey();
    if (storedKey) {
      setApiKey(storedKey);
      setIsKeySaved(true);
    }
    setSelectedModel(getStoredClaudeModel());
  }, []);

  // Save & Test API Key Handler
  const handleSaveAndTestKey = async () => {
    if (!apiKey.trim()) {
      setStoredAnthropicKey('');
      setIsKeySaved(false);
      setKeyStatus({ testing: false, message: 'Key cleared from browser storage.' });
      return;
    }

    setKeyStatus({ testing: true, message: 'Verifying key with Anthropic API...' });
    const res = await testAnthropicKey(apiKey);
    setKeyStatus({ testing: false, message: res.message, success: res.success });

    if (res.success) {
      setStoredAnthropicKey(apiKey);
      setIsKeySaved(true);
    }
  };

  // Model change handler
  const handleModelChange = (modelId: ClaudeModelId) => {
    setSelectedModel(modelId);
    setStoredClaudeModel(modelId);
  };

  // Quick Preset Selection
  const handleSelectPreset = (preset: typeof CALENDAR_PRESETS[0]) => {
    setTopicTitle(preset.title);
    setFocusKeyword(preset.keyword);
    setCategory(preset.category);
    setCompetitorGaps(preset.notes);
    setGeneratedArticle(null);
    setGenerationError('');
    setSaveSuccessMessage('');
  };

  // Generate Article with Claude Handler
  const handleGenerate = async () => {
    if (!focusKeyword.trim()) {
      setGenerationError('Please enter a primary focus keyword.');
      return;
    }

    if (!apiKey.trim()) {
      setGenerationError('Please enter and save your Anthropic API Key above.');
      return;
    }

    setIsGenerating(true);
    setGenerationError('');
    setSaveSuccessMessage('');
    setGeneratedArticle(null);

    try {
      const article = await generateBlogWithClaude(
        {
          focusKeyword: focusKeyword.trim(),
          topicTitle: topicTitle.trim() || undefined,
          category: category.trim() || undefined,
          competitorInsights: competitorGaps.trim() || undefined,
          targetAudience: targetAudience.trim() || undefined,
          model: selectedModel,
          apiKey: apiKey.trim()
        },
        (status) => setGenerationStep(status)
      );

      setGeneratedArticle(article);
    } catch (err: any) {
      setGenerationError(err.message || 'An error occurred during Claude blog generation.');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Save to Queue as Draft
  const handleSaveDraft = () => {
    if (!generatedArticle) return;
    const articleToSave: BlogArticleItem = {
      ...generatedArticle,
      status: 'queued',
      publishedDate: ''
    };
    saveBlogArticle(articleToSave);
    setSaveSuccessMessage('Article successfully saved to the Review Queue!');
  };

  // Publish Immediately
  const handlePublishNow = () => {
    if (!generatedArticle) return;
    saveBlogArticle({ ...generatedArticle, status: 'queued' });
    const published = publishBlogArticle(generatedArticle.id);
    if (published) {
      setGeneratedArticle(published);
      setSaveSuccessMessage('🎉 Article published live to Ramam Textiles Journal!');
      if (onArticlePublished) {
        onArticlePublished(published.id);
      }
    }
  };

  return (
    <div className="space-y-8 font-royal-body">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#241A16] via-[#3A2218] to-[#241A16] p-7 sm:p-9 text-white border-2 border-[#D4AF37]/50 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Claude 3.7 Sonnet Artisan Engine</span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold tracking-wide text-white">
              AI Blog Writer with Claude
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Connect Anthropic Claude to craft comprehensive, deeply humanized SEO articles that follow all 9 mandatory Ramam Textiles guidelines: under-3-line paragraphs, nested H1/H2/H3 headings, data tables, artisan bios, FAQs, and B2B lead generation CTAs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs text-stone-300 flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isKeySaved ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{isKeySaved ? 'Claude API Connected' : 'API Key Required'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Settings & Topic Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: API Configuration & Model */}
        <div className="lg:col-span-1 space-y-6">
          {/* Anthropic Key Card */}
          <div className="bg-[#FAF5EE] rounded-3xl p-6 border border-[#D4AF37]/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#D4AF37]/25 pb-3">
              <Key className="w-4 h-4 text-[#9B332C]" />
              <h3 className="font-playfair font-bold text-base text-[#241A16]">
                Anthropic API Connection
              </h3>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Anthropic API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  className="w-full text-xs font-mono px-3 py-2.5 pr-9 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#9B332C]"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveAndTestKey}
                  disabled={keyStatus.testing}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {keyStatus.testing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save &amp; Test Key</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {keyStatus.message && (
                <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  keyStatus.success 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : keyStatus.testing
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {keyStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{keyStatus.message}</span>
                </div>
              )}

              <p className="text-[11px] text-stone-500 leading-normal">
                🔒 Your Anthropic API Key is stored safely in your browser's private local storage. It connects directly to Anthropic's secure endpoints.
              </p>
            </div>

            {/* Model Selection */}
            <div className="pt-4 border-t border-[#D4AF37]/25 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#9B332C]" />
                <span>Default Claude Model</span>
              </label>

              <div className="space-y-2">
                {CLAUDE_MODELS.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => handleModelChange(model.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      selectedModel === model.id
                        ? 'bg-white border-[#9B332C] ring-2 ring-[#9B332C]/20 shadow-sm'
                        : 'bg-white/60 border-stone-200 hover:bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className={selectedModel === model.id ? 'text-[#9B332C]' : 'text-[#241A16]'}>
                        {model.name.split(' (')[0]}
                      </span>
                      {selectedModel === model.id && (
                        <Check className="w-3.5 h-3.5 text-[#9B332C]" />
                      )}
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      {model.name.split(' (')[1]?.replace(')', '') || ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Guidelines Badge Card */}
          <div className="bg-[#FAF0EB] rounded-3xl p-5 border border-[#EACAC0] space-y-3">
            <h4 className="font-playfair font-bold text-xs uppercase tracking-wider text-[#9B332C]">
              Enforced Editorial Directives (9 Rules)
            </h4>
            <ul className="text-xs text-stone-700 space-y-1.5">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Paragraphs strictly under 3 lines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>H1 title → H2 sections → H3 subheadings</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Scannable bullet point lists</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Structured data / comparison table</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified author role &amp; artisan bio</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>3 to 5 FAQs with Schema markup</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>B2B Lead Gen CTA redirecting to /contact</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero AI clichés; authentic Jaipur craft voice</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Columns: Topic Setup & Presets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Pick From 30-Day Calendar */}
          <div className="bg-[#FAF5EE] rounded-3xl p-6 border border-[#D4AF37]/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#9B332C]" />
                <h3 className="font-playfair font-bold text-base text-[#241A16]">
                  Select Scheduled Topic From 30-Day Calendar
                </h3>
              </div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                1-Click Preset
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CALENDAR_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    focusKeyword === preset.keyword
                      ? 'bg-white border-[#9B332C] ring-2 ring-[#9B332C]/20 shadow-sm'
                      : 'bg-white/70 border-stone-200 hover:bg-white hover:border-[#D4AF37]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#9B332C] mb-1">
                    <span>{preset.day} • {preset.category}</span>
                    <span className="text-stone-400">{preset.date.split(',')[0]}</span>
                  </div>
                  <h4 className="font-playfair font-bold text-xs text-[#241A16] line-clamp-2">
                    {preset.title}
                  </h4>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-[#FAF0EB] text-[#9B332C] rounded text-[10px] font-mono">
                    {preset.keyword}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Configuration Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <FileText className="w-4 h-4 text-[#9B332C]" />
              <h3 className="font-playfair font-bold text-base text-[#241A16]">
                Article Writing Parameters
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Primary Focus Keyword (Required for Google SERP)
                </label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="e.g. natural mordants for cotton dyeing"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9B332C]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Article Title (H1 Headline)
                </label>
                <input
                  type="text"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder="e.g. The Chemistry of Natural Mordants: Harda, Alum, and Iron Rust Syahi"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9B332C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9B332C] bg-white"
                >
                  <option value="Craft Heritage">Craft Heritage</option>
                  <option value="Fabric Sourcing">Fabric Sourcing</option>
                  <option value="Natural Dyeing">Natural Dyeing</option>
                  <option value="Sustainable Fashion">Sustainable Fashion</option>
                  <option value="Care & Maintenance">Care &amp; Maintenance</option>
                  <option value="Custom Manufacturing">Custom Manufacturing</option>
                  <option value="B2B Sourcing">B2B Sourcing</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Independent boutique fashion designers & sourcing directors"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9B332C]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Competitor Gaps &amp; Unique Craft Angle
                </label>
                <textarea
                  rows={2}
                  value={competitorGaps}
                  onChange={(e) => setCompetitorGaps(e.target.value)}
                  placeholder="e.g. Include exact tannin percentages, 30-day iron scrap jaggery fermentation recipe, and low MOQ 25-meter sampling."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#9B332C]"
                />
              </div>
            </div>

            {/* Error Message */}
            {generationError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{generationError}</span>
              </div>
            )}

            {/* Generate Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9B332C] via-[#801B18] to-[#9B332C] text-white text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                    <span>Claude Crafting Article: {generationStep}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Generate Full 9-Guideline Article with Claude</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Article Showcase */}
      {generatedArticle && (
        <div className="space-y-6 pt-4 border-t border-[#D4AF37]/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Generated by Claude 3.7 Sonnet (100% Guideline Compliant)</span>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-[#241A16]">
                Review Generated Article
              </h3>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save to Queue</span>
              </button>

              {onOpenEdit && (
                <button
                  type="button"
                  onClick={() => onOpenEdit(generatedArticle)}
                  className="px-4 py-2.5 rounded-xl border border-[#D4AF37] bg-[#FAF5EE] text-[#9B332C] text-xs font-bold hover:bg-[#FAF0EB] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open in Full Editor</span>
                </button>
              )}

              <button
                type="button"
                onClick={handlePublishNow}
                className="px-5 py-2.5 rounded-xl bg-[#9B332C] hover:bg-[#801B18] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish to Website Now</span>
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {saveSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">{saveSuccessMessage}</span>
              </div>
            </div>
          )}

          {/* Article Live Layout Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-stone-200 shadow-md space-y-6">
            {/* Meta Header */}
            <div className="space-y-3 border-b border-stone-100 pb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="px-2.5 py-0.5 bg-[#FAF0EB] text-[#9B332C] rounded-full font-bold">
                  {generatedArticle.category}
                </span>
                <span>•</span>
                <span>{generatedArticle.readTime}</span>
                <span>•</span>
                <span>Slug: <code className="font-mono text-stone-700">/blog/{generatedArticle.slug}</code></span>
              </div>

              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#241A16] leading-tight">
                {generatedArticle.title}
              </h1>

              <p className="text-base font-editorial italic text-stone-700 bg-[#FAF5EE] p-4 rounded-xl border-l-4 border-[#9B332C]">
                "{generatedArticle.excerpt}"
              </p>
            </div>

            {/* Author Box Preview */}
            {generatedArticle.author && (
              <div className="p-4 rounded-2xl bg-[#FAF0EB]/60 border border-[#EACAC0] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#9B332C] text-white flex items-center justify-center font-bold text-sm">
                  {generatedArticle.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#241A16]">{generatedArticle.author.name}</div>
                  <div className="text-[11px] text-[#9B332C]">{generatedArticle.author.role}</div>
                  {generatedArticle.author.bio && (
                    <div className="text-[11px] text-stone-600 mt-0.5">{generatedArticle.author.bio}</div>
                  )}
                </div>
              </div>
            )}

            {/* Content Sections */}
            <div className="space-y-6">
              {generatedArticle.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-2.5">
                  {sec.heading && (
                    <h2 className="font-playfair text-xl font-bold text-[#241A16] mt-4">
                      {sec.heading}
                    </h2>
                  )}
                  {sec.subheading && (
                    <h3 className="font-playfair text-base font-semibold text-[#9B332C]">
                      {sec.subheading}
                    </h3>
                  )}
                  {sec.quote && (
                    <blockquote className="border-l-4 border-[#D4AF37] pl-3 italic text-[#9B332C] my-2 text-sm bg-[#FAF5EE]/60 p-3 rounded-r-lg">
                      "{sec.quote}"
                    </blockquote>
                  )}
                  {sec.body && (
                    <div className="text-xs sm:text-sm text-stone-700 space-y-2 leading-relaxed">
                      {sec.body.split('\n\n').map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  )}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-1.5 pl-2 my-2">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-stone-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9B332C] mt-1.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Table Preview */}
            {generatedArticle.table && (
              <div className="my-6 overflow-hidden rounded-2xl border border-[#D4AF37]/40 shadow-sm">
                {generatedArticle.table.caption && (
                  <div className="bg-[#FAF0EB] px-4 py-2.5 text-xs font-bold text-[#9B332C] flex items-center gap-2">
                    <Table className="w-3.5 h-3.5" />
                    <span>{generatedArticle.table.caption}</span>
                  </div>
                )}
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF5EE] text-[#241A16] font-bold">
                    <tr>
                      {generatedArticle.table.headers.map((h, i) => (
                        <th key={i} className="px-3.5 py-2.5 border-b border-stone-200">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {generatedArticle.table.rows.map((r, ri) => (
                      <tr key={ri} className="hover:bg-stone-50">
                        {r.map((c, ci) => (
                          <td key={ci} className="px-3.5 py-2.5 text-stone-700">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* FAQs Preview */}
            {generatedArticle.faqs && generatedArticle.faqs.length > 0 && (
              <div className="my-6 p-5 rounded-2xl bg-[#FAF5EE] border border-[#D4AF37]/35 space-y-3">
                <h4 className="font-playfair font-bold text-sm text-[#241A16] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#9B332C]" />
                  <span>Frequently Asked Questions</span>
                </h4>
                <div className="space-y-2">
                  {generatedArticle.faqs.map((f, fi) => (
                    <div key={fi} className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                      <div className="font-bold text-xs text-[#9B332C]">Q: {f.question}</div>
                      <div className="text-xs text-stone-600">{f.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Gen CTA Preview */}
            {generatedArticle.leadCta && (
              <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-[#FAF0EB] via-[#FAF5EE] to-[#FAF0EB] border-2 border-[#D4AF37]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9B332C]">Lead Generation CTA</span>
                  <h5 className="font-playfair font-bold text-base text-[#241A16]">
                    {generatedArticle.leadCta.title}
                  </h5>
                  <p className="text-xs text-stone-600 max-w-xl">
                    {generatedArticle.leadCta.description}
                  </p>
                </div>
                <div className="px-5 py-2.5 rounded-full bg-[#9B332C] text-white text-xs font-bold shrink-0 shadow-md flex items-center gap-1.5">
                  <span>{generatedArticle.leadCta.primaryBtnText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
