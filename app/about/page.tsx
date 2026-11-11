import type { Metadata } from "next";
import { FinalCta } from "@/components/final-cta";
import { Mission } from "@/components/mission";
import { PageHero } from "@/components/page-hero";
import { WhyUs } from "@/components/why-us";

export const metadata: Metadata = {
  title: "About — a digital agency built on creativity and technology",
  description: "Vortex5 pairs creative thinking with reliable technology to help businesses grow. Meet the principles we work by.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        title="Creative people and engineers, working on your growth."
        description="Vortex5 is a digital agency in Dhaka. We exist to help businesses grow by pairing creative thinking with reliable, modern technology."
        actions={[{ label: "Work with us", href: "/contact" }]}
      />

      <Mission />
      <WhyUs />
      <FinalCta />
    </>
  );
}
