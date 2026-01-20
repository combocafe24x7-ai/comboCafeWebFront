'use client';

import React, { useState, useEffect } from 'react';
import { config } from '@/app/config';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Fisher-Yates (aka Knuth) Shuffle algorithm
function shuffleArray(array: any[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export default function IconCategoryStrip() {
  const [shuffledCategories, setShuffledCategories] = useState([...config.iconCategories]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShuffling(true); // Trigger fade-out

      setTimeout(() => {
        setShuffledCategories(prevCategories => shuffleArray([...prevCategories]));
        setIsShuffling(false); // Trigger fade-in
      }, 300); // Corresponds to the transition duration

    }, 5000); // Shuffle every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section>
      <div className="container mx-auto py-8">
        <div className={cn(
            "flex items-center justify-around gap-x-2 md:gap-x-4 overflow-x-auto scrollbar-hide p-4 transition-opacity duration-300",
            isShuffling ? 'opacity-0' : 'opacity-100'
          )}
        >
            {shuffledCategories.map((category: any) => (
            <Link
                href={category.href}
                key={category.id}
                className={cn(
                "group w-24 text-center shrink-0"
                )}
            >
                <div className="relative w-24 h-20 rounded-card bg-card flex items-center justify-center shadow-md border border-black/5 transition-all duration-300 group-hover:shadow-card group-hover:border-primary/50 group-hover:-translate-y-1">
                    <Image src={category.imageUrl} alt={category.label} width={48} height={48} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h4 className="mt-2 font-semibold text-xs text-text/80 group-hover:text-text transition-colors duration-300 text-ui truncate">
                {category.label}
                </h4>
            </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
