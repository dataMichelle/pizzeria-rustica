import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log("Request method:", req.method); // Log request method
  console.log("Request headers:", req.headers); // Log request headers
  console.log("Request body:", req.body); // Log request body

  if (req.method === "POST") {
    try {
      const { items, totalPrice } = req.body;

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

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error("Error creating Stripe session:", error); // Log error details
      res.status(500).json({ error: error.message });
    }
  } else {
    console.log("Invalid request method:", req.method); // Log invalid method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
