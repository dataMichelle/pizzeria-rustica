import { useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalPrice }) => {
  const [{ isPending, isRejected, options }, dispatch] =
    usePayPalScriptReducer();
  const [scriptLoaded, setScriptLoaded] = useState(false);

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

  useEffect(() => {
    if (!isPending && !isRejected) {
      setScriptLoaded(true);
    }
  }, [isPending, isRejected]);

  if (isRejected) {
    return <div>Error loading PayPal options. Please try again later.</div>;
  }

  const createOrder = (data, actions) => {
    const parsedTotalPrice = parseFloat(totalPrice);

    if (isNaN(parsedTotalPrice)) {
      console.error("Invalid totalPrice:", { totalPrice });
      return;
    }

    const totalAmount = parsedTotalPrice.toFixed(2);

    if (isNaN(totalAmount)) {
      console.error("Invalid total amount:", totalAmount);
      return;
    }

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalAmount,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      })
      .catch((err) => {
        console.error("Error creating order:", err); // Log any errors
      });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        alert("Transaction completed by " + details.payer.name.given_name);
      })
      .catch((err) => {
        console.error("Error capturing order:", err); // Log any errors
      });
  };

  const onError = (err) => {
    console.error("PayPal Checkout onError", err);
  };

  const onCancel = () => {
    console.log("PayPal Checkout onCancel");
  };

  return (
    <div>
      {isPending && <div>Loading PayPal options...</div>}

      {scriptLoaded ? (
        <>
          {/* PayPal Standard Button */}
          <div style={{ padding: "20px" }}>
            <PayPalButtons
              key="paypal"
              style={{ layout: "vertical" }}
              fundingSource="paypal"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              onCancel={onCancel}
            />
          </div>

          {/* Pay Later Button */}
          <div style={{ padding: "20px" }}>
            <PayPalButtons
              key="paylater"
              style={{ layout: "vertical" }}
              fundingSource="paylater"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              onCancel={onCancel}
            />
          </div>

          {/* Credit Card Button */}
          <div style={{ padding: "20px" }}>
            <PayPalButtons
              key="card"
              style={{ layout: "vertical" }}
              fundingSource="card"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              onCancel={onCancel}
            />
          </div>
        </>
      ) : (
        <div>Loading PayPal script...</div>
      )}
    </div>
  );
};

export default PayPalCheckout;
