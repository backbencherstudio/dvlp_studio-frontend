import React, { Suspense } from "react";
import ForgotPassword from "./_components/ForgotPassword";

export default function page() {
  return (
    <div>
      <Suspense fallback={"Loading..."}>
        <ForgotPassword />
      </Suspense>
    </div>
  );
}
