import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalPrice }) => {
  const [{ isPending, isRejected }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    // Hardcoded PayPal Client ID for testing
    dispatch({
      type: "resetOptions",
      value: {
        "client-id":
          "AfHLTGUQnFzN-6J202-_NkR4oNxTPhEanJR9QdiL_m8Qs5AJytZaKTWIjEk5p1Eoa5x4dspZpBKaTdqZ",
        currency: "USD",
      },
    });
  }, [dispatch]);

  if (isRejected) {
    return <div>Error loading PayPal options. Please try again later.</div>;
  }

  return (
    <div>
      {isPending ? <div>Loading PayPal options...</div> : null}
      <PayPalButtons
        style={{ layout: "vertical" }}
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
