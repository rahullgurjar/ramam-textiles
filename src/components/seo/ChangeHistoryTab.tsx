import React, { useState } from 'react';
import { History, RotateCcw, Search, User, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { SEOChangeHistoryItem } from '../../types/seo';

interface ChangeHistoryTabProps {
  historyItems: SEOChangeHistoryItem[];
  onRollback: (historyId: string) => void;
  onSelectPage: (path: string) => void;
}

export const ChangeHistoryTab: React.FC<ChangeHistoryTabProps> = ({
  historyItems,
  onRollback,
  onSelectPage
}) => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');
  const [rollbackSuccess, setRollbackSuccess] = useState<string | null>(null);

  const filteredHistory = historyItems.filter(item => {
    if (selectedUser !== 'all' && item.user !== selectedUser) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.pageName.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q) ||
        item.field.toLowerCase().includes(q) ||
        String(item.newValue).toLowerCase().includes(q) ||
        String(item.previousValue).toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRollbackClick = (id: string) => {
    if (window.confirm('Restore this previous value to the published page?')) {
      onRollback(id);
      setRollbackSuccess(id);
      setTimeout(() => setRollbackSuccess(null), 3000);
    }
  };

  const uniqueUsers = Array.from(new Set(historyItems.map(h => h.user || 'Admin')));

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#9B332C]" />
            <h2 className="font-playfair text-xl font-bold text-stone-900">
              Audit Trail & SEO Modification History ({historyItems.length})
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Full chronological logging of title revisions, description edits, schema updates, and 1-click rollbacks.
          </p>
        </div>

        {rollbackSuccess && (
          <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Value Successfully Restored!</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search history by page, field, or text..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 focus:border-[#9B332C] outline-none text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[11px] font-bold text-stone-500 uppercase">Author:</span>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold outline-none"
          >
            <option value="all">All Authors</option>
            {uniqueUsers.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      {/* History Items List */}
      <div className="space-y-3">
        {filteredHistory.map(item => {
          const dateStr = new Date(item.timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-stone-200 hover:border-stone-300 bg-stone-50/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-stone-900">{item.pageName}</span>
                  <span className="font-mono text-[10px] text-stone-400">({item.path})</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-200/70 text-stone-700">
                    {item.field}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Diff preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div className="p-2 bg-red-50/70 rounded-lg border border-red-200/50 text-red-900 truncate">
                    <span className="text-[9px] uppercase font-bold text-red-500 block">Previous:</span>
                    {String(item.previousValue || 'None')}
                  </div>
                  <div className="p-2 bg-emerald-50/70 rounded-lg border border-emerald-200/50 text-emerald-900 truncate">
                    <span className="text-[9px] uppercase font-bold text-emerald-500 block">New Value:</span>
                    {String(item.newValue || 'None')}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-stone-400" />
                    <span>{item.user}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{dateStr}</span>
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectPage(item.path)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors"
                >
                  Edit Page
                </button>
                <button
                  type="button"
                  onClick={() => handleRollbackClick(item.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF0EB] hover:bg-[#9B332C] text-[#9B332C] hover:text-white font-bold text-xs transition-colors shadow-sm"
                  title="Restore this previous value"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredHistory.length === 0 && (
          <div className="py-12 text-center text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <History className="w-8 h-8 text-stone-300 mx-auto mb-2" />
            <p className="font-bold text-stone-800">No modification records found</p>
            <p className="text-xs text-stone-500 mt-1">Changes made to titles, descriptions, and schema will be logged here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
