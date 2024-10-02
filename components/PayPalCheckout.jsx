import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

function PayPalButtonWrapper({ totalPrice }) {
  const [{ isPending, isRejected }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    // Set up the PayPal script dynamically
    dispatch({
      type: "resetOptions",
      value: {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
      },
    });
  }, [dispatch]);

  if (isPending) {
    return <p>Loading payment options...</p>;
  }

  if (isRejected) {
    return <p>Error loading PayPal script. Please try again later.</p>;
  }

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

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtonWrapper totalPrice={totalPrice} />
    </PayPalScriptProvider>
  );
}
