import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripeCheckoutButton({ totalPrice, items }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe is not loaded. Check the API key.");
      return;
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items, totalPrice }),
    });

    const session = await response.json();
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
   
