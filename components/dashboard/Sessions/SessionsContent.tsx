"use client";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SessionTable from "./SessionsTable";


export default function SessionsContent() {

  return (
    <div>
      <SessionTable  />
    </div>
  );
}
