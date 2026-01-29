'use client';
import { config } from '@/app/config';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-provider';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t shadow-t-lg z-40">
      <div className="flex justify-around items-center h-16">
        {config.mobile.bottomNav.map((item) => {
          const Icon = item.Icon;
          const isActive = pathname === item.href;
          const isCart = item.id === 'cart';
          return (
            <Link key={item.id} href={item.href} className="flex flex-col items-center justify-center gap-1 text-gray-500">
              <div className="relative">
                {isCart && cart.length > 0 && (
                  <div className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center z-10">
                    {cart.length}
                  </div>
                )}
                <Icon className={cn("h-6 w-6", isActive && "text-primary")} />
              </div>
              <span className={cn("text-xs", isActive && "text-primary")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
       <div className="pb-safe-bottom"></div>
    </div>
  );
}
