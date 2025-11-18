"use client";

import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Message = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: "solved" | "unsolved";
};

const fetchMessages = async (): Promise<Message[]> => {
  const res = await privateAxios.get("/help-and-support/all-support");
  return res.data.data;
};

export default function SupportEmail() {
  const { data, isLoading, isError, error } = useQuery<Message[], Error>({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <div className="border rounded-xl divide-y overflow-hidden">
      {data?.map((item) => (
        <div
          key={item.id}
          className={`p-6 ${
            item.status === "unsolved" ? "bg-[#ECEFF3]" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-slate-800 text-xl font-medium">
              {item.full_name} — {item.subject}
            </h3>
            <p>
              <span className="text-gray-400">
                {new Date(item.created_at).toLocaleDateString()}
              </span>{" "}
              (from: {item.email})
            </p>
          </div>

          {/* Message and Action */}
          <div className="flex justify-between items-start">
            <p className="leading-[160%] text-slate-800">{item.message}</p>

            {item.status === "unsolved" && (
              <Link href={`/admin-dashboard/support/email/${item.id}`}>
                <button className="px-4 py-2.5 rounded-lg bg-white shadow font-medium cursor-pointer">
                  View / Reply
                </button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
