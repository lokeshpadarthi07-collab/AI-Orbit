import React, { useState } from 'react';
import { 
  Search, 
  Grid, 
  List as ListIcon, 
  Filter, 
  Sparkles, 
  Bookmark, 
  Play, 
  ChevronRight, 
  Star, 
  Award, 
  Clock, 
  CheckCircle2, 
  Zap, 
  UserCheck 
} from 'lucide-react';

export default function TasksModule({ 
  tasks, 
  loading, 
  bookmarkedIds, 
  onToggleBookmark, 
  onSelectTask, 
  onRunSandbox,
  selectedCategory,
  setSelectedCategory 
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedFunction, setSelectedFunction] = useState('All');
  const [selectedSort, setSelectedSort] = useState('bounty-desc');
  const [onlyBounties, setOnlyBounties] = useState(false);

  const categories = ['All', 'Autonomous Agents', 'Code Generation', 'Data Extraction', 'Computer Vision', 'Fine-Tuning', 'LLM Benchmarks'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Hard', 'Frontier'];
  const businessFunctions = ['All', 'Engineering', 'Sales', 'Marketing', 'Legal', 'Finance', 'Operations', 'HR'];

  // Local filtering & sorting logic
  let filteredTasks = tasks.filter(task => {
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.shortDescription.toLowerCase().includes(q);
      const matchTags = task.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }
    // Category filter
    if (selectedCategory !== 'All' && task.category !== selectedCategory) return false;
    // Difficulty filter
    if (selectedDifficulty !== 'All' && task.difficulty !== selectedDifficulty) return false;
    // Business Function filter
    if (selectedFunction !== 'All' && task.businessFunction !== selectedFunction) return false;
    // Only bounties
    if (onlyBounties && task.status !== 'Active Bounty') return false;

    return true;
  });

  // Sorting
  filteredTasks.sort((a, b) => {
    if (selectedSort === 'bounty-desc') return b.rewardValue - a.rewardValue;
    if (selectedSort === 'rating-desc') return b.rating - a.rating;
    if (selectedSort === 'bookmarks-desc') return b.bookmarksCount - a.bookmarksCount;
    return 0;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Module Title & Counter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              AI Task & Workflow Directory
            </h2>
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              {filteredTasks.length} Modules Available
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Browse verified autonomous agent pipelines, benchmark challenges, and corporate workflow tasks.
          </p>
        </div>

        {/* View Switcher & Quick Bounty Toggle */}
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700">
            <input 
              type="checkbox" 
              checked={onlyBounties} 
              onChange={(e) => setOnlyBounties(e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-800 text-indigo-600 focus:ring-indigo-500" 
            />
            <span>Active Bounties Only</span>
          </label>

          <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900/80 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === 'grid' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === 'list' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="List View"
            >
              <ListIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter & Search Control Panel */}
      <div className="orbit-glass mb-8 rounded-2xl p-4 sm:p-5">
        
        {/* Search Bar & Sort Row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tasks by title, framework, tag, or model..."
              className="w-full rounded-xl border border-zinc-800 bg-[#09090b]/80 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-400">Sort by:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-[#09090b]/80 px-3 py-2 text-xs font-medium text-zinc-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="bounty-desc">Highest Bounty Reward</option>
              <option value="rating-desc">Highest Rating</option>
              <option value="bookmarks-desc">Most Bookmarked</option>
            </select>
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="mt-4 flex overflow-x-auto gap-1.5 border-t border-zinc-800/80 pt-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                  : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Business Function & Difficulty */}
        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-zinc-800/60 pt-3 text-xs">
          {/* Business Function Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-zinc-400">Business Function:</span>
            <select
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
              className="rounded-lg border border-zinc-800 bg-[#09090b] px-2.5 py-1 text-xs text-zinc-300 focus:border-indigo-500 focus:outline-none"
            >
              {businessFunctions.map(fn => <option key={fn} value={fn}>{fn}</option>)}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-zinc-400">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="rounded-lg border border-zinc-800 bg-[#09090b] px-2.5 py-1 text-xs text-zinc-300 focus:border-indigo-500 focus:outline-none"
            >
              {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Reset Filters button */}
          {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedFunction !== 'All' || searchQuery || onlyBounties) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedFunction('All');
                setSearchQuery('');
                setOnlyBounties(false);
              }}
              className="ml-auto text-xs text-indigo-400 hover:text-indigo-300 underline"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Task Cards Container */}
      {filteredTasks.length === 0 ? (
        <div className="orbit-glass rounded-2xl p-12 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
          <h3 className="text-lg font-semibold text-white">No AI tasks match your filters</h3>
          <p className="mt-1 text-xs text-zinc-400">Try adjusting your search query, difficulty level, or category filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSelectedFunction('All');
              setSearchQuery('');
            }}
            className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => {
            const isBookmarked = bookmarkedIds.includes(task.id);
            return (
              <div
                key={task.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/90 bg-[#121218] p-5 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-glow-indigo hover:-translate-y-1"
              >
                {/* Top Badge & Bookmark Button Row */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {task.isNewSubmission && (
                        <span className="rounded-md bg-gradient-to-r from-pink-500 to-purple-600 px-2 py-0.5 text-[10px] font-extrabold text-white shadow-glow-purple animate-pulse">
                          ✨ NEW SUBMISSION
                        </span>
                      )}
                      <span className="rounded-md bg-indigo-500/15 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                        {task.category}
                      </span>
                      {task.status === 'Active Bounty' ? (
                        <span className="flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                          <Award className="h-3 w-3" />
                          {task.reward}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleBookmark(task.id)}
                      className={`rounded-lg p-1.5 transition-all ${
                        isBookmarked 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectTask(task)}
                    className="font-heading text-base font-bold text-white transition-colors group-hover:text-indigo-400 cursor-pointer line-clamp-2"
                  >
                    {task.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {task.shortDescription}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {task.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="rounded bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-400 border border-zinc-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Meta & Action Buttons */}
                <div className="mt-5 border-t border-zinc-800/60 pt-3">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-300">Model:</span>
                      <span className="text-cyan-400 font-medium">{task.model}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white">{task.rating}</span>
                      <span className="text-[10px] text-zinc-500">({task.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectTask(task)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 py-2 text-xs font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800 transition-all"
                    >
                      <span>Explore</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    
                    <button
                      onClick={() => onRunSandbox(task)}
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600/90 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-600 shadow-glow-indigo transition-all"
                      title="Run Live Sandbox Simulation"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Sandbox</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isBookmarked = bookmarkedIds.includes(task.id);
            return (
              <div
                key={task.id}
                className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-zinc-800/90 bg-[#121218] p-4 transition-all duration-200 hover:border-indigo-500/50 hover:bg-zinc-900/60"
              >
                {/* Left Side Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="rounded bg-indigo-500/15 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                      {task.category}
                    </span>
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                      {task.businessFunction}
                    </span>
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                      {task.model}
                    </span>
                    {task.status === 'Active Bounty' && (
                      <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                        {task.reward}
                      </span>
                    )}
                  </div>

                  <h3 
                    onClick={() => onSelectTask(task)}
                    className="font-heading text-base font-bold text-white transition-colors group-hover:text-indigo-400 cursor-pointer"
                  >
                    {task.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-400 line-clamp-1">
                    {task.shortDescription}
                  </p>
                </div>

                {/* Right Side Meta & Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex flex-col items-end text-xs text-zinc-400">
                    <div className="flex items-center gap-1 font-bold text-white">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span>{task.rating}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">{task.estimatedRuntime} avg</span>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(task.id)}
                    className={`rounded-lg p-2 transition-all ${
                      isBookmarked ? 'bg-indigo-600 text-white' : 'bg-zinc-800/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onSelectTask(task)}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 transition-all"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => onRunSandbox(task)}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-glow-indigo hover:bg-indigo-500 transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Run Sandbox</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
