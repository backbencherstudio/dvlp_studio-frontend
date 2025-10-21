import StudentPortalContents from "@/components/pages/StudentPortal/StudentPortalBookings";
import RecentReviews from "@/components/pages/TutorPortal/RecentReviews";
import React from "react";

export default function BookingPage() {
  return (
    <div className="space-y-6">
      <StudentPortalContents />
      <RecentReviews/>
    </div>
  );
}
