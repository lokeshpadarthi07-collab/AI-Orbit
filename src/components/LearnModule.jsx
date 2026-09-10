import React from 'react';
import { GraduationCap, Star, BookOpen, Clock, Users, PlayCircle } from 'lucide-react';

export default function LearnModule({ learn, showToast, onSelectCourse }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            AI Learn, Courses & E-Book Guides
          </h2>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            TheresAnAI / Rundown AI Ref
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Master AI engineering, autonomous agent architectures, prompt design, and fine-tuning with curated tutorials.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {learn.map((item) => (
          <div
            key={item.id}
            className="orbit-glass orbit-glass-hover rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer"
            onClick={() => onSelectCourse && onSelectCourse(item)}
          >
            <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              <span className="absolute top-3 left-3 rounded-full bg-indigo-600/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                {item.type}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span>By <strong className="text-zinc-200">{item.author}</strong></span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="font-bold">{item.rating}</span>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-white line-clamp-2">{item.title}</h3>
                <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">{item.description}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map(t => (
                    <span key={t} className="rounded bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-400 border border-zinc-800">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-zinc-800/60 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-zinc-500" />
                    {item.enrolled}
                  </span>
                </div>

                <button
                  onClick={() => showToast && showToast(`Opening "${item.title}"...`)}
                  className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  <span>Start Learning</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
