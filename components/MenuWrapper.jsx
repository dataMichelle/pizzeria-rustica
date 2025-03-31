"use client";
import { CartProvider } from "@/context/CartContext";
import Menu from "@/components/Menu";

export default function MenuWrapper() {
  return (
    <CartProvider>
      <Menu />
    </CartProvider>
  );
}
