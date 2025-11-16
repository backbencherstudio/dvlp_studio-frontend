"use client";

import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useUserStats = (id: string) => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const { data } = await privateAxios.get(`/tutor/session-stats/${id}`);
      return data.data;
    },
    staleTime: 1000 * 60, // 1 min (cache freshness)
    refetchInterval: 1000 * 60 * 5, // refetch every 5 min
  });
};

export default function TutorDetailStats({ id }: { id: string }) {
  const { data: tData, isLoading, isError } = useUserStats(id);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch stats</p>;

  console.log(tData);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  mt-5 gap-6">
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">
            Total Sessions
          </p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">
            {tData?.totalCreatedSessions ?? 0}
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">
            Pending
          </p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">
            {tData?.pendingBookedSessions ?? 0}
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">
            Completed
          </p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">
            {tData?.completedSessions ?? 0}
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">
            Cancelled
          </p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">
            {tData?.cancelledBookedSessions ?? 0}
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">
            Revenue
          </p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">
            $ {tData?.totalRevenue ?? 0}
          </p>
        </div>
      </div>
    </section>
  );
}
