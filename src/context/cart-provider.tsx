"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  badge?: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string, removeAll?: boolean) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes, but only after initial load is complete
  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart, isLoaded]);


  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (productId: string, removeAll: boolean = false) => {
    setCart(prevCart => {
      if (removeAll) {
        return prevCart.filter(item => item.id !== productId);
      }
      
      const index = prevCart.findIndex(item => item.id === productId);
      if (index > -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
