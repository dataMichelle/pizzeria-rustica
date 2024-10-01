export default function StripeCheckoutButton({ totalPrice, items }) {
  const handleCheckout = async () => {
    console.log("Total Price:", totalPrice); // Log to check

    // Convert totalPrice to cents for Stripe
    const totalPriceInCents = Math.round(totalPrice * 100);
    if (isNaN(totalPriceInCents)) {
      console.error("Invalid total price:", totalPriceInCents);
      return;
    }

    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, totalPrice: totalPriceInCents }),
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error(error.message);
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
