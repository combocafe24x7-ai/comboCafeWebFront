
'use client';

import { config } from '@/app/config';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function IconCategoryStrip() {
  return (
    <section className="bg-background pt-8 pb-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-x-2 md:gap-x-6 overflow-x-auto scrollbar-hide">
          {config.iconCategories.map((category: any) => (
            <Link
              href={category.href}
              key={category.id}
              className={cn(
                "group w-24 text-center shrink-0"
              )}
            >
              <div className="flex justify-center items-center">
                <div className="relative w-20 h-20 rounded-full bg-card flex items-center justify-center shadow-md border border-black/5 transition-all duration-300 group-hover:shadow-card group-hover:border-primary/50 group-hover:-translate-y-1">
                    <category.Icon className="w-9 h-9 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
              </div>
              <h4 className="mt-3 font-semibold text-sm text-muted-foreground group-hover:text-text transition-colors duration-300 text-ui">
                {category.label}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
