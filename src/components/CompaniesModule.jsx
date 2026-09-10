import React from 'react';
import { Building2, MapPin, ExternalLink, Briefcase, Cpu } from 'lucide-react';

export default function CompaniesModule({ companies, onSelectCompany }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            AI Ecosystem Companies & Research Labs
          </h2>
          <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
            Startup & Research Index
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Directory of pioneering artificial intelligence companies, research labs, valuations, and open engineering positions.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {companies.map((comp) => (
          <div
            key={comp.id}
            className="orbit-glass orbit-glass-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer"
            onClick={() => onSelectCompany && onSelectCompany(comp)}
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={comp.logo} alt={comp.name} className="h-12 w-12 rounded-xl object-cover border border-zinc-800" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">{comp.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="text-indigo-400 font-semibold">{comp.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {comp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-400 border border-emerald-500/20">
                  {comp.valuation}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {comp.description}
              </p>

              {/* Key Models */}
              <div className="mt-4">
                <span className="text-xs font-semibold text-zinc-400">Flagship Models & Tech:</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {comp.keyModels.map(m => (
                    <span key={m} className="rounded bg-zinc-900 px-2.5 py-0.5 text-xs text-cyan-300 border border-zinc-800 font-mono">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="mt-6 border-t border-zinc-800/80 pt-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{comp.openRoles} Open Roles</span>
              </span>

              <a
                href={`https://${comp.website}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <span>{comp.website}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
