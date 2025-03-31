"use client";

import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export default function PayPalCheckout({ totalPrice }) {
  const [{ isPending, isRejected }, dispatch] = usePayPalScriptReducer();

  // Reset PayPal script options on mount
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      },
    });
  }, [dispatch]);

  // Order creation with validation
  const createOrder = (data, actions) => {
    const total = parseFloat(totalPrice);
    if (isNaN(total) || total <= 0) {
      console.error("Invalid totalPrice:", totalPrice);
      return Promise.reject(new Error("Invalid total amount"));
    }
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: total.toFixed(2),
            },
          },
        ],
      })
      .catch((err) => {
        console.error("Order creation failed:", err);
        throw err; // Re-throw for onError to catch
      });
  };

  // Payment approval
  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      alert(`Transaction completed by ${details.payer.name.given_name}`);
    } catch (err) {
      console.error("Payment capture failed:", err);
      throw err; // Re-throw for onError
    }
  };

  // Error and cancellation handlers
  const onError = (err) => {
    console.error("PayPal error:", err);
    // Optionally set an error state to display to user
  };

  const onCancel = () => {
    console.log("Payment cancelled by user");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-[300px] mx-auto">
      {isPending && <p className="text-gray-600">Loading PayPal options...</p>}
      {isRejected && (
        <p className="text-red-500">
          Failed to load PayPal. Please try again later.
        </p>
      )}
      {!isPending && !isRejected && (
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
