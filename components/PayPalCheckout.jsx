import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

export default function PayPalCheckout({ totalPrice }) {
  const [fundingSources, setFundingSources] = useState(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => {
    // Wait until PayPal SDK is loaded before accessing funding options
    if (window.paypal) {
      setFundingSources(window.paypal.FUNDING);
    }
  }, []);

  if (!clientId) {
    console.error(
      "PayPal Client ID is missing. Check your environment variables."
    );
    return <p>Error loading payment options. Please try again later.</p>;
  }

  if (!fundingSources) {
    return <p>Loading PayPal options...</p>; // Ensure SDK is loaded
  }

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        style={{
          layout: "vertical", // Shows buttons vertically stacked
          color: "gold", // Color of the buttons (e.g., gold, blue, silver)
          shape: "rect", // Shape of the buttons (e.g., rect or pill)
          label: "paypal", // Label can be "paypal", "pay", "buynow", etc.
          tagline: false, // Hide tagline under the buttons
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: totalPrice.toFixed(2) },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout error:", err);
          alert(
            "There was an issue processing your payment. Please try again."
          );
        }}
        funding={{
          allowed: [
            fundingSources.PAYPAL,
            fundingSources.CARD, // Pay with Credit Card option
            fundingSources.PAYLATER, // Pay Later option
          ],
        }}
      />
    </PayPalScriptProvider>
  );
}
