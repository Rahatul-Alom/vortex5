import { ServiceCategory, Service, Project, Testimonial, ContactInquiry, SiteSettings } from '../src/types.js';

export const initialCategories: ServiceCategory[] = [
  {
    id: 1,
    code: 'graphic-design',
    name: 'Graphic & UI/UX Design',
    category_number: '01',
    tagline: 'Unforgettable brand identities, UI/UX systems & visual design',
    description: 'We create distinctive visual identities, intuitive web/mobile UI/UX interfaces, and high-impact marketing collateral.'
  },
  {
    id: 2,
    code: 'web-development',
    name: 'Web Design & Development',
    category_number: '02',
    tagline: 'High-performance websites, eCommerce platforms & modern web applications',
    description: 'We design and develop fast, responsive, conversion-focused digital experiences powered by Next.js, React 19, and scalable backends.'
  },
  {
    id: 3,
    code: 'ai-automation',
    name: 'AI Automation',
    category_number: '03',
    tagline: 'Autonomous AI agents, smart workflows & process automation',
    description: 'We empower organizations with custom AI chatbots, automated business pipelines, LLM integration, and CRM workflow intelligence.'
  },
  {
    id: 4,
    code: 'video-motion',
    name: 'Video Editing & Motion Graphics',
    category_number: '04',
    tagline: 'Kinetic storytelling, high-retention commercial video & 3D motion',
    description: 'From high-converting social media reels to cinematic brand commercials and 3D kinetic typography, we create visuals that captivate.'
  },
  {
    id: 5,
    code: 'architecture-3d',
    name: 'Architecture (Interior, Exterior & 3D)',
    category_number: '05',
    tagline: 'Photorealistic 3D rendering, interior/exterior design & spatial walkthroughs',
    description: 'State-of-the-art 3D architectural visualization, BIM spatial modeling, and immersive walkthroughs for residential and commercial spaces.'
  },
  {
    id: 6,
    code: 'digital-marketing',
    name: 'Digital Marketing',
    category_number: '06',
    tagline: 'Data-driven growth, technical SEO, performance ads & market positioning',
    description: 'We scale high-growth brands through algorithmic SEO, targeted PPC campaigns, conversion rate optimization, and omnichannel marketing.'
  }
];

export const initialServices: Service[] = [
  // 1. Graphic & UI/UX Design (category_id: 1)
  {
    id: 1,
    category_id: 1,
    title: 'Professional Logo & Brand Identity',
    slug: 'logo-brand-identity',
    short_description: 'Complete visual identity systems: logos, typography guidelines, color psychology, and comprehensive brand books.',
    full_description: 'We forge distinctive visual signatures that establish authority and resonate deeply with discerning target audiences across digital and tactile applications.',
    icon_name: 'Sparkles',
    deliverables: [
      'Primary, Secondary & Monogram Logo Marks',
      'Typography Hierarchy & Color Harmony System',
      'Comprehensive Brand Style Guide (PDF)',
      'Vector & Print Production Standards (.AI, .SVG)',
      'Brand Asset Library for Social & Web'
    ],
    technologies: ['Adobe Illustrator', 'Figma', 'Photoshop', 'Vector Standards'],
    is_active: true,
    sort_order: 1
  },
  {
    id: 2,
    category_id: 1,
    title: 'UI/UX Design for Web & Mobile Apps',
    slug: 'ui-ux-design',
    short_description: 'Human-centric user experience architectures, responsive wireframes, design systems, and high-fidelity interactive prototypes.',
    full_description: 'We create intuitive, aesthetically refined product experiences that simplify complex workflows and maximize user engagement and retention.',
    icon_name: 'Layout',
    deliverables: [
      'User Research & Information Architecture',
      'Interactive Figma Prototypes & User Testing',
      'Complete Mobile & Desktop Design Systems',
      'Design Token Specifications for Developers',
      'Micro-Interaction & Motion Specs'
    ],
    technologies: ['Figma', 'FigJam', 'Tokens Studio', 'Protopie'],
    is_active: true,
    sort_order: 2
  },
  {
    id: 3,
    category_id: 1,
    title: 'Social Media & Ad Creative Design',
    slug: 'social-media-design',
    short_description: 'High-engagement social assets, advertising banners, carousel sets, and conversion-engineered campaign visuals.',
    full_description: 'Stop the scroll with meticulously crafted visual assets engineered for Instagram, LinkedIn, YouTube, and digital advertising campaigns.',
    icon_name: 'Share2',
    deliverables: [
      'Instagram Carousel & Story Kit Sets',
      'LinkedIn & Facebook Paid Ad Creatives',
      'YouTube Thumbnail & Channel Header Assets',
      'Custom Editable Figma / Canva Templates'
    ],
    technologies: ['Figma', 'Photoshop', 'Midjourney AI', 'After Effects'],
    is_active: true,
    sort_order: 3
  },
  {
    id: 4,
    category_id: 1,
    title: 'Packaging & Print Collateral',
    slug: 'packaging-print-collateral',
    short_description: 'Luxury stationery, multi-page company profiles, bespoke packaging dielines, and trade show collateral.',
    full_description: 'Compelling print narratives that communicate brand prestige with clarity, elegance, and tactile impact.',
    icon_name: 'FileText',
    deliverables: [
      'Packaging Dielines & 3D Mockups',
      'Corporate Brochures & Company Profiles',
      'Business Stationery with Spot UV / Foil Dielines',
      'Certified Press-Ready Print Files'
    ],
    technologies: ['Adobe InDesign', 'Illustrator', 'Pantone Matching'],
    is_active: true,
    sort_order: 4
  },

  // 2. Web Design & Development (category_id: 2)
  {
    id: 5,
    category_id: 2,
    title: 'Custom Website Development',
    slug: 'custom-website-development',
    short_description: 'Tailored web experiences built specifically for your business logic, conversion goals, and performance metrics.',
    full_description: 'From bespoke company portals to complex web architectures, we build from the ground up with zero bloatware, utilizing Next.js, TypeScript, and modern modular design.',
    icon_name: 'Globe',
    deliverables: [
      'Custom UI/UX Implementation',
      'Mobile-First Responsive Layouts',
      'CMS & Database Integration',
      'Full SEO & Performance Optimization',
      'Cross-Browser & Device QA'
    ],
    technologies: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    is_active: true,
    sort_order: 5
  },
  {
    id: 6,
    category_id: 2,
    title: 'High-Converting eCommerce Stores',
    slug: 'ecommerce-development',
    short_description: 'Scalable online stores with frictionless checkouts, payment gateways, and inventory synchronization.',
    full_description: 'Modern eCommerce platforms built on robust architectures designed for high transaction volume, fast mobile checkout, and customer lifetime value.',
    icon_name: 'ShoppingBag',
    deliverables: [
      'Full Checkout Flow & Cart State',
      'Stripe, PayPal & Regional Gateways',
      'Inventory & Order Synchronization',
      'Product Recommendation Engine',
      'Mobile Commerce Optimization'
    ],
    technologies: ['Next.js', 'Shopify Headless', 'MySQL', 'Stripe', 'Node.js'],
    is_active: true,
    sort_order: 6
  },
  {
    id: 7,
    category_id: 2,
    title: 'React 19 Single Page Applications',
    slug: 'react-spa-development',
    short_description: 'Dynamic, real-time web applications with fluid state transitions and instant responsiveness.',
    full_description: 'Rich single-page web applications that feel as instant and responsive as desktop software, powered by modern React state systems and optimized rendering trees.',
    icon_name: 'Zap',
    deliverables: [
      'Component-Driven Architecture',
      'Global State Management (Zustand/Context)',
      'Fluid Micro-Interactions & Transitions',
      'Progressive Web App (PWA) Offline Readiness',
      'REST / GraphQL Data Pipeline'
    ],
    technologies: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'Motion'],
    is_active: true,
    sort_order: 7
  },
  {
    id: 8,
    category_id: 2,
    title: 'Business & Management Portals',
    slug: 'business-management-portals',
    short_description: 'Custom administrative dashboards, reservation engines, and internal operations software.',
    full_description: 'End-to-end bespoke web platforms connecting real-time booking engines, client portals, and administrative management.',
    icon_name: 'Building2',
    deliverables: [
      'Role-Based Admin Dashboards',
      'Automated Notifications & Invoicing',
      'Real-Time Booking & Reservation Engines',
      'Secure Authentication & Audit Logs'
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL / MySQL', 'Tailwind CSS'],
    is_active: true,
    sort_order: 8
  },

  // 3. AI Automation (category_id: 3)
  {
    id: 9,
    category_id: 3,
    title: 'Intelligent AI Customer Support Agents',
    slug: 'ai-support-agents',
    short_description: '24/7 autonomous conversational AI agents tailored to your knowledge base, documentation, and CRM systems.',
    full_description: 'Custom AI conversational agents that resolve inquiries instantly, qualify inbound leads, and seamlessly escalate complex cases to human teams.',
    icon_name: 'Bot',
    deliverables: [
      'RAG Knowledge Base Ingestion',
      'WhatsApp, Web & CRM Multi-Channel Bot',
      'Natural Multi-Turn Conversational Logic',
      'Lead Qualification & Auto-Appointment Booking',
      'Sentiment Analysis & Escalation Hooks'
    ],
    technologies: ['Gemini 2.5', 'OpenAI', 'LangChain', 'Python', 'Node.js'],
    is_active: true,
    sort_order: 9
  },
  {
    id: 10,
    category_id: 3,
    title: 'Automated Business Process Pipelines',
    slug: 'business-process-automation',
    short_description: 'End-to-end workflow automation connecting your sales, billing, marketing, and client fulfillment tools.',
    full_description: 'Eliminate repetitive manual busywork with resilient automated event-driven pipelines that synchronize data across your tech stack in milliseconds.',
    icon_name: 'Workflow',
    deliverables: [
      'Zapier, Make & Custom Webhook Architecture',
      'Automated Invoice & Contract Generation',
      'Database Sync & Data Scraping Pipelines',
      'Real-Time Slack/Discord Alerts & Monitoring'
    ],
    technologies: ['n8n', 'Make', 'Zapier', 'Python', 'PostgreSQL'],
    is_active: true,
    sort_order: 10
  },
  {
    id: 11,
    category_id: 3,
    title: 'Custom AI Model & Gemini Integration',
    slug: 'custom-ai-integration',
    short_description: 'Embed modern multimodal generative AI capabilities directly into your web products and operational tools.',
    full_description: 'Supercharge your software with computer vision, automated text generation, predictive analytics, and smart document parsing powered by Gemini.',
    icon_name: 'Cpu',
    deliverables: [
      'Gemini Flash & Pro API Implementation',
      'Multimodal Document & Image Analyzers',
      'Structured JSON AI Extraction Pipelines',
      'Zero-Latency Streaming Endpoints'
    ],
    technologies: ['Google GenAI SDK', 'TypeScript', 'Python', 'FastAPI'],
    is_active: true,
    sort_order: 11
  },

  // 4. Video Editing & Motion Graphics (category_id: 4)
  {
    id: 12,
    category_id: 4,
    title: 'Commercial & Brand Video Production',
    slug: 'commercial-video-production',
    short_description: 'Cinematic brand films, corporate overview videos, commercial advertisements, and founder stories.',
    full_description: 'We edit compelling visual stories with dynamic sound design, precision pacing, and broadcast-grade color grading that elevate your brand image.',
    icon_name: 'Video',
    deliverables: [
      'Cinematic Editing & Multi-Cam Sync',
      'Professional Sound Design & Foley Mixing',
      'Hollywood-Grade Color Grading (DaVinci)',
      'Deliverables in 4K UHD, 16:9 and 9:16'
    ],
    technologies: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Sound Design Suites'],
    is_active: true,
    sort_order: 12
  },
  {
    id: 13,
    category_id: 4,
    title: '2D & 3D Motion Graphics',
    slug: 'motion-graphics-kinetic',
    short_description: 'Kinetic typography, animated logo reveals, explanatory infographics, and fluid UI interaction showcases.',
    full_description: 'Bring static ideas to life with high-retention motion graphics that communicate complex technical concepts in seconds.',
    icon_name: 'Film',
    deliverables: [
      'Kinetic Typography & Lyric Sequences',
      'Logo Animation & Brand Identity Motion ID',
      'Product Explainer Animations',
      'Lottie JSON Web Motion Assets'
    ],
    technologies: ['After Effects', 'Cinema 4D', 'Blender', 'Lottie'],
    is_active: true,
    sort_order: 13
  },
  {
    id: 14,
    category_id: 4,
    title: 'Short-Form Viral Content (Reels/Shorts)',
    slug: 'short-form-viral-video',
    short_description: 'Hook-driven, high-retention TikTok, Instagram Reels, and YouTube Shorts engineered for organic virality.',
    full_description: 'Fast-paced video editing with animated subtitles, sound effects, B-roll overlays, and psychological retention hooks.',
    icon_name: 'Play',
    deliverables: [
      'Custom Dynamic Animated Captions',
      'Attention-Grabbing Hook Editing',
      'B-Roll & Sound Effect Stems',
      'Optimized Vertical 9:16 Rendering'
    ],
    technologies: ['Premiere Pro', 'CapCut Pro', 'After Effects'],
    is_active: true,
    sort_order: 14
  },

  // 5. Architecture (Interior, Exterior & 3D) (category_id: 5)
  {
    id: 15,
    category_id: 5,
    title: 'Photorealistic 3D Exterior Visualization',
    slug: 'exterior-3d-visualization',
    short_description: 'High-definition architectural rendering of residential villas, commercial towers, and landscape developments.',
    full_description: 'Stunning hyper-realistic 3D exterior renders featuring atmospheric lighting, accurate materials, and natural surroundings for developers and architects.',
    icon_name: 'Building2',
    deliverables: [
      'Day & Night Exterior Lighting Visuals',
      'Landscape & Surrounding Context Integration',
      'High-Resolution Print-Ready Renders (8K)',
      'Material & Texture Specification Callouts'
    ],
    technologies: ['3ds Max', 'Corona Renderer', 'V-Ray', 'Lumion', 'Photoshop'],
    is_active: true,
    sort_order: 15
  },
  {
    id: 16,
    category_id: 5,
    title: 'Interior Design & Spatial Modeling',
    slug: 'interior-design-3d',
    short_description: 'Bespoke interior space planning, furniture styling, photorealistic lighting, and mood boards.',
    full_description: 'Elevate real estate and interior concepts with meticulously detailed 3D rooms showcasing custom millwork, fixtures, and textures.',
    icon_name: 'Layers',
    deliverables: [
      'Full Interior Room Scene Renderings',
      'Custom Furniture & Material Schedules',
      'Lighting Simulation & Color Palette Boards',
      'Floor Plan & Spatial Layout Optimization'
    ],
    technologies: ['3ds Max', 'SketchUp', 'V-Ray', 'Blender'],
    is_active: true,
    sort_order: 16
  },
  {
    id: 17,
    category_id: 5,
    title: 'Interactive 3D Virtual Walkthroughs',
    slug: 'virtual-3d-walkthroughs',
    short_description: 'Immersive 360° virtual tours and cinematic camera walkthroughs for pre-construction marketing.',
    full_description: 'Allow clients, investors, and prospective buyers to step inside unbuilt spaces before construction begins with cinematic camera animation.',
    icon_name: 'Compass',
    deliverables: [
      'Cinematic 4K Fly-Through Video Sequences',
      '360° Panoramic Web VR Panorama Nodes',
      'Interactive Floor Plan Touchpoints',
      'Web-Embeddable Virtual Tour Player'
    ],
    technologies: ['Unreal Engine 5', 'Lumion', 'Twinmotion', 'Premiere Pro'],
    is_active: true,
    sort_order: 17
  },

  // 6. Digital Marketing (category_id: 6)
  {
    id: 18,
    category_id: 6,
    title: 'Technical & Algorithmic SEO',
    slug: 'technical-seo-growth',
    short_description: 'Data-driven search engine optimization, on-page content architecture, speed audits, and link authority.',
    full_description: 'Dominate organic search with foundational technical SEO, keyword strategy, schema markup, and content clusters that drive inbound qualified buyers.',
    icon_name: 'TrendingUp',
    deliverables: [
      'Comprehensive Technical SEO & Speed Audit',
      'High-Intent Commercial Keyword Roadmap',
      'On-Page Optimization & Schema Markup',
      'Competitor Gap Analysis & Backlink Strategy'
    ],
    technologies: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog'],
    is_active: true,
    sort_order: 18
  },
  {
    id: 19,
    category_id: 6,
    title: 'Targeted Paid Ads (Google & Meta)',
    slug: 'targeted-paid-advertising',
    short_description: 'High-ROI performance marketing campaigns on Google Search, Meta (Facebook/Instagram), and LinkedIn Ads.',
    full_description: 'Scale revenue predictably with hyper-targeted audience segments, A/B creative testing, and rigorous cost-per-acquisition optimization.',
    icon_name: 'Megaphone',
    deliverables: [
      'Full Campaign Setup & Audience Targeting',
      'Ad Copywriting & Visual Asset Testing',
      'Pixel, CAPI & Conversion Tracking Setup',
      'Weekly ROAS & Performance Telemetry Reports'
    ],
    technologies: ['Meta Ads Manager', 'Google Ads', 'LinkedIn Campaign Manager', 'GA4'],
    is_active: true,
    sort_order: 19
  },
  {
    id: 20,
    category_id: 6,
    title: 'Conversion Rate Optimization (CRO)',
    slug: 'conversion-rate-optimization',
    short_description: 'Funnel analytics, heatmaps, landing page A/B testing, and friction reduction to maximize customer revenue.',
    full_description: 'Turn more existing visitors into paying clients through scientific behavioral tracking, UX adjustments, and checkout optimization.',
    icon_name: 'Target',
    deliverables: [
      'Heatmap & User Session Recording Audits',
      'Landing Page A/B Split Testing Protocols',
      'Form Optimization & Abandonment Recovery',
      'Conversion Architecture Recommendations'
    ],
    technologies: ['Hotjar', 'Google Optimize', 'Mixpanel', 'VWO'],
    is_active: true,
    sort_order: 20
  }
];

export const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Aura Luxe Hospitality Platform',
    slug: 'aura-hospitality-platform',
    category: 'Web Development',
    client: 'Aura Hotels & Resorts',
    industry: 'Hospitality & Luxury Travel',
    year: '2026',
    short_description: 'Full-stack custom hotel booking engine and guest management system with instant room synchronization.',
    challenge: 'The client relied on fragmented 3rd-party OTAs (Booking.com, Expedia) with punishing 18-22% commission fees and slow, disconnected room inventory updates that occasionally caused double bookings during peak tourist season.',
    solution: 'Engineered a bespoke Next.js reservation engine with real-time room availability, Stripe payment processing, room upgrade upselling, and instant WhatsApp automated confirmations directly to the guest’s phone.',
    result: 'Direct website bookings jumped by 142% in the first 90 days, eliminating over $84,000 in OTA commission expenses while decreasing average check-in front desk wait time by 60%.',
    development_process: 'Architected microservices around a central MySQL cluster. Developed a React 19 UI with optimistic UI updates and instant date-picker caching. Integrated Socket.io for live room status broadcast.',
    design_process: 'Designed an immersive dark-luxe aesthetic inspired by Scandinavian boutique architecture, pairing high-contrast serif headlines with muted stone photography.',
    technologies: ['Next.js', 'React 19', 'MySQL', 'Node.js', 'Tailwind CSS', 'Stripe API'],
    featured_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    live_url: 'https://aura-resort.demo.vortex.agency',
    github_url: 'https://github.com/vortex-agency/aura-hospitality',
    is_featured: true,
    is_published: true,
    sort_order: 1
  },
  {
    id: 2,
    title: 'Nexus Cybernetics Brand Identity',
    slug: 'nexus-cybernetics-branding',
    category: 'Branding',
    client: 'Nexus AI Systems',
    industry: 'Artificial Intelligence & Robotics',
    year: '2026',
    short_description: 'Complete visual identity, 3D brand language, and marketing assets for an enterprise robotics venture.',
    challenge: 'Nexus was shifting from deep-tech academic research obscurity into an authoritative enterprise brand preparing to pitch institutional investors for a $20M+ Series B funding round.',
    solution: 'Crafted an abstract geometric logo mark signifying machine neural pathways, accompanied by an electric cybernetic cyan-and-slate color system, custom 3D asset renders, and an investor-ready design system.',
    result: 'Successfully closed a $24M Series B round led by tier-one venture funds. Investor sentiment specifically highlighted the clarity, maturity, and enterprise gravity of their presentation materials.',
    development_process: 'Synthesized market perception benchmarks across 30 enterprise robotics competitors, established vector geometries for extreme scaling, and built an interactive design token library in Figma.',
    design_process: 'Harmonized technical computational precision with humanistic editorial typography (Syne display paired with Swiss geometric grotesk).',
    technologies: ['Adobe Illustrator', 'Figma', 'Cinema 4D', 'Brand Guidelines'],
    featured_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80'
    ],
    live_url: 'https://nexus.demo.vortex.agency',
    is_featured: true,
    is_published: true,
    sort_order: 2
  },
  {
    id: 3,
    title: 'KRONOS Minimalist Horology Store',
    slug: 'kronos-horology-ecommerce',
    category: 'eCommerce',
    client: 'Kronos Timepieces Ltd.',
    industry: 'Luxury Goods & eCommerce',
    year: '2026',
    short_description: 'High-conversion headless eCommerce experience featuring interactive 360-degree watch view and instant checkout.',
    challenge: 'Kronos had an outdated monolithic WooCommerce installation that suffered from sluggish 4.8-second load times and a crippling 78% mobile checkout abandonment rate.',
    solution: 'Rebuilt the frontend using React and Vite with server-rendered product pages, dynamic edge caching, sub-second load times, and frictionless Apple Pay / Google Pay one-click checkout.',
    result: 'Mobile conversion rate soared from 1.2% to 4.1%, with average order value (AOV) climbing by 28% due to interactive product customization.',
    development_process: 'Integrated a headless commerce backend with edge-cached GraphQL queries and zero-layout-shift WebP image streaming.',
    design_process: 'Applied minimalist Swiss typography, tactile micro-interactions, and high-resolution dark mode product showcases.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Shopify Headless', 'MySQL', 'Node.js'],
    featured_image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80'
    ],
    live_url: 'https://kronos.demo.vortex.agency',
    github_url: 'https://github.com/vortex-agency/kronos-store',
    is_featured: true,
    is_published: true,
    sort_order: 3
  },
  {
    id: 4,
    title: 'Veloce Hypercar Digital Showcase',
    slug: 'veloce-hypercar-showcase',
    category: 'UI/UX',
    client: 'Veloce Automotive Group',
    industry: 'Automotive & Design',
    year: '2025',
    short_description: 'Interactive web showcase with custom 3D car configurator and aerodynamic air-flow simulation.',
    challenge: 'Veloce needed an unforgettable digital launch experience for their limited-edition 1,200hp electric hypercar to pre-sell all 99 allocations globally.',
    solution: 'Created an interactive canvas featuring real-time 3D model orbit, paint finish reflection shaders, cockpit interior walkthrough, and personalized build reservation requests.',
    result: 'Generated 450,000 unique global impressions during launch week. All 99 production slots were completely allocated within 72 hours.',
    development_process: 'Utilized Three.js shaders with optimized polygon compression for smooth 60fps interaction on mobile GPUs.',
    design_process: 'Monochrome cockpit interface with neon telemetry accents, inspired by Le Mans race telematics.',
    technologies: ['React', 'Three.js', 'WebGL', 'TypeScript', 'Tailwind CSS'],
    featured_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    live_url: 'https://veloce.demo.vortex.agency',
    is_featured: false,
    is_published: true,
    sort_order: 4
  },
  {
    id: 5,
    title: 'Oasis Organic Botanical Packaging',
    slug: 'oasis-botanicals-packaging',
    category: 'Graphic Design',
    client: 'Oasis Herbal Care',
    industry: 'Health & Wellness',
    year: '2025',
    short_description: 'Sustainable packaging system, foil-stamped business stationery, and retail flyer suite.',
    challenge: 'Oasis was expanding into luxury retail department stores and needed packaging and marketing collateral that felt sustainably pure yet undeniably high-end.',
    solution: 'Designed amber glass apothecary labeling, embossed matte cardboard boxes with gold foil accents, and tactile botanical line-art brochures.',
    result: 'Secured national distribution agreements with 85 premium department store locations across Europe and North America.',
    development_process: 'Calibrated Pantone inks for unbleached paper substrates and engineered dielines with zero chemical adhesive requirements.',
    design_process: 'Hand-drawn botanical vector illustrations paired with subtle editorial serif typography and generous negative space.',
    technologies: ['Adobe InDesign', 'Illustrator', 'Packaging Standards', 'Print Production'],
    featured_image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    live_url: 'https://oasis.demo.vortex.agency',
    is_featured: false,
    is_published: true,
    sort_order: 5
  },
  {
    id: 6,
    title: 'Synth Capital Fintech Dashboard',
    slug: 'synth-capital-fintech',
    category: 'Web Development',
    client: 'Synth Financial Corp',
    industry: 'Fintech & Investment',
    year: '2026',
    short_description: 'Institutional-grade asset analytics dashboard with live market feeds, algorithmic alerts, and portfolio tracking.',
    challenge: 'Investment analysts were dealing with fragmented desktop terminals that lagged during volatile market events and lacked collaborative real-time note taking.',
    solution: 'Engineered a lightning-fast browser-based financial terminal featuring high-frequency chart rendering, customizable workspace panels, and algorithmic threshold alerts.',
    result: 'Cut trade execution preparation latency by 40% while sustaining 20,000 live price ticks per second with zero UI stuttering.',
    development_process: 'Canvas-based chart rendering engine with web workers processing inbound WebSocket tick streams off the main thread.',
    design_process: 'Dense, dark-mode terminal layout with mathematically proportioned data tables and high-contrast alert indicators.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Node.js', 'MySQL'],
    featured_image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    github_url: 'https://github.com/vortex-agency/synth-capital',
    live_url: 'https://synth.demo.vortex.agency',
    is_featured: true,
    is_published: true,
    sort_order: 6
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    client_name: 'Marcus Vance',
    company: 'Aura Hotels & Resorts',
    position: 'Chief Commercial Officer',
    testimonial: 'Working with Vortex completely reshaped our digital business. Their team delivered a hotel platform that not only looks world-class but quadrupled our direct revenue within 90 days. They are true technical artists who treat our conversion numbers with the same obsession we do.',
    rating: 5,
    profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    project_id: 1,
    is_published: true
  },
  {
    id: 2,
    client_name: 'Elena Rostova',
    company: 'Nexus AI Systems',
    position: 'VP of Marketing',
    testimonial: 'Vortex took our complex machine learning capabilities and translated them into an electrifying visual brand identity. The investor response to our Series B deck and web launch was phenomenal. They deliver high-concept agency craft with startup agility.',
    rating: 5,
    profile_image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    project_id: 2,
    is_published: true
  },
  {
    id: 3,
    client_name: 'David Chen',
    company: 'Kronos Horology',
    position: 'Founder & Creative Director',
    testimonial: 'The speed, fluid animations, and obsessive attention to detail that Vortex brought to Kronos exceeded every agency we’ve worked with in London and New York. Our mobile sales jumped immediately upon launch.',
    rating: 5,
    profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    project_id: 3,
    is_published: true
  },
  {
    id: 4,
    client_name: 'Sarah Jenkins',
    company: 'Oasis Botanicals',
    position: 'Brand Director',
    testimonial: 'Their graphic design and packaging work helped our organic line get picked up by luxury department stores across Europe. They understand print production, typography, and consumer psychology at an elite level.',
    rating: 5,
    profile_image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    project_id: 5,
    is_published: true
  }
];

export const initialInquiries: ContactInquiry[] = [
  {
    id: 1,
    name: 'Julian Sterling',
    email: 'j.sterling@sterling-architects.com',
    phone: '+1 415 892 4019',
    company: 'Sterling Architects',
    service_name: 'Custom Website Development',
    budget: '$2,500+',
    message: 'We are looking to overhaul our architectural portfolio with fluid interactive project showcases and a minimalist dark aesthetic similar to Musemind. Need launch before Q3.',
    status: 'In Progress',
    admin_notes: 'Initial discovery call scheduled. Client wants custom 3D model integration.',
    created_at: '2026-03-05T14:22:00Z'
  },
  {
    id: 2,
    name: 'Sophia Laurent',
    email: 'sophia@luxehorology.ch',
    phone: '+41 22 819 9002',
    company: 'Laurent Geneve',
    service_name: 'eCommerce Development',
    budget: '$2,500+',
    message: 'Seeking a headless Shopify store for our Swiss watch manufacturing house. We require multi-currency checkout, VIP client portal, and bespoke typography.',
    status: 'Contacted',
    admin_notes: 'Proposal draft sent on March 7th. Waiting for creative director feedback.',
    created_at: '2026-03-07T09:15:00Z'
  },
  {
    id: 3,
    name: 'Rahim Al-Mansoor',
    email: 'rahim@solargrid.tech',
    phone: '+971 50 123 4567',
    company: 'SolarGrid Global',
    service_name: 'Professional Logo & Branding',
    budget: '$1,000 – $2,500',
    message: 'Need a complete brand identity revamp including logo, brand book, social media templates, and business stationery for our upcoming renewable energy summit in Dubai.',
    status: 'New',
    admin_notes: '',
    created_at: '2026-03-09T16:40:00Z'
  }
];

export const initialSettings: SiteSettings = {
  agency_name: 'VORTEX5',
  tagline: 'Creative × Technology | We Design. We Build. We Automate.',
  hero_headline: 'WE BUILD DIGITAL EXPERIENCES THAT MOVE BUSINESSES FORWARD.',
  hero_subtext: 'We help businesses grow and reach the absolute peak of success through creativity, technology, and innovation.',
  contact_email: 'hello@vortex5.net',
  contact_phone: '+1 (555) 019-2834',
  whatsapp_number: '15550192834',
  office_address: 'Suite 800, Tech & Design Plaza, Silicon District',
  facebook_url: 'https://facebook.com/vortexagency',
  instagram_url: 'https://instagram.com/vortexagency',
  linkedin_url: 'https://linkedin.com/company/vortex-agency',
  github_url: 'https://github.com/vortex-agency',
  footer_copyright: '© 2026 VORTEX5 Digital Agency. All rights reserved.'
};
