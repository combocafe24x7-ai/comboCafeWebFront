
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <main className="bg-white">
      <div className="container mx-auto py-12">
        <Button asChild variant="outline" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to Combo Cafe & Gift Shop, your one-stop destination for delightful cakes, thoughtful gifts, and delicious food in Rampurhat.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey began with a simple passion: to bring joy to our community by offering high-quality products and exceptional service. Whether you're celebrating a special occasion or just looking for a tasty treat, we have something for everyone.
            </p>
            <p className="text-gray-600">
              From our freshly baked cakes and pastries to our curated selection of unique gifts, every item is chosen with care. We believe in creating memorable experiences, one order at a time. Thank you for being a part of our story.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
