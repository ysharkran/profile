export const profile = {
  name: "Yaroslav Shapran",
  firstName: "Yaroslav",
  role: "Senior Software Engineer / Product Engineer / AI-ML",
  headline: "I build AI-native products, high-throughput APIs, and web platforms that can survive real production traffic.",
  summary:
    "Senior software engineer with 8+ years of experience shipping full-stack products, backend systems, AI workflows, and blockchain applications. Strong across React and Next.js on the frontend, Node.js and Python on the backend, and Rust for Solana-based systems.",
  location: "Kyiv, Ukraine",
  availability: "Open to remote collaboration worldwide and comfortable working across time zones.",
  email: "asapran417@gmail.com",
  phone: "+380-67-735-2481",
  linkedinUrl: "https://linkedin.com/in/yaroslav-shapran",
  githubUrl: "https://github.com/your-github-handle",
  resumeUrl: "/Yaroslav-Shapran-Resume.pdf",
};

const githubRepoUrl = (repoPath: string) => `https://github.com/${repoPath}`;

const referenceRepos = {
  aiOps: "langgenius/dify",
  paymentReconciliation: "The-Commit-Company/mint",
  defiPortfolio: "rotki/rotki",
  solanaTreasury: "Squads-Protocol/v4",
  cloudMigration: "openchoreo/openchoreo",
  ragKnowledge: "infiniflow/ragflow",
  promptEvaluation: "promptfoo/promptfoo",
  documentIntake: "docling-project/docling",
  apiContracts: "graphql-hive/graphql-inspector",
  featureFlags: "Flagsmith/flagsmith",
  incidentTimeline: "OneUptime/oneuptime",
} as const;

const referenceRepoImages = {
  aiOps: "/projects/ref-ai-ops-dify.png",
  paymentReconciliation: "/projects/ref-payment-mint.png",
  defiPortfolio: "/projects/ref-defi-rotki.png",
  solanaTreasury: "/projects/ref-solana-squads-v4.png",
  cloudMigration: "/projects/ref-cloud-openchoreo.png",
  ragKnowledge: "/projects/ref-rag-ragflow.png",
  promptEvaluation: "/projects/ref-prompt-promptfoo.png",
  documentIntake: "/projects/ref-docling.png",
  apiContracts: "/projects/ref-api-graphql-inspector.png",
  featureFlags: "/projects/ref-flagsmith.png",
  incidentTimeline: "/projects/ref-incident-oneuptime.png",
} as const;

export const homeHighlights = [
  "8+ years building product and platform software",
  "Production experience across AI, fintech, and Web3",
  "Strong in React, Next.js, Node.js, Python, Rust, and AWS",
];

export const heroStats = [
  {
    value: "8+",
    label: "Years building products, systems, and delivery infrastructure",
  },
  {
    value: "40%",
    label: "Automation efficiency lift delivered through AI-assisted workflows",
  },
  {
    value: "3",
    label: "Primary operating domains: AI platforms, fintech systems, and Web3",
  },
];

export const focusAreas = [
  "AI product systems with reviewable automation",
  "Cloud-native backend platforms and operational tooling",
  "Web3 and Solana workflows with product-quality interfaces",
];

export const featuredProjects = [
  {
    title: "AI Operations Intelligence Platform",
    description:
      "Production-style case study for an internal analytics and automation platform using Python, FastAPI, React, PyTorch, and OpenAI APIs. Focused on document understanding, workflow automation, and measurable ops efficiency gains.",
    image: referenceRepoImages.aiOps,
    url: githubRepoUrl(referenceRepos.aiOps),
    badge: "Case Study",
  },
  {
    title: "DeFi Portfolio Tracker",
    description:
      "Multi-wallet dashboard built with Next.js, Node.js, PostgreSQL, and Web3.js to aggregate positions, PnL, token exposure, and transaction history across DeFi protocols.",
    image: referenceRepoImages.defiPortfolio,
    url: githubRepoUrl(referenceRepos.defiPortfolio),
    badge: "Web3",
  },
  {
    title: "Solana Treasury Console",
    description:
      "Rust and Solana-focused operator console for monitoring treasury movements, contract interactions, and settlement workflows with a clean React interface for non-technical teams.",
    image: referenceRepoImages.solanaTreasury,
    url: githubRepoUrl(referenceRepos.solanaTreasury),
    badge: "Rust",
  },
  {
    title: "RAG Knowledge Console",
    description:
      "Knowledge retrieval workspace concept mapped to a strong public RAG reference repo with document pipelines, citations, and agent-ready context handling.",
    image: referenceRepoImages.ragKnowledge,
    url: githubRepoUrl(referenceRepos.ragKnowledge),
    badge: "RAG",
  },
];

export const projectSections = [
  {
    title: "Experience-Backed Case Studies",
    description:
      "These project concepts are aligned with your resume and paired with the closest public reference repositories I found. They are the strongest candidates to turn into your own public repositories first.",
    items: [
      {
        title: "AI Operations Intelligence Platform",
        description:
          "Python, FastAPI, React, and OpenAI-based platform for automating high-volume operations workflows with NLP pipelines, review queues, and analytics dashboards.",
        image: referenceRepoImages.aiOps,
        url: githubRepoUrl(referenceRepos.aiOps),
        badge: "AI",
      },
      {
        title: "Payment Reconciliation Copilot",
        description:
          "A secure workflow assistant for finance teams that ingests transaction feeds, highlights mismatches, proposes resolutions, and keeps a full audit trail across third-party systems.",
        image: referenceRepoImages.paymentReconciliation,
        url: githubRepoUrl(referenceRepos.paymentReconciliation),
        badge: "Fintech",
      },
      {
        title: "DeFi Portfolio Tracker",
        description:
          "Next.js and Node.js dashboard for tracking token balances, protocol positions, wallet activity, and exposure trends with alerting for significant market changes.",
        image: referenceRepoImages.defiPortfolio,
        url: githubRepoUrl(referenceRepos.defiPortfolio),
        badge: "Web3",
      },
      {
        title: "Solana Treasury Console",
        description:
          "Operational interface for Solana-based treasury monitoring, transaction inspection, and contract-driven settlement workflows powered by Rust services and a React frontend.",
        image: referenceRepoImages.solanaTreasury,
        url: githubRepoUrl(referenceRepos.solanaTreasury),
        badge: "Rust",
      },
      {
        title: "Cloud Migration Control Center",
        description:
          "AWS, Docker, Kubernetes, and Terraform project focused on service migration readiness, release safety checks, environment drift visibility, and delivery metrics for cloud-native teams.",
        image: referenceRepoImages.cloudMigration,
        url: githubRepoUrl(referenceRepos.cloudMigration),
        badge: "Platform",
      },
    ],
  },
  {
    title: "Open-Source Repositories To Publish",
    description:
      "These are polished repo directions that fit your stack and make the portfolio feel deeper. For now, each card points to a best-match public repo you can study and later replace with your own implementation.",
    items: [
      {
        title: "RAG Knowledge Console",
        description:
          "Document ingestion and retrieval workspace with chunking, citations, semantic search, prompt traces, and evaluation views for internal knowledge assistants.",
        image: referenceRepoImages.ragKnowledge,
        url: githubRepoUrl(referenceRepos.ragKnowledge),
        badge: "LLM",
      },
      {
        title: "Prompt Evaluation Lab",
        description:
          "A regression-testing toolkit for prompts and model outputs with scenario packs, rubric scoring, side-by-side comparisons, and release gating for AI teams.",
        image: referenceRepoImages.promptEvaluation,
        url: githubRepoUrl(referenceRepos.promptEvaluation),
        badge: "AI",
      },
      {
        title: "Document Intake AI Pipeline",
        description:
          "End-to-end system for parsing PDFs and forms into structured records with human review, confidence scoring, and export-ready APIs for downstream tools.",
        image: referenceRepoImages.documentIntake,
        url: githubRepoUrl(referenceRepos.documentIntake),
        badge: "Automation",
      },
      {
        title: "API Contract Observatory",
        description:
          "Developer tooling that watches OpenAPI and GraphQL schemas, surfaces breaking changes, and generates change reports before they hit production consumers.",
        image: referenceRepoImages.apiContracts,
        url: githubRepoUrl(referenceRepos.apiContracts),
        badge: "DX",
      },
      {
        title: "Feature Flags Control Plane",
        description:
          "Multi-tenant rollout platform with environment targeting, kill switches, experiment tracking, and a lightweight SDK for frontend and backend services.",
        image: referenceRepoImages.featureFlags,
        url: githubRepoUrl(referenceRepos.featureFlags),
        badge: "SaaS",
      },
      {
        title: "Realtime Incident Timeline",
        description:
          "Operational dashboard that combines logs, deploys, alerts, and manual annotations into a single incident timeline for faster debugging and postmortems.",
        image: referenceRepoImages.incidentTimeline,
        url: githubRepoUrl(referenceRepos.incidentTimeline),
        badge: "Ops",
      },
    ],
  },
];

export const expertise = [
  {
    title: "AI Product Engineering",
    description:
      "LLM-enabled workflows, NLP pipelines, retrieval systems, model integrations, prompt evaluation, and product-focused AI features built for real users.",
    url: "/projects",
    target: "_self",
    badge: "AI",
  },
  {
    title: "Full-Stack Product Delivery",
    description:
      "From interface design and frontend architecture to backend APIs, data models, observability, and deployment strategy across modern JavaScript stacks.",
    url: "/cv",
    target: "_self",
    badge: "Product",
  },
  {
    title: "Cloud-Native Platform Work",
    description:
      "Microservices, AWS, Docker, Kubernetes, CI/CD, infrastructure changes, performance tuning, and operational guardrails for teams scaling fast.",
    url: "/cv",
    target: "_self",
    badge: "Cloud",
  },
  {
    title: "Blockchain and Web3 Systems",
    description:
      "Rust for Solana, smart contract integrations, wallet-connected product interfaces, and backend services for DeFi-oriented products and internal tooling.",
    url: "/projects",
    target: "_self",
    badge: "Web3",
  },
];

export const education = [
  {
    title: "Bachelor's Degree in Computer Science",
    subtitle: "2012 to 2016 at Taras Shevchenko National University of Kyiv, Kyiv, Ukraine",
  },
];

export const experience = [
  {
    title: "Senior Software Engineer",
    subtitle: "September 2024 to February 2026 at Capital One, Remote for US-based teams",
    highlights: [
      "Designed and implemented scalable microservices using Node.js, Python, and PostgreSQL.",
      "Built AI-powered data processing pipelines with PyTorch and OpenAI APIs, improving automation efficiency by 40 percent.",
      "Integrated secure APIs with financial systems and payment providers in a regulated environment.",
      "Supported migration toward cloud-native architecture with AWS, Docker, and Kubernetes.",
      "Worked closely with product and design and mentored junior engineers through reviews and pairing.",
    ],
  },
  {
    title: "Full-Stack Software Engineer",
    subtitle: "June 2022 to September 2024 at DEXTF, Remote blockchain and Web3 startup",
    highlights: [
      "Developed decentralized applications and backend integrations around Solana-based systems.",
      "Implemented smart contract integrations and wallet-connected experiences for Web3 products.",
      "Built React and Next.js frontends with product-oriented UX for complex on-chain workflows.",
      "Designed Node.js services and optimized performance to reduce latency across key user flows.",
    ],
  },
  {
    title: "Software Engineer",
    subtitle: "July 2017 to June 2022 at DataArt, Kyiv, Ukraine",
    highlights: [
      "Built full-stack applications with React, Node.js, MongoDB, and REST APIs across multiple client engagements.",
      "Delivered integrations and backend services while working in cross-functional Agile teams.",
      "Improved application performance by 30 percent through frontend and backend optimization work.",
    ],
  },
];

export const skills = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Rust",
  "React",
  "Next.js",
  "Vue",
  "Nuxt.js",
  "Node.js",
  "Nest.js",
  "Express.js",
  "FastAPI",
  "Django",
  "GraphQL",
  "REST APIs",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "MySQL",
  "PyTorch",
  "TensorFlow",
  "Scikit-learn",
  "OpenAI APIs",
  "Tailwind CSS",
  "Material UI",
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "CI/CD",
  "Solana",
  "Web3.js",
  "System Design",
  "Performance Optimization",
];

export const highlights = [
  "Open to remote roles worldwide and comfortable working async across time zones.",
  "English proficiency: Advanced (C1).",
  "Strong focus on scalable architecture, API design, and product-minded engineering execution.",
];
