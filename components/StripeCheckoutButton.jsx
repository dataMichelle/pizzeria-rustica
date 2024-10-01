"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Ensure console.log is separate from the stripePromise
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeCheckoutButton({ totalPrice, items }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    // Load the Stripe object
    const stripe = await stripePromise;

    // Fetch the checkout session from your API
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, totalPrice }), // Ensure totalPrice is being passed
    });

    const session = await response.json();

    // Handle errors from the session creation process
    if (session.error) {
      console.error(session.error);
      setLoading(false);
      return;
    }

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    // Handle errors from Stripe redirection
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
