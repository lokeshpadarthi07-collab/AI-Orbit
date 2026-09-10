import React from 'react';
import { TrendingUp, Award, Zap, ShieldCheck, Cpu, Users } from 'lucide-react';

export default function AnalyticsModule({ analytics, tasks }) {
  const categoryCounts = tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Platform Analytics & Intelligence Metrics
          </h2>
          <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
            Real-Time Telemetry
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Global metrics tracking active task executions, bounty payouts, model latency distribution, and developer benchmark leaderboard.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="orbit-glass rounded-2xl p-5 text-center">
          <div className="text-xs text-zinc-400 font-semibold mb-1">Total Active Tasks</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{analytics?.totalTasks || 142}</div>
          <div className="mt-1 text-[11px] text-emerald-400 font-medium">+12% vs last month</div>
        </div>

        <div className="orbit-glass rounded-2xl p-5 text-center">
          <div className="text-xs text-zinc-400 font-semibold mb-1">Total Bounties Paid</div>
          <div className="text-3xl font-extrabold text-amber-300 tracking-tight">{analytics?.activeBounties || '$85,500'}</div>
          <div className="mt-1 text-[11px] text-amber-400 font-medium">USDC Rewards</div>
        </div>

        <div className="orbit-glass rounded-2xl p-5 text-center">
          <div className="text-xs text-zinc-400 font-semibold mb-1">Avg Execution Latency</div>
          <div className="text-3xl font-extrabold text-cyan-300 tracking-tight">{analytics?.avgLatency || '48ms'}</div>
          <div className="mt-1 text-[11px] text-cyan-400 font-medium">99.9th Percentile</div>
        </div>

        <div className="orbit-glass rounded-2xl p-5 text-center">
          <div className="text-xs text-zinc-400 font-semibold mb-1">Registered AI Engineers</div>
          <div className="text-3xl font-extrabold text-indigo-300 tracking-tight">{analytics?.totalDevelopers || '24,800+'}</div>
          <div className="mt-1 text-[11px] text-indigo-400 font-medium">Global Community</div>
        </div>
      </div>

      {/* Category Distribution Bars */}
      <div className="orbit-glass rounded-2xl p-6 space-y-6">
        <h3 className="font-heading text-lg font-bold text-white">Task Distribution by AI Domain</h3>

        <div className="space-y-4 text-xs">
          {Object.entries(categoryCounts).map(([cat, count]) => {
            const percentage = Math.round((count / tasks.length) * 100);
            return (
              <div key={cat} className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="text-zinc-200">{cat}</span>
                  <span className="text-indigo-400">{count} modules ({percentage}%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-700" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
