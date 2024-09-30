"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeCheckoutButton({ totalPrice, items }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    // Create a checkout session with just the total amount rather than individual items
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalPrice, // Send the total price, including tax and tip
      }),
    });

    const session = await response.json();

    if (session.error) {
      console.error(session.error);
      setLoading(false);
      return;
    }

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg whitespace-nowrap"
    >
      {loading ? "Processing..." : "Pay with Stripe"}
    </button>
  );
}
