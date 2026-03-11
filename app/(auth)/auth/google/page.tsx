import React, { Suspense } from "react";
import GoogleCallback from "./SignInWithGoogle";

export default function page() {
  return (
    <Suspense fallback={<>Loading</>}>
      <GoogleCallback />
    </Suspense>
  );
}
