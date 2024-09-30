"use client";

import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";

export default function StripeCheckout({ items }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false); // To conditionally render the button

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Total",
          amount:
            items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) * 100, // Convert to cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
          setCanMakePayment(true); // Enable button rendering
        }
      });
    }
  }, [stripe, items]);

  if (!paymentRequest || !canMakePayment) {
    return null; // Don't render the button if paymentRequest is not supported
  }

  return (
    <div>
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: {
            paymentRequestButton: {
              type: "googlePay", // 'default', 'googlePay', etc.
              theme: "dark", // 'light' or 'dark'
              height: "48px", // Adjust height if necessary
            },
          },
        }}
      />
    </div>
  );
}
