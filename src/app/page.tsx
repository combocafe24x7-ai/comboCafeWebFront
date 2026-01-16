

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import ServiceStrip from '@/components/sections/service-strip';
import ProductSection from '@/components/sections/product-section';
import GiftFinder from '@/components/sections/gift-finder';
import HorizontalCollection from '@/components/sections/horizontal-collection';
import { config } from './config';
import IconCategoryStrip from '@/components/sections/icon-category-strip';
import FreeDeliveryPill from '@/components/mobile/FreeDeliveryPill';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <div className="md:hidden">
            <FreeDeliveryPill />
        </div>
        <IconCategoryStrip />
        <ServiceStrip />
        <ProductSection
          id="best-selling-cakes"
          title="Best Selling Cakes"
          subtitle="Loved by everyone"
          items={config.productSections.bestSellingCakes}
          viewAllLink="/cakes"
        />
        <ProductSection 
          id="top-gifts"
          title="Top Gifts"
          subtitle="A selection of our finest gift items"
          items={config.productSections.gifts.slice(0, 4)}
          bgColor="bg-accent"
          viewAllLink="/gifts"
        />
        <GiftFinder />
        <ProductSection
          id="quick-bites"
          title="Quick Bites"
          subtitle="Delicious and savory snacks"
          items={config.productSections.snacks}
          bgColor="bg-white"
          showViewAll={false}
        />
        <ProductSection
          id="hot-beverages"
          title="Hot Beverages"
          subtitle="Warm up with our selection of coffees and more"
          items={config.productSections.hotBeverages}
          bgColor="bg-accent"
          showViewAll={false}
        />
        <ProductSection
          id="flowers-more"
          title="Flowers & More"
          subtitle="Fresh arrangements and thoughtful gifts"
          items={config.productSections.flowerProducts}
          showViewAll={true}
          viewAllLink="/flowers"
        />
        <HorizontalCollection 
          title="Delectable Cakes"
          items={config.collections.cakes}
          bgColor="bg-section-alternate"
          viewAllLink="/cakes"
        />
      </main>
      <Footer />
    </>
  );
}
