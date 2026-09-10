import React, { useState } from 'react';
import { X, ExternalLink, Star, Users, CheckCircle2, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react';

export default function BusinessToolModal({ tool, onClose, showToast }) {
  if (!tool) return null;

  const [roiTeamSize, setRoiTeamSize] = useState(10);
  const estimatedSavings = roiTeamSize * 1450;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-purple-500/30 bg-[#0d0d12] text-zinc-100 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-purple-500/20 px-2.5 py-1 text-xs font-bold text-purple-300 border border-purple-500/30">
              {tool.category} Software
            </span>
            <span className="text-xs font-mono text-cyan-400">{tool.pricing}</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Title & ROI */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">{tool.name}</h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">{tool.description}</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="text-[10px] text-zinc-400 font-medium">User Rating</div>
              <div className="text-base font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Star className="h-4 w-4 fill-amber-400" />
                <span>{tool.rating} / 5.0</span>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="text-[10px] text-zinc-400 font-medium">Active Users</div>
              <div className="text-base font-bold text-white mt-0.5">{tool.users}</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="text-[10px] text-zinc-400 font-medium">Verified Impact</div>
              <div className="text-xs font-bold text-emerald-400 mt-1">{tool.roi || 'High ROI'}</div>
            </div>
          </div>

          {/* Interactive Enterprise ROI Calculator */}
          <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span>Interactive Enterprise ROI Calculator</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">${estimatedSavings.toLocaleString()} / mo saved</span>
            </div>

            <div>
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Team Size: <strong>{roiTeamSize} members</strong></span>
                <span>Est. Productivity Boost: +35%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={roiTeamSize}
                onChange={(e) => setRoiTeamSize(Number(e.target.value))}
                className="w-full accent-purple-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Feature List */}
          <div>
            <h4 className="text-xs font-bold text-zinc-300 mb-2">Core Enterprise Capabilities:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {['Single Sign-On (SSO & SAML)', 'Automated REST API Sync', 'SOC2 Type II Certified', 'Custom LLM Fine-Tuning'].map(feat => (
                <div key={feat} className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <button onClick={onClose} className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300">
              Close
            </button>
            <button
              onClick={() => {
                if (showToast) showToast(`Redirecting to ${tool.name} portal...`);
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white shadow-glow-purple hover:bg-purple-500"
            >
              <span>Launch Official Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
