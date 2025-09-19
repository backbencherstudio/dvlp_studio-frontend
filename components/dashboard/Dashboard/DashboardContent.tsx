import { BookOpen, Calendar, CreditCard, Users } from "lucide-react";
import React from "react";
import StatsCardSection from "./StatsCardSection";
import RecentReviews from "@/components/pages/TutorPortal/RecentReviews";
import RecentSessions from "./RecentSession";
import PendingApplication from "./PendingApplication";
const statsCards = [
  {
    title: "Total Tutor",
    value: "127",
    change: "-12.5%",
    changeType: "decrease",
    period: "vs last month",
    icon: BookOpen,
    color: "bg-purple-100",
  },
  {
    title: "Total Students",
    value: "453",
    change: "+12.5%",
    changeType: "increase",
    period: "vs last month",
    icon: Users,
    color: "bg-blue-100",
  },
  {
    title: "Upcoming Sessions",
    value: "5",
    change: "-12.5%",
    changeType: "decrease",
    period: "Today",
    icon: Calendar,
    color: "bg-orange-100",
  },
  {
    title: "Revenue",
    value: "$2000",
    change: "+12.5%",
    changeType: "increase",
    period: "vs last 7 Days",
    icon: CreditCard,
    color: "bg-green-100",
  },
];

const recentSessions = [
  {
    student: "John Doe",
    tutor: "Alice Brown",
    date: "2025-08-25",
    location: "Asia/Dhaka",
  },
  {
    student: "John Doe",
    tutor: "Alice Brown",
    date: "2025-08-25",
    location: "Asia/Dhaka",
  },
];

const pendingApplications = [
  { name: "Jane Smith", subject: "Physics", submitted: "2025-08-18" },
  { name: "Jane Smith", subject: "Physics", submitted: "2025-08-18" },
];

export default function DashboardContent() {
  return (
    <section>
      {/* stats card */}
      <div className="mb-6">
        <StatsCardSection data={statsCards} />
      </div>
      {/* Recent session & Pending tutor */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <RecentSessions sessions={recentSessions} />
        </div>
        <div className="w-full md:w-1/2">
          <PendingApplication applications={pendingApplications} />
        </div>
      </div>
    </section>
  );
}
