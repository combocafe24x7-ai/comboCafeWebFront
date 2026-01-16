'use client';

import { Menu, ShoppingCart } from "lucide-react";
import Link from 'next/link';
import { useCart } from "@/context/cart-provider";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "../ui/sheet";
import { useState } from "react";
import { config } from "@/app/config";
import MobileSearch from "./MobileSearch";

const MobileHeader = () => {
    const { cart } = useCart();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background shadow-sm flex flex-col p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-3/4">
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    <Link href="/" onClick={() => setIsSheetOpen(false)}>
                                        <span className="text-xl font-bold text-gray-800">combo cafe</span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="mt-8 flex flex-col gap-4">
                                {(config.header.navLinks as any[]).map((link) => (
                                     link.subLinks ? (
                                        <div key={link.id}>
                                            <p className="text-lg font-medium text-gray-700">{link.label}</p>
                                            <div className="flex flex-col gap-2 pl-4 mt-2">
                                                {link.subLinks.map((subLink:any) => (
                                                    <a 
                                                        key={subLink.id} 
                                                        href={subLink.href}
                                                        onClick={() => setIsSheetOpen(false)}
                                                        className="text-base text-gray-600 hover:text-primary"
                                                    >
                                                        {subLink.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <a 
                                            key={link.id} 
                                            href={link.href}
                                            onClick={() => setIsSheetOpen(false)}
                                            className="text-lg font-medium text-gray-700 hover:text-primary"
                                        >
                                            {link.label}
                                        </a>
                                    )
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="shrink-0">
                      <span className="text-lg font-bold text-gray-800">combo cafe</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/checkout" className="relative text-gray-600">
                        <ShoppingCart className="h-6 w-6" />
                        {cart.length > 0 && (
                            <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                {cart.length}
                            </div>
                        )}
                        <span className="sr-only">Cart</span>
                    </Link>
                </div>
            </div>
            <MobileSearch />
        </div>
    )
}

export default MobileHeader;
