import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Log the incoming request for debugging purposes
    console.log("Received POST request to /api/checkout");

    const { amount } = await req.json(); // Get total amount from the request body
    console.log("Total amount received:", amount);

    // Check for invalid amount
    if (!amount || isNaN(amount)) {
      console.error("Invalid amount received:", amount);
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Log before creating the Stripe session
    console.log(
      "Creating Stripe session for amount:",
      Math.round(amount * 100)
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Total Order",
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    // Log after successfully creating the Stripe session
    console.log("Stripe session created successfully, session ID:", session.id);

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log any error that occurs
    console.error("Error occurred during Stripe session creation:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
