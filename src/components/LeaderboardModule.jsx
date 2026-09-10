import React, { useState } from 'react';
import { Trophy, Award, Zap, Cpu, Sparkles } from 'lucide-react';

export default function LeaderboardModule({ leaderboard, onOpenCompare }) {
  const [selectedMetric, setSelectedMetric] = useState('elo');

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (selectedMetric === 'elo') return b.elo - a.elo;
    if (selectedMetric === 'mmlu') return b.mmlu - a.mmlu;
    if (selectedMetric === 'humanEval') return b.humanEval - a.humanEval;
    if (selectedMetric === 'visionScore') return b.visionScore - a.visionScore;
    return a.rank - b.rank;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              LLM & Frontier Model ELO Leaderboard
            </h2>
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
              Live Arena September 2026
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Real-time human-blind side-by-side battle arena rankings, MMLU benchmarks, and coding pass@1 scores.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900/80 p-1 text-xs">
          <button
            onClick={() => setSelectedMetric('elo')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              selectedMetric === 'elo' ? 'bg-indigo-600 text-white shadow-glow-indigo' : 'text-zinc-400'
            }`}
          >
            ELO Rating
          </button>
          <button
            onClick={() => setSelectedMetric('humanEval')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              selectedMetric === 'humanEval' ? 'bg-indigo-600 text-white shadow-glow-indigo' : 'text-zinc-400'
            }`}
          >
            HumanEval (Coding)
          </button>
          <button
            onClick={() => setSelectedMetric('mmlu')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              selectedMetric === 'mmlu' ? 'bg-indigo-600 text-white shadow-glow-indigo' : 'text-zinc-400'
            }`}
          >
            MMLU Knowledge
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="orbit-glass overflow-hidden rounded-2xl border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-950/80 text-zinc-400 font-semibold border-b border-zinc-800">
              <tr>
                <th className="p-4 text-center">Rank</th>
                <th className="p-4">Model Name</th>
                <th className="p-4">Provider</th>
                <th className="p-4 text-right">Arena ELO</th>
                <th className="p-4 text-right">HumanEval (Code)</th>
                <th className="p-4 text-right">MMLU</th>
                <th className="p-4 text-right">Vision Score</th>
                <th className="p-4 text-right">Latency</th>
                <th className="p-4 text-right">Cost / 1M Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/40">
              {sortedLeaderboard.map((item, idx) => {
                const rankNum = idx + 1;
                return (
                  <tr 
                    key={item.name} 
                    onClick={() => onOpenCompare && onOpenCompare(item)}
                    className="hover:bg-zinc-900/60 transition-colors cursor-pointer"
                    title="Click to compare in LLM Arena"
                  >
                    
                    {/* Rank */}
                    <td className="p-4 text-center font-bold">
                      {rankNum === 1 ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold">
                          👑 1
                        </span>
                      ) : rankNum === 2 ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-400/20 text-zinc-200 border border-zinc-400/40 font-bold">
                          🥈 2
                        </span>
                      ) : rankNum === 3 ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-700/20 text-amber-400 border border-amber-700/40 font-bold">
                          🥉 3
                        </span>
                      ) : (
                        <span className="text-zinc-400">{rankNum}</span>
                      )}
                    </td>

                    {/* Model Name */}
                    <td className="p-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="rounded bg-indigo-500/15 px-1.5 py-0.2 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Provider */}
                    <td className="p-4 text-zinc-300 font-medium">{item.provider}</td>

                    {/* ELO */}
                    <td className="p-4 text-right font-mono font-extrabold text-indigo-300 text-base">
                      {item.elo}
                    </td>

                    {/* HumanEval */}
                    <td className="p-4 text-right font-mono font-bold text-cyan-400">
                      {item.humanEval}%
                    </td>

                    {/* MMLU */}
                    <td className="p-4 text-right font-mono text-zinc-200">
                      {item.mmlu}%
                    </td>

                    {/* Vision Score */}
                    <td className="p-4 text-right font-mono text-purple-300">
                      {item.visionScore}%
                    </td>

                    {/* Latency */}
                    <td className="p-4 text-right font-mono text-emerald-400">
                      {item.latency}
                    </td>

                    {/* Cost */}
                    <td className="p-4 text-right font-mono text-zinc-400">
                      {item.costPerMillion}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}
