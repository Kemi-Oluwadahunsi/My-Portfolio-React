// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface WorkExperience {
  id: number
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  highlights: string[]
  tags: string[]
}

export interface CaseStudy {
  id: number
  category: 'enterprise' | 'open-source' | 'product' | 'fullstack'
  title: string
  company?: string
  period: string
  summary: string
  impact: string[]
  techStack: string[]
  links?: { label: string; url: string }[]
  featured: boolean
  badge?: string
}

export interface ExpertiseArea {
  id: number
  icon: string
  title: string
  description: string
  tags: string[]
}

export interface SkillGroup {
  category: string
  icon: string
  skills: string[]
}

export interface Writing {
  id: number
  type: 'ebook' | 'post' | 'article'
  title: string
  description: string
  url?: string
  status: 'published' | 'in-progress' | 'coming-soon'
  tags: string[]
}

export interface OpenSourceProject {
  id: number
  name: string
  description: string
  stats: { stars?: number; downloads?: string; components?: number }
  url: string
  storybook?: string
  npm?: string
  tags: string[]
  status: 'active' | 'in-progress'
}

export interface FutureProject {
  id: number
  title: string
  description: string
  stage: 'research' | 'planning' | 'building'
  tags: string[]
}

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
  company: string
  initials: string
}

export interface SocialLinks {
  linkedin: string
  github: string
  twitter: string
  whatsapp: string
  resume: string
}

export interface ContactInfo {
  email: string
  phone: string[]
  availability: string
}

// ─────────────────────────────────────────────
// Work Experience
// ─────────────────────────────────────────────

export const workExperience: WorkExperience[] = [
  {
    id: 1,
    title: 'Software Engineer / Product Owner',
    company: 'Etiqa Insurance & Takaful',
    location: 'Kuala Lumpur, Malaysia · Hybrid',
    startDate: 'Apr 2025',
    endDate: 'Present',
    current: true,
    highlights: [
      'Architected enterprise MFE authentication platform (IDP) using Webpack 5 Module Federation — now the standardized auth handler across all teams at Etiqa, consumed by every host application in the org',
      'Engineered dual-flow IAM system integrating LDAP (staff) and OIDC via PingID (agents), securing 500+ internal users on a 1M+ user insurance platform',
      'Drove API standardization across microservices using TSOA with Node.js/Express.js, reducing integration bugs by 40% and automating API documentation org-wide',
      'Built and shipped Timesheet Automation adopted by Connectiqa for all 600+ contract staff — migrated from Next.js to Webpack 5 MF, integrated into Angular + ASP.NET MVC host with MVC → Angular → React session passthrough',
      'Achieved 30% improvement in application load times through code-splitting, lazy loading, and performance profiling',
    ],
    tags: ['Webpack 5', 'Module Federation', 'React', 'TypeScript', 'LDAP', 'OIDC', 'PingID', 'Node.js', 'TSOA', 'Angular', 'ASP.NET'],
  },
  {
    id: 2,
    title: 'Frontend Software Developer (Contract)',
    company: 'FITFORBANKING · Present Value Training',
    location: 'Frankfurt, Germany · Remote',
    startDate: 'Sep 2024',
    endDate: 'May 2025',
    current: false,
    highlights: [
      'Redesigned and rebuilt 15+ interactive financial training modules, improving learner engagement by 18%',
      'Reduced module load times by 25% and average file sizes by 30% through animation and performance optimization',
      'Converted legacy Adobe Edge Animate content to modern standards for cross-device compatibility',
    ],
    tags: ['JavaScript', 'Adobe Animate', 'Responsive Design', 'Performance'],
  },
  {
    id: 3,
    title: 'Frontend Software Developer',
    company: 'Gelks Group Inc. · Richforth Technologies Ltd',
    location: 'Owerri, Nigeria · Remote',
    startDate: 'May 2024',
    endDate: 'Sep 2024',
    current: false,
    highlights: [
      'Built high-converting IP address marketplace processing 500+ daily transactions with Redux Toolkit',
      'Reduced unauthorized access attempts by 85% through CAPTCHA, login persistence, and protected route architecture',
      'Developed real-time support ticket system cutting response times by 35%',
    ],
    tags: ['React', 'Redux Toolkit', 'Node.js', 'REST APIs', 'Socket.io'],
  },
  {
    id: 4,
    title: 'Freelance Software Developer',
    company: 'KodeMaven',
    location: 'Kuala Lumpur, Malaysia',
    startDate: 'Jan 2022',
    endDate: 'Present',
    current: true,
    highlights: [
      'Delivered 20+ production-grade web applications across fintech, e-commerce, SME, and education sectors',
      '95% client satisfaction rate, 100% on-time delivery, 60% client return rate',
      'All deliverables average <2s load time and 90%+ Lighthouse scores',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Full-stack'],
  },
]

// ─────────────────────────────────────────────
// Case Studies
// ─────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    category: 'enterprise',
    title: 'Enterprise IDP — Org-Wide MFE Auth Platform',
    company: 'Etiqa Insurance & Takaful',
    period: 'Apr 2025 – Present',
    badge: 'Flagship Project',
    summary:
      'Designed and shipped the Identity Provider application that became the standardized authentication handler for all engineering teams at Etiqa, serving a 1M+ user insurance platform.',
    impact: [
      'Adopted as the org-wide auth standard — every host app at Etiqa now consumes this IDP',
      'Handles two distinct auth flows: LDAP for staff, OIDC via PingID for agents',
      'Reduced deployment dependencies by 30% across all participating teams',
      'Secured 500+ internal users. All API calls managed via a shared API Manager package — zero direct API calls in the IDP itself',
    ],
    techStack: ['React', 'TypeScript', 'Webpack 5', 'Module Federation', 'LDAP', 'OIDC', 'PingID', 'Node.js', 'TSOA'],
    featured: true,
  },
  {
    id: 2,
    category: 'enterprise',
    title: 'Timesheet Automation — Cross-Framework MFE',
    company: 'Etiqa Insurance & Takaful',
    period: '2025',
    badge: 'Cross-Stack Architecture',
    summary:
      'Timesheet automation app now adopted into Connectiqa for all 600+ Etiqa contract staff — built as an MFE integrated into an Angular + ASP.NET MVC host with full MVC → Angular → React session propagation.',
    impact: [
      'Live for all 600+ Etiqa contract staff via Connectiqa',
      'Auto-prefilled form fields through MVC → Angular → React session passthrough',
      'First React-in-Angular MFE pattern established in the Etiqa ecosystem',
      'MVP2 in progress: direct email submission to agencies and line managers per staff',
    ],
    techStack: ['React', 'TypeScript', 'Webpack 5', 'Module Federation', 'Angular', 'ASP.NET MVC', 'C#', 'Razor Views'],
    featured: true,
  },
  {
    id: 3,
    category: 'open-source',
    title: 'readyui-react — Published npm Component Library',
    period: 'Active',
    badge: 'Open Source · npm',
    summary:
      '50+ production-ready React components published to npm with full TypeScript support, interactive Storybook docs, and a roadmap toward open-source community contributions.',
    impact: [
      'Published and maintained on npm with 50+ components',
      'Full TypeScript APIs and interactive Storybook documentation',
      'Zero-config integration into any React project',
      'Open-source contribution model in roadmap',
    ],
    techStack: ['React', 'TypeScript', 'Storybook', 'Rollup', 'npm'],
    links: [
      { label: 'Storybook', url: 'https://kemi-oluwadahunsi.github.io/ReadyToUse-React-Components/' },
      { label: 'GitHub', url: 'https://github.com/Kemi-Oluwadahunsi' },
    ],
    featured: true,
  },
  {
    id: 4,
    category: 'product',
    title: 'Herbiskea — Botanical Skincare & Haircare Platform',
    period: '2025 · 80% complete',
    badge: 'In Progress',
    summary:
      'Full-stack platform combining e-commerce and deep educational content on skin barrier science, hair porosity, and botanical formulation. Next.js App Router, TypeScript, MongoDB.',
    impact: [
      '80% complete — core commerce and blog engine shipped',
      '40+ in-depth educational articles on skin and hair science',
      'Full SEO architecture with structured data and dynamic sitemaps',
      'Targeting 95+ Lighthouse scores across all pages',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Framer Motion'],
    links: [
      { label: 'Live Site', url: 'https://herbiskea.com' },
    ],
    featured: false,
  },
]

// ─────────────────────────────────────────────
// Expertise Areas
// ─────────────────────────────────────────────

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: 1,
    icon: '⬡',
    title: 'Micro Frontend Architecture',
    description: 'Design and implement production MFE systems using Webpack 5 Module Federation across multiple teams and deployment boundaries. Shell app design, shared dependency strategy, and runtime federation.',
    tags: ['Webpack 5', 'Module Federation', 'Shell Apps', 'Runtime Federation'],
  },
  {
    id: 2,
    icon: '◈',
    title: 'Enterprise Frontend Engineering',
    description: 'Production React + TypeScript systems built for scale, maintainability, and team ownership. API standardization with TSOA, performance-first delivery, and code-splitting strategies.',
    tags: ['React', 'TypeScript', 'Next.js', 'Performance'],
  },
  {
    id: 3,
    icon: '⬢',
    title: 'Full-Stack Development',
    description: 'End-to-end capability with Node.js, Express.js, TSOA API frameworks, and database integration across MongoDB, PostgreSQL, Redis, and Firebase.',
    tags: ['Node.js', 'Express.js', 'TSOA', 'REST APIs'],
  },
  {
    id: 4,
    icon: '◉',
    title: 'Security & IAM Engineering',
    description: 'Enterprise identity and access management: LDAP directory integration, OIDC protocol via PingID, dual-flow authentication, JWT, and protected route architecture at scale.',
    tags: ['LDAP', 'OIDC', 'PingID', 'JWT', 'IAM'],
  },
  {
    id: 5,
    icon: '◎',
    title: 'Technical Writing & Education',
    description: 'Deep-dive content for engineering audiences. Authoring a two-book series on Micro Frontends with Webpack 5. LinkedIn and X content creator with a focus on making hard concepts simple.',
    tags: ['Ebook Authoring', 'Technical Writing', 'LinkedIn', 'Developer Education'],
  },
  {
    id: 6,
    icon: '⬟',
    title: 'AI & Automation Integration',
    description: 'Workflow automation and AI tooling integration within enterprise engineering pipelines. Multi-agent system architecture with Claude API, MCP routing, and semantic search.',
    tags: ['Claude API', 'MCP', 'Automation', 'RAG'],
  },
]

// ─────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend Core',
    icon: '◈',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES2020+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS', 'Redux Toolkit', 'Zustand', 'Framer Motion'],
  },
  {
    category: 'Architecture & Tooling',
    icon: '⬡',
    skills: ['Webpack 5', 'Module Federation', 'Micro Frontend Architecture', 'Vite', 'TSOA', 'Rollup', 'Storybook', 'CI/CD', 'Git'],
  },
  {
    category: 'Backend & Databases',
    icon: '⬢',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Redis', 'pgvector', 'Firebase', 'JWT', 'Prisma'],
  },
  {
    category: 'Security & Auth',
    icon: '◉',
    skills: ['LDAP', 'OIDC', 'OAuth 2.0', 'PingID', 'IAM', 'Session Management', 'Protected Routes'],
  },
  {
    category: 'Testing & Quality',
    icon: '◎',
    skills: ['Jest', 'Cypress', 'Supertest', 'React Testing Library', 'ESLint', 'Husky'],
  },
  {
    category: 'Currently Exploring',
    icon: '→',
    skills: ['Angular', 'ASP.NET MVC', 'C#', 'Chrome Extension APIs', 'VSCode Extension API', 'Python'],
  },
]

// ─────────────────────────────────────────────
// Writing & Education
// ─────────────────────────────────────────────

export const writingContent: Writing[] = [
  {
    id: 1,
    type: 'ebook',
    title: 'Micro Frontends with Webpack 5 Module Federation — Book 1',
    description: "From Zero to Your First Production MFE. Covers Module Federation fundamentals, shell architecture, shared dependency strategy, and production deployment — from real enterprise implementation at scale.",
    status: 'in-progress',
    tags: ['MFE', 'Webpack 5', 'Module Federation', 'React', 'Enterprise'],
  },
  {
    id: 2,
    type: 'ebook',
    title: 'Micro Frontends with Webpack 5 Module Federation — Book 2',
    description: 'Advanced patterns: dynamic remotes, cross-framework federation (React + Angular), auth propagation across MFE boundaries, and scaling to 10+ remotes.',
    status: 'coming-soon',
    tags: ['MFE', 'Advanced', 'Cross-Framework', 'Performance'],
  },
  {
    id: 3,
    type: 'post',
    title: 'LinkedIn Engineering Content',
    description: 'Regular deep-dive content on MFE architecture, TypeScript patterns, Next.js, Node.js, and engineering career. Built for engineers who want real signal, not fluff.',
    url: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/',
    status: 'published',
    tags: ['MFE', 'TypeScript', 'Next.js', 'Engineering Career'],
  },
]

// ─────────────────────────────────────────────
// Open Source
// ─────────────────────────────────────────────

export const openSourceProjects: OpenSourceProject[] = [
  {
    id: 1,
    name: 'readyui-react',
    description: '50+ production-ready React components with full TypeScript support. Drop into any React project with zero config. Interactive Storybook docs. Community contributions welcome.',
    stats: { components: 50 },
    url: 'https://github.com/Kemi-Oluwadahunsi/ReadyToUse-React-Components',
    storybook: 'https://kemi-oluwadahunsi.github.io/ReadyToUse-React-Components/',
    npm: 'https://www.npmjs.com/package/readyui-react',
    tags: ['React', 'TypeScript', 'Component Library', 'Storybook', 'npm'],
    status: 'active',
  },
]

// ─────────────────────────────────────────────
// Future Projects
// ─────────────────────────────────────────────

export const futureProjects: FutureProject[] = [
  {
    id: 1,
    title: 'API Response Formatter — Chrome Extension',
    description: 'A dev-focused Chrome extension that formats, colorizes, and adds tree navigation to raw API responses directly in the browser.',
    stage: 'research',
    tags: ['Chrome Extension', 'Developer Tools', 'APIs'],
  },
  {
    id: 2,
    title: '"Is this library safe?" — VSCode + Chrome Extension',
    description: 'Checks npm package health, CVEs, maintenance status, and license compatibility — surfaced directly inside your editor and browser.',
    stage: 'planning',
    tags: ['VSCode Extension', 'Chrome Extension', 'npm Security'],
  },
]

// ─────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Kemi's ability to architect complex micro-frontend systems while keeping the team unblocked is exceptional. The IDP platform she built became our org-wide auth standard — that says everything.",
    name: 'Khan Mohammed Aslam',
    role: 'Group Head of Engineering',
    company: 'Etiqa Insurance Singapore',
    initials: 'KA',
  },
  {
    id: 2,
    quote: "What stands out about Kemi is her systems thinking. She doesn't just ship features — she asks how this fits the larger architecture. The Timesheet integration across Angular and .NET was seamless.",
    name: 'Kesihain Selvarajoo',
    role: 'Engineering Team Lead',
    company: 'Etiqa Insurance Malaysia',
    initials: 'KS',
  },
]

// ─────────────────────────────────────────────
// Social & Contact
// ─────────────────────────────────────────────

export const socialLinks: SocialLinks = {
  linkedin: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/',
  github: 'https://github.com/Kemi-Oluwadahunsi/',
  twitter: 'https://twitter.com/km_oluwadahunsi',
  whatsapp: 'https://wa.me/+601113219046',
  resume: 'https://drive.google.com/file/d/1tJgWBOmxZ1hlfbFtRdryVnHNSfKuqahr/view?usp=sharing',
}

export const contactInfo: ContactInfo = {
  email: 'oluwakemioluwadahunsi@gmail.com',
  phone: ['+601113219046'],
  availability: 'Open to senior engineering roles, MFE architecture consulting, and technical writing collaborations.',
}
