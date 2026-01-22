
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProductSection from '@/components/sections/product-section';
import { config } from '@/app/config';

export default function ChocolatesUnavailablePage() {
  return (
    <main className="bg-white">
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
            <Button asChild variant="outline" className="mb-8">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Chocolates Currently Unavailable</h1>
              <p className="text-lg text-gray-600 mb-12">
                We're sorry, our chocolates are out of stock right now. Please check out some of our other popular items below!
              </p>
            </div>
        </div>
      </div>
      <ProductSection
        title="You Might Also Like"
        subtitle="Check out these customer favorites"
        items={[...config.productSections.bestSellingCakes, ...config.productSections.flowerProducts.slice(0, 2)]}
        bgColor="bg-gray-50"
        showViewAll={false}
        prioritizeImages={true}
      />
    </main>
  );
}
