// Shared by the form (client) and the API route (server) so both validate against the same lists.
export const categories = [
  "Web Design & Development",
  "Digital Marketing",
  "Graphic Design & Printing",
  "Video Editing & Motion Graphics",
  "E-commerce",
  "SaaS / Custom Software",
  "Other",
] as const;
export const budgets = ["Under $500", "$500–$1,500", "$1,500–$5,000", "$5,000+", "Not sure"] as const;
export const timelines = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Flexible"] as const;
export const sources = ["Google search", "Social media", "Referral", "Portfolio / Behance", "Other"] as const;

export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_FILE_EXT = ["pdf", "doc", "docx", "png", "jpg", "jpeg", "zip"] as const;
