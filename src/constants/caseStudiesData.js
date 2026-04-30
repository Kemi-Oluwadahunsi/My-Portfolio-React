// ────────────────────────────────────────────
// Case Study Data
// ────────────────────────────────────────────
// Separated from portfolioData.js for scalability.
// Each key matches the `caseStudyId` in portfolioItems.

export const caseStudies = {
  'roots-to-bloom': {
    id: 'roots-to-bloom',
    title: 'Roots to Bloom Beauty',
    badge: 'Full-Stack E-Commerce',
    company: 'Independent Project',
    period: '2025',
    heroImage: '/images/RtB.webp',
    summary:
      'Designed and engineered a premium e-commerce platform for an organic skincare brand — from product catalogue and ingredient-level comparison tools to a full admin dashboard with real-time inventory management. Every interaction was crafted to mirror the warmth and authenticity of the brand.',
    problem: {
      title: 'The Challenge',
      description:
        'The founder needed more than a Shopify storefront. She wanted a bespoke digital experience that educates customers about natural ingredients, builds trust through transparency, and converts browsers into loyal buyers — all while maintaining a cohesive visual identity that reflects the organic, earth-toned brand ethos.',
      painPoints: [
        'No off-the-shelf theme could support ingredient-level product comparison alongside a standard product catalogue',
        'Admin workflows for managing 50+ SKUs with variant-level pricing, imagery, and ingredient metadata were scattered across spreadsheets',
        'The brand lacked a digital presence that matched the premium, handcrafted feel of the physical products',
        'Customer education about natural skincare benefits needed to be embedded in the shopping journey, not siloed in a blog',
      ],
    },
    solution: {
      title: 'The Approach',
      description:
        'I architected the platform as a modular React SPA backed by Firebase, with a clear separation between the customer-facing storefront and the admin dashboard. Every component was designed for reusability, and the data model was structured to support ingredient-level queries without sacrificing read performance.',
      keyDecisions: [
        {
          decision: 'Firebase Realtime DB + Firestore Hybrid',
          rationale:
            'Used Realtime DB for live inventory counts and order status, and Firestore for structured product/ingredient data — giving the admin instant feedback while keeping catalogue queries fast and indexed.',
        },
        {
          decision: 'Component-Driven Design System',
          rationale:
            'Built a custom design system with Tailwind CSS utility classes mapped to the brand palette (warm earth tones, botanical greens). Every product card, badge, and CTA shares the same token vocabulary.',
        },
        {
          decision: 'Framer Motion Choreography',
          rationale:
            'Page transitions, product reveals, and micro-interactions were sequenced with Framer Motion layout animations — creating a boutique feel without sacrificing performance (Lighthouse animation budget under 100ms).',
        },
        {
          decision: 'EmailJS Transactional Flow',
          rationale:
            'Integrated EmailJS for order confirmations, admin notifications, and customer inquiries — keeping the stack serverless while delivering reliable transactional communication.',
        },
      ],
    },
    features: [
      {
        title: 'Ingredient Comparison Engine',
        description:
          'Customers can compare up to 3 products side-by-side with a detailed ingredient breakdown, highlighting shared botanicals, allergen flags, and skin-type compatibility.',
        image: '/images/case-studies/rtb-comparison.webp',
      },
      {
        title: 'Admin Dashboard',
        description:
          'Full CRUD operations for products, categories, and orders. Real-time inventory tracking with low-stock alerts. Image upload with automatic compression and CDN delivery.',
        image: '/images/case-studies/rtb-admin.webp',
      },
      {
        title: 'Brand-Aligned Storefront',
        description:
          'Custom product cards with botanical illustrations, earth-toned color system, and editorial-style product pages that weave ingredient education into the purchase flow.',
        image: '/images/case-studies/rtb-storefront.webp',
      },
      {
        title: 'Responsive Cart & Checkout',
        description:
          'Persistent cart with local storage backup, quantity management, and a streamlined checkout flow optimized for mobile conversion.',
        image: '/images/case-studies/rtb-cart.webp',
      },
    ],
    gallery: [
      {
        image: '/images/case-studies/rtb-homepage.webp',
        caption:
          'Homepage — Hero section with seasonal product spotlight and brand narrative',
      },
      {
        image: '/images/case-studies/rtb-product-detail.webp',
        caption:
          'Product detail page with ingredient breakdown and skin-type compatibility tags',
      },
      {
        image: '/images/case-studies/rtb-comparison-full.webp',
        caption:
          'Side-by-side comparison of three products highlighting shared botanicals',
      },
      {
        image: '/images/case-studies/rtb-admin-dashboard.webp',
        caption:
          'Admin dashboard — inventory overview with low-stock alerts and order queue',
      },
      {
        image: '/images/case-studies/rtb-mobile.webp',
        caption:
          'Mobile responsive views — storefront, cart, and checkout flow',
      },
      {
        image: '/images/case-studies/rtb-cart-checkout.webp',
        caption: 'Cart summary with quantity controls and streamlined checkout',
      },
    ],
    impact: [
      {
        metric: 'Lighthouse Performance',
        value: '94',
        description: 'Performance score on mobile with image-heavy catalogue',
      },
      {
        metric: 'Products Managed',
        value: '50+',
        description: 'SKUs with variant-level pricing and ingredient data',
      },
      {
        metric: 'Page Load',
        value: '1.8s',
        description: 'First Contentful Paint on 3G connection',
      },
      {
        metric: 'Admin Efficiency',
        value: '3x',
        description:
          'Faster product management vs previous spreadsheet workflow',
      },
    ],
    techStack: {
      Frontend: [
        'React 18',
        'Tailwind CSS',
        'Framer Motion',
        'React Router v6',
      ],
      Backend: [
        'Firebase Realtime DB',
        'Cloud Firestore',
        'Firebase Auth',
        'Firebase Storage',
      ],
      Tooling: ['Vite', 'EmailJS', 'Vercel', 'Figma'],
    },
    timeline: [
      {
        phase: 'Discovery & Brand Audit',
        duration: '1 week',
        description:
          'Audited brand assets, defined colour tokens, mapped user journeys for browse → compare → purchase flow.',
      },
      {
        phase: 'Data Modelling & Firebase Setup',
        duration: '1 week',
        description:
          'Designed Firestore schemas for products, ingredients, and orders. Set up auth rules and storage buckets.',
      },
      {
        phase: 'Storefront Development',
        duration: '2 weeks',
        description:
          'Built product catalogue, comparison engine, cart system, and all customer-facing pages with responsive design.',
      },
      {
        phase: 'Admin Dashboard',
        duration: '1.5 weeks',
        description:
          'Developed full admin panel with CRUD operations, image upload, inventory tracking, and order management.',
      },
      {
        phase: 'Animation & Polish',
        duration: '1 week',
        description:
          'Added Framer Motion page transitions, scroll-triggered reveals, and micro-interactions across the platform.',
      },
      {
        phase: 'Testing & Launch',
        duration: '0.5 weeks',
        description:
          'Cross-browser testing, Lighthouse audits, SEO meta tags, and Vercel deployment with custom domain.',
      },
    ],
    learnings: [
      'Hybrid Firebase architecture (Realtime DB + Firestore) works well when you clearly separate "live" data from "structured" data — but document the boundary early or it becomes confusing.',
      'Ingredient-level data modelling required denormalization for read performance. Keeping a flat ingredients collection with product references was more performant than nested product subdocuments.',
      'Tailwind CSS custom theme configuration pays off significantly when the brand palette is non-standard — mapping brand colours to semantic tokens (`brand-earth`, `brand-leaf`) made the entire codebase scannable.',
      'Framer Motion `layout` animations are powerful but need careful `layoutId` management when components unmount during page transitions.',
    ],
    links: {
      live: 'https://rtbloom.vercel.app',
      github: 'https://github.com/Kemi-Oluwadahunsi/Roots-to-Bloom',
    },
  },

  //   herbiskea: {
  //     id: 'herbiskea',
  //     title: 'Herbiskea',
  //     badge: 'Full-Stack Natural Beauty Intelligence Platform',
  //     company: 'Independent Product',
  //     period: '2025 – 2026',
  //     heroImage: '/images/herbiskea.webp',
  //     summary:
  //       'Conceived, designed, and solo-engineered a comprehensive natural beauty intelligence platform — 220+ ingredient database, 128 expert-curated DIY recipes with Paystack e-commerce, AI-powered skin & hair analysis, a precision formulation calculator, compatibility checker, and a 46-article educational blog. A production-grade SaaS built end-to-end from data modelling to deployment.',
  //     problem: {
  //       title: 'The Challenge',
  //       description:
  //         'The natural skincare and haircare space is flooded with unverified advice and fragmented tools. Consumers looking to formulate their own products had no single platform that combined scientifically accurate ingredient data, compatibility analysis, AI-powered skin diagnostics, scalable recipe calculations, and a curated marketplace — all backed by research rather than marketing.',
  //       painPoints: [
  //         'Ingredient information is scattered across unreliable blogs — no structured, searchable database with compatibility data, substitution suggestions, and usage percentages',
  //         'DIY formulators have no way to verify ingredient interactions before mixing — risking pH conflicts, oxidative interference, and skin irritation',
  //         'Existing skin analysis tools are either oversimplified quizzes or require dermatologist visits — nothing bridges the gap with accessible AI-powered image analysis',
  //         'Recipe scaling is done manually with spreadsheets, leading to measurement errors and inconsistent batch quality across different formulation sizes',
  //         'No e-commerce platform exists specifically for premium, expert-verified DIY recipe PDFs with detailed safety guidelines and ingredient sourcing advice',
  //       ],
  //     },
  //     solution: {
  //       title: 'The Approach',
  //       description:
  //         'I designed Herbiskea as a monolithic Next.js 14 application with server-side rendering, API routes, and Prisma ORM against PostgreSQL — giving the platform the performance of a static site with the data richness of a full SaaS. Every feature module (ingredients, recipes, analysis, calculator, blog, e-commerce) was architected as an independent domain with shared design tokens and a unified data access layer.',
  //       keyDecisions: [
  //         {
  //           decision: 'Next.js App Router + Server Components',
  //           rationale:
  //             'Leveraged React Server Components for data-heavy pages (ingredient library, blog) to eliminate client-side data fetching waterfalls. Static generation for blog posts, dynamic SSR for personalized analysis results — choosing the optimal rendering strategy per route.',
  //         },
  //         {
  //           decision: 'Prisma + PostgreSQL Relational Model',
  //           rationale:
  //             "The ingredient-to-recipe-to-compatibility graph is inherently relational. Prisma's type-safe query builder and migration system made it possible to model 220+ ingredients with cross-references (substitutions, conflicts, synergies) without denormalization.",
  //         },
  //         {
  //           decision: 'AI-Powered Image Analysis Pipeline',
  //           rationale:
  //             'Built a multi-step analysis flow: image upload → AI vision model analysis → structured questionnaire → combined diagnostic report with personalized product/ingredient recommendations. Authentication-gated to manage API costs.',
  //         },
  //         {
  //           decision: 'Paystack Payment Integration',
  //           rationale:
  //             'Integrated Paystack for recipe PDF purchases with webhook verification, automatic PDF delivery, and purchase history. Chose Paystack for its strong African market support and developer-friendly API.',
  //         },
  //         {
  //           decision: 'Formulation Calculator with Phase-Aware Scaling',
  //           rationale:
  //             'Built a precision calculator that understands water/oil/cool-down phases, scales ingredients proportionally by batch size (up to 10kg), and generates printable formulation sheets — replacing error-prone manual spreadsheet workflows.',
  //         },
  //       ],
  //     },
  //     features: [
  //       {
  //         title: 'Ingredient Intelligence Database',
  //         description:
  //           '220+ natural ingredients with filterable categories (oils, butters, essential oils), benefit tags, skin/hair type compatibility, substitution suggestions, usage percentages, and scientific profiles including HPLC-verified monographs and terpene/polyphenol data.',
  //         image: '/images/case-studies/herb-ingredients.webp',
  //       },
  //       {
  //         title: 'AI Skin & Hair Analysis',
  //         description:
  //           'Multi-modal diagnostic system combining AI-powered image analysis with structured questionnaires. Generates personalized reports with concern identification, ingredient recommendations, and routine suggestions. Secured behind authentication.',
  //         image: '/images/case-studies/herb-analysis.webp',
  //       },
  //       {
  //         title: 'Compatibility Checker',
  //         description:
  //           'Algorithmic ingredient interaction engine that flags pH conflicts, metabolic interference, and oxidative risks. Uses colour-coded scoring (synergistic green, conflict amber) with resolution suggestions for safe formulation.',
  //         image: '/images/case-studies/herb-compatibility.webp',
  //       },
  //       {
  //         title: 'Recipe Library & E-Commerce',
  //         description:
  //           '128 expert-curated DIY recipes across skincare, haircare, and body wellness. Premium recipes delivered as detailed PDFs via Paystack checkout. Filterable by concern, difficulty, and category with featured recipe spotlights.',
  //         image: '/images/case-studies/herb-recipes.webp',
  //       },
  //       {
  //         title: 'Precision Formulation Calculator',
  //         description:
  //           'Phase-aware recipe scaling tool supporting batch sizes from 50g to 10kg. Real-time ingredient weight recalculation, percentage/gram toggle, printable formulation sheets, and one-click recipe import from the library.',
  //         image: '/images/case-studies/herb-calculator.webp',
  //       },
  //       {
  //         title: '46-Article Educational Blog',
  //         description:
  //           'Expert-authored articles covering skin science, hair care routines, ingredient deep-dives, DIY tutorials, and industry trends. Categorized, tagged, and optimized for SEO with reading time estimates.',
  //         image: '/images/case-studies/herb-blog.webp',
  //       },
  //     ],
  //     gallery: [
  //       {
  //         image: '/images/case-studies/herb-homepage.webp',
  //         caption:
  //           'Homepage — Botanical hero sections with featured ingredient spotlights and animated transitions',
  //       },
  //       {
  //         image: '/images/case-studies/herb-ingredient-detail.webp',
  //         caption:
  //           'Ingredient detail page with HPLC monograph, terpene profiles, and compatibility data',
  //       },
  //       {
  //         image: '/images/case-studies/herb-analysis-report.webp',
  //         caption:
  //           'AI analysis report with skin concern identification and personalized recommendations',
  //       },
  //       {
  //         image: '/images/case-studies/herb-recipe-detail.webp',
  //         caption:
  //           'Premium recipe page with ingredient breakdown, step-by-step instructions, and batch calculator link',
  //       },
  //       {
  //         image: '/images/case-studies/herb-calculator-full.webp',
  //         caption:
  //           'Formulation calculator with phase-aware scaling, weight breakdown, and printable sheet',
  //       },
  //       {
  //         image: '/images/case-studies/herb-mobile-views.webp',
  //         caption:
  //           'Fully responsive design — ingredient library, recipe cards, and blog on mobile',
  //       },
  //     ],
  //     impact: [
  //       {
  //         metric: 'Ingredients Catalogued',
  //         value: '220+',
  //         description:
  //           'Natural ingredients with full scientific profiles and compatibility data',
  //       },
  //       {
  //         metric: 'DIY Recipes',
  //         value: '128',
  //         description:
  //           'Expert-curated formulations across skincare, haircare, and wellness',
  //       },
  //       {
  //         metric: 'Blog Articles',
  //         value: '46',
  //         description:
  //           'Educational posts covering science, routines, and DIY tutorials',
  //       },
  //       {
  //         metric: 'Lighthouse Score',
  //         value: '96',
  //         description:
  //           'Performance score leveraging SSR, image optimization, and code splitting',
  //       },
  //     ],
  //     techStack: {
  //       Frontend: [
  //         'Next.js 14',
  //         'React 18',
  //         'TypeScript',
  //         'Tailwind CSS',
  //         'Framer Motion',
  //       ],
  //       Backend: [
  //         'Next.js API Routes',
  //         'Prisma ORM',
  //         'PostgreSQL',
  //         'NextAuth.js',
  //       ],
  //       Services: ['Paystack', 'Cloudinary', 'AI Vision API', 'Vercel'],
  //       Tooling: ['ESLint', 'Prettier', 'Prisma Studio', 'Vercel Analytics'],
  //     },
  //     timeline: [
  //       {
  //         phase: 'Research & Data Architecture',
  //         duration: '2 weeks',
  //         description:
  //           'Researched botanical science, designed the relational schema for ingredients/recipes/compatibility, and mapped all user journeys across 6 feature modules.',
  //       },
  //       {
  //         phase: 'Core Infrastructure',
  //         duration: '2 weeks',
  //         description:
  //           'Set up Next.js App Router, Prisma models with PostgreSQL migrations, NextAuth with Google/Apple/email providers, and Cloudinary image pipeline.',
  //       },
  //       {
  //         phase: 'Ingredient Database & Library',
  //         duration: '2 weeks',
  //         description:
  //           'Built the 220+ ingredient database with categorization, search, filtering, substitution graph, and detailed scientific profiles.',
  //       },
  //       {
  //         phase: 'Recipe System & E-Commerce',
  //         duration: '2 weeks',
  //         description:
  //           'Developed recipe CRUD, PDF generation, Paystack payment integration with webhooks, purchase history, and the premium/free recipe tier system.',
  //       },
  //       {
  //         phase: 'AI Analysis & Compatibility Engine',
  //         duration: '2 weeks',
  //         description:
  //           'Integrated AI vision model for skin/hair image analysis, built the structured questionnaire flow, compatibility checker algorithm, and diagnostic report generation.',
  //       },
  //       {
  //         phase: 'Calculator, Blog & Polish',
  //         duration: '2 weeks',
  //         description:
  //           'Built the precision formulation calculator with phase-aware scaling, seeded 46 blog articles, added dark mode, notifications, animations, and comprehensive mobile responsiveness.',
  //       },
  //       {
  //         phase: 'Testing & Production Launch',
  //         duration: '1 week',
  //         description:
  //           'End-to-end testing across all flows, Lighthouse audits, SEO optimization, educational disclaimer compliance, and production deployment to herbiskea.com.',
  //       },
  //     ],
  //     learnings: [
  //       'Next.js App Router with Server Components dramatically reduced client bundle size for data-heavy pages — the ingredient library loads 220+ items without any client-side fetch, making initial paint nearly instant.',
  //       "Prisma's relational model was the right call for ingredient-recipe-compatibility relationships. The alternative (document store) would have required extensive denormalization that would make compatibility queries unwieldy.",
  //       'Paystack webhook verification is critical for reliable payment flows — initial implementation without idempotency keys led to duplicate PDF deliveries during network retries.',
  //       'Phase-aware formulation scaling (water/oil/cool-down) required domain expertise beyond typical CRUD logic. Collaborating with formulation references ensured the calculator produces scientifically valid ratios, not just proportional math.',
  //       'Building a 46-article blog with proper SEO metadata, reading time estimation, and category/tag filtering is a content architecture challenge as much as a technical one — investing in a consistent content schema upfront saved significant refactoring later.',
  //     ],
  //     links: {
  //       live: 'https://herbiskea.com',
  //       github: 'https://github.com/Kemi-Oluwadahunsi/Herbiskea',
  //     },
  //   },
  herbiskea: {
    id: 'herbiskea',
    title: 'Herbiskea',
    badge: 'Full-Stack Beauty Intelligence Platform',
    company: 'Independent Project',
    period: '2025 – 2026',
    heroImage: '/images/case-studies/herbiskea-hero.webp',
    summary:
      'Designed and engineered a comprehensive natural beauty intelligence platform — combining a 220+ ingredient encyclopedia with compatibility and substitution tools, 128 expert-curated recipes, AI-powered skin and hair analysis, a custom formulation builder, full e-commerce with Paystack checkout, and a 46-post educational blog. Built to make natural skincare accessible to everyone, from curious beginners to experienced formulators.',
    problem: {
      title: 'The Challenge',
      description:
        'The natural beauty space is fragmented — ingredient information is scattered across blogs and forums, recipes lack scientific grounding, and beginners have no reliable way to know which ingredients work together, what to substitute, or what suits their skin type. There was no single platform that combined education, formulation tools, and commerce into one cohesive experience.',
      painPoints: [
        'Ingredient information is spread across dozens of unreliable sources with no compatibility data, substitution guidance, or formulation specs',
        'Beginners are intimidated by skincare jargon — existing resources assume prior knowledge and fail to explain ingredients in plain language',
        'No platform combines recipe discovery, custom formulation building, and e-commerce in one place — users bounce between apps and spreadsheets',
        'Skin and hair analysis tools are locked behind expensive dermatology apps or require in-person consultations',
        'Recipe creators have no way to manage ingredient pricing, difficulty ratings, premium gating, or step-by-step instructions in a structured format',
      ],
    },
    solution: {
      title: 'The Approach',
      description:
        'I architected Herbiskea as a full-stack Next.js 16 application with the App Router, backed by Neon PostgreSQL via Prisma ORM. The platform was designed around three pillars: educate (ingredient database + blog), create (formulation builder + recipes), and shop (e-commerce + shopping lists). Every data model was built to support cross-referencing — ingredients link to recipes, recipes link to substitutions, and analysis results link to personalized recommendations.',
      keyDecisions: [
        {
          decision: 'Next.js 16 App Router with Server Components',
          rationale:
            'Leveraged React Server Components for data-heavy pages (ingredients, recipes, blog) to minimize client-side JavaScript. Used client components only for interactive features like the formulation builder, camera capture, and cart — achieving fast initial loads with rich interactivity where needed.',
        },
        {
          decision: 'Prisma 6 + Neon PostgreSQL with Connection Pooling',
          rationale:
            "Chose a relational database over NoSQL to support complex ingredient-to-recipe relationships, compatibility matrices, and substitution chains. Neon's serverless PostgreSQL with connection pooling (PgBouncer) keeps costs at zero while handling concurrent queries efficiently.",
        },
        {
          decision: 'In-Memory TTL Cache with Prefix Invalidation',
          rationale:
            'Built a custom cache layer (lib/cache.ts) with TTL-based expiry and prefix-based invalidation — caching ingredient detail pages, substitution lookups, and recipe queries to cut database round-trips by 60%+ without introducing Redis complexity.',
        },
        {
          decision:
            'Curated Substitution Engine over Pure Algorithmic Matching',
          rationale:
            'Initially built a dynamic scoring system for ingredient substitutions (shared benefits, category, skin types). Discovered it produced functionally wrong results (e.g. cleansers substituted with oils). Replaced with a curated substitution database of 220+ hand-validated entries, with dynamic scoring as a fallback.',
        },
        {
          decision: 'Tailwind CSS v4 Design System with Dark Mode',
          rationale:
            'Built a cohesive design system using custom theme tokens (forest-green, sage-green, muted-gold, warm-cream, charcoal) mapped to the botanical brand identity. Full dark mode support via ThemeContext with system preference detection.',
        },
        {
          decision: 'Paystack Integration for African Market',
          rationale:
            'Chose Paystack over Stripe for native support of Nigerian Naira, bank transfers, and mobile money — critical for the target audience. Implemented full checkout flow with webhook verification, order tracking, and receipt generation.',
        },
      ],
    },
    features: [
      {
        title: 'Ingredient Encyclopedia (220+ Entries)',
        description:
          'Every ingredient has a detailed profile — scientific name, INCI, origin, key components, pH stability range, comedogenic rating, usage rates, shelf life, appearance, and a rich beginner-friendly description broken into "What is it?", "Key Benefits", "How It Works", "Ideal For", and "Good to Know" sections.',
        image: '/images/case-studies/herbiskea-ingredient-detail.webp',
      },
      {
        title: 'Substitution & Compatibility Tools',
        description:
          'Hand-curated substitution data for 220+ ingredients ensures functional correctness — essential oils only substitute with other essential oils, barrier lipids with barrier lipids, cleansers with cleansers. Compatibility matrix shows synergy, caution, and avoid pairings with explanations.',
        image: '/images/case-studies/herbiskea-substitutions.webp',
      },
      {
        title: 'Recipe Collection (128 Recipes)',
        description:
          '128 expert-curated recipes across skincare, haircare, and body wellness with step-by-step instructions, ingredient lists with amounts, difficulty ratings, prep times, customization tips, and dynamic pricing. 115 premium recipes with download limits and 13 free starter recipes.',
        image: '/images/case-studies/herbiskea-recipes.webp',
      },
      {
        title: 'Custom Formulation Builder',
        description:
          'Drag-and-drop formulation tool where users build recipes from scratch — selecting ingredients with percentage-based amounts, choosing the formulation phase (water/oil/cool-down), and getting real-time compatibility warnings and pH range estimates.',
        image: '/images/case-studies/herbiskea-formulation.webp',
      },
      {
        title: 'AI Skin & Hair Analysis',
        description:
          'Camera-based analysis flow with live video feed, face guide overlay, and permission handling. Captures skin/hair conditions and delivers personalized ingredient and recipe recommendations based on detected concerns.',
        image: '/images/case-studies/herbiskea-analysis.webp',
      },
      {
        title: 'E-Commerce & Checkout',
        description:
          'Full shopping flow — cart with quantity management, Paystack-powered checkout supporting cards, bank transfers, and mobile money. Order tracking, receipt generation, and order history dashboard.',
        image: '/images/case-studies/herbiskea-checkout.webp',
      },
      {
        title: 'Educational Blog (46 Posts)',
        description:
          'Editorial-style blog covering ingredient deep-dives, routine guides, and skincare science — designed to educate beginners while driving organic search traffic. Rich SEO metadata, reading time estimates, and related content suggestions.',
        image: '/images/case-studies/herbiskea-blog.webp',
      },
      {
        title: 'User Dashboard & Collections',
        description:
          'Authenticated users can save favorites, organize ingredients and recipes into custom collections, write reviews and notes, build shopping lists, track orders, and manage notification preferences — all from a unified dashboard.',
        image: '/images/case-studies/herbiskea-dashboard.webp',
      },
    ],
    gallery: [
      {
        image: '/images/case-studies/herbiskea-homepage.webp',
        caption:
          'Homepage — Hero section with botanical gradient, featured recipes, and ingredient spotlight',
      },
      {
        image: '/images/case-studies/herbiskea-ingredients-list.webp',
        caption:
          'Ingredient catalogue with category filters, search, and card grid layout',
      },
      {
        image: '/images/case-studies/herbiskea-ingredient-hero.webp',
        caption:
          'Ingredient detail hero — gradient background, benefit chips on image, quick-stat cards for pH/phase/shelf life',
      },
      {
        image: '/images/case-studies/herbiskea-ingredient-description.webp',
        caption:
          'Beginner-friendly ingredient description section with structured headings and benefit breakdowns',
      },
      {
        image: '/images/case-studies/herbiskea-substitution-tool.webp',
        caption:
          'Substitution tool showing curated replacements with match scores and compatibility notes',
      },
      {
        image: '/images/case-studies/herbiskea-recipe-detail.webp',
        caption:
          'Recipe detail page — step-by-step instructions, ingredient amounts, difficulty rating, and customization tips',
      },
      {
        image: '/images/case-studies/herbiskea-formulation-builder.webp',
        caption:
          'Formulation builder — ingredient selection, phase assignment, percentage-based amounts',
      },
      {
        image: '/images/case-studies/herbiskea-analysis-camera.webp',
        caption:
          'AI analysis — live camera capture with face guide overlay and permission handling',
      },
      {
        image: '/images/case-studies/herbiskea-dark-mode.webp',
        caption:
          'Full dark mode — ingredient detail page showing seamless theme transition',
      },
      {
        image: '/images/case-studies/herbiskea-mobile.webp',
        caption:
          'Mobile responsive views — homepage, ingredient detail, recipe card, and cart',
      },
    ],
    impact: [
      {
        metric: 'Ingredients Catalogued',
        value: '224',
        description:
          'Fully enriched entries with formulation data, descriptions, compatibility, and substitutions',
      },
      {
        metric: 'Recipes Published',
        value: '128',
        description:
          'Expert-curated recipes across skincare, haircare, and body wellness categories',
      },
      {
        metric: 'Blog Posts',
        value: '46',
        description:
          'Educational articles covering ingredients, routines, and skincare science',
      },
      {
        metric: 'Substitution Pairs',
        value: '660+',
        description:
          'Hand-validated ingredient substitutions ensuring functional correctness',
      },
      {
        metric: 'Lighthouse Score',
        value: '96',
        description:
          'Performance score leveraging SSR, image optimization, and code splitting',
      },
      {
        metric: 'Database Queries',
        value: '60%↓',
        description:
          'Reduction in DB round-trips via in-memory TTL caching with prefix invalidation',
      },
    ],
    techStack: {
      Frontend: [
        'Next.js 16 (App Router)',
        'React 19',
        'TypeScript',
        'Tailwind CSS v4',
        'Framer Motion',
      ],
      Backend: [
        'Prisma 6 ORM',
        'Neon PostgreSQL',
        'NextAuth v5 (JWT)',
        'API Routes with Rate Limiting',
      ],
      Services: [
        'Paystack (Payments)',
        'Cloudinary (Image CDN)',
        'Resend (Transactional Email)',
      ],
      Tooling: ['Turbopack', 'Vercel', 'Prisma Studio', 'ESLint'],
    },
    timeline: [
      {
        phase: 'Architecture & Data Modelling',
        duration: '1 week',
        description:
          'Designed Prisma schema for ingredients, recipes, blogs, users, orders, and compatibility matrices. Set up Neon PostgreSQL, NextAuth v5 with JWT strategy, and project scaffolding.',
      },
      {
        phase: 'Ingredient Database',
        duration: '2 weeks',
        description:
          'Built ingredient CRUD, detail pages, and seeded 224 entries with full enrichment — scientific data, formulation specs, beginner-friendly descriptions, and curated substitutions.',
      },
      {
        phase: 'Recipe System & E-Commerce',
        duration: '2 weeks',
        description:
          'Developed recipe catalogue with filtering, detail pages with step-by-step instructions, premium gating with download limits, cart system, and Paystack checkout integration.',
      },
      {
        phase: 'Analysis & Formulation Tools',
        duration: '1.5 weeks',
        description:
          'Built AI analysis flow with camera capture, face guide overlay, and permission handling. Developed formulation builder with ingredient selection, phase management, and compatibility warnings.',
      },
      {
        phase: 'Blog, Search & User Features',
        duration: '1.5 weeks',
        description:
          'Created editorial blog system with 46 posts, global search across all content types, favorites, collections, shopping lists, reviews, notes, and notification system.',
      },
      {
        phase: 'Dark Mode, Performance & Polish',
        duration: '1 week',
        description:
          'Implemented full dark mode with system detection, in-memory caching, rate limiting, image optimization via Cloudinary, SEO metadata, and cross-device responsive testing.',
      },
    ],
    learnings: [
      'Algorithmic ingredient substitution (scoring by shared benefits/category) sounds smart but produces dangerous results — a cleanser being substituted with an oil is functionally wrong even if they share "moisturizing" as a benefit. Curated data with human validation is non-negotiable for domain-specific recommendations.',
      'Database migration mid-project (Supabase → Neon) taught me to keep connection logic completely abstracted behind environment variables. The switch required zero code changes — only connection string updates across three .env files.',
      'Generating rich content at scale (224 ingredient descriptions) is feasible without AI APIs by building robust template generators that leverage existing structured metadata. The key is category-specific templates with benefit explanation maps.',
      'Tailwind CSS v4 syntax changes (bg-linear-to-t instead of bg-gradient-to-t, aspect-4/5 instead of aspect-[4/5]) are subtle but break builds silently. Establishing a version-specific cheatsheet at project start saves hours of debugging.',
      'In-memory caching with TTL and prefix invalidation is surprisingly effective for read-heavy applications — cutting database queries by 60% without the infrastructure overhead of Redis. The tradeoff is per-instance cache (acceptable for single-server deployments).',
      'NextAuth v5 JWT strategy with maxAge 30 days and selective callback triggers (only on "update") keeps session management lightweight while still supporting real-time profile updates.',
    ],
    links: {
      live: 'https://herbiskea.com',
      github: 'https://github.com/Kemi-Oluwadahunsi/Herbiskea',
    },
  },
  viskit: {
    id: 'viskit',
    title: 'VisKit',
    badge: 'Open-Source Library',
    company: 'Independent Project',
    period: '2025 – 2026',
    heroImage: '/images/VisKit.webp', // alt: "VisKit library hero — dark-themed dashboard showcasing line series, stacked bar, radar, heatmap, and pie charts rendered side-by-side with the VisKit logo"
    summary:
      'Designed and engineered a composable, TypeScript-first React charting library from scratch — a 6-package monorepo delivering 19 production-ready chart types, a high-performance Canvas renderer, a token-driven theme system, physics-based animations, and full WCAG accessibility. Every API was shaped around developer ergonomics: zero-config defaults, generic type safety, and tree-shakeable imports.',
    problem: {
      title: 'The Challenge',
      description:
        'Existing React charting libraries force trade-offs: Recharts is simple but inflexible, Nivo is beautiful but heavy, Victory is composable but verbose, and D3 alone demands you own every DOM detail. I needed a library that combined composability with sensible defaults, carried the datum type through the entire component tree, and treated accessibility and theming as first-class concerns — not afterthoughts bolted on in a future major version.',
      painPoints: [
        'Most React chart libraries lose TypeScript type safety at the field-selection boundary — field names are untyped strings, not keyof TDatum',
        'Accessibility is typically an add-on: no keyboard navigation, no screen-reader data tables, no reduced-motion support out of the box',
        'Theme systems are limited to color palette swaps — typography, spacing, grid, axis, and tooltip tokens are hardcoded in component internals',
        'Rendering large datasets (5k–100k points) in SVG creates thousands of DOM nodes, causing frame drops with no graceful fallback to Canvas',
        'Monolithic bundles ship every chart type even when a consumer uses only one — no tree-shaking, no sub-package imports',
      ],
    },
    solution: {
      title: 'The Approach',
      description:
        'I architected VisKit as a layered monorepo: a slim core package owning context, scales, and types; a themes package with a deep-token system; an animations package respecting OS preferences; and a charts package containing every series, primitive, and the Canvas renderer. Each layer depends only downward, and the consumer barrel package (@viskit/react) re-exports everything for single-import convenience while preserving tree-shaking.',
      keyDecisions: [
        {
          decision: 'Three-Layer Context Architecture',
          rationale:
            'ChartContext carries data and dimensions to all children. CartesianContext and PolarContext are injected conditionally based on the data shape — so radial charts never pay for Cartesian scale computation, and vice versa. Series components read only from the context they need.',
        },
        {
          decision: 'Generic Datum Flow with keyof Safety',
          rationale:
            'Every series component is generic over TDatum. The field prop is typed as keyof TDatum & string, giving autocomplete and compile-time guarantees that the field exists on the data. This prevents an entire class of runtime "undefined is not a number" bugs.',
        },
        {
          decision: 'D3 as Implementation Detail, Not API Surface',
          rationale:
            "D3 modules (d3-scale, d3-shape, d3-array) handle scale computation and path generation internally. Consumers never import D3 directly — they compose React components. This keeps the API familiar to React developers while leveraging D3's battle-tested math.",
        },
        {
          decision: 'Canvas Renderer with Automatic Threshold',
          rationale:
            'Below 5,000 points the CanvasRenderer falls back to SVG for full interactivity and accessibility. Above the threshold it overlays an HTML Canvas via foreignObject, with hit-testing for hover detection and an invisible ARIA group for screen readers — preserving accessibility even in canvas mode.',
        },
        {
          decision: 'Token-Driven Theme System',
          rationale:
            'The VisualizationTokens interface defines every visual decision: categorical palettes, sequential ramps, semantic colors, surface colors, typography scales, spacing, animation durations, and border radii. No component reads CSS or hardcodes a value. Themes can be swapped at runtime via ThemeProvider with zero re-mount.',
        },
        {
          decision: 'tsup for ESM + CJS + DTS in Parallel',
          rationale:
            "Each package builds ESM, CommonJS, and TypeScript declarations in under 2 seconds via tsup. Combined with Turborepo's topological task graph, the full 7-package build completes in ~11 seconds with zero-config caching.",
        },
      ],
    },
    features: [
      {
        title: '19 Chart Types Across 4 Categories',
        description:
          'Cartesian series (line, bar, area, scatter, stacked bar, grouped bar, horizontal bar, multi-line, stacked area, bubble, lollipop, dumbbell, histogram), radial series (pie/donut, radar, radial bar, polar area), specialized (heatmap), and composition (sparkline) — each with hover interactions, ARIA labels, and animation.',
        image: '/images/case-studies/viskit-chart-grid.webp', // alt: "Grid of 19 VisKit chart types — line, bar, area, scatter, pie, radar, heatmap, stacked bar, bubble, lollipop, dumbbell, histogram, radial bar, polar area, sparkline, grouped bar, horizontal bar, multi-line, and stacked area"
      },
      {
        title: 'Canvas Renderer for Large Datasets',
        description:
          'Automatic SVG-to-Canvas switching at a configurable threshold. Supports scatter, bubble, and heatmap modes with retina-aware rendering, hover hit-detection, animated fade-in, and a custom renderCanvas escape hatch for full 2D context control.',
        image: '/images/case-studies/viskit-canvas-renderer.webp', // alt: "Side-by-side comparison of SVG scatter plot versus Canvas-rendered scatter plot with 200 data points, showing identical visual output"
      },
      {
        title: '4 Theme Presets & Token System',
        description:
          'Midnight (dark), Daylight (light), Aurora (vibrant dark), and Corporate (neutral light) presets. The token interface covers categorical palettes, sequential ramps, semantic colors, surface tokens, typography scales, and animation configs — all swappable at runtime.',
        image: '/images/case-studies/viskit-themes.webp', // alt: "Four VisKit theme presets — Midnight, Daylight, Aurora, and Corporate — each showing the same bar chart with distinct color palettes and surface backgrounds"
      },
      {
        title: 'Storybook Component Catalogue',
        description:
          '21 interactive stories with live controls for every prop — field selection, color pickers, range sliders for opacity and radius, curve type selectors, and 5 tooltip variants. Each story includes import code blocks and multiple visual scenarios.',
        image: '/images/case-studies/viskit-storybook.webp', // alt: "Storybook interface showing the LineSeries story with interactive controls panel on the right and a rendered line chart with dots in the canvas area"
      },
      {
        title: 'Accessibility-First Architecture',
        description:
          'Every chart SVG carries role="img", <title>, and <desc>. A hidden data table renders all values for screen readers. Data points are focusable with keyboard arrow navigation. All animations respect prefers-reduced-motion. Categorical palettes pass WCAG AA contrast.',
        image: '/images/case-studies/viskit-accessibility.webp', // alt: "Screen reader output showing the hidden data table generated by VisKit alongside the visual chart, demonstrating accessible data representation"
      },
      {
        title: '5 Tooltip Variants',
        description:
          'Default, Minimal, Compact, Gradient, and Outline tooltip styles — each driven by theme tokens. Tooltips are positioned with @floating-ui/react for collision detection and follow the cursor across all chart types.',
        image: '/images/case-studies/viskit-tooltips.webp', // alt: "Five tooltip variants displayed on a line chart — default with card shadow, minimal with no border, compact single-line, gradient background, and outline-only style"
      },
    ],
    gallery: [
      {
        image: '/images/case-studies/viskit-hero-dashboard.webp', // alt: "VisKit demo dashboard — multiple charts arranged in a grid including line, bar, pie, radar, and sparkline, rendered in the Midnight dark theme"
        caption:
          'Demo dashboard — multiple chart types composed together in the Midnight theme',
      },
      {
        image: '/images/case-studies/viskit-line-series.webp', // alt: "VisKit LineSeries showing monthly revenue data with monotone curve, interactive dots, and a gradient tooltip on hover"
        caption:
          'LineSeries with monotone curve, interactive dots, and gradient tooltip variant',
      },
      {
        image: '/images/case-studies/viskit-stacked-bar.webp', // alt: "VisKit StackedBarSeries showing revenue, cost, and profit stacked by month with hover highlight on the April segment"
        caption:
          'StackedBarSeries — three fields stacked with hover-driven segment highlighting',
      },
      {
        image: '/images/case-studies/viskit-radar-polar.webp', // alt: "VisKit RadarSeries showing two overlapping team performance polygons across six dimensions, with PolarAreaSeries nightingale chart beside it"
        caption:
          'RadarSeries multi-team comparison and PolarAreaSeries nightingale chart',
      },
      {
        image: '/images/case-studies/viskit-heatmap-histogram.webp', // alt: "VisKit Heatmap showing day-by-hour activity matrix in blue sequential colors, alongside a Histogram showing score distribution with 10 bins"
        caption:
          'Heatmap day×hour activity matrix and Histogram frequency distribution',
      },
      {
        image: '/images/case-studies/viskit-monorepo-build.webp', // alt: "Terminal output showing Turborepo building all 7 packages in topological order — core, themes, animations in parallel, then charts, react, demo, and storybook — completing in 11 seconds"
        caption:
          'Turborepo parallel build — 7 packages in topological order, 11s total',
      },
    ],
    impact: [
      {
        metric: 'Chart Types Shipped',
        value: '40+',
        description:
          'Production-ready series across cartesian, radial, specialized, and composition categories',
      },
      {
        metric: 'Test Coverage',
        value: '60',
        description:
          'Unit and component tests covering scales, transforms, rendering, keyboard navigation, and ARIA',
      },
      {
        metric: 'Build Time',
        value: '11s',
        description:
          'Full 7-package monorepo build with ESM + CJS + DTS via Turborepo parallel execution',
      },
      {
        metric: 'Bundle (charts)',
        value: '100KB',
        description:
          'ESM output for @viskit/charts — all 19 series, 6 primitives, and Canvas renderer',
      },
      {
        metric: 'Storybook Stories',
        value: '42+',
        description:
          'Interactive stories with live controls, autodocs, and multiple visual scenarios per chart',
      },
      {
        metric: 'Theme Tokens',
        value: '60+',
        description:
          'Design tokens spanning color, typography, surface, spacing, and animation — zero hardcoded values',
      },
    ],
    techStack: {
      Core: [
        'React 19',
        'TypeScript 6 (strict)',
        'D3 (scale, shape, array)',
        '@react-spring/web',
        '@floating-ui/react',
      ],
      Build: ['pnpm Workspaces', 'Turborepo', 'tsup (esbuild)', 'Vite 8'],
      Testing: ['Vitest', '@testing-library/react'],
      Documentation: ['Storybook 8', 'Autodocs', 'Chromatic (planned)'],
    },
    timeline: [
      {
        phase: 'Architecture & Monorepo Setup',
        duration: '1 week',
        description:
          'Designed the 6-package monorepo structure, configured pnpm workspaces, Turborepo pipeline, tsup builds, and shared TypeScript/ESLint configs.',
      },
      {
        phase: 'Core Package & Context System',
        duration: '1 week',
        description:
          'Built the Chart component, three-layer context system (Chart/Cartesian/Polar), auto-scale detection, responsive sizing, auto-margin calculation, and all shared types.',
      },
      {
        phase: 'Phase 1 — Foundations',
        duration: '2 weeks',
        description:
          'Implemented 5 chart series (Line, Bar, Area, Scatter, Pie), 6 primitives (XAxis, YAxis, CartesianGrid, Legend, Tooltip, TooltipContent), accessibility layer, and 36 tests.',
      },
      {
        phase: 'Theme & Animation Systems',
        duration: '1 week',
        description:
          'Designed the VisualizationTokens interface, built 4 theme presets (Midnight, Daylight, Aurora, Corporate), ThemeProvider with runtime switching, spring presets, and reduced-motion support.',
      },
      {
        phase: 'Phase 2 — Advanced Charts',
        duration: '2 weeks',
        description:
          'Shipped 14 additional chart types (stacked/grouped/horizontal bar, multi-line, stacked area, bubble, lollipop, dumbbell, histogram, radar, radial bar, polar area, heatmap, sparkline) and the Canvas renderer.',
      },
      {
        phase: 'Storybook & Polish',
        duration: '1 week',
        description:
          'Created 21 interactive stories with live controls, 5 tooltip variants, autodocs with import blocks, and resolved all TypeScript errors across the catalogue.',
      },
    ],
    learnings: [
      'A three-layer context system (Chart → Cartesian/Polar) cleanly separates concerns, but you must document which context each series reads from — otherwise contributors reach for the wrong hook and get cryptic "must be used inside" errors.',
      "Generic datum flow (keyof TDatum) delivers excellent DX, but Storybook's StoryObj type erases generics to {}. Every story needs a manually defined args interface to restore type safety — a pattern worth documenting in a contributing guide.",
      'D3 scales return number | undefined, and TypeScript strict mode rightfully flags every usage. Wrapping scales in a typed ScaleResult interface with guaranteed return types eliminated hundreds of null-check cascades across series components.',
      'Canvas rendering inside SVG via foreignObject works well for data visualization, but hit-testing must be implemented manually — the browser gives you no DOM events for canvas-drawn shapes, so a spatial index or brute-force closest-point search is necessary.',
      "tsup with esbuild produces fast builds, but DTS generation (powered by tsc under the hood) is the bottleneck — it accounts for ~80% of each package's build time. Structuring types to avoid circular references keeps DTS fast.",
      'Designing a token interface before writing any component CSS is the single highest-leverage decision for a design system. When every component reads from tokens, theme switching, dark mode, and brand customization become runtime props, not refactoring projects.',
    ],
    links: {
      live: '', // Storybook deployment URL when ready
      github: 'https://github.com/Kemi-Oluwadahunsi/VisKit-Charting-Library',
    },
  },
  'readyui-react': {
    id: 'readyui-react',
    title: 'ReadyUI React',
    badge: 'Open-Source Component Library',
    company: 'Independent Project',
    period: '2025 – 2026',
    heroImage: '/images/ReadyUI-hero.webp', // alt: "ReadyUI React documentation site hero — component grid overview with dark mode toggle and sidebar navigation"
    summary:
      'Designed, engineered, and published a production-grade React UI component library with 50+ fully configurable components, a pre-built CSS bundle for zero-config adoption, and a comprehensive interactive documentation site — all open-sourced on npm as `readyui-react`.',
    problem: {
      title: 'The Challenge',
      description:
        'Most open-source React component libraries either lock you into a specific design system, require heavy configuration to get started, or lack the depth of components needed for real-world dashboards and SaaS interfaces. Developers frequently end up installing 5–6 separate packages — one for modals, another for data tables, another for drag-and-drop — each with its own styling approach and bundle overhead.',
      painPoints: [
        'Existing libraries like MUI or Chakra impose opinionated design tokens that clash with custom brand systems and add significant bundle weight',
        'Tailwind-based alternatives (Headless UI, Radix) provide unstyled primitives that still require hours of custom styling for each component',
        'Complex interactive components (Kanban boards, image croppers, virtual lists, command palettes) are rarely included in general-purpose libraries, forcing developers to find and integrate standalone packages',
        'Many libraries require a full Tailwind CSS installation in the consumer project, adding friction for teams not already using Tailwind',
        'Documentation for smaller libraries is often sparse — code snippets without live previews, missing prop descriptions, and no variant showcases',
      ],
    },
    solution: {
      title: 'The Approach',
      description:
        'I built ReadyUI as a single, tree-shakeable package that covers layout, forms, data display, feedback, media, and utility components — all styled with Tailwind CSS v4 utilities but shipping a pre-built CSS bundle so consumers need zero Tailwind configuration. Every component follows a consistent API pattern: sensible defaults, full prop customization, dark mode out of the box, and ARIA-compliant accessibility.',
      keyDecisions: [
        {
          decision: 'Pre-Built CSS + Optional Tailwind Scanning',
          rationale:
            'The library ships a minified `dist/styles.css` (~102 KB) containing all Tailwind utilities and custom keyframe animations. Projects without Tailwind import one CSS file and are done. Projects already using Tailwind v4 can skip the stylesheet and add a `@source` directive to scan the library — giving them full control over purging and theming.',
        },
        {
          decision: 'Dual ES Module + CommonJS Builds',
          rationale:
            "Vite's library mode produces both `readyui-react.es.js` and `readyui-react.cjs.js` with `sideEffects: false`, enabling full tree-shaking in modern bundlers while maintaining compatibility with older Node.js toolchains and SSR setups.",
        },
        {
          decision: 'CSS-Only Animations (Zero Runtime Dependency)',
          rationale:
            "All animations — toast slide-ins, spinner rotations, timeline fades, accordion expansions — use CSS `@keyframes` instead of Framer Motion or react-spring. This keeps the bundle lean and avoids JavaScript-driven animation overhead. A runtime fallback (`injectRuiStyles.js`) auto-injects keyframes only if the pre-built stylesheet isn't detected.",
        },
        {
          decision: 'Universal Dark Mode via CSS Class Strategy',
          rationale:
            "Every component supports dark mode through Tailwind's `dark:` variant, toggled by a `.dark` class on the root element. The included `DarkModeProvider` context and `DarkModeToggle` component handle persistence (localStorage) and system-preference detection — but consumers can also wire their own theme system.",
        },
        {
          decision: 'Interactive Documentation Site with Live Previews',
          rationale:
            'Built a dedicated docs site (Vite + React + React Router v7) that imports each component directly from `readyui-react` and renders it live inside a Preview panel alongside the source code. Every prop, variant, and size is demonstrated with a working example — not just a static code snippet.',
        },
      ],
    },
    features: [
      {
        title: 'Layout & Navigation Components',
        description:
          'Accordion, Breadcrumbs, Drawer, Tabs, Stepper, KanbanBoard (drag-and-drop), ResizableSidebar, ScrollAwareNavbar, FloatingActionButton, TimeLine, and ProgressBarSteps — all with keyboard navigation, ARIA attributes, and smooth CSS transitions.',
        image: '/images/case-studies/readyui-layout.webp', // alt: "ReadyUI layout components — Accordion expanded with multiple panels, KanbanBoard with draggable columns, and Tabs with animated indicator"
      },
      {
        title: 'Inputs & Form Components',
        description:
          'DatePicker (single/range/multi), ColorPicker (HSL/RGB/HEX), FileUploader (drag-and-drop with preview), OTPInput, PasswordStrength meter, RangeSlider (single & dual handle), RatingInput (half-star support), Select (searchable multi-select), and ToggleSwitch — all with controlled/uncontrolled modes and validation-ready APIs.',
        image: '/images/case-studies/readyui-forms.webp', // alt: "ReadyUI form components — DatePicker calendar, ColorPicker with saturation pad, RangeSlider with dual handles, and FileUploader with image previews"
      },
      {
        title: 'Data Display & Feedback',
        description:
          'DataTable (sortable, filterable, paginated), TreeView (hierarchical expand/collapse), VirtualList (10K+ items), 15 Card variants (Profile, Product, Glass, Interactive flip), Skeleton loading, Spinner (13 animation variants), Toast notification system, Modal, ConfirmDialog, Popover, Tooltip, and NotificationBell dropdown.',
        image: '/images/case-studies/readyui-data.webp', // alt: "ReadyUI data components — DataTable with search and pagination, Card variants grid, Skeleton loading states, and Toast notification stack"
      },
      {
        title: 'Interactive Documentation Site',
        description:
          'A full documentation site built with Vite and React Router v7, featuring live component previews, copy-to-clipboard code blocks, prop API tables with type/default/required indicators, dark mode toggle, responsive sidebar navigation, and lazy-loaded routes for fast page loads.',
        image: '/images/case-studies/readyui-docs.webp', // alt: "ReadyUI documentation site — Accordion page showing live Preview panel, Code tab with syntax highlighting, and Props table with dark badges"
      },
    ],
    gallery: [
      {
        image: '/images/case-studies/readyui-homepage.webp',
        caption:
          'Documentation homepage — component category grid with search, quick-start guide, and installation instructions',
        // alt: "ReadyUI docs homepage showing the component grid organized by category with a search bar and getting started section"
      },
      {
        image: '/images/case-studies/readyui-accordion-page.webp',
        caption:
          'Accordion documentation — live preview of all three variants (default, bordered, separated) with interactive toggle examples',
        // alt: "ReadyUI Accordion documentation page with live Preview showing bordered variant expanded and Code tab with syntax-highlighted JSX"
      },
      {
        image: '/images/case-studies/readyui-cards-page.webp',
        caption:
          'Cards documentation — showcasing 15 card variants including ProfileCard, ProductCard, GlassCard, and InteractiveCard with flip animation',
        // alt: "ReadyUI Cards documentation page displaying multiple card variants with live previews and usage code for each"
      },
      {
        image: '/images/case-studies/readyui-dark-mode.webp',
        caption:
          'Full dark mode support — every component adapts seamlessly between light and dark themes via Tailwind dark: variant',
        // alt: "ReadyUI documentation site in dark mode showing DataTable, Modal, and ColorPicker components with dark backgrounds and adjusted contrast"
      },
      {
        image: '/images/case-studies/readyui-forms-demo.webp',
        caption:
          'Form components — DatePicker with range selection, ColorPicker with alpha channel, and RangeSlider with custom formatting',
        // alt: "ReadyUI form component demos showing DatePicker calendar open with range selection highlighted, ColorPicker with alpha slider, and RangeSlider displaying currency format"
      },
      {
        image: '/images/case-studies/readyui-npm.webp',
        caption:
          'Published on npm as readyui-react v1.0.0 — tree-shakeable ES + CJS builds with pre-built CSS bundle',
        // alt: "npm package page for readyui-react showing version 1.0.0, weekly downloads, bundle size, and installation command"
      },
    ],
    impact: [
      {
        metric: 'Components Shipped',
        value: '50+',
        description:
          'Production-ready components across 6 categories — layout, forms, data, feedback, media, utilities',
      },
      {
        metric: 'Zero-Config Setup',
        value: '2 Lines',
        description:
          'One import + one stylesheet — no Tailwind installation, no theme config, no build changes required',
      },
      {
        metric: 'Initial Page Load',
        value: '210 KB',
        description:
          'Code-split docs site loads only the core shell; each component page is a 5–14 KB lazy chunk',
      },
      {
        metric: 'Docs Pages',
        value: '51',
        description:
          'Interactive documentation pages with live previews, code examples, and full prop API tables',
      },
      {
        metric: 'Animation Runtime',
        value: '0 KB',
        description:
          'All animations use pure CSS keyframes — no Framer Motion, no react-spring, no JS animation overhead',
      },
      {
        metric: 'Accessibility',
        value: 'ARIA + KB',
        description:
          'ARIA roles, keyboard navigation, focus traps, and screen-reader labels across all components',
      },
    ],
    techStack: {
      Library: [
        'React 18',
        'Tailwind CSS v4',
        'CSS Keyframes',
        'ARIA / Accessibility',
      ],
      'Build & Publish': [
        'Vite (Library Mode)',
        'Rollup',
        'npm',
        'ES Modules + CJS',
      ],
      'Documentation Site': [
        'React 18',
        'React Router v7',
        'Tailwind CSS v4',
        'Prism.js',
        'Vite',
      ],
      Tooling: ['ESLint', 'Vercel', 'GitHub Actions', 'Git'],
    },
    timeline: [
      {
        phase: 'Architecture & API Design',
        duration: '1 week',
        description:
          'Defined the component API contract — consistent prop patterns (size, variant, className), controlled/uncontrolled modes, and the dual-build (ES + CJS) + pre-built CSS strategy.',
      },
      {
        phase: 'Core Components (Layout & Forms)',
        duration: '3 weeks',
        description:
          'Built Accordion, Tabs, Modal, Drawer, Stepper, DatePicker, Select, SearchBar, ToggleSwitch, and form input components with full keyboard navigation and ARIA support.',
      },
      {
        phase: 'Advanced Components',
        duration: '3 weeks',
        description:
          'Developed KanbanBoard (drag-and-drop), VirtualList (windowed rendering), DataTable (sort/filter/paginate), ImageCropper (zoom + crop), CommandPalette, InfiniteScroll, SortableList, and 15 Card variants.',
      },
      {
        phase: 'Dark Mode & Animations',
        duration: '1 week',
        description:
          'Implemented universal dark mode via DarkModeProvider context. Created CSS keyframe animations for toasts, spinners, timelines, and accordions. Built the runtime style injector fallback.',
      },
      {
        phase: 'Library Build & npm Publish',
        duration: '1 week',
        description:
          'Configured Vite library mode for dual ES/CJS output. Built pre-compiled CSS bundle with Tailwind CLI. Published readyui-react v1.0.0 to npm with proper exports, sideEffects: false, and peer dependency declarations.',
      },
      {
        phase: 'Documentation Site',
        duration: '2 weeks',
        description:
          'Scaffolded docs site with Vite + React Router v7. Created 51 interactive documentation pages with live Preview components, syntax-highlighted code blocks, and comprehensive prop tables. Added code-splitting with React.lazy for optimal loading.',
      },
    ],
    learnings: [
      'Shipping a pre-built CSS bundle alongside the JS components dramatically lowers adoption friction — developers can use the library in 2 lines (import + stylesheet) without touching their build config, while Tailwind users still get full theme control via @source scanning.',
      'The `sideEffects: false` flag in package.json is critical for tree-shaking. Without it, bundlers assume every module has side effects and include the entire library even if only one component is imported.',
      "CSS-only animations (keyframes) outperform JS animation libraries for UI components. Toast slide-ins, spinner rotations, and accordion transitions don't need JavaScript orchestration — and removing the Framer Motion dependency saved ~45 KB from the bundle.",
      'Building the documentation site with live component rendering (importing directly from the published package) catches API inconsistencies immediately — if a prop name is wrong or a default changes, the docs break visibly instead of silently drifting out of sync.',
      'React.lazy code-splitting reduced the initial JS payload from 1,026 KB to 210 KB (core) + on-demand page chunks of 5–14 KB each, making the docs site significantly faster on first load.',
    ],
    links: {
      live: 'https://readyui-docs.vercel.app',
      github:
        'https://github.com/Kemi-Oluwadahunsi/ReadyToUse-React-Components',
      npm: 'https://www.npmjs.com/package/readyui-react',
    },
  },
  'timesheet-automation-etiqa': {
    id: 'timesheet-automation-etiqa',
    title: 'Timesheet Automation — Etiqa',
    badge: 'Enterprise Micro-Frontend',
    company: 'Etiqa (via ReadyUI)',
    period: '2025 – 2026',
    heroImage: '/images/timesheet-automation-hero.webp', // alt: "Full-width screenshot of the Timesheet Automation app showing the employee form, calendar grid, and leave balance tracker"
    summary:
      'Designed and engineered a production micro-frontend that replaces manual PDF form-filling for 600+ Etiqa contract staff. The app is embedded inside an Angular portal (ConnecTiQa) via Webpack 5 Module Federation and handles the full timesheet lifecycle — from employee details and leave management to PDF generation using the official company template.',
    problem: {
      title: 'The Challenge',
      description:
        'Etiqa contract staff were manually filling a multi-page PDF timesheet every month — entering work hours, leave days, overtime, and signatures by hand. The process was error-prone, time-consuming, and completely disconnected from any leave tracking or validation. The existing Angular portal (ConnecTiQa) needed a self-contained module that could be loaded remotely without a full platform rewrite.',
      painPoints: [
        'Monthly timesheets were filled manually in PDF editors, leading to frequent calculation errors in overtime and leave totals',
        'No centralized leave tracking — staff counted remaining leave days from memory or personal spreadsheets, often exceeding entitlements unknowingly',
        'Malaysian public holidays vary by state and year; staff had to manually look up and mark each holiday on the timesheet',
        'The existing Angular portal could not justify a full rewrite, so the solution had to integrate seamlessly as a remote module without disrupting the host application',
        'PDF templates had to match the exact official Etiqa format — no room for layout deviation or custom templates',
      ],
    },
    solution: {
      title: 'The Approach',
      description:
        'I built the app as a standalone React 19 micro-frontend exposed via Webpack 5 Module Federation. The Angular host loads it at runtime via a remote entry, passing logged-in user details as props. Internally, the app uses a centralized reducer-based state with localStorage persistence, so staff can close the browser and resume where they left off. The PDF generation layer uses pdf-lib to fill the exact official template — the PDF is embedded in the JS bundle at build time via webpack asset/inline to eliminate CORS and path issues in the Module Federation context.',
      keyDecisions: [
        {
          decision: 'Webpack 5 Module Federation as Integration Strategy',
          rationale:
            'The Angular host (ConnecTiQa) loads the React app at runtime via remoteEntry.js, sharing only React and ReactDOM as singletons. This gives full development independence — the timesheet team ships on its own release cycle without touching the host codebase.',
        },
        {
          decision: 'PDF Template Embedded via Webpack asset/inline',
          rationale:
            'The official Etiqa PDF template is inlined as a base64 data URL at build time, so pdf-lib can fill it without any network request. This eliminated CORS failures and CDN path resolution issues that surfaced when the app ran inside the Angular host on a different origin.',
        },
        {
          decision: 'Reducer-Based State with localStorage Persistence',
          rationale:
            'All employee data, work hours, leave selections, overtime, and signature are managed in a single useReducer and persisted to localStorage on every dispatch. Staff can close the tab mid-month and resume without data loss — critical for a form that takes 10–15 minutes to complete.',
        },
        {
          decision: 'date-holidays for Malaysian Public Holiday Detection',
          rationale:
            'Rather than hardcoding holidays, the app uses the date-holidays library configured for Malaysia (federal holidays). Weekend observance replacement rules are handled automatically, and staff can override or add custom public holidays when needed.',
        },
      ],
    },
    features: [
      {
        title: 'Interactive Calendar with Leave Management',
        description:
          'A full monthly calendar grid where staff click any day to mark Annual Leave (AL), Medical Leave (ML), or Flexible Time Off (FTO) with half-day AM/PM support. Public holidays are auto-detected and highlighted with tooltip names. Custom work times can be set per day.',
        image: '/images/case-studies/timesheet-calendar.webp', // alt: "Calendar grid showing work days in blue, annual leave in green, public holidays in red with tooltip showing holiday name, and a half-day ML marked on the 15th"
      },
      {
        title: 'PDF Generation & Preview',
        description:
          'The app fills the official Etiqa timesheet PDF template using pdf-lib — placing employee details, daily start/end times, leave codes, overtime totals, and the digital signature in the exact positions required. Staff preview the filled PDF before downloading.',
        image: '/images/case-studies/timesheet-pdf-preview.webp', // alt: "Side-by-side view of the PDF preview showing the filled official Etiqa timesheet with employee details, daily hours, leave summary, and digital signature"
      },
      {
        title: 'Leave Balance Tracker',
        description:
          'Cumulative leave balance display showing entitlement, used (initial + monthly), and remaining for each leave type. Balances can go negative with red warnings and toast notifications when entitlements are exceeded — preventing silent over-use.',
        image: '/images/case-studies/timesheet-leave-balance.webp', // alt: "Leave balance tracker showing AL: 21 entitled, 18 used, 3 remaining; ML: 30 entitled, 2 used, 28 remaining; with a red warning badge on FTO showing -1 remaining"
      },
      {
        title: 'Overtime Calculation Engine',
        description:
          'Automatic overtime calculation with three rate categories — normal day OT, rest day OT, and public holiday OT. Hours beyond the standard 9-hour workday are computed from start/end times and displayed per day and as monthly totals on the timesheet.',
        image: '/images/case-studies/timesheet-overtime.webp', // alt: "Day editor modal showing overtime fields for normal day (2.0 hrs), rest day (0 hrs), and public holiday (0 hrs) with the calculated total"
      },
      {
        title: 'Digital Signature Upload',
        description:
          'Staff upload or capture their signature image (max 2MB), which is scaled to fit the official template signature box and embedded directly into the generated PDF.',
        image: '/images/case-studies/timesheet-signature.webp', // alt: "Signature upload section showing a preview of the uploaded signature image with a 'Change Signature' button and file size indicator"
      },
      {
        title: 'Module Federation Integration',
        description:
          'The app is exposed as a remote module via Webpack 5 Module Federation. The Angular host loads it at runtime, passing the logged-in user\'s employee ID, name, and project details as props to prefill the form — zero manual entry for known fields.',
        image: '/images/case-studies/timesheet-connectiqa.webp', // alt: "The Timesheet Automation app rendered inside the ConnecTiQa Angular portal, showing the sidebar navigation of the host app with the timesheet form loaded in the main content area"
      },
    ],
    gallery: [
      {
        image: '/images/case-studies/timesheet-employee-form.webp',
        caption: 'Employee details form — ID, name, client, project, reporting manager, month/year selection',
        // alt: "Employee details form with fields for Employee ID, Name, Client Name, Project Name, Reporting Manager, Location, Month dropdown, and Year dropdown"
      },
      {
        image: '/images/case-studies/timesheet-work-hours.webp',
        caption: 'Work hours configuration with 12/24-hour format toggle and custom time picker',
        // alt: "Work hours form showing Start Time (8:45 AM) and End Time (5:45 PM) buttons with a 12h/24h toggle switch"
      },
      {
        image: '/images/case-studies/timesheet-calendar-full.webp',
        caption: 'Full calendar view — weekends greyed out, public holidays in red, leave days color-coded by type',
        // alt: "Monthly calendar grid for April 2026 with weekends in grey, Hari Raya Aidilfitri highlighted in red, three AL days in green, and one half-day ML in orange"
      },
      {
        image: '/images/case-studies/timesheet-day-editor.webp',
        caption: 'Day editor — set leave type, half-day period, custom work times, and overtime per day',
        // alt: "Day editor dialog for April 14 showing leave type dropdown (AL selected), half-day toggle, custom start/end time inputs, and overtime fields"
      },
      {
        image: '/images/case-studies/timesheet-pdf-filled.webp',
        caption: 'Generated PDF — official Etiqa template filled with all timesheet data and digital signature',
        // alt: "The official Etiqa timesheet PDF fully filled with employee name, daily work hours in two columns, leave codes, overtime totals at the bottom, and a digital signature"
      },
      {
        image: '/images/case-studies/timesheet-mobile.webp',
        caption: 'Responsive mobile view — form sections stack vertically with touch-friendly calendar cells',
        // alt: "Mobile view of the timesheet app showing stacked form sections and a compact calendar grid with larger touch targets"
      },
    ],
    impact: [
      { metric: 'Time Saved per Staff', value: '~70%', description: 'Reduction in monthly timesheet preparation time vs manual PDF filling' },
      { metric: 'Calculation Errors', value: '0', description: 'Automated overtime and leave calculations eliminate manual arithmetic mistakes' },
      { metric: 'Test Coverage', value: '14 tests', description: 'Vitest unit tests covering time formatting, OT calculation, and leave totals' },
      { metric: 'Environment Deployments', value: '3', description: 'SIT, UAT, and Production builds with environment-specific configurations' },
      { metric: 'Bundle Strategy', value: 'Inline PDF', description: 'Official template embedded in JS bundle — zero CORS issues, zero extra network requests' },
      { metric: 'Host Integration', value: 'Zero-touch', description: 'Angular host loads the module at runtime with no build-time coupling' },
    ],
    techStack: {
      Frontend: ['React 19', 'TypeScript 5', 'Tailwind CSS', 'shadcn/ui (Radix UI)', 'Lucide Icons', 'Framer Motion'],
      'PDF & Data': ['pdf-lib', 'date-holidays (Malaysia)', 'html2canvas', 'React Hook Form', 'Zod'],
      'Build & Integration': ['Webpack 5', 'Module Federation', 'ts-loader', 'env-cmd', 'PostCSS'],
      Testing: ['Vitest'],
      Deployment: ['Azure Blob Storage', 'Multi-environment (SIT / UAT / Production)'],
    },
    timeline: [
      { phase: 'Discovery & Requirements', duration: '1 week', description: 'Audited the existing manual PDF workflow, mapped the official template fields, defined leave entitlement rules (AL: 21, ML: 30, FTO: 0), and documented the Module Federation integration contract with the Angular host team.' },
      { phase: 'Core Architecture & State Management', duration: '1 week', description: 'Set up Webpack 5 with Module Federation, built the reducer-based state with localStorage persistence, configured the mount/unmount lifecycle for host integration, and established the project structure.' },
      { phase: 'Form & Calendar Development', duration: '2 weeks', description: 'Built employee details form, work hours with 12/24h toggle, signature upload, interactive calendar with day editor, leave type selection with half-day support, and Malaysian public holiday integration.' },
      { phase: 'PDF Generation & Leave Tracking', duration: '1.5 weeks', description: 'Implemented pdf-lib template filling with exact field positioning, digital signature embedding, overtime calculation engine (normal/rest/PH rates), and cumulative leave balance tracker with negative-balance warnings.' },
      { phase: 'Environment & Deployment Pipeline', duration: '1 week', description: 'Configured SIT/UAT/Production build scripts with env-cmd, resolved CORS issues by embedding the PDF template via webpack asset/inline, set up Azure Blob Storage hosting, and ran UAT with 20 consolidated test cases.' },
      { phase: 'UAT, Bug Fixes & Production Launch', duration: '1 week', description: 'Executed 70 UAT test cases, fixed time format display, leave balance clamping, toast warnings, calendar reset, and deployed to production ConnecTiQa portal.' },
    ],
    learnings: [
      'Module Federation with cross-framework hosts (React inside Angular) works reliably when you share only the bare minimum (React + ReactDOM as singletons) and use a mount/unmount contract rather than framework-specific bindings.',
      'Embedding binary assets (PDF templates) via webpack asset/inline is the most robust strategy in Module Federation — it eliminates an entire class of CORS and public path resolution bugs that surface only in production when the host and remote are on different origins.',
      'Native HTML `<input type="time">` always renders in the browser/OS locale regardless of app state — to show a custom 12/24-hour format, you need to replace the visible input with a styled button and trigger the native picker programmatically via `.showPicker()`.',
      'Leave balance calculations should never clamp to zero with `Math.max(0, ...)` — allowing negative values with clear visual warnings gives staff and managers accurate visibility into over-use rather than silently hiding the problem.',
      'localStorage persistence in a form-heavy app is non-negotiable for enterprise users who get interrupted mid-task. Saving on every dispatch (not just on unmount) prevents data loss from browser crashes and forced tab closures.',
    ],
    links: {
      live: 'https://www-gold.etiqapartner.com.my/timesheet-automation',
      github: '#', // Private repo due to company policies
    },
  },
}
