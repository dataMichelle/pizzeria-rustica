import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalPrice, tipAmount }) => {
  const [{ isPending, isRejected, options }, dispatch] =
    usePayPalScriptReducer();

  // Ensure the PayPal script reloads correctly when needed
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

      {/* PayPal Buttons - Wrapping them in conditionals to avoid multiple renders */}
      {!isPending && (
        <>
          {/* PayPal Standard Button */}
          <div style={{ padding: "20px" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="paypal"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: (totalPrice + tipAmount).toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(
                    "Transaction completed by " + details.payer.name.given_name
                  );
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

          {/* Pay Later Button */}
          <div style={{ padding: "20px" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="paylater"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: (totalPrice + tipAmount).toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(
                    "Transaction completed by " + details.payer.name.given_name
                  );
                });
              }}
              onError={(err) => {
                console.error("PayPal Pay Later onError", err);
              }}
              onCancel={() => {
                console.log("PayPal Pay Later onCancel");
              }}
            />
          </div>

          {/* Credit Card Button */}
          <div style={{ padding: "20px" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="card"
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: (totalPrice + tipAmount).toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(
                    "Transaction completed by " + details.payer.name.given_name
                  );
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
        </>
      )}
    </div>
  );
};

export default PayPalCheckout;
