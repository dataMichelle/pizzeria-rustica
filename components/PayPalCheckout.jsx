import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";

export default function PayPalCheckout({ totalPrice }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

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
        intent: "capture", // Ensuring capture payment intent
        "data-client-token": clientId, // Ensuring token is passed
        "disable-funding": "credit,paylater", // Ensure that Pay Later and Credit are disabled for now
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
          tagline: false,
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
      />
    </PayPalScriptProvider>
  );
}
