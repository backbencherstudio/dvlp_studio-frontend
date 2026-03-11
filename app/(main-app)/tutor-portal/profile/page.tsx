"use client";
import TutorProfileCard from "@/components/pages/TutorPortal/TutorProfileCard";
import PasswordUpdate from "@/components/reusable/PasswordUpdate";
import { useAuth } from "@/context/AuthContext";

export default function page() {
  const { user } = useAuth();
  return (
    <div>
      {user?.id && (
        <>
          <TutorProfileCard id={user.id} /> 
         
        </>
      )}
    </div>
  );
}



