import { Brands } from "@/components/brands";
import { FaqSection } from "@/components/faq";
import { FeaturedWork } from "@/components/featured-work";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { Process } from "@/components/process";
import { ServicesBento } from "@/components/services-bento";
import { Testimonials } from "@/components/testimonials";
import { WhyUs } from "@/components/why-us";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <ServicesBento />
      <WhyUs />
      <Process />
      <FeaturedWork />
      <Mission />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
