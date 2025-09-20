import AdminSignIn from "@/components/auth/AdminSignIn";
import BookIcon from "@/components/icons/BookIcon";
import AuthTitle from "@/components/reusable/AuthTitle";
import PageTag from "@/components/reusable/PageTag";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AuthTitle
        title="Welcome Back, Admin"
        subTitle="Sign in to Dashboard"
        isDarkMode={false}
      />
      <div className="mt-2">
        <AdminSignIn />
      </div>
    </div>
  );
}
