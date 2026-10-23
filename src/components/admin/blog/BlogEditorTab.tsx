import React, { useState, useEffect } from 'react';
import { 
  Save, Eye, CheckCircle2, ArrowLeft, Plus, Trash2, 
  ArrowUp, ArrowDown, Sparkles, Image as ImageIcon, Tag, Flame, AlertCircle, Quote 
} from 'lucide-react';
import { BlogArticleItem, BlogArticleSection } from '../../../types/blog';
import { calculateArticleSEOScore } from '../../../utils/blogStorage';
import { resolveWebpImage } from '../../../utils/imageUtils';
import { useApp } from '../../../context/AppContext';

interface BlogEditorTabProps {
  initialArticle: BlogArticleItem | null;
  onSaveDraft: (article: BlogArticleItem) => void;
  onPublish: (article: BlogArticleItem) => void;
  onPreview: (article: BlogArticleItem) => void;
  onCancel: () => void;
}

const PRESET_COVERS = [
  { label: 'Indigo Duffle (Midnight Blue)', path: '/products/duffle-indigo.jpg' },
  { label: 'Kantha Patchwork Duffle', path: '/products/duffle-kantha-patchwork.jpg' },
  { label: 'Sanganeri vs Bagru Dual Print', path: '/products/sanganeri-vs-bagru.jpg' },
  { label: 'Pink Botanical Autumn Blossom', path: '/products/duffle-pink-botanical.jpg' },
  { label: 'Royal Kalamkari Laptop Sleeve', path: '/products/laptop-sleeve-kalamkari.jpg' },
  { label: 'Ruffle Tote Lifestyle', path: '/products/tote-sanganeri-ruffle-lifestyle.jpg' },
  { label: 'Marigold Cream Vanity Trio', path: '/products/vanity-trio-marigold-cream.jpg' },
  { label: 'Meadow Green Blossom Trio', path: '/products/vanity-trio-meadow-green.jpg' },
  { label: 'Mint Lotus Vanity Trio', path: '/products/vanity-trio-mint-lotus.jpg' },
  { label: 'Pink Paisley Vanity Trio', path: '/products/vanity-trio-pink-paisley.jpg' },
  { label: 'Turquoise Blossom Vanity Trio', path: '/products/vanity-trio-turquoise.jpg' },
  { label: 'Safari Jungle Yoga Carrier', path: '/products/yoga-safari.jpg' }
];

const PRESET_CATEGORIES = [
  'Craft Heritage',
  'Fabric Sourcing',
  'Sustainable Fashion',
  'Natural Dyeing',
  'Care & Maintenance',
  'Manufacturing',
  'B2B Sourcing',
  'Custom Manufacturing',
  'Authentication',
  'Logistics & Trade',
  'Quality Control',
  'Industry Outlook'
];

export const BlogEditorTab: React.FC<BlogEditorTabProps> = ({
  initialArticle,
  onSaveDraft,
  onPublish,
  onPreview,
  onCancel
}) => {
  const { showToast } = useApp();

  const [id] = useState(() => initialArticle?.id || `blog-${Date.now()}`);
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [slug, setSlug] = useState(initialArticle?.slug || '');
  const [category, setCategory] = useState(initialArticle?.category || 'Craft Heritage');
  const [customCategory, setCustomCategory] = useState('');
  const [focusKeyword, setFocusKeyword] = useState(initialArticle?.focusKeyword || '');
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || '');
  const [coverImage, setCoverImage] = useState(initialArticle?.coverImage || '/products/duffle-indigo.jpg');
  const [authorName, setAuthorName] = useState(initialArticle?.author.name || 'Ramam Textiles Technical Guild');
  const [authorRole, setAuthorRole] = useState(initialArticle?.author.role || 'Master Textile Scholar');
  const [targetDay, setTargetDay] = useState<number | undefined>(initialArticle?.targetDay);
  const [tags, setTags] = useState<string[]>(initialArticle?.tags || ['Textile Sourcing', 'Jaipur Craft', 'Pure Cotton']);
  const [newTagInput, setNewTagInput] = useState('');
  const [sections, setSections] = useState<BlogArticleSection[]>(() => {
    if (initialArticle?.contentSections && initialArticle.contentSections.length > 0) {
      return initialArticle.contentSections;
    }
    return [
      {
        heading: 'Why This Textile Tradition Matters for Modern Fashion',
        body: 'Provide the historical context, geographic origin, and cultural importance of this craft for global fashion designers and buyers.',
        quote: 'Artisanal textiles are not merely commodities—they are living repositories of human heritage and ecological equilibrium.'
      },
      {
        heading: 'Technical Specifications & Chemistry',
        body: 'Explain yarn counts, GSM weights, natural dye chemistry, or block registration methods in exact technical terms.'
      }
    ];
  });

  // Auto-slug generator
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 70);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialArticle || !slug) {
      setSlug(slugify(val));
    }
  };

  // Sections management
  const addSection = (withQuote = false) => {
    setSections(prev => [
      ...prev,
      {
        heading: '',
        body: '',
        ...(withQuote ? { quote: '' } : {})
      }
    ]);
  };

  const updateSection = (index: number, field: keyof BlogArticleSection, value: string) => {
    setSections(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const removeSection = (index: number) => {
    if (sections.length <= 1) {
      showToast('Article must contain at least one content section.', 'error');
      return;
    }
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    setSections(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  // Tags management
  const handleAddTag = () => {
    const clean = newTagInput.trim();
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Compile current article payload
  const currentArticleItem: BlogArticleItem = {
    id,
    slug: slug.trim() || slugify(title),
    title: title.trim(),
    category: customCategory.trim() || category,
    readTime: `${Math.max(3, Math.ceil(sections.map(s => s.body).join(' ').split(/\s+/).length / 180))} min read`,
    publishedDate: initialArticle?.publishedDate || '',
    excerpt: excerpt.trim(),
    coverImage,
    author: {
      name: authorName.trim(),
      role: authorRole.trim()
    },
    contentSections: sections,
    tags,
    status: initialArticle?.status || 'draft',
    focusKeyword: focusKeyword.trim(),
    targetDay
  };

  const liveSeo = calculateArticleSEOScore(currentArticleItem);

  return (
    <div className="space-y-6 animate-fade-in font-royal-body">
      {/* Editor Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-playfair text-xl font-bold text-[#241A16]">
              {initialArticle ? `Edit Article: ${initialArticle.title.slice(0, 32)}...` : 'Author New Blog Post'}
            </h3>
            <p className="text-xs text-stone-500">
              Formulate comprehensive E-E-A-T guides with rich pull-quotes and structured headings.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Live SEO Score Gauge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>SEO Score: {liveSeo.score}/100</span>
            <span className="px-1.5 py-0.2 rounded bg-white text-[#801B18] text-[10px]">
              {liveSeo.rating}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onPreview(currentArticleItem)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF0EB] hover:bg-[#801B18] text-[#9B332C] hover:text-white text-xs font-bold border border-[#EACAC0] transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Review & Preview</span>
          </button>

          <button
            type="button"
            onClick={() => onSaveDraft(currentArticleItem)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => onPublish(currentArticleItem)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#801B18] hover:bg-[#9B332C] text-white text-xs font-bold shadow-md transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Publish Post Live</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1.5">
                <span>Article Title (H1) *</span>
                <span className={`font-mono text-[11px] ${
                  title.length >= 45 && title.length <= 70 ? 'text-emerald-600' : 'text-stone-400'
                }`}>
                  {title.length} / 70 characters
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Sanganeri vs Bagru Print: 5 Crucial Differences Every Designer Must Know"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-playfair font-bold text-[#241A16] focus:outline-none focus:border-[#9B332C]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1.5">
                <span>URL Slug *</span>
                <span className="text-[11px] text-stone-400 font-mono">
                  /blog/{slug || '...'}
                </span>
              </div>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="sanganeri-vs-bagru-print-differences"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-700 focus:outline-none focus:border-[#9B332C]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1.5">
                <span>Meta Excerpt / Lead Paragraph *</span>
                <span className={`font-mono text-[11px] ${
                  excerpt.length >= 110 && excerpt.length <= 170 ? 'text-emerald-600' : 'text-stone-400'
                }`}>
                  {excerpt.length} / 160 characters (ideal)
                </span>
              </div>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Provide a compelling 2-sentence summary answering the primary query for search engines and readers..."
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 leading-relaxed focus:outline-none focus:border-[#9B332C]"
              />
            </div>
          </div>

          {/* Dynamic Content Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-playfair text-lg font-bold text-[#241A16]">
                Article Content Sections ({sections.length})
              </h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addSection(false)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Standard Section</span>
                </button>
                <button
                  type="button"
                  onClick={() => addSection(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF0EB] hover:bg-[#801B18] text-[#9B332C] hover:text-white text-xs font-bold border border-[#EACAC0] transition-colors"
                >
                  <Quote className="w-3.5 h-3.5" />
                  <span>+ Section with Pull-Quote</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {sections.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3 relative group"
                >
                  {/* Section Controls */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="text-xs font-bold text-[#801B18] font-playfair">
                      Section {idx + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveSection(idx, 'up')}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1 rounded-lg text-stone-400 hover:text-stone-700 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(idx, 'down')}
                        disabled={idx === sections.length - 1}
                        title="Move Down"
                        className="p-1 rounded-lg text-stone-400 hover:text-stone-700 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        title="Delete Section"
                        className="p-1 rounded-lg text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Section Heading */}
                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">
                      Section Subheading (H2)
                    </label>
                    <input
                      type="text"
                      value={section.heading || ''}
                      onChange={(e) => updateSection(idx, 'heading', e.target.value)}
                      placeholder="e.g. 1. Ground Fabric Tone: Pure Bleached White vs Earthy Cream & Mud"
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:border-[#9B332C]"
                    />
                  </div>

                  {/* Optional Pull-Quote */}
                  <div>
                    <label className="text-xs font-bold text-stone-600 flex items-center justify-between mb-1">
                      <span>Artisan / Expert Pull-Quote (Optional)</span>
                      <span className="text-[10px] text-stone-400 font-normal">Adds luxury editorial authority</span>
                    </label>
                    <input
                      type="text"
                      value={section.quote || ''}
                      onChange={(e) => updateSection(idx, 'quote', e.target.value)}
                      placeholder='e.g. In Sanganer, the artisan works with light; in Bagru, with shadow and soil.'
                      className="w-full px-3.5 py-2 bg-[#FAF0EB] border border-[#EACAC0] rounded-xl text-xs italic text-stone-800 focus:outline-none focus:border-[#9B332C]"
                    />
                  </div>

                  {/* Section Body */}
                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">
                      Content Body *
                    </label>
                    <textarea
                      rows={5}
                      value={section.body}
                      onChange={(e) => updateSection(idx, 'body', e.target.value)}
                      placeholder="Write the in-depth technical or storytelling paragraphs..."
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 leading-relaxed focus:outline-none focus:border-[#9B332C]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings (1 Col) */}
        <div className="space-y-6">
          {/* SEO Focus Keyword & Taxonomy */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h4 className="font-playfair text-base font-bold text-[#241A16] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>SEO & Classification</span>
            </h4>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Primary Focus Keyword *
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="e.g. Sanganeri vs Bagru print"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-[#801B18] font-bold focus:outline-none focus:border-[#9B332C]"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Target keyword to dominate Google organic rankings
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
              >
                {PRESET_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                30-Day Calendar Target Day
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={targetDay || ''}
                onChange={(e) => setTargetDay(e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="e.g. 4"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-800 focus:outline-none focus:border-[#9B332C]"
              />
            </div>

            {/* Tag Pills */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Tags & Taxonomy
              </label>
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {tags.map(t => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-stone-400 hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add tag and press Enter"
                  className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Cover Image Selector */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h4 className="font-playfair text-base font-bold text-[#241A16] flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#801B18]" />
              <span>Cover Image</span>
            </h4>

            {/* Live Thumbnail Preview */}
            <div className="rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 h-36 relative">
              <img
                src={resolveWebpImage(coverImage)}
                alt="Cover Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/products/duffle-indigo.jpg';
                }}
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                Live Preview
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Choose Catalog Image Preset
              </label>
              <select
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
              >
                {PRESET_COVERS.map(cov => (
                  <option key={cov.path} value={cov.path}>{cov.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Or Custom Image Path
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/products/your-image.jpg"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-700 focus:outline-none focus:border-[#9B332C]"
              />
            </div>
          </div>

          {/* Author Details */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h4 className="font-playfair text-base font-bold text-[#241A16]">
              Author E-E-A-T Credibility
            </h4>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Author Professional Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#9B332C]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
