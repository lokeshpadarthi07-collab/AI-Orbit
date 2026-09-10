import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Terminal, Award } from 'lucide-react';

export default function HeroBanner({ analytics, activeTab, onSelectQuickCategory }) {
  return (
    <div className="relative overflow-hidden border-b border-zinc-800/80 bg-[#09090b] py-12 lg:py-16 orbit-bg-mesh">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-10 right-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Status Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>AI Orbit Intelligence Index v3.4 — September 2026 Release</span>
          </div>

          {/* Main Title */}
          <h1 className="max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The Definitive Hub for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              AI Tasks, Workflows & Ecosystem
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-zinc-400">
            Explore production-grade AI agent tasks, enterprise business functions, live model ELO leaderboards, physical robotics, and benchmark workflows.
          </p>

          {/* Metric Stats Cards */}
          <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="orbit-glass rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 mb-1">
                <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                <span>Active AI Tasks</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {analytics?.totalTasks || 142}
              </div>
              <div className="mt-1 text-[11px] text-emerald-400 font-medium">+18 this week</div>
            </div>

            <div className="orbit-glass rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 mb-1">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>Active Bounties</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-amber-300 tracking-tight">
                {analytics?.activeBounties || '$85,500'}
              </div>
              <div className="mt-1 text-[11px] text-zinc-400 font-medium">USDC Rewards</div>
            </div>

            <div className="orbit-glass rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 mb-1">
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
                <span>Avg Execution Latency</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">
                {analytics?.avgLatency || '48ms'}
              </div>
              <div className="mt-1 text-[11px] text-cyan-400 font-medium">Edge Optimized</div>
            </div>

            <div className="orbit-glass rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 mb-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Benchmark Accuracy</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-300 tracking-tight">
                {analytics?.successRate || '99.4%'}
              </div>
              <div className="mt-1 text-[11px] text-emerald-400 font-medium">Verified Pipelines</div>
            </div>
          </div>

          {/* Quick Categories Filter Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">Popular Filters:</span>
            {['Autonomous Agents', 'Code Generation', 'Data Extraction', 'Computer Vision', 'Fine-Tuning'].map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectQuickCategory(cat)}
                className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-zinc-300 transition-all hover:border-indigo-500/50 hover:bg-zinc-800 hover:text-white"
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
