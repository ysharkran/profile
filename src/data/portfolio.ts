import { withBasePath } from "../lib/withBasePath";

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
  resumeUrl: withBasePath("/Yaroslav-Shapran-Resume.pdf"),
};

const githubRepoUrl = (repoPath: string) => `https://github.com/${repoPath}`;

type UpstreamProject = {
  title: string;
  repoLabel: string;
  repoUrl?: string;
  description: string;
  image: string;
  badge: string;
};

const upstreamProjects = {
  dub: {
    title: "Dub",
    repoLabel: "ysharkran/Dub",
    description:
      "Short-link management and attribution product with branded links, analytics, routing, and a polished SaaS-style dashboard that feels close to modern growth tooling.",
    image: withBasePath("/projects/dub.png"),
    badge: "SaaS",
  },
  formbricks: {
    title: "Formbricks",
    repoLabel: "ysharkran/Formbricks",
    description:
      "In-product survey and feedback platform for user research, onboarding flows, NPS, and product analytics with a real multi-tenant application surface.",
    image: withBasePath("/projects/formbricks.png"),
    badge: "Product Feedback",
  },
  chatwoot: {
    title: "Chatwoot",
    repoLabel: "ysharkran/Chatwoot",
    description:
      "Customer support and engagement suite with shared inboxes, live chat, CRM context, and operator workflows that feel like an actual company product.",
    image: withBasePath("/projects/chatwoot.png"),
    badge: "Support",
  },
  papermark: {
    title: "Papermark",
    repoLabel: "ysharkran/Papermark",
    description:
      "Document sharing and analytics product with tracked views, data-room style flows, and a strong user-facing experience around files and engagement.",
    image: withBasePath("/projects/papermark.png"),
    badge: "Docs SaaS",
  },
  calcom: {
    title: "Cal.com",
    repoLabel: "ysharkran/calcom",
    description:
      "Scheduling infrastructure and booking application with routing forms, calendar sync, teams, and a product surface that translates well to web and mobile flows.",
    image: withBasePath("/projects/calcom.png"),
    badge: "Scheduling",
  },
  twenty: {
    title: "Twenty",
    repoLabel: "ysharkran/Twenty",
    description:
      "Modern CRM-style product with accounts, contacts, pipelines, and workflow automation that looks much closer to an actual startup application than a template repo.",
    image: withBasePath("/projects/twenty.png"),
    badge: "CRM",
  },
  memos: {
    title: "Memos",
    repoLabel: "ysharkran/Memos",
    description:
      "Lightweight note-taking and knowledge product with a clean consumer-style interface, social publishing feel, and strong cross-device product direction.",
    image: withBasePath("/projects/memos.png"),
    badge: "Notes",
  },
  appflowy: {
    title: "AppFlowy",
    repoLabel: "appflowy-io/AppFlowy",
    description:
      "Cross-platform workspace product with documents, tasks, AI, and databases, giving you a project that feels closer to a real app company than a pure developer tool.",
    image: withBasePath("/projects/appflowy.png"),
    badge: "Cross-Platform",
  },
  openWebUi: {
    title: "Open WebUI",
    repoLabel: "ysharkran/Open-WebUI",
    description:
      "AI workspace product for model chat, tool use, knowledge retrieval, and operator-facing workflows with a polished interface that reads like a real company app.",
    image: withBasePath("/projects/open-webui.png"),
    badge: "AI Workspace",
  },
  lobeChat: {
    title: "Lobe Chat",
    repoLabel: "ysharkran/Lobe-Chat",
    description:
      "AI assistant application with multi-model chat, agents, plugins, and consumer-grade product polish across the kind of interface surface strong AI teams actually ship.",
    image: withBasePath("/projects/lobe-chat.webp"),
    badge: "AI Assistant",
  },
  ente: {
    title: "Ente",
    repoLabel: "ysharkran/Ente",
    description:
      "Encrypted photo and file product with strong mobile-first execution, subscription-grade UX, and real cross-platform depth instead of a developer-tool feel.",
    image: withBasePath("/projects/ente.png"),
    badge: "Mobile",
  },
  saleorStorefront: {
    title: "Saleor Storefront",
    repoLabel: "ysharkran/Saleor-Storefront",
    description:
      "Composable commerce storefront with catalog discovery, cart, checkout, and channel-aware purchase flows that feel like a serious ecommerce frontend product.",
    image: withBasePath("/projects/saleor-storefront.png"),
    badge: "Ecommerce",
  },
  mercurStorefront: {
    title: "Mercur Storefront",
    repoLabel: "ysharkran/Mercur-Storefront",
    description:
      "Multi-vendor marketplace storefront with strong shopping UX, seller-friendly structure, and a clear fit for resale or recommerce-style product experiences.",
    image: withBasePath("/projects/mercur-storefront.png"),
    badge: "Recommerce",
  },
  rotki: {
    title: "rotki",
    repoLabel: "ysharkran/rotki",
    description:
      "Privacy-first DeFi and crypto portfolio product with PnL tracking, accounting, onchain visibility, and the kind of domain-heavy data surfaces fintech teams actually ship.",
    image: withBasePath("/projects/rotki.png"),
    badge: "DeFi",
  },
  openImis: {
    title: "openIMIS",
    repoLabel: "ysharkran/openIMIS",
    description:
      "Health insurance operations product covering beneficiaries, contributions, providers, claims review, and payouts in a workflow-heavy application surface.",
    image: withBasePath("/projects/openimis-health-insurance.jpeg"),
    badge: "Health Insurance",
  },
  autorizz: {
    title: "Autorizz",
    repoLabel: "ysharkran/Autorizz",
    description:
      "Automotive retail and dealership management app with vehicle inventory, booking flows, customer records, and admin-side operations for real car sales teams.",
    image: withBasePath("/projects/autorizz.png"),
    badge: "Car Dealer",
  },
} as const satisfies Record<string, UpstreamProject>;

const buildProject = (project: UpstreamProject) => ({
  ...project,
  url: project.repoUrl ?? githubRepoUrl(project.repoLabel),
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
  buildProject(upstreamProjects.saleorStorefront),
  buildProject(upstreamProjects.openWebUi),
  buildProject(upstreamProjects.rotki),
  buildProject(upstreamProjects.autorizz),
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
  {
    title: "Industry Vertical Products",
    description:
      "Repos that map closely to the kinds of domain-heavy apps companies build for specific markets: ecommerce, recommerce, DeFi, health insurance operations, and automotive retail.",
    items: [
      buildProject(upstreamProjects.saleorStorefront),
      buildProject(upstreamProjects.mercurStorefront),
      buildProject(upstreamProjects.rotki),
      buildProject(upstreamProjects.openImis),
      buildProject(upstreamProjects.autorizz),
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
    institution: "Taras Shevchenko National University of Kyiv",
    period: "2012 to 2016",
    location: "Kyiv, Ukraine",
    notes:
      "Formal foundation in software engineering, computer science fundamentals, and analytical problem solving.",
  },
];

export const experience = [
  {
    title: "Senior Software Engineer",
    company: "Capital One",
    period: "September 2024 to February 2026",
    location: "Remote for US-based teams",
    summary:
      "Worked on regulated financial systems with a mix of backend platform delivery and AI-assisted workflow automation.",
    badges: ["Fintech", "AI Automation", "Cloud Platform"],
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
    company: "DEXTF",
    period: "June 2022 to September 2024",
    location: "Remote blockchain and Web3 startup",
    summary:
      "Built wallet-connected product experiences and backend services for Solana-oriented Web3 products with real user-facing workflows.",
    badges: ["Web3", "React + Next.js", "Solana"],
    highlights: [
      "Developed decentralized applications and backend integrations around Solana-based systems.",
      "Implemented smart contract integrations and wallet-connected experiences for Web3 products.",
      "Built React and Next.js frontends with product-oriented UX for complex on-chain workflows.",
      "Designed Node.js services and optimized performance to reduce latency across key user flows.",
    ],
  },
  {
    title: "Software Engineer",
    company: "DataArt",
    period: "July 2017 to June 2022",
    location: "Kyiv, Ukraine",
    summary:
      "Delivered full-stack product work across multiple client engagements, building the execution depth behind later platform and product roles.",
    badges: ["Consulting", "Full-Stack", "Performance"],
    highlights: [
      "Built full-stack applications with React, Node.js, MongoDB, and REST APIs across multiple client engagements.",
      "Delivered integrations and backend services while working in cross-functional Agile teams.",
      "Improved application performance by 30 percent through frontend and backend optimization work.",
    ],
  },
];

export const resumeSnapshot = [
  {
    value: "8+",
    label: "Years shipping product, platform, and API-heavy software",
  },
  {
    value: "40%",
    label: "Automation efficiency lift delivered through AI-enabled workflows",
  },
  {
    value: "3",
    label: "Primary operating domains: AI platforms, fintech systems, and Web3",
  },
  {
    value: "Remote",
    label: "Comfortable working async across time zones and distributed teams",
  },
];

export const profileQuickFacts = [
  {
    label: "Base",
    value: profile.location,
  },
  {
    label: "Focus",
    value: "AI, fintech, Web3",
  },
  {
    label: "Mode",
    value: "Remote worldwide",
  },
];

export const resumeFocusAreas = [
  {
    title: "Product Engineering With Backend Depth",
    description:
      "Strong across frontend product delivery and backend systems, from user-facing React surfaces to APIs, data models, and deployment concerns.",
    badge: "Full-Stack",
  },
  {
    title: "AI Features That Can Survive Production",
    description:
      "Most interested in AI work that is reviewable, measurable, and operationally useful rather than demo-driven or visually impressive only.",
    badge: "AI",
  },
  {
    title: "Domain-Heavy Systems and Operational Software",
    description:
      "Comfortable in products where business logic matters: payments, insurance-style workflows, blockchain systems, and tooling for real operating teams.",
    badge: "Systems",
  },
];

export const careerHighlights = [
  "Open to remote roles worldwide and comfortable working async across time zones.",
  "English proficiency: Advanced (C1).",
  "Strong focus on scalable architecture, API design, and product-minded engineering execution.",
];

export const workPrinciples = [
  "Build systems that stay understandable after handoff, not just during implementation.",
  "Treat product context and operational reality as part of engineering scope, not as external constraints.",
  "Prefer reviewable automation, measurable outcomes, and simple architecture over novelty for its own sake.",
];

export const skillGroups = [
  {
    title: "Frontend and Product Interfaces",
    items: ["React", "Next.js", "Vue", "Nuxt.js", "TypeScript", "Tailwind CSS", "Material UI"],
  },
  {
    title: "Backend and API Systems",
    items: ["Node.js", "Nest.js", "Express.js", "Python", "FastAPI", "Django", "GraphQL", "REST APIs"],
  },
  {
    title: "Data and Infrastructure",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
  {
    title: "AI and Applied ML",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenAI APIs", "System Design", "Performance Optimization"],
  },
  {
    title: "Automation & Unit Testing",
    items: ["Selenium", "Jest", "Cypress", "Playwright", "Vitest", "Testing Library", "Puppeteer"],
  },
  {
    title: "Blockchain and Web3",
    items: ["Rust", "Solana", "Web3.js"],
  },
];
