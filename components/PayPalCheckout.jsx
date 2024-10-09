import { useEffect, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalPrice, tipAmount }) => {
  const [{ isPending, isRejected, options }, dispatch] =
    usePayPalScriptReducer();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Ensure the PayPal script reloads correctly when needed
  useEffect(() => {
    console.log("Resetting PayPal script options");
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
      console.log("PayPal script loaded successfully");
      setScriptLoaded(true);
    } else if (isRejected) {
      console.error("Failed to load PayPal script");
    }
  }, [isPending, isRejected]);

  if (isRejected) {
    return <div>Error loading PayPal options. Please try again later.</div>;
  }

  const createOrder = (data, actions) => {
    const parsedTotalPrice = parseFloat(totalPrice);
    const parsedTipAmount = parseFloat(tipAmount) || 0; // Default to 0 if tipAmount is empty

    if (isNaN(parsedTotalPrice) || isNaN(parsedTipAmount)) {
      console.error("Invalid totalPrice or tipAmount:", {
        totalPrice,
        tipAmount,
      });
      return;
    }

    const totalAmount = (parsedTotalPrice + parsedTipAmount).toFixed(2);

    if (isNaN(totalAmount)) {
      console.error("Invalid total amount:", totalAmount);
      return;
    }

    console.log("Creating order with total amount:", totalAmount);

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
        console.log("Order created successfully:", orderID);
        return orderID;
      })
      .catch((err) => {
        console.error("Error creating order:", err); // Log any errors
      });
  };

  const onApprove = (data, actions) => {
    console.log("Order approved, capturing order");
    return actions.order
      .capture()
      .then((details) => {
        console.log("Order captured successfully:", details);
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
        console.log("PayPal script not loaded yet")
      )}
    </div>
  );
};

export default PayPalCheckout;
