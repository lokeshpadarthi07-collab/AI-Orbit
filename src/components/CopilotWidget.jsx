import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, ChevronRight, Cpu, Briefcase, Trophy } from 'lucide-react';

export default function CopilotWidget({ onSelectTask, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "m1",
      sender: "copilot",
      text: "👋 Hello! I'm **AI Orbit Copilot**. Ask me anything about our AI agent tasks, business tools, LLM benchmarks, or physical robotics!"
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    "🚀 Show top coding tasks",
    "📊 Compare Claude vs GPT-4o",
    "💼 Recommend marketing tools",
    "🤖 What are the humanoid specs?"
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate intelligent high-precision responses
    setTimeout(() => {
      let botResponse = "I analyzed your query against our AI Orbit index! Here is what I found:";

      const q = query.toLowerCase();
      if (q.includes("coding") || q.includes("code") || q.includes("security")) {
        botResponse = "👨‍💻 **AI Code Generation & Security Tasks**:\n\nOur top module is **AI-Powered Code Refactoring & Security Vulnerability Scanner** ($1,200 USDC Bounty). It uses GPT-4o AST parsing to detect SQL injection, XSS, & ReDoS race conditions while outputting unified git diffs with 96.8% accuracy!";
      } else if (q.includes("claude") || q.includes("gpt") || q.includes("compare") || q.includes("arena")) {
        botResponse = "🏆 **LLM Arena ELO Rankings**:\n\n1. **Claude 3.5 Sonnet**: 1342 ELO | 92.0% HumanEval (Code Winner)\n2. **GPT-4o**: 1335 ELO | 92.8% Vision Score (Multimodal Winner)\n3. **Gemini 1.5 Pro**: 1318 ELO | 2 Million Token Context Window!\n\nClick **'LLM Arena'** in the top header to run side-by-side battle comparisons.";
      } else if (q.includes("marketing") || q.includes("sales") || q.includes("business")) {
        botResponse = "💼 **Business Function Recommendations**:\n\n- **Marketing**: CopyCraft AI (+340% CTR)\n- **Sales**: PipelineProphet (2.4x Deal Speed)\n- **Legal**: ClauseGuardian ($1.2M Legal Fee Savings)";
        setActiveTab('business');
      } else if (q.includes("humanoid") || q.includes("robot") || q.includes("hardware")) {
        botResponse = "🤖 **Physical AI & Humanoid Robotics**:\n\n- **Figure 02**: 44 DoF | Deployed at BMW Manufacturing\n- **Unitree H1/G1**: 43 DoF | 3.3 m/s Bipedal Speed ($16k)\n- **Optimus Gen 2**: 28 DoF | Tesla FSD End-to-End Neural Net";
        setActiveTab('robots');
      } else if (q.includes("scrape") || q.includes("json") || q.includes("data")) {
        botResponse = "🕸️ **Autonomous Scraping Module**:\n\nCheck out **Autonomous Web Scraping & Structured JSON Extractor Agent** ($750 USDC Bounty). Combines Playwright with Claude 3.5 Sonnet vision capabilities for dynamic SPA scraping!";
      } else if (q.includes("bounty") || q.includes("reward") || q.includes("paid")) {
        botResponse = "💰 **Bounties Telemetry**:\n\nCurrently, **$85,500 USDC** in active rewards are available across 142 modules. Highest bounty: **$1,500 USDC** for Computer Vision Quality Control Inspector!";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `m-${Date.now() + 1}`,
          sender: "copilot",
          text: botResponse
        }
      ]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Closed Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-2xl hover:brightness-110 active:scale-95 transition-all"
        >
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-3.5 w-3.5 text-white animate-spin-slow" />
          </div>
          <span>AI Orbit Copilot</span>
        </button>
      )}

      {/* Open Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl border border-indigo-500/40 bg-[#0d0d12]/95 text-zinc-100 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col h-[480px]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-heading text-xs font-bold text-white">AI Orbit Copilot</h4>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Intelligence Assistant</span>
                </div>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 text-zinc-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'border border-zinc-800 bg-zinc-900/80 text-zinc-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts Bar */}
          <div className="border-t border-zinc-800/80 bg-zinc-950/60 p-2 overflow-x-auto flex gap-1.5 no-scrollbar text-[11px]">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handleSendMessage(p)}
                className="shrink-0 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-zinc-300 hover:border-indigo-500/50 hover:text-white transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-zinc-800 p-3 bg-zinc-950 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Copilot a question..."
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
