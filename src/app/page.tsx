
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import IconCategoryStrip from '@/components/sections/icon-category-strip';
import ServiceStrip from '@/components/sections/service-strip';
import ProductSection from '@/components/sections/product-section';
import OccasionTabs from '@/components/sections/occasion-tabs';
import PaymentOfferBanners from '@/components/sections/payment-offer-banners';
import GiftFinder from '@/components/sections/gift-finder';
import HorizontalCollection from '@/components/sections/horizontal-collection';
import { config } from './config';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IconCategoryStrip />
        <ServiceStrip />
        <ProductSection 
          title="Best Selling Cakes"
          subtitle="Loved by everyone"
          items={config.productSections.bestSellingCakes}
        />
        <OccasionTabs />
        <PaymentOfferBanners />
        <ProductSection 
          title="Anniversary Gifts"
          subtitle="Celebrate your journey of love"
          items={config.productSections.anniversaryGifts}
          bgColor="bg-accent"
        />
        <GiftFinder />
        <HorizontalCollection 
          title="Flower Collections"
          items={config.collections.flowers}
        />
         <HorizontalCollection
          title="Delectable Cakes"
          items={config.collections.cakes}
          bgColor="bg-section-alternate"
        />
      </main>
      <Footer />
    </>
  );
}
