'use client';

import { useState, useEffect } from 'react';
import { config } from '@/app/config';
import Link from 'next/link';
import Image from 'next/image';

export default function IconCategoryStrip() {
  const [categories, setCategories] = useState(config.iconCategories);

  useEffect(() => {
    const shuffle = () => {
      // Create a copy to avoid mutating the original config array
      const array = [...config.iconCategories];
      let currentIndex = array.length;
      let randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    };

    const intervalId = setInterval(() => {
      setCategories(shuffle());
    }, 3000); // Shuffle every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-x-2 gap-y-6 justify-items-center">
          {categories.map((category: any) => (
            <Link
              href={category.href}
              key={category.id}
              className="group w-20 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center items-center">
                <div className="relative w-20 h-20 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 overflow-hidden">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.label}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <category.Icon className="w-10 h-10 text-secondary group-hover:text-primary" />
                  )}
                </div>
              </div>
              <h4 className="mt-2 font-semibold text-sm text-gray-700 group-hover:text-primary transition-colors duration-300">
                {category.label}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
