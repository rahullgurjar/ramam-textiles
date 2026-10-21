import React, { useState } from 'react';
import { Monitor, Smartphone, CheckCircle, AlertTriangle, Info, Globe, Shield } from 'lucide-react';

interface LiveSERPPreviewProps {
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  pagePath: string;
  pageName: string;
}

export const LiveSERPPreview: React.FC<LiveSERPPreviewProps> = ({
  seoTitle,
  metaDescription,
  canonicalUrl,
  pagePath,
  pageName
}) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const displayTitle = seoTitle || `${pageName} | Ramam Textiles Jaipur`;
  const displayDesc = metaDescription || 'Handcrafted authentic Indian textiles, Jaipur block print apparel, quilted duffle bags, and artisan fabrics. Direct wholesale atelier in Rajasthan.';
  const displayUrl = canonicalUrl || `https://ramamtextiles.shop${pagePath === '/' ? '' : pagePath}`;

  // Formatting clean breadcrumbs for Google preview
  const breadcrumbParts = displayUrl
    .replace('https://', '')
    .split('/')
    .filter(Boolean);

  const titleLength = (seoTitle || '').trim().length;
  const descLength = (metaDescription || '').trim().length;

  // Title character recommendations
  const getTitleStatus = () => {
    if (titleLength === 0) return { label: 'Missing', color: 'text-red-700 bg-red-50 border-red-200', icon: AlertTriangle };
    if (titleLength < 35) return { label: 'Short', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Info };
    if (titleLength <= 62) return { label: 'Optimal', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle };
    return { label: 'May Truncate', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertTriangle };
  };

  // Description character recommendations
  const getDescStatus = () => {
    if (descLength === 0) return { label: 'Missing', color: 'text-red-700 bg-red-50 border-red-200', icon: AlertTriangle };
    if (descLength < 80) return { label: 'Short', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: Info };
    if (descLength <= 160) return { label: 'Optimal', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle };
    return { label: 'May Truncate', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertTriangle };
  };

  const titleStatus = getTitleStatus();
  const descStatus = getDescStatus();

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4 font-sans">
      {/* Device Toggle & Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#9B332C]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Live Google SERP Snippet Preview
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              device === 'desktop' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              device === 'mobile' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        {/* Title length metric */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-stone-600">SEO Title Length</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${titleStatus.color}`}>
              <titleStatus.icon className="w-3 h-3" />
              <span>{titleStatus.label}</span>
            </span>
          </div>
          <div className="flex items-baseline justify-between text-stone-800">
            <span className="text-sm font-bold">{titleLength} <span className="text-stone-400 text-xs font-normal">/ 60 chars recommended</span></span>
            <span className="text-[11px] text-stone-500">~{Math.round(titleLength * 9.5)}px / 580px</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all ${titleLength > 65 ? 'bg-amber-500' : titleLength < 35 ? 'bg-amber-400' : 'bg-emerald-600'}`}
              style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
            />
          </div>
        </div>

        {/* Description length metric */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-stone-600">Meta Description</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1 ${descStatus.color}`}>
              <descStatus.icon className="w-3 h-3" />
              <span>{descStatus.label}</span>
            </span>
          </div>
          <div className="flex items-baseline justify-between text-stone-800">
            <span className="text-sm font-bold">{descLength} <span className="text-stone-400 text-xs font-normal">/ 160 chars recommended</span></span>
            <span className="text-[11px] text-stone-500">~{Math.round(descLength * 6.2)}px / 960px</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all ${descLength > 165 ? 'bg-amber-500' : descLength < 80 ? 'bg-amber-400' : 'bg-emerald-600'}`}
              style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actual Google Preview Box */}
      <div className={`border border-stone-200 rounded-2xl bg-[#ffffff] p-4 transition-all ${
        device === 'mobile' ? 'max-w-sm mx-auto shadow-md' : 'w-full shadow-sm'
      }`}>
        {/* Google Header: Favicon + Brand Name + Breadcrumb */}
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-[#801B18] border border-[#D4AF37] flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-0.5">
            <img src="/favicon.svg" alt="RT" className="w-full h-full object-contain" />
          </div>
          <div className="leading-tight truncate">
            <div className="text-[13px] font-medium text-[#202124] flex items-center gap-1">
              <span>Ramam Textiles</span>
              <span className="text-stone-400 text-xs">•</span>
              <span className="text-[11px] text-stone-500">ramamtextiles.shop</span>
            </div>
            <div className="text-[11px] text-[#4d5156] truncate">
              {displayUrl}
            </div>
          </div>
        </div>

        {/* Title Link with Google blue */}
        <h4 className="text-[18px] leading-[1.3] font-normal text-[#1a0dab] hover:underline cursor-pointer break-words line-clamp-2 mt-1 font-sans">
          {displayTitle}
        </h4>

        {/* Snippet */}
        <p className="text-[13px] leading-[1.5] text-[#4d5156] mt-1 break-words line-clamp-3">
          {displayDesc}
        </p>

        {device === 'mobile' && (
          <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
            <span>Mobile Search Card View</span>
            <span className="text-emerald-700 font-semibold">HTTPS Verified</span>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 leading-snug">
        <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          <strong>Search Engine Guidance:</strong> Character counts are recommended visual benchmarks. Google evaluates titles in physical display pixels (~580px desktop, ~600px mobile) and may rewrite titles to best match user query context.
        </span>
      </div>
    </div>
  );
};
