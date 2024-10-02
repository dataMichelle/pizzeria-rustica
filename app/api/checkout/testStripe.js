import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 1000, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });

    console.log("Stripe session created:", session);
  } catch (error) {
    console.error("Error creating Stripe session:", error);
  }
}

testStripe();
