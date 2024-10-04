import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalPrice }) => {
  const [{ isPending, options, isRejected }, dispatch] =
    usePayPalScriptReducer();

  useEffect(() => {
    try {
      console.log(
        "PayPal Client ID:",
        process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
      ); // Debug: Check if the Client ID is available

      dispatch({
        type: "resetOptions",
        value: {
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          currency: "USD",
        },
      });
    } catch (err) {
      console.error("Error loading PayPal options:", err);
    }
  }, [dispatch]);

  if (isRejected) {
    return <div>Error loading PayPal options. Please try again later.</div>;
  }

  return (
    <div>
      {isPending && <div>Loading PayPal options...</div>}
      <PayPalButtons
        style={{ layout: "vertical" }}
        fundingSource="paypal"
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice.toFixed(2),
                },
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
          console.error("PayPal Checkout onError", err);
        }}
        onCancel={() => {
          console.log("PayPal Checkout onCancel");
        }}
      />
    </div>
  );
};

export default PayPalCheckout;
