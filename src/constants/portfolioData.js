export const portfolioItems = [
  {
    id: 11,
    title: '00tracker Proxy Platform',
    img: '/images/00tracker.webp',
    description:
      'High-converting proxy platform with Redux Toolkit state management, secure auth, CAPTCHA, login persistence, and protected routes.',
    stacks: ['React', 'Tailwind CSS', 'Redux Toolkit', 'Node.js', 'Express.js', 'Socket.io', 'Bcrypt.js'],
    live: 'https://00tracker.com',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi',
    category: 'full-stack',
    hasCaseStudy: false,
  },
  {
    id: 12,
    title: 'Roots to Bloom Beauty',
    img: '/images/RtB.webp',
    description:
      'E-commerce skincare platform with product catalog, comparison feature, and admin panel. Custom color scheme reflecting the organic brand ethos.',
    stacks: ['React', 'Tailwind CSS', 'Firebase', 'Framer Motion', 'EmailJS'],
    live: 'https://rtbloom.vercel.app',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Roots-to-Bloom',
    category: 'full-stack',
    hasCaseStudy: true,
    caseStudyId: 'roots-to-bloom',
  },
  {
    id: 1,
    title: 'KCOAT Ecommerce App',
    img: '/images/kcoat.webp',
    description:
      'Full-stack fashion ecommerce with cart, Stripe payments, and responsive design for a trendy clothing brand.',
    stacks: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'Stripe'],
    live: 'https://kcoat.netlify.app',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/KCOAT-Project',
    category: 'full-stack',
    hasCaseStudy: false,
  },
  {
    id: 2,
    title: 'Astonish Designs Fashion',
    img: '/images/astonish-finished.webp',
    description:
      'Brand portfolio for a fashion and tailoring brand, showcasing catalogue, services, testimonials, and contact.',
    stacks: ['React', 'SCSS', 'Framer Motion', 'EmailJS'],
    live: 'https://astonish-designs.com.ng',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Astonish-Designs',
    category: 'frontend',
    hasCaseStudy: false,
  },
  {
    id: 3,
    title: 'Quotes-Quest App',
    img: '/images/quotes-quest.webp',
    description:
      'Look up motivational quotes, create custom designs on shirts, and share on social media.',
    stacks: ['React', 'Tailwind CSS', 'Firebase', 'Node.js', 'Express.js', 'Framer Motion'],
    live: 'https://quotes-quest.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Quotes-Quest-Fullstack',
    category: 'full-stack',
    hasCaseStudy: false,
  },
  {
    id: 5,
    title: 'Blogging API',
    img: '/images/bloggingAPI.webp',
    description:
      'RESTful blogging API with JWT auth, CRUD operations, search/filter, and MongoDB. Full endpoint documentation.',
    stacks: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Jest', 'Winston'],
    live: 'https://blogging-api-tasy.onrender.com',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/intermediate-backend-exam',
    category: 'full-stack',
    hasCaseStudy: false,
  },
  {
    id: 9,
    title: 'Mood Buddie',
    img: '/images/moodbuddie.webp',
    description:
      'Mood tracking app with visualized charts, calendar views, customizable emojis, colors, and activities.',
    stacks: ['React', 'Tailwind CSS', 'Recharts', 'Axios'],
    live: 'https://mood-buddie.vercel.app/',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/Mood-Tracker-App-Project',
    category: 'frontend',
    hasCaseStudy: false,
  },
  {
    id: 8,
    title: 'News-Alive',
    img: '/images/news.webp',
    description:
      'Modern news aggregation app with search, filters, and category browsing. Built with Redux Toolkit for state management.',
    stacks: ['React', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion', 'Axios'],
    live: '#',
    gitHub: 'https://github.com/Kemi-Oluwadahunsi/News-Alive',
    category: 'frontend',
    hasCaseStudy: false,
  },
]

export const workExperience = [
  {
    id: 4,
    title: 'Software Engineer / Product Owner',
    company: 'Etiqa Insurance & Takaful',
    location: 'Kuala Lumpur, Malaysia · Hybrid',
    startDate: 'Apr 2025',
    endDate: 'Present',
    current: true,
    highlights: [
      'Architected enterprise MFE authentication platform (IDP) using Webpack 5 Module Federation — now the standardized auth handler across all teams at Etiqa',
      'Engineered dual-flow IAM system integrating LDAP (staff) and OIDC via PingID (agents), securing 500+ internal users on a 1M+ user platform',
      'Drove API standardization across microservices using TSOA with Node.js/Express.js, reducing integration bugs by 40%',
      'Built and shipped Timesheet Automation for all 600+ contract staff — React MFE integrated into Angular + ASP.NET MVC host',
      'Achieved 30% improvement in application load times through code-splitting, lazy loading, and performance profiling',
    ],
    tags: ['Webpack 5', 'Module Federation', 'React', 'TypeScript', 'LDAP', 'OIDC', 'PingID', 'Node.js', 'TSOA'],
  },
  {
    id: 3,
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
    id: 2,
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
    id: 1,
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

export const skillGroups = [
  {
    category: 'Frontend Core',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES2020+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'SCSS', 'Redux Toolkit', 'Zustand', 'Framer Motion'],
  },
  {
    category: 'Architecture & Tooling',
    skills: ['Webpack 5', 'Module Federation', 'Micro Frontend Architecture', 'Vite', 'TSOA', 'Rollup', 'Storybook', 'CI/CD', 'Git'],
  },
  {
    category: 'Backend & Databases',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Redis', 'pgvector', 'Firebase', 'JWT', 'Prisma'],
  },
  {
    category: 'Security & Auth',
    skills: ['LDAP', 'OIDC', 'OAuth 2.0', 'PingID', 'IAM', 'Session Management', 'Protected Routes'],
  },
  {
    category: 'Testing & Quality',
    skills: ['Jest', 'Cypress', 'Supertest', 'React Testing Library', 'ESLint', 'Husky'],
  },
  {
    category: 'Currently Exploring',
    skills: ['Angular', 'ASP.NET MVC', 'C#', 'Chrome Extension APIs', 'VSCode Extension API', 'Python'],
  },
]

export const services = [
  {
    id: 1,
    title: 'Micro Frontend Architecture',
    description:
      'Design and implement production MFE systems using Webpack 5 Module Federation across multiple teams and deployment boundaries. Shell app design, shared dependency strategy, and runtime federation.',
    tags: ['Webpack 5', 'Module Federation', 'Shell Apps', 'Runtime Federation'],
  },
  {
    id: 2,
    title: 'Enterprise Frontend Engineering',
    description:
      'Production React + TypeScript systems built for scale, maintainability, and team ownership. API standardization with TSOA, performance-first delivery, and code-splitting strategies.',
    tags: ['React', 'TypeScript', 'Next.js', 'Performance'],
  },
  {
    id: 3,
    title: 'Full-Stack Development',
    description:
      'End-to-end capability with Node.js, Express.js, TSOA API frameworks, and database integration across MongoDB, PostgreSQL, Redis, and Firebase.',
    tags: ['Node.js', 'Express.js', 'TSOA', 'REST APIs'],
  },
  {
    id: 4,
    title: 'Security & IAM Engineering',
    description:
      'Enterprise identity and access management: LDAP directory integration, OIDC protocol via PingID, dual-flow authentication, JWT, and protected route architecture at scale.',
    tags: ['LDAP', 'OIDC', 'PingID', 'JWT', 'IAM'],
  },
  {
    id: 5,
    title: 'Technical Writing & Education',
    description:
      'Deep-dive content for engineering audiences. Authoring a two-book series on Micro Frontends with Webpack 5. LinkedIn and X content creator with a focus on making hard concepts simple.',
    tags: ['Ebook Authoring', 'Technical Writing', 'LinkedIn', 'Developer Education'],
  },
  {
    id: 6,
    title: 'AI & Automation Integration',
    description:
      'Workflow automation and AI tooling integration within enterprise engineering pipelines. Multi-agent system architecture with Claude API, MCP routing, and semantic search.',
    tags: ['Claude API', 'MCP', 'Automation', 'RAG'],
  },
]

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/',
  facebook: 'https://www.facebook.com/kaliceagbabiaka1',
  twitter: 'https://twitter.com/km_oluwadahunsi',
  github: 'https://github.com/Kemi-Oluwadahunsi/',
  whatsapp: import.meta.env.VITE_WHATSAPP_LINK || '#',
  resume: 'https://drive.google.com/file/d/1tJgWBOmxZ1hlfbFtRdryVnHNSfKuqahr/view?usp=sharing',
}

export const contactInfo = {
  email: import.meta.env.VITE_CONTACT_EMAIL || '',
  phone: [
    import.meta.env.VITE_CONTACT_PHONE_1 || '',
    import.meta.env.VITE_CONTACT_PHONE_2 || '',
  ],
}

export const testimonials = [
  {
    id: 1,
    quote:
      "Kemi's ability to architect complex micro-frontend systems while keeping the team unblocked is exceptional. The IDP platform she built became our org-wide auth standard — that says everything.",
    name: 'Khan Mohammed Aslam',
    role: 'Group Head of Engineering',
    company: 'Etiqa Insurance Singapore',
    initials: 'KA',
  },
  {
    id: 2,
    quote:
      "What stands out about Kemi is her systems thinking. She doesn't just ship features — she asks how this fits the larger architecture. The Timesheet integration across Angular and .NET was seamless.",
    name: 'Kesihain Selvarajoo',
    role: 'Engineering Team Lead',
    company: 'Etiqa Insurance Malaysia',
    initials: 'KS',
  },
]

export const writingData = [
  {
    id: 'mfe-ebook-1',
    type: 'ebook',
    title: 'Micro Frontends with Webpack 5 Module Federation — Book 1',
    description:
      'From Zero to Your First Production MFE. Covers Module Federation fundamentals, shell architecture, shared dependency strategy, and production deployment — from real enterprise implementation at scale.',
    status: 'in-progress',
    tags: ['MFE', 'Webpack 5', 'Module Federation', 'React', 'Enterprise'],
  },
  {
    id: 'mfe-ebook-2',
    type: 'ebook',
    title: 'Micro Frontends with Webpack 5 Module Federation — Book 2',
    description:
      'Advanced patterns: dynamic remotes, cross-framework federation (React + Angular), auth propagation across MFE boundaries, and scaling to 10+ remotes.',
    status: 'coming-soon',
    tags: ['MFE', 'Advanced', 'Cross-Framework', 'Performance'],
  },
  {
    id: '30-days-react',
    type: 'carousel-series',
    title: '30 Days of React',
    description:
      'A 30-day LinkedIn carousel series covering React concepts, hooks, patterns, and best practices — one PDF lesson per day with real-life examples.',
    status: 'published',
    platform: 'LinkedIn',
    totalDays: 30,
    tags: ['React', 'JavaScript', 'Teaching', 'LinkedIn'],
    url: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/',
  },
  {
    id: '20-days-react',
    type: 'carousel-series',
    title: '20 Days of React',
    description:
      'A 20-day LinkedIn carousel series with daily hands-on React lessons — practical patterns, advanced concepts, and best practices in PDF format.',
    status: 'published',
    platform: 'LinkedIn',
    totalDays: 20,
    tags: ['React', 'Advanced Patterns', 'Teaching', 'LinkedIn'],
    url: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/',
  },
  {
    id: 'linkedin-content',
    type: 'post',
    title: 'LinkedIn Engineering Content',
    description:
      'Regular deep-dive content on MFE architecture, TypeScript patterns, Next.js, Node.js, and engineering career growth.',
    status: 'published',
    url: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/',
    tags: ['MFE', 'TypeScript', 'Next.js', 'Engineering Career'],
  },
]

export const blogLink = {
  url: '#',
  title: 'Read My Blog',
  description:
    'I write about software development, frontend architecture, and engineering best practices.',
}

export const openSourceData = {
  published: [
    {
      id: 'readyui-react',
      name: 'readyui-react',
      description:
        '50+ production-ready React components with full TypeScript support. Drop into any React project with zero config. Interactive Storybook docs.',
      stats: { components: '50+' },
      links: {
        github: 'https://github.com/Kemi-Oluwadahunsi/ReadyToUse-React-Components',
        npm: 'https://www.npmjs.com/package/readyui-react',
        storybook: 'https://kemi-oluwadahunsi.github.io/ReadyToUse-React-Components/',
      },
      tags: ['React', 'TypeScript', 'Component Library', 'Storybook', 'npm'],
      status: 'active',
    },
  ],
  pipeline: [
    {
      id: 'api-formatter',
      name: 'API Response Formatter',
      description:
        'A dev-focused Chrome extension that formats, colorizes, and adds tree navigation to raw API responses directly in the browser.',
      tags: ['Chrome Extension', 'Developer Tools', 'APIs'],
      status: 'research',
    },
    {
      id: 'lib-safety-checker',
      name: '"Is this library safe?" — VSCode + Chrome Extension',
      description:
        'Checks npm package health, CVEs, maintenance status, and license compatibility — surfaced directly inside your editor and browser.',
      tags: ['VSCode Extension', 'Chrome Extension', 'npm Security'],
      status: 'planning',
    },
  ],
}

export const architectureData = {
  title: 'Architecture in Action',
  subtitle:
    'The Webpack 5 Module Federation pattern I designed at Etiqa — one IDP remote consumed by every host app in the org, with zero coupling after authentication.',
  diagramLabel: 'Runtime federation topology',
  nodes: {
    shell: { label: 'Shell App (Host)', type: 'host' },
    idp: { label: 'IDP App', type: 'idp', detail: 'LDAP + OIDC (PingID) · org-wide standard' },
    remotes: [
      { label: 'Timesheet App', detail: 'React + Angular shell' },
      { label: 'Claims Portal', detail: 'Team A remote' },
      { label: 'Policy Manager', detail: 'Team B remote' },
      { label: 'Agent Portal', detail: 'Team C remote' },
    ],
    shared: ['react', 'react-dom', 'API Manager Package', 'design-tokens'],
  },
  codeSnippet: `// Host webpack.config.ts
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    authRemote: 'auth_remote@/remoteEntry.js',
    timesheet:  'timesheet@/remoteEntry.js',
  },
  shared: {
    react:     { singleton: true, requiredVersion: '^18' },
    'react-dom': { singleton: true, requiredVersion: '^18' },
    '@etiqa/api-manager': { singleton: true },
  },
})`,
  ebookCta: {
    heading: 'Micro Frontends with Webpack 5 — The Ebook Series',
    description:
      'Everything I learned building production MFE systems — written as a two-book series for engineers who want the real patterns, not the happy path.',
    tags: ['Book 1: In progress', 'Book 2: Coming soon'],
    url: 'https://www.linkedin.com/in/oluwakemioluwadahunsi/',
  },
}
