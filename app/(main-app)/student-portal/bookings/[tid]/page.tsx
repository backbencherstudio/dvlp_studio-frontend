"use client";
import TutorProfileCard from "@/components/pages/TutorPortal/TutorProfileCard";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";

export default function page() {
  const { tid } = useParams();

  console.log("TID", tid);
  return (
    <div>
      <TutorProfileCard id={tid} />
    </div>
  );
}
