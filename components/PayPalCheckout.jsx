import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalPrice }) => {
  const [{ isPending, isRejected }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      },
    });
  }, [dispatch]);

  if (isRejected) {
    return <div>Error loading PayPal options. Please try again later.</div>;
  }

  return (
    <div>
      {isPending && <div>Loading PayPal options...</div>}

      {/* PayPal Standard Button */}
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

      {/* Pay Later Button */}
      <PayPalButtons
        style={{ layout: "vertical" }}
        fundingSource="paylater"
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
          console.error("PayPal Pay Later onError", err);
        }}
        onCancel={() => {
          console.log("PayPal Pay Later onCancel");
        }}
      />

      {/* Credit Card Button */}
      <PayPalButtons
        style={{ layout: "vertical" }}
        fundingSource="card"
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
          console.error("PayPal Credit Card onError", err);
        }}
        onCancel={() => {
          console.log("PayPal Credit Card onCancel");
        }}
      />
    </div>
  );
};

export default PayPalCheckout;
