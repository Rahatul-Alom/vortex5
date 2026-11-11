export type ServiceKey = "web" | "marketing" | "creative" | "video" | "ecommerce" | "saas";

export type Service = {
  key: ServiceKey;
  slug: string;
  name: string;
  short: string;
  desc: string;
  headline: string;
  tech: string[];
  deliverables: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    key: "web",
    slug: "web-design-development",
    name: "Web Design & Development",
    short: "Websites that load fast and turn visitors into enquiries.",
    desc: "Fast, scalable websites and web apps built on modern stacks — from marketing sites to complex platforms.",
    headline: "Websites built to win customers, not just to look good.",
    tech: ["Next.js", "React", "TypeScript", "Laravel", "Tailwind CSS", "Node.js"],
    deliverables: [
      { title: "Business & company websites", text: "Clear structure, strong copy placement and calls to action that make it easy to contact you." },
      { title: "Landing pages", text: "Single-purpose pages for campaigns, launches and ads, built to convert." },
      { title: "Web applications", text: "Portals, booking systems and member areas with secure logins and clean admin panels." },
      { title: "Speed & SEO foundations", text: "Core Web Vitals tuning, clean markup, sitemaps and metadata so search engines can find you." },
      { title: "CMS & content tools", text: "Edit pages, posts and products yourself without calling a developer." },
      { title: "Care plans", text: "Hosting, backups, security updates and small changes after launch." },
    ],
    faqs: [
      { q: "How long does a business website take?", a: "Most business websites take 3–6 weeks from kickoff to launch, depending on the number of pages and how quickly content is shared with us." },
      { q: "Will I be able to update the site myself?", a: "Yes. We set up an editing area for the pages you want to change and show you how to use it." },
      { q: "Do you build mobile-friendly sites?", a: "Every site we build is designed for phones first, then scaled up for tablets and desktops." },
    ],
  },
  {
    key: "marketing",
    slug: "digital-marketing",
    name: "Digital Marketing",
    short: "Campaigns that bring in measurable leads and sales.",
    desc: "SEO, paid ads and social media that put your business in front of the right people — and report what it earned.",
    headline: "Marketing that brings customers to your door and shows you the numbers.",
    tech: ["Meta Ads", "Google Ads", "Google Analytics 4", "Search Console", "Semrush", "Mailchimp"],
    deliverables: [
      { title: "Search engine optimisation", text: "Keyword research, on-page fixes and content plans that grow organic traffic month after month." },
      { title: "Paid advertising", text: "Facebook, Instagram and Google campaigns with clear budgets, testing and weekly optimisation." },
      { title: "Social media management", text: "Content calendars, post design and community replies for the channels your customers use." },
      { title: "Email & WhatsApp campaigns", text: "Offers, follow-ups and reminders that bring past customers back." },
      { title: "Conversion tracking", text: "Pixels, events and dashboards so every lead and sale is traced back to its source." },
      { title: "Monthly reporting", text: "A plain-language report on spend, leads, cost per lead and what we will change next." },
    ],
    faqs: [
      { q: "How soon will I see results from ads?", a: "Paid campaigns usually produce leads within the first two weeks while we test audiences and creatives. SEO is slower and typically shows steady gains over 3–6 months." },
      { q: "Do I need a website before starting?", a: "A landing page or website helps because ads need somewhere to send people. If you don't have one, we can build it as part of the plan." },
      { q: "Who owns the ad accounts?", a: "You do. We work inside your accounts so you keep full access to the data and history." },
    ],
  },
  {
    key: "creative",
    slug: "graphic-design-printing",
    name: "Graphic Design & Printing",
    short: "Brand identity and print work that makes you look established.",
    desc: "Logos, brand identity, social creatives and print-ready artwork that keep your story consistent.",
    headline: "A brand identity people recognise and remember.",
    tech: ["Illustrator", "Photoshop", "InDesign", "CorelDRAW"],
    deliverables: [
      { title: "Logo & brand identity", text: "Logo, colour palette, typography and usage rules in one brand guideline." },
      { title: "Social media creatives", text: "Post templates, campaign visuals and ad banners in your brand style." },
      { title: "Print collateral", text: "Business cards, brochures, flyers, menus and company profiles ready for the press." },
      { title: "Packaging & labels", text: "Box, bottle and label artwork with correct dies, bleeds and colour modes." },
      { title: "Signage & large format", text: "Billboards, banners and standees designed at the right resolution and size." },
      { title: "Print supervision", text: "We coordinate with the printer and check proofs so what arrives matches the design." },
    ],
    faqs: [
      { q: "Do you handle the printing as well?", a: "We prepare print-ready files and coordinate with trusted printers. You approve the proof before anything goes to press." },
      { q: "What files will I receive?", a: "Editable source files plus exports for web and print (PDF, PNG, SVG), so you are never locked in." },
      { q: "How many logo concepts do I get?", a: "Typically two to three directions, then refinement rounds on the one you pick." },
    ],
  },
  {
    key: "video",
    slug: "video-editing-motion-graphics",
    name: "Video Editing & Motion Graphics",
    short: "Videos and animations that hold attention in the first three seconds.",
    desc: "Promo videos, reels, explainers and animated graphics edited for the platforms where your audience watches.",
    headline: "Video that stops the scroll and tells your story fast.",
    tech: ["After Effects", "Premiere Pro", "DaVinci Resolve", "Blender"],
    deliverables: [
      { title: "Promo & brand videos", text: "Short films that introduce your company, product or event." },
      { title: "Reels & short-form content", text: "Vertical edits with captions, pacing and hooks made for Facebook, Instagram and TikTok." },
      { title: "Explainer animations", text: "Simple animated stories that make a complex product easy to understand." },
      { title: "Logo animation & intros", text: "Branded openers, lower thirds and end cards you can reuse in every video." },
      { title: "Colour grading & sound", text: "Consistent colour, clean audio and music licensing handled for you." },
      { title: "Ad creatives", text: "Multiple cut-downs and aspect ratios from one shoot for testing in campaigns." },
    ],
    faqs: [
      { q: "Do you shoot the footage too?", a: "We focus on editing and motion graphics. If you need a shoot, we can recommend crews we have worked with." },
      { q: "What formats do you deliver?", a: "16:9, 9:16 and 1:1 exports, plus project files if you want them." },
      { q: "How long does an edit take?", a: "Short reels are often ready in 2–3 days. Longer promo videos or animations take 1–3 weeks depending on scope." },
    ],
  },
  {
    key: "ecommerce",
    slug: "e-commerce",
    name: "E-commerce",
    short: "Online stores with smooth checkout and local payment options.",
    desc: "High-converting storefronts with smooth checkout, payments and inventory integrations.",
    headline: "An online store that makes buying feel effortless.",
    tech: ["Laravel", "Shopify", "WooCommerce", "Stripe", "Next.js Commerce"],
    deliverables: [
      { title: "Storefront build", text: "Product pages, collections, search and filters designed around how people shop." },
      { title: "Checkout & payments", text: "Card, mobile banking and cash-on-delivery options with a short, clear checkout." },
      { title: "Inventory & orders", text: "Stock levels, order status and courier integrations in one place." },
      { title: "Migration", text: "Move your products, customers and orders from your current platform without losing data." },
      { title: "Conversion improvements", text: "Cart recovery, upsells and trust signals that lift your order value." },
      { title: "Store marketing setup", text: "Product feeds, pixels and analytics ready for ads from day one." },
    ],
    faqs: [
      { q: "Which platform should I choose?", a: "We recommend after learning your catalogue size, budget and growth plans. Shopify suits quick launches; Laravel or Next.js suit custom needs." },
      { q: "Can customers pay with local methods?", a: "Yes, we integrate the local payment gateways that are available for your business, as well as cash on delivery." },
      { q: "Can I manage products myself?", a: "Yes. You will get an admin panel to add products, update stock and manage orders." },
    ],
  },
  {
    key: "saas",
    slug: "saas-custom-software",
    name: "SaaS / Custom Software",
    short: "Dashboards, internal tools and products built to scale with you.",
    desc: "Dashboards, internal tools and subscription products engineered to scale with your business.",
    headline: "Software built around the way your business actually works.",
    tech: ["Laravel", "PostgreSQL", "Redis", "Docker", "AWS", "REST / GraphQL"],
    deliverables: [
      { title: "MVP development", text: "A focused first version you can put in front of real users within weeks, not months." },
      { title: "Internal tools & dashboards", text: "Replace spreadsheets with role-based tools for sales, operations and finance." },
      { title: "Subscription products", text: "Plans, billing, onboarding and multi-tenant accounts for your SaaS." },
      { title: "API & integrations", text: "Connect payment, SMS, courier, accounting and CRM services." },
      { title: "Cloud & deployment", text: "Containerised releases, monitoring and backups on AWS or your own servers." },
      { title: "Ongoing development", text: "A dedicated team to keep shipping features after launch." },
    ],
    faqs: [
      { q: "I only have an idea. Can you help?", a: "Yes. We start with a short discovery phase to define features, priorities and a realistic first release." },
      { q: "Who owns the code?", a: "You do. Source code and documentation are handed over at the end of each milestone you have paid for." },
      { q: "Can you take over an existing system?", a: "We can review your codebase, fix what is broken and continue building from there." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function serviceByKey(key: ServiceKey) {
  return services.find((s) => s.key === key)!;
}
