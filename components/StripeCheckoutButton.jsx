export default function StripeCheckoutButton({ totalPrice, items }) {
  const handleCheckout = async () => {
    // Log totalPrice and items to verify their values
    console.log("Total Price:", totalPrice);
    console.log("Items:", items);

    if (isNaN(totalPrice)) {
      console.error("Invalid total price:", totalPrice);
      return;
    }

    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, totalPrice }),
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
