
import { config } from '@/app/config';
import Link from 'next/link';
import Image from 'next/image';

export default function IconCategoryStrip() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto">
        <div className="flex items-start md:grid md:grid-cols-4 md:gap-8 md:justify-around text-center gap-4 overflow-x-auto scrollbar-hide">
          {config.iconCategories.map((category: any) => (
            <Link href={category.href} key={category.id} className="group shrink-0 w-24">
              <div className="flex justify-center items-center">
                  <div className="relative w-20 h-20 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 overflow-hidden">
                      {category.imageUrl ? (
                        <Image src={category.imageUrl} alt={category.label} layout="fill" objectFit="cover" />
                      ) : (
                        <category.Icon className="w-10 h-10 text-secondary group-hover:text-primary" />
                      )}
                  </div>
              </div>
              <h4 className="mt-4 font-semibold text-sm text-gray-700 group-hover:text-primary transition-colors duration-300">{category.label}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

    