import React from 'react';
import { Bookmark, X, ChevronRight, Trash2, ExternalLink } from 'lucide-react';

export default function BookmarksDrawer({ 
  isOpen, 
  onClose, 
  bookmarkedTasks, 
  onToggleBookmark, 
  onSelectTask 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d12] border-l border-zinc-800 text-zinc-100 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-4 bg-zinc-950/80">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-indigo-400 fill-indigo-400" />
              <h3 className="font-heading text-lg font-bold text-white">Saved AI Orbit Modules</h3>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-bold text-indigo-300">
                {bookmarkedTasks.length}
              </span>
            </div>
            <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {bookmarkedTasks.length === 0 ? (
              <div className="text-center py-16 text-zinc-500">
                <Bookmark className="mx-auto h-10 w-10 mb-2 opacity-30" />
                <p className="text-sm font-semibold text-zinc-400">No saved modules yet</p>
                <p className="text-xs mt-1">Click the bookmark icon on any task to save it for quick access.</p>
              </div>
            ) : (
              bookmarkedTasks.map((task) => (
                <div
                  key={task.id}
                  className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-2 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-indigo-500/15 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                      {task.category}
                    </span>
                    <button
                      onClick={() => onToggleBookmark(task.id)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h4 
                    onClick={() => {
                      onSelectTask(task);
                      onClose();
                    }}
                    className="font-bold text-sm text-white group-hover:text-indigo-400 cursor-pointer line-clamp-1"
                  >
                    {task.title}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-2">{task.shortDescription}</p>

                  <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/60">
                    <span className="text-cyan-400 font-medium">{task.model}</span>
                    <button
                      onClick={() => {
                        onSelectTask(task);
                        onClose();
                      }}
                      className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      <span>Open Task</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-800 p-4 bg-zinc-950/80 text-xs text-center text-zinc-400">
            Bookmarked items are synced in local session state
          </div>

        </div>
      </div>
    </div>
  );
}
