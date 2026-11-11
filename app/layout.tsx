import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const clashGrotesk = localFont({
  variable: "--font-clash-grotesk",
  src: [
    { path: "./fonts/ClashGrotesk-500.woff2", weight: "500" },
    { path: "./fonts/ClashGrotesk-600.woff2", weight: "600" },
    { path: "./fonts/ClashGrotesk-700.woff2", weight: "700" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Vortex5 — Digital agency in Dhaka for websites, branding and marketing",
    template: "%s | Vortex5",
  },
  description:
    "Vortex5 is a digital agency in Dhaka. We build websites, e-commerce stores and custom software, design brands, edit video and run digital marketing that brings in customers.",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Vortex5 — Websites, branding and marketing that win you customers",
    description: "Design, development and digital marketing from one team in Dhaka.",
  },
};

export const viewport: Viewport = {
  themeColor: "#020309",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${clashGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
