import HeroSection from "@/components/layout/HeroSection";
import FeaturedCategories from "@/components/layout/FeaturedCategories";
import NewArrivals from "@/components/layout/NewArrivals";
import BestSellers from "@/components/layout/BestSellers";
import PromoBanner from "@/components/layout/PromoBanner";
import ShopBySize from "@/components/layout/ShopBySize";
import Testimonials from "@/components/layout/Testimonials";
import Newsletter from "@/components/layout/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <NewArrivals />
      <BestSellers />
      <PromoBanner />
      <ShopBySize />
      <Testimonials />
      <Newsletter />
    </>
  );
}