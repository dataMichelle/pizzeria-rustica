"use client";

import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart() {
  const {
    cartItems,
    clearCart,
    removeFromCart,
    updateCart,
    tipAmount,
    updateTip,
    taxAmount,
    updateTax,
    total,
  } = useCart();
  const router = useRouter();

  // Update quantity of items in the cart
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, parseInt(newQuantity) || 1) }
        : item
    );
    updateCart(updatedCart);
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => removeFromCart(id);

  // Calculate subtotal for display and update tax
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.0825; // 8.25% tax rate
  const calculatedTax = subtotal * taxRate;

  // Update tip and tax in context
  const handleTipChange = (e) => {
    const value = e.target.value;
    const newTip = value === "" ? 0 : parseFloat(value) || 0;
    updateTip(newTip);
  };

  // Sync tax with context when subtotal changes
  useEffect(() => {
    updateTax(calculatedTax);
  }, [subtotal, updateTax]);

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 md:px-6 lg:px-8 my-2 text-center">
        <p>Your cart is empty.</p>
        <Link
          href="/orders"
          className="text-blue-500 hover:underline block mt-4"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 md:px-6 lg:px-8 my-2">
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4"
          >
            <div className="flex-1">
              <h2 className="text-xl">{item.name}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)} each</p>
              <div className="flex items-center mt-2">
                <label htmlFor={`quantity-${item.id}`} className="mr-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  min="1"
                  className="border px-2 py-1 w-16"
                />
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
              <p className="text-lg font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Running Total Section */}
      <div className="my-8 text-right">
        <p className="text-lg font-semibold">
          Subtotal: ${subtotal.toFixed(2)}
        </p>
        <p className="text-lg font-semibold">Tax: ${taxAmount.toFixed(2)}</p>
        <div className="my-4 flex flex-col items-end">
          <label htmlFor="tip" className="block font-semibold mb-2">
            Tip Amount:
          </label>
          <input
            type="number"
            id="tip"
            value={tipAmount === 0 ? "" : tipAmount} // Show empty if 0 to avoid leading zero
            onChange={handleTipChange}
            className="border px-2 py-1 w-24"
            placeholder="Enter tip"
            step="0.01"
            min="0"
          />
        </div>
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>

      {/* Action Buttons */}
      <div className="my-12 text-center py-5">
        <Link href="/menu" className="text-blue-500 hover:underline block mb-4">
          Return to Menu
        </Link>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-4 mb-4"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-4 mb-4"
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
