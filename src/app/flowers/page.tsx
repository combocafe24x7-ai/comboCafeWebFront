
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ProductSection from '@/components/sections/product-section';
import { config } from '@/app/config';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FlowersPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="container mx-auto">
            <Button asChild variant="outline" className="my-6">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
        </div>
        <ProductSection
          title="Flowers & More"
          subtitle="Fresh arrangements and thoughtful gifts"
          items={config.productSections.flowerProducts}
          bgColor="bg-white"
          showViewAll={false}
        />
      </main>
      <Footer />
    </>
  );
}
