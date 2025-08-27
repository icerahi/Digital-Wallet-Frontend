import FeatureSection from "@/components/modules/homepage/FeatureSection";
import HeroSection from "@/components/modules/homepage/HeroSection";
import { OthersSection } from "@/components/modules/homepage/OthersSection";
import { TestimonialSection } from "@/components/modules/homepage/TestimonialSection";

export const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <OthersSection />
    </div>
  );
};
