import React from "react";
import TutorStats from "./TutorStats";
import { BookOpen, Calendar, CreditCard, Users } from "lucide-react";
import TutorTable from "./TutorsTable";

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
        {/* <TutorStats data={statsCards} /> */}
      </div>

      <div>
        <TutorTable/>
      </div>
    </div>
  );
}
