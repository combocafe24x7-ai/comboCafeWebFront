
"use client";

import Image from 'next/image';
import { config } from '@/app/config.tsx';
import { VisuallyHidden } from '../ui/visually-hidden';
import { MapPin } from 'lucide-react';

export default function GiftsGallery() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section id="gifts-gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
            <h3 className="font-headline text-2xl text-foreground">Gifts</h3>
            <div className="flex items-center text-muted-foreground text-sm">
                <p>Flavor Town</p>
                <span className="mx-2">·</span>
                <p>{formattedDate}</p>
            </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5">
          {config.giftsGallery.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden group">
                <Image
                    src={image.url}
                    alt={`Gift image ${index + 1}`}
                    fill
                    className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
