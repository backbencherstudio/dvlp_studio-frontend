"use client";
import TutorProfileCard from "@/components/pages/TutorPortal/TutorProfileCard";
import { useAuth } from "@/context/AuthContext";
import React from "react";

export default function page() {
  const { user } = useAuth();
  return <div>{user?.id && <TutorProfileCard id={user.id} />}</div>;
}
