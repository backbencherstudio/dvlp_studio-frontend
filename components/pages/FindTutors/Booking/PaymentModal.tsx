"use client";

import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CustomDialog from "@/components/reusable/CustomDialog";
import CustomInputField from "@/components/reusable/CustomInput";
import { Input } from "@/components/ui/input";
import { privateAxios } from "@/lib/axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PaymentForm({
  onPaymentSuccess,
  sessionId,
  bookingId,
}: {
  onPaymentSuccess: () => void;
  sessionId: string;
  bookingId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) throw new Error("Card element not found");

      // 1. Create payment method
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: { name: cardName },
        });

      if (pmError) throw pmError;

      // 2. Send to backend
      const res = await privateAxios.post(`/payment/stripe/pay`, {
        paymentMethodId: paymentMethod.id,
        sessionId: sessionId,
        bookingId: bookingId,
      });

      const clientSecret = res.data.clientSecret;

      // 3. Confirm the payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret);

      if (confirmError) {
        throw confirmError;
      }

      console.log("PaymentIntent:", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        onPaymentSuccess();
      } else {
        setError("Payment failed or requires additional steps");
      }
    } catch (err: any) {
      console.error("Stripe error:", err);
      setError(err.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cardName">Card Holder Name</label>
        <Input
          name="cardName"
          placeholder="Enter name on card"
          value={cardName}
          onChange={(e: any) => setCardName(e.target.value)}
          required
        />
      </div>

      {/* Stripe Elements Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Card Number</label>
          <div className="border p-2 rounded-md">
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": { color: "#a0aec0" },
                  },
                  invalid: { color: "#e53e3e" },
                },
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Expiry Date</label>
            <div className="border p-2 rounded-md">
              <CardExpiryElement />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">CVC</label>
            <div className="border p-2 rounded-md">
              <CardCvcElement />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-3 rounded-lg hover:opacity-80 w-full disabled:opacity-60"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function PaymentModal({
  open,
  onClose,
  onPaymentSuccess,
  sessionId,
  bookingId,
}: {
  open: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  sessionId: string;
  bookingId: string;
}) {
  return (
    <CustomDialog open={open} setOpen={onClose}>
      <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm
          onPaymentSuccess={onPaymentSuccess}
          sessionId={sessionId}
          bookingId={bookingId}
        />
      </Elements>

      <button
        onClick={onClose}
        className="mt-4 text-gray-600 underline w-full text-center"
      >
        Cancel
      </button>
    </CustomDialog>
  );
}
