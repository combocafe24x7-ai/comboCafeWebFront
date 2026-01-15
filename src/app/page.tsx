
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import IconCategoryStrip from '@/components/sections/icon-category-strip';
import ServiceStrip from '@/components/sections/service-strip';
import ProductSection from '@/components/sections/product-section';
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
        <ProductSection 
          title="Top Gifts"
          subtitle="A selection of our finest gift items"
          items={config.productSections.gifts.slice(0, 4)}
          bgColor="bg-accent"
          viewAllLink="/gifts"
        />
        <ProductSection 
          title="Personalised Mugs & Cushions"
          subtitle="Add a personal touch to your gifts"
          items={config.productSections.personalisedMugsAndCushions.slice(0, 4)}
          viewAllLink="/personalised-gifts"
        />
        <ProductSection 
          title="Personalised Frames"
          subtitle="Frame your cherished memories"
          items={config.productSections.personalisedFrames.slice(0, 4)}
          bgColor="bg-accent"
          viewAllLink="/personalised-frames"
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
