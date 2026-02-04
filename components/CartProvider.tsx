"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    function handler(e: any) {
      const detail = e?.detail;
      if (!detail) return;
      addItem({ id: detail.id, name: detail.name, price: detail.price, quantity: detail.quantity || 1 });
    }
    window.addEventListener('add-to-cart', handler as EventListener);
    return () => window.removeEventListener('add-to-cart', handler as EventListener);
  }, []);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p));
      }
      return [...prev, item];
    });
  }

  function removeItem(id: number | string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQuantity(id: number | string, qty: number) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)));
  }

  function clear() {
    setItems([]);
  }

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.quantity * i.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export type { CartItem };
