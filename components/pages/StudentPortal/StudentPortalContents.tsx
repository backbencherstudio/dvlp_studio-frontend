import React from "react";
import SessionCard from "./SessionCard";

export default function StudentPortalContents() {
  return (
    <div>
      <h3 className="p-2.5 text-slate-800 text-2xl font-semibold  leading-8">
        Upcoming Sessions
      </h3>

      <div className="space-y-5">
        <SessionCard
          subject="Calculus"
          tutor="Dr. Jessica Miller"
          date="1/15/2024"
          time="3:00 PM"
          mode="Virtual"
          status="upcoming"
          joinLink="https://dummyshortcut.link/session12"
        />

        <SessionCard
          subject="Calculus"
          tutor="Dr. Jessica Miller"
          date="1/15/2024"
          time="2:56"
          mode="Virtual"
          status="ended"
        />

        <SessionCard
          subject="English Literature"
          tutor="Ms. Rachel Adams"
          date="1/17/2024"
          time="4:00 PM"
          mode="In-person"
          status="reschedule"
        />
        <SessionCard
          subject="English Literature"
          tutor="Ms. Rachel Adams"
          date="1/17/2024"
          time="4:00 PM"
          mode="In-person"
          status="rescheduleRequested"
        />
      </div>
    </div>
  );
}
