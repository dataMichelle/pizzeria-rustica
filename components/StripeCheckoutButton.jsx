import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeCheckoutButton({ totalPrice, items }) {
  const handleCheckout = async (e) => {
    e.preventDefault(); // Prevent form submission
    console.log("Total Price:", totalPrice); // Log to check

    // Convert totalPrice to cents for Stripe
    const totalPriceInCents = Math.round(totalPrice * 100);
    if (isNaN(totalPriceInCents)) {
      console.error("Invalid total price:", totalPriceInCents);
      return;
    }

    // Ensure stripePromise is available
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe is not loaded properly.");
      return;
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, totalPrice: totalPriceInCents }),
    });

    const session = await response.json();

    if (!session.id) {
      console.error("Session ID is not available.");
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Stripe checkout error:", error.message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg"
    >
      Pay with Stripe
    </button>
  );
}
