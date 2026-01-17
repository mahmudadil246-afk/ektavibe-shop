import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoSection from "@/components/home/PromoSection";
import ValuesSection from "@/components/home/ValuesSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromoSection />
      <ValuesSection />
    </Layout>
  );
};

export default Index;
