"use client";
import React from "react";
import BookingModal from "./BookingModal";
import PaymentModal from "./PaymentModal";
import { useBookingFlow } from "./useBookingFlow";
import PaymentSuccessModal from "../SuccessModal";

export default function BookingFlow2({ tutor }: any) {
  const flow = useBookingFlow(tutor);

  return (
    <div className="w-full">
      <button
        onClick={() => flow.handleBookingSession(tutor?.userid || tutor?.id)}
        className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-3.5 rounded-xl hover:opacity-80 w-full"
      >
        Book Session
      </button>

      {flow.step === "booking" && (
        <BookingModal
          open
          onClose={() => flow.setStep("idle")}
          onSubmit={flow.submitBooking}
          form={flow.bookingForm}
          subjects={flow.getUniqueSubjects()}
          slots={flow.getAvailableSlots(flow.selectedSubject)}
          selectedSubject={flow.selectedSubject}
          setSelectedSubject={flow.setSelectedSubject}
          isSubmitting={flow.isSubmitting}
          error={flow.error}
          tutorName={tutor?.name}
        />
      )}

      {flow.step === "payment" && (
        <PaymentModal
          open
          onClose={() => flow.setStep("idle")}
          onPaymentSuccess={() => flow.setStep("success")}
        />
      )}

      {flow.step === "success" && (
        <PaymentSuccessModal
          isSuccessModalOpen
          setIsSuccessModalOpen={() => flow.setStep("idle")}
        />
      )}
    </div>
  );
}
