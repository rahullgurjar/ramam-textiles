import React, { useState } from 'react';
import { 
  Code, Copy, Download, RefreshCw, Terminal, CheckCircle2, 
  FileCode, Layers, ExternalLink, ShieldCheck, Database 
} from 'lucide-react';
import { BlogArticleItem } from '../../../types/blog';
import { generateJournalTsExport, generateBlogQueueJsonExport } from '../../../utils/blogStorage';
import { useApp } from '../../../context/AppContext';

interface BlogSyncTabProps {
  articles: BlogArticleItem[];
  onReload: () => void;
}

export const BlogSyncTab: React.FC<BlogSyncTabProps> = ({
  articles,
  onReload
}) => {
  const { showToast } = useApp();
  const [activeCodeTab, setActiveCodeTab] = useState<'journal' | 'queue'>('journal');
  const [copied, setCopied] = useState(false);

  const publishedArticles = articles.filter(a => a.status === 'published');
  const journalTsCode = generateJournalTsExport(publishedArticles);
  const queueJsonCode = generateBlogQueueJsonExport();

  const handleCopyCode = (code: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast(`${label} copied to clipboard!`, 'success');
    }
  };

  const handleDownloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename} successfully.`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in font-royal-body">
      {/* Top Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#D4AF37]/30 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-playfair text-xl font-bold text-[#241A16] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#801B18]" />
              <span>Blog Code Persistence & Repository Export</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Articles published in this admin suite automatically work live in the visitor's browser. You can also export and synchronize the TypeScript source files directly into Git.
            </p>
          </div>

          <button
            type="button"
            onClick={onReload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Active Storage</span>
          </button>
        </div>
      </div>

      {/* Code Export Hub */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveCodeTab('journal')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                activeCodeTab === 'journal'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-[#801B18]" />
              <span>src/data/journal.ts ({publishedArticles.length} Published)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCodeTab('queue')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                activeCodeTab === 'queue'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-amber-600" />
              <span>src/data/blogQueue.json</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopyCode(
                activeCodeTab === 'journal' ? journalTsCode : queueJsonCode,
                activeCodeTab === 'journal' ? 'src/data/journal.ts' : 'src/data/blogQueue.json'
              )}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownloadFile(
                activeCodeTab === 'journal' ? 'journal.ts' : 'blogQueue.json',
                activeCodeTab === 'journal' ? journalTsCode : queueJsonCode,
                activeCodeTab === 'journal' ? 'application/typescript' : 'application/json'
              )}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#801B18] hover:bg-[#9B332C] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code View Block */}
        <pre className="bg-[#241A16] text-[#FCE5A4] p-5 rounded-2xl text-xs font-mono overflow-x-auto max-h-[460px] leading-relaxed">
          {activeCodeTab === 'journal' ? journalTsCode : queueJsonCode}
        </pre>
      </div>

      {/* CLI & Automation Guide */}
      <div className="bg-gradient-to-br from-[#FAF0EB] to-white rounded-3xl p-6 border border-[#EACAC0] space-y-4">
        <h4 className="font-playfair text-base font-bold text-[#241A16] flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#801B18]" />
          <span>Automated Daily Cron / CLI Command</span>
        </h4>
        <p className="text-xs text-stone-600 leading-relaxed">
          To automatically take the next queued post from <code className="text-[#801B18] font-mono">blogQueue.json</code>, assign today's publication date, and append it to <code className="text-[#801B18] font-mono">src/data/journal.ts</code> via terminal:
        </p>
        <div className="bg-[#241A16] text-white px-4 py-3 rounded-xl text-xs font-mono flex items-center justify-between">
          <span className="text-emerald-400">node scripts/automate-daily-blog.js</span>
          <button
            type="button"
            onClick={() => handleCopyCode('node scripts/automate-daily-blog.js', 'CLI Command')}
            className="text-stone-400 hover:text-white"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
