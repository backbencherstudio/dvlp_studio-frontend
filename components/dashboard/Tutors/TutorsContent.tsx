import React from "react";
import TutorStats from "./TutorStats";
import { BookOpen, Calendar, CreditCard, Users } from "lucide-react";
import TutorTable from "./TutorsTable";
import Link from "next/link";

// stats data
const statsCards = [
  {
    title: "Total Tutor",
    value: "127",
    icon: BookOpen,
  },
  {
    title: "Total Students",
    value: "453",
    icon: Users,
  },
  {
    title: "Upcoming Sessions",
    value: "5",
    icon: Calendar,
  },
  {
    title: "Revenue",
    value: "$2000",
    icon: CreditCard,
  },
];

// table data

export default function TutorsContent() {
  return (
    <div>
      <div>
        <TutorStats data={statsCards} />
      </div>

      <div className="border mt-8 flex items-center justify-end mr-3">
        <Link
          className="[background:var(--linear,linear-gradient(90deg,#6366F1_0%,#A855F7_100%))] px-4 py-3 rounded-[10px] font-semibold text-white mt-4"
          href="/admin-dashboard/tutors/all-application"
        >
          Tutors Applicaton
        </Link>
      </div>
      <div>
        <TutorTable />
      </div>
    </div>
  );
}
