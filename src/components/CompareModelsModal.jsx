import React, { useState } from 'react';
import { X, Trophy, Swords, Zap, Check, Sparkles } from 'lucide-react';

export default function CompareModelsModal({ isOpen, onClose, leaderboard }) {
  const [modelA, setModelA] = useState(leaderboard[0] || null);
  const [modelB, setModelB] = useState(leaderboard[1] || null);

  if (!isOpen || !modelA || !modelB) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-4xl rounded-2xl border border-indigo-500/40 bg-[#0d0d12] text-zinc-100 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-indigo-400" />
            <h3 className="font-heading text-lg font-bold text-white">Side-by-Side LLM Arena Battle</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Select Model Selectors */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Model A */}
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-2">
              <label className="block text-xs font-bold text-indigo-300">Model Target A:</label>
              <select
                value={modelA.name}
                onChange={(e) => setModelA(leaderboard.find(m => m.name === e.target.value))}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-bold text-white focus:outline-none"
              >
                {leaderboard.map(m => (
                  <option key={m.name} value={m.name}>{m.name} ({m.provider})</option>
                ))}
              </select>
            </div>

            {/* Model B */}
            <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 space-y-2">
              <label className="block text-xs font-bold text-purple-300">Model Target B:</label>
              <select
                value={modelB.name}
                onChange={(e) => setModelB(leaderboard.find(m => m.name === e.target.value))}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-bold text-white focus:outline-none"
              >
                {leaderboard.map(m => (
                  <option key={m.name} value={m.name}>{m.name} ({m.provider})</option>
                ))}
              </select>
            </div>

          </div>

          {/* Comparison Matrix Table */}
          <div className="space-y-3 text-xs">
            
            {/* Metric Row: ELO */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
              <div className="flex justify-between font-bold text-zinc-300">
                <span className={modelA.elo >= modelB.elo ? "text-indigo-400 font-extrabold" : "text-zinc-400"}>
                  {modelA.name}: {modelA.elo} ELO
                </span>
                <span className="text-zinc-500">Arena Rating ELO</span>
                <span className={modelB.elo >= modelA.elo ? "text-purple-400 font-extrabold" : "text-zinc-400"}>
                  {modelB.name}: {modelB.elo} ELO
                </span>
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="bg-indigo-500 transition-all duration-500" style={{ width: `${(modelA.elo / (modelA.elo + modelB.elo)) * 100}%` }} />
                <div className="bg-purple-500 transition-all duration-500" style={{ width: `${(modelB.elo / (modelA.elo + modelB.elo)) * 100}%` }} />
              </div>
            </div>

            {/* Metric Row: HumanEval (Code) */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
              <div className="flex justify-between font-bold text-zinc-300">
                <span className={modelA.humanEval >= modelB.humanEval ? "text-cyan-400 font-extrabold" : "text-zinc-400"}>
                  {modelA.name}: {modelA.humanEval}% Pass@1
                </span>
                <span className="text-zinc-500">HumanEval (Coding)</span>
                <span className={modelB.humanEval >= modelA.humanEval ? "text-cyan-400 font-extrabold" : "text-zinc-400"}>
                  {modelB.name}: {modelB.humanEval}% Pass@1
                </span>
              </div>
              <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="bg-cyan-500 transition-all duration-500" style={{ width: `${modelA.humanEval}%` }} />
              </div>
            </div>

            {/* Metric Row: Latency & Cost */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="text-[10px] text-zinc-500">Latency ({modelA.name})</div>
                <div className="font-mono font-bold text-emerald-400 mt-0.5">{modelA.latency}</div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <div className="text-[10px] text-zinc-500">Latency ({modelB.name})</div>
                <div className="font-mono font-bold text-emerald-400 mt-0.5">{modelB.latency}</div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button onClick={onClose} className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-glow-indigo">
              Close Arena
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
