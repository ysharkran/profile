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

type UpstreamProject = {
  title: string;
  repoLabel: string;
  description: string;
  image: string;
  badge: string;
};

const upstreamProjects = {
  dify: {
    title: "Dify",
    repoLabel: "langgenius/dify",
    description:
      "Production-ready platform for building AI agents, multi-step workflows, knowledge apps, and model-powered internal products through a polished visual interface.",
    image: "/projects/dify.png",
    badge: "AI",
  },
  ragflow: {
    title: "RAGFlow",
    repoLabel: "infiniflow/ragflow",
    description:
      "Open-source RAG engine and agent workspace focused on retrieval quality, document pipelines, citations, and configurable knowledge workflows for LLM systems.",
    image: "/projects/ragflow.png",
    badge: "RAG",
  },
  n8n: {
    title: "n8n",
    repoLabel: "n8n-io/n8n",
    description:
      "Visual workflow automation platform with 400+ integrations, AI nodes, code steps, and strong self-hosting support for serious operations teams.",
    image: "/projects/n8n.png",
    badge: "Automation",
  },
  appsmith: {
    title: "Appsmith",
    repoLabel: "appsmithorg/appsmith",
    description:
      "Open-source low-code platform for building internal tools, dashboards, CRUD apps, and operator workflows on top of APIs, databases, and custom logic.",
    image: "/projects/appsmith.webp",
    badge: "Internal Tools",
  },
  tooljet: {
    title: "ToolJet",
    repoLabel: "ToolJet/ToolJet",
    description:
      "Open-source app builder for dashboards, admin panels, workflow tools, and AI-assisted internal applications with a strong product-grade interface.",
    image: "/projects/tooljet.png",
    badge: "Low-Code",
  },
  flagsmith: {
    title: "Flagsmith",
    repoLabel: "Flagsmith/flagsmith",
    description:
      "Feature flagging and remote config platform for controlled rollouts, segmentation, kill switches, experimentation, and multi-environment product delivery.",
    image: "/projects/flagsmith.png",
    badge: "Release Safety",
  },
  plane: {
    title: "Plane",
    repoLabel: "makeplane/plane",
    description:
      "Modern open-source project management platform with issues, cycles, docs, triage, and analytics that feels much closer to a shipped SaaS product than a demo repo.",
    image: "/projects/plane.webp",
    badge: "Product Ops",
  },
  oneuptime: {
    title: "OneUptime",
    repoLabel: "OneUptime/oneuptime",
    description:
      "Open-source monitoring and observability platform covering uptime checks, incidents, on-call, logs, workflows, and status pages in one system.",
    image: "/projects/oneuptime.png",
    badge: "Observability",
  },
  metabase: {
    title: "Metabase",
    repoLabel: "metabase/metabase",
    description:
      "Open-source BI and analytics application for dashboards, SQL exploration, self-serve reporting, embedded charts, and decision-oriented data workflows.",
    image: "/projects/metabase.png",
    badge: "Analytics",
  },
  calcom: {
    title: "Cal.com",
    repoLabel: "calcom/cal.com",
    description:
      "Scheduling infrastructure platform with booking flows, routing forms, calendars, team availability, and APIs for productized time coordination.",
    image: "/projects/calcom.png",
    badge: "Scheduling",
  },
  squads: {
    title: "Squads Protocol v4",
    repoLabel: "Squads-Protocol/v4",
    description:
      "Solana-native multisig and treasury coordination stack used for secure wallet operations, approvals, and transaction execution across Web3 teams.",
    image: "/projects/squads-v4.png",
    badge: "Web3",
  },
} as const satisfies Record<string, UpstreamProject>;

const buildProject = (project: UpstreamProject) => ({
  ...project,
  url: githubRepoUrl(project.repoLabel),
});

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
  buildProject(upstreamProjects.dify),
  buildProject(upstreamProjects.appsmith),
  buildProject(upstreamProjects.plane),
  buildProject(upstreamProjects.oneuptime),
];

export const projectSections = [
  {
    title: "AI and Automation Platforms",
    description:
      "Real open-source AI and workflow products with strong interfaces, active communities, and repo structures worth studying before you fork and adapt one into your own direction.",
    items: [
      buildProject(upstreamProjects.dify),
      buildProject(upstreamProjects.ragflow),
      buildProject(upstreamProjects.n8n),
    ],
  },
  {
    title: "Internal Tools and Product Platforms",
    description:
      "These are polished application repos with real operator-facing UI. They are strong upstream candidates if you want to fork, restyle, and then gradually replace the product logic with your own work.",
    items: [
      buildProject(upstreamProjects.appsmith),
      buildProject(upstreamProjects.tooljet),
      buildProject(upstreamProjects.flagsmith),
      buildProject(upstreamProjects.plane),
    ],
  },
  {
    title: "Ops, Analytics, and Product Infrastructure",
    description:
      "Applications with clear business value, strong dashboards, and real deployment surface area. These are useful if you want the Projects tab to feel more like a serious product engineer's watchlist than a template gallery.",
    items: [
      buildProject(upstreamProjects.oneuptime),
      buildProject(upstreamProjects.metabase),
      buildProject(upstreamProjects.calcom),
      buildProject(upstreamProjects.squads),
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
