import { Navigation } from "@/components/ui/navigation";
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  GallerySection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from "@/components/landing/sections";

export default function LandingPage() {
  return (
    <>
      <Navigation variant="landing" />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
