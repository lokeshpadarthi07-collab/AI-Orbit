import React from 'react';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  PlusCircle, 
  Cpu, 
  Briefcase, 
  Trophy, 
  Building2, 
  Bot, 
  GraduationCap,
  BarChart3,
  Swords,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  onOpenBookmarks, 
  onOpenSubmit,
  onOpenCompare,
  theme,
  onToggleTheme,
  bookmarkedCount 
}) {
  const navItems = [
    { id: 'tasks', label: 'AI Tasks', icon: Cpu, badge: 'Popular' },
    { id: 'business', label: 'Business Functions', icon: Briefcase },
    { id: 'leaderboard', label: 'LLM Leaderboard', icon: Trophy },
    { id: 'companies', label: 'AI Companies', icon: Building2 },
    { id: 'robots', label: 'Robotics', icon: Bot },
    { id: 'learn', label: 'AI Learn', icon: GraduationCap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('tasks')}
            className="group flex cursor-pointer items-center gap-2.5 transition-transform hover:scale-105"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 p-0.5 shadow-glow">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#09090b]">
                <Sparkles className="h-5 w-5 text-indigo-400 transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                AI ORBIT <span className="rounded bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/30">PRO</span>
              </span>
              <span className="text-[11px] font-medium text-zinc-400">Intelligence Ecosystem</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-zinc-800/80 bg-zinc-900/60 p-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow-indigo'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-cyan-500/20 px-1.5 py-0.2 text-[9px] font-bold text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* Compare Arena Button */}
          <button
            onClick={onOpenCompare}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:border-purple-500/60 hover:bg-purple-500/20 transition-all"
          >
            <Swords className="h-3.5 w-3.5 text-purple-400" />
            <span>LLM Arena</span>
          </button>

          {/* Quick Search trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200 transition-all"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 sm:inline-block border border-zinc-700">
              Ctrl K
            </kbd>
          </button>

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/70 p-2 text-zinc-300 hover:border-amber-500/40 hover:text-amber-400 transition-all"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          {/* Bookmarks Drawer Trigger */}
          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/70 p-2 text-zinc-300 hover:border-indigo-500/40 hover:text-indigo-400 transition-all"
            title="Saved Items"
          >
            <Bookmark className="h-4 w-4" />
            {bookmarkedCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-sm">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Submit New Module/Task CTA */}
          <button
            onClick={onOpenSubmit}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow-indigo hover:brightness-110 active:scale-95 transition-all"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Submit Module</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-zinc-800/80 bg-zinc-950/90 px-2 py-1.5 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'text-zinc-400'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
