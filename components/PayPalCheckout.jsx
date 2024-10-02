import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";

export default function PayPalCheckout({ totalPrice }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  // Check if clientId is available
  useEffect(() => {
    if (!clientId) {
      console.error(
        "PayPal Client ID is missing. Check your environment variables."
      );
    } else {
      console.log("PayPal Client ID loaded:", clientId);
    }
  }, [clientId]);

  if (!clientId) {
    return <p>Error loading payment options. Please try again later.</p>;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
        currency: "USD",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical", // Shows buttons vertically stacked
          color: "gold", // Color of the buttons
          shape: "rect", // Shape of the buttons
          label: "paypal", // Default label
          tagline: false, // Hide tagline under the buttons
        }}
        createOrder={(data, actions) => {
          console.log("Creating PayPal order...");
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: totalPrice.toFixed(2) },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          console.log("Order approved, capturing payment...");
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
      />
    </PayPalScriptProvider>
  );
}
