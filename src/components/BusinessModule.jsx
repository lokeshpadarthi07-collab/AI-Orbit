import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Star, 
  Users, 
  ExternalLink, 
  Megaphone, 
  TrendingUp, 
  Code, 
  DollarSign, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export default function BusinessModule({ tools, showToast, onSelectTool }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Marketing', 'Sales', 'Engineering', 'Finance', 'HR', 'Legal'];

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Marketing': return Megaphone;
      case 'Sales': return TrendingUp;
      case 'Engineering': return Code;
      case 'Finance': return DollarSign;
      case 'Legal': return ShieldCheck;
      default: return Briefcase;
    }
  };

  const filteredTools = tools.filter(t => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              AI Tools by Business Function
            </h2>
            <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-xs font-semibold text-purple-300 border border-purple-500/30">
              Futurepedia Enterprise Index
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Discover verified AI software mapped to corporate departments to accelerate operational ROI.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search business tools..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mb-8 flex overflow-x-auto gap-2 no-scrollbar border-b border-zinc-800/80 pb-4">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat);
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                isActive 
                  ? 'bg-purple-600 text-white shadow-glow-purple' 
                  : 'border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => {
          const Icon = getCategoryIcon(tool.category);
          return (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/90 bg-[#121218] p-5 transition-all duration-300 hover:border-purple-500/50 hover:shadow-glow-purple hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 rounded-lg bg-purple-500/15 px-2.5 py-1 text-xs font-bold text-purple-300 border border-purple-500/30">
                    <Icon className="h-3.5 w-3.5" />
                    {tool.category}
                  </span>
                  <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    {tool.pricing}
                  </span>
                </div>

                <h3 
                  onClick={() => onSelectTool && onSelectTool(tool)}
                  className="font-heading text-lg font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer"
                >
                  {tool.name}
                </h3>

                <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>

                {/* ROI Badge */}
                {tool.roi && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="h-3 w-3" />
                    <span>ROI: {tool.roi}</span>
                  </div>
                )}
              </div>

              {/* Bottom Meta */}
              <div className="mt-6 border-t border-zinc-800/60 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-white">{tool.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{tool.users}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTool && onSelectTool(tool)}
                  className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
                >
                  <span>Inspect & Launch</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
