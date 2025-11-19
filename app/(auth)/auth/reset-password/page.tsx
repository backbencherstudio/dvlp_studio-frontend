import React, { Suspense } from "react";
import ResetPasswordPage from "./_components/ResetPassword";

export default function page() {
  return (
    <Suspense fallback={"Loading..."}>
      <ResetPasswordPage/>
    </Suspense>
  );
}
