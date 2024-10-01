"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [tip, setTip] = useState(0);
  const router = useRouter(); // Use router for manual navigation

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
    console.log("Final Total Saved:", finalAmount); // Log the final total
    localStorage.setItem("finalTotal", finalAmount); // Save final total including tip to localStorage
    localStorage.setItem("tip", tip); // Save the tip amount

    // Navigate to the checkout page after saving
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <div className="w-full max-w-xl mx-auto px-2 md:px-4 lg:px-6 my-2">
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row justify-start items-start md:items-center border-b pb-4"
          >
            <div className="flex-1 w-full">
              <h2 className="text-xl">{item.name}</h2>
              <p className="text-gray-600">${item.price} each</p>
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
            <div className="flex flex-col items-start md:items-end mt-4 md:mt-0 w-full">
              <p className="text-lg font-semibold">
                Total: ${(item.price * item.quantity).toFixed(2)}
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
      <div className="my-8 text-left">
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
            onChange={(e) => setTip(parseFloat(e.target.value) || 0)} // Ensure valid number
            className="border px-2 py-1 w-24"
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
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
