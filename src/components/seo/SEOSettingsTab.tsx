import React, { useState } from 'react';
import { 
  Settings, Download, Upload, CheckCircle2, AlertTriangle, FileCode, 
  ExternalLink, Globe, Shield, RefreshCw, Save, Info 
} from 'lucide-react';
import { SEOSettings } from '../../types/seo';
import { exportSEOData, exportPublishedOverridesForBuild, importSEOData } from '../../utils/seoStorage';

interface SEOSettingsTabProps {
  settings: SEOSettings;
  onSaveSettings: (settings: SEOSettings) => void;
  onRefreshData: () => void;
}

export const SEOSettingsTab: React.FC<SEOSettingsTabProps> = ({
  settings,
  onSaveSettings,
  onRefreshData
}) => {
  const [formData, setFormData] = useState<SEOSettings>(() => ({ ...settings }));
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleChange = (field: keyof SEOSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExport = () => {
    const jsonStr = exportSEOData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ramam-textiles-seo-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportBuildOverrides = () => {
    const jsonStr = exportPublishedOverridesForBuild();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-published.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setImportStatus('Downloaded seo-published.json! Save this into public/ to bake into production builds.');
    setTimeout(() => setImportStatus(null), 4000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importSEOData(content);
        if (result.success) {
          setImportStatus('Backup successfully imported! Reloading...');
          setTimeout(() => {
            onRefreshData();
            setImportStatus(null);
          }, 1500);
        } else {
          setImportStatus(`Error: ${result.message}`);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#9B332C]" />
            <h2 className="font-playfair text-xl font-bold text-stone-900">
              Global SEO Directives & Verification Settings
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage site-wide title templates, default fallback social assets, verification tokens, and JSON backups.
          </p>
        </div>

        {saveSuccess && (
          <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* Global Branding & Title Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
              Website Brand Name
            </label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
              Title Pattern Template
            </label>
            <input
              type="text"
              value={formData.titleTemplate}
              onChange={(e) => handleChange('titleTemplate', e.target.value)}
              placeholder="%title% | Ramam Textiles"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs font-mono"
            />
            <p className="text-[10px] text-stone-400 mt-1">
              Use <code className="bg-stone-100 px-1 py-0.5 rounded font-bold">%title%</code> as placeholder for individual page titles.
            </p>
          </div>
        </div>

        {/* Base Canonical Domain & Fallback OG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
              Canonical Base Domain
            </label>
            <input
              type="text"
              value={formData.siteBaseUrl}
              onChange={(e) => handleChange('siteBaseUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-1">
              Default Fallback Social OG Image
            </label>
            <input
              type="text"
              value={formData.defaultOgImage}
              onChange={(e) => handleChange('defaultOgImage', e.target.value)}
              placeholder="/logo.png"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs font-mono"
            />
          </div>
        </div>

        {/* Verification Tokens */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
          <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Search Engine Webmaster Verification Tokens</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase text-stone-600 mb-1">
                Google Search Console Token
              </label>
              <input
                type="text"
                value={formData.googleVerification}
                onChange={(e) => handleChange('googleVerification', e.target.value)}
                placeholder="google-site-verification token..."
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-stone-600 mb-1">
                Bing Webmaster Token
              </label>
              <input
                type="text"
                value={formData.bingVerification}
                onChange={(e) => handleChange('bingVerification', e.target.value)}
                placeholder="msvalidate.01 token..."
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-stone-600 mb-1">
                Pinterest Claim Token
              </label>
              <input
                type="text"
                value={formData.pinterestVerification}
                onChange={(e) => handleChange('pinterestVerification', e.target.value)}
                placeholder="p:domain_verify token..."
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#9B332C] outline-none text-xs bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Sitemap & Robots.txt Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-900 block">XML Sitemap</span>
              <span className="text-[11px] text-stone-500 font-mono">https://ramamtextiles.shop/sitemap.xml</span>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-stone-900 block">Robots.txt</span>
              <span className="text-[11px] text-stone-500 font-mono">https://ramamtextiles.shop/robots.txt</span>
            </div>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end pt-3 border-t border-stone-100">
          <button
            type="submit"
            className="inline-flex items-center gap-2 pill-btn-rose px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Global SEO Settings</span>
          </button>
        </div>
      </form>

      {/* Backup, Export & Import Section */}
      <div className="mt-8 pt-6 border-t border-stone-200 space-y-4">
        <h4 className="font-playfair text-base font-bold text-stone-900 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#9B332C]" />
          <span>SEO Configuration Backup & Migration</span>
        </h4>
        <p className="text-xs text-stone-500 leading-relaxed">
          Export your customized SEO titles, descriptions, image alt tags, JSON-LD schemas, and internal links into a portable JSON backup file. Restore or migrate anytime.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Full Backup (JSON)</span>
          </button>

          <button
            type="button"
            onClick={handleExportBuildOverrides}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9B332C] hover:bg-[#832b25] text-white text-xs font-bold transition-all shadow-sm"
            title="Download published overrides file for public/seo-published.json"
          >
            <Download className="w-4 h-4" />
            <span>Export Static Build Config (seo-published.json)</span>
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold cursor-pointer transition-colors shadow-sm">
            <Upload className="w-4 h-4 text-stone-500" />
            <span>Restore from Backup (JSON)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>

        {importStatus && (
          <div className="p-3 bg-stone-100 rounded-xl text-xs font-bold text-stone-800 flex items-center gap-2 animate-fade-in">
            <Info className="w-4 h-4 text-[#9B332C]" />
            <span>{importStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
};
