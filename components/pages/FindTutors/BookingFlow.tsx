"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import React, { useState } from "react";
import { useForm} from "react-hook-form";
import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { privateAxios, publicAxios } from "@/lib/axios";
import PaymentSuccessModal from "./SuccessModal";

// Mock API calls
type BookingFormValues = {
  name: string;
  subject: string;
  slot: string;
};
type PaymentFormValues = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};
// Separate API calls for booking and payment
type BookingApiPayload = {
  name: string;
  subject: string;
  slots: Date;
  tutorId: string;
  sessionId: string;
  sessionCharge: string;
  mode: string;
};

const createBooking = async (bookingData: BookingApiPayload) => {
  const { sessionId, ...body } = bookingData;
  return privateAxios.post(`/students/sessions/${sessionId}/book`, body);
};

const processPayment = async (
  paymentData: PaymentFormValues & { bookingId: string }
) => {
  return privateAxios.post("/payments", paymentData);
};

// booking form component

const BookingFlow = ({ tutor }: any) => {
  console.log("Tutor", tutor);
  // Step 1: State for handling modal visibility
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<{ id: string } | null>(
    null
  );
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [tutorSessions, setTutorSessions] = useState<any>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  // Step 2: React Hook Form setup for booking and payment forms
  const {
    register: registerBooking,
    handleSubmit: handleBookingSubmit,
    formState: { errors: bookingErrors },
    control: bookingControl,
    watch: watchBooking,
  } = useForm<BookingFormValues>({
    defaultValues: { name: "", subject: "", slot: "" },
  });

  // Watch form values to see date field updates (for debugging)
  const watchedValues = watchBooking();

  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
  } = useForm<PaymentFormValues>({
    defaultValues: { cardName: "", cardNumber: "", expiry: "", cvc: "" },
  });

  const handleBookingSession = async (id: string) => {
    if (user && user.type === "student") {
      setBookingError(null);
      setPaymentError(null);
      setSelectedSubject("");
      setIsBookingModalOpen(true);

      try {
        const res = await publicAxios.get(`/teacher/my-sessions/${id}`);
        setTutorSessions(res.data);
      } catch (error) {
        console.error("Failed to fetch tutor sessions:", error);
      }
    } else {
      router.push(
        `/student/sign-in?callbackUrl=${encodeURIComponent("/find-tutors")}`
      );
    }
  };

  console.log("tutorSessions:", tutorSessions);
  console.log("bookingErrors:", bookingErrors);
  console.log("selectedSubject:", selectedSubject);

  // Helper functions to extract data from tutorSessions
  const getUniqueSubjects = () => {
    const subjects = tutorSessions?.map((session: any) => session.subject);
    return [...new Set(subjects)].map((subject) => ({
      label: subject as string,
      value: subject as string,
    }));
  };

  const getAvailableSlotsForSubject = (subject: string) => {
    const session = tutorSessions.find(
      (session: any) => session.subject === subject
    );
    return session?.available_slots_time_and_date || [];
  };

  const formatSlotForDisplay = (slot: string) => {
    const date = new Date(slot);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getAvailableSlotOptions = () => {
    if (!selectedSubject) return [];
    const slots = getAvailableSlotsForSubject(selectedSubject);
    return slots.map((slot: string) => ({
      label: formatSlotForDisplay(slot),
      value: slot,
    }));
  };

  // Step 4: Booking Form Submission
  const onBookingSubmit = async (data: BookingFormValues) => {
    console.log("Form data:", data);
    console.log("Tutor sessions:", tutorSessions);

    try {
      setIsBookingSubmitting(true);
      setBookingError(null);

      // Validate required fields
      if (!data.name || !data.subject || !data.slot) {
        throw new Error("Please fill in all required fields");
      }

      // Validate slot is a valid date string
      const slotDate = new Date(data.slot);
      if (isNaN(slotDate.getTime())) {
        throw new Error("Invalid date selected");
      }

      // Find the session details for the selected subject
      const selectedSession = tutorSessions.find(
        (session: any) => session.subject === data.subject
      );

      if (!selectedSession) {
        throw new Error("Selected session not found");
      }

      console.log("Selected session:", selectedSession);
      console.log("Slot date:", slotDate);
      console.log("Slot date type:", typeof slotDate);
      console.log("Slot date instanceof Date:", slotDate instanceof Date);

      const bookingPayload = {
        name: data.name,
        subject: data.subject,
        slots: slotDate, // Use the validated Date instance
        tutorId: tutor?.id || tutor?._id,
        sessionId: selectedSession.id,
        sessionCharge: selectedSession.session_charge,
        mode: selectedSession.mode,
      };

      console.log("Booking payload:", bookingPayload);

      const response = await createBooking(bookingPayload);

      console.log("Booking response:", response);

      // Store the created booking ID for payment
      setCreatedBooking({ id: response.data.id || response.data._id });

      setIsBookingModalOpen(false);
      setIsPaymentModalOpen(true);
    } catch (error: any) {
      console.error("Booking creation failed", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create booking. Please try again.";
      setBookingError(
        typeof errorMessage === "string"
          ? errorMessage
          : "Failed to create booking. Please try again."
      );
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const onPaymentSubmit = async (paymentDetails: PaymentFormValues) => {
    if (!createdBooking) return;
    try {
      setIsPaymentSubmitting(true);
      setPaymentError(null);

      // await processPayment({
      //   ...paymentDetails,
      //   bookingId: createdBooking.id,
      // });

      setIsPaymentModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      console.error("Payment processing failed", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Payment processing failed. Please try again.";
      setPaymentError(
        typeof errorMessage === "string"
          ? errorMessage
          : "Payment processing failed. Please try again."
      );
    } finally {
      setIsPaymentSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Button to open booking modal */}

      <button
        onClick={() => handleBookingSession(tutor?.userid || tutor?.id)}
        className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-3.5 rounded-xl hover:opacity-80 w-full cursor-pointer border  "
      >
        Book Session
      </button>

      {/* Booking Modal using CustomDialog */}
      <CustomDialog
        open={isBookingModalOpen}
        setOpen={setIsBookingModalOpen}
        width={false}
      >
        <h2 className="text-2xl font-semibold mb-4">
          Book Session with {tutor?.name}
        </h2>

        <form
          onSubmit={handleBookingSubmit(onBookingSubmit)}
          className="space-y-4"
        >
          {/* Name */}

          <CustomInputField
            label="Your Name"
            name="name"
            placeholder="Enter your name"
            register={registerBooking}
            errors={bookingErrors?.name}
            required={true}
          />

          {/* Subject */}
          <CustomSelectField
            label="Subject"
            name="subject"
            register={registerBooking}
            control={bookingControl}
            options={getUniqueSubjects()}
            required={true}
            onChange={(value: string) => setSelectedSubject(value)}
          />

          {/* Available Slots */}
          <CustomSelectField
            label="Available Slots"
            name="slot"
            register={registerBooking}
            control={bookingControl}
            options={getAvailableSlotOptions()}
            required={true}
            disabled={!selectedSubject}
            placeholder={
              selectedSubject ? "Select a time slot" : "First select a subject"
            }
          />

          {/* Error Display */}
          {bookingError && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {typeof bookingError === "string"
                ? bookingError
                : JSON.stringify(bookingError)}
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 flex flex-col justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-2 rounded-lg hover:opacity-80 cursor-pointer disabled:opacity-60"
              disabled={isBookingSubmitting}
            >
              {isBookingSubmitting
                ? "Creating Booking..."
                : "Proceed to Payment"}
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-lg"
              onClick={() => {
                setIsBookingModalOpen(false);
                setSelectedSubject("");
                // Reset form if needed
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </CustomDialog>

      {/* Payment Modal using CustomDialog*/}

      <CustomDialog
        open={isPaymentModalOpen}
        setOpen={setIsPaymentModalOpen}
        width={false}
      >
        <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>

        <form
          onSubmit={handlePaymentSubmit(onPaymentSubmit)}
          className="space-y-4"
        >
          {/* Card Holder Name */}

          <CustomInputField
            label="Account Holder Name"
            name="cardName"
            placeholder="Enter holder name"
            register={registerPayment}
            errors={paymentErrors.cardName}
            required={true}
          />
          {/* Card Number */}
          <CustomInputField
            label="Card Number"
            name="cardNumber"
            placeholder="Enter card number"
            register={registerPayment}
            errors={paymentErrors.cardNumber}
            required={true}
          />

          {/* Expiry + CVC */}
          <div className="grid grid-cols-2 gap-4">
            <CustomInputField
              label="Expiry Date"
              name="expiry"
              placeholder="MM/YY"
              register={registerPayment}
              errors={paymentErrors.expiry}
              required={true}
            />
            <CustomInputField
              label="CVC"
              name="cvc"
              placeholder="123"
              register={registerPayment}
              errors={paymentErrors.cvc}
              required={true}
            />
          </div>

          {/* Error Display */}
          {paymentError && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {typeof paymentError === "string"
                ? paymentError
                : JSON.stringify(paymentError)}
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 flex flex-col justify-between gap-2.5">
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-4 rounded-lg hover:opacity-80 cursor-pointer disabled:opacity-60"
              type="submit"
              disabled={isPaymentSubmitting}
            >
              {isPaymentSubmitting ? "Processing Payment..." : "Pay Now"}
            </button>
            <button
              className="px-5 py-2 rounded-lg  bg-gray-100"
              type="button"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </CustomDialog>

      {/* Success Modal */}
      <PaymentSuccessModal
        isSuccessModalOpen={isSuccessModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
      />
    </div>
  );
};

export default BookingFlow;
