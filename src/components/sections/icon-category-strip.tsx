import { config } from '@/app/config';
import Link from 'next/link';

export default function IconCategoryStrip() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto">
        <div className="flex items-start justify-around text-center md:grid md:grid-cols-4 md:gap-8">
          {config.iconCategories.map((category) => (
            <Link href={category.href} key={category.id} className="group">
              <div className="flex justify-center items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <category.Icon className="w-10 h-10 md:w-12 md:h-12 text-secondary group-hover:text-primary" />
                  </div>
              </div>
              <h4 className="mt-4 font-semibold text-sm md:text-base text-gray-700 group-hover:text-primary transition-colors duration-300">{category.label}</h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
