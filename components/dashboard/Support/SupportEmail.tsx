"use client";

// app/messages/page.tsx
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
  status: string;
};

const fetchMessages = async () => {
  const response = await privateAxios.get("/help-and-support/all-support");
  return response.data.data;
};

const SupportEmail = () => {
  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useQuery<Message[], Error>({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div>
      <div className=" border rounded-xl divide-y overflow-hidden">
        <div className="border rounded-xl divide-y overflow-hidden">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`p-6 ${
                message.status === "unsolved" ? "bg-[#ECEFF3]" : "bg-white"
              }`}
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-slate-800 text-xl font-medium leading-[130%]">
                  {message.full_name} - {message.subject}
                </h3>
                <p>
                  <span className="text-gray-400">
                    {new Date(message.created_at).toLocaleDateString()}
                  </span>{" "}
                  (from: {message.email})
                </p>
              </div>

              {/* Message & Action */}
              <div className="flex justify-between items-start">
                <p className="leading-[160%] tracking-[0.08px] text-slate-800">
                  {message.message}
                </p>

                {message.status === "unsolved" && (
                  <Link href={`/admin-dashboard/support/email/${message.id}`}>
                    {" "}
                    <button className="px-4 py-2.5 rounded-lg bg-white font-medium cursor-pointer">
                      View/Reply
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportEmail;
