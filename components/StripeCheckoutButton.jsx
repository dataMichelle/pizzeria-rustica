import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeCheckoutButton({ totalPrice, items }) {
  const handleCheckout = async (e) => {
    e.preventDefault(); // Prevent form submission

    console.log("Total Price:", totalPrice); // Log to check totalPrice

    // Convert totalPrice to cents for Stripe
    const totalPriceInCents = Math.round(totalPrice * 100);
    console.log("Total Price in Cents:", totalPriceInCents); // Log converted price

    if (isNaN(totalPriceInCents)) {
      console.error("Invalid total price:", totalPriceInCents);
      return;
    }

    try {
      // Ensure stripePromise is available
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe is not loaded properly.");
        return;
      }

      console.log(
        "Sending request to /api/checkout with items and totalPrice:",
        {
          items,
          totalPrice: totalPriceInCents,
        }
      );

      // Make API request to create Stripe session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, totalPrice: totalPriceInCents }),
      });

      if (!response.ok) {
        console.error(
          "Error in /api/checkout response:",
          response.status,
          response.statusText
        );
        return;
      }

      const session = await response.json();
      console.log("Received session from /api/checkout:", session);

      if (!session.id) {
        console.error("Session ID is not available.");
        return;
      }

      // Redirect to Stripe Checkout
      console.log(
        "Redirecting to Stripe checkout with session ID:",
        session.id
      );
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Stripe checkout error:", error.message);
      }
    } catch (err) {
      console.error("An error occurred during checkout:", err.message);
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
