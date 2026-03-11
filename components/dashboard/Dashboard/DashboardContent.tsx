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


export default function DashboardContent() {
  const { data: apsData, isLoading, isError } = useApplications();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error loading applications</>;

  console.log(apsData.data);
  const applicationsData = apsData?.data || [];
  
  // Get pending applications (one per teacher, not per subject)
  const pendingApplications = getPendingApplications(applicationsData);
  
  return (
    <section>
      {/* stats card */}
      <div className="mb-6">
        <StatsCardSection data={statsCards} />
      </div>
      
      {/* Recent session & Pending tutor */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <RecentSessions />
        </div>
        <div className="w-full md:w-1/2">
          <PendingApplication applications={pendingApplications} />
        </div>
      </div>
    </section>
  );
}

export function getPendingApplications(teachers: any) {
  return teachers
    .filter((teacher: any) => teacher.is_accepted === "pending")
    .map((teacher: any) => {
      // Clean subjects array - remove brackets and quotes
      const subjects = teacher.subjects_taught.map((s: string) => 
        s.replace(/[\[\]"]+/g, '').trim()
      );
      
      // Format subjects for display
      const formattedSubjects = subjects.join(', ');
      
      return {
        id: teacher.id,
        name: teacher.name,
        subjects: formattedSubjects, // Now this will be "Math, Test Prep, Languages, English, History, Science"
        subjectCount: subjects.length,
        submitted: new Date().toISOString().split('T')[0], // today's date
        email: teacher.email,
        hourly_rate: teacher.hourly_rate,
        city: teacher.city
      };
    });
}

// If your PendingApplication component expects a single subject per application,
// you'll need to update it to handle multiple subjects. Here's an example of how
// to modify the PendingApplication component:

/*
export default function PendingApplication({ applications }: { applications: any[] }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Pending Applications ({applications.length})</h3>
      <div className="space-y-3">
        {applications.map((app) => (
          <div key={app.id} className="border-b pb-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{app.name}</p>
                <p className="text-sm text-gray-600">Subjects: {app.subjects}</p>
                <p className="text-xs text-gray-500">Submitted: {app.submitted}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs bg-green-500 text-white px-2 py-1 rounded">Accept</button>
                <button className="text-xs bg-red-500 text-white px-2 py-1 rounded">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/