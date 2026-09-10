import React from 'react';
import { X, Building2, MapPin, ExternalLink, Briefcase, Cpu, CheckCircle2 } from 'lucide-react';

export default function CompanyDetailModal({ company, onClose, showToast }) {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-indigo-500/30 bg-[#0d0d12] text-zinc-100 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={company.logo} alt={company.name} className="h-8 w-8 rounded-lg object-cover" />
            <h3 className="font-heading text-lg font-bold text-white">{company.name}</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold">{company.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-zinc-400">
                <MapPin className="h-3.5 w-3.5" />
                {company.location}
              </span>
            </div>
            <span className="rounded-lg bg-emerald-500/10 px-3 py-1 font-mono font-bold text-emerald-400 border border-emerald-500/20">
              Valuation: {company.valuation}
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-zinc-300 mb-1">Company Overview</h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
              {company.description}
            </p>
          </div>

          {/* Flagship Models */}
          <div>
            <h4 className="text-xs font-bold text-zinc-300 mb-2">Deployed Frontier AI Models</h4>
            <div className="flex flex-wrap gap-2">
              {company.keyModels?.map((m) => (
                <span key={m} className="rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 border border-cyan-500/30">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Open Engineering Roles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-zinc-300">Open Technical Roles ({company.openRoles})</h4>
              <span className="text-[10px] text-amber-400 font-bold">Actively Hiring</span>
            </div>

            <div className="space-y-2">
              {[
                { title: "Senior AI Alignment Engineer", team: "Safety & RLHF", location: company.location },
                { title: "Staff Distributed Systems Engineer (CUDA/vLLM)", team: "Inference Infrastructure", location: company.location },
                { title: "Research Scientist - Multimodal Reasoning", team: "Foundation Models", location: company.location }
              ].map((role) => (
                <div key={role.title} className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-xs">
                  <div>
                    <div className="font-bold text-white">{role.title}</div>
                    <div className="text-[11px] text-zinc-400">{role.team} • {role.location}</div>
                  </div>
                  <button 
                    onClick={() => {
                      if (showToast) showToast(`Applied for ${role.title} at ${company.name}!`);
                    }}
                    className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <button onClick={onClose} className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300">
              Close
            </button>
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-glow-indigo hover:bg-indigo-500"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
