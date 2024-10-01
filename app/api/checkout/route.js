import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Parse incoming request body
    const { items, totalPrice } = await req.json();
    console.log("Received items:", items);
    console.log("Received total price (in cents):", totalPrice);

    if (!items || !totalPrice) {
      console.error("Missing items or totalPrice in the request.");
      return new Response(
        JSON.stringify({ error: "Missing items or totalPrice." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create the session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name || "Total Order",
          },
          unit_amount: totalPrice, // price in cents
        },
        quantity: item.quantity || 1,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log("Created session:", session.id);

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
