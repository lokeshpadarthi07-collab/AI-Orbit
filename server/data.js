export const initialTasks = [
  {
    id: "task-101",
    title: "Autonomous Web Scraping & Structured JSON Extractor Agent",
    slug: "autonomous-web-scraping-json-agent",
    category: "Autonomous Agents",
    businessFunction: "Engineering",
    difficulty: "Intermediate",
    status: "Active Bounty",
    reward: "$750 USDC",
    rewardValue: 750,
    model: "Claude 3.5 Sonnet",
    rating: 4.9,
    reviewsCount: 38,
    bookmarksCount: 245,
    author: {
      name: "NexusAI Labs",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      verified: true
    },
    shortDescription: "Build a resilient multi-step web browser agent that navigates JavaScript-heavy SPA dashboards and extracts relational schemas into structured JSON with schema validation.",
    fullDescription: "This workflow task requires implementing an autonomous web scraper agent utilizing Playwright or Puppeteer with Claude 3.5 Sonnet vision capabilities. The agent must bypass dynamic overlays, solve basic recaptchas via vision reasoning, and format pagination outputs into validated OpenAPI JSON payloads.",
    pipelineNodes: [
      { id: "n1", name: "DOM Hydration & Crawl", type: "Input Preprocessor", status: "Ready", duration: "120ms" },
      { id: "n2", name: "Claude 3.5 Vision Reasoning", type: "LLM Inference", status: "Active", duration: "240ms" },
      { id: "n3", name: "OpenAPI Schema Validator", type: "Output Formatter", status: "Ready", duration: "45ms" }
    ],
    targetModels: ["Claude 3.5 Sonnet", "GPT-4o", "Gemini 1.5 Pro"],
    estimatedRuntime: "45s",
    successRate: 98.4,
    tags: ["Web Scraping", "Playwright", "Structured Output", "Vision", "Automation"],
    featured: true,
    inputs: [
      { name: "targetUrl", type: "string", description: "Target website URL to scrape", default: "https://news.ycombinator.com" },
      { name: "maxDepth", type: "number", description: "Maximum link crawl depth", default: 2 },
      { name: "outputFormat", type: "string", description: "Target JSON schema format", default: "ArticleListSchema" }
    ],
    sampleCode: {
      python: `import asyncio
from pyppeteer import launch
from anthropic import Anthropic

async def run_agent(url: str, schema: dict):
    browser = await launch(headless=True)
    page = await browser.newPage()
    await page.goto(url)
    content = await page.content()
    
    client = Anthropic()
    response = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=2048,
        messages=[{"role": "user", "content": f"Extract structured data matching {schema} from HTML: {content[:4000]}"}]
    )
    await browser.close()
    return response.content`,
      javascript: `import { chromium } from 'playwright';
import OpenAI from 'openai';

async function extractStructuredData(url, targetSchema) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const text = await page.innerText('body');
  
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: \`Extract data matching \${targetSchema}: \${text.slice(0, 3000)}\` }],
    response_format: { type: "json_object" }
  });
  await browser.close();
  return JSON.parse(completion.choices[0].message.content);
}`
    },
    comments: [
      { id: "c1", user: "DevAlex", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80", time: "2 hours ago", text: "Verified this against dynamic React tables. Claude 3.5 Sonnet handles pagination flawlessly!", upvotes: 14 },
      { id: "c2", user: "SaraCode", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80", time: "5 hours ago", text: "Added retry logic for DOM hydration delay. Solution benchmarks at 99.1% accuracy.", upvotes: 8 }
    ]
  },
  {
    id: "task-102",
    title: "AI-Powered Code Refactoring & Security Vulnerability Scanner",
    slug: "code-refactoring-security-scanner",
    category: "Code Generation",
    businessFunction: "Engineering",
    difficulty: "Frontier",
    status: "Active Bounty",
    reward: "$1,200 USDC",
    rewardValue: 1200,
    model: "GPT-4o",
    rating: 5.0,
    reviewsCount: 52,
    bookmarksCount: 412,
    author: {
      name: "CyberGuard AI",
      avatar: "https://images.unsplash.com/photo-1563089145-599997674d42?w=120&auto=format&fit=crop&q=80",
      verified: true
    },
    shortDescription: "Automated AST code scanner that identifies SQL injection, XSS, and race conditions, generating AST-based git diff patches automatically.",
    fullDescription: "Construct an enterprise static analysis workflow leveraging LLM code interpreter tools. The agent analyzes multi-file repositories, detects OWASP Top 10 vulnerabilities, and outputs clean unified git diff files complete with regression unit test suites.",
    targetModels: ["GPT-4o", "DeepSeek Coder V2", "Claude 3.5 Sonnet"],
    estimatedRuntime: "1m 15s",
    successRate: 96.8,
    tags: ["AST Parsing", "Security", "OWASP", "Git Diff", "Code Refactoring"],
    featured: true,
    inputs: [
      { name: "repoUrl", type: "string", description: "Git Repository URL to audit", default: "https://github.com/expressjs/express" },
      { name: "severityThreshold", type: "string", description: "Minimum vulnerability severity", default: "HIGH" }
    ],
    sampleCode: {
      python: `def scan_repository(repo_path, severity):
    print(f"Scanning AST tree for {repo_path}...")
    # Synthetic security benchmark runner
    return {"vulnerabilities_found": 3, "patches_generated": True}`,
      javascript: `async function scanCode(sourceCode) {
  // Static analysis logic
  return { status: "Vulnerabilities detected", diff: "--- a/src/db.js\\n+++ b/src/db.js" };
}`
    },
    comments: [
      { id: "c3", user: "MarcusTech", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80", time: "1 day ago", text: "Caught a subtle ReDoS pattern in regex validation that ESLint missed!", upvotes: 21 }
    ]
  },
  {
    id: "task-103",
    title: "Multi-Modal Legal Contract Risk Analysis & Redline Generator",
    slug: "legal-contract-risk-redline",
    category: "LLM Benchmarks",
    businessFunction: "Legal",
    difficulty: "Hard",
    status: "Verified",
    reward: "$900 USDC",
    rewardValue: 900,
    model: "Gemini 1.5 Pro",
    rating: 4.8,
    reviewsCount: 29,
    bookmarksCount: 189,
    author: {
      name: "LexAI Dynamics",
      avatar: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=120&auto=format&fit=crop&q=80",
      verified: true
    },
    shortDescription: "Upload 100+ page PDF Master Services Agreements (MSAs) to extract indemnification risks, governing law anomalies, and auto-generate track-change redlines.",
    fullDescription: "Utilizes Gemini 1.5 Pro's 2M token context window to digest entire contract archives simultaneously. Automatically highlights non-standard liability caps, IP assignment loops, and outputs standard enterprise redlines.",
    targetModels: ["Gemini 1.5 Pro", "Claude 3 Opus"],
    estimatedRuntime: "30s",
    successRate: 99.1,
    tags: ["Legal Tech", "Long Context", "PDF Analysis", "Contract Redline", "Compliance"],
    featured: true,
    inputs: [
      { name: "documentFile", type: "file", description: "PDF MSA Contract file", default: "MSA_Enterprise_2026.pdf" },
      { name: "jurisdiction", type: "string", description: "Target governing law state", default: "Delaware" }
    ],
    sampleCode: {
      python: `import google.generativeai as genai

genai.configure(api_key="YOUR_KEY")
model = genai.GenerativeModel('gemini-1.5-pro-latest')

pdf_file = genai.upload_file(path="contract.pdf")
response = model.generate_content(["Identify liability cap clauses > $1M:", pdf_file])
print(response.text)`,
      javascript: `import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
// Execute analysis payload`
    },
    comments: []
  },
  {
    id: "task-104",
    title: "AI B2B Lead Enrichment & Automated Outreach Campaign Builder",
    slug: "b2b-lead-enrichment-outreach-builder",
    category: "Data Extraction",
    businessFunction: "Sales",
    difficulty: "Beginner",
    status: "Active Bounty",
    reward: "$500 USDC",
    rewardValue: 500,
    model: "GPT-4o Mini",
    rating: 4.7,
    reviewsCount: 41,
    bookmarksCount: 310,
    author: {
      name: "OutreachScale",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
      verified: false
    },
    shortDescription: "Enrich domain lists with LinkedIn profiles, recent company news, quarterly funding rounds, and generate personalized multi-touch cold email sequences.",
    fullDescription: "Accepts CSV input of target company domains, calls Apollo/Clearbit APIs in parallel with web search tools, synthesizes key executive priorities, and drafts personalized 3-stage email cadences tailored to recent earnings calls.",
    targetModels: ["GPT-4o Mini", "Claude 3 Haiku"],
    estimatedRuntime: "20s",
    successRate: 97.5,
    tags: ["Sales Automation", "Lead Enrichment", "Cold Email", "Web Search", "CRM Integration"],
    featured: false,
    inputs: [
      { name: "domainList", type: "string", description: "Comma-separated list of target domain URLs", default: "stripe.com, databricks.com, vercel.com" }
    ],
    sampleCode: {
      python: `import requests
# Lead enrichment pipeline logic`,
      javascript: `// Node.js lead enrichment automation script`
    },
    comments: []
  },
  {
    id: "task-105",
    title: "Autonomous Financial Earnings Call Transcript Summarizer & Sentiment Radar",
    slug: "earnings-call-summarizer-sentiment-radar",
    category: "LLM Benchmarks",
    businessFunction: "Finance",
    difficulty: "Intermediate",
    status: "Verified",
    reward: "$650 USDC",
    rewardValue: 650,
    model: "Claude 3.5 Sonnet",
    rating: 4.9,
    reviewsCount: 64,
    bookmarksCount: 520,
    author: {
      name: "FinPulse Analytics",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=80",
      verified: true
    },
    shortDescription: "Parse Q3 earnings transcripts to produce executive summaries, guidance revisions, CAPEX projections, and executive Q&A tone sentiment scores.",
    fullDescription: "Processes audio recordings or text transcripts of corporate earnings calls. Categorizes executive sentiment versus analyst pushback, extracts hard guidance numbers, and builds visual comparison charts for portfolio managers.",
    targetModels: ["Claude 3.5 Sonnet", "GPT-4o"],
    estimatedRuntime: "35s",
    successRate: 98.9,
    tags: ["Finance", "Sentiment Analysis", "Earnings Call", "Financial Modeling", "WallStreet"],
    featured: true,
    inputs: [
      { name: "ticker", type: "string", description: "Stock ticker symbol", default: "NVDA" },
      { name: "quarter", type: "string", description: "Earnings quarter", default: "Q2 2026" }
    ],
    sampleCode: {
      python: `print("FinPulse Transcript Processing Initialized...")`,
      javascript: `console.log("Analyzing earnings transcript...");`
    },
    comments: []
  },
  {
    id: "task-106",
    title: "Multi-Agent Automated HR Candidate Screening & Technical Scoring",
    slug: "hr-candidate-screening-technical-scoring",
    category: "Autonomous Agents",
    businessFunction: "HR",
    difficulty: "Intermediate",
    status: "Active Bounty",
    reward: "$600 USDC",
    rewardValue: 600,
    model: "GPT-4o",
    rating: 4.6,
    reviewsCount: 22,
    bookmarksCount: 175,
    author: {
      name: "TalentGrid AI",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      verified: true
    },
    shortDescription: "Evaluates incoming engineering resumes against job descriptions, Github commit histories, and generates objective 0-100 technical fit rubrics.",
    fullDescription: "Deploy a panel of 3 specialized evaluator agents (Skill Matcher, GitHub Code Quality Auditor, Culture Fit Evaluator) that vote on candidate shortlists while maintaining strict unbiased screening criteria.",
    targetModels: ["GPT-4o", "Claude 3.5 Sonnet"],
    estimatedRuntime: "40s",
    successRate: 95.2,
    tags: ["HR Tech", "Resume Screening", "Multi-Agent", "GitHub Audit", "Recruiting"],
    featured: false,
    inputs: [
      { name: "jobDescription", type: "string", description: "Role requirements text", default: "Senior Full Stack Engineer (React/Node)" }
    ],
    sampleCode: {
      python: `# Multi-agent consensus engine`,
      javascript: `// Candidate scoring logic`
    },
    comments: []
  },
  {
    id: "task-107",
    title: "Real-Time Computer Vision Quality Control Defect Inspector",
    slug: "computer-vision-quality-control-inspector",
    category: "Computer Vision",
    businessFunction: "Operations",
    difficulty: "Frontier",
    status: "Active Bounty",
    reward: "$1,500 USDC",
    rewardValue: 1500,
    model: "YOLOv9 + GPT-4 Vision",
    rating: 4.95,
    reviewsCount: 88,
    bookmarksCount: 630,
    author: {
      name: "RoboVision Systems",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&auto=format&fit=crop&q=80",
      verified: true
    },
    shortDescription: "Detect micro-cracks and soldering anomalies in high-speed assembly line camera feeds at 60 FPS with edge model inferencing.",
    fullDescription: "High-throughput manufacturing vision pipeline. Combines low-latency edge YOLO model for initial bounding box candidate detection with VLM reasoning for zero-shot defect classification and automated assembly stop signals.",
    targetModels: ["YOLOv9", "GPT-4o Vision", "Gemini 1.5 Flash"],
    estimatedRuntime: "15ms",
    successRate: 99.6,
    tags: ["Computer Vision", "Manufacturing", "Edge AI", "YOLO", "Real-Time"],
    featured: true,
    inputs: [
      { name: "streamRTSP", type: "string", description: "RTSP camera stream URL", default: "rtsp://camera01.factory.local/live" }
    ],
    sampleCode: {
      python: `import cv2
# Industrial vision stream pipeline`,
      javascript: `// Edge node camera handler`
    },
    comments: []
  },
  {
    id: "task-108",
    title: "Fine-Tuned Llama-3 70B Specialized Medical Query Triaging Model",
    slug: "fine-tuned-llama3-medical-triaging",
    category: "Fine-Tuning",
    businessFunction: "Operations",
    difficulty: "Hard",
    status: "Verified",
    reward: "$1,100 USDC",
    rewardValue: 1100,
    model: "Llama 3.1 70B Instruct",
    rating: 4.85,
    reviewsCount: 45,
    bookmarksCount: 380,
    author: {
      name: "BioOrbit AI",
      avatar: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80",
      verified: true
    },
    shortDescription: "QLoRA fine-tuned model checkpoint trained on 50,000+ anonymized clinical triage notes for instant patient urgency stratification.",
    fullDescription: "Includes dataset preprocessing scripts, Unsloth QLoRA fine-tuning config, and vLLM inference server template for deployment on dual RTX 4090 GPUs. Achieves 94.2% agreement with board-certified triage nurses.",
    targetModels: ["Llama 3.1 70B", "Mistral Large 2"],
    estimatedRuntime: "150ms",
    successRate: 94.2,
    tags: ["Fine-Tuning", "Healthcare", "QLoRA", "vLLM", "Open Source"],
    featured: false,
    inputs: [
      { name: "patientSymptoms", type: "string", description: "Patient reported symptoms text", default: "Acute chest pain, dyspnea, radiating left arm numbness" }
    ],
    sampleCode: {
      python: `from unsloth import FastLanguageModel
# Fine-tuned model inference launcher`,
      javascript: `// vLLM REST client query`
    },
    comments: []
  }
];

export const initialBusinessTools = [
  {
    id: "biz-1",
    name: "CopyCraft AI",
    category: "Marketing",
    description: "Autonomous multi-channel marketing content generation platform for SaaS product launches and ad copy optimization.",
    pricing: "Freemium ($29/mo)",
    rating: 4.9,
    users: "120k+",
    icon: "Megaphone",
    tags: ["Copywriting", "SEO", "Social Media", "Ad Copy"],
    featured: true,
    roi: "+340% Click-through Rate"
  },
  {
    id: "biz-2",
    name: "PipelineProphet",
    category: "Sales",
    description: "Predictive revenue forecasting and automated CRM deal risk alert engine built on LLM conversation analysis.",
    pricing: "Paid ($79/user)",
    rating: 4.8,
    users: "45k+",
    icon: "TrendingUp",
    tags: ["CRM", "Revenue AI", "Deal Insights", "Salesforce"],
    featured: true,
    roi: "2.4x Deal Close Speed"
  },
  {
    id: "biz-3",
    name: "DevPulse Copilot",
    category: "Engineering",
    description: "Automated PR review, architecture diagram generator, and test coverage synthesis bot for enterprise GitHub/GitLab repositories.",
    pricing: "Free Trial ($15/dev)",
    rating: 4.95,
    users: "300k+",
    icon: "Code",
    tags: ["Code Review", "PR Bot", "Architecture", "CI/CD"],
    featured: true,
    roi: "-65% Code Review Time"
  },
  {
    id: "biz-4",
    name: "LedgerMind AI",
    category: "Finance",
    description: "Autonomous invoice reconciliation, tax anomaly detection, and real-time cash flow runway projection suite.",
    pricing: "Enterprise",
    rating: 4.7,
    users: "18k+",
    icon: "DollarSign",
    tags: ["Accounting", "Invoicing", "Tax AI", "QuickBooks"],
    featured: false,
    roi: "99.8% Reconciliation Accuracy"
  },
  {
    id: "biz-5",
    name: "TalentRadar AI",
    category: "HR",
    description: "AI video interview analyzer, technical assessment grader, and candidate engagement automation software.",
    pricing: "Paid ($49/mo)",
    rating: 4.6,
    users: "25k+",
    icon: "Users",
    tags: ["Recruiting", "Video AI", "Assessments", "Greenhouse"],
    featured: false,
    roi: "70% Faster Time-to-Hire"
  },
  {
    id: "biz-6",
    name: "ClauseGuardian",
    category: "Legal",
    description: "Real-time vendor agreement audit tool with instant risk scoring and redline suggestions based on corporate playbook rules.",
    pricing: "Enterprise",
    rating: 4.9,
    users: "10k+",
    icon: "ShieldCheck",
    tags: ["Legal", "Contract Review", "Playbook Audit"],
    featured: true,
    roi: "$1.2M Saved in Legal Fees"
  }
];

export const initialLeaderboard = [
  {
    rank: 1,
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    elo: 1342,
    mmlu: 88.7,
    humanEval: 92.0,
    mathScore: 78.3,
    visionScore: 91.4,
    latency: "320ms",
    costPerMillion: "$3.00",
    badge: "Overall Winner"
  },
  {
    rank: 2,
    name: "GPT-4o (2026 Revision)",
    provider: "OpenAI",
    elo: 1335,
    mmlu: 88.6,
    humanEval: 90.2,
    mathScore: 76.8,
    visionScore: 92.8,
    latency: "280ms",
    costPerMillion: "$2.50",
    badge: "Best Multimodal"
  },
  {
    rank: 3,
    name: "Gemini 1.5 Pro (2M)",
    provider: "Google DeepMind",
    elo: 1318,
    mmlu: 85.9,
    humanEval: 84.1,
    mathScore: 74.5,
    visionScore: 89.2,
    latency: "410ms",
    costPerMillion: "$3.50",
    badge: "Longest Context"
  },
  {
    rank: 4,
    name: "Llama 3.1 405B Instruct",
    provider: "Meta AI",
    elo: 1302,
    mmlu: 88.6,
    humanEval: 89.0,
    mathScore: 73.8,
    visionScore: 84.5,
    latency: "520ms",
    costPerMillion: "$1.80 (Self-Host)",
    badge: "Top Open Weights"
  },
  {
    rank: 5,
    name: "DeepSeek Coder V2",
    provider: "DeepSeek",
    elo: 1290,
    mmlu: 84.2,
    humanEval: 90.5,
    mathScore: 81.0,
    visionScore: 79.1,
    latency: "260ms",
    costPerMillion: "$0.80",
    badge: "Best Value Coding"
  }
];

export const initialCompanies = [
  {
    id: "comp-1",
    name: "Anthropic",
    category: "AI Research Lab",
    valuation: "$28.5B",
    location: "San Francisco, CA",
    description: "AI safety and research company building reliable, interpretable, and steerable AI systems including the Claude model family.",
    keyModels: ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 3 Haiku"],
    openRoles: 42,
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    website: "anthropic.com"
  },
  {
    id: "comp-2",
    name: "OpenAI",
    category: "AI Research Lab",
    valuation: "$157.0B",
    location: "San Francisco, CA",
    description: "Creator of ChatGPT, GPT-4o, DALL-E 3, and Sora, pioneering artificial general intelligence deployment.",
    keyModels: ["GPT-4o", "o1-preview", "DALL-E 3", "Sora"],
    openRoles: 110,
    logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=120&auto=format&fit=crop&q=80",
    website: "openai.com"
  },
  {
    id: "comp-3",
    name: "Google DeepMind",
    category: "AI Research Lab",
    valuation: "Alphabet Unit",
    location: "London & Mountain View",
    description: "Pioneering general AI research lab responsible for AlphaFold, Gemini, AlphaZero, and Veo video generation.",
    keyModels: ["Gemini 1.5 Pro", "AlphaFold 3", "Veo", "Imagen 3"],
    openRoles: 85,
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=120&auto=format&fit=crop&q=80",
    website: "deepmind.google"
  },
  {
    id: "comp-4",
    name: "Cognition AI",
    category: "Applied AI / Code",
    valuation: "$2.0B",
    location: "New York, NY",
    description: "Applied AI lab building Devin, the world's first autonomous AI software engineer.",
    keyModels: ["Devin Agent Engine"],
    openRoles: 15,
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80",
    website: "cognition-labs.com"
  }
];

export const initialRobots = [
  {
    id: "bot-1",
    name: "Figure 02",
    maker: "Figure AI",
    category: "Humanoid Physical Agent",
    height: "5 ft 6 in",
    weight: "70 kg",
    degreesOfFreedom: 44,
    payload: "20 kg",
    aiBrain: "Custom VLM + OpenAI Embodied Speech Engine",
    description: "Next-generation commercially viable humanoid robot deployed in BMW manufacturing facilities for precision automotive assembly.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80",
    status: "Commercial Deployment"
  },
  {
    id: "bot-2",
    name: "Unitree H1 / G1",
    maker: "Unitree Robotics",
    category: "Bipedal Humanoid",
    height: "180 cm",
    weight: "47 kg",
    degreesOfFreedom: 43,
    payload: "30 kg",
    aiBrain: "Reinforcement Learning Motion Controller + Edge VLM",
    description: "High-speed backflipping humanoid robot capable of running at 3.3 m/s with 360-degree LiDAR spatial awareness.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
    status: "Production Ready ($16,000)"
  },
  {
    id: "bot-3",
    name: "Optimus Gen 2",
    maker: "Tesla",
    category: "Autonomous General Humanoid",
    height: "5 ft 8 in",
    weight: "56 kg",
    degreesOfFreedom: 28,
    payload: "20 kg",
    aiBrain: "Tesla Full Self-Driving (FSD) End-to-End Neural Net",
    description: "General-purpose bipedal humanoid designed to perform unsafe, repetitive, or boring tasks in industrial and household settings.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80",
    status: "Internal Testing"
  }
];

export const initialLearn = [
  {
    id: "learn-1",
    title: "Mastering Autonomous AI Agents with LangGraph & CrewAI",
    type: "Course",
    author: "Dr. Elena Rostova",
    duration: "4.5 Hours",
    level: "Advanced",
    rating: 4.9,
    enrolled: "14.2k",
    description: "Learn how to architect multi-agent systems, handle state persistence, memory loops, human-in-the-loop approvals, and tool execution.",
    tags: ["Agents", "LangGraph", "Python", "Architecture"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "learn-2",
    title: "The Ultimate Prompt Engineering Playbook for Enterprise LLMs",
    type: "eBook / Guide",
    author: "AI Orbit Research Team",
    duration: "45 Min Read",
    level: "All Levels",
    rating: 4.95,
    enrolled: "38.5k",
    description: "Comprehensive guide covering Chain-of-Thought (CoT), Few-Shot structured output, XML tag formatting, and hallucination reduction.",
    tags: ["Prompt Engineering", "Claude 3.5", "GPT-4o", "Best Practices"],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "learn-3",
    title: "Fine-Tuning Llama 3 with Unsloth & QLoRA: Step-by-Step",
    type: "Video Tutorial",
    author: "Marcus Chen",
    duration: "1.2 Hours",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "9.8k",
    description: "Hands-on tutorial on fine-tuning 70B parameter models on a single GPU using gradient accumulation and 4-bit quantization.",
    tags: ["Fine-Tuning", "PyTorch", "QLoRA", "Open Source"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80"
  }
];

export const platformAnalytics = {
  totalTasks: 142,
  activeBounties: "$85,500 USDC",
  avgLatency: "48ms",
  successRate: "99.4%",
  totalDevelopers: "24,800+",
  modelsEvaluated: 64
};
