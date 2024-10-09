"use client";
import { useState, useEffect } from "react";
import PayPalCheckout from "@/components/PayPalCheckout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  // Load cart, tip, and tax data from localStorage only once
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedTip = parseFloat(localStorage.getItem("tip")) || 0;
    const storedTax = parseFloat(localStorage.getItem("tax")) || 0;
    const storedFinalTotal =
      parseFloat(localStorage.getItem("finalTotal")) || 0;

    // Set cart items and amounts once on page load
    setCartItems(storedCart);
    setTipAmount(storedTip);
    setTaxAmount(storedTax);

    // Calculate and set the total only once, avoid recalculating multiple times
    const calculatedTotal = storedFinalTotal + storedTip + storedTax;
    setTotal(calculatedTotal);
  }, []); // Run only on component mount

  // Log for debugging purposes
  console.log("Total Price:", total);

  // Check for PayPal Client ID from environment
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) {
    console.error(
      "PayPal Client ID is not defined. Please check your environment variables."
    );
    return <div>Error: PayPal Client ID is not defined.</div>;
  }

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
              {cartItems.map((item, index) => (
                <li key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>
                    {item.quantity} x ${item.price.toFixed(2)} = $
                    {(item.quantity * item.price).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Display Tip, Tax, and Total */}
          <p className="font-semibold text-lg mt-2">
            Tip: ${tipAmount.toFixed(2)}
          </p>
          <p className="font-semibold text-lg mt-2">
            Tax: ${taxAmount.toFixed(2)}
          </p>
          <p className="font-bold text-xl mt-4">Total: ${total.toFixed(2)}</p>
        </div>

        {/* PayPal Button Rendering */}
        <div className="w-full md:w-1/2">
          {cartItems.length > 0 && (
            <div className="my-4">
              <PayPalScriptProvider
                options={{
                  "client-id": clientId,
                }}
              >
                <PayPalCheckout totalPrice={total} tipAmount={tipAmount} />
              </PayPalScriptProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
