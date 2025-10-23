import EmailDetails from "@/components/dashboard/Support/EmailDetails";
import BackButton from "@/components/reusable/BackButton";
import React from "react";

export default function page() {
  return (
    <div>
      <BackButton/>
      <EmailDetails />
    </div>
  );
}
