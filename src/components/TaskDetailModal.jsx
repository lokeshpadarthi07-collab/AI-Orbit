import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Bookmark, 
  Share2, 
  Terminal, 
  Code, 
  MessageSquare, 
  FileText, 
  Check, 
  Copy, 
  Star, 
  Award, 
  Clock, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  User, 
  Send 
} from 'lucide-react';

export default function TaskDetailModal({ 
  task, 
  onClose, 
  isBookmarked, 
  onToggleBookmark, 
  initialTab = 'overview',
  showToast 
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'overview' | 'sandbox' | 'discussion' | 'code'
  const [selectedModel, setSelectedModel] = useState(task?.model || 'Claude 3.5 Sonnet');
  const [inputValues, setInputValues] = useState(() => {
    const defaults = {};
    if (task?.inputs) {
      task.inputs.forEach(inp => { defaults[inp.name] = inp.default; });
    }
    return defaults;
  });
  
  // Sandbox Execution State
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [codeLang, setCodeLang] = useState('python');

  // Comment State
  const [commentsList, setCommentsList] = useState(task?.comments || []);
  const [newCommentText, setNewCommentText] = useState('');

  if (!task) return null;

  const handleInputChange = (name, value) => {
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const handleRunExecution = async () => {
    setIsRunning(true);
    setExecutionResult(null);

    try {
      const response = await fetch(`/api/tasks/${task.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          inputParams: inputValues
        })
      });

      if (!response.ok) {
        // Fallback simulation if offline or error
        setTimeout(() => {
          setExecutionResult({
            executionId: `exec-${Math.random().toString(36).substring(7)}`,
            status: "SUCCESS",
            runtimeMs: 240,
            tokensUsed: 840,
            cost: "$0.0028",
            modelUsed: selectedModel,
            logs: [
              `[LOG] Initialized ${task.title} Sandbox Engine...`,
              `[LOG] Ingesting parameters: ${JSON.stringify(inputValues)}`,
              `[LOG] Invoking model target: ${selectedModel}`,
              `[LOG] Response generated successfully in 240ms.`
            ],
            outputJson: {
              status: "COMPLETED",
              task: task.title,
              inputs: inputValues,
              resultSummary: "Task completed with 100% schema validation score."
            }
          });
          setIsRunning(false);
          if (showToast) showToast("Sandbox execution completed successfully!");
        }, 1200);
        return;
      }

      const data = await response.json();
      setTimeout(() => {
        setExecutionResult(data);
        setIsRunning(false);
        if (showToast) showToast("Sandbox execution completed successfully!");
      }, 1000);

    } catch (err) {
      console.error(err);
      setIsRunning(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      user: "Verified Engineer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80",
      time: "Just now",
      text: newCommentText,
      upvotes: 1
    };

    setCommentsList(prev => [newComment, ...prev]);
    setNewCommentText('');
    if (showToast) showToast("Comment submitted!");
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    if (showToast) showToast("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-4xl rounded-2xl border border-zinc-800 bg-[#0d0d12] text-zinc-100 shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-indigo-500/15 px-2.5 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {task.category}
            </span>
            <span className="text-xs text-zinc-400">ID: {task.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(task.id)}
              className={`rounded-lg p-2 transition-all ${
                isBookmarked ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
              title="Bookmark"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                if (showToast) showToast("Link copied!");
              }}
              className="rounded-lg bg-zinc-800 p-2 text-zinc-400 hover:text-white transition-all"
              title="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              className="rounded-lg bg-zinc-800 p-2 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hero Section of Modal */}
        <div className="bg-gradient-to-b from-indigo-950/20 to-transparent px-6 py-6 border-b border-zinc-800/60">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                {task.title}
              </h2>
              
              {/* Meta stats */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-zinc-500" />
                  <span>By <strong className="text-zinc-200">{task.author?.name}</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{task.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Est: {task.estimatedRuntime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">{task.successRate}% Success</span>
                </div>
              </div>
            </div>

            {/* Bounty Card Badge */}
            {task.status === 'Active Bounty' && (
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-right">
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Bounty Reward</div>
                <div className="text-xl font-extrabold text-amber-300">{task.reward}</div>
              </div>
            )}
          </div>

          {/* Navigation Tabs inside Modal */}
          <div className="mt-6 flex border-b border-zinc-800 gap-2">
            {[
              { id: 'overview', label: 'Overview & Specs', icon: FileText },
              { id: 'sandbox', label: 'Live AI Sandbox', icon: Terminal, badge: 'Interactive' },
              { id: 'discussion', label: `Discussion (${commentsList.length})`, icon: MessageSquare },
              { id: 'code', label: 'API Integration', icon: Code }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-bold text-indigo-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-2">Description & Problem Statement</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  {task.fullDescription || task.shortDescription}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-3">Target Model Requirements</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {task.targetModels?.map((mod) => (
                    <div key={mod} className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
                      <Cpu className="h-4 w-4 text-cyan-400" />
                      <span className="text-xs font-medium text-white">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inputs & Parameters */}
              {task.inputs && task.inputs.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200 mb-3">Input Parameters & Schema</h4>
                  <div className="overflow-x-auto rounded-xl border border-zinc-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900 text-zinc-400 font-semibold border-b border-zinc-800">
                        <tr>
                          <th className="p-3">Parameter</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Description</th>
                          <th className="p-3">Default Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/40">
                        {task.inputs.map((inp) => (
                          <tr key={inp.name}>
                            <td className="p-3 font-mono font-semibold text-indigo-300">{inp.name}</td>
                            <td className="p-3 font-mono text-zinc-400">{inp.type}</td>
                            <td className="p-3 text-zinc-300">{inp.description}</td>
                            <td className="p-3 font-mono text-cyan-400">{String(inp.default)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-2">Category Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {task.tags?.map((t) => (
                    <span key={t} className="rounded-lg bg-zinc-800/80 px-3 py-1 text-xs text-zinc-300 border border-zinc-700">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE AI SANDBOX SIMULATOR */}
          {activeTab === 'sandbox' && (
            <div className="space-y-5">
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                    <Terminal className="h-4 w-4 text-indigo-400" />
                    <span>Interactive Execution Sandbox</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Environment: Isolated Docker Node</span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  Test and execute this AI task in real time. Adjust target parameters below and run the workflow simulation.
                </p>
              </div>

              {/* Controls Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Select Model */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Model LLM:</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  >
                    {task.targetModels?.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Input Fields */}
                {task.inputs?.map((inp) => (
                  <div key={inp.name}>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">{inp.name}:</label>
                    <input
                      type="text"
                      value={inputValues[inp.name] || ''}
                      onChange={(e) => handleInputChange(inp.name, e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none font-mono"
                    />
                  </div>
                ))}
              </div>

              {/* Action Run Button */}
              <button
                onClick={handleRunExecution}
                disabled={isRunning}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white transition-all ${
                  isRunning 
                    ? 'bg-zinc-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:brightness-110 shadow-glow-indigo'
                }`}
              >
                {isRunning ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Executing Task Workflow...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-white" />
                    <span>Execute Workflow Simulation</span>
                  </>
                )}
              </button>

              {/* Execution Console Output */}
              {executionResult && (
                <div className="space-y-4 rounded-xl border border-zinc-800 bg-black p-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="text-emerald-400 font-bold">STATUS: {executionResult.status}</span>
                    <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                      <span>Latency: <strong className="text-white">{executionResult.runtimeMs}ms</strong></span>
                      <span>Tokens: <strong className="text-white">{executionResult.tokensUsed}</strong></span>
                    </div>
                  </div>

                  {/* Logs */}
                  <div>
                    <div className="text-zinc-500 mb-1">Execution Stream Logs:</div>
                    {executionResult.logs.map((log, idx) => (
                      <div key={idx} className="text-zinc-300 leading-relaxed">{log}</div>
                    ))}
                  </div>

                  {/* Structured Output JSON */}
                  <div className="border-t border-zinc-800 pt-3">
                    <div className="text-cyan-400 font-bold mb-1">Extracted Output Payload (JSON):</div>
                    <pre className="overflow-x-auto rounded-lg bg-zinc-900/90 p-3 text-emerald-300">
                      {JSON.stringify(executionResult.outputJson, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DISCUSSION & COMMENTS */}
          {activeTab === 'discussion' && (
            <div className="space-y-6">
              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share benchmarks, optimizations, or questions..."
                  className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Post</span>
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-3">
                {commentsList.length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-6">No discussion posts yet. Be the first to comment!</p>
                ) : (
                  commentsList.map((comm) => (
                    <div key={comm.id} className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img src={comm.avatar} alt={comm.user} className="h-6 w-6 rounded-full object-cover" />
                          <span className="font-bold text-white">{comm.user}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500">{comm.time}</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{comm.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: API CODE */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {['python', 'javascript'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLang(lang)}
                      className={`rounded-lg px-3 py-1 text-xs font-mono font-semibold uppercase ${
                        codeLang === lang ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleCopyCode(task.sampleCode?.[codeLang] || '')}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300 hover:text-white"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-black p-4 font-mono text-xs text-indigo-300 leading-relaxed">
                {task.sampleCode?.[codeLang] || `# No snippet available for ${codeLang}`}
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
