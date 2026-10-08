import React, { createContext, useContext, useMemo, useState } from 'react';
import { sizeExtra } from '../data/foods';

const CartContext = createContext(null);
export const DELIVERY_FEE = 40;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [promo, setPromo] = useState('');

  const unitPrice = (item) => item.price + sizeExtra[item.size];

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
  };

  const addItem = (food, qty = 1, size = 'Regular') => {
    const key = `${food.id}-${size}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, id: food.id, name: food.name, emoji: food.emoji, price: food.price, size, qty }];
    });
  };

  const changeQty = (key, delta) =>
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );

  const applyPromo = (code) => {
    const ok = code.trim().toUpperCase() === 'FOOD10';
    setPromo(ok ? 'FOOD10' : '');
    return ok;
  };

  const subtotal = items.reduce((s, i) => s + unitPrice(i) * i.qty, 0);
  const discount = promo ? Math.round(subtotal * 0.1) : 0;
  const delivery = items.length ? DELIVERY_FEE : 0;
  const total = subtotal - discount + delivery;
  const count = items.reduce((s, i) => s + i.qty, 0);

  const placeOrder = (method) => {
    const order = {
      id: `FD-${2048 + orders.length}`,
      items,
      subtotal,
      discount,
      delivery,
      total,
      method,
      status: 'Preparing',
      createdAt: new Date().toLocaleString(),
    };
    setOrders((prev) => [order, ...prev]);
    setItems([]);
    setPromo('');
    return order;
  };

  const reset = () => {
    setItems([]);
    setOrders([]);
    setPromo('');
  };

  const value = useMemo(
    () => ({
      items, orders, promo, subtotal, discount, delivery, total, count,
      unitPrice, addItem, changeQty, applyPromo, placeOrder, cancelOrder, reset,
    }),
    [items, orders, promo]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);