import React from "react";
import StatsCard, { CardProps } from "../StatsCard";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/lib/axios";
import { BookOpen, Users, Calendar, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface StatsCardSectionProps {
  data: CardProps[];
}

const useUserStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const { data } = await privateAxios.get(`/admin/website-info/user-stats`);
      return data.data;
    },
    staleTime: 1000 * 60, // 1 min (cache freshness)
    refetchInterval: 1000 * 60 * 5, // refetch every 5 min
  });
};

export default function StatsCardSection({ data }: StatsCardSectionProps) {
  const { data: sData, isLoading, isError } = useUserStats();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch stats</p>;

  const statsCards = [
    {
      title: "Total Tutor",
      value: sData?.userCounts?.teachers ?? 0,
      icon: BookOpen,
      color: "bg-purple-100",
    },
    {
      title: "Total Students",
      value: sData?.userCounts?.students ?? 0,
      icon: Users,
      color: "bg-blue-100",
    },
    {
      title: "Upcoming Sessions",
      value: sData?.count ?? 0,
      icon: Calendar,
      color: "bg-orange-100",
    },
    {
      title: "Revenue",
      value: `$${sData?.totalEarnings ?? 0}`,
      icon: CreditCard,
      color: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((item, index) => (
        <StatsCard key={index} card={item} />
      ))}
    </div>
  );
}
