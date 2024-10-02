import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout({ totalPrice }) {
  // Replace with your actual PayPal client ID for production
  const clientId = "YOUR_PAYPAL_CLIENT_ID"; // Hardcoded for testing

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
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
