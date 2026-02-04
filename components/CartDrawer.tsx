"use client";

import React from 'react';
import { useCart } from './CartProvider';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clear } = useCart();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+55';

  function checkoutViaWhatsApp() {
    if (items.length === 0) return;
    const lines = items.map((it) => `- ${it.name} x${it.quantity} (R$ ${it.price.toFixed(2)})`);
    const total = `Total: R$ ${totalPrice.toFixed(2)}`;
    const message = `Olá! Gostaria de comprar:\n${lines.join('\n')}\n\n${total}`;
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Carrinho ({totalItems})</h3>
          <button onClick={onClose} className="text-gray-500">Fechar</button>
        </div>

        <div className="flex-1 overflow-auto space-y-4">
          {items.length === 0 && <p className="text-gray-500">Seu carrinho está vazio.</p>}
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-gray-500">R$ {it.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <input className="w-12 p-1 border rounded" type="number" value={it.quantity} onChange={(e) => updateQuantity(it.id, Number(e.target.value))} min={1} />
                <button onClick={() => removeItem(it.id)} className="text-sm text-red-600">Remover</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-bold">R$ {totalPrice.toFixed(2)}</div>
          </div>

          <div className="space-y-2">
            <button onClick={checkoutViaWhatsApp} className="w-full bg-amber-900 text-white py-3 rounded-xl font-bold">Finalizar pelo WhatsApp</button>
            <button onClick={() => { clear(); onClose(); }} className="w-full text-sm text-gray-600 py-3 rounded-xl border">Limpar carrinho</button>
          </div>
        </div>
      </div>
    </div>
  );
}
