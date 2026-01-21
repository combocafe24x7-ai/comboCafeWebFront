'use client';

import React from 'react';
import { config } from '@/app/config';
import Link from 'next/link';
import Image from 'next/image';

export default function IconCategoryStrip() {
  return (
    <section className="pt-0 pb-4 md:pt-2 md:pb-6">
      <div className="container mx-auto">
        <div className="flex items-start justify-start gap-x-1 overflow-x-auto scrollbar-hide md:justify-around md:gap-x-4 md:overflow-x-visible">
          {config.iconCategories.map((category: any) => (
            <Link
              href={category.href}
              key={category.id}
              className="group w-20 text-center shrink-0 flex flex-col items-center gap-1"
            >
              <div className="relative w-16 h-16 rounded-lg bg-card flex items-center justify-center shadow-subtle border border-black/5 transition-all duration-300 group-hover:shadow-card group-hover:border-primary/50 group-hover:-translate-y-1 overflow-hidden">
                <Image
                  src={category.imageUrl}
                  alt={category.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="64px"
                  priority
                />
              </div>
              <h4 className="font-semibold text-xs text-text/80 group-hover:text-text transition-colors duration-300 text-ui leading-tight">
                {category.label}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
