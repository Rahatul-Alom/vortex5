import type { Metadata } from "next";
import { FinalCta } from "@/components/final-cta";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { WorkGallery } from "@/components/work-gallery";

export const metadata: Metadata = {
  title: "Our work — case studies and results",
  description: "Websites, online stores, software, brand identities, videos and marketing campaigns we have delivered, and the results they produced.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Work" }]}
        title="Projects that moved the numbers."
        description="A selection of websites, stores, software, brands and campaigns, with the results they delivered."
      />
      <Section className="!pt-12 lg:!pt-16">
        <WorkGallery />
      </Section>
      <FinalCta />
    </>
  );
}
