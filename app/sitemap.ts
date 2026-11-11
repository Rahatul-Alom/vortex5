import type { MetadataRoute } from "next";
import { services } from "@/components/services";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";
import { projects } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/work", "/about", "/blog", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}` })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}` })),
  ];
}
