import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  console.log("Request method:", req.method); // Log request method
  console.log("Request headers:", req.headers); // Log request headers
  const body = await req.json();
  console.log("Request body:", body); // Log request body

  try {
    const { items, totalPrice } = body;

    // Create a new Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Price in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    console.log("Stripe session created:", session); // Log session details

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error); // Log error details
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.statusCode || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  console.log("Invalid request method:", req.method); // Log invalid method
  return new Response(`Method ${req.method} Not Allowed`, {
    status: 405,
    headers: { Allow: "POST" },
  });
}
