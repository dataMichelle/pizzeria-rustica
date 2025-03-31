"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [tipAmount, setTipAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedTip = parseFloat(localStorage.getItem("tip")) || 0;
    const storedTax = parseFloat(localStorage.getItem("tax")) || 0;
    setCartItems(storedCart);
    setTipAmount(storedTip);
    setTaxAmount(storedTax);
    recalculateTotal(storedCart, storedTip, storedTax);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    recalculateTotal(cartItems, tipAmount, taxAmount);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("tip", tipAmount.toString());
    localStorage.setItem("tax", taxAmount.toString());
    localStorage.setItem("total", total.toString());
    recalculateTotal(cartItems, tipAmount, taxAmount);
  }, [tipAmount, taxAmount]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (itemIndex > -1) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const updateCart = (updatedItems) => setCartItems(updatedItems);
  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => {
    setCartItems([]);
    setTipAmount(0);
    setTaxAmount(0);
    setTotal(0);
    localStorage.clear();
  };

  const updateTip = (tip) => setTipAmount(parseFloat(tip) || 0);
  const updateTax = (tax) => setTaxAmount(parseFloat(tax) || 0);

  const recalculateTotal = (items, tip, tax) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newTotal = subtotal + tip + tax;
    setTotal(newTotal);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        tipAmount,
        taxAmount,
        total,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        updateTip,
        updateTax,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
