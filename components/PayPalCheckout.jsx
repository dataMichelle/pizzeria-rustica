import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalPrice, tipAmount }) => {
  const [{ isPending, isRejected }, dispatch] = usePayPalScriptReducer();

  // Ensure PayPal options are set correctly
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

  const createOrder = (data, actions) => {
    const parsedTotalPrice = parseFloat(totalPrice);
    const parsedTipAmount = parseFloat(tipAmount) || 0;
    const totalAmount = (parsedTotalPrice + parsedTipAmount).toFixed(2);

    if (isNaN(totalAmount)) {
      console.error("Invalid total amount:", totalAmount);
      return;
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount,
          },
        },
      ],
    });
  };

  return (
    <div>
      {isPending && <div>Loading PayPal options...</div>}

      {!isPending && (
        <>
          <div style={{ padding: "20px" }}>
            {/* PayPal Standard Button */}
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="paypal"
              createOrder={createOrder}
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

          <div style={{ padding: "20px" }}>
            {/* Pay Later Button */}
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="paylater"
              createOrder={createOrder}
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

          <div style={{ padding: "20px" }}>
            {/* Credit Card Button */}
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="card"
              createOrder={createOrder}
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
