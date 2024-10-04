import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ totalPrice }) => {
  const [{ isPending, options, isRejected }, dispatch] =
    usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
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
        // Use the fundingSource to allow PayPal, Pay Later, and Credit Card
        fundingSource={undefined} // Allow all available funding sources
        funding={{
          allowed: [
            window.paypal.FUNDING.PAYPAL,
            window.paypal.FUNDING.CARD,
            window.paypal.FUNDING.PAYLATER,
          ],
        }}
      />
    </div>
  );
};

export default PayPalCheckout;
