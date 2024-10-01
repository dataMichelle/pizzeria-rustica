import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    console.log("Received POST request to /api/checkout");

    const { items, totalPrice } = await req.json(); // Get items and totalPrice from the request body
    console.log("Received items:", items);
    console.log("Received total price:", totalPrice);

    // Check for invalid input
    if (!items || !totalPrice || isNaN(totalPrice)) {
      console.error("Invalid items or total price:", { items, totalPrice });
      return new Response(JSON.stringify({ error: "Invalid items or total price" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Creating Stripe session...");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Total Order",
            },
            unit_amount: totalPrice, // Using the totalPrice from the request (which is already in cents)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log("Stripe session created successfully, session ID:", session.id);

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Ty
