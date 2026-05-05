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
  dub: {
    title: "Dub",
    repoLabel: "dubinc/dub",
    description:
      "Short-link management and attribution product with branded links, analytics, routing, and a polished SaaS-style dashboard that feels close to modern growth tooling.",
    image: "/projects/dub.png",
    badge: "SaaS",
  },
  formbricks: {
    title: "Formbricks",
    repoLabel: "formbricks/formbricks",
    description:
      "In-product survey and feedback platform for user research, onboarding flows, NPS, and product analytics with a real multi-tenant application surface.",
    image: "/projects/formbricks.png",
    badge: "Product Feedback",
  },
  chatwoot: {
    title: "Chatwoot",
    repoLabel: "chatwoot/chatwoot",
    description:
      "Customer support and engagement suite with shared inboxes, live chat, CRM context, and operator workflows that feel like an actual company product.",
    image: "/projects/chatwoot.png",
    badge: "Support",
  },
  papermark: {
    title: "Papermark",
    repoLabel: "mfts/papermark",
    description:
      "Document sharing and analytics product with tracked views, data-room style flows, and a strong user-facing experience around files and engagement.",
    image: "/projects/papermark.png",
    badge: "Docs SaaS",
  },
  calcom: {
    title: "Cal.com",
    repoLabel: "calcom/cal.com",
    description:
      "Scheduling infrastructure and booking application with routing forms, calendar sync, teams, and a product surface that translates well to web and mobile flows.",
    image: "/projects/calcom.png",
    badge: "Scheduling",
  },
  twenty: {
    title: "Twenty",
    repoLabel: "twentyhq/twenty",
    description:
      "Modern CRM-style product with accounts, contacts, pipelines, and workflow automation that looks much closer to an actual startup application than a template repo.",
    image: "/projects/twenty.png",
    badge: "CRM",
  },
  memos: {
    title: "Memos",
    repoLabel: "usememos/memos",
    description:
      "Lightweight note-taking and knowledge product with a clean consumer-style interface, social publishing feel, and strong cross-device product direction.",
    image: "/projects/memos.png",
    badge: "Notes",
  },
  appflowy: {
    title: "AppFlowy",
    repoLabel: "appflowy-io/AppFlowy",
    description:
      "Cross-platform workspace product with documents, tasks, AI, and databases, giving you a project that feels closer to a real app company than a pure developer tool.",
    image: "/projects/appflowy.png",
    badge: "Cross-Platform",
  },
  openWebUi: {
    title: "Open WebUI",
    repoLabel: "open-webui/open-webui",
    description:
      "AI workspace product for model chat, tool use, knowledge retrieval, and operator-facing workflows with a polished interface that reads like a real company app.",
    image: "/projects/open-webui.png",
    badge: "AI Workspace",
  },
  lobeChat: {
    title: "Lobe Chat",
    repoLabel: "lobehub/lobe-chat",
    description:
      "AI assistant application with multi-model chat, agents, plugins, and consumer-grade product polish across the kind of interface surface strong AI teams actually ship.",
    image: "/projects/lobe-chat.webp",
    badge: "AI Assistant",
  },
  ente: {
    title: "Ente",
    repoLabel: "ente-io/ente",
    description:
      "Encrypted photo and file product with strong mobile-first execution, subscription-grade UX, and real cross-platform depth instead of a developer-tool feel.",
    image: "/projects/ente.png",
    badge: "Mobile",
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
  buildProject(upstreamProjects.openWebUi),
  buildProject(upstreamProjects.dub),
  buildProject(upstreamProjects.chatwoot),
  buildProject(upstreamProjects.ente),
];

export const projectSections = [
  {
    title: "Product Web Apps",
    description:
      "Public repos that feel much closer to the kind of multi-user SaaS applications teams build at companies: customer-facing dashboards, product workflows, analytics, and real business flows.",
    items: [
      buildProject(upstreamProjects.dub),
      buildProject(upstreamProjects.formbricks),
      buildProject(upstreamProjects.papermark),
      buildProject(upstreamProjects.calcom),
    ],
  },
  {
    title: "Team and Collaboration Products",
    description:
      "Repos with stronger application feel than infrastructure feel: support tools, CRM-like products, knowledge apps, and cross-platform experiences that resemble company-built product teams.",
    items: [
      buildProject(upstreamProjects.chatwoot),
      buildProject(upstreamProjects.twenty),
      buildProject(upstreamProjects.memos),
    ],
  },
  {
    title: "AI and Mobile Products",
    description:
      "Real product repos that lean into applied AI and cross-device execution: assistant experiences, AI workspaces, mobile-first consumer apps, and cross-platform products with clear company-grade UX.",
    items: [
      buildProject(upstreamProjects.openWebUi),
      buildProject(upstreamProjects.lobeChat),
      buildProject(upstreamProjects.ente),
      buildProject(upstreamProjects.appflowy),
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
