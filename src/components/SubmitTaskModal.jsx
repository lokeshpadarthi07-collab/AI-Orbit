import React, { useState } from 'react';
import { X, PlusCircle, Sparkles } from 'lucide-react';

export default function SubmitTaskModal({ onClose, onTaskSubmitted, showToast }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Autonomous Agents',
    businessFunction: 'Engineering',
    difficulty: 'Intermediate',
    reward: '',
    model: 'Claude 3.5 Sonnet',
    shortDescription: '',
    fullDescription: '',
    tags: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title.trim() || !formData.shortDescription.trim()) {
      setErrorMsg('Please enter a task title and short description.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit task');
      }

      const newTask = await response.json();
      setIsSubmitting(false);
      if (showToast) showToast(`Module "${newTask.title}" submitted successfully!`);
      onTaskSubmitted(newTask);
      onClose();
    } catch (err) {
      console.error(err);
      // Fallback local submission if backend API is not running
      const fallbackTask = {
        id: `task-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        businessFunction: formData.businessFunction,
        difficulty: formData.difficulty,
        status: formData.reward ? "Active Bounty" : "Verified",
        reward: formData.reward ? `$${formData.reward} USDC` : "Free Tier",
        rewardValue: formData.reward ? parseFloat(formData.reward) : 0,
        model: formData.model,
        rating: 5.0,
        reviewsCount: 1,
        bookmarksCount: 0,
        author: {
          name: "Community Developer",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
          verified: true
        },
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription || formData.shortDescription,
        targetModels: [formData.model],
        estimatedRuntime: "35s",
        successRate: 98.5,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [formData.category],
        inputs: [],
        sampleCode: {},
        comments: []
      };

      setIsSubmitting(false);
      if (showToast) showToast(`Module "${fallbackTask.title}" submitted successfully!`);
      onTaskSubmitted(fallbackTask);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#0d0d12] text-zinc-100 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <h3 className="font-heading text-lg font-bold text-white">Submit New AI Module / Task</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Module Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Autonomous Multimodal Document Audit Pipeline"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Category & Business Function Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Autonomous Agents">Autonomous Agents</option>
                <option value="Code Generation">Code Generation</option>
                <option value="Data Extraction">Data Extraction</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="Fine-Tuning">Fine-Tuning</option>
                <option value="LLM Benchmarks">LLM Benchmarks</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Business Function</label>
              <select
                name="businessFunction"
                value={formData.businessFunction}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Legal">Legal</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>

          {/* Difficulty & Model Target Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Hard">Hard</option>
                <option value="Frontier">Frontier</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Model</label>
              <select
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="GPT-4o">GPT-4o</option>
                <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                <option value="Llama 3.1 70B">Llama 3.1 70B</option>
                <option value="DeepSeek Coder V2">DeepSeek Coder V2</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Bounty Reward (USDC)</label>
              <input
                type="number"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                placeholder="e.g. 500"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Short Description *</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={2}
              placeholder="Brief summary of the AI task workflow and expected outputs..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Full Specification Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Technical Specification</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={4}
              placeholder="Detailed problem statement, API dependencies, DOM extraction guidelines..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Automation, Scraping, Python, OpenCV"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-xs font-bold text-white shadow-glow-indigo hover:brightness-110"
            >
              <PlusCircle className="h-4 w-4" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Module'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
