import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { StartProject } from "@/components/start-project";

export const metadata: Metadata = {
  title: "Contact — GET STARTED",
  description: "Tell us about your project. We reply within one business day with ideas, a timeline and a fixed quote.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        title="Let’s talk about your project."
        description="Tell us what you need. A real person will reply within one business day with ideas, a timeline and a fixed quote."
      />
      <StartProject />
    </>
  );
}
