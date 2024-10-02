import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout({ totalPrice }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  // Ensure the clientId is being loaded correctly
  if (!clientId) {
    console.error(
      "PayPal Client ID is missing. Check your environment variables."
    );
    return <p>Error loading payment options. Please try again later.</p>;
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
        fundingSource={undefined} // Ensure all funding sources are allowed
        funding={{
          allowed: [
            window.paypal.FUNDING.PAYPAL,
            window.paypal.FUNDING.CARD, // Pay with Credit Card option
            window.paypal.FUNDING.PAYLATER, // Pay Later option
          ],
        }}
      />
    </PayPalScriptProvider>
  );
}
