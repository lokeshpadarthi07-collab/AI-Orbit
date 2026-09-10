import React, { useState } from 'react';
import { X, GraduationCap, PlayCircle, CheckCircle2, Clock, Users, BookOpen, Download } from 'lucide-react';

export default function CourseDetailModal({ course, onClose, showToast }) {
  if (!course) return null;

  const [activeChapter, setActiveChapter] = useState(0);

  const syllabus = [
    { title: "Module 1: Architecture & Foundation Setup", duration: "45 min" },
    { title: "Module 2: State Machines & Memory Loops", duration: "1.2 hours" },
    { title: "Module 3: Multi-Agent Consensus Engine", duration: "1.5 hours" },
    { title: "Module 4: Enterprise Production Deployment", duration: "1.1 hours" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl border border-emerald-500/30 bg-[#0d0d12] text-zinc-100 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-emerald-400" />
            <h3 className="font-heading text-lg font-bold text-white">{course.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="flex flex-col md:flex-row gap-6">
            <img src={course.image} alt={course.title} className="h-44 w-full md:w-64 rounded-xl object-cover border border-zinc-800" />
            
            <div className="flex-1 space-y-2">
              <span className="rounded bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                {course.type}
              </span>
              <h2 className="font-heading text-xl font-bold text-white">{course.title}</h2>
              <p className="text-xs text-zinc-300 leading-relaxed">{course.description}</p>
              <div className="text-xs text-zinc-400">Instructor: <strong className="text-zinc-200">{course.author}</strong></div>
            </div>
          </div>

          {/* Syllabus */}
          <div>
            <h4 className="text-xs font-bold text-zinc-300 mb-3">Course Curriculum & Syllabus:</h4>
            <div className="space-y-2">
              {syllabus.map((item, idx) => (
                <div
                  key={item.title}
                  onClick={() => setActiveChapter(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    activeChapter === idx
                      ? 'border-emerald-500 bg-emerald-950/20 text-white'
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-medium">
                    <PlayCircle className={`h-4 w-4 ${activeChapter === idx ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">{item.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <button onClick={onClose} className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300">
              Close
            </button>
            <button
              onClick={() => {
                if (showToast) showToast(`Started lesson "${syllabus[activeChapter].title}"!`);
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-glow-emerald hover:bg-emerald-500"
            >
              <PlayCircle className="h-4 w-4" />
              <span>Watch Chapter {activeChapter + 1}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
