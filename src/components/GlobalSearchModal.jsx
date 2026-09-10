import React, { useState, useEffect } from 'react';
import { Search, X, Cpu, Briefcase, Building2, GraduationCap, ChevronRight } from 'lucide-react';

export default function GlobalSearchModal({ 
  isOpen, 
  onClose, 
  tasks, 
  businessTools, 
  companies, 
  learn, 
  onSelectTask,
  setActiveTab 
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingTasks = q 
    ? tasks.filter(t => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q))).slice(0, 4)
    : tasks.slice(0, 3);

  const matchingBiz = q
    ? businessTools.filter(b => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)).slice(0, 3)
    : businessTools.slice(0, 2);

  const matchingCompanies = q
    ? companies.filter(c => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)).slice(0, 2)
    : companies.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#0d0d12] text-zinc-100 shadow-2xl overflow-hidden">
        
        {/* Input Row */}
        <div className="flex items-center border-b border-zinc-800 px-4 py-3 bg-zinc-950/80">
          <Search className="h-5 w-5 text-indigo-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI Tasks, Tools, Companies, Leaderboard, Courses... (ESC to close)"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 text-xs">

          {/* Tasks Section */}
          {matchingTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-zinc-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
                <Cpu className="h-3.5 w-3.5 text-indigo-400" />
                <span>AI Tasks & Workflows</span>
              </div>
              <div className="space-y-1.5">
                {matchingTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTask(t);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-800/80 cursor-pointer transition-all"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{t.title}</span>
                        <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-1.5 rounded">{t.category}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{t.shortDescription}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Tools Section */}
          {matchingBiz.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-zinc-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
                <Briefcase className="h-3.5 w-3.5 text-purple-400" />
                <span>Business Function Tools</span>
              </div>
              <div className="space-y-1.5">
                {matchingBiz.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      setActiveTab('business');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-800/80 cursor-pointer transition-all"
                  >
                    <div>
                      <div className="font-bold text-white">{b.name}</div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{b.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Companies Section */}
          {matchingCompanies.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-zinc-400 font-semibold mb-2 uppercase text-[10px] tracking-wider">
                <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>AI Companies & Labs</span>
              </div>
              <div className="space-y-1.5">
                {matchingCompanies.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveTab('companies');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-800/80 cursor-pointer transition-all"
                  >
                    <div className="font-bold text-white">{c.name} ({c.category})</div>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 bg-zinc-950/80 p-3 text-center text-[11px] text-zinc-500">
          Tip: Use <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">Ctrl + K</kbd> anywhere to open search
        </div>

      </div>
    </div>
  );
}
