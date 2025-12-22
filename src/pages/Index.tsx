import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FundCategoriesPreview } from '@/components/home/FundCategoriesPreview';
import { DirectVsRegularBanner } from '@/components/home/DirectVsRegularBanner';
import { DidYouKnow } from '@/components/home/DidYouKnow';
import { SEBIDisclaimer } from '@/components/home/SEBIDisclaimer';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DidYouKnow />
      <FundCategoriesPreview />
      <DirectVsRegularBanner />
      <SEBIDisclaimer />
    </Layout>
  );
};

export default Index;
