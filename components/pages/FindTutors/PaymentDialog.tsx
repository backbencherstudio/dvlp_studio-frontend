"use client";
import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"; 
import { toast } from "sonner";
import CustomDialog from "@/components/reusable/CustomDialog";


export default function PaymentDialog({
  isPaymentModalOpen,
  setIsPaymentModalOpen,
}:any) {
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet");
      setIsSubmitting(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) return;

    try {
      // Create a PaymentMethod
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { name: cardholderName },
      });

      if (error) {
        setErrorMsg(error.message || "Payment failed. Try again.");
      } else {
        toast.success("✅ Payment method created!");
        console.log("PaymentMethod:", paymentMethod);

        // Send paymentMethod.id to backend to complete payment (later)
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomDialog open={isPaymentModalOpen} setOpen={setIsPaymentModalOpen}>
      <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Holder Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Cardholder Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Stripe Elements */}
        <div className="space-y-3">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <div className="border rounded-lg p-3 bg-gray-50">
            <CardNumberElement
              options={{
                style: {
                  base: { fontSize: "16px", color: "#1A1F36" },
                  invalid: { color: "#E53E3E" },
                },
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="border rounded-lg p-3 bg-gray-50">
              <CardExpiryElement
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
            <div className="border rounded-lg p-3 bg-gray-50">
              <CardCvcElement
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
          </div>
        </div>

        {/* Error Display */}
        {errorMsg && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {errorMsg}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-4 rounded-lg hover:opacity-80 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
          </button>
          <button
            type="button"
            onClick={() => setIsPaymentModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </CustomDialog>
  );
}
