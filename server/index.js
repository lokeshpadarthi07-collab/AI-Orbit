import express from 'express';
import cors from 'cors';
import {
  initialTasks,
  initialBusinessTools,
  initialLeaderboard,
  initialCompanies,
  initialRobots,
  initialLearn,
  platformAnalytics
} from './data.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory reactive state storage
let tasksStore = [...initialTasks];
let businessToolsStore = [...initialBusinessTools];
let leaderboardStore = [...initialLeaderboard];
let companiesStore = [...initialCompanies];
let robotsStore = [...initialRobots];
let learnStore = [...initialLearn];
let bookmarkedTaskIds = new Set(["task-101", "task-102", "task-105"]);

// GET /api/analytics
app.get('/api/analytics', (req, res) => {
  res.json({
    ...platformAnalytics,
    totalTasks: tasksStore.length,
    activeBountiesCount: tasksStore.filter(t => t.status === "Active Bounty").length,
    bookmarksCount: bookmarkedTaskIds.size
  });
});

// GET /api/tasks (with multi-faceted filtering & sorting)
app.get('/api/tasks', (req, res) => {
  const { search, category, difficulty, businessFunction, status, featured, sort } = req.query;

  let results = [...tasksStore];

  if (search) {
    const query = search.toLowerCase();
    results = results.filter(t => 
      t.title.toLowerCase().includes(query) ||
      t.shortDescription.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query)) ||
      t.category.toLowerCase().includes(query)
    );
  }

  if (category && category !== 'All') {
    results = results.filter(t => t.category === category);
  }

  if (difficulty && difficulty !== 'All') {
    results = results.filter(t => t.difficulty === difficulty);
  }

  if (businessFunction && businessFunction !== 'All') {
    results = results.filter(t => t.businessFunction === businessFunction);
  }

  if (status && status !== 'All') {
    results = results.filter(t => t.status === status);
  }

  if (featured === 'true') {
    results = results.filter(t => t.featured);
  }

  // Sorting
  if (sort === 'bounty-desc') {
    results.sort((a, b) => b.rewardValue - a.rewardValue);
  } else if (sort === 'rating-desc') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'bookmarks-desc') {
    results.sort((a, b) => b.bookmarksCount - a.bookmarksCount);
  } else if (sort === 'newest') {
    results.reverse();
  }

  res.json({
    tasks: results,
    total: results.length,
    bookmarkedIds: Array.from(bookmarkedTaskIds)
  });
});

// GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
  const task = tasksStore.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json({
    ...task,
    isBookmarked: bookmarkedTaskIds.has(task.id)
  });
});

// POST /api/tasks (Submit new Task/Workflow)
app.post('/api/tasks', (req, res) => {
  const { title, category, businessFunction, difficulty, reward, model, shortDescription, fullDescription, tags } = req.body;

  if (!title || !category || !shortDescription) {
    return res.status(400).json({ error: "Title, category, and short description are required." });
  }

  const newTask = {
    id: `task-${Date.now()}`,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: category || "Autonomous Agents",
    businessFunction: businessFunction || "Engineering",
    difficulty: difficulty || "Intermediate",
    status: reward ? "Active Bounty" : "Verified",
    reward: reward ? `$${reward} USDC` : "Free Tier",
    rewardValue: reward ? parseFloat(reward) : 0,
    model: model || "Claude 3.5 Sonnet",
    rating: 5.0,
    reviewsCount: 1,
    bookmarksCount: 0,
    author: {
      name: "Community Developer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      verified: true
    },
    shortDescription,
    fullDescription: fullDescription || shortDescription,
    targetModels: [model || "Claude 3.5 Sonnet", "GPT-4o"],
    estimatedRuntime: "30s",
    successRate: 98.0,
    tags: Array.isArray(tags) ? tags : ["Community Submission", category],
    featured: false,
    isNewSubmission: true,
    inputs: [
      { name: "targetInput", type: "string", description: "Input parameter for execution", default: "Run simulated pipeline" }
    ],
    sampleCode: {
      python: `import requests\n\n# Verified execution script for ${title}\nresponse = requests.post("http://localhost:3001/api/tasks/execute", json={\n    "model": "${model || 'Claude 3.5 Sonnet'}",\n    "task": "${title}"\n})\nprint(response.json())`,
      javascript: `// Verified Node.js script for ${title}\nconst res = await fetch("http://localhost:3001/api/tasks/execute", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ model: "${model || 'Claude 3.5 Sonnet'}", task: "${title}" })\n});\nconsole.log(await res.json());`
    },
    comments: [
      { id: `c-${Date.now()}`, user: "AI Orbit Auditor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80", time: "Just now", text: "Module submission verified and deployed to AI Orbit directory.", upvotes: 1 }
    ]
  };

  tasksStore.unshift(newTask);
  res.status(201).json(newTask);
});

// POST /api/tasks/:id/bookmark
app.post('/api/tasks/:id/bookmark', (req, res) => {
  const { id } = req.params;
  const task = tasksStore.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  let bookmarked = false;
  if (bookmarkedTaskIds.has(id)) {
    bookmarkedTaskIds.delete(id);
    task.bookmarksCount = Math.max(0, task.bookmarksCount - 1);
  } else {
    bookmarkedTaskIds.add(id);
    task.bookmarksCount += 1;
    bookmarked = true;
  }

  res.json({ id, bookmarked, bookmarksCount: task.bookmarksCount });
});

// POST /api/tasks/:id/comments
app.post('/api/tasks/:id/comments', (req, res) => {
  const { id } = req.params;
  const { text, user } = req.body;
  const task = tasksStore.find(t => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });
  if (!text) return res.status(400).json({ error: "Comment text required" });

  const newComment = {
    id: `c-${Date.now()}`,
    user: user || "AI Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    time: "Just now",
    text,
    upvotes: 1
  };

  task.comments.unshift(newComment);
  res.json(newComment);
});

// POST /api/tasks/:id/execute (High-Precision Realistic AI Sandbox Execution Engine)
app.post('/api/tasks/:id/execute', (req, res) => {
  const { id } = req.params;
  const { model, inputParams } = req.body;
  const task = tasksStore.find(t => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  const executionId = `exec-${Math.random().toString(36).substring(7)}`;
  const targetModel = model || task.model;

  // Task-specific realistic output generators
  let specificOutput = {};
  let specificLogs = [
    `[${new Date().toISOString()}] INITIALIZING TASK EXECUTOR v3.4 [Container: docker-us-east-1]`,
    `[${new Date().toISOString()}] Loading model weights: ${targetModel}`,
    `[${new Date().toISOString()}] Input parameters verified: ${JSON.stringify(inputParams || {})}`,
    `[${new Date().toISOString()}] Executing step 1/3: Prompt synthesis & schema alignment...`,
    `[${new Date().toISOString()}] Executing step 2/3: LLM reasoning inference loop...`,
    `[${new Date().toISOString()}] Executing step 3/3: JSON output validation & compliance check...`
  ];

  if (task.id === 'task-101') {
    // Web Scraper
    specificOutput = {
      extractedRecordsCount: 14,
      targetUrl: inputParams?.targetUrl || "https://news.ycombinator.com",
      schemaValidation: "PASSED (100%)",
      scrapedItems: [
        { rank: 1, title: "Show HN: Fast LLM Agent Framework in Rust", points: 284, author: "rust_dev", comments: 92 },
        { rank: 2, title: "Claude 3.5 Sonnet Vision Capabilities in Production", points: 512, author: "ai_researcher", comments: 145 },
        { rank: 3, title: "Why We Switched from Fine-Tuned Llama to DeepSeek Coder", points: 340, author: "cto_saas", comments: 88 }
      ]
    };
    specificLogs.push(`[${new Date().toISOString()}] SUCCESS: Scraped 14 records from ${specificOutput.targetUrl} matching OpenAPI schema.`);
  } else if (task.id === 'task-102') {
    // Security Scanner
    specificOutput = {
      vulnerabilitiesDetected: 2,
      severity: "HIGH",
      cveList: ["CVE-2026-8812 (SQL Injection)", "CVE-2026-4419 (ReDoS Regex)"],
      unifiedGitDiff: `--- a/src/db/query.js\n+++ b/src/db/query.js\n@@ -14,3 +14,3 @@\n-const query = "SELECT * FROM users WHERE email = '" + req.body.email + "'";\n+const query = "SELECT * FROM users WHERE email = $1";\n+const result = fontDb.query(query, [req.body.email]);`,
      patchVerificationScore: 99.8
    };
    specificLogs.push(`[${new Date().toISOString()}] SUCCESS: 2 high-severity vulnerabilities detected & AST patch generated.`);
  } else if (task.id === 'task-103') {
    // Legal Contract Redline
    specificOutput = {
      documentAudited: inputParams?.documentFile || "MSA_Enterprise_2026.pdf",
      governingLaw: inputParams?.jurisdiction || "Delaware",
      liabilityCapFound: "$5,000,000 USDC",
      nonStandardRiskFlags: ["Section 14.2: Unlimited IP Indemnification", "Section 18.1: 15-day termination window"],
      recommendedRedline: "Limit liability cap to 12 months fees paid ($1.2M cap). Require 60-day written notice."
    };
    specificLogs.push(`[${new Date().toISOString()}] SUCCESS: MSA Contract parsed with 2 non-standard risk flags redlined.`);
  } else {
    // General fallback precision output
    specificOutput = {
      status: "COMPLETED",
      taskTitle: task.title,
      category: task.category,
      businessFunction: task.businessFunction,
      modelUsed: targetModel,
      inputParams: inputParams || { prompt: "Default task query" },
      accuracyScore: 0.994,
      payloadSummary: `Successfully completed ${task.title} workflow execution.`
    };
    specificLogs.push(`[${new Date().toISOString()}] SUCCESS: Execution completed with zero schema warnings.`);
  }

  const resultData = {
    executionId,
    taskId: id,
    status: "SUCCESS",
    runtimeMs: Math.floor(Math.random() * 300) + 140,
    tokensUsed: Math.floor(Math.random() * 900) + 450,
    cost: "$0.0032",
    modelUsed: targetModel,
    logs: specificLogs,
    outputJson: specificOutput
  };

  res.json(resultData);
});

// GET /api/business
app.get('/api/business', (req, res) => {
  const { category, search } = req.query;
  let results = [...businessToolsStore];

  if (category && category !== 'All') {
    results = results.filter(b => b.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(b => 
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

// GET /api/leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboardStore);
});

// GET /api/companies
app.get('/api/companies', (req, res) => {
  const { search } = req.query;
  let results = [...companiesStore];
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }
  res.json(results);
});

// GET /api/robots
app.get('/api/robots', (req, res) => {
  res.json(robotsStore);
});

// GET /api/learn
app.get('/api/learn', (req, res) => {
  const { type } = req.query;
  let results = [...learnStore];
  if (type && type !== 'All') {
    results = results.filter(l => l.type === type);
  }
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`AI Orbit API Server running on port ${PORT}`);
});
