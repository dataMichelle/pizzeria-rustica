"use client";

import { useCart } from "@/context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalCheckout from "@/components/PayPalCheckout";

export default function CheckoutPage() {
  const { cartItems, total, tipAmount, taxAmount } = useCart();
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  // Early return if PayPal Client ID is missing
  if (!clientId) {
    console.error("PayPal Client ID is not defined.");
    return (
      <div className="container mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <p className="text-red-500">Error: PayPal configuration unavailable.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-center py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-10">
          {/* Cart Summary */}
          <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Order</h2>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <p className="font-semibold text-lg">
                Tip: ${tipAmount.toFixed(2)}
              </p>
              <p className="font-semibold text-lg">
                Tax: ${taxAmount.toFixed(2)}
              </p>
              <p className="font-bold text-xl">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* PayPal Buttons */}
          {total > 0 && (
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="my-4 max-w-[300px] w-full">
                <PayPalScriptProvider
                  options={{
                    "client-id": clientId,
                    currency: "USD",
                    intent: "capture",
                  }}
                >
                  <PayPalCheckout totalPrice={total} />
                </PayPalScriptProvider>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
