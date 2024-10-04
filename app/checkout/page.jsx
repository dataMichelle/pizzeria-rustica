"use client";
import { useState, useEffect } from "react";
import PayPalCheckout from "@/components/PayPalCheckout";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const storedTotal = parseFloat(localStorage.getItem("finalTotal")) || 0;
    const storedTip = parseFloat(localStorage.getItem("tip")) || 0;

    setTotal(storedTotal);
    setTipAmount(storedTip);
  }, []);

  return (
    <div className="container mx-auto text-center py-12">
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
          <p className="font-semibold text-lg mt-2">
            Tip: ${tipAmount.toFixed(2)}
          </p>
          <p className="font-bold text-xl mt-4">Total: ${total.toFixed(2)}</p>
        </div>

        <div className="w-full md:w-1/2">
          {/* Replace form with PayPal buttons */}
          {cartItems.length > 0 && (
            <div className="my-4">
              {/* Render PayPal buttons here */}
              <PayPalCheckout totalPrice={total} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
