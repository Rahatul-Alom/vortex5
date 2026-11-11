import type { ServiceKey } from "@/components/services";

export type Art = "store" | "dashboard" | "brand" | "campaign" | "video" | "print";

export type Project = {
  slug: string;
  name: string;
  client: string;
  category: ServiceKey;
  categoryLabel: string;
  blurb: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  services: string[];
  tech: string[];
  art: Art;
  /**
   * Optional cover image for this project. Use a file in /public
   * (e.g. "/work/nimbus-commerce.jpg") or a remote URL whose host is allowed in
   * next.config.ts (images.remotePatterns). Leave "" to show the ProjectArt illustration.
   */
  image?: string;
  imageAlt?: string;
  glow: string;
};

// Placeholder case studies and figures — replace with real projects and real results.
export const projects: Project[] = [
  {
    slug: "nimbus-commerce",
    name: "Nimbus Commerce",
    client: "Nimbus",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    blurb: "A fast, conversion-focused storefront with a custom checkout and inventory sync.",
    challenge: "Nimbus was losing shoppers at checkout and updating stock by hand across three sales channels.",
    solution: "We rebuilt the store with a short three-step checkout, local payment options and a stock sync that updates every channel automatically.",
    results: [
      { value: "+38%", label: "checkout completion" },
      { value: "2.1s", label: "average page load" },
      { value: "0", label: "manual stock updates" },
    ],
    services: ["Web Development", "E-commerce"],
    tech: ["Next.js", "Shopify", "Stripe"],
    art: "store",
    image: "",
    glow: "from-cyan/30 via-azure/30",
  },
  {
    slug: "orbit-crm",
    name: "Orbit CRM",
    client: "Orbit",
    category: "saas",
    categoryLabel: "SaaS / Custom Software",
    blurb: "A multi-tenant CRM with role-based access, reporting dashboards and automations.",
    challenge: "A growing sales team was tracking leads in spreadsheets and missing follow-ups.",
    solution: "We built a multi-tenant CRM with pipeline views, reminders, role-based access and a reporting dashboard managers check every morning.",
    results: [
      { value: "3×", label: "faster follow-ups" },
      { value: "12", label: "teams onboarded" },
      { value: "100%", label: "leads tracked in one place" },
    ],
    services: ["SaaS / Custom Software", "Web Development"],
    tech: ["Laravel", "React", "PostgreSQL"],
    art: "dashboard",
    image: "",
    glow: "from-violet/35 via-azure/30",
  },
  {
    slug: "pulse-fitness-growth",
    name: "Pulse Fitness Growth",
    client: "Pulse Fitness",
    category: "marketing",
    categoryLabel: "Digital Marketing",
    blurb: "A paid social and SEO programme that filled new membership slots in two months.",
    challenge: "Pulse had a good gym and a quiet phone. Ads were running without tracking, so nobody knew what worked.",
    solution: "We set up conversion tracking, rebuilt the offer page, and ran tested Facebook and Instagram campaigns alongside local SEO.",
    results: [
      { value: "−46%", label: "cost per lead" },
      { value: "2.4×", label: "monthly enquiries" },
      { value: "#1", label: "local map ranking" },
    ],
    services: ["Digital Marketing", "Graphic Design"],
    tech: ["Meta Ads", "Google Analytics 4", "Search Console"],
    art: "campaign",
    image: "",
    glow: "from-teal/50 via-cyan/25",
  },
  {
    slug: "aurora-studio",
    name: "Aurora Studio",
    client: "Aurora",
    category: "creative",
    categoryLabel: "Brand & Web",
    blurb: "A full identity, launch video and marketing site for a creative studio.",
    challenge: "Aurora's work was strong but its brand looked like three different companies.",
    solution: "We created one identity system, a launch film and a marketing site that carry the same look from business card to homepage.",
    results: [
      { value: "1", label: "unified brand system" },
      { value: "40+", label: "templates delivered" },
      { value: "5 wks", label: "kickoff to launch" },
    ],
    services: ["Graphic Design", "Video Editing", "Web Development"],
    tech: ["Illustrator", "After Effects", "Next.js"],
    art: "brand",
    image: "",
    glow: "from-azure/40 via-violet/30",
  },
  {
    slug: "kinetic-motion-reel",
    name: "Kinetic Motion Reel",
    client: "Kinetic",
    category: "video",
    categoryLabel: "Video & Motion",
    blurb: "A launch film and a set of short vertical ads cut from a single shoot.",
    challenge: "Kinetic needed a launch video and ad creatives, but had budget for only one shoot day.",
    solution: "We planned the shoot around every format, then edited one hero film and twelve short cuts with branded motion graphics.",
    results: [
      { value: "13", label: "videos from one shoot" },
      { value: "4.8×", label: "view-through vs. static ads" },
      { value: "9 days", label: "from raw footage to delivery" },
    ],
    services: ["Video Editing", "Motion Graphics"],
    tech: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    art: "video",
    image: "",
    glow: "from-violet/40 via-teal/30",
  },
  {
    slug: "crest-print-pack",
    name: "Crest Print & Pack",
    client: "Crest Foods",
    category: "creative",
    categoryLabel: "Graphic Design & Printing",
    blurb: "Packaging, labels and menus for a food brand moving into retail shelves.",
    challenge: "A local food brand was ready for supermarkets but its packaging looked homemade.",
    solution: "We designed a flexible packaging system, handled print-ready artwork and approved proofs with the printer.",
    results: [
      { value: "6", label: "products on shelf" },
      { value: "3", label: "retail chains onboarded" },
      { value: "0", label: "reprints after proofing" },
    ],
    services: ["Graphic Design & Printing"],
    tech: ["Illustrator", "InDesign", "Photoshop"],
    art: "print",
    image: "",
    glow: "from-cyan/25 via-violet/30",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
