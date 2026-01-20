'use client';

import { config } from '@/app/config';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function IconCategoryStrip() {
  return (
    <section className="bg-background py-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-x-2 md:gap-x-4 overflow-x-auto scrollbar-hide p-4">
          {config.iconCategories.map((category: any) => (
            <Link
              href={category.href}
              key={category.id}
              className={cn(
                "group w-24 text-center shrink-0"
              )}
            >
              <div className="flex justify-center items-center">
                <div className="relative w-20 h-20 rounded-full bg-background flex items-center justify-center shadow-inner-soft transition-all duration-300 group-hover:-translate-y-1">
                    <Image src={category.imageUrl} alt={category.label} width={48} height={48} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
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
