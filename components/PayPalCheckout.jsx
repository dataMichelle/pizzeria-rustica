import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

function PayPalButtonWrapper({ totalPrice }) {
  const [{ isPending, isRejected, options }, dispatch] =
    usePayPalScriptReducer();

  useEffect(() => {
    console.log("Setting PayPal script options...");

    // Dispatch to reset the options and ensure PayPal script is loaded with the correct client ID
    dispatch({
      type: "resetOptions",
      value: {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
      },
    });
  }, [dispatch]);

  if (isPending) {
    console.log("PayPal script is pending...");
    return <p>Loading payment options...</p>;
  }

  if (isRejected) {
    console.error("PayPal script failed to load.");
    return <p>Error loading PayPal script. Please try again later.</p>;
  }

  console.log("PayPal script loaded, rendering buttons...");

  return (
    <PayPalButtons
      style={{
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
        tagline: false,
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
        alert("There was an issue processing your payment. Please try again.");
      }}
    />
  );
}

export default function PayPalCheckout({ totalPrice }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error(
      "PayPal Client ID is missing. Check your environment variables."
    );
    return <p>Error loading payment options. Please try again later.</p>;
  }

  console.log("Rendering PayPalCheckout with Client ID:", clientId);

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtonWrapper totalPrice={totalPrice} />
    </PayPalScriptProvider>
  );
}
