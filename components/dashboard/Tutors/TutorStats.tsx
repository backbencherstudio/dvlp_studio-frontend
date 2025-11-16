"use client"

import React from "react";
import StatsCard, { CardProps } from "../StatsCard";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/lib/axios";
import { Users, UserPlus, CheckCircle, XCircle } from "lucide-react";

interface StatsCard {
  data: CardProps[];
}

const useTutorStats = () => {
  return useQuery({
    queryKey: ["tutor-stats"],
    queryFn: async () => {
      const { data } = await privateAxios.get(`/tutor/stats`);
      return data.data;
    },
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60 * 5,
  });
};

export default function TutorStats() {
  const { data: tData, isLoading, isError } = useTutorStats();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );

  if (isError) return <p> There is something gone wrong !</p>;

  const statsCards = mapTutorStatsToCards(tData);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards?.map((item, index) => (
        <StatsCard key={index} card={item} />
      ))}
    </div>
  );
}

// -------------------------------------------------------------

const mapTutorStatsToCards = (data: any) => [
  {
    title: "Total Tutors",
    value: data?.totalTutors ?? 0,
    icon: Users,
    color: "bg-purple-100",
  },
  {
    title: "New Applications",
    value: data?.newApplications ?? 0,
    icon: UserPlus,
    color: "bg-blue-100",
  },
  {
    title: "Active Tutors",
    value: data?.activeTutors ?? 0,
    icon: CheckCircle,
    color: "bg-green-100",
  },
  {
    title: "Suspended Tutors",
    value: data?.suspend ?? 0,
    icon: XCircle,
    color: "bg-red-100",
  },
];
