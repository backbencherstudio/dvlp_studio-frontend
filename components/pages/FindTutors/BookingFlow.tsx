"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import ErrorMessage from "@/components/reusable/ErrorMessage";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";
import DatePickerField from "@/components/reusable/CustomDateInput";
import TimePickerField from "@/components/reusable/CustomTimeInput";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { privateAxios } from "@/lib/axios";

// Mock API calls
type BookingFormValues = {
  name: string;
  subject: string;
  date: string;
  time: string;
};

type PaymentFormValues = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

// Single-call API: sends both booking and payment in one request
const createBookingWithPayment = async (
  payload: { booking: BookingFormValues; payment: PaymentFormValues }
) => {
  // Adjust endpoint/body as per backend
  return privateAxios.post("/bookings/pay-and-book", payload);
};

const BookingFlow = ({ tutor }: any) => {
  // console.log("Tutor", tutor);
  // Step 1: State for handling modal visibility
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<BookingFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    defaultValues: { name: "", subject: "", date: "", time: "" },
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

  const handleBookingSession = () => {
    if (user && user.type === "student") {
      setIsBookingModalOpen(true);
    } else {
      router.push(`/student/sign-in?callbackUrl=${encodeURIComponent("/find-tutors")}`);
    }
  };

  // sign-in?callbackUrl=/tutor-portal/profile
  


  // Step 4: Payment Form Submission
  const onBookingSubmit = async (data: BookingFormValues) => {
    setPendingBooking(data);
    setIsBookingModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const onPaymentSubmit = async (paymentDetails: PaymentFormValues) => {
    if (!pendingBooking) return;
    try {
      setIsSubmitting(true);
      await createBookingWithPayment({
        booking: pendingBooking,
        payment: paymentDetails,
      });
      setIsPaymentModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      // Optionally show error UI/toast
      console.error("Booking/payment failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Button to open booking modal */}

      <button
        onClick={handleBookingSession}
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

        <form onSubmit={handleBookingSubmit(onBookingSubmit)} className="space-y-4">
          {/* Name */}

          <CustomInputField
            label="Your Name"
            name="name"
            placeholder="Enter your name"
            register={registerBooking}
            errors={bookingErrors.name}
            required={true}
          />

          {/* Subject */}
          <CustomSelectField
            label="Subject"
            name="subject"
            register={registerBooking}
            control={bookingControl}
            options={[
              { label: "Math", value: "Math" },
              { label: "Science", value: "Science" },
            ]}
            required={true}
          />

          {/* Date */}
          <DatePickerField
            label="Date"
            name="date"
            register={registerBooking}
            control={bookingControl}
            required={true}
          />

          {/* Time */}

          <div>
            <label htmlFor="time" className="block text-sm font-medium">
              Time
            </label>
            <input
              type="time"
              id="time"
              className="mt-2 px-3 py-4 w-full border border-gray-300 rounded-md"
              {...registerBooking("time", { required: "Time is required" })}
            />
            <ErrorMessage error={bookingErrors.time} />
          </div>

          {/* Footer */}
          <div className="mt-4 flex flex-col justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-2 rounded-lg hover:opacity-80  cursor-pointer"
            >
              Proceed to Payment
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-lg"
              onClick={() => setIsBookingModalOpen(false)}
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

        <form onSubmit={handlePaymentSubmit(onPaymentSubmit)} className="space-y-4">
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

          {/* Footer */}
          <div className="mt-4 flex flex-col justify-between gap-2.5">
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-4 rounded-lg hover:opacity-80  cursor-pointer disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Pay Now"}
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
      <CustomDialog
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        width={true}
      >
        <div className=" flex flex-col items-center ">
          <Image
            className="w-[137px] h-[72.377px]"
            width={150}
            height={75}
            src={"./others/success.svg"}
            alt="success"
          />

          <h2 className="text-center  mb-2 text-xl font-semibold">
            Payment Successful
          </h2>
          <p className="mb-9 max-w-[339px] mx-auto text-gray-400  text-center">
            Your session with Dr. Jessica Miller has been successfully booked.
          </p>
          <div className="mt-4 flex justify-center">
            <Link className="text-[#A855F7] underline" href={"/"}>
              {" "}
              Back to Home{" "}
            </Link>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default BookingFlow;
