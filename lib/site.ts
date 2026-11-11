// Placeholder contact details — replace with the real ones.
export const site = {
  name: "Vortex5",
  url: "https://vortex5.com",
  email: "hello@vortex5.com",
  phone: "+8801756-688587",
  whatsapp: "8801756688587", // digits only, country code first
  location: "176, Islam villa, level 3, Shantibag, Dhaka, Bangladesh, 1217",
  hours: "Sat – Thu, 10:00 – 19:00 (GMT+6)",
  socials: [
    { label: "LinkedIn", href: "" },
    { label: "Facebook", href: "https://www.facebook.com/vortex5.net" },
    { label: "X", href: "" },
    { label: "Behance", href: "https://www.behance.net/vortex5_creative" },
    { label: "GitHub", href: "" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
};

export function whatsappLink(message = "Hi Vortex5, I'd like to talk about a project.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
