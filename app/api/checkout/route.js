import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Parse incoming request body
    const { items, totalPrice } = await req.json();
    console.log("Received items:", JSON.stringify(items, null, 2));
    console.log("Received total price (in cents):", totalPrice);

    // Basic validation for items and totalPrice
    if (!items || !Array.isArray(items) || items.length === 0 || !totalPrice) {
      console.error("Missing or invalid items or totalPrice.");
      return new Response(
        JSON.stringify({ error: "Missing or invalid items or totalPrice." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => {
        // Validate item properties
        if (!item.name || !item.price) {
          console.error("Invalid item data:", item);
          throw new Error("Invalid item data.");
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name || "Unnamed Product",
            },
            unit_amount: Math.round(item.price * 100), // convert to cents
          },
          quantity: item.quantity || 1, // default to 1 if quantity isn't provided
        };
      }),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log("Stripe session created successfully:", session.id);

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during checkout session creation:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
