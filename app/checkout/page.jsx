"use client";
import { useState, useEffect } from "react";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import PayPalCheckout from "@/components/PayPalCheckout";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [tipAmount, setTipAmount] = useState(0); // Store the tip amount from cart

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Assuming tipAmount is stored in localStorage as 'tip'
    const storedTip = parseFloat(localStorage.getItem("tip")) || 0;
    setTipAmount(storedTip);
  }, []);

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("tip");
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.0825;
  const total = subtotal + tax + tipAmount;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Order</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="mb-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>
                    {item.quantity} x ${item.price.toFixed(2)} = $
                    {(item.quantity * item.price).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Order Total with Tip and Tax */}
          <p className="font-semibold text-lg mt-6">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
          <p className="font-semibold text-lg mt-2">Tax: ${tax.toFixed(2)}</p>
          <p className="font-semibold text-lg mt-2">
            Tip: ${tipAmount.toFixed(2)}
          </p>
          <p className="font-bold text-xl mt-4">Total: ${total.toFixed(2)}</p>

          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <form id="checkout-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form fields for name, email, etc. */}
            </div>

            {/* Display Payment Buttons */}
            {cartItems.length > 0 && (
              <>
                <h3>Choose your payment method</h3>
                <div className="my-4">
                  <StripeCheckoutButton totalPrice={total} items={cartItems} />
                </div>
                <div className="my-4">
                  <PayPalCheckout totalPrice={total} />
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
