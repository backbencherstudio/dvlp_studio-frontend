"use client";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SessionTable from "./SessionsTable";

const fetchSessions = async () => {
  const response = await privateAxios.get("/sessions/all-sessions");
  return response.data.data;
};


const mockSessions = [
  {
    id: "cmgxgr6bi0005rezwqlcb2xgo",
    subject: "Nest",
    status: "active",
    session_charge: "90",
    available_slots_time_and_date: [
      "2025-10-20T10:00:00.000Z",
      "2025-10-20T10:30:00.000Z",
      "2025-10-20T11:00:00.000Z",
    ],
    tutor_name: "Tanvir Islam",
    duration: "60min",
    Book_Session: [],
  },
  {
    id: "cmggek5k90001re2w5tdvt8xm",
    subject: "History",
    status: "active",
    session_charge: "45",
    available_slots_time_and_date: ["2025-10-30T09:05:00.000Z"],
    tutor_name: "Sazzadur Rahman",
    duration: "60min",
    Book_Session: [
      { name: "Sazzad Rahman" },
      { name: "Tanvir Ahmed" },
    ],
  },
];

export default function SessionsContent() {
  const {
    data: sessions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  console.log(sessions)

  return (
    <div>
      <SessionTable sessions={sessions} />
    </div>
  );
}
