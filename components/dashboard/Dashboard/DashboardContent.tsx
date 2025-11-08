"use client"

import { BookOpen, Calendar, CreditCard, Users } from "lucide-react";
import React from "react";
import StatsCardSection from "./StatsCardSection";
import RecentReviews from "@/components/pages/TutorPortal/RecentReviews";
import RecentSessions from "./RecentSession";
import PendingApplication from "./PendingApplication";
import { useApplications } from "../Tutors/useApplication";
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

  const {data:apsData, isLoading, isError } = useApplications();

  if(isLoading) return <>Loading...</>;

  // console.log(apsData.data);
  const applicationsData = apsData?.data || [];
  
  console.log(applicationsData);
  const applications = getPendingApplications(applicationsData);
  const firstFourApplications = applications.slice(0, 5);
  
  return (
    <section>
      {/* stats card */}
      <div className="mb-6">
        <StatsCardSection data={statsCards} />
      </div>
      {/* Recent session & Pending tutor */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
      
          <RecentSessions  />
        </div>
        <div className="w-full md:w-1/2">
          <PendingApplication applications={firstFourApplications} />
             </div>
      </div>
    </section>
  );
}



export function getPendingApplications(teachers:any) {
  return teachers.flatMap((teacher:any) => {
    if (teacher.is_accepted !== "pending") return []; // ignore non-pending

    // Clean subjects
    const subjects = teacher.subjects_taught.map((s:any) => s.replace(/[\[\]"]+/g, '').trim());

    // Map subjects to application objects
    return subjects.map((subject:any) => ({
      id: teacher.id,
      name: teacher.name,
      subject: subject,
      submitted: new Date().toISOString().split('T')[0] // today's date
    }));
  });
}