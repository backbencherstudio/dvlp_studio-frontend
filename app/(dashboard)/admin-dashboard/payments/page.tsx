"use client";

import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import ReusableTable from "@/components/reusable/ReusableTable";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";


export default function PaymentPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentTransactions"],
    queryFn: async () => {
      const res = await privateAxios.get(
        "/admin/payment-transaction/with-booking-status"
      );
      return res.data;
    },
  });

  const paymentData = data?.paymentTransactions || [];

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  // Define table columns
  const columns = [
    { id: "reference_number", label: "Reference #" },
    { id: "type", label: "Type" },
    { id: "provider", label: "Provider" },
    { id: "withdraw_via", label: "Withdraw Via" },
    { id: "status", label: "Status" },
    { 
      id: "amount", 
      label: "Amount",
      renderRow: (row:any) => `${row.amount} `
    },
    { 
      id: "paid_amount", 
      label: "Paid Amount",
      renderRow: (row:any) => `${row.paid_amount} `
    },
  ];

  return (
    <div className="p-6">
      <ReusableTable
        tableTitle="Payment Transactions"
        columns={columns}
        data={paymentData}
        searchPlaceholder="Search transactions..."
      />
    </div>
  );
}
