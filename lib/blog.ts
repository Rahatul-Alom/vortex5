export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readTime: string;
  tag: string;
  body: string[];
};

// Placeholder articles — replace with your own writing.
export const posts: Post[] = [
  {
    slug: "what-your-business-website-needs",
    title: "What a business website needs before it can bring in customers",
    excerpt: "Five things that decide whether visitors call you or close the tab.",
    date: "2026-10-21",
    readTime: "5 min read",
    tag: "Web",
    body: [
      "Most business websites fail for a simple reason: they describe the company but never tell the visitor what to do next. A good website answers three questions within seconds: what you do, who it is for, and how to get in touch.",
      "Start with a headline that names the result you deliver. Follow it with one clear action — a call button, a quote form or a WhatsApp link — and repeat that action at natural stopping points down the page.",
      "Speed matters more than most owners expect. If your pages take more than three seconds to load on a phone, a large share of visitors will leave before they see anything. Compress images, avoid heavy sliders and choose hosting close to your audience.",
      "Show proof early. Real client names, project photos, numbers and short testimonials remove doubt faster than any slogan.",
      "Finally, make sure you can measure it. Install analytics and track form submissions and call clicks, so that every month you know what the site produced.",
    ],
  },
  {
    slug: "facebook-ads-vs-seo",
    title: "Facebook ads or SEO: where should a small business start?",
    excerpt: "Both work, but they work on different timelines. Here is how to choose.",
    date: "2026-10-07",
    readTime: "4 min read",
    tag: "Digital Marketing",
    body: [
      "Paid ads and SEO are often presented as rivals. In practice they solve different problems. Ads buy attention now. SEO builds attention that keeps arriving without a daily budget.",
      "If you need enquiries this month — for a launch, an offer or a seasonal rush — start with ads. You can test audiences and messages quickly and learn what your customers respond to.",
      "If you sell something people actively search for, invest in SEO alongside ads. The first results usually take a few months, but organic visitors are cheaper over time.",
      "Whatever you choose, send traffic to a page built for one goal, and track every lead back to its source. Without tracking, you are guessing.",
    ],
  },
  {
    slug: "brand-identity-checklist",
    title: "A brand identity checklist for growing companies",
    excerpt: "Logo, colour, type and templates — what to define so your brand looks consistent everywhere.",
    date: "2026-09-18",
    readTime: "4 min read",
    tag: "Branding",
    body: [
      "A brand is more than a logo. It is the set of decisions that make your business look the same on a signboard, an invoice and an Instagram post.",
      "Define a primary logo plus compact and one-colour versions. Pick two or three brand colours with exact values for screen and print, and one or two typefaces with clear rules for headings and body text.",
      "Then create templates for the things you produce every week: social posts, presentations, quotations and business cards. Templates are what keep a team consistent when you are not in the room.",
      "Finally, write it down in a short brand guideline so any designer, printer or employee can follow it.",
    ],
  },
  {
    slug: "when-to-build-custom-software",
    title: "When to build custom software instead of buying a tool",
    excerpt: "Off-the-shelf tools are great until they aren't. Signs it is time to build.",
    date: "2026-08-29",
    readTime: "6 min read",
    tag: "Software",
    body: [
      "Ready-made tools are the right starting point for most businesses. They are cheap, quick to adopt and well supported.",
      "Custom software starts to make sense when your process is a competitive advantage, when you are stitching together five tools with spreadsheets, or when per-seat pricing grows faster than your revenue.",
      "Before building, write down the three workflows that hurt most. Build only those first, release to a small group and improve from real use.",
      "A good development partner will help you cut scope, not add to it. The goal is a small tool your team uses daily, not a large one nobody opens.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
