"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { privateAxios, publicAxios } from "@/lib/axios";
import { toast } from "sonner";

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

type BookingApiPayload = {
  name: string;
  subject: string;
  slots: Date;
  tutorId: string;
  sessionId: string;
  sessionCharge: string;
  mode: string;
};

const createBooking = (data: BookingApiPayload) =>
  privateAxios.post(`/students/sessions/${data.sessionId}/book`, data);

export const useBookingFlow = (tutor: any) => {
  const { user } = useAuth();
  const router = useRouter();

  console.log("User name", user?.name);

  const [step, setStep] = useState<"idle" | "booking" | "payment" | "success">(
    "idle"
  );
  const [tutorSessions, setTutorSessions] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [createdBooking, setCreatedBooking] = useState<{ id: string } | null>(
    null
  );
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Booking form
  const bookingForm = useForm<BookingFormValues>({
    defaultValues: { name: user?.name, subject: "", slot: "" },
  });

  // Update form when user loads
  useEffect(() => {
    if (user?.name) {
      bookingForm.reset({
        name: user.name,
        subject: "",
        slot: "",
      });
    }
  }, [user]);

  // Payment form
  const paymentForm = useForm<PaymentFormValues>({
    defaultValues: { cardName: "", cardNumber: "", expiry: "", cvc: "" },
  });

  // Fetch tutor sessions
  const handleBookingSession = async (id: string) => {
    if (!user || user.type !== "student") {
      router.push(
        `/student/sign-in?callbackUrl=${encodeURIComponent("/find-tutors")}`
      );
      return;
    }
    try {
      const res = await publicAxios.get(`/teacher/my-sessions/${id}`);
      setTutorSessions(res.data);
      setStep("booking");
    } catch (err) {
      setError("Failed to load sessions");
    }
  };

  const getUniqueSubjects = () => {
    const subjects = tutorSessions?.map((s) => s.subject);
    return [...new Set(subjects)].map((subject) => ({
      label: subject,
      value: subject,
    }));
  };

  const getAvailableSlots = (subject: string) => {
    const session = tutorSessions?.find((s) => s.subject === subject);
    return (
      session?.available_slots_time_and_date?.map((slot: string) => ({
        label: new Date(slot).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        value: slot,
      })) || []
    );
  };

  // Booking submit
  const submitBooking = async (data: BookingFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const session = tutorSessions?.find((s) => s.subject === data.subject);
      if (!session) throw new Error("Session not found");

      const payload: BookingApiPayload = {
        name: data.name,
        subject: data.subject,
        slots: new Date(data.slot),
        tutorId: tutor?.id || tutor?._id,
        sessionId: session.id,
        sessionCharge: session.session_charge,
        mode: session.mode,
      };

      const res = await createBooking(payload);

      console.log("Res is", res.data);
      if (res.data.status === 409) {
        toast.error(res.data.message);
      } else {
      }
      // ensure we actually received an identifier from the server
      const newId = res.data.bookedSession.id || res.data.bookedSession._id;
      if (!newId) {
        throw new Error("Booking response did not include an id");
      }
      setCreatedBooking({ id: newId });
      setSessionId(session.id);
      setStep("payment");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitPayment = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      console.log("hiiiiiiiiii", {
        bookingId: createdBooking?.id,
      });
      await privateAxios.post("/payments", {
        ...paymentForm.getValues(),
        bookingId: createdBooking?.id,
      });
      setStep("success");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    setStep,
    bookingForm,
    paymentForm,
    isSubmitting,
    error,
    tutorSessions,
    selectedSubject,
    setSelectedSubject,
    handleBookingSession,
    getUniqueSubjects,
    getAvailableSlots,
    submitBooking,
    submitPayment,
    createdBooking,
    sessionId,
  };
};
