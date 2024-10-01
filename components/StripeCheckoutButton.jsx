"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
);

export default function StripeCheckoutButton({ totalPrice, items }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, totalPrice }), // Ensure totalPrice is being passed
    });

    const session = await response.json();

    if (session.error) {
      console.error(session.error);
      setLoading(false);
      return;
    }

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
      className="bg-blue-500 text-white py-2 px-4 rounded-lg"
    >
      {loading ? "Processing..." : "Pay with Stripe"}
    </button>
  );
}
