'use client';

import React, { useMemo } from 'react';
import { useCart } from '@/context/cart-provider';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

export default function MobileCartFab() {
  const { cart } = useCart();
  const router = useRouter();

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
  }, [cart]);

  const itemCount = cart.length;

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <button
        onClick={() => router.push("/checkout")}
        className="flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-sm font-medium">View Cart</span>
        <span className="text-sm font-semibold">₹{total.toFixed(2)}</span>
        <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{itemCount}</span>
      </button>
    </div>
  );
}
