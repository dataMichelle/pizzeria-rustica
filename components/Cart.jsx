"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [tip, setTip] = useState(0);

  // Load cart items from localStorage on initial load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update quantity of items in the cart
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    setCartItems([]); // Clear the state
    localStorage.removeItem("cart"); // Clear from localStorage
    alert("Cart has been cleared.");
  };

  // Calculate the total price before and after tax
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.0825; // Tax rate of 8.25%
  const total = subtotal + tax + parseFloat(tip || 0); // Total after tax and tip

  // Save the final total to localStorage when proceeding to checkout
  const handleProceedToCheckout = () => {
    const finalAmount = total.toFixed(2);
    localStorage.setItem("finalTotal", finalAmount); // Save final total including tip to localStorage
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="mx-80 my-2">
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between mb-4 items-center">
            <div>
              <h2 className="text-xl">{item.name}</h2>
              <p>${item.price} each</p>
              <div className="flex items-center mt-2">
                <label htmlFor={`quantity-${item.id}`} className="mr-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  min="1"
                  className="border px-2 py-1 w-16"
                />
              </div>
            </div>
            <div>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
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
        <p className="text-lg font-semibold">Tax: ${tax.toFixed(2)}</p>

        <div className="my-4">
          <label htmlFor="tip" className="block font-semibold mb-2">
            Tip Amount:
          </label>
          <input
            type="number"
            id="tip"
            value={tip}
            onChange={(e) => setTip(parseFloat(e.target.value))}
            className="border px-2 py-1 w-20"
            placeholder="Enter tip amount"
          />
        </div>

        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
      </div>

      <div className="my-12 text-center">
        {/* Return to Menu Link */}
        <Link href="/menu" className="text-blue-500 hover:underline block mb-4">
          Return to Menu
        </Link>

        {/* Clear Cart Button */}
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-4"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>

        {/* Proceed to Checkout Button */}
        <Link
          href="/checkout"
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
