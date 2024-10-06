"use client";
import { CartProvider } from "@/components/CartContext";
import Menu from "@/components/Menu";

export default function MenuWrapper() {
  return (
    <CartProvider>
      <Menu />
    </CartProvider>
  );
}
