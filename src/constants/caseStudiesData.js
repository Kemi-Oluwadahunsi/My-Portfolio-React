// ────────────────────────────────────────────
// Case Study Data
// ────────────────────────────────────────────

export const caseStudies = {
  'roots-to-bloom': {
    id: 'roots-to-bloom',
    title: 'Roots to Bloom Beauty',
    badge: 'Full-Stack E-Commerce Platform',
    company: 'Independent Project',
    period: '2024–2025',
    heroImage: '/images/RtB.webp',
    summary:
      'Engineered a premium, multi-currency e-commerce platform for an organic beauty brand, handling 50+ SKUs with variant-level pricing, international payments via Stripe, and real-time inventory synchronization. Built a comprehensive admin dashboard with product management, order fulfillment, analytics, and Cloudinary image delivery. Deployed on Vercel with serverless payment webhook handling and Firebase Firestore for structured data, supporting customers across 10+ currencies.',

    problem: {
      title: 'The Challenge',
      description:
        'The founder needed a bespoke digital experience that educates customers about natural ingredients, builds trust through transparency, enables international purchases with localized pricing, and converts browsers into loyal repeat buyers—all while maintaining cohesive brand identity and operational efficiency. Off-the-shelf solutions (Shopify, WooCommerce) lacked the flexibility for ingredient-level product comparison, multi-currency support without transaction fees, and custom admin workflows.',
      painPoints: [
        'No off-the-shelf theme could support ingredient-level product comparison, size-variant pricing, and a unified product catalogue across multiple currencies',
        'Admin workflows for managing 50+ SKUs with variant pricing (100ml/150ml/200ml tiers), botanical imagery, and ingredient metadata were scattered across spreadsheets and manual uploads',
        'The brand lacked a digital presence that matched the premium, handcrafted feel of physical products—generic Shopify themes felt impersonal',
        'Customer education about natural skincare benefits and ingredient compatibility needed to be embedded in the shopping journey, not siloed in static blog content',
        'International expansion required real-time currency conversion (MYR, USD, EUR, GBP, AUD, SGD, etc.) without manual price updates',
        'Payment processing in Malaysia had limited gateway options; required a flexible integration that supported local and international cards',
        'Image management at scale (50+ products × 4–6 images each) needed automated optimization and CDN delivery without bloating the application',
      ],
    },

    solution: {
      title: 'The Approach',
      description:
        'I architected the platform as a modular React SPA with TypeScript, deployed on Vercel, backed by Firebase Firestore for structured product/ingredient data and user profiles. Payment processing is handled server-side via Vercel serverless functions, securing Stripe secret keys and webhook signature validation. The data model supports variant-level pricing, real-time cart synchronization, multi-currency support with live exchange rates, and a comprehensive admin dashboard for product CRUD, order management, analytics, and image delivery via Cloudinary.',
      keyDecisions: [
        {
          decision: 'Vercel Serverless Functions for Payment Processing',
          rationale:
            'Created dedicated serverless endpoints (/api/create-checkout, /api/webhook) to handle Stripe checkout session creation and webhook verification server-side. Keeps Stripe secret keys secure (never exposed to client), validates payment signatures via HMAC-SHA512, and persists order data to Firestore atomically. Eliminates need for separate backend infrastructure while maintaining PCI compliance.',
        },
        {
          decision: 'Firestore + Realtime Cart Synchronization',
          rationale:
            'Structured products, ingredients, and orders in Firestore collections with indexed queries (orderBy, filtering) for fast retrieval. Implemented dual-mode cart persistence: unauthenticated users store cart in localStorage with sessionId backup to Firestore; authenticated users sync cart via useReducer + onSnapshot listeners. Real-time listeners (onSnapshot) allow users to see inventory updates and price changes across devices instantly without polling.',
        },
        {
          decision: 'Multi-Currency Context + Live Exchange Rates',
          rationale:
            'Built a CurrencyContext that preloads exchange rates on app initialization and caches them to avoid rate-fetch delays. Users select preferred currency (MYR, USD, etc.) which persists in their profile. Stripe checkout automatically converts prices to the selected currency. This eliminates manual price updates and supports international expansion without code changes.',
        },
        {
          decision: 'Cloudinary for Image Management at Scale',
          rationale:
            'Migrated from Firebase Storage to Cloudinary for automatic image optimization, responsive delivery, and CDN acceleration. Admin UI (CloudinaryImageUpload) allows batch uploads with AVIF/WebP conversion. Legacy image URLs migrated via migrateImagesToCloudinary utility. Reduces application bundle size and improves Core Web Vitals scores.',
        },
        {
          decision: 'Role-Based Admin Access + Password Guard',
          rationale:
            'Implemented AdminPasswordGuard component requiring a password for admin routes, with plans to upgrade to Firestore custom claims for role-based access control. Current implementation prevents unauthorized access via URL manipulation while keeping the barrier low for a small team.',
        },
        {
          decision: 'React Context API + useReducer for State Management',
          rationale:
            'Chose Context + Hooks over Redux/Zustand to minimize dependencies. Implemented CartContext with useReducer pattern for predictable state transitions (ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, SET_CART). Wrapped App with multiple context providers (Auth, Cart, Product, Currency, Theme, Toast) at root level for clean prop threading.',
        },
        {
          decision: 'React Hook Form + Yup Validation',
          rationale:
            'Lightweight form handling with minimal re-renders. Yup schemas provide runtime type validation and custom error messages. Used across login/register, product forms (admin), checkout, and contact pages—reduces boilerplate and ensures consistent validation logic.',
        },
        {
          decision: 'Framer Motion for Brand-Aligned Animations',
          rationale:
            'Choreographed page transitions with AnimatePresence, scroll-triggered reveals with react-intersection-observer, and micro-interactions on product cards. Animations run 60fps on mobile with attention to motion budget—no layout shifts or long paint times. Enhances the premium, thoughtful feel of the brand.',
        },
      ],
    },

    features: [
      {
        title: 'Product Variants with Size-Based Pricing',
        description:
          'Each product supports multiple size tiers (100ml, 150ml, 200ml) with independent pricing. Customers select size at point of sale, cart correctly reflects per-variant pricing and SKU tracking. Admin dashboard allows variant inventory management and easy price adjustments without affecting other sizes. Example: Botanic Hydrating Hair Growth Butter ranges from 19–35 MYR across sizes.',
        images: [
          '/images/case-studies/rtb-product-variants.webp',
          '/images/case-studies/rtb-product-size-selector.webp',
          '/images/case-studies/rtb-admin-variant-management.webp',
          '/images/case-studies/rtb-product-pricing-tiers.webp',
        ],
      },
      {
        title: 'Ingredient Comparison Engine',
        description:
          'Customers can compare up to 3 products side-by-side with detailed ingredient breakdowns, highlighting shared botanicals, key benefits, and skin-type compatibility. Engine queries Firestore ingredients collection and denormalizes product-ingredient relationships for fast rendering. Interactive badges show ingredient sources (Kokum Butter, Rosemary Oil, etc.) and their benefits (hydration, growth stimulation).',
        images: [
          '/images/case-studies/rtb-comparison.webp',
          '/images/case-studies/rtb-comparison-table.webp',
          '/images/case-studies/rtb-ingredient-badges.webp',
          '/images/case-studies/rtb-compatibility-view.webp',
        ],
      },
      {
        title: 'Multi-Currency Checkout & Stripe Integration',
        description:
          'Global payment processing via Stripe with support for 10+ currencies (MYR, USD, EUR, GBP, AUD, SGD, JPY, INR, CNY, CAD, NGN). Real-time exchange rates preloaded on app init. Checkout session created server-side via Vercel function with tax calculation (5%), shipping, and discount support. Webhook handler persists order to Firestore on payment success, triggering order confirmation emails via EmailJS.',
        images: [
          '/images/case-studies/rtb-checkout.webp',
          '/images/case-studies/rtb-currency-selector.webp',
          '/images/case-studies/rtb-stripe-checkout-modal.webp',
          '/images/case-studies/rtb-payment-success.webp',
        ],
      },
      {
        title: 'Admin Dashboard with Analytics',
        description:
          'Comprehensive admin panel (password-protected) with real-time dashboards for order status, revenue charts (Recharts), low-stock alerts, and user analytics. Full CRUD for products, categories, SKUs, and pricing. Image upload integration with Cloudinary batch processing. Order fulfillment workflow with status tracking (pending, processing, shipped, delivered). User management with order history and preference tracking.',
        images: [
          '/images/case-studies/rtb-admin.webp',
          '/images/case-studies/rtb-admin-dashboard.webp',
          '/images/case-studies/rtb-admin-orders.webp',
          '/images/case-studies/rtb-admin-analytics.webp',
          '/images/case-studies/rtb-admin-inventory.webp',
        ],
      },
      {
        title: 'Guest & Authenticated Cart Persistence',
        description:
          "Dual-mode cart system: unauthenticated users' carts persist to localStorage + Firestore with sessionId; authenticated users sync carts via userId with real-time onSnapshot listeners. Customers can abandon cart, log in later, and resume checkout. Firebase security rules validate user ownership before reads/writes, preventing unauthorized cart access.",
        images: [
          '/images/case-studies/rtb-cart.webp',
          '/images/case-studies/rtb-cart-guest.webp',
          '/images/case-studies/rtb-cart-authenticated.webp',
          '/images/case-studies/rtb-cart-sync.webp',
        ],
      },
      {
        title: 'Customer Reviews & Ratings',
        description:
          'Customers can submit reviews and star ratings for purchased products. Reviews stored in Firestore with timestamp, userId, and moderation flags. Display on product detail pages sorted by recency and helpfulness. ReviewButton floating component provides easy access from any page.',
        images: [
          '/images/case-studies/rtb-reviews.webp',
          '/images/case-studies/rtb-review-form.webp',
          '/images/case-studies/rtb-review-display.webp',
          '/images/case-studies/rtb-star-rating.webp',
        ],
      },
      {
        title: 'Blog & Educational Content',
        description:
          'Embedded blog system with editorial-style posts weaving ingredient education into the shopping journey. Posts include author byline, publish date, featured image, and SEO meta tags. Route: /blog/:slug with syntax highlighting for ingredient breakdowns. Content defined in data/blogPosts.ts with TypeScript interfaces for consistency.',
        images: [
          '/images/case-studies/rtb-blog.webp',
          '/images/case-studies/rtb-blog-list.webp',
          '/images/case-studies/rtb-blog-post.webp',
          '/images/case-studies/rtb-ingredient-guide.webp',
        ],
      },
      {
        title: 'Cloudinary Image Management',
        description:
          'Admin interface for batch image uploads with automatic AVIF/WebP conversion. Legacy image URLs migrated to Cloudinary via utility scripts. Lazy-loaded product galleries with react-lazy-load-image-component. CDN delivery ensures responsive images and sub-second load times across bandwidth tiers.',
        images: [
          '/images/case-studies/rtb-image-mgmt.webp',
          '/images/case-studies/rtb-upload-interface.webp',
          '/images/case-studies/rtb-image-gallery.webp',
          '/images/case-studies/rtb-responsive-images.webp',
        ],
      },
      {
        title: 'Order Tracking & User Profile',
        description:
          'Authenticated users can view order history, track shipment status, and manage profile information (phone, address, skin type, hair type). Preferences (currency, language) persist per user. EmailJS sends transactional emails on order confirmation and status updates.',
        images: [
          '/images/case-studies/rtb-profile.webp',
          '/images/case-studies/rtb-order-history.webp',
          '/images/case-studies/rtb-order-tracking.webp',
          '/images/case-studies/rtb-user-preferences.webp',
        ],
      },
      {
        title: 'Brand-Aligned Storefront',
        description:
          'Custom design system with Tailwind CSS tokens mapped to botanical brand palette (earth tones, botanical greens, cream accents). Responsive product cards with Framer Motion animations. Dark mode support for accessibility. Editorial-style product pages with ingredient highlights, how-to-use instructions, and key benefits. Every interaction reinforces the handcrafted, premium brand identity.',
        images: [
          '/images/case-studies/rtb-storefront.webp',
          '/images/case-studies/rtb-design-system.webp',
          '/images/case-studies/rtb-product-cards.webp',
          '/images/case-studies/rtb-dark-mode.webp',
          '/images/case-studies/rtb-responsive-design.webp',
        ],
      },
    ],

    impact: [
      {
        metric: 'Lighthouse Performance',
        value: '98',
        description:
          'Mobile performance score with image-heavy catalogue and real-time data',
      },
      {
        metric: 'Supported Currencies',
        value: '10+',
        description:
          'International markets from Malaysia (MYR) to Nigeria (NGN) with live exchange rates',
      },
      {
        metric: 'Products & Variants',
        value: '50+ SKUs',
        description:
          'Managed with size-based pricing, ingredient metadata, and real-time inventory tracking',
      },
      {
        metric: 'Page Load (FCP)',
        value: '0.8s',
        description:
          'First Contentful Paint on 3G throttled connection with Cloudinary image delivery',
      },
      {
        metric: 'Admin Efficiency',
        value: '3x faster',
        description:
          'Product management workflow vs previous spreadsheet-based operations',
      },
      {
        metric: 'Cart Sync Latency',
        value: '< 100ms',
        description:
          'Real-time cart synchronization across devices via Firestore listeners',
      },
      {
        metric: 'Payment Success Rate',
        value: '99.2%',
        description:
          'Stripe webhook reliability with HMAC signature validation and retry logic',
      },
      {
        metric: 'Mobile Conversion',
        value: '45%',
        description:
          'Of total traffic with optimized checkout flow and cart persistence',
      },
    ],

    techStack: {
      Frontend: [
        'React 18.3.1',
        'TypeScript',
        'Vite',
        'Tailwind CSS 4.0.3',
        'Framer Motion 12.0.11',
        'React Router v7.1.5',
        'React Hook Form 7.54.2',
        'Yup 1.6.1',
        'Recharts 3.6.0',
        'Lucide React (icons)',
        'Sonner (toast notifications)',
        'react-intersection-observer (scroll animations)',
        'animate.css',
      ],
      Backend: [
        'Firebase Auth (email/password)',
        'Cloud Firestore (structured data)',
        'Firebase Cloud Storage',
        'Vercel Serverless Functions (Node.js)',
      ],
      'Payments & Integrations': [
        'Stripe (payment processing, checkout sessions, webhooks)',
        'Cloudinary (image hosting, optimization, CDN)',
        'EmailJS (transactional emails)',
      ],
      Deployment: [
        'Vercel (frontend + serverless functions)',
        'Google Firebase (auth, database, storage)',
        'Custom domain with Vercel DNS',
      ],
      DevTools: ['ESLint 9.17.0', 'TypeScript Compiler', 'Git'],
    },

    timeline: [
      {
        phase: 'Product Strategy & Data Modelling',
        duration: '1 week',
        description:
          'Defined Firestore schemas for products (with variants and pricing tiers), ingredients (with benefits and allergen flags), users, carts, and orders. Designed Firebase security rules for user/admin access control. Identified multi-currency requirements and designed exchange rate caching strategy.',
      },
      {
        phase: 'Core Frontend Architecture',
        duration: '1.5 weeks',
        description:
          'Set up React SPA with TypeScript, Vite, and Tailwind CSS. Implemented Context API structure (Auth, Cart, Product, Currency, Theme, Toast). Built layout components (Header, Footer, Navigation). Set up React Router with lazy-code splitting. Integrated Firebase SDK initialization.',
      },
      {
        phase: 'Authentication & User Profiles',
        duration: '1 week',
        description:
          'Implemented Firebase Auth signup/login/logout with email verification. Created UserProfile page with address, phone, preferences. Built ProtectedRoute wrapper for authenticated-only pages. Integrated password reset and profile update flows via Firestore.',
      },
      {
        phase: 'Product Catalogue & Storefront',
        duration: '2 weeks',
        description:
          'Built ProductContext with Firestore querying. Created ProductCard, ProductDetails, ProductGallery components. Implemented variant selector (size dropdown with price updates). Built Ingredients page with ingredient database. Created blog system with lazy-loaded BlogPost pages. Integrated Framer Motion animations across all pages.',
      },
      {
        phase: 'Shopping Cart & Checkout',
        duration: '1.5 weeks',
        description:
          'Implemented CartContext with useReducer pattern and dual persistence (localStorage + Firestore). Built Cart page with quantity management and item removal. Integrated CurrencyContext for multi-currency price conversion. Created Checkout form with Yup validation. Integrated Stripe Checkout integration (client-side).',
      },
      {
        phase: 'Payment Processing & Webhooks',
        duration: '1 week',
        description:
          'Created Vercel serverless functions: /api/create-checkout (session creation with tax & shipping), /api/webhook (Stripe event handling), /api/verify-payment (payment status checks). Implemented HMAC-SHA512 signature validation. Set up Firestore order persistence and EmailJS notification emails on payment success.',
      },
      {
        phase: 'Admin Dashboard & Analytics',
        duration: '1.5 weeks',
        description:
          'Built AdminLayout with sidebar navigation. Implemented password guard for admin access. Created ProductManagement (CRUD, image upload), OrderManagement (order filtering, status tracking), UserManagement (customer profiles), ReviewsManagement (moderation), and Analytics (revenue charts, conversion metrics with Recharts).',
      },
      {
        phase: 'Image Management & Cloudinary Integration',
        duration: '1 week',
        description:
          'Migrated images from Firebase Storage to Cloudinary. Built CloudinaryImageUpload component for admin batch uploads. Created migration utility scripts (migrateImagesToCloudinary.ts). Implemented lazy-loaded product galleries. Optimized image delivery with AVIF/WebP conversion.',
      },
      {
        phase: 'Multi-Currency Support & Live Rates',
        duration: '0.5 weeks',
        description:
          'Implemented CurrencyContext with support for 10+ currencies. Built exchangeRateService with API integration and caching. Preload rates on app init to eliminate first-interaction latency. Updated Stripe integration to convert prices dynamically.',
      },
      {
        phase: 'Testing, Optimization & Launch',
        duration: '1 week',
        description:
          'Lighthouse audits and Core Web Vitals optimization. Cross-browser testing (Chrome, Safari, Firefox). Vercel deployment with environment secret management. Custom domain setup. Security audit of Firestore rules and payment flow. Documentation of setup guides (PAYMENT_ARCHITECTURE.md, CLOUDINARY_SETUP.md).',
      },
    ],

    learnings: [
      'Firestore real-time listeners (onSnapshot) are powerful for cart sync but require careful unsubscribe logic in useEffect cleanup to prevent memory leaks. Implement a subscription manager or use Firebase Auth state to scope listeners to authenticated users only.',
      'Separating cart persistence logic into a cartService layer (Firestore CRUD) from CartContext (state management) made testing easier and prevented circular dependencies. Keep services pure and context focused on UI state.',
      'Multi-currency pricing requires server-side validation in Stripe checkout creation—never trust client-side price calculations. Implement a currency whitelist and validate conversion rates server-side to prevent fraud.',
      'Variant-level pricing (size tiers) needed denormalization in the product schema. Storing variants as a nested array with price, stock, and SKU made queries fast and admin UX simple. Normalized approach (separate variants collection) added query complexity.',
      'Cloudinary image optimization reduced initial bundle size by 40% and improved Core Web Vitals. AVIF format support with WebP fallback is critical for modern browsers. CDN delivery eliminated Firebase Storage bandwidth costs.',
      "Password-based admin guard is a quick MVP solution but doesn't scale. Planned upgrade to Firestore custom claims + role-based access control (RBAC) with granular permissions (edit products, view analytics, manage users) will be necessary as the team grows.",
      'Real-time cart synchronization across tabs/devices works well with Firestore listeners, but requires explicit error handling if Firestore is unavailable. Implement fallback to localStorage and sync when connection restored.',
      'Exchange rate caching with 12-hour TTL balances accuracy and performance. Fetching rates on every currency change was too slow; preloading on app init eliminated latency. Consider external service (Open Exchange Rates) vs Firebase Functions for scalability.',
      'Form validation across login, register, product forms, and checkout forms benefited from centralized Yup schemas. Created shared validation rules to reduce duplication and ensure consistency.',
      'Framer Motion layout animations (layoutId on AnimatePresence) require stable component keys during page transitions. Mismatched layoutIds cause animation glitches. Document the mapping between route and layoutId in a constants file.',
    ],

    links: {
      live: 'https://rtbloom.vercel.app',
      github: 'https://github.com/Kemi-Oluwadahunsi/Roots-to-Bloom',
    },
  },

  herbiskea: {
    id: 'herbiskea',
    title: 'Herbiskea',
    badge: 'Full-Stack Beauty Intelligence Platform',
    company: 'Independent Project',
    period: '2025 – 2026',
    heroImage: '/images/case-studies/herbiskea/herbiskea-new.webp',
    summary:
      'Designed and engineered a comprehensive natural beauty intelligence platform — combining a 224+ ingredient encyclopedia with multi-sort options, compatibility and substitution tools, 128 expert-curated recipes with auth-protected purchase flow, AI-powered skin and hair analysis, a custom formulation builder with persistent save/load/resume, full e-commerce with Paystack checkout, and a 46-post educational blog. Built mobile-first with viewport-adaptive layouts, loading feedback states, and optimized UX across all device sizes.',
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
        'Mobile experiences on beauty platforms are afterthoughts — layouts break on smaller screens and interactive features lack proper feedback states',
      ],
    },
    solution: {
      title: 'The Approach',
      description:
        'I architected Herbiskea as a full-stack Next.js 16 application with the App Router, backed by Neon PostgreSQL via Prisma ORM. The platform was designed around three pillars: educate (ingredient database + blog), create (formulation builder + recipes), and shop (e-commerce + shopping lists). Every data model was built to support cross-referencing — ingredients link to recipes, recipes link to substitutions, and analysis results link to personalized recommendations. The UI was built mobile-first with viewport-adaptive sizing (dvh units), auth-gated purchase flows, and loading feedback on all interactive actions.',
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
        {
          decision: 'Mobile-First Viewport-Adaptive Carousel',
          rationale:
            'Hero carousel uses dvh units and CSS order utilities to reflow image-above-text on mobile, with static (non-absolute) navigation buttons that adapt to any viewport height — eliminating the Safari/Chrome bottom-bar overlap issue across iPhones, Pixels, and Samsung devices.',
        },
        {
          decision: 'Auth-Gated Purchase Flow with Modal Prompt',
          rationale:
            'Instead of silently failing when unauthenticated users attempt purchases, implemented an AuthModal trigger on cart actions — matching the analysis flow pattern. Includes loading spinners on all purchase buttons for slow-network feedback.',
        },
      ],
    },
    features: [
      {
        title: 'Ingredient Encyclopedia (224+ Entries)',
        description:
          'Every ingredient has a detailed profile — scientific name, INCI, origin, key components, pH stability range, comedogenic rating, usage rates, shelf life, appearance, and a rich beginner-friendly description. Includes multi-sort options (mixed scatter, A–Z, Z–A, newest, oldest) with client-side shuffle for a naturally diverse browsing experience.',
        images: [
          '/images/case-studies/herbiskea/ingredients-homepage.webp',
          '/images/case-studies/herbiskea/ingredients-details-hero.webp',
          '/images/case-studies/herbiskea/ingredients-description.webp',
          '/images/case-studies/herbiskea/ingredients-details-darkmode.webp',
          '/images/case-studies/herbiskea/ingredients-fullpage.webp',
        ],
      },
      {
        title: 'Substitution & Compatibility Tools',
        description:
          'Hand-curated substitution data for 220+ ingredients ensures functional correctness — essential oils only substitute with other essential oils, barrier lipids with barrier lipids, cleansers with cleansers. Compatibility matrix shows synergy, caution, and avoid pairings with explanations.',
        images: [
          '/images/case-studies/herbiskea/ingredients-substitutes-page.webp',
        ],
      },
      {
        title: 'Recipe Collection (178 Recipes)',
        description:
          '178 expert-curated recipes across skincare, haircare, and body wellness with step-by-step instructions, ingredient lists with amounts, difficulty ratings, prep times, customization tips, and dynamic pricing. Auth-protected purchase flow with loading feedback — unauthenticated users are prompted to sign in via modal before adding to cart.',
        images: [
          '/images/case-studies/herbiskea/recipes-page.webp',
          '/images/case-studies/herbiskea/recipe-detail-page.webp',
          '/images/case-studies/herbiskea/collections-page.webp',
        ],
      },
      {
        title: 'Custom Formulation Builder',
        description:
          'Drag-and-drop formulation tool where users build recipes from scratch — selecting ingredients with percentage-based amounts, choosing the formulation phase (water/oil/cool-down), and getting real-time compatibility warnings and pH range estimates. Supports persistent save/load/resume via URL-based state (?load=id&id=) and inline saved formulations search.',
        images: [
          '/images/case-studies/herbiskea/formulation-page.webp',
          '/images/case-studies/herbiskea/formulation-builder.webp',
          '/images/case-studies/herbiskea/formulation-review.webp',
          '/images/case-studies/herbiskea/formulation-saved.webp',
        ],
      },
      {
        title: 'AI Skin & Hair Analysis',
        description:
          'Camera-based analysis flow with live video feed, face guide overlay, and permission handling. Captures skin/hair conditions and delivers personalized ingredient and recipe recommendations based on detected concerns.',
        images: [
          '/images/case-studies/herbiskea/analysis-page.webp',
          '/images/case-studies/herbiskea/analysis-select-full.webp',
          '/images/case-studies/herbiskea/analysis-diagnosis-quick.webp',
          '/images/case-studies/herbiskea/analysis-questionnaire.webp',
          '/images/case-studies/herbiskea/analysis-processing.webp',
          '/images/case-studies/herbiskea/analysis-results.webp',
        ],
      },
      {
        title: 'E-Commerce & Checkout',
        description:
          'Full shopping flow — cart with quantity management, Paystack-powered checkout supporting cards, bank transfers, and mobile money. Order tracking, receipt generation, and order history dashboard. Auth-gated with loading states on all purchase interactions.',
        images: [
          '/images/case-studies/herbiskea/cart.webp',
          '/images/case-studies/herbiskea/side-cart.webp',
          '/images/case-studies/herbiskea/checkout-page.webp',
          '/images/case-studies/herbiskea/orders-confirmed.webp',
          '/images/case-studies/herbiskea/orders-completed.webp',
          '/images/case-studies/herbiskea/payment-receipt.webp',
        ],
      },
      {
        title: 'Educational Blog',
        description:
          'Editorial-style blog covering ingredient deep-dives, routine guides, and skincare science — designed to educate beginners while driving organic search traffic. Rich SEO metadata, reading time estimates, and related content suggestions.',
        images: [
          '/images/case-studies/herbiskea/blog-page.webp',
          '/images/case-studies/herbiskea/blog-details.webp',
          '/images/case-studies/herbiskea/blog-details-2.webp',
        ],
      },
      {
        title: 'User Dashboard & Collections',
        description:
          'Authenticated users can save favorites, organize ingredients and recipes into custom collections, write reviews and notes, build shopping lists, track orders, manage saved formulations, and configure notification preferences — all from a unified dashboard with direct-load links to resume formulations.',
        images: ['/images/case-studies/herbiskea/dashboard-user.webp'],
      },
    ],
    impact: [
      {
        metric: 'Ingredients Catalogued',
        value: '224',
        description:
          'Fully enriched entries with formulation data, descriptions, compatibility, substitutions, and multi-sort browsing',
      },
      {
        metric: 'Recipes Published',
        value: '178',
        description:
          'Expert-curated recipes across skincare, haircare, and body wellness categories with auth-protected purchase flow',
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
        'Embla Carousel',
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
          'Designed Prisma schema for ingredients, recipes, blogs, users, orders, formulations, and compatibility matrices. Set up Neon PostgreSQL, NextAuth v5 with JWT strategy, and project scaffolding.',
      },
      {
        phase: 'Ingredient Database',
        duration: '2 weeks',
        description:
          'Built ingredient CRUD, detail pages, multi-sort browsing (mixed shuffle, alphabetical, chronological), and seeded 224 entries with full enrichment — scientific data, formulation specs, beginner-friendly descriptions, and curated substitutions.',
      },
      {
        phase: 'Recipe System & E-Commerce',
        duration: '2 weeks',
        description:
          'Developed recipe catalogue with filtering/sorting, detail pages with step-by-step instructions, premium gating with auth-protected purchase flow (AuthModal prompt for unauthenticated users), cart system with loading states, and Paystack checkout integration.',
      },
      {
        phase: 'Analysis & Formulation Tools',
        duration: '1.5 weeks',
        description:
          'Built AI analysis flow with camera capture, face guide overlay, and permission handling. Developed formulation builder with ingredient selection, phase management, compatibility warnings, and persistent save/load/resume via URL state.',
      },
      {
        phase: 'Blog, Search & User Features',
        duration: '1.5 weeks',
        description:
          'Created editorial blog system with currently almost 50 posts, global search across all content types, favorites, collections, shopping lists, reviews, notes, saved formulations dashboard, and notification system.',
      },
      {
        phase: 'Mobile UX, Dark Mode & Performance',
        duration: '1 week',
        description:
          'Implemented mobile-first hero carousel with dvh-based viewport adaptation, image-above-text reflow, and static navigation buttons. Full dark mode with system detection, in-memory caching, rate limiting, image optimization via Cloudinary, SEO metadata, and cross-device responsive testing across iPhones, Pixels, and Samsung devices.',
      },
    ],
    learnings: [
      'Algorithmic ingredient substitution (scoring by shared benefits/category) sounds smart but produces dangerous results — a cleanser being substituted with an oil is functionally wrong even if they share "moisturizing" as a benefit. Curated data with human validation is non-negotiable for domain-specific recommendations.',
      'Generating rich content at scale (224 ingredient descriptions) is feasible without AI APIs by building robust template generators that leverage existing structured metadata. The key is category-specific templates with benefit explanation maps.',
      'Tailwind CSS v4 syntax changes (bg-linear-to-t instead of bg-gradient-to-t, aspect-4/5 instead of aspect-[4/5]) are subtle but break builds silently. Establishing a version-specific cheatsheet at project start saves hours of debugging.',
      'In-memory caching with TTL and prefix invalidation is surprisingly effective for read-heavy applications — cutting database queries by 60% without the infrastructure overhead of Redis. The tradeoff is per-instance cache (acceptable for single-server deployments).',
      'Mobile carousel navigation must be static-flow (not absolute-positioned) to avoid being hidden behind dynamic browser chrome (Safari bottom bar, Chrome URL bar). Using dvh units + CSS order is more reliable than fixed viewport calculations.',
      'Silent failures on unauthenticated actions (e.g. addToCart returning { success: false }) create confusion — always surface auth requirements with a clear modal prompt. The pattern of checking session before the async call and showing AuthModal is reusable across any protected action.',
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
    heroImage: '/images/viskit.png',
    summary:
      'Designed and engineered a composable, TypeScript-first React charting library from scratch — a 5-package monorepo delivering 48 production-ready chart types across 5 categories (cartesian, radial, hierarchical, flow, specialized), a high-performance Canvas renderer, a token-driven theme system with 85+ tokens, physics-based animations, and full WCAG accessibility. Every API was shaped around developer ergonomics: zero-config defaults, generic type safety, and tree-shakeable imports via the viskit-react barrel package.',
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
        'Advanced chart types (Sankey, chord diagrams, treemaps, force graphs) are rarely available in React-native APIs — developers fall back to raw D3 imperative code',
      ],
    },
    solution: {
      title: 'The Approach',
      description:
        'I architected VisKit as a layered monorepo: a slim core package owning context, scales, and types; a themes package with a deep-token system; an animations package respecting OS preferences; and a charts package containing every series, primitive, and the Canvas renderer. Each layer depends only downward, and the consumer barrel package (viskit-react) re-exports everything for single-import convenience while preserving tree-shaking.',
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
            "D3 modules (d3-scale, d3-shape, d3-array, d3-hierarchy, d3-force, d3-chord, d3-sankey) handle scale computation, path generation, and layout algorithms internally. Consumers never import D3 directly — they compose React components. This keeps the API familiar to React developers while leveraging D3's battle-tested math.",
        },
        {
          decision: 'Canvas Renderer with Automatic Threshold',
          rationale:
            'Below 5,000 points the CanvasRenderer falls back to SVG for full interactivity and accessibility. Above the threshold it overlays an HTML Canvas via foreignObject, with hit-testing for hover detection and an invisible ARIA group for screen readers — preserving accessibility even in canvas mode.',
        },
        {
          decision: 'Token-Driven Theme System (85+ Tokens)',
          rationale:
            'The VisualizationTokens interface defines every visual decision: categorical palettes, sequential ramps, semantic colors, surface colors, typography scales, spacing, motion configs, geometry, and effects. No component reads CSS or hardcodes a value. Themes can be swapped at runtime via ThemeProvider with zero re-mount.',
        },
        {
          decision: 'tsup for ESM + CJS + DTS in Parallel',
          rationale:
            "Each package builds ESM, CommonJS, and TypeScript declarations in under 2 seconds via tsup. Combined with Turborepo's topological task graph, the full monorepo build completes in ~11 seconds with zero-config caching.",
        },
        {
          decision: '4-Phase Delivery with Progressive Complexity',
          rationale:
            'Phase 1 shipped 5 core charts + primitives. Phase 2 added 14 advanced cartesian/radial types + Canvas. Phase 3 introduced hierarchical (treemap, sunburst, icicle, circle-packing) and flow (Sankey, chord, force graph, funnel). Phase 4 delivered exotic charts (word cloud, Venn, gauge, calendar heatmap) and composition primitives (brush, chart group).',
        },
      ],
    },
    features: [
      {
        title: '50+ Chart Types Across 5 Categories',
        description:
          'Cartesian (27 types: line, bar, area, scatter, stacked/grouped/horizontal bar, multi-line, stacked area, bubble, lollipop, dumbbell, candlestick, waterfall, box plot, violin, bullet, slope, stream graph, parallel coordinates, ridgeline, marimekko, Gantt, comparison, diverging bar, pyramid, timeline), Radial (5: pie, donut, radar, radial bar, polar area), Hierarchical (4: treemap, sunburst, icicle, circle packing), Flow (4: Sankey, chord diagram, force graph, funnel), and Specialized (8: heatmap, calendar heatmap, histogram, sparkline, gauge, density contour, Venn diagram, word cloud) — each with hover interactions, ARIA labels, and animation.',
        images: [
          '/images/case-studies/viskit/areaseries.webp',
          '/images/case-studies/viskit/donutseries.webp',
          '/images/case-studies/viskit/areaseries.webp',
          '/images/case-studies/viskit/parallelseries.webp',
          '/images/case-studies/viskit/polarseries.webp',
          '/images/case-studies/viskit/radialbarseries.webp',
          '/images/case-studies/viskit/sankeydiagram.webp',
          '/images/case-studies/viskit/areaseries.webp',
          '/images/case-studies/viskit/treemapseries.webp',
          '/images/case-studies/viskit/wordcloud.webp',
          '/images/case-studies/viskit/sunburstseries.webp',
          '/images/case-studies/viskit/slope-cartisan.webp',
          '/images/case-studies/viskit/icicleseries.webp',
          '/images/case-studies/viskit/circlepack.webp',
        ],
      },
      {
        title: 'Canvas Renderer for Large Datasets',
        description:
          'Automatic SVG-to-Canvas switching at a configurable threshold. Supports scatter, bubble, and heatmap modes with retina-aware rendering, hover hit-detection, animated fade-in, and a custom renderCanvas escape hatch for full 2D context control.',
        images: ['/images/case-studies/viskit/canvas-renderer.webp'],
      },
      {
        title: '4 Theme Presets & 85+ Token System',
        description:
          'Midnight (dark), Daylight (light), Aurora (vibrant dark), and Corporate (neutral light) presets. The token interface covers categorical palettes (8 colors), sequential ramps (3 × 10 stops), semantic colors, surface tokens, typography scales, spacing, motion configs, geometry, and effects — all swappable at runtime via ThemeProvider.',
        images: ['/images/case-studies/viskit/primitives.webp'],
      },
      {
        title: '56-Story Storybook Catalogue',
        description:
          '56 interactive stories with live controls for every prop — field selection, color pickers, range sliders for opacity and radius, curve type selectors, and 5 tooltip variants. Each story includes import code blocks via viskit-react and multiple visual scenarios. Deployed to GitHub Pages with automated CI.',
        images: ['/images/case-studies/viskit/areaseries.webp'],
      },
      {
        title: 'Accessibility-First Architecture',
        description:
          'Every chart SVG carries role="img", <title>, and <desc>. A hidden data table renders all values for screen readers. Data points are focusable with keyboard arrow navigation. All animations respect prefers-reduced-motion. Categorical palettes pass WCAG AA contrast.',
        images: ['/images/case-studies/viskit/primitives.webp'],
      },
      {
        title: '5 Tooltip Variants',
        description:
          'Default (glass-morphism with blur), Minimal, Compact, Gradient, and Outline tooltip styles — each driven by theme tokens. Tooltips are positioned with @floating-ui/react for collision detection and follow the cursor across all chart types.',
        images: [
          '/images/case-studies/viskit/tooltip-1.webp',
          '/images/case-studies/viskit/tooltip-2.webp',
          '/images/case-studies/viskit/tooltip-3.webp',
          '/images/case-studies/viskit/tooltip-4.webp',
          '/images/case-studies/viskit/tooltip-5.webp',
          '/images/case-studies/viskit/tooltip-6.webp',
        ],
      },
      {
        title: 'Hierarchical & Flow Visualizations',
        description:
          'Treemap, sunburst, icicle, and circle-packing for part-to-whole hierarchies. Sankey diagrams for flow allocation, chord diagrams for inter-group relationships, force-directed graphs for networks, and funnels for conversion pipelines — all with the same composable API and theme integration.',
        images: [
          '/images/case-studies/viskit/treemapseries.webp',
          '/images/case-studies/viskit/sunburstseries.webp',
          '/images/case-studies/viskit/icicleseries.webp',
          '/images/case-studies/viskit/circlepack.webp',
          '/images/case-studies/viskit/sankeydiagram.webp',
        ],
      },
    ],
    impact: [
      {
        metric: 'Chart Types Shipped',
        value: '48',
        description:
          'Production-ready series across cartesian, radial, hierarchical, flow, and specialized categories',
      },
      {
        metric: 'Storybook Stories',
        value: '56',
        description:
          'Interactive stories with live controls, autodocs, and multiple visual scenarios per chart',
      },
      {
        metric: 'Design Tokens',
        value: '85+',
        description:
          'Tokens spanning color (categorical, sequential, semantic), typography, surface, spacing, motion, geometry, and effects',
      },
      {
        metric: 'Build Time',
        value: '11s',
        description:
          'Full monorepo build with ESM + CJS + DTS via Turborepo parallel execution and tsup',
      },
      {
        metric: 'npm Packages',
        value: '5',
        description:
          'Published packages: viskit-react, @kodemaven/viskit-core, @kodemaven/viskit-charts, @kodemaven/viskit-themes, @kodemaven/viskit-animations',
      },
      {
        metric: 'Runtime Exports',
        value: '61',
        description:
          '48 chart series + 10 primitives + Canvas renderer + utilities exported from the charts package alone',
      },
    ],
    techStack: {
      Core: [
        'React 19',
        'TypeScript (strict)',
        'D3 (scale, shape, array, hierarchy, force, chord, sankey)',
        '@react-spring/web',
        '@floating-ui/react',
      ],
      Build: ['pnpm Workspaces', 'Turborepo', 'tsup (esbuild)', 'Vite'],
      Testing: ['Vitest', '@testing-library/react'],
      CI_CD: ['GitHub Actions', 'Changesets', 'GitHub Pages'],
      Documentation: ['Storybook 8', 'Autodocs'],
    },
    timeline: [
      {
        phase: 'Architecture & Monorepo Setup',
        duration: '1 week',
        description:
          'Designed the 5-package monorepo structure, configured pnpm workspaces, Turborepo pipeline, tsup builds, shared TypeScript/ESLint configs, and CI workflow.',
      },
      {
        phase: 'Core Package & Context System',
        duration: '1 week',
        description:
          'Built the Chart component, three-layer context system (Chart/Cartesian/Polar), auto-scale detection, responsive sizing, auto-margin calculation, keyboard navigation hook, and all shared types.',
      },
      {
        phase: 'Phase 1 — Foundations',
        duration: '2 weeks',
        description:
          'Implemented 5 chart series (Line, Bar, Area, Scatter, Pie), 6 primitives (XAxis, YAxis, CartesianGrid, Legend, Tooltip, TooltipContent), accessibility layer, and unit tests.',
      },
      {
        phase: 'Theme & Animation Systems',
        duration: '1 week',
        description:
          'Designed the VisualizationTokens interface (85+ tokens), built 4 theme presets (Midnight, Daylight, Aurora, Corporate), ThemeProvider with runtime switching, spring presets, and reduced-motion support.',
      },
      {
        phase: 'Phase 2 — Advanced Cartesian & Radial',
        duration: '2 weeks',
        description:
          'Shipped 14 additional chart types (stacked/grouped/horizontal bar, multi-line, stacked area, bubble, lollipop, dumbbell, histogram, radar, radial bar, polar area, heatmap, sparkline), the Canvas renderer, and 5 tooltip variants.',
      },
      {
        phase: 'Phase 3 — Hierarchical & Flow',
        duration: '2 weeks',
        description:
          'Implemented treemap, sunburst, icicle, circle-packing (hierarchical), Sankey diagram, chord diagram, force-directed graph, funnel (flow), plus financial/statistical charts: candlestick, waterfall, box plot, violin, bullet, slope.',
      },
      {
        phase: 'Phase 4 — Exotic & Composition',
        duration: '2 weeks',
        description:
          'Delivered word cloud, Venn diagram, gauge, calendar heatmap, density contour, stream graph, parallel coordinates, ridgeline, marimekko, Gantt, diverging bar, pyramid, timeline, and composition tools (brush, chart group).',
      },
      {
        phase: 'Storybook, CI/CD & Polish',
        duration: '1 week',
        description:
          'Created 56 interactive stories, unified all imports to viskit-react, deployed Storybook to GitHub Pages via CI, configured changesets for automated npm publishing, and resolved all TypeScript errors across the catalogue.',
      },
    ],
    learnings: [
      'A three-layer context system (Chart → Cartesian/Polar) cleanly separates concerns, but you must document which context each series reads from — otherwise contributors reach for the wrong hook and get cryptic "must be used inside" errors.',
      "Generic datum flow (keyof TDatum) delivers excellent DX, but Storybook's StoryObj type erases generics to {}. Every story needs a manually defined args interface to restore type safety — a pattern worth documenting in a contributing guide.",
      'D3 scales return number | undefined, and TypeScript strict mode rightfully flags every usage. Wrapping scales in a typed ScaleResult interface with guaranteed return types eliminated hundreds of null-check cascades across series components.',
      'Canvas rendering inside SVG via foreignObject works well for data visualization, but hit-testing must be implemented manually — the browser gives you no DOM events for canvas-drawn shapes, so a spatial index or brute-force closest-point search is necessary.',
      "tsup with esbuild produces fast builds, but DTS generation (powered by tsc under the hood) is the bottleneck — it accounts for ~80% of each package's build time. Structuring types to avoid circular references keeps DTS fast.",
      'Designing a token interface before writing any component CSS is the single highest-leverage decision for a design system. When every component reads from tokens, theme switching, dark mode, and brand customization become runtime props, not refactoring projects.',
      'Scaling from 5 to 48 chart types exposed how critical a consistent series component contract is: every series must accept the same lifecycle (data → scales → render → animate → interact). Deviating from the pattern for even one chart creates maintenance debt that compounds with each new feature.',
    ],
    links: {
      live: 'https://kemi-oluwadahunsi.github.io/Viskit-Charting-Library/',
      github: 'https://github.com/Kemi-Oluwadahunsi/Viskit-Charting-Library',
    },
  },
  'readyui-react': {
    id: 'readyui-react',
    title: 'ReadyUI React',
    badge: 'Open-Source Component Library',
    company: 'Independent Project',
    period: '2026',
    heroImage: '/images/readyui/hero.webp', // alt: "ReadyUI React documentation site hero — component grid overview with dark mode toggle and sidebar navigation"
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
        images: [
          '/images/case-studies/readyui/accordion.webp',
          '/images/case-studies/readyui/kaban-1.webp',
          '/images/case-studies/readyui/kaban-2.webp',
          '/images/case-studies/readyui/drawer.webp',
          '/images/case-studies/readyui/datatable.webp',
          '/images/case-studies/readyui/modal.webp',
          '/images/case-studies/readyui/progressbar.webp',
          '/images/case-studies/readyui/popover.webp',
        ],
      },
      {
        title: 'Inputs & Form Components',
        description:
          'DatePicker (single/range/multi), ColorPicker (HSL/RGB/HEX), FileUploader (drag-and-drop with preview), OTPInput, PasswordStrength meter, RangeSlider (single & dual handle), RatingInput (half-star support), Select (searchable multi-select), and ToggleSwitch — all with controlled/uncontrolled modes and validation-ready APIs.',
        images: [
          '/images/case-studies/readyui/datepicker.webp',
          '/images/case-studies/readyui/colorpicker.webp',
          '/images/case-studies/readyui/fileupload.webp',
          '/images/case-studies/readyui/otpinput.webp',
          '/images/case-studies/readyui/passwordstrength.webp',
        ],
      },
      {
        title: 'Data Display & Feedback',
        description:
          'DataTable (sortable, filterable, paginated), TreeView (hierarchical expand/collapse), VirtualList (10K+ items), 15 Card variants (Profile, Product, Glass, Interactive flip), Skeleton loading, Spinner (13 animation variants), Toast notification system, Modal, ConfirmDialog, Popover, Tooltip, and NotificationBell dropdown.',
        images: [
          '/images/case-studies/readyui/datatable.webp',
          '/images/case-studies/readyui/skeleton.webp',
          '/images/case-studies/readyui/spinner.webp',
          '/images/case-studies/readyui/toast.webp',
          '/images/case-studies/readyui/modal.webp',
          '/images/case-studies/readyui/confirmdialog.webp',
          '/images/case-studies/readyui/popover.webp',
        ],
      },
      {
        title: 'Interactive Documentation Site',
        description:
          'A full documentation site built with Vite and React Router v7, featuring live component previews, copy-to-clipboard code blocks, prop API tables with type/default/required indicators, dark mode toggle, responsive sidebar navigation, and lazy-loaded routes for fast page loads.',
        images: [
          '/images/case-studies/readyui/hero-1.webp',
          '/images/case-studies/readyui/hero-dark.webp',
        ], // alt: "ReadyUI documentation site — Accordion page showing live Preview panel, Code tab with syntax highlighting, and Props table with dark badges"
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
  'timesheet-automation': {
    id: 'timesheet-automation',
    title: 'Timesheet Automation ',
    badge: 'Enterprise Micro-Frontend',
    company: 'Etiqa (via ReadyUI)',
    period: '2025 – 2026',
    heroImage: '/images/case-studies/timesheet/timesheet-hero.webp', // alt: "Full-width screenshot of the Timesheet Automation app showing the employee form, calendar grid, and leave balance tracker"
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
        images: [
          '/images/case-studies/timesheet/calendar-grid.webp',
          '/images/case-studies/timesheet/day-edit.webp',
          '/images/case-studies/timesheet/public-holiday.webp',
        ], // alt: "Calendar grid showing work days in blue, annual leave in green, public holidays in red with tooltip showing holiday name, and a half-day ML marked on the 15th"
      },
      {
        title: 'PDF Generation & Preview',
        description:
          'The app fills the official Etiqa timesheet PDF template using pdf-lib — placing employee details, daily start/end times, leave codes, overtime totals, and the digital signature in the exact positions required. Staff preview the filled PDF before downloading.',
        images: ['/images/case-studies/timesheet/pdf-preview.webp'], // alt: "Side-by-side view of the PDF preview showing the filled official Etiqa timesheet with employee details, daily hours, leave summary, and digital signature"
      },
      {
        title: 'Leave Balance Tracker',
        description:
          'Cumulative leave balance display showing entitlement, used (initial + monthly), and remaining for each leave type. Balances can go negative with red warnings and toast notifications when entitlements are exceeded — preventing silent over-use.',
        images: [
          '/images/case-studies/timesheet/leave-tracker.webp',
          '/images/case-studies/timesheet/leave-tracker-2.webp',
        ], // alt: "Leave balance tracker showing AL: 21 entitled, 18 used, 3 remaining; ML: 30 entitled, 2 used, 28 remaining; with a red warning badge on FTO showing -1 remaining"
      },
      {
        title: 'Overtime Calculation Engine',
        description:
          'Automatic overtime calculation with three rate categories — normal day OT, rest day OT, and public holiday OT. Hours beyond the standard 9-hour workday are computed from start/end times and displayed per day and as monthly totals on the timesheet.',
        images: ['/images/case-studies/timesheet/day-edit.webp'], // alt: "Day editor modal showing overtime fields for normal day (2.0 hrs), rest day (0 hrs), and public holiday (0 hrs) with the calculated total"
      },
      {
        title: 'Digital Signature Upload',
        description:
          'Staff upload or capture their signature image (max 2MB), which is scaled to fit the official template signature box and embedded directly into the generated PDF.',
        images: ['/images/case-studies/timesheet/signature.webp'], // alt: "Signature upload section showing a preview of the uploaded signature image with a 'Change Signature' button and file size indicator"
      },
      {
        title: 'Module Federation Integration',
        description:
          "The app is exposed as a remote module via Webpack 5 Module Federation. The Angular host loads it at runtime, passing the logged-in user's employee ID, name, and project details as props to prefill the form — zero manual entry for known fields.",
        images: ['/images/case-studies/timesheet/timesheet-hero-etiqa.webp'], // alt: "The Timesheet Automation app rendered inside the ConnecTiQa Angular portal, showing the sidebar navigation of the host app with the timesheet form loaded in the main content area"
      },
    ],
    impact: [
      {
        metric: 'Time Saved per Staff',
        value: '~70%',
        description:
          'Reduction in monthly timesheet preparation time vs manual PDF filling',
      },
      {
        metric: 'Calculation Errors',
        value: '0',
        description:
          'Automated overtime and leave calculations eliminate manual arithmetic mistakes',
      },
      {
        metric: 'Test Coverage',
        value: '14 tests',
        description:
          'Vitest unit tests covering time formatting, OT calculation, and leave totals',
      },
      {
        metric: 'Environment Deployments',
        value: '3',
        description:
          'SIT, UAT, and Production builds with environment-specific configurations',
      },
      {
        metric: 'Bundle Strategy',
        value: 'Inline PDF',
        description:
          'Official template embedded in JS bundle — zero CORS issues, zero extra network requests',
      },
      {
        metric: 'Host Integration',
        value: 'Zero-touch',
        description:
          'Angular host loads the module at runtime with no build-time coupling',
      },
    ],
    techStack: {
      Frontend: [
        'React 19',
        'TypeScript 5',
        'Tailwind CSS',
        'shadcn/ui (Radix UI)',
        'Lucide Icons',
        'Framer Motion',
      ],
      'PDF & Data': [
        'pdf-lib',
        'date-holidays (Malaysia)',
        'html2canvas',
        'React Hook Form',
        'Zod',
      ],
      'Build & Integration': [
        'Webpack 5',
        'Module Federation',
        'ts-loader',
        'env-cmd',
        'PostCSS',
      ],
      Testing: ['Vitest'],
      Deployment: [
        'Azure Blob Storage',
        'Multi-environment (SIT / UAT / Production)',
      ],
    },
    timeline: [
      {
        phase: 'Discovery & Requirements',
        duration: '1 week',
        description:
          'Audited the existing manual PDF workflow, mapped the official template fields, defined leave entitlement rules (AL: 21, ML: 30, FTO: 0), and documented the Module Federation integration contract with the Angular host team.',
      },
      {
        phase: 'Core Architecture & State Management',
        duration: '1 week',
        description:
          'Set up Webpack 5 with Module Federation, built the reducer-based state with localStorage persistence, configured the mount/unmount lifecycle for host integration, and established the project structure.',
      },
      {
        phase: 'Form & Calendar Development',
        duration: '2 weeks',
        description:
          'Built employee details form, work hours with 12/24h toggle, signature upload, interactive calendar with day editor, leave type selection with half-day support, and Malaysian public holiday integration.',
      },
      {
        phase: 'PDF Generation & Leave Tracking',
        duration: '1.5 weeks',
        description:
          'Implemented pdf-lib template filling with exact field positioning, digital signature embedding, overtime calculation engine (normal/rest/PH rates), and cumulative leave balance tracker with negative-balance warnings.',
      },
      {
        phase: 'Environment & Deployment Pipeline',
        duration: '1 week',
        description:
          'Configured SIT/UAT/Production build scripts with env-cmd, resolved CORS issues by embedding the PDF template via webpack asset/inline, set up Azure Blob Storage hosting, and ran UAT with 20 consolidated test cases.',
      },
      {
        phase: 'UAT, Bug Fixes & Production Launch',
        duration: '1 week',
        description:
          'Executed 70 UAT test cases, fixed time format display, leave balance clamping, toast warnings, calendar reset, and deployed to production ConnecTiQa portal.',
      },
    ],
    learnings: [
      'Module Federation with cross-framework hosts (React inside Angular) works reliably when you share only the bare minimum (React + ReactDOM as singletons) and use a mount/unmount contract rather than framework-specific bindings.',
      'Embedding binary assets (PDF templates) via webpack asset/inline is the most robust strategy in Module Federation — it eliminates an entire class of CORS and public path resolution bugs that surface only in production when the host and remote are on different origins.',
      'Native HTML `<input type="time">` always renders in the browser/OS locale regardless of app state — to show a custom 12/24-hour format, you need to replace the visible input with a styled button and trigger the native picker programmatically via `.showPicker()`.',
      'Leave balance calculations should never clamp to zero with `Math.max(0, ...)` — allowing negative values with clear visual warnings gives staff and managers accurate visibility into over-use rather than silently hiding the problem.',
      'localStorage persistence in a form-heavy app is non-negotiable for enterprise users who get interrupted mid-task. Saving on every dispatch (not just on unmount) prevents data loss from browser crashes and forced tab closures.',
    ],
    links: {
      live: 'https://tentacle-timesheet-automation.vercel.app',
      github:
        'https://github.maybank.com/Oluwakemi-Ademiotibo-Oluwadahunsi/Timesheet-Automation', // Private repo due to company policies
    },
  },
  kemory: {
    id: 'kemory',
    title: 'Kemory',
    badge: 'Full-Stack Publishing & Creator Platform',
    company: 'Independent Project',
    period: '2025 – 2026',
    heroImage: '/images/case-studies/kemory/kemory-hero.webp',
    summary:
      'Designed and engineered a Medium/Notion/Substack-tier publishing platform for all kinds of writers: a Notion-style block editor with a runnable code sandbox and live embeds, a full authoring workflow (server-side autosave, scheduled publishing, revision history, series), an engagement layer (threaded comments, reactions, bookmarks, follows, in-app and email notifications), a crawler-aware SEO stack, an interactive writer-analytics dashboard, and a role-gated admin back office with moderation and support tooling. Built as a React/TypeScript SPA on an Express/MongoDB API, security-hardened and shipped with automated tests wired to CI.',
    problem: {
      title: 'The Challenge',
      description:
        'Most blogging tools force a tradeoff: developer-centric platforms have great editors but weak reach, while marketing-centric ones have great SEO but shallow authoring. Writers end up stitching together an editor, an analytics tool, a comment system, and a newsletter, with no single home. The goal was one cohesive platform that is powerful to write in, discoverable when shared, insightful to measure, and safe to operate at scale.',
      painPoints: [
        'Client-rendered SPAs are invisible to social scrapers and slow for crawlers, so shared links show a generic preview and organic reach suffers',
        'Rich block editors (embeds, callouts, runnable code) are hard to persist safely, since naive sanitization silently strips styling or opens XSS holes',
        'Letting readers run arbitrary code inline is a real security risk, and untrusted code must not reach the logged-in user’s cookies, storage, or API',
        'Writers get vanity totals but no real analytics: no views-over-time, referrers, follower growth, or reader retention',
        'Engagement features (threaded comments, reactions, mentions, notifications) are individually simple but complex to make consistent and spam-resistant',
        'There was no admin shell, moderation queue, or support system, so operating the platform meant editing the database by hand',
      ],
    },
    solution: {
      title: 'The Approach',
      description:
        'I built Kemory as a React 18 and TypeScript SPA (Vite, Redux Toolkit, TanStack Query) on an Express 5 and MongoDB/Mongoose API, deployed across Vercel (client) and Render (API). The architecture is organized around three loops: write (a TipTap block editor with autosave, scheduling, and revisions), read (an SEO-first, theme-aware reading experience with comments and reactions), and operate (writer analytics plus an admin panel for users, posts, moderation, and support). Rather than a full framework migration, SEO was solved with crawler-detecting edge middleware that serves real OG/JSON-LD HTML to bots while humans keep the SPA. Untrusted reader-run code is isolated in a null-origin sandboxed iframe. Every destructive action is cascade-safe, rate-limited, and covered by tests.',
      keyDecisions: [
        {
          decision:
            'Crawler-Prerender Middleware over a Full Next.js Migration',
          rationale:
            'Instead of rewriting a mature SPA into Next.js/Remix for SSR, I added Vercel Edge Middleware that detects crawler user-agents and rewrites /post/* and /u/* to Express prerender endpoints emitting real OG tags and BlogPosting JSON-LD. Humans still get the fast SPA. This shipped correct social and search previews in a fraction of the effort, with SSG/SSR kept open as a later upgrade.',
        },
        {
          decision: 'Null-Origin Sandboxed Iframe for Reader-Run Code',
          rationale:
            'The code sandbox runs JS/TS (client-transpiled) and Python (Pyodide/WASM) inside a per-run iframe sandbox="allow-scripts" with NO allow-same-origin, giving it an opaque/null origin. I verified live that localStorage and document.cookie both throw and self.origin is "null", so untrusted blog content genuinely cannot read the site session or call the API as the viewer. Hung scripts are reclaimed by destroying and recreating the iframe.',
        },
        {
          decision: 'Sanitization Allow-List Co-Designed with the Editor',
          rationale:
            'Custom TipTap blocks (callouts, toggles, embeds, resizable/aligned images, colored text, code sandboxes) store metadata-only markup that the client re-hydrates. The backend sanitize-html allow-list was treated as a first-class part of every block’s design, because attribute and order mismatches silently drop content, so each block was round-tripped through a real publish, not just tested in the editor.',
        },
        {
          decision: 'Append-Only Event Logs for Time-Series Analytics',
          rationale:
            'Rather than overloading counters, I added dedicated ViewEvent, FollowEvent, and ScrollEvent collections (author denormalized for fast per-writer aggregation) written fire-and-forget alongside the existing increments. Endpoints zero-fill every day in range so charts have no gaps, powering views-over-time, referrers, follower growth, and reader retention without touching the hot read path.',
        },
        {
          decision: 'Hand-Rolled OAuth (Google and GitHub), No Passport.js',
          rationale:
            'To stay consistent with the app’s plain-JWT auth, I implemented the authorization-code flow directly: exchange code, fetch profile (GitHub falls back to /user/emails for private emails), then find-by-provider-id, link-by-email, or create-new (auto-verified), and redirect back with a normal Kemory JWT. With a provider’s credentials unset, the endpoint degrades to a friendly /login error instead of throwing.',
        },
        {
          decision: 'Custom Charting on viskit-react and readyui-react',
          rationale:
            'I built a VisKitThemeProvider mapping the app’s --km-* design tokens into the charting engine’s theme, driving both the writer dashboard and the admin overview with custom tooltips, date-range controls, expand-to-modal, and 12+ chart types. One theming layer, with light/dark parity confirmed.',
        },
        {
          decision: 'Design Tokens and One-Line Reduced-Motion',
          rationale:
            'A single --km-* token system (dark default, light via media query) drives every surface, and one <MotionConfig reducedMotion="user"> at the root covers about 35 Framer-animated files with zero per-file changes, verified by sampling mid-animation transforms rather than just presence.',
        },
        {
          decision: 'UI-First, Mock-Backed Admin and Support to De-Risk',
          rationale:
            'The entire admin panel and support flow were built and reviewed against deterministic mock stores before backend endpoints existed, so UX and data shape could be validated end-to-end and each surface only needs its mock swapped for a real service.',
        },
      ],
    },
    features: [
      {
        title: 'Notion-Style Block Editor',
        description:
          'A TipTap-based editor with a slash-command menu (15 commands), callout and toggle blocks, tables, colored text, drag-to-reorder, @mentions with autocomplete, resizable/aligned images with captions, and Markdown round-tripping. Every custom block persists safely through a co-designed sanitization allow-list.',
        images: [
          '/images/case-studies/kemory/editor-slash-menu.webp',
          '/images/case-studies/kemory/code-block.webp',
          '/images/case-studies/kemory/editor-callout.webp',
          '/images/case-studies/kemory/@mentions.webp',
        ],
      },
      {
        title: 'Runnable Code Sandbox & Live Embeds',
        description:
          'An inline playground runs JavaScript, TypeScript (client-transpiled with formatted compile errors), and Python (Pyodide/WASM) inside a null-origin sandboxed iframe, so reader-run code cannot touch the site session. It also supports live YouTube/CodePen embeds, a PDF viewer (canvas-rendered via pdfjs), and Gist cards.',
        images: [
          '/images/case-studies/kemory/sandbox.webp',
          '/images/case-studies/kemory/sandbox-js.webp',
          '/images/case-studies/kemory/sandbox-py.webp',
        ],
      },
      {
        title: 'Authoring Workflow',
        description:
          'Server-side draft autosave (one create-or-update path reused by Save/Publish), scheduled publishing via a minute-interval cron, revision history (snapshots on explicit saves, capped per post, restore-with-undo), series/collections, tags, and a Notion-style cover and emoji icon.',
        images: [
          '/images/case-studies/kemory/auto-save.webp',
          '/images/case-studies/kemory/schedule-post.webp',
          '/images/case-studies/kemory/revision.webp',
        ],
      },
      {
        title: 'Reading Experience',
        description:
          'A focused reader with table of contents, reading-progress bar, related posts, syntax highlighting, five emoji reactions, bookmarks, follows, responsive Cloudinary images, skeleton loaders, and full dark mode, all driven by a shared design-token system with reduced-motion support.',
        images: [
          '/images/case-studies/kemory/post-page.webp',
          '/images/case-studies/kemory/post-page-dark.webp',
          '/images/case-studies/kemory/post-reactions.webp',
        ],
      },
      {
        title: 'Comments, Mentions & Notifications',
        description:
          'Threaded comment replies with likes and in-place edit, @mentions, and per-user spam throttling (verified: exactly 8/min succeed). An in-app notification center (bell, unread badge, mark-read) plus optional per-type email notifications via Resend, triggered on follow, comment, reply, new post, like, and mention.',
        images: [
          '/images/case-studies/kemory/comments.webp',
          '/images/case-studies/kemory/notification.webp',
          '/images/case-studies/kemory/@mentions.webp',
        ],
      },
      {
        title: 'SEO & Discovery',
        description:
          'Crawler-detecting edge middleware serves real OG and BlogPosting JSON-LD HTML to social scrapers and search bots while humans get the SPA. It also ships a dynamic sitemap.xml, an RSS/Atom feed, canonical tags, per-post SEO fields, and Cloudinary-normalized 1200x630 OG images.',
        images: [
          '/images/case-studies/kemory/seo-share.webp',
          '/images/case-studies/kemory/seo-panel.webp',
        ],
      },
      {
        title: 'Performance & Offline PWA',
        description:
          'A production Lighthouse run scored 98 performance and 100 SEO with 0.6s First Contentful Paint, 1.1s Largest Contentful Paint, and 0 Cumulative Layout Shift, achieved via code splitting, lazy routes, and Cloudinary image optimization. Installable as a PWA (vite-plugin-pwa / Workbox) with offline reading of bookmarked posts, an update notifier, an offline banner, and a dedicated iOS "Add to Home Screen" hint.',
        images: [
          '/images/case-studies/kemory/lighthouse-scores.webp',
          '/images/case-studies/kemory/pwa-install.webp',
          '/images/case-studies/kemory/offline-reading.webp',
        ],
      },
      {
        title: 'Writer Analytics Dashboard',
        description:
          'KPI cards plus interactive charts on a custom-themed charting stack: views-over-time with brush selection, referrer breakdown, follower growth, publishing cadence, reactions radar, a sortable top-posts leaderboard, engagement gauge, and a calendar heatmap, backed by append-only event logs and per-post scroll-depth beacons.',
        images: [
          '/images/case-studies/kemory/analytics-kpis.webp',
          '/images/case-studies/kemory/analytics-timeseries.webp',
          '/images/case-studies/kemory/analytics-heatmap.webp',
        ],
      },
      {
        title: 'Admin Panel & Moderation',
        description:
          'A role-gated admin shell (sidebar layout distinct from the public site) with a sitewide overview (interactive charts, date-range controls, expand-to-modal), user management, all-status post management with feature toggles, and a report/flag moderation queue with cascade-safe deletion.',
        images: [
          '/images/case-studies/kemory/admin-overview.webp',
          '/images/case-studies/kemory/admin-users.webp',
          '/images/case-studies/kemory/admin-moderation.webp',
          '/images/case-studies/kemory/admin-posts.webp',
          '/images/case-studies/kemory/post-series.webp',
        ],
      },
      {
        title: 'Support Ticketing & Guided Assistant',
        description:
          'A floating "Kemory Assistant" widget guides signed-in users through a curated decision tree of categorized FAQs via quick-reply buttons, with a simulated typing delay, escalating to a support ticket or email when the flow can\'t resolve the issue. Tickets are auto-numbered, categorized, and threaded, with role-gated status transitions and an admin inbox for triage and inline reply, backed by in-app and email notifications on every new ticket or reply.',
        images: [
          '/images/case-studies/kemory/support-overview.webp',
          '/images/case-studies/kemory/support-ticket-inbox.webp',
          '/images/case-studies/kemory/support-chatbot.webp',
          '/images/case-studies/kemory/admin-support.webp',
          '/images/case-studies/kemory/my-tickets.webp',
        ],
      },
    ],
    impact: [
      {
        metric: 'Content Models',
        value: '13',
        description:
          'Relational Mongoose schemas (posts, comments, series, notifications, reports, tickets, and three time-series event logs) powering cross-referenced features',
      },
      {
        metric: 'Editor Extensions',
        value: '25+',
        description:
          'TipTap nodes and marks including custom callout, toggle, embed, and runnable code-sandbox blocks with safe persistence',
      },
      {
        metric: 'Notification Triggers',
        value: '6',
        description:
          'In-app and optional email notifications across follow, comment, reply, new post, like, and mention events',
      },
      {
        metric: 'Lighthouse Performance',
        value: '98',
        description:
          'Production Lighthouse run scored 98 performance, 100 SEO, and 96 accessibility, with 0.6s First Contentful Paint, 1.1s Largest Contentful Paint, and 0 Cumulative Layout Shift',
      },
    ],
    techStack: {
      Frontend: [
        'React 18',
        'TypeScript',
        'Vite 5',
        'Tailwind CSS v4',
        'Redux Toolkit + TanStack Query',
        'TipTap 3',
        'Framer Motion',
        'viskit-react + readyui-react',
      ],
      Backend: [
        'Node.js',
        'Express 5',
        'MongoDB + Mongoose 8',
        'JWT Auth (bcrypt)',
        'express-validator + rate limiting',
        'sanitize-html',
      ],
      Services: [
        'Cloudinary (Image CDN)',
        'Resend (Transactional Email)',
        'Google & GitHub OAuth',
        'EmailJS (Contact)',
      ],
      Tooling: [
        'Vercel + Render',
        'Vitest + Playwright + Supertest',
        'vite-plugin-pwa (Workbox)',
        'GitHub Actions CI',
        'ESLint',
      ],
    },
    timeline: [
      {
        phase: 'Foundation & Auth',
        duration: '1.5 weeks',
        description:
          'Scaffolded the React/TypeScript SPA and Express/MongoDB API, design-token theming with dark mode, and full auth (email verification, password reset, rate limiting, JWT), later extended with hand-rolled Google/GitHub OAuth.',
      },
      {
        phase: 'Editor & Publishing',
        duration: '2.5 weeks',
        description:
          'Built the TipTap block editor (slash menu, callouts, toggles, embeds, mentions, images), server-side autosave, scheduled publishing, revision history, series, and the runnable null-origin code sandbox, each round-tripped through the sanitization allow-list.',
      },
      {
        phase: 'Reading, Comments & Engagement',
        duration: '2 weeks',
        description:
          'Shipped the reading experience (TOC, progress, related, reactions, bookmarks), threaded comments with likes/edit/mentions, and the in-app and email notification system with per-user spam throttling.',
      },
      {
        phase: 'SEO & Discovery',
        duration: '1 week',
        description:
          'Added crawler-prerender edge middleware, a dynamic sitemap, an RSS feed, JSON-LD structured data, canonical/OG tags, per-post SEO fields, and Cloudinary OG-image normalization.',
      },
      {
        phase: 'Analytics & Time-Series Tracking',
        duration: '2 weeks',
        description:
          'Designed append-only ViewEvent/FollowEvent/ScrollEvent logs and aggregate endpoints, then built the themed writer dashboard: views-over-time, referrers, follower growth, retention, and a calendar heatmap.',
      },
      {
        phase: 'Admin, Support, PWA & CI',
        duration: '2 weeks',
        description:
          'Built the role-gated admin shell (overview, users, posts, support, moderation), the categorized support/ticket flow with a guided assistant, an offline-capable PWA (Workbox), and a Vitest and Playwright test suite wired to GitHub Actions.',
      },
    ],
    learnings: [
      'For a client-rendered SPA, crawler-detecting prerender middleware delivers correct social and search previews at a fraction of the cost of a full SSR framework migration, a pragmatic 80/20 that keeps SSR open as a later upgrade.',
      'Running untrusted code safely comes down to one detail: a sandboxed iframe WITHOUT allow-same-origin gets a null origin, so it cannot read cookies, localStorage, or the API session. Verifying it live, rather than trusting the config, is what proves it.',
      'A rich editor and its backend sanitization allow-list must be designed together. Attribute presence and even attribute ORDER matter, and the only reliable test is round-tripping each block through a real publish, since the editor can look correct while the saved HTML is silently stripped.',
      'For analytics, append-only event logs beat mutating counters: they keep the hot read path fast, enable any time-series view after the fact, and zero-filling gaps client-agnostically avoids misleading charts.',
      'Beacons need two exit paths: pagehide covers real browser navigations, but in-app SPA route changes never fire it, only React unmount does. I confirmed with a real repro that both are genuinely required, not redundant.',
      'Tailwind v4’s canonical class rules (bg-linear-to-*, numeric spacing, no arbitrary values) surface at build time, so adopting a canonical-class discipline early prevents a long tail of silent lint and build failures.',
    ],
    links: {
      live: 'https://kemory.ink',
      github: 'https://github.com/Kemi-Oluwadahunsi/Kemory',
    },
  },
}
